# operator-ui: Architecture Deep Dive

## 1. Purpose

`operator-ui` is the operator-facing Vue.js application for approvals, incidents, reissue actions, and governance visibility.

## 2. Boundary

Owns:
- UI routes and interaction flows.
- API client composition and display formatting.

Does not own:
- Domain business rules.
- Persistence.
- Authorization policy decisions.

## 3. Wave 5 flow slices

Implemented scaffolds:
- `/approvals` -> workflow run listing (`automation-scenario-service`)
- `/incidents` -> incident feed (`channel-policy-router`)
- `/reissue` -> held command candidates (`channel-policy-router`)
- `/governance` -> policy and SLA summary (`channel-policy-router`)

## 4. API-only rule

The UI fetches data only through service APIs. There is no direct SQL path.

## 5. Next steps

- Add authenticated session and Keycloak integration.
- Add mutation actions (approve/reject/reissue) with explicit confirmation UX.
- Add traceability timeline UI keyed by correlation id and command lineage.
