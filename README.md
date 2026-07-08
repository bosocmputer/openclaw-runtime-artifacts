# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime Overlay

- Overlay release: `2026.6.11-erp-20260708-agent-brain`
- Target runtime dir: `/root/openclaw-runtime-2026.6.11-erp`
- Source repo: `bosocmputer/openclaw`
- Source branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Source commit: `f9066817dc` (`feat(runtime): add agent brain channel hooks`)
- Artifact: `releases/2026.6.11-erp-20260708-agent-brain/openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz`
- SHA256: `27db98b04077184570f459a02ce3492a28d0196fa92a1755453e5c15780fb798`

Included production behavior:

- Generic LINE burst coalescing for image + rapid follow-up text.
- LINE text-only messages dispatch immediately.
- LINE `/reset`, `/new`, and control commands bypass/cancel pending bursts.
- Bounded, fail-open Agent Knowledge Brain lookup before LINE/Telegram dispatch.
- Optional staff/internal SML description suggestions from API channel policy.
- Kill switch: set `OPENCLAW_LINE_COALESCING=0` and restart gateway.
- Brain rollback: set `AGENT_BRAIN_ENABLED=0` and restart gateway.

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/main/releases/2026.6.11-erp-20260708-agent-brain/openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz

sha256sum openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz
```

Expected checksum:

```text
27db98b04077184570f459a02ce3492a28d0196fa92a1755453e5c15780fb798  openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz
```

Apply to an existing 2026.6.11 base runtime directory and verify:

```bash
RUNTIME=/root/openclaw-runtime-2026.6.11-erp
node "$RUNTIME/dist/index.js" --version | grep 'OpenClaw 2026.6.11' \
  || { echo "base runtime is not 2026.6.11; build/install the full runtime first"; exit 1; }

tar -xzf /root/openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz -C "$RUNTIME"
grep -R "agent_brain_runtime\\|Agent Knowledge Brain\\|line_burst_preflight\\|line_delivery_attempt" -n "$RUNTIME/dist" | head -30
```

This tarball is an overlay, not a standalone full runtime package. It expects an existing 2026.6.11 runtime with `node_modules`. Do not use it as the only upgrade step from a 2026.6.8 skeleton when enabling newer runtime capabilities such as `ollama-cloud`.

## Agent Knowledge Brain Notes

Agent Knowledge Brain v1 is delivered through `openclaw-api` and `openclaw-admin`, with two runtime paths:

- Compatibility path: safe active knowledge is synced into the agent workspace `MEMORY.md` managed block, which OpenClaw memory-core already reads as runtime context.
- Direct channel path: runtimes built after the Agent Brain patch can call `/api/agent-brain/evaluate-turn` before LINE/Telegram dispatch. This path is opt-in and fail-open.

Runtime must still run the pinned 2026.6.11 path above so LINE burst, media handling, provider behavior, and Agent Brain channel hooks match the API/Admin tests.

Enable direct runtime lookup only after API/Admin are deployed:

```bash
AGENT_BRAIN_ENABLED=1
AGENT_BRAIN_API_URL=http://127.0.0.1:4000
# Optional. If omitted, runtime uses API_TOKEN from the gateway environment.
AGENT_BRAIN_API_TOKEN=<same value as openclaw-api API_TOKEN>
AGENT_BRAIN_TIMEOUT_MS=700
```

Rollback: set `AGENT_BRAIN_ENABLED=0` and restart gateway. LINE/Telegram continue through the original flow and `MEMORY.md` compatibility remains available.

Brain data is helper context only. Price, stock, cost, availability, credit, special price, and substitute-product facts must continue to come from MCP/SML tools.

If the customer server cannot receive a full tarball, build the pinned runtime from source on the server:

```bash
cd /root
git clone --depth 1 \
  --branch codex/openclaw-2026.6.11-erp-line-burst \
  https://github.com/bosocmputer/openclaw.git \
  /root/openclaw-runtime-2026.6.11-erp.new

cd /root/openclaw-runtime-2026.6.11-erp.new
corepack enable
corepack prepare pnpm@11.2.2 --activate
pnpm install --frozen-lockfile
pnpm build:docker
node dist/index.js --version
```

Expected version gate for full runtime installs:

```text
OpenClaw 2026.6.11 (f906681)
```
