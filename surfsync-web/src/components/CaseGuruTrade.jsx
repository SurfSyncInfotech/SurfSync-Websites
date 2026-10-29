import hero from "../assets/case-gurutrade/hero.webp";
import productLaptop from "../assets/case-gurutrade/product.webp";
import keyFeatures from "../assets/case-gurutrade/band.webp";
import devices from "../assets/case-gurutrade/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-gurutrade/stat-0.svg";
import stat1 from "../assets/case-foodies/stat-1.svg";
import stat2 from "../assets/case-gurutrade/stat-2.svg";
import stat3 from "../assets/case-gurutrade/stat-3.svg";
import need0 from "../assets/case-foodies/need-0.svg";
import need1 from "../assets/case-gurutrade/need-1.svg";
import need2 from "../assets/case-gurutrade/need-2.svg";
import need3 from "../assets/case-gurutrade/need-3.svg";
import role0 from "../assets/case-gurutrade/role-0.svg";
import role1 from "../assets/case-foodies/role-1.svg";
import role2 from "../assets/case-gurutrade/role-2.svg";
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
import "./CaseGuruTrade.css";

const stats = [
  [stat0, "200+", "Available asset\noptions"],
  [stat1, "₹10,000", "Virtual demo funds"],
  [stat2, "₹20", "Minimum trade\namount"],
  [stat3, "1", "Connected trading\nplatform"],
];

const needs = [
  [need0, "Explore", "Discover available assets"],
  [need1, "Practice", "Provide a demo environment"],
  [need2, "Monitor", "Make market quotes"],
  [need3, "Manage", "Bring trading activity"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped the essential user journey across asset discovery, market monitoring, and account management.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the interface to make market information, demo practice, and trading tools easier to navigate.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We delivered a digital trading experience connecting market access, demo trading, account activity, and payment workflows.",
  },
];

const panels = [
  [role0, "Market Access", "Explore available assets"],
  [role1, "Demo Account", "Practice using a demo account"],
  [role2, "Market Monitoring", "Review real-time market quotes"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* GuruTrade7 case study: same 1440px design grid as ClinicSpots */
function CaseGuruTrade() {
  return (
    <div className="case-page is-infocus is-modauto is-clinic-case is-foodies-case is-gurutrade-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>GuruTrade7</h1>
          <p className="cs-hero-sub">
            Explore Markets. Practice with Confidence.
          </p>
          <p className="cs-body">
            A digital trading platform bringing asset access, real-time market quotes, demo
            trading, and account management together through one connected experience.
          </p>
          <ul className="cs-tags">
            <li>Fintech</li>
            <li>Trading Platform</li>
            <li>Mobile apps &amp; web</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="GuruTrade7 on a laptop and two phones." />
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
              A clearer way to access
              <br />
              trading markets.
            </h2>
            <p className="cs-body">
              GuruTrade7 needed a digital platform where users could explore available assets,
              monitor market quotes, practice with virtual funds, and manage trading activity
              through an accessible interface.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One connected destination for market access, demo practice, and account management.”</p>
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
              A digital trading platform bringing asset access, real-time market quotes, demo
              trading, and account management together through one connected experience.
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
              trading access and
              <br />
              account activity.
            </h2>
            <p className="cs-body">
              A connected trading experience bringing asset exploration, real-time market quotes,
              demo practice, and account management together across digital devices.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="GuruTrade7 on a desktop." />
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
          alt="GuruTrade7 home page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="GuruTrade7 on a desktop and two phones."
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

export default CaseGuruTrade;
