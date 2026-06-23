# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260623-line-observability/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `54c3672d4f1eb0c7b275c23210e128ef9004e5244b3ada0ed39db1a12fd5c214`

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/d1be03c3542b69a4a896f90a7ba66ab2b00ae97d/releases/2026.6.8-erp-20260623-line-observability/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
54c3672d4f1eb0c7b275c23210e128ef9004e5244b3ada0ed39db1a12fd5c214  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```
