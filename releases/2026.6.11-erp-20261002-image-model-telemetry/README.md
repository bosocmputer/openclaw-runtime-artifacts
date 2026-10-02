# Image Model Telemetry Overlay

- Overlay release: `2026.6.11-erp-20261002-image-model-telemetry`
- Source branch: `codex/image-tool-monitor-telemetry`
- Source commit: `9f1d91f379` (`feat: expose image model usage to monitor`)
- Artifact: `openclaw-runtime-2026.6.11-erp-image-model-telemetry-9f1d91f.tgz`
- SHA256: `d8e6b17d480126cb90defb175b027ed06955f318d38edc279a32d95c66a3e18d`

This full `dist` overlay preserves the existing 2026.6.11 ERP runtime and adds
image-tool telemetry: the runtime-selected model and normalized provider usage
are stored in the existing tool result. Monitor can then display the actual
image model, token counts, and runtime-calculated cost without exposing image
content, prompts, or credentials.

Apply this only to an existing `2026.6.11` ERP runtime after taking a timestamped
copy of its current `dist` directory, then restart the Gateway. Roll back by
restoring that copy and restarting the Gateway again.
