import hero from "../assets/case-foodies/hero.webp";
import productLaptop from "../assets/case-foodies/product.webp";
import keyFeatures from "../assets/case-foodies/band.webp";
import devices from "../assets/case-foodies/devices.webp";
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

const stats = [
  [stat0, "100+", "Vendor options"],
  [stat1, "1", "Connected\nordering app"],
  [stat2, "3", "Connected platform\naudiences"],
  [stat3, "1-tap", "Jeebu wallet\npayments"],
];

const needs = [
  [need0, "Discover", "Explore restaurants."],
  [need1, "Order", "Make ordering convenient."],
  [need2, "Pay", "Simplify checkout"],
  [need3, "Track", "Keep customers informed."],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped customer ordering needs, vendor requirements, and the delivery journey to bring the experience together.",
  },
  {
    n: "2",
    title: "Design",
    text: "We shaped a mobile-first interface that makes food discovery, ordering, rewards, and payments easier to navigate.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We delivered a food delivery experience with multi-vendor ordering, AI recommendations, loyalty rewards, digital payments, and delivery tracking.",
  },
];

const panels = [
  [role0, "Smart Food Discovery", "Explore food options"],
  [role1, "Multi-Vendor Ordering", "Multiple restaurants and place"],
  [role2, "Rewards & Jeebu Wallet", "Earn loyalty points, access offers."],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* Foodies case study: same 1440px design grid as ClinicSpots */
function CaseFoodies() {
  return (
    <div className="case-page is-infocus is-modauto is-clinic-case is-foodies-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>FOODIES</h1>
          <p className="cs-hero-sub">
            Discover More.
            <br />
            Order Smarter.
          </p>
          <p className="cs-body">
            A multi-vendor food delivery platform connecting customers with restaurants, bakeries,
            home cooks, groceries, and everyday essentials through one convenient app.
          </p>
          <ul className="cs-tags">
            <li>Food Delivery</li>
            <li>Multi-Vendor Marketplace</li>
            <li>Mobile App</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="Foodies on a laptop and two phones." />
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
              Foodies needed a convenient digital platform where customers could discover local
              vendors, order from multiple restaurants, pay easily, and track deliveries while
              helping vendors reach more customers.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One app to discover, order, pay, and track from local vendors.”</p>
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
              A multi-vendor food delivery platform connecting customers with restaurants,
              bakeries, home cooks, groceries, and everyday essentials through one convenient
              app.
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
              One app for food
              <br />
              and everyday
              <br />
              essentials.
            </h2>
            <p className="cs-body">
              A connected delivery platform bringing restaurants, bakeries, home cooks, groceries,
              and other local vendors into one convenient ordering experience.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="Foodies on a desktop." />
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
          alt="Foodies home page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="Foodies on a desktop and two phones."
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

export default CaseFoodies;
