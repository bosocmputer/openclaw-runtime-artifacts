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

- Apply on top of base runtime directory `/root/openclaw-runtime-2026.6.11-erp`.
- This package is an overlay, not a standalone full runtime. It expects the target runtime directory to already contain runtime dependencies such as `node_modules`.
- Set `OPENCLAW_BIN=/root/openclaw-runtime-2026.6.11-erp/dist/index.js` in `openclaw-api/.env`.
- Kill switch: set `OPENCLAW_LINE_COALESCING=0` and restart gateway.
- If `node dist/index.js --version` still prints `OpenClaw 2026.6.8` on a legacy skeleton, verify with marker grep instead: `line_burst_preflight`, `line_delivery_attempt`, and `textWindowMs`.
- Dynamic ERP facts such as price, stock, cost, availability, credit, and substitute products must still come from MCP/SML tools, not memory.
