import hero from "../assets/case-doctor360/hero.webp";
import productLaptop from "../assets/case-doctor360/product.webp";
import keyFeatures from "../assets/case-doctor360/band.webp";
import devices from "../assets/case-doctor360/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-clinicspots/stat-0.svg";
import stat1 from "../assets/case-doctor360/stat-1.svg";
import stat2 from "../assets/case-clinicspots/stat-2.svg";
import stat3 from "../assets/case-doctor360/stat-3.svg";
import need0 from "../assets/case-doctor360/need-0.svg";
import need1 from "../assets/case-clinicspots/need-1.svg";
import need2 from "../assets/case-doctor360/need-2.svg";
import need3 from "../assets/case-doctor360/need-3.svg";
import role0 from "../assets/case-clinicspots/need-0.svg";
import role1 from "../assets/case-clinicspots/role-1.svg";
import role2 from "../assets/case-doctor360/role-2.svg";
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

const stats = [
  [stat0, "4", "Core healthcare\nservice areas"],
  [stat1, "1", "Centralized healthcare\nplatform"],
  [stat2, "3", "Device types\nsupported"],
  [stat3, "1", "Unified patient\nexperience"],
];

const needs = [
  [need0, "Discover", "find relevant doctors"],
  [need1, "Explore", "Available medical services clearly."],
  [need2, "Connect", "appointment options easier"],
  [need3, "Access", "Bring diagnostic services"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We identified the key patient needs and organized the healthcare information around service discovery.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the interface to make doctors, hospitals, appointments, and diagnostic options easier to explore.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built a responsive healthcare platform that brings essential service categories together in one accessible experience.",
  },
];

const panels = [
  [role0, "Doctor Discovery", "appointment options easier"],
  [role1, "Hospital Information", "healthcare facility information"],
  [role2, "Appointment Services", "Make appointment options easier"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* Doctor 360 case study: same 1440px design grid as Modern Auto Parts */
function CaseDoctor360() {
  return (
    <div className="case-page is-infocus is-modauto is-doctor-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>Doctor 360</h1>
          <p className="cs-hero-sub">Healthcare. Closer to You.</p>
          <p className="cs-body">
            A centralized healthcare platform connecting patients with doctors, hospitals,
            appointments, and diagnostic services through one accessible digital experience.
          </p>
          <ul className="cs-tags">
            <li>Healthcare</li>
            <li>Doctor Discovery</li>
            <li>Responsive Web</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="Doctor 360 on a laptop and two phones." />
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
              Doctor 360 needed a centralized platform to help patients explore doctors,
              hospitals, appointments, and diagnostic services while making essential healthcare
              information easier to find and access.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One convenient destination to explore healthcare providers and care options.”</p>
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
              Doctor 360 needed a centralized platform to help patients explore doctors,
              hospitals, appointments, and diagnostic services while making essential healthcare
              information easier to find and access.
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
              One platform for the
              <br />
              <span>healthcare journey.</span>
            </h2>
            <p className="cs-body">
              A patient-focused digital platform that organizes healthcare information and
              connects users with doctors, hospitals, appointment options, and diagnostic services.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="Doctor 360 specialties page on a laptop." />
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
          alt="Doctor 360 home page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="Doctor 360 on a desktop and two phones."
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

export default CaseDoctor360;
