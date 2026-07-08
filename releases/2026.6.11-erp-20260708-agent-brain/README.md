# OpenClaw Runtime Overlay 2026.6.11 ERP Agent Brain

Release: `2026.6.11-erp-20260708-agent-brain`

Artifact:

- `openclaw-runtime-2026.6.11-erp-agent-brain-f906681.tgz`

SHA256:

- `27db98b04077184570f459a02ce3492a28d0196fa92a1755453e5c15780fb798`

Source:

- Repo: `bosocmputer/openclaw`
- Branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Head: `f9066817dc`

Included runtime changes:

- Keeps the 2026.6.11 ERP LINE burst fast path for image plus rapid follow-up text.
- Adds bounded, fail-open Agent Knowledge Brain lookup before LINE/Telegram dispatch.
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
pm2 restart openclaw-gateway --update-env
```

Full runtime fallback when no full tarball is available:

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

Expected version gate:

```text
OpenClaw 2026.6.11 (f906681)
```
