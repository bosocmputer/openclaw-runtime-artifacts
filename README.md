# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260623-line-telemetry-subsystem/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `b12a925e643a469635bac2b012079b123e3051b1eccf9c3a9c4278abdb73c06d`

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/185c4793fce28657bb9aea656eb93e652f15a691/releases/2026.6.8-erp-20260623-line-telemetry-subsystem/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
b12a925e643a469635bac2b012079b123e3051b1eccf9c3a9c4278abdb73c06d  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```
