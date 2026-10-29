import hero from "../assets/case-click4appointment/hero.webp";
import productLaptop from "../assets/case-click4appointment/product.webp";
import keyFeatures from "../assets/case-click4appointment/band.webp";
import devices from "../assets/case-click4appointment/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-foodies/stat-0.svg";
import stat1 from "../assets/case-foodies/stat-1.svg";
import stat2 from "../assets/case-foodies/stat-2.svg";
import stat3 from "../assets/case-foodies/stat-3.svg";
import need0 from "../assets/case-foodies/need-0.svg";
import need1 from "../assets/case-foodies/need-1.svg";
import need2 from "../assets/case-foodies/need-2.svg";
import need3 from "../assets/case-foodies/need-3.svg";
import role0 from "../assets/case-foodies/role-0.svg";
import role1 from "../assets/case-foodies/role-1.svg";
import role2 from "../assets/case-foodies/role-2.svg";
import tool0 from "../assets/case-modern-auto/tool-0.png";
import tool1 from "../assets/case-modern-auto/tool-1.png";
import tool2 from "../assets/case-modern-auto/tool-2.png";
import tool3 from "../assets/case-modern-auto/tool-3.png";
import tool4 from "../assets/case-modern-auto/tool-4.png";
import tool5 from "../assets/case-modern-auto/tool-5.png";
import CaseProof from "./CaseProof";
import "./CaseStudy.css";
import "./CaseInfocus.css";
import "./CaseModernAuto.css";
import "./CaseClinicSpots.css";
import "./CaseFoodies.css";
import "./CaseClick4Appointment.css";

const stats = [
  [stat0, "3", "Core stakeholder\ngroups"],
  [stat1, "1", "Connected\nhealthcare platform"],
  [stat2, "4", "Core workflow\nareas"],
  [stat3, "1", "Unified appointment\njourney"],
];

const needs = [
  [need0, "Discover", "Find relevant doctors"],
  [need1, "Book", "Convenient and accessible."],
  [need2, "Consult", "Access to remote doctor consultations."],
  [need3, "Manage", "Help healthcare providers"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped patient booking needs, doctor schedules, and essential clinic management workflows.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the experience to make doctor discovery, appointment booking, and schedule management easier to navigate.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We delivered a healthcare platform connecting appointment scheduling, video consultations, invoicing, and patient document management.",
  },
];

const panels = [
  [role0, "Doctor Discovery", "Find relevant healthcare providers."],
  [role1, "Appointment Booking", "Schedule appointments"],
  [role2, "Video Consultations", "Access remote consultations."],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* Click4Appointment case study: same 1440px design grid as ClinicSpots */
function CaseClick4Appointment() {
  return (
    <div className="case-page is-infocus is-modauto is-clinic-case is-foodies-case is-click4-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>CLICK4APPOINTMENT</h1>
          <p className="cs-hero-sub">
            Better Access. Easier Appointments.
          </p>
          <p className="cs-body">
            A connected healthcare platform helping patients discover doctors and book
            appointments while giving healthcare providers tools to manage schedules,
            consultations, and patient information.
          </p>
          <ul className="cs-tags">
            <li>Health Tech</li>
            <li>Appointment Booking</li>
            <li>Telemedicine</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="Click4Appointment on a laptop and two phones." />
        </div>
      </section>

      <div className="cs-wrap">
        <ul className="cs-stats">
          {stats.map(([icon, value, label]) => (
            <li key={label}>
              <img loading="lazy" decoding="async" src={icon} alt="" />
              <div>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section className="cs-idea cs-wrap">
        <div className="cs-idea-head">
          <div>
            <p className="cs-kicker">The idea</p>
            <h2>
              A simpler way to connect
              <br />
              patients and doctors.
            </h2>
            <p className="cs-body">
              Click4Appointment needed a digital platform to simplify doctor discovery and
              appointment scheduling while helping healthcare providers manage calendars,
              patient documents, and administrative workflows.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One connected platform for appointments, consultations, and clinic management.”</p>
          </blockquote>
        </div>
        <ul className="cs-needs">
          {needs.map(([icon, title, text]) => (
            <li key={title}>
              <img loading="lazy" decoding="async" src={icon} alt="" />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="cs-process">
        <div className="cs-process-stage">
          <div className="cs-process-head">
            <p className="cs-kicker">Our process</p>
            <h2>
              From <span>idea to product</span>
            </h2>
            <p className="cs-body">
              A connected healthcare platform helping patients discover doctors and book
              appointments while giving healthcare providers tools to manage schedules,
              consultations, and patient information.
            </p>
            <a className="cs-btn" href="#contact">
              Get started{" "}
              <svg viewBox="0 0 18 14" width="18" height="14" aria-hidden="true">
                <path
                  d="M0 7h16M10.5 1.5 16 7l-5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          <span className="cs-blob" aria-hidden="true" />
          <img loading="lazy" decoding="async" className="cs-curve" src={processCurve} alt="" aria-hidden="true" />
          <ol className="cs-steps">
            {steps.map((step) => (
              <li key={step.n} className={`cs-step is-${step.n}`}>
                <i aria-hidden="true" />
                <b aria-hidden="true">{step.n}</b>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cs-product">
        <div className="cs-wrap cs-product-grid">
          <div>
            <p className="cs-kicker">The product</p>
            <h2>
              One platform for
              <br />
              the healthcare
              <br />
              journey.
            </h2>
            <p className="cs-body">
              A connected healthcare experience bringing patients, doctors, and clinics together
              through appointment booking, online consultations, and organized practice-management
              tools.
            </p>
            <ul className="cs-roles">
              {panels.map(([icon, title, text]) => (
                <li key={title}>
                  <img loading="lazy" decoding="async" src={icon} alt="" />
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cs-product-art">
            <p className="cs-script" aria-hidden="true">
              clean &amp;
              <br />
              <em>Easy to</em>
              <br />
              use
            </p>
            <img loading="lazy" decoding="async" src={productLaptop} alt="Click4Appointment on a desktop." />
          </div>
        </div>
      </section>

      <section className="cs-features">
        <div className="cs-wrap">
          <p className="cs-kicker">Key screens</p>
          <h2>
            Key <span>features</span>
          </h2>
        </div>
        <img loading="lazy" decoding="async"
          className="cs-features-band"
          src={keyFeatures}
          alt="Click4Appointment home screen on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="Click4Appointment on a desktop and two phones."
        />
      </section>

      <section className="cs-tools">
        <div className="cs-wrap">
          <p className="cs-kicker">Tech stack</p>
          <h2>
            Built with <span>right tools.</span>
          </h2>
          <ul>
            {tools.map(([icon, name], i) => (
              <li key={i}>
                <img loading="lazy" decoding="async" src={icon} alt={name} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CaseProof />
    </div>
  );
}

export default CaseClick4Appointment;
