# OpenClaw Runtime Overlay 2026.6.11 ERP Line Burst Fast Path

Release: `2026.6.11-erp-20260706-line-burst-fastpath`

Artifact:

- `openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz`

SHA256:

- `a26156d0440b4d6010d89c98a94cdefa8f0d51693762874bde0d607175f94a99`

Source:

- Repo: `bosocmputer/openclaw`
- Branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Head: `fe432925eb`

Included runtime changes:

- Restore `ui/src/app-navigation.ts` exports required by the runtime build.
- Generic LINE media burst coalescing for image plus rapid follow-up text.
- Fast path for standalone LINE text messages so normal text is not delayed.

Operational notes:

- Apply on top of a real 2026.6.11 base runtime directory `/root/openclaw-runtime-2026.6.11-erp`.
- This package is an overlay, not a standalone full runtime. It expects the target runtime directory to already contain 2026.6.11 runtime dependencies such as `node_modules`.
- Set `OPENCLAW_BIN=/root/openclaw-runtime-2026.6.11-erp/dist/index.js` in `openclaw-api/.env`.
- Kill switch: set `OPENCLAW_LINE_COALESCING=0` and restart gateway.
- If `node dist/index.js --version` still prints `OpenClaw 2026.6.8`, the server is still on a legacy base runtime. That may be acceptable only for a LINE-only emergency overlay patch. It is not acceptable when enabling newer providers such as `ollama-cloud`; build/install the full 2026.6.11 runtime first.
- Dynamic ERP facts such as price, stock, cost, availability, credit, and substitute products must still come from MCP/SML tools, not memory.
- Agent Knowledge Brain v1 ships through `openclaw-api` and `openclaw-admin`. Safe active knowledge is still synced into the OpenClaw `MEMORY.md` managed block consumed by memory-core. Runtimes built after the Agent Brain patch can additionally call `/api/agent-brain/evaluate-turn` before LINE/Telegram dispatch when `AGENT_BRAIN_ENABLED=1`; the direct lookup is bounded, fail-open, and should be rolled back with `AGENT_BRAIN_ENABLED=0` if needed.

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
