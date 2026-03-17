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

## Implemented currently

- Route-level UI for `overview`, `approvals`, `incidents`, `reissue`, `governance`.
- Read integrations to:
  - `automation-scenario-service`
  - `channel-policy-router`
- Mutation actions:
  - Approve/Reject workflow task
  - Reissue failed command
- Bearer token forwarding from `localStorage.access_token`.

## Not yet implemented

- Keycloak login flow in UI (token acquisition/refresh lifecycle).
- Production-grade mutation UX (confirmation dialogs, retry policies, detailed error surfaces).
- Full traceability timeline screen.

## Local setup

```bash
./scripts/setup_dev.sh
```

## Launch locally

1. Start backends in separate terminals:

```bash
# terminal A
cd ../automation-scenario-service
source .venv/bin/activate
uvicorn automation_scenario_service.main:app --reload --port 8102

# terminal B
cd ../channel-policy-router
source .venv/bin/activate
uvicorn channel_policy_router.main:create_app --factory --reload --port 8103
```

2. In `operator-ui`, set API base URLs (optional if defaults are unchanged):

```bash
cat > .env.local <<'ENV'
VITE_AUTOMATION_API_BASE=http://localhost:8102
VITE_CHANNEL_ROUTER_API_BASE=http://localhost:8103
ENV
```

3. Set a bearer token in browser local storage (temporary dev path):

```js
localStorage.setItem("access_token", "<jwt-with-required-roles>")
```

4. Start UI:

```bash
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
```
