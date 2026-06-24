# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260624-line-burst-coalescing/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `1f4ca1e96d6ea84b7e26da1091f323a50c39e023c18c1e36a100966d55e291e7`

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
