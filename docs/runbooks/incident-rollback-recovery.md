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
