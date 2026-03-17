# operator-ui: Architecture Deep Dive

## 1. Purpose

`operator-ui` is the operator-facing Vue.js application for approvals, incidents, reissue actions, and governance visibility.

## 2. Boundary

Owns:
- UI routes and interaction flows.
- API client composition and display formatting.
- Operator actions for task approval and command reissue.

Does not own:
- Domain business rules.
- Persistence.
- Authorization policy decisions.

## 3. Wave 5 flow slices

Implemented:
- `/approvals` -> list workflow runs + approve/reject task transition.
- `/incidents` -> incident feed (`channel-policy-router`).
- `/reissue` -> failed command listing + reissue action.
- `/governance` -> queue and SLA summary snapshot.

## 4. API-only rule

The UI fetches and mutates data only through service APIs. There is no direct SQL path.

## 5. Auth interaction

- UI sends bearer token from `localStorage.access_token`.
- Backend services enforce role checks on mutation endpoints.

## 6. Next steps

- Add Keycloak login flow and token refresh lifecycle in UI.
- Add explicit mutation confirmation UX and retry/error boundary UI.
- Add traceability timeline UI keyed by correlation id and command lineage.
