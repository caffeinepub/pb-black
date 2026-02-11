# Specification

## Summary
**Goal:** Fix backend deployment-blocking Motoko compile/type errors and complete the end-to-end deploy so the PB Black app is live.

**Planned changes:**
- Fix `PremiumQualification.compareByTimestamp` in `backend/main.mo` to return `Order.Order` and correctly compare `timestamp` values with a clearly documented ordering (newest-first or oldest-first).
- Replace the invalid `allQualifications.sort(...)` usage with a type-correct Motoko approach so `getAllQualifications()` returns a sorted `[PremiumQualification]` while keeping existing admin-only authorization behavior intact.
- Re-run the standard deployment flow and, if needed, regenerate/update frontend Candid/type declarations so the frontend builds cleanly against the deployed backend interface.

**User-visible outcome:** The app deploys successfully and is accessible live; `/` loads in the deployed environment, `/admin` still works and remains protected by Internet Identity + admin authorization, and there are no frontend/backend Candid or type mismatches.
