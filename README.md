# OpenClaw Runtime Artifacts

Binary runtime artifacts for OpenClaw ERP customer deployments.

## Latest ERP Runtime

- Runtime: OpenClaw 2026.6.8 ERP custom runtime
- Artifact: `releases/2026.6.8-erp-20260618/openclaw-runtime-2026.6.8-erp-latest.tar.gz`
- SHA256: `d812b5e3b6b0005ab10b7420e0f0310a94773d7e1f940d9e00dab295f030bea9`

Download on customer server:

```bash
cd /root
curl -fL -o openclaw-runtime-2026.6.8-erp-latest.tar.gz \
  https://raw.githubusercontent.com/bosocmputer/openclaw-runtime-artifacts/main/releases/2026.6.8-erp-20260618/openclaw-runtime-2026.6.8-erp-latest.tar.gz

sha256sum openclaw-runtime-2026.6.8-erp-latest.tar.gz
```

Expected checksum:

```text
d812b5e3b6b0005ab10b7420e0f0310a94773d7e1f940d9e00dab295f030bea9  openclaw-runtime-2026.6.8-erp-latest.tar.gz
```
