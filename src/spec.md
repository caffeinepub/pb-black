# Specification

## Summary
**Goal:** Fix Motoko backend compilation issues blocking deployment and restore a successful end-to-end build/deploy (backend + frontend).

**Planned changes:**
- Fix Motoko typechecking/return value for `InviteRequest.compareByTimestamp` so it returns a valid `Order.Order`.
- Add any missing Motoko imports referenced in `backend/main.mo` (e.g., `Nat` when using `Nat.compare`).
- Replace any invalid array-sorting usage with a type-correct sorting approach so `getAllInviteRequests` deterministically returns a sorted `[InviteRequest]`.
- Re-run the standard deploy flow after backend fixes and regenerate/update frontend declarations/types if required so the frontend remains compatible with the backend Candid interface.

**User-visible outcome:** The app builds and deploys successfully; the frontend compiles and can call the backend methods used by `frontend/src/hooks/useQueries.ts`, including retrieving invite requests in a deterministic sorted order.
