import hero from "../assets/case-marutipay/hero.webp";
import productLaptop from "../assets/case-marutipay/product.webp";
import keyFeatures from "../assets/case-marutipay/band.webp";
import devices from "../assets/case-marutipay/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-marutipay/stat-0.svg";
import stat1 from "../assets/case-marutipay/stat-1.svg";
import stat2 from "../assets/case-marutipay/stat-2.svg";
import stat3 from "../assets/case-marutipay/stat-3.svg";
import need0 from "../assets/case-marutipay/need-0.svg";
import need1 from "../assets/case-clinicspots/need-1.svg";
import need2 from "../assets/case-marutipay/need-2.svg";
import need3 from "../assets/case-marutipay/need-3.svg";
import role0 from "../assets/case-marutipay/need-3.svg";
import role1 from "../assets/case-clinicspots/role-1.svg";
import role2 from "../assets/case-marutipay/need-2.svg";
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
import "./CaseMarutiPay.css";

const stats = [
  [stat0, "4", "Core service\ncategories"],
  [stat1, "3", "Centralized payment\nportal"],
  [stat2, "1", "Device types\nsupported"],
  [stat3, "3", "Unified service\ninterface"],
];

const needs = [
  [need0, "Recharge", "Mobile recharge services easy to find and access."],
  [need1, "Pay Bills", "Organize essential bill payment"],
  [need2, "FASTag", "FASTag-related services."],
  [need3, "Navigate", "A clear interface."],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We identified the key payment categories and organized the platform around everyday user needs.",
  },
  {
    n: "2",
    title: "Design",
    text: "We structured the interface and navigation to make payment services easy to discover and access.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built a responsive web portal bringing mobile recharge, bill payments, FASTag, and utility services together.",
  },
];

const panels = [
  [role0, "Recharge Services", "Mobile recharge options"],
  [role1, "Bill Payments", "Bill payment services"],
  [role2, "FASTag Services", "Access FASTag-related payment options."],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

/* MarutiPay Portal case study: same 1440px design grid as Modern Auto Parts */
function CaseMarutiPay() {
  return (
    <div className="case-page is-infocus is-modauto is-maruti-case">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>Marutipay Portal</h1>
          <p className="cs-hero-sub">Everyday Payments. One Simple Platform.</p>
          <p className="cs-body">
            A centralized digital payments portal bringing mobile recharge, bill payments, FASTag,
            and utility services together in one accessible online experience.
          </p>
          <ul className="cs-tags">
            <li>Digital Payments</li>
            <li>Payment Services</li>
            <li>Responsive Web</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="MarutiPay portal on a laptop and two phones." />
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
              MarutiPay needed a centralized web platform to organize multiple payment services,
              simplify service discovery, and make everyday recharge and bill payment options
              easier to access across devices.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One convenient destination for essential digital payment services.”</p>
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
              A centralized digital payments portal bringing mobile recharge, bill payments,
              FASTag, and utility services together in one accessible online experience.
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
              One portal for everyday
              <br />
              <span>payment needs.</span>
            </h2>
            <p className="cs-body">
              A centralized digital payments platform that organizes essential services within
              one accessible interface, helping users find relevant payment options with ease.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="MarutiPay features page on a laptop." />
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
          alt="MarutiPay home page on a phone."
        />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="MarutiPay bus ticket booking on a desktop and services on two phones."
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

export default CaseMarutiPay;
