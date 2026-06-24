# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Source commit: `1c81b77460` (`Add generic LINE burst coalescing`)
- Version output: `OpenClaw 2026.6.8 (1c81b77)`
- Artifact: `releases/2026.6.8-erp-20260624-line-burst-coalescing/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `1f4ca1e96d6ea84b7e26da1091f323a50c39e023c18c1e36a100966d55e291e7`

Included production behavior:

- Generic LINE burst coalescing for image + rapid follow-up text.
- LINE text-only messages dispatch immediately.
- LINE `/reset`, `/new`, and control commands bypass/cancel pending bursts.
- Structured markers: `line_burst_start`, `line_burst_append`, `line_burst_flush`, `line_burst_bypass`.
- Kill switch: set `OPENCLAW_LINE_COALESCING=0` and restart gateway.

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/3ede1322c6651657dee4546bcade6efb9e4f7fcd/releases/2026.6.8-erp-20260624-line-burst-coalescing/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
1f4ca1e96d6ea84b7e26da1091f323a50c39e023c18c1e36a100966d55e291e7  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Verify after extraction:

```bash
node /root/openclaw-runtime-2026.6.8-erp/dist/index.js --version
# OpenClaw 2026.6.8 (1c81b77)
```
