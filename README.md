# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260623-line-telemetry-info/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `a6c58d10b219b818bac94dca90fc8a5b1e4dcd5f725739ffa78ba6523a3ef0bb`

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/c4ddd015b53143f0feeb8e31fd334535bd2f3256/releases/2026.6.8-erp-20260623-line-telemetry-info/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
a6c58d10b219b818bac94dca90fc8a5b1e4dcd5f725739ffa78ba6523a3ef0bb  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```
