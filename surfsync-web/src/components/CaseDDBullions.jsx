import hero from "../assets/case-dd-bullions/hero.webp";
import heroScreen from "../assets/case-dd-bullions/hero-screen.svg";
import productLaptop from "../assets/case-dd-bullions/product.webp";
import productScreen from "../assets/case-dd-bullions/product-screen.svg";
import bandScreen from "../assets/case-dd-bullions/band-screen.svg";
import devicesScreen from "../assets/case-dd-bullions/devices-screen.svg";
/* the phone-on-rocks band and the monitor + Mac Studio share the Foodies mockups, so their 4000px files are reused */
import keyFeatures from "../assets/case-foodies/band.webp";
import devices from "../assets/case-foodies/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-dd-bullions/stat-0.svg";
import stat1 from "../assets/case-dd-bullions/stat-1.svg";
import stat2 from "../assets/case-dd-bullions/stat-2.svg";
import stat3 from "../assets/case-dd-bullions/stat-3.svg";
import need0 from "../assets/case-dd-bullions/need-0.svg";
import need1 from "../assets/case-dd-bullions/need-1.svg";
import need2 from "../assets/case-dd-bullions/need-2.svg";
import need3 from "../assets/case-dd-bullions/need-3.svg";
import role0 from "../assets/case-dd-bullions/role-0.svg";
import role1 from "../assets/case-dd-bullions/role-1.svg";
import role2 from "../assets/case-dd-bullions/role-2.svg";
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
import "./CaseDDBullions.css";

const stats = [
  [stat0, "2", "Core precious\nmetals"],
  [stat1, "1", "Connected\nbullion platform"],
  [stat2, "3", "Key market\naccess areas"],
  [stat3, "1-tap", "Direct call\nsupport"],
];

const needs = [
  [need0, "Track", "Easier to access."],
  [need1, "Explore", "Prices and bullion information clearly."],
  [need2, "Book", "convenient to discover."],
  [need3, "Connect", "Direct way to reach the business."],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We identified the essential market information, bullion services, and customer access needs.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the mobile experience to make rates, market information, and booking options easier to explore.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We delivered a dedicated mobile bullion platform with live pricing, market updates, booking access, and direct support.",
  },
];

const panels = [
  [role0, "Live Market Rates", "Access gold and silver"],
  [role1, "Bullion Booking", "Access convenient booking"],
  [role2, "MCX Price Information", "MCX price information"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* D.D. Bullions case study: same 1440px design grid as ClinicSpots */
function CaseDDBullions() {
  return (
    <div className="case-page is-infocus is-modauto is-clinic-case is-foodies-case is-bullion-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>D.D. Bullions</h1>
          <p className="cs-hero-sub">
            Gold &amp; Silver. Closer to Market.
          </p>
          <p className="cs-body">
            A mobile bullion platform helping customers access precious metals pricing, follow
            market movements, and explore convenient bullion booking through one digital
            experience.
          </p>
          <ul className="cs-tags">
            <li>Fintech</li>
            <li>Precious Metals</li>
            <li>Android App</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="D.D. Bullions on a laptop and two phones." />
          {/* laptop screen redrawn as vector text so it stays sharp at any zoom */}
          <img className="cs-hero-screen" src={heroScreen} alt="" aria-hidden="true" />
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
              D.D. Bullions needed a digital platform to present gold and silver rates, make market
              information easier to access, and help customers explore bullion services through a
              convenient mobile experience.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One convenient destination for precious metals rates and bullion services.”</p>
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
              D.D. Bullions needed a digital platform to present gold and silver rates, make market
              information easier to access, and help customers explore bullion services through a
              convenient mobile experience.
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
              precious metals.
            </h2>
            <p className="cs-body">
              A digital bullion experience bringing gold and silver rates, market information,
              and bullion booking access together through a convenient mobile interface.
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
            <div className="cs-layered cs-product-stage">
              <img loading="lazy" decoding="async" src={productLaptop} alt="D.D. Bullions website on a desktop." />
              {/* the website screen is redrawn as vector text so it stays sharp at any zoom */}
              <img loading="lazy" decoding="async" src={productScreen} alt="" aria-hidden="true" />
            </div>
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
        <div className="cs-layered cs-features-band cs-band-stage">
          <img loading="lazy" decoding="async" src={keyFeatures} alt="D.D. Bullions gold rates on a phone." />
          <img loading="lazy" decoding="async" src={bandScreen} alt="" aria-hidden="true" />
        </div>
        <div className="cs-layered cs-devices cs-devices-stage">
          <div className="cs-devices-hardware">
            <img loading="lazy" decoding="async" src={devices} alt="D.D. Bullions on a desktop and two phones." />
          </div>
          <img loading="lazy" decoding="async" src={devicesScreen} alt="" aria-hidden="true" />
        </div>
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

export default CaseDDBullions;
