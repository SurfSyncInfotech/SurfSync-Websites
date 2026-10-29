import hero from "../assets/case-natural-ayurved/hero.webp";
import productLaptop from "../assets/case-natural-ayurved/product.webp";
import keyFeatures from "../assets/case-natural-ayurved/band.webp";
import devices from "../assets/case-natural-ayurved/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-natural-ayurved/stat-0.svg";
import stat1 from "../assets/case-natural-ayurved/stat-1.svg";
import stat2 from "../assets/case-natural-ayurved/stat-2.svg";
import stat3 from "../assets/case-natural-ayurved/stat-3.svg";
import need0 from "../assets/case-natural-ayurved/need-0.svg";
import need1 from "../assets/case-natural-ayurved/need-1.svg";
import need2 from "../assets/case-natural-ayurved/need-2.svg";
import need3 from "../assets/case-natural-ayurved/need-3.svg";
import role0 from "../assets/case-natural-ayurved/role-0.svg";
import role1 from "../assets/case-natural-ayurved/role-1.svg";
import role2 from "../assets/case-natural-ayurved/role-2.svg";
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
import "./CaseNaturalAyurved.css";

const stats = [
  [stat0, "3", "Featured product\nranges"],
  [stat1, "1", "Centralized\nonline store"],
  [stat2, "4", "Core experience\nareas"],
  [stat3, "3", "Device types\nsupported"],
];

const needs = [
  [need0, "Discover", "Health-focused categories."],
  [need1, "Shop", "Purchasing easier to navigate."],
  [need2, "Consult", "Explore Ayurvedic consultation"],
  [need3, "Learn", "Educational content in one place."],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped product categories, shopping needs, consultation access, and essential website content.",
  },
  {
    n: "2",
    title: "Design",
    text: "We organized the storefront to make product discovery, wellness information, and consultations easier to explore.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built a responsive e-commerce platform connecting product browsing, shopping, consultation booking, and educational content.",
  },
];

const panels = [
  [role0, "Product Discovery", "Explore Ayurvedic products"],
  [role1, "Product Store", "Discover featured products."],
  [role2, "Consultation Booking", "Find consultation information."],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* Natural Ayurved case study: same 1440px design grid as ClinicSpots */
function CaseNaturalAyurved() {
  return (
    <div className="case-page is-infocus is-modauto is-clinic-case is-foodies-case is-ayurved-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>
            THE NATURAL
            <br />
            AYURVED
          </h1>
          <p className="cs-hero-sub">
            Natural Wellness. Made Easier.
          </p>
          <p className="cs-body">
            An Ayurvedic e-commerce platform bringing herbal products, health-focused categories,
            and personalized consultation options together in one digital experience.
          </p>
          <ul className="cs-tags">
            <li>Ayurvedic E-commerce</li>
            <li>Wellness</li>
            <li>Responsive Web</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="The Natural Ayurved on a laptop and two phones." />
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
              The Natural Ayurved needed a centralized platform to showcase Ayurvedic products,
              organize health-focused categories, simplify product discovery, and make
              consultation options easier to access.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One destination for Ayurvedic products, wellness information, and consultation access.”</p>
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
              An Ayurvedic e-commerce platform bringing herbal products, health-focused categories,
              and personalized consultation options together in one digital experience.
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
              Ayurvedic wellness.
            </h2>
            <p className="cs-body">
              A connected digital storefront bringing Ayurvedic product collections, health-focused
              categories, consultation options, and educational resources into one accessible
              experience.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="The Natural Ayurved store on a desktop." />
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
          alt="The Natural Ayurved home page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="The Natural Ayurved on a desktop and two phones."
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

export default CaseNaturalAyurved;
