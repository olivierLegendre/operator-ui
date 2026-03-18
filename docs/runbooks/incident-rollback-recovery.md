# Incident / Rollback / Recovery Runbook

## Scope

Service: `operator-ui`
Critical path: operator actions (approvals, incidents, reissue, governance views).

## Incident Response

1. Confirm impacted screens and API dependency failures.
2. Capture browser/network traces and failing request IDs.
3. Validate API base URL and token flow assumptions.

## Rollback

1. Re-deploy last known good frontend artifact.
2. Clear CDN/app cache if stale assets are involved.
3. Keep mutation actions disabled if backend incidents remain open.

## Recovery Validation

```bash
./scripts/setup_dev.sh
npm run typecheck
npm run build
```

## Post-Incident

1. Record impacted operator journeys.
2. Add UI regression coverage for the failed view/action.
3. Update outage communication playbook for operators.

## Wave 8 Hardening And Namespace Migration Notes

1. If release is blocked by vulnerability gate, capture the exact HIGH/CRITICAL finding list and either:
- patch and rebuild immediately; or
- apply documented risk acceptance exception before re-run.
2. If keyless OIDC signing/verification fails, treat this as release-blocking identity drift.
3. If namespace migration issues occur (`ghcr.io/ramery/...`), rollback by pinning the last known good immutable tag in deployment manifest and rerun pullability checks.
4. Always attach evidence artifacts (scan output, signature verify output, pullability check result) to incident record.
