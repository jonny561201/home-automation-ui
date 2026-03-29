# Copilot Instructions for `home-automation-ui`

## Project preferences inferred from the codebase

- Use **React function components** and React hooks (no class components).
- Keep UI components in `src/components/**` and page-level containers in `src/pages/**`.
- Keep global app state in the existing **Context + Reducer** pattern (`src/state/Store.jsx`, `src/state/Reducer.js`).
- Use current action naming in reducer dispatches: uppercase string constants like `SET_ACTIVE_PAGE`.
- Use **Material UI** components for controls and form inputs where possible.
- Keep styles in adjacent `*.css` files imported by component/page modules.
- Keep API calls centralized in `src/utilities/RestApi.js`; do not fetch directly in random components unless there is a clear reason.
- Follow current test stack: **Vitest + React Testing Library** in `src/tests/**`.
- Prefer accessibility-first queries in tests (`getByRole`, `findByRole`, `getByLabelText`) over brittle selectors.

## Test authoring preferences

- Keep test names behavior-focused (`should ...`).
- Group tests by component/page and by concern using nested `describe` blocks.
- Keep `describe` nesting to a maximum of two layers.
- Mock API functions at utility boundaries (`RestApi`) rather than mocking low-level `fetch` for most component tests.
- Use `findBy*`/`waitFor` when state updates depend on async work (`useEffect`, async handlers).

## Known issues / risks to address (from current code)

1. `src/utilities/RestApi.js`
   - `baseUrl` is hardcoded to production (`https://soaringleafsolutions.com`).
   - Recommendation: move to environment config (`import.meta.env`) with a safe default.

2. `src/utilities/RestApi.js`
   - Many functions call `response.json()` without handling non-OK responses.
   - Recommendation: standardize error handling so callers can distinguish transport, auth, and validation failures.

3. `src/pages/Account/AccountChildUser.jsx`
   - `setTest(test.filter(...))` in `deleteChildUser` can use stale state.
   - Recommendation: use functional updates (`setTest(prev => prev.filter(...))`).

4. `src/App.jsx`
   - `setTheme(theme)` runs during render; this is a side effect and can rerun unnecessarily.
   - Recommendation: move this into `useEffect` with stable dependencies.

5. `src/state/Reducer.js`
   - There is a TODO in `determineDesired` noting HVAC scheduling edge cases with multiple active events.
   - Recommendation: define deterministic priority/precedence rules and add targeted tests.

6. `src/tests/**`
   - Some tests still use async wrappers around synchronous render helpers and occasionally produce `act(...)` warnings if async updates are not awaited.
   - Recommendation: prefer synchronous `render()` helpers unless truly async, and explicitly await async UI transitions.

## Guidance for future changes

- Keep changes small and localized; avoid broad refactors unless requested.
- Do not change reducer state shape without updating tests and all dependent selectors/components.
- For new API features, add utility methods in `RestApi.js` first, then integrate into components.
- For any new behavior, add or update tests in `src/tests/**` before or alongside code changes.
