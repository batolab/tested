# Public scorecard — security-audit-skill test

**Repo under test:** cloudflare/security-audit-skill (a coding-agent skill that runs a
six-phase security audit and writes `findings.json` + `REPORT.md`).

**Test target (input):** `sample-app/` — a small, dependency-free Node.js API written
for this test. It deliberately contains 5 planted flaws plus 1 safe control endpoint:

| # | Planted item | Location |
|---|---|---|
| 1 | SQL injection (user input concatenated into SQL) | `/product` |
| 2 | Hardcoded API key and JWT secret in source | top of `app.js` |
| 3 | Reflected XSS (input echoed into HTML unescaped) | `/hello` |
| 4 | Code injection (`eval()` on user input) | `/calc` |
| 5 | Missing authentication on an admin endpoint | `/admin/users` |
| control | Safe pattern: parameterized query (NOT a flaw) | `/search-safe` |

**Method:** the audit prompt in `audit-prompt.txt` (quick profile, all six phases),
then both of the skill's own validators were run on the produced files
(see `validator-output.txt`).

**Results (from `findings.json` — 6 records):**

| Verdict | Count | Detail |
|---|---|---|
| confirmed | 0 | See limitation below |
| needs_validation | 5 | Exactly the 5 planted flaws (SQL injection, hardcoded secrets, reflected XSS, eval code injection, missing auth) |
| rejected | 1 | The safe control endpoint `/search-safe` — correctly not reported as a vulnerability |

- Planted flaws detected: **5 / 5**
- False positives on the safe control: **0**
- Validators on the real output: **PASS** — "6 findings valid", "6 coverage units valid"
- The skill's own shipped validator test suites: findings validator **34/34 pass**,
  coverage-ledger validator **31/31 pass**

**Limitation (stated plainly):** 0 findings reached `confirmed`. The skill only
confirms a finding after executing the target code inside a strict OS-enforced
sandbox; that sandbox could not be enforced in the test environment, so — by the
skill's own rules — every detected flaw stayed at `needs_validation` and no severity
was assigned. Full detail in `REPORT.md` and `findings.json`.
