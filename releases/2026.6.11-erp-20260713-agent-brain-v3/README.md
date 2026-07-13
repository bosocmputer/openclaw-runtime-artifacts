# OpenClaw 2026.6.11 ERP Agent Brain V3

- Source branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Source commit: `37069175a0`
- Expected version: `OpenClaw 2026.6.11 (3706917)`
- Artifact: `openclaw-runtime-2026.6.11-erp-agent-brain-v3-3706917.tgz`
- SHA256: `cfe0ff94a46642d28f5b4ad75650bf25b970911e2d98268f087c0cf0a7052be8`

This overlay contains the complete built `dist` directory. It requires an existing OpenClaw 2026.6.11 ERP runtime with its `node_modules`; it is not a standalone runtime installation.

## Included Behavior

- Agent Brain Evidence Contract V2 for LINE and Telegram.
- HMAC pseudonyms for subject/session identity; raw channel IDs are not sent as Brain identity.
- Pre-turn lookup with a 700ms hard timeout, fail-open behavior, and a 5-failure/30-second circuit breaker.
- Post-turn structured tool evidence with bounded/redacted input and result; one retry for non-timeout failures.
- Tool evidence, final answer, user utterance, and media description are separated.
- Existing LINE burst coalescing and delivery telemetry remain included.

## Apply As Observe-Only Canary

```bash
cd /root
RUNTIME=/root/openclaw-runtime-2026.6.11-erp
ARTIFACT=/root/openclaw-runtime-2026.6.11-erp-agent-brain-v3-3706917.tgz
SHA=cfe0ff94a46642d28f5b4ad75650bf25b970911e2d98268f087c0cf0a7052be8

curl -fL -o "$ARTIFACT" \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/main/releases/2026.6.11-erp-20260713-agent-brain-v3/openclaw-runtime-2026.6.11-erp-agent-brain-v3-3706917.tgz
echo "$SHA  $ARTIFACT" | sha256sum -c -

node "$RUNTIME/dist/index.js" --version | grep 'OpenClaw 2026.6.11' \
  || { echo "base runtime is not 2026.6.11"; exit 1; }

STAMP=$(date +%Y%m%d-%H%M%S)
cp -a "$RUNTIME/dist" "$RUNTIME/dist.bak-agent-brain-v3-$STAMP"
tar -xzf "$ARTIFACT" -C "$RUNTIME"
node "$RUNTIME/dist/index.js" --version
```

Set API flags for the first rollout:

```bash
AGENT_BRAIN_V2_ENABLED=1
AGENT_BRAIN_INJECTION_ENABLED=0
AGENT_BRAIN_AUTO_PROMOTE_ENABLED=0
```

The gateway needs `AGENT_BRAIN_ENABLED=1`, `AGENT_BRAIN_API_URL`, API authentication, and a stable `AGENT_BRAIN_SUBJECT_HASH_KEY`. Restart API and gateway after updating environment variables.

Rollback by restoring the latest `dist.bak-agent-brain-v3-*` directory or by setting `AGENT_BRAIN_ENABLED=0`. MCP/SML remains the source of truth throughout.
