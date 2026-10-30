import { useCallback, useDeferredValue, useEffect, useRef, useState } from "react";
import { api, getAdminEmail, getAdminRole, getToken, setAdminEmail, setAdminRole, setToken } from "./api";
import { useResource } from "./hooks";
import Icon from "./icons";
import Blogs from "./sections/Blogs";
import Faqs from "./sections/Faqs";
import Inquiries from "./sections/Inquiries";
import Jobs from "./sections/Jobs";
import Pricing from "./sections/Pricing";
import Projects from "./sections/Projects";
import Queries from "./sections/Queries";
import { Avatar, ConfirmDialog, Toasts, useScrollLock } from "./ui";
import { withinDays } from "./utils";
import surfsyncLogo from "./assets/surfsync_logo.png";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://surfsyncinfotech.in/#careers";

export const ROLE_PERMISSIONS = {
  manager: ["jobs", "faqs", "pricing", "blogs", "inquiries", "applications", "projects"],
  hr: ["jobs", "faqs", "blogs", "applications"],
};

const SECTIONS = [
  { id: "jobs", label: "Jobs", icon: "briefcase", search: "Search roles, teams, locations…" },
  { id: "faqs", label: "FAQs", icon: "help", search: "Search questions and answers…" },
  { id: "pricing", label: "Service Pricing", icon: "layers", search: "Search packages, platforms, features, prices…" },
  { id: "blogs", label: "Blogs", icon: "newspaper", search: "Search blog titles, descriptions, authors…" },
  { id: "inquiries", label: "Project Inquiries", icon: "mail", search: "Search client name, email, phone, service…" },
  { id: "applications", label: "Job Applications", icon: "users", search: "Search applicants, emails, roles…" },
  { id: "projects", label: "Projects", icon: "grid", search: "Search projects, categories, tags…" },
];

function readHash(role = "manager") {
  const allowed = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.manager;
  const id = window.location.hash.slice(1);
  if (id === "queries") return allowed.includes("applications") ? "applications" : allowed[0];
  return allowed.includes(id) ? id : (allowed[0] || "jobs");
}

export default function App() {
  const [token, setSession] = useState(getToken);
  const [email, setEmail] = useState(getAdminEmail);
  const [role, setRole] = useState(getAdminRole);

  const logout = useCallback(() => {
    setToken("");
    setSession("");
    setRole("manager");
  }, []);

  if (!token) {
    return (
      <Login
        onSuccess={(nextToken, nextEmail, nextRole) => {
          setToken(nextToken);
          setAdminEmail(nextEmail);
          setAdminRole(nextRole);
          setEmail(nextEmail);
          setRole(nextRole);
          setSession(nextToken);
        }}
      />
    );
  }

  return <Dashboard email={email} role={role} onLogout={logout} />;
}

function Login({ onSuccess }) {
  const [role, setRole] = useState("manager");
  const [email, setEmail] = useState(() => (getAdminRole() === "hr" ? "hr@surfsync.local" : getAdminEmail() || "manager@surfsync.local"));
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const selectRole = (newRole) => {
    setRole(newRole);
    setError("");
    if (newRole === "hr" && (!email || email.includes("manager"))) {
      setEmail("hr@surfsync.local");
    } else if (newRole === "manager" && (!email || email.includes("hr"))) {
      setEmail("manager@surfsync.local");
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const data = await api("/api/admin/login", {
        method: "POST",
        body: { email: email.trim(), password, role },
      });
      onSuccess(data.token, data.email || email.trim(), data.role || role);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="login">
      <div className="login-main">
        <div className="brand brand-login">
          <img src={surfsyncLogo} alt="SurfSync Infotech" className="brand-logo" />
        </div>
        <form className="login-form" onSubmit={submit}>
          <div>
            <h1>Admin Sign In</h1>
            <p className="muted">Select your portal role and enter credentials.</p>
          </div>
          {error ? <p className="alert">{error}</p> : null}

          {/* Role Selection */}
          <div className="field">
            <span className="field-label">Portal Role</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => selectRole("manager")}
                className={`btn ${role === "manager" ? "btn-primary" : "btn-subtle"}`}
                style={{
                  padding: "9px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: role === "manager" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Icon name="layers" size={15} />
                Manager
              </button>
              <button
                type="button"
                onClick={() => selectRole("hr")}
                className={`btn ${role === "hr" ? "btn-primary" : "btn-subtle"}`}
                style={{
                  padding: "9px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: role === "hr" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Icon name="users" size={15} />
                HR
              </button>
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8", marginTop: 6, display: "block" }}>
              {role === "hr"
                ? "HR Access: Jobs, Candidate FAQs, Blogs, and Job Applications."
                : "Manager Access: Full permissions including Inquiries and Service Pricing."}
            </span>
          </div>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              placeholder={role === "hr" ? "hr@surfsync.local" : "manager@surfsync.local"}
              required
            />
          </label>
          <label className="field">
            <span className="field-label">Password</span>
            <span className="input-wrap">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
              <button type="button" className="input-action" onClick={() => setShow((value) => !value)} aria-label={show ? "Hide password" : "Show password"}>
                <Icon name={show ? "eyeOff" : "eye"} size={17} />
              </button>
            </span>
          </label>
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? "Signing in…" : `Sign in as ${role === "hr" ? "HR" : "Manager"}`}
          </button>
        </form>
      </div>
      <aside className="login-aside" aria-hidden="true">
        <p className="eyebrow">SurfSync Admin Portal</p>
        <h2>Role-Based Management</h2>
        <ul className="login-points">
          <li>
            <span className="stat-icon tone-orange-icon">
              <Icon name="briefcase" size={20} />
            </span>
            <div>
              <strong>Jobs (HR & Manager)</strong>
              <small>Publish, hide, and edit open career roles.</small>
            </div>
          </li>
          <li>
            <span className="stat-icon tone-green-icon">
              <Icon name="help" size={20} />
            </span>
            <div>
              <strong>FAQs (HR & Manager)</strong>
              <small>Manage candidate questions and hiring details.</small>
            </div>
          </li>
          <li>
            <span className="stat-icon tone-rose-icon">
              <Icon name="users" size={20} />
            </span>
            <div>
              <strong>Job Applications (HR & Manager)</strong>
              <small>Review resumes and applicant submissions.</small>
            </div>
          </li>
          <li>
            <span className="stat-icon tone-purple-icon">
              <Icon name="mail" size={20} />
            </span>
            <div>
              <strong>Inquiries & Pricing (Manager Only)</strong>
              <small>Client project inquiries and website service packages.</small>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}

function Dashboard({ email, role = "manager", onLogout }) {
  const allowedSectionIds = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.manager;
  const isAllowed = (id) => allowedSectionIds.includes(id);

  const [section, setSection] = useState(() => readHash(role));
  const [navOpen, setNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search);
  const [toasts, setToasts] = useState([]);
  const [confirm, setConfirm] = useState(null);

  const isManager = role === "manager";
  const jobs = useResource("/api/admin/jobs", onLogout);
  const faqs = useResource("/api/admin/faqs", onLogout);
  const applications = useResource("/api/admin/applications", onLogout);
  const packages = useResource(isManager ? "/api/admin/packages" : null, onLogout);
  const blogs = useResource(isManager ? "/api/admin/blogs" : null, onLogout);
  const inquiries = useResource(isManager ? "/api/admin/inquiries" : null, onLogout);
  const projects = useResource(isManager ? "/api/admin/projects" : null, onLogout);

  useScrollLock(navOpen);

  useEffect(() => {
    const onHash = () => {
      setSection(readHash(role));
      setSearch("");
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = (event) => {
      if (event.matches) setNavOpen(false);
    };
    window.addEventListener("hashchange", onHash);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("hashchange", onHash);
      wide.removeEventListener("change", onWide);
    };
  }, [role]);

  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  const go = (id) => {
    if (!isAllowed(id)) return;
    setNavOpen(false);
    if (readHash(role) === id && window.location.hash) return;
    window.location.hash = id;
  };

  const notify = useCallback((message, tone = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    window.setTimeout(() => setToasts((list) => list.filter((toast) => toast.id !== id)), 3600);
  }, []);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((toast) => toast.id !== id)), []);

  const ask = useCallback((options) => setConfirm({ ...options, busy: false }), []);

  const runConfirm = async () => {
    if (!confirm || confirm.busy) return;
    const { action } = confirm;
    setConfirm((current) => current && { ...current, busy: true });
    try {
      await action();
      setConfirm(null);
    } catch (error) {
      setConfirm(null);
      if (error.status === 401) onLogout();
      else notify(error.message, "error");
    }
  };

  const visibleSections = SECTIONS.filter((s) => isAllowed(s.id));
  const current = visibleSections.find((item) => item.id === section) || visibleSections[0];

  const counts = {
    jobs: jobs.rows.length,
    faqs: faqs.rows.length,
    pricing: packages.rows.length,
    blogs: blogs.rows.length,
    inquiries: inquiries.rows.length,
    applications: applications.rows.length,
    queries: applications.rows.length,
    projects: projects.rows.length,
  };
  const freshInquiries = isManager ? inquiries.rows.filter((row) => withinDays(row.createdAt, 1)).length : 0;
  const freshApplications = applications.rows.filter((row) => withinDays(row.createdAt, 1)).length;
  const totalFresh = freshInquiries + freshApplications;
  const shared = { search: query, notify, ask, onUnauthorized: onLogout };

  return (
    <div className="app">
      <aside className={`sidebar${navOpen ? " is-open" : ""}`} aria-label="Admin navigation">
        <div className="brand">
          <img src={surfsyncLogo} alt="SurfSync Infotech" className="brand-logo" />
          <button type="button" className="icon-btn sidebar-close" onClick={() => setNavOpen(false)} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <nav className="nav">
          <p className="nav-label">
            {role === "hr" ? "HR Management" : "Full Management"}
          </p>
          {visibleSections.map((item) => (
            <button
              key={item.id}
              type="button"
              className={section === item.id ? "is-on" : ""}
              aria-current={section === item.id ? "page" : undefined}
              onClick={() => go(item.id)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              <span className="nav-count">{counts[item.id]}</span>
            </button>
          ))}
        </nav>

        <div className="promo">
          <strong>
            <span className="promo-icon">
              <Icon name="external" size={16} />
            </span>
            Live Website
          </strong>
          <p>Preview career postings and features on the live site.</p>
          <a className="btn btn-primary btn-sm" href={SITE_URL} target="_blank" rel="noreferrer">
            Open Website
          </a>
        </div>

        <div className="account">
          <Avatar name={email || (role === "hr" ? "HR" : "Manager")} />
          <div className="account-meta">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <strong>{role === "hr" ? "HR Portal" : "Manager"}</strong>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "1px 6px",
                  borderRadius: 4,
                  background: role === "hr" ? "#ecfdf5" : "#fff7ed",
                  color: role === "hr" ? "#047857" : "#c2410c",
                  border: `1px solid ${role === "hr" ? "#a7f3d0" : "#fed7aa"}`,
                }}
              >
                {role}
              </span>
            </div>
            <small title={email}>{email || "Signed in"}</small>
          </div>
          <button type="button" className="icon-btn" onClick={onLogout} aria-label="Log out" title="Log out">
            <Icon name="logout" />
          </button>
        </div>
      </aside>

      {navOpen ? <div className="scrim" onClick={() => setNavOpen(false)} aria-hidden="true" /> : null}

      <div className="main">
        <header className="topbar">
          <button type="button" className="icon-btn menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={20} />
          </button>
          <label className="search">
            <Icon name="search" size={17} />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={current?.search || "Search…"} aria-label={current?.search || "Search"} />
            {search ? (
              <button type="button" className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                <Icon name="close" size={14} />
              </button>
            ) : null}
          </label>
          <div className="top-actions">
            <button
              type="button"
              className="icon-btn bell"
              onClick={() => go(isManager && freshInquiries > 0 ? "inquiries" : "applications")}
              aria-label={totalFresh ? `${totalFresh} new items in the last 24 hours` : "No new items in the last 24 hours"}
              title="New inquiries and applications in the last 24 hours"
            >
              <Icon name="bell" size={20} />
              {totalFresh ? <span className="bell-dot">{totalFresh > 9 ? "9+" : totalFresh}</span> : null}
            </button>
            <UserMenu email={email} role={role} onLogout={onLogout} />
          </div>
        </header>

        <main className="content">
          {section === "jobs" && isAllowed("jobs") ? <Jobs jobs={jobs} applications={applications} {...shared} /> : null}
          {section === "faqs" && isAllowed("faqs") ? <Faqs faqs={faqs} {...shared} /> : null}
          {section === "pricing" && isAllowed("pricing") ? <Pricing packages={packages} {...shared} /> : null}
          {section === "blogs" && isAllowed("blogs") ? <Blogs blogs={blogs} {...shared} /> : null}
          {section === "inquiries" && isAllowed("inquiries") ? <Inquiries inquiries={inquiries} {...shared} /> : null}
          {(section === "applications" || section === "queries") && isAllowed("applications") ? <Queries applications={applications} {...shared} /> : null}
          {section === "projects" && isAllowed("projects") ? <Projects projects={projects} {...shared} /> : null}
        </main>
      </div>

      <Toasts items={toasts} onDismiss={dismiss} />
      {confirm ? (
        <ConfirmDialog
          title={confirm.title}
          body={confirm.body}
          confirmLabel={confirm.confirmLabel}
          busy={confirm.busy}
          onCancel={() => {
            if (!confirm.busy) setConfirm(null);
          }}
          onConfirm={runConfirm}
        />
      ) : null}
    </div>
  );
}

function UserMenu({ email, role, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="user-wrap" ref={ref}>
      <button type="button" className="user" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu">
        <Avatar name={email || (role === "hr" ? "HR" : "Manager")} />
        <span className="user-meta">
          <strong>{role === "hr" ? "HR User" : "Manager"}</strong>
          <small>{role === "hr" ? "Hiring, FAQs & Blogs" : "Full Administrator"}</small>
        </span>
        <Icon name="chevronDown" size={16} />
      </button>
      {open ? (
        <div className="menu" role="menu">
          <div className="menu-head">
            <small>Signed in as ({role})</small>
            <strong title={email}>{email || "Admin"}</strong>
          </div>
          <a role="menuitem" href={SITE_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <Icon name="external" size={16} />
            Open Website
          </a>
          <button role="menuitem" type="button" onClick={onLogout}>
            <Icon name="logout" size={16} />
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
