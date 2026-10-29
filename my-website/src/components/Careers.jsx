import { useEffect, useState } from "react";
import StaggeredText from "./StaggeredText";
import team from "../assets/careers-team.webp";
import "./Careers.css";

/* every icon is an inline vector so it stays sharp at any zoom */
const paths = {
  leaf: (
    <>
      <path d="M5 21c1-5 4-9 9-11" />
      <path d="M8.5 15.5C6 13 6.5 9.5 9.5 7.5c3-2 8-2.5 11-3.5 0 4-.5 9-4 12-3 2.5-6 2-8-.5Z" />
    </>
  ),
  route: (
    <>
      <circle cx="17" cy="4.5" r="2" />
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <circle cx="11" cy="19.5" r="2" />
      <path d="M6.5 12h11M5.8 10.5l9.7-5.1M12.5 18.2l5.8-4.5" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3.5" />
      <path d="M12 8V4M10 4h4M2.5 14H4M20 14h1.5M9 13v1.5M15 13v1.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="17" rx="3" />
      <rect x="8.5" y="2.5" width="7" height="4" rx="1.5" />
      <path d="m9 13.5 2.3 2.3L15.5 11" />
    </>
  ),
  pencil: (
    <>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7.5 18.5 3 20l1.5-4.5L16.5 3.5Z" />
      <path d="m14.5 5.5 3 3" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  chart: (
    <>
      <path d="M4 20v-5M9 20V11M14 20v-6M19 20V9M20 3l-6 5-4-3-6 5" />
      <path d="M16 3h4v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clip: <path d="m20.5 11-8 8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L16 7" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  down: <path d="M12 4v15M6 13l6 6 6-6" />,
  out: <path d="M7 17 17 7M8 7h9v9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, className, strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const values = [
  { icon: "leaf", tone: "blue", title: "Curiosity", text: "We stay open and keep learning." },
  { icon: "route", tone: "orange", title: "Ownership", text: "We take initiative and make things work." },
  { icon: "robot", tone: "blue", title: "Craft", text: "We care about the details." },
  { icon: "clipboard", tone: "green", title: "Collaboration", text: "We grow stronger together." },
];

const emptyForm = { name: "", email: "", link: "", why: "" };
const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

function Careers() {
  const [roles, setRoles] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const role = roles[active];

  useEffect(() => {
    let ignore = false;
    Promise.all([
      fetch(`${apiUrl}/api/jobs`).then((response) => response.json()),
      fetch(`${apiUrl}/api/faqs`).then((response) => response.json()),
    ])
      .then(([jobRows, faqRows]) => {
        if (ignore) return;
        if (!Array.isArray(jobRows) || !Array.isArray(faqRows)) {
          setLoadError("Open roles could not be loaded. Please refresh the page.");
          return;
        }
        setRoles(jobRows);
        setFaqs(faqRows.map((item) => ({ q: item.question, a: item.answer, id: item.id })));
      })
      .catch(() => {
        if (!ignore) setLoadError("Open roles could not be loaded. Please refresh the page.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const problems = {
    name: form.name.trim().length < 2 ? "Please enter your full name." : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "" : "Please enter a valid email address.",
  };
  const shown = (key) => (touched[key] ? problems[key] : "");
  const leave = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const pickFile = (picked) => {
    if (!picked) return;
    if (picked.type !== "application/pdf" && !/\.pdf$/i.test(picked.name)) {
      setFile(null);
      setFileError("Please upload a PDF file.");
      return;
    }
    if (picked.size > 5 * 1024 * 1024) {
      setFile(null);
      setFileError("That file is over 5 MB. Please upload a smaller PDF.");
      return;
    }
    setFileError("");
    setFile(picked);
  };

  const size = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

  const setField = (key) => (event) => setForm((f) => ({ ...f, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!role) return;
    if (problems.name || problems.email) {
      setTouched({ name: true, email: true });
      event.currentTarget.elements[problems.name ? 0 : 1]?.focus();
      return;
    }
    setSending(true);
    setSubmitError("");
    const body = new FormData();
    body.set("jobId", String(role.id));
    body.set("name", form.name.trim());
    body.set("email", form.email.trim());
    body.set("link", form.link.trim());
    body.set("why", form.why.trim());
    if (file) body.set("resume", file);
    try {
      const response = await fetch(`${apiUrl}/api/applications`, { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not submit your application.");
      setSent(true);
    } catch (error) {
      setSubmitError(error.message || "Could not submit your application.");
    } finally {
      setSending(false);
    }
  };

  const again = () => {
    setForm(emptyForm);
    setFile(null);
    setTouched({});
    setSent(false);
  };

  return (
    <div className="careers-page">
      <section className="cr-hero">
        <h1>
          <StaggeredText text="Build what’s" stagger={0.035} />{" "}
          <StaggeredText className="cr-accent" text="next." delay={0.4} stagger={0.05} />
          <br />
          <StaggeredText text="Build it with us." delay={0.55} stagger={0.03} />
        </h1>
        <p className="cr-lead">Join a team turning ambitious ideas into thoughtful digital products.</p>
        <div className="cr-hero-actions">
          <a className="cr-btn is-solid" href="#cr-roles">
            Explore open roles
            <Icon name="arrow" strokeWidth={2} />
          </a>
          <a className="cr-btn is-line" href="#cr-team">
            Life at SurfSync
            <Icon name="down" strokeWidth={1.8} />
          </a>
        </div>
        <ul className="cr-hero-stats" aria-label="SurfSync at a glance">
          <li>
            <strong>250+</strong>
            <span>Projects delivered</span>
          </li>
          <li>
            <strong>4+</strong>
            <span>Countries served</span>
          </li>
          <li>
            <strong>ISO</strong>
            <span>9001:2015 certified</span>
          </li>
        </ul>
        <div className="cr-hero-stage">
          <img loading="lazy" decoding="async"
            className="cr-hero-art"
            src={team}
            alt="Three teammates collaborating around a design screen."
          />
          {roles.slice(0, 4).map((r, i) => (
            <a className={`cr-float is-${i + 1}`} href="#cr-roles" key={r.id}>
              <Icon name={r.icon} strokeWidth={1.7} />
              {r.area}
            </a>
          ))}
        </div>
      </section>

      <section className="cr-team" id="cr-team">
        <div className="cr-wrap cr-team-grid">
          <div className="cr-team-copy">
            <p className="cr-kicker">About the team</p>
            <h2>
              Good work <span>happens together.</span>
            </h2>
            <p className="cr-team-text">
              We’re a team of designers, developers, and problem-solvers who collaborate closely
              from ideas to launch, building digital products that create real value.
            </p>
          </div>
          <ul className="cr-values">
            {values.map((v) => (
              <li key={v.title}>
                <span className={`cr-value-icon is-${v.tone}`}>
                  <Icon name={v.icon} strokeWidth={1.7} />
                </span>
                <strong>{v.title}</strong>
                <span className="cr-value-text">{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cr-roles-section" id="cr-roles">
        <div className="cr-wrap">
          <div className="cr-roles-head">
            <div>
              <p className="cr-kicker">Your next chapter</p>
              <h2>
                Find your <span>place here.</span>
              </h2>
              <p className="cr-roles-sub">Explore the roles that fit how you think, build, and grow.</p>
            </div>
          </div>

          {loadError ? <p className="cr-roles-sub">{loadError}</p> : null}
          {loading ? <p className="cr-roles-sub">Loading open roles…</p> : null}
          {!loading && !loadError && roles.length === 0 ? <p className="cr-roles-sub">There are no open roles right now.</p> : null}
          <ul className="cr-role-cards">
            {roles.map((r, i) => (
              <li key={r.id}>
                <button
                  type="button"
                  className={i === active ? "is-active" : ""}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="cr-role-icon">
                    <Icon name={r.icon} strokeWidth={1.7} />
                  </span>
                  <strong>{r.title}</strong>
                  <span className="cr-role-meta">{r.meta}</span>
                  <span className="cr-role-go" aria-hidden="true">
                    <Icon name="arrow" strokeWidth={2} />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {role ? <div className="cr-detail">
            <div className="cr-detail-copy">
              <span className="cr-badge">Featured role</span>
              <h3>{role.title}</h3>
              <ul className="cr-facts">
                <li>
                  <Icon name="clock" /> {role.type}
                </li>
                <li>
                  <Icon name="pencil" /> {role.area}
                </li>
                <li>
                  <Icon name="pin" /> {role.place}
                </li>
              </ul>
              <h4>What you’ll do</h4>
              <ul className="cr-bullets">
                {role.doing.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h4>What we’re looking for</h4>
              <ul className="cr-bullets">
                {role.looking.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h4>About the role</h4>
              <p>{role.about}</p>
            </div>

            {sent ? (
              <div className="cr-form cr-sent" role="status">
                <span className="cr-sent-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3>Thank you, {form.name.trim().split(" ")[0]}!</h3>
                <p>
                  We received your application for <b>{role.title}</b>. Our team will get back to you soon.
                </p>
                <button type="button" className="cr-submit" onClick={again}>
                  Apply for another role
                </button>
              </div>
            ) : (
              <form className="cr-form" onSubmit={submit} noValidate>
                <h3>Apply for this role</h3>
                <p className="cr-form-sub">Tell us a little about yourself.</p>
                <label>
                  <span className="cr-sr">Full name</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={setField("name")}
                    onBlur={leave("name")}
                    aria-invalid={shown("name") ? "true" : undefined}
                    autoComplete="name"
                  />
                  {shown("name") ? <em className="cr-error" role="alert">{shown("name")}</em> : null}
                </label>
                <label>
                  <span className="cr-sr">Email address</span>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={setField("email")}
                    onBlur={leave("email")}
                    aria-invalid={shown("email") ? "true" : undefined}
                    autoComplete="email"
                  />
                  {shown("email") ? <em className="cr-error" role="alert">{shown("email")}</em> : null}
                </label>
                <label>
                  <span className="cr-sr">Portfolio or LinkedIn URL</span>
                  <input type="text" placeholder="Portfolio / LinkedIn URL" value={form.link} onChange={setField("link")} />
                </label>
                <label>
                  <span className="cr-sr">Why SurfSync?</span>
                  <textarea placeholder="Why SurfSync?" value={form.why} onChange={setField("why")} maxLength={600} />
                  <small className="cr-count">{form.why.length}/600</small>
                </label>
                <label
                  className={`cr-upload${dragging ? " is-drag" : ""}${file ? " has-file" : ""}${fileError ? " is-bad" : ""}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    pickFile(event.dataTransfer.files?.[0]);
                  }}
                >
                  <input type="file" accept="application/pdf,.pdf" onChange={(event) => pickFile(event.target.files?.[0])} />
                  {file ? (
                    <span className="cr-upload-ok" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  ) : (
                    <Icon name="clip" strokeWidth={1.5} />
                  )}
                  <span>
                    <strong>{file ? file.name : dragging ? "Drop your resume here" : "Upload resume (PDF)"}</strong>
                    <small>{file ? `${size(file.size)} · click to replace` : "Drag and drop or click to browse"}</small>
                  </span>
                </label>
                {fileError ? <em className="cr-error cr-file-error" role="alert">{fileError}</em> : null}
                {submitError ? <em className="cr-error cr-file-error" role="alert">{submitError}</em> : null}
                <button type="submit" className="cr-submit" disabled={sending}>
                  {sending ? "Submitting…" : "Submit application"}
                  <Icon name="out" strokeWidth={2} />
                </button>
                <p className="cr-privacy">Your details are only used to review your application.</p>
              </form>
            )}
          </div> : null}
        </div>
      </section>

      <section className="cr-faq">
        <p className="cr-kicker">FAQ</p>
        <h2>
          A <span>few things</span> you might be wondering.
        </h2>
        <ul className="cr-faq-list">
          {faqs.map((item, i) => {
            const open = openFaq === i;
            return (
              <li key={item.id || item.q} className={open ? "is-open" : ""}>
                <div>
                  <h3>{item.q}</h3>
                  {open && <p>{item.a}</p>}
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-label={open ? "Collapse answer" : "Expand answer"}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                >
                  <Icon name={open ? "close" : "plus"} strokeWidth={1.8} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Careers;
