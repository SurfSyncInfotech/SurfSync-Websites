import hero from "../assets/case-modern-auto/hero.webp";
import productLaptop from "../assets/case-modern-auto/product.webp";
import keyFeatures from "../assets/case-modern-auto/key-features.webp";
import devices from "../assets/case-modern-auto/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-modern-auto/stat-0.png";
import stat1 from "../assets/case-modern-auto/stat-1.png";
import stat2 from "../assets/case-modern-auto/stat-2.png";
import stat3 from "../assets/case-modern-auto/stat-3.png";
import need0 from "../assets/case-modern-auto/need-0.png";
import need1 from "../assets/case-modern-auto/need-1.png";
import need2 from "../assets/case-modern-auto/need-2.png";
import need3 from "../assets/case-modern-auto/need-3.png";
import role0 from "../assets/case-modern-auto/role-0.png";
import role1 from "../assets/case-modern-auto/role-1.png";
import role2 from "../assets/case-modern-auto/role-2.png";
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

const stats = [
  [stat0, "8", "Automotive\nservices"],
  [stat1, "1", "Centralized\nplatform"],
  [stat2, "100%", "Digital\nworkflow"],
  [stat3, "∞", "Scalable\noperations"],
];

const needs = [
  [need0, "Manage", "Handle customers, staff."],
  [need1, "Track", "Follow service journey"],
  [need2, "Organize", "Manage digital job cards"],
  [need3, "Connect", "Customers ←→ garage teams"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped the garage’s daily operations, service flow, staff roles, and customer journey.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured a simple interface around vehicles, job cards, services, and service status.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built a responsive management platform connecting customers, staff, and garage operations.",
  },
];

const panels = [
  [role0, "User Panel", "vehicle details, job cards, service information"],
  [role1, "Digital Job Cards", "Create and manage structured job cards"],
  [role2, "Staff Management", "Manage garage staff"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* Modern Auto Parts case study: shares the Infocus layout (same 1440px design grid) */
function CaseModernAuto() {
  return (
    <div className="case-page is-infocus is-modauto">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>Modern Auto Parts</h1>
          <p className="cs-hero-sub">Modern Garage Management, Digitized.</p>
          <p className="cs-body">
            A centralized garage management platform designed to connect customers, staff,
            vehicles, services, and job cards in one streamlined workflow.
          </p>
          <ul className="cs-tags">
            <li>Automotive</li>
            <li>Garage Management</li>
            <li>Responsive Platform</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="Modern Auto Parts website on a laptop and two phones." />
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
            <h2>What the client needed</h2>
            <p className="cs-body">
              Modern Auto Parts needed a centralized digital solution to manage daily garage
              operations, coordinate staff, track vehicles, and give customers visibility into
              their service progress.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>
              A connected platform that brings customers, vehicles, staff, and garage operations
              into one place.
            </p>
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
              A centralized system that helps Modern Auto Parts manage the complete service
              journey — from customer request and vehicle details to job assignment, service
              progress, and completion.
            </p>
            <a className="cs-btn" href="#contact">
              Get started <span aria-hidden="true">→</span>
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
              One platform for <span>every</span>
              <br />
              <span>garage operation.</span>
            </h2>
            <p className="cs-body">
              A centralized system that helps Modern Auto Parts manage the complete service
              journey — from customer request and vehicle details to job assignment, service
              progress, and completion.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="Modern Auto Parts website on a laptop." />
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
          alt="Modern Auto Parts car washing service page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="Modern Auto Parts on a desktop and two phones."
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

export default CaseModernAuto;
