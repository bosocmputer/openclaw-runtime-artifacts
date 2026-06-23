# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260623-line-observability/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `0815ca746da1363615d41432b1488c7a0b87274b063784524793718f2fcacbc5`

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/main/releases/2026.6.8-erp-20260623-line-observability/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
0815ca746da1363615d41432b1488c7a0b87274b063784524793718f2fcacbc5  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```
