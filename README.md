# operator-ui

Vue 3 + Vite operator dashboard for Wave 5 workflows.

## Scope

- Approval flow screens
- Incident feed screens
- Reissue workflow screens
- Governance/SLA overview screens

All data access is API-only (no direct SQL).

## Requirements

- Node.js >= 20

## Local setup

```bash
./scripts/setup_dev.sh
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
```
