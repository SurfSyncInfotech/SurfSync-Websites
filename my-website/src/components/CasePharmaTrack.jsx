import hero from "../assets/case-pharmatrack-hero.png";
import productImac from "../assets/case-pharmatrack-product.png";
import purpleImac from "../assets/case-pharmatrack-purple-imac.png";
import device1 from "../assets/case-pharmatrack-device-1.png";
import device2 from "../assets/case-pharmatrack-device-2.png";
import device3 from "../assets/case-pharmatrack-device-3.png";
import device4 from "../assets/case-pharmatrack-device-4.png";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-pharmatrack/stat-0.svg";
import stat1 from "../assets/case-pharmatrack/stat-1.svg";
import stat2 from "../assets/case-pharmatrack/stat-2.svg";
import stat3 from "../assets/case-pharmatrack/stat-3.svg";
import need0 from "../assets/case-pharmatrack/need-0.svg";
import need1 from "../assets/case-pharmatrack/need-1.svg";
import need2 from "../assets/case-pharmatrack/need-2.svg";
import need3 from "../assets/case-pharmatrack/need-3.svg";
import role0 from "../assets/case-pharmatrack/role-0.svg";
import role1 from "../assets/case-pharmatrack/role-1.svg";
import role2 from "../assets/case-pharmatrack/role-2.svg";
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
import "./CaseDoctor360.css";
import "./CasePharmaTrack.css";

const stats = [
  [stat0, "4", "pharma supply\nservice areas"],
  [stat1, "1", "supply chain\nplatform"],
  [stat2, "3", "Device types\nsupported"],
  [stat3, "1", "Unified traceability"],
];

const needs = [
  [need0, "Discover", "find relevant batches"],
  [need1, "Explore", "Available inventory clearly."],
  [need2, "Connect", "recall management"],
  [need3, "Access", "Bring expiry intelligence"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We identified the key supply chain needs and organized pharmaceutical information around batch discovery and traceability.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the interface to make batches, warehouses, shipments, expiry alerts, and recall options easier to explore.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built a responsive pharma supply chain platform that brings essential service categories together in one accessible experience.",
  },
];

const panels = [
  [role0, "Batch Tracking", "manufacturer to downstream"],
  [role1, "Expiry Intelligence", "alerts before stock is lost"],
  [role2, "Recall Management", "trace, hold and report"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

function CasePharmaTrack() {
  return (
    <div className="case-page is-infocus is-modauto is-doctor-case is-pharma-case">
      {/* 1. HERO SECTION */}
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>PharmaTrack</h1>
          <p className="cs-hero-sub">Pharmaceuticals. Fully Traceable.</p>
          <p className="cs-body">
            A centralized pharmaceutical supply chain platform connecting manufacturers,
            distributors, stockists, and warehouses through batch tracking, expiry intelligence,
            recall management, and audit trail — all in one accessible digital experience.
          </p>
          <ul className="cs-tags">
            <li>Batch Tracking</li>
            <li>Responsive Web</li>
            <li>Pharmaceutical</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img
            src={hero}
            alt="PharmaTrack pharmaceutical platform on desktop display."
          />
        </div>
      </section>

      {/* 2. STATS ROW */}
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

      {/* 3. THE IDEA SECTION */}
      <section className="cs-idea cs-wrap">
        <div className="cs-idea-head">
          <div>
            <p className="cs-kicker">The idea</p>
            <h2>A clearer way to access trading markets.</h2>
            <p className="cs-body">
              PharmaTrack needed a centralized platform to help pharmaceutical companies
              track batches, monitor expiry, manage recalls, and maintain audit trails across
              manufacturers, distributors, stockists, and warehouses while making essential
              supply chain information easier to find and act on.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One convenient destination to trace every batch across every location.”</p>
          </blockquote>
        </div>

        {/* 4. DISCOVER / EXPLORE / CONNECT / ACCESS CARDS */}
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

      {/* 5. PROCESS SECTION */}
      <section className="cs-process">
        <div className="cs-process-stage">
          <div className="cs-process-head">
            <p className="cs-kicker">Our process</p>
            <h2>
              From <span>idea to product</span>
            </h2>
            <p className="cs-body">
              PharmaTrack needed a centralized platform to help pharmaceutical companies
              track batches, monitor expiry, manage recalls, and maintain audit trails across
              manufacturers, distributors, stockists, and warehouses while making essential
              supply chain information easier to find and act on.
            </p>
            <a className="cs-btn" href="#contact">
              Get started <span aria-hidden="true">→</span>
            </a>
          </div>
          <span className="cs-blob" aria-hidden="true" />
          <img
            loading="lazy"
            decoding="async"
            className="cs-curve"
            src={processCurve}
            alt=""
            aria-hidden="true"
          />
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

      {/* 6. THE PRODUCT SECTION */}
      <section className="cs-product">
        <div className="cs-wrap cs-product-grid">
          <div>
            <p className="cs-kicker">The product</p>
            <h2>
              One platform for
              <br />
              the pharmaceutical
              <br />
              journey.
            </h2>
            <p className="cs-body">
              A supply-chain focused digital platform that organizes pharmaceutical
              information and connects users with manufacturers, distributors, stockists,
              warehouses, batch records, expiry tracking, and recall management.
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
            <img
              loading="lazy"
              decoding="async"
              src={productImac}
              alt="PharmaTrack Manufacturer Dashboard on iMac."
            />
          </div>
        </div>
      </section>

      {/* 7. KEY SCREENS */}
      <section className="cs-features">
        <div className="cs-wrap">
          <p className="cs-kicker">Key screens</p>
          <h2>
            Key <span>features</span>
          </h2>
        </div>
        <div className="cs-features-band">
          <div className="cs-banner-inner">
            <img
              loading="lazy"
              decoding="async"
              src={purpleImac}
              alt="PharmaTrack Administrator Dashboard on iMac."
            />
          </div>
        </div>
        <div className="cs-wrap cs-devices-stage">
          <div className="cs-devices-grid">
            <div className="cs-device-card">
              <img
                loading="lazy"
                decoding="async"
                src={device1}
                alt="PharmaTrack Warehouses & Locations on Studio Display."
              />
            </div>
            <div className="cs-device-card">
              <img
                loading="lazy"
                decoding="async"
                src={device2}
                alt="PharmaTrack Distributor Dashboard on iMac."
              />
            </div>
            <div className="cs-device-card">
              <img
                loading="lazy"
                decoding="async"
                src={device3}
                alt="PharmaTrack Batches management on Studio Display."
              />
            </div>
            <div className="cs-device-card">
              <img
                loading="lazy"
                decoding="async"
                src={device4}
                alt="PharmaTrack Warehouses & Locations perspective display."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. TECH STACK */}
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

      {/* 9. CLIENT PROOF */}
      <CaseProof />
    </div>
  );
}

export default CasePharmaTrack;
