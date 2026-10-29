// Sample shop API — small Node.js app with NO external dependencies.
// Written for a security-audit test. Intentionally contains planted flaws.
const http = require("http");
const url = require("url");

// --- Planted flaw 2: hardcoded secrets in source code ---
const API_KEY = "sk-live-9f27c1ab44e04d2fBUTTHISISATESTKEY0001";
const JWT_SECRET = "super-secret-jwt-key-12345";

// Tiny in-memory "database" stub. query() just records the SQL it receives.
const db = {
  queries: [],
  query(sql, params) {
    this.queries.push({ sql, params });
    return [{ id: 1, name: "Sample product" }];
  },
};

const users = [
  { id: 1, name: "An", email: "an@example.com", role: "admin" },
  { id: 2, name: "Binh", email: "binh@example.com", role: "user" },
];

function handle(req, res) {
  const parsed = url.parse(req.url, true);
  const q = parsed.query;

  if (parsed.pathname === "/product") {
    // --- Planted flaw 1: SQL injection — user input concatenated into SQL ---
    const sql = "SELECT * FROM products WHERE id = " + q.id;
    const rows = db.query(sql);
    res.end(JSON.stringify(rows));
    return;
  }

  if (parsed.pathname === "/search-safe") {
    // Safe pattern (control): parameterized query, input passed separately.
    const rows = db.query("SELECT * FROM products WHERE name LIKE ?", [q.term]);
    res.end(JSON.stringify(rows));
    return;
  }

  if (parsed.pathname === "/hello") {
    // --- Planted flaw 3: reflected XSS — input echoed into HTML unescaped ---
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello " + q.name + "</h1>");
    return;
  }

  if (parsed.pathname === "/calc") {
    // --- Planted flaw 4: code injection — eval() on user input ---
    const result = eval(q.expr);
    res.end(String(result));
    return;
  }

  if (parsed.pathname === "/admin/users") {
    // --- Planted flaw 5: missing authentication on an admin endpoint ---
    res.end(JSON.stringify(users));
    return;
  }

  res.writeHead(404);
  res.end("not found");
}

const server = http.createServer(handle);
if (require.main === module) {
  server.listen(3000, () => console.log("listening on 3000"));
}
module.exports = { handle, db, API_KEY, JWT_SECRET };
