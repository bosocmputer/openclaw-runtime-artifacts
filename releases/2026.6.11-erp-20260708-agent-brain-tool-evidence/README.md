# OpenClaw Runtime Overlay 2026.6.11 ERP Agent Brain Tool Evidence

Release: `2026.6.11-erp-20260708-agent-brain-tool-evidence`

Artifact:

- `openclaw-runtime-2026.6.11-erp-agent-brain-b68be2d.tgz`

SHA256:

- `be5b0ed513071d9c534bc686d2fd935d043ccfdf15f5cad392c888eb533d1e0e`

Source:

- Repo: `bosocmputer/openclaw`
- Branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Head: `b68be2d7f0`

Included runtime changes:

- Keeps the 2026.6.11 ERP LINE burst fast path for image plus rapid follow-up text.
- Adds bounded, fail-open Agent Knowledge Brain lookup before LINE/Telegram dispatch.
- Posts final-answer and bounded tool-output evidence back to Agent Brain after LINE/Telegram turns complete.
- Injects only low-risk active knowledge returned by `/api/agent-brain/evaluate-turn`.
- Appends SML description suggestions only when API channel policy marks the channel as staff/internal and enables suggestions.
- Keeps dynamic ERP facts, including price, cost, stock, availability, credit, discounts, and substitute products, sourced from MCP/SML tools only.

Operational notes:

- Apply on top of a real 2026.6.11 base runtime directory `/root/openclaw-runtime-2026.6.11-erp`.
- This package is an overlay, not a standalone full runtime. It expects the target runtime directory to already contain 2026.6.11 runtime dependencies such as `node_modules`.
- Set `OPENCLAW_BIN=/root/openclaw-runtime-2026.6.11-erp/dist/index.js` in `openclaw-api/.env`.
- Enable direct Agent Brain lookup only after `openclaw-api` and `openclaw-admin` are updated:

```bash
AGENT_BRAIN_ENABLED=1
AGENT_BRAIN_API_URL=http://127.0.0.1:4000
# Optional. If omitted, runtime uses API_TOKEN from the gateway environment.
AGENT_BRAIN_API_TOKEN=<same value as openclaw-api API_TOKEN>
AGENT_BRAIN_TIMEOUT_MS=700
```

Rollback:

```bash
AGENT_BRAIN_ENABLED=0
pm2 restart openclaw-gateway --update-env || systemctl --user restart openclaw-gateway.service
```

Expected version gate:

```text
OpenClaw 2026.6.11 (b68be2d)
```
