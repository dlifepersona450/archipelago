# Agent contract — ARCHIPELAGO

These instructions apply to every file under `archipelago/`. Read this file, [README](README.md), [architecture](docs/architecture/README.md), and the relevant [standards](docs/standards/README.md) before changing this project. User instructions and higher-level agent instructions take precedence. Do not apply these project-specific commands to sibling projects.

## Working agreement

- Understand the existing implementation before editing. Keep changes scoped to the task; preserve unrelated user edits. Inspect Git state if a repository exists. Do not initialize a new Git repository, commit, push, deploy, or change account settings unless the user requests that action or has already authorized it.
- Finish authorized work and routine reversible fixes without repeatedly asking for approval. Ask only for information that materially blocks a correct outcome. Never manufacture approval requirements from this file.
- State assumptions, implemented behavior, verification, and remaining limits honestly. Never claim that unrun checks passed. Never fabricate client projects, production metrics, contact details, photography provenance, or repository links.
- Keep documentation in Indonesian and code, identifiers, comments, commits, and public UI in English. Existing external reference titles may remain English.
- Do not introduce a framework, global state library, physics engine, backend, analytics, or external asset service without a task-driven reason and a documented architecture decision.

## Code requirements

- Use strict TypeScript, `unknown` at untrusted boundaries, type-only imports, descriptive names, and explicit module responsibilities. No `any`, suppression directives, unused exports added for imagined requirements, or unexplained magic numbers.
- Keep domain logic pure in `src/core/` or a feature's state module. Portfolio content belongs in `src/content/portfolio.ts`. UI renders content; the scene never owns case studies or navigation state.
- Follow Prettier and ESLint configuration. Prefer early returns and small cohesive functions. Split when responsibilities diverge; do not split into trivial wrappers or impose arbitrary function-length limits.
- Comments must explain a non-obvious reason, constraint, algorithm, ownership rule, or tradeoff. Add a short comment at a tricky lifecycle, shader, or state boundary. Do not narrate obvious assignments or add comments to every line. Remove stale comments with code changes.
- Escape authored strings inserted into HTML. Validate outbound URLs through `safeLink`. Never insert URL/hash input as raw HTML. Keep dependencies and assets local where feasible; record all imported asset rights.
- Every mounted feature owns a `dispose()` path: abort listeners, cancel pending RAF, disconnect observers, release GPU resources. Guard asynchronous imports against stale dialogs and HMR teardown. Cleanup must be safe when repeated.
- Render on demand. Bound pixel ratio, pause hidden/inactive views, honor reduced motion, and keep HTML access to content when WebGL fails. Mobile must have a usable lightweight route.
- Keep visible focus, meaningful accessible names, labelled sliders, native modal dialogs, Escape handling, keyboard controls, and focus restoration. Do not make hover, dragging, a game win, or animation the only route to projects.

## Verification and completion

- Run `npm run check` after implementation/configuration changes. It covers typechecking, lint, formatting, domain tests, documentation links, and production build. Run `npm run test:browser` for interaction, rendering, accessibility, or responsive changes; see [verification](docs/VERIFICATION.md) for browser setup.
- Write focused tests for meaningful state transitions, malformed input, regressions, and important user flows. Do not add tests that repeat markup or implementation details for low-impact edits.
- For documentation-only edits, run `npm run format:check` and `npm run docs:check`; broaden checks when commands/contracts changed.
- Update explanatory docs in the same change as behavior, schema, scripts, or ownership changes. Update the asset register when importing an asset. Do not hand-maintain a symbol catalog that falsely claims generated freshness.
- Report what changed, why, checks actually run, and material limitations. A screenshot is evidence of one captured viewport, not proof of all devices or production readiness.

## Git and review

- Use short-lived branches from `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `refactor/<topic>`, `perf/<topic>`, `test/<topic>`, `chore/<topic>`, or `ci/<topic>`. Add a real ticket ID only when one exists. Do not fabricate tickets or create a permanent `develop` branch by default.
- Use Conventional Commits: `type(scope): imperative summary`, maximum 72 characters. Approved types are `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`. Keep the scope descriptive and lower case; append `!` before `:` for a breaking change.
- Every authored commit needs a separated body with `Why:`, `Changes:`, and `Validation:` sections, each containing concrete information. Document migration in `BREAKING CHANGE:` when using `!`. Never list a check as passed if it was not run. See [Git workflow](docs/standards/GIT_WORKFLOW.md) for examples and `npm run commit:check -- <message-file>` for validation.
- Make atomic commits. No unrelated formatting, secrets, dependency folders, builds, or personal media without publication rights. Never rewrite shared history or force-push without explicit authorization.
- Use the PR template, explain user-visible behavior and verification, and request review when collaborators exist. Recommended repository settings require passing CI and a PR before merging. Do not claim those remote settings are configured merely because templates exist.
- `.github/` and `.githooks/` in this folder target a standalone project repository. They are inert in a parent workspace until deliberately installed in the repository root. Do not silently move them into a sibling or parent project.

Definition of done: requested behavior works; relevant checks pass or limitations are reported; accessible/fallback paths remain usable; docs and provenance match the implementation; no unsolicited publish or Git action occurred.
