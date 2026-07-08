//#region extensions/shared/agent-brain-runtime.ts
const DEFAULT_AGENT_BRAIN_URL = "http://127.0.0.1:4000";
const DEFAULT_TIMEOUT_MS = 700;
const MAX_TIMEOUT_MS = 2500;
const MAX_CONTEXT_CHARS = 1500;
const MAX_ADDENDUM_CHARS = 800;
function normalizeEnvString(value) {
	if (typeof value !== "string") return;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : void 0;
}
function isAgentBrainEnabled() {
	return normalizeEnvString(process.env.AGENT_BRAIN_ENABLED) === "1" || normalizeEnvString(process.env.OPENCLAW_AGENT_BRAIN_ENABLED) === "1";
}
function resolveAgentBrainApiBaseUrl() {
	return (normalizeEnvString(process.env.AGENT_BRAIN_API_URL) ?? normalizeEnvString(process.env.OPENCLAW_AGENT_BRAIN_URL) ?? normalizeEnvString(process.env.OPENCLAW_API_URL) ?? DEFAULT_AGENT_BRAIN_URL).replace(/\/+$/u, "");
}
function resolveAgentBrainApiToken() {
	return normalizeEnvString(process.env.AGENT_BRAIN_API_TOKEN) ?? normalizeEnvString(process.env.OPENCLAW_AGENT_BRAIN_TOKEN) ?? normalizeEnvString(process.env.API_TOKEN);
}
function resolveAgentBrainTimeoutMs() {
	const raw = normalizeEnvString(process.env.AGENT_BRAIN_TIMEOUT_MS) ?? normalizeEnvString(process.env.OPENCLAW_AGENT_BRAIN_TIMEOUT_MS);
	const parsed = raw ? Number.parseInt(raw, 10) : DEFAULT_TIMEOUT_MS;
	if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_TIMEOUT_MS;
	return Math.min(parsed, MAX_TIMEOUT_MS);
}
function withEndpoint(baseUrl) {
	if (/\/api$/u.test(baseUrl)) return `${baseUrl}/agent-brain/evaluate-turn`;
	return `${baseUrl}/api/agent-brain/evaluate-turn`;
}
function isControlCommand(ctxPayload) {
	const commandBody = normalizeEnvString(ctxPayload.BodyForCommands) ?? normalizeEnvString(ctxPayload.CommandBody) ?? normalizeEnvString(ctxPayload.RawBody);
	return Boolean(commandBody && /^[!/]\S/u.test(commandBody));
}
function countMedia(ctxPayload) {
	const mediaPaths = Array.isArray(ctxPayload.MediaPaths) ? ctxPayload.MediaPaths.length : 0;
	const mediaUrls = Array.isArray(ctxPayload.MediaUrls) ? ctxPayload.MediaUrls.length : 0;
	const single = ctxPayload.MediaPath || ctxPayload.MediaUrl ? 1 : 0;
	return Math.max(mediaPaths, mediaUrls, single);
}
function normalizeSafeLine(value, maxChars) {
	if (typeof value !== "string") return;
	const trimmed = value.replace(/\s+/gu, " ").trim();
	if (!trimmed) return;
	return trimmed.length > maxChars ? `${trimmed.slice(0, maxChars - 1)}...` : trimmed;
}
function normalizeMemoryLines(value) {
	if (!Array.isArray(value)) return [];
	const lines = [];
	let total = 0;
	for (const entry of value) {
		const line = normalizeSafeLine(entry, 300);
		if (!line) continue;
		const nextTotal = total + line.length + 1;
		if (nextTotal > MAX_CONTEXT_CHARS) break;
		lines.push(line);
		total = nextTotal;
	}
	return lines;
}
function normalizeStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.map((entry) => normalizeSafeLine(entry, 120)).filter(Boolean);
}
function buildAgentBrainContextBlock(lines) {
	if (lines.length === 0) return;
	return [
		"",
		"## Agent Knowledge Brain",
		"Use the following admin-approved stable hints only as extra context.",
		"Dynamic ERP facts such as price, cost, stock, availability, credit, discounts, and substitute products must still be verified with MCP/SML tools.",
		...lines
	].join("\n");
}
function appendContextBlock(ctxPayload, block) {
	const currentBody = typeof ctxPayload.Body === "string" ? ctxPayload.Body : "";
	const currentAgent = typeof ctxPayload.BodyForAgent === "string" ? ctxPayload.BodyForAgent : "";
	const originalUserText = normalizeEnvString(ctxPayload.AgentBrainOriginalUserText) ?? normalizeEnvString(ctxPayload.BodyForAgent) ?? normalizeEnvString(ctxPayload.RawBody) ?? normalizeEnvString(ctxPayload.Body);
	if (originalUserText) ctxPayload.AgentBrainOriginalUserText = originalUserText;
	ctxPayload.Body = currentBody ? `${currentBody}\n${block}` : block.trimStart();
	ctxPayload.BodyForAgent = currentAgent ? `${currentAgent}\n${block}` : block.trimStart();
	ctxPayload.AgentBrainContextApplied = true;
}
function normalizeAssistantAddendum(value) {
	return normalizeSafeLine(value, MAX_ADDENDUM_CHARS);
}
async function postAgentBrainEvaluation(params) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), params.timeoutMs);
	try {
		const response = await fetch(params.endpoint, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${params.token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(params.body),
			signal: controller.signal
		});
		if (!response.ok) return { timedOut: false };
		return {
			evaluation: await response.json(),
			timedOut: false
		};
	} catch (err) {
		if (err?.name === "AbortError") return { timedOut: true };
		return { timedOut: false };
	} finally {
		clearTimeout(timeout);
	}
}
async function applyAgentBrainRuntimeContext(params) {
	const startedAt = Date.now();
	if (!isAgentBrainEnabled()) return {
		attempted: false,
		applied: false,
		status: "disabled"
	};
	if (isControlCommand(params.ctxPayload)) return {
		attempted: false,
		applied: false,
		status: "skipped"
	};
	const token = resolveAgentBrainApiToken();
	if (!token) {
		params.log?.("agent_brain_runtime status=skipped reason=missing_token");
		return {
			attempted: false,
			applied: false,
			status: "skipped"
		};
	}
	const userText = normalizeEnvString(params.ctxPayload.AgentBrainOriginalUserText) ?? normalizeEnvString(params.ctxPayload.BodyForAgent) ?? normalizeEnvString(params.ctxPayload.RawBody) ?? normalizeEnvString(params.ctxPayload.Body) ?? "";
	const mediaCount = countMedia(params.ctxPayload);
	if (!userText && mediaCount === 0) return {
		attempted: false,
		applied: false,
		status: "skipped"
	};
	const { evaluation, timedOut } = await postAgentBrainEvaluation({
		endpoint: withEndpoint(resolveAgentBrainApiBaseUrl()),
		token,
		timeoutMs: resolveAgentBrainTimeoutMs(),
		body: {
			agentId: params.agentId,
			channel: params.channel,
			accountId: params.accountId ?? "default",
			turnId: params.ctxPayload.MessageSid,
			userText,
			hasMedia: mediaCount > 0,
			mediaCount
		}
	});
	const durationMs = Date.now() - startedAt;
	if (timedOut) {
		params.log?.(`agent_brain_runtime status=timeout durationMs=${durationMs}`);
		return {
			attempted: true,
			applied: false,
			status: "timeout",
			durationMs
		};
	}
	if (!evaluation?.ok) {
		params.log?.(`agent_brain_runtime status=error reason=${normalizeSafeLine(evaluation?.status, 80) ?? "request_failed"} durationMs=${durationMs}`);
		return {
			attempted: true,
			applied: false,
			status: "error",
			durationMs
		};
	}
	const lines = normalizeMemoryLines(evaluation.memoriesToInject);
	const block = buildAgentBrainContextBlock(lines);
	if (block) appendContextBlock(params.ctxPayload, block);
	const assistantAddendum = normalizeAssistantAddendum(evaluation.assistantAddendum);
	const injectedChars = typeof evaluation.injectedChars === "number" && Number.isFinite(evaluation.injectedChars) ? evaluation.injectedChars : lines.join("\n").length;
	const includedMemoryIds = normalizeStringArray(evaluation.includedMemoryIds);
	params.log?.(`agent_brain_runtime status=ok applied=${Boolean(block)} injectedChars=${injectedChars} durationMs=${durationMs}`);
	return {
		attempted: true,
		applied: Boolean(block),
		status: "ok",
		durationMs,
		injectedChars,
		includedMemoryIds,
		...assistantAddendum ? { assistantAddendum } : {}
	};
}
function appendAgentBrainAddendumToPayload(payload, result, kind) {
	const addendum = result?.assistantAddendum;
	if (!addendum || kind !== "final" || payload.isError || payload.isReasoning || payload.isStatusNotice) return payload;
	const existing = typeof payload.text === "string" ? payload.text.trimEnd() : "";
	if (!existing || existing.includes(addendum)) return payload;
	return {
		...payload,
		text: `${existing}\n\n${addendum}`
	};
}
//#endregion
export { applyAgentBrainRuntimeContext as n, appendAgentBrainAddendumToPayload as t };
