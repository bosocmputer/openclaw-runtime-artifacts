# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime Overlay

- Runtime baseline: OpenClaw 2026.6.11 ERP runtime
- Source repo: `bosocmputer/openclaw`
- Source branch: `codex/openclaw-2026.6.11-erp-line-burst`
- Source commit: `fe432925eb` (`fix(line): avoid delaying standalone text turns`)
- Artifact: `releases/2026.6.11-erp-20260706-line-burst-fastpath/openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz`
- SHA256: `a26156d0440b4d6010d89c98a94cdefa8f0d51693762874bde0d607175f94a99`

Included production behavior:

- Generic LINE burst coalescing for image + rapid follow-up text.
- LINE text-only messages dispatch immediately.
- LINE `/reset`, `/new`, and control commands bypass/cancel pending bursts.
- Kill switch: set `OPENCLAW_LINE_COALESCING=0` and restart gateway.

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/main/releases/2026.6.11-erp-20260706-line-burst-fastpath/openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz

sha256sum openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz
```

Expected checksum:

```text
a26156d0440b4d6010d89c98a94cdefa8f0d51693762874bde0d607175f94a99  openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz
```

Apply to a base runtime directory and verify:

```bash
RUNTIME=/root/openclaw-runtime-2026.6.11-erp
tar -xzf /root/openclaw-runtime-2026.6.11-erp-line-burst-fe432925.tgz -C "$RUNTIME"
node "$RUNTIME/dist/index.js" --version
# OpenClaw 2026.6.11
```
