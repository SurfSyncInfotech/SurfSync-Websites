import { useEffect, useRef, useState } from "react";
import StaggeredText from "./StaggeredText";
import officeMap from "../assets/contact-map.jpg";
import officePhoto from "../assets/contact-office.webp";
import "./Contact.css";

const mapsQuery =
  "SurfSync Infotech Pvt Ltd, Plot No. 3, Sector 73, Basi Bahuddin Nagar, Noida, Uttar Pradesh 201316";
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`;

const services = ["Website Development", "App Development"];
const websiteTypes = [
  "Business Website",
  "E-commerce Website",
  "Landing Page",
  "Custom Web Application",
  "Redesign Existing Website",
];
const appTypes = [
  "Android App",
  "iOS App",
  "Android and iOS App",
  "Web App",
  "MVP / I have an app idea",
  "Improve My Existing App",
];
const budgets = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹3,00,000",
  "₹3,00,000+",
];
const timelines = ["Immediately", "Within 2–4 weeks", "Within 1–3 months", "Just exploring options"];
const existingWebsiteOptions = [
  "Yes, I need improvements",
  "No, I want to build from scratch",
  "I have an idea and need guidance",
];
const apiUrl = import.meta.env.VITE_API_URL;

const facts = [
  {
    icon: "pin",
    title: "Our Office",
    lines: ["Noida, Uttar pradesh, India", "Sector 73, Noida UP 201316"],
    href: mapsUrl,
  },
  {
    icon: "clock",
    title: "Working Hours",
    lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday & Sunday closed"],
  },
];

const empty = {
  name: "",
  email: "",
  code: "+91",
  phone: "",
  service: "",
  websiteType: "",
  appType: "",
  budget: "",
  timeline: "",
  existingWebsite: "",
  message: "",
};

function FactIcon({ name }) {
  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.2 3.8h2.2l1.2 3-1.5 1.1a12 12 0 0 0 5 5l1.1-1.5 3 1.2v2.2c0 .8-.6 1.5-1.4 1.6A14.2 14.2 0 0 1 5.6 5.2c.1-.8.8-1.4 1.6-1.4Z" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5h16v11H4v-11Z" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8.5V12l2.5 2" />
    </svg>
  );
}

/* what is wrong with a field, or "" when it is fine */
function problem(name, value) {
  const text = value.trim();
  if (name === "name") return text.length < 2 ? "Please enter your full name." : "";
  if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text) ? "" : "Please enter a valid email address.";
  if (name === "phone") return /^\d{7,12}$/.test(text.replace(/[\s-]/g, "")) ? "" : "Please enter a valid phone number.";
  if (name === "service") return services.includes(text) ? "" : "Please choose a service.";
  if (name === "message") return text.length < 10 ? "Please tell us a little more (at least 10 characters)." : "";
  return text ? "" : "This field is required.";
}

const MAX_MESSAGE = 1000;

function limitImage(event) {
  const img = event.currentTarget;
  const scale = window.devicePixelRatio || 1;
  img.style.maxWidth = `${Math.floor(img.naturalWidth / scale)}px`;
  img.style.maxHeight = `${Math.floor(img.naturalHeight / scale)}px`;
}

const steps = [
  ["01", "Share your idea", "Tell us what you want to build, in a few lines."],
  ["02", "We review it", "A specialist studies it and replies within 24 hours."],
  ["03", "Free consultation", "A call to agree scope, timeline and a clear quote."],
];

const trust = [
  ["24h", "Reply time"],
  ["250+", "Happy clients"],
  ["4+", "Countries served"],
];

/* adds "is-in" to an element the first time it scrolls into view */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return undefined;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        seen.disconnect();
      },
      { threshold: 0.15 }
    );
    seen.observe(node);
    return () => seen.disconnect();
  }, [shown]);
  return [ref, shown ? " is-in" : ""];
}

function Contact({ compact = false }) {
  const ContactHeading = compact ? "h2" : "h1";
  const [stepsRef, stepsIn] = useReveal();
  const [officeRef, officeIn] = useReveal();
  const [fields, setFields] = useState(empty);
  // the map is a picture; + / − zoom into it, from 1× up to 2.5×
  const [mapZoom, setMapZoom] = useState(1);
  // which fields have been left, so errors only show once someone has had a go at them
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  };

  const leave = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const errorFor = (name) => (touched[name] ? problem(name, fields[name]) : "");
  const fieldProps = (name) => ({
    name,
    value: fields[name],
    onChange: update,
    onBlur: leave,
    "aria-invalid": errorFor(name) ? "true" : undefined,
    "aria-describedby": errorFor(name) ? `err-${name}` : undefined,
  });
  const note = (name) =>
    errorFor(name) ? (
      <em className="field-error" id={`err-${name}`} role="alert">
        {errorFor(name)}
      </em>
    ) : null;

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const typeField = fields.service === "Website Development"
      ? "websiteType"
      : fields.service === "App Development"
        ? "appType"
        : null;
    const names = [
      "name",
      "email",
      "phone",
      "service",
      ...(typeField ? [typeField] : []),
      "budget",
      "timeline",
      "existingWebsite",
      "message",
    ];
    if (names.some((name) => problem(name, fields[name]))) {
      setTouched(Object.fromEntries(names.map((name) => [name, true])));
      const first = names.find((name) => problem(name, fields[name]));
      event.currentTarget.elements[first]?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const projectType = typeField ? fields[typeField] : "";
      const message = [
        `Project type: ${projectType}`,
        `Estimated project budget: ${fields.budget}`,
        `Planned start: ${fields.timeline}`,
        `Existing website: ${fields.existingWebsite}`,
        `Project requirements: ${fields.message.trim()}`,
      ].join("\n");
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          code: fields.code,
          phone: fields.phone.trim(),
          service: fields.service,
          projectType: fields[typeField],
          budget: fields.budget,
          timeline: fields.timeline,
          existingWebsite: fields.existingWebsite,
          requirements: fields.message.trim(),
          message,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Could not submit your message. Please try again.");
      }

      window.location.assign("/enquries/thank-you");
    } catch (err) {
      setSubmitError(err.message || "Could not connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page" id="contact">
      <section className="contact-build">
        <div className="contact-build-inner">
          <div className="contact-copy">
            <p className="contact-kicker">Send us a message</p>
            <ContactHeading>
              <StaggeredText text="Let's Build Something" stagger={0.03} />
              <br />
              <StaggeredText className="contact-accent" text="Great Together" delay={0.5} stagger={0.03} />
            </ContactHeading>
            <p className="contact-lead">
              Share a few details about your project and our team will get back to you with the best
              possible solution.
            </p>
            <ul className="contact-trust" aria-label="Why contact us">
              {trust.map(([value, label]) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="contact-facts">
              {facts.map((fact) => {
                const body = (
                  <>
                    <span className="contact-fact-icon">
                      <FactIcon name={fact.icon} />
                    </span>
                    <span>
                      <strong>{fact.title}</strong>
                      {fact.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                    <i aria-hidden="true">↗</i>
                  </>
                );
                return (
                  <li key={fact.title}>
                    {fact.href ? (
                      <a href={fact.href} target={fact.href.startsWith("http") ? "_blank" : undefined} rel={fact.href.startsWith("http") ? "noreferrer" : undefined}>
                        {body}
                      </a>
                    ) : (
                      <div>{body}</div>
                    )}
                  </li>
                );
              })}
          </ul>

          <form className="contact-form" onSubmit={submit} noValidate>
              <label>
                Your Name *
                <input {...fieldProps("name")} placeholder="eg. John Doe" autoComplete="name" required />
                {note("name")}
              </label>
              <label>
                Phone Number *
                <span className={`phone-field${errorFor("phone") ? " is-invalid" : ""}`}>
                  <select name="code" value={fields.code} onChange={update} aria-label="Country code" required>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    {...fieldProps("phone")}
                    type="tel"
                    inputMode="tel"
                    placeholder="9429694356"
                    autoComplete="tel-national"
                    required
                  />
                </span>
                {note("phone")}
              </label>
              <label>
                Email *
                <input
                  {...fieldProps("email")}
                  type="email"
                  placeholder="john@company.com"
                  autoComplete="email"
                  required
                />
                {note("email")}
              </label>
              <label className="is-wide">
                Service *
                <select {...fieldProps("service")} required>
                  <option value="">Select Website or App Development</option>
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
                {note("service")}
              </label>
              {fields.service && (
                <label className="is-wide">
                  {fields.service === "Website Development"
                    ? "What type of website are you looking to build? *"
                    : "What type of app do you want to develop? *"}
                  <select {...fieldProps(fields.service === "Website Development" ? "websiteType" : "appType")} required>
                    <option value="">Choose an option</option>
                    {(fields.service === "Website Development" ? websiteTypes : appTypes).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {note(fields.service === "Website Development" ? "websiteType" : "appType")}
                </label>
              )}
              <label>
                What is your estimated project budget? *
                <select {...fieldProps("budget")} required>
                  <option value="">Select a budget</option>
                  {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                </select>
                {note("budget")}
              </label>
              <label>
                When are you planning to start? *
                <select {...fieldProps("timeline")} required>
                  <option value="">Select a timeline</option>
                  {timelines.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
                </select>
                {note("timeline")}
              </label>
              <label className="is-wide">
                Do you already have a website? *
                <select {...fieldProps("existingWebsite")} required>
                  <option value="">Choose an option</option>
                  {existingWebsiteOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                {note("existingWebsite")}
              </label>
              <label className="is-wide">
                Briefly describe your project requirements. *
                <textarea
                  {...fieldProps("message")}
                  rows="5"
                  maxLength={MAX_MESSAGE}
                  placeholder="Tell us about your business, your idea, and the features you need."
                  required
                />
                <span className="field-foot">
                  {note("message")}
                  <small>
                    {fields.message.length}/{MAX_MESSAGE}
                  </small>
                </span>
              </label>
              {submitError ? (
                <div style={{ color: "#ef4444", fontSize: "13.5px", fontWeight: "500", gridColumn: "1 / -1", padding: "8px 12px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "8px" }} role="alert">
                  {submitError}
                </div>
              ) : null}
              <div className="contact-submit">
                <p>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
                    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
                  </svg>
                  Your details stay private. We reply within 24 hours.
                </p>
                <button type="submit" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"} <span aria-hidden="true">→</span>
                </button>
              </div>
          </form>
        </div>
      </section>

      {!compact && <section ref={stepsRef} className={`contact-steps${stepsIn}`} aria-label="What happens next">
        <p className="contact-kicker">What happens next</p>
        <h2>
          From hello to <span>kick-off</span> in three steps
        </h2>
        <ol>
          {steps.map(([n, title, text]) => (
            <li key={n}>
              <b>{n}</b>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>}

      {!compact && <section ref={officeRef} className={`contact-office${officeIn}`} aria-label="Visit our office">
        <p className="contact-kicker">Our location</p>
        <h2>
          Visit Our <span>Office</span>
        </h2>
        <p className="contact-lead">
          We'd love to meet you in person. Visit our office for detailed discussions, demonstrations,
          or to explore potential collaborations.
        </p>
        <div className="contact-office-grid">
          <div className="contact-map-wrap">
            <div className="contact-map-frame">
              <a
                className="contact-map-link"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the office location in Google Maps"
              >
                <img loading="lazy" decoding="async"
                  className="contact-map"
                  src={officeMap}
                  alt="Map of the Noida office, near Delhi and Ghaziabad."
                  onLoad={limitImage}
                  style={{ transform: `scale(${mapZoom})` }}
                />
              </a>
              <div className="map-zoom">
                <button
                  type="button"
                  aria-label="Zoom in"
                  disabled={mapZoom >= 2.5}
                  onClick={() => setMapZoom((zoom) => Math.min(2.5, zoom + 0.25))}
                >
                  +
                </button>
                <button
                  type="button"
                  aria-label="Zoom out"
                  disabled={mapZoom <= 1}
                  onClick={() => setMapZoom((zoom) => Math.max(1, zoom - 0.25))}
                >
                  −
                </button>
              </div>
              <a
                className="map-locate"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Show the office in Google Maps"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </a>
              <a
                className="map-thumb-link"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="View larger map"
              >
                <img loading="lazy" decoding="async" className="map-thumb" src={officeMap} alt="" />
              </a>
            </div>
            <aside className="map-card">
              <div>
                <strong>SurfSync Infotech Pvt Ltd</strong>
                <p>Plot No. 3, Sector 73, Basi Bahuddin Nagar, Noida, Uttar Pradesh 201316</p>
                <p className="map-rating">
                  <span>4.5</span>
                  <span className="map-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                  <a href={mapsUrl} target="_blank" rel="noreferrer">
                    173,278 reviews
                  </a>
                </p>
                <a className="map-larger" href={mapsUrl} target="_blank" rel="noreferrer">
                  View larger map
                </a>
              </div>
              <a className="map-directions" href={directionsUrl} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.4 2.6 2.9 9.6c-.9.3-.8 1.6.1 1.8l7.6 1.9 1.9 7.6c.2.9 1.5 1 1.8.1l7-18.5c.3-.9-.5-1.7-1.4-1.4z" />
                </svg>
                Directions
              </a>
            </aside>
          </div>
          <div className="contact-photo-wrap">
            <img loading="lazy" decoding="async"
              className="contact-photo"
              src={officePhoto}
              alt="Anthurium office building."
              onLoad={limitImage}
            />
            <div className="contact-photo-caption">
              <div>
                <strong>Our Office</strong>
                <span>Noida, Uttar pradesh</span>
              </div>
              <a href={directionsUrl} target="_blank" rel="noreferrer" aria-label="Directions to the office">
                →
              </a>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
}

export default Contact;
