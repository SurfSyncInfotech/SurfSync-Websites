import crypto from "crypto";

function safeEqual(left, right) {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function signToken(role = "manager", email = "") {
  const payload = Buffer.from(
    JSON.stringify({
      sub: "admin",
      role,
      email,
      exp: Date.now() + 12 * 60 * 60 * 1000,
    })
  ).toString("base64url");
  const signature = crypto.createHmac("sha256", process.env.JWT_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readToken(header) {
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.slice(7);
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  const expected = crypto.createHmac("sha256", process.env.JWT_SECRET).update(payload).digest("base64url");
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !crypto.timingSafeEqual(given, wanted)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function requireAdmin(req, res, next) {
  const session = readToken(req.headers.authorization);
  if (!session) {
    res.status(401).json({ error: "Please sign in again." });
    return;
  }
  req.adminSession = session;
  next();
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const session = req.adminSession || readToken(req.headers.authorization);
    if (!session) {
      res.status(401).json({ error: "Please sign in again." });
      return;
    }
    const userRole = session.role || "manager";
    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({ error: "Access denied. Your role does not have permission for this section." });
      return;
    }
    next();
  };
}

export function checkAdminLogin(email, password, requestedRole = "manager") {
  const role = String(requestedRole || "manager").toLowerCase();

  // HR Credentials
  const hrEmail = process.env.ADMIN_HR_EMAIL || "hr@surfsync.local";
  const hrPassword = process.env.ADMIN_HR_PASSWORD || "hr123";

  // Manager Credentials
  const mgrEmail = process.env.ADMIN_MANAGER_EMAIL || process.env.ADMIN_EMAIL || "manager@surfsync.local";
  const mgrPassword = process.env.ADMIN_MANAGER_PASSWORD || process.env.ADMIN_PASSWORD || "manager123";

  if (role === "hr") {
    if (safeEqual(email, hrEmail) && safeEqual(password, hrPassword)) {
      return { ok: true, role: "hr", email: hrEmail };
    }
    return { ok: false };
  }

  // Default: Manager role
  if (safeEqual(email, mgrEmail) && safeEqual(password, mgrPassword)) {
    return { ok: true, role: "manager", email: mgrEmail };
  }

  // Also check if someone selected Manager but supplied HR credentials
  if (safeEqual(email, hrEmail) && safeEqual(password, hrPassword)) {
    return { ok: true, role: "hr", email: hrEmail };
  }

  return { ok: false };
}
