# Security Audit Report: sample-shop-api

## 1. Run Metadata and Scope
- **Target Repository**: `sample-shop-api` (`./sample-app`)
- **Reviewed Source Ref**: `eb407e12fc065e04dbacdf919961d018c47627e3` (clean worktree)
- **Run Profile**: `quick` (bounded initial pass coarsened to surface × boundary × attack class)
- **Scope**: All repository source files (`app.js`, `package.json`). As a `quick` run, this audit represents a partial pass rather than exhaustive verification.
- **Execution Policy**: Sandboxed source-and-local-only. In accordance with the audit skill's execution safety rules, target code execution was strictly prohibited because OS-enforced container/namespace sandbox controls (read-only target and toolchain mounts, empty allowlisted environment, network namespace isolation, and cgroup resource limits) could not be enforced in the host environment.
- **Prior Run Data**: None available (`prior_status: "none"`).
- **Validators Status**: Both validators passed cleanly (`validate-findings.cjs` on `findings.json` and `validate-coverage-ledger.cjs` on `coverage-ledger.json`).

## 2. Security Posture Summary
The `sample-shop-api` codebase is a small, single-file Node.js service containing several severe source-visible vulnerability patterns alongside one deliberately implemented safe control pattern:
- **Critical Architectural Risks**: Code injection via global `eval()` on query input (`/calc`), raw SQL concatenation (`/product`), unencoded HTML reflection (`/hello`), and complete absence of authentication or access control on the administrative user endpoint (`/admin/users`).
- **Secret Hygiene**: Hardcoded API keys and JWT signing secrets are committed directly to repository source.
- **Safe Control Pattern**: The `/search-safe` endpoint correctly implements parameterized query placeholders (`db.query("... LIKE ?", [q.term])`), successfully defending against SQL injection.
- **Validation Status**: Because OS-enforced execution sandbox controls could not be enforced in the current environment, target-controlled processes were not executed. All five candidate vulnerabilities are preserved at `needs_validation` with documented blockers and safe validation plans. The safe endpoint `/search-safe` was evaluated and its candidate finding was rejected based on conclusive source evidence.

## 3. Confirmed Findings Table
| Severity | Title | Affected Boundary | Observed Result |
| :--- | :--- | :--- | :--- |
| *None* | *0 Confirmed Findings* | *N/A* | *Target execution was prohibited under sandbox safety rules; all candidates retained at needs_validation.* |

*(Note: Per universal execution-safety rules, target code was not executed because OS-enforced sandbox limits could not be verified. Confirmed count is 0.)*

## 4. Confirmed Findings Detail
No confirmed findings are reported. All identified vulnerability hypotheses are preserved in the Needs Validation register below.

## 5. Needs Validation Register
The following source-grounded candidates represent high-priority security leads that require verification in an OS-enforced sandbox or deployment review:

| Lead Fingerprint | Title | Repository Trace | Blocker | Bounded Local Next Step | Owner-Observed Deployment Check |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `app-admin-missing-auth` | Missing authentication and authorization on admin users endpoint | `app.js:57` → `app.js:59` | OS execution sandbox unavailable; upstream proxy auth configuration not in source. | In a sandboxed loopback test, verify unauthenticated GET returns serialized user records. | Confirm whether upstream API gateway or reverse proxy terminates and enforces authentication before forwarding to `/admin/users`. |
| `app-calc-code-injection` | Unsanitized user expression passed to `eval()` in calculator endpoint | `app.js:50` → `app.js:52` | OS execution sandbox unavailable to safely execute arbitrary code evaluation. | In an isolated sandbox with resource bounds, send `7*6` to `/calc?expr=...` and verify response `42`. | Inspect deployment routing to determine whether `/calc` is exposed externally or restricted. |
| `app-hello-reflected-xss` | Reflected cross-site scripting in `/hello` endpoint | `app.js:43` → `app.js:46` | OS execution sandbox unavailable; headless browser context unavailable. | In sandboxed loopback test, submit `name=<b>test</b>` and check unescaped reflection in `text/html` body. | Check whether edge CDN or reverse proxy attaches Content-Security-Policy (CSP) headers mitigating script execution. |
| `app-product-sql-injection` | SQL injection via raw string concatenation in `/product` endpoint | `app.js:28` → `app.js:31` | OS execution sandbox unavailable to safely execute target runtime. | In an isolated sandbox, send `id=1 UNION SELECT 2` and inspect `db.queries` recorded in database stub. | Verify whether the production database connector uses a real SQL engine or an ORM. |
| `app-source-hardcoded-secrets` | Hardcoded API key and JWT secret in application source code | `app.js:7` → `app.js:71` | Cannot probe external credential providers without violating network and execution boundaries. | Verify whether runtime environment overlays or `.env` files override source constants. | Have secret owner check if `sk-live-...` or `super-secret-...` are active production keys and rotate them if valid. |

## 6. Hardening Notes and Positive Source Patterns
- **Positive Control Pattern (`/search-safe`)**: Endpoint `/search-safe` (`app.js:36-41`) correctly parameterizes database queries using placeholder binding:
  ```javascript
  const rows = db.query("SELECT * FROM products WHERE name LIKE ?", [q.term]);
  ```
  The candidate claim of SQL injection on this endpoint was reviewed and **rejected** (`app-search-safe-parameterized-query`) because input remains strictly bound within parameter arrays and is never concatenated into SQL syntax.
- **Dependency Minimization**: The application utilizes standard library modules (`http`, `url`) with zero third-party dependencies, minimizing third-party supply chain attack surfaces.
- **Hardening Recommendations**:
  1. Remove global `eval()` in `/calc`. Replace with a safe, deterministic math expression parser (or abstract syntax tree evaluator).
  2. Adopt parameterized queries across all database access paths (replicate the `/search-safe` pattern in `/product`).
  3. Introduce context-aware HTML entity encoding or enforce a modern templating engine with default escaping for all HTML responses.
  4. Implement an authentication middleware layer (validating Bearer tokens or session headers) before routing to administrative paths like `/admin/users`.
  5. Extract `API_KEY` and `JWT_SECRET` into environment variables (`process.env.API_KEY`, `process.env.JWT_SECRET`) and load them from a secure secret store.

## 7. Coverage Summary
- **Coverage Ledger Units**: 6 total units
  - `candidate`: 6 units (5 linked to `needs_validation` candidates, 1 linked to `rejected` control validation)
  - `covered`: 0 units
  - `blocked`: 0 units
  - `deferred`: 0 units
- **Rejected Candidates**: 1 candidate (`app-search-safe-parameterized-query` disproved via parameterized query control)
- **Coverage Critic Assessment**: The final coverage critic evaluated all routes and boundaries in `sample-app/app.js`. No unmapped surfaces or missing units were identified.
