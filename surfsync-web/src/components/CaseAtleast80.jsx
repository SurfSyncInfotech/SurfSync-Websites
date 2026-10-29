import heroLaptop from "../assets/case-atleast80/hero-laptop.webp";
import heroPhones from "../assets/case-atleast80/hero-phones.webp";
import productLaptop from "../assets/case-atleast80/product-laptop.webp";
import keyFeatures from "../assets/case-atleast80/key-features.webp";
import devices from "../assets/case-atleast80/devices.webp";
import processCurve from "../assets/case-atleast80/process-curve.webp";
import bulb from "../assets/case-atleast80/bulb.png";
import stat0 from "../assets/case-atleast80/stat-0.png";
import stat1 from "../assets/case-atleast80/stat-1.png";
import stat2 from "../assets/case-atleast80/stat-2.png";
import stat3 from "../assets/case-atleast80/stat-3.png";
import need0 from "../assets/case-atleast80/need-0.png";
import need1 from "../assets/case-atleast80/need-1.png";
import need2 from "../assets/case-atleast80/need-2.png";
import need3 from "../assets/case-atleast80/need-3.png";
import role0 from "../assets/case-atleast80/role-0.png";
import role1 from "../assets/case-atleast80/role-1.png";
import role2 from "../assets/case-atleast80/role-2.png";
import tool0 from "../assets/case-modern-auto/tool-0.png";
import tool1 from "../assets/case-modern-auto/tool-1.png";
import tool2 from "../assets/case-modern-auto/tool-2.png";
import tool3 from "../assets/case-modern-auto/tool-3.png";
import tool4 from "../assets/case-modern-auto/tool-4.png";
import tool5 from "../assets/case-modern-auto/tool-5.png";
import CaseProof from "./CaseProof";
import "./CaseStudy.css";

const stats = [
  [stat0, "4", "Connected experiences"],
  [stat1, "1", "Integrated ecosystem"],
  [stat2, "4", "Core platform roles"],
  [stat3, "1", "Complete order lifecycle"],
];

const needs = [
  [need0, "Order", "Browse, order, and track food."],
  [need1, "Prepare", "Give kitchens control"],
  [need2, "Deliver", "Help riders"],
  [need3, "Manage", "Administrators centralized control"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped the customer, kitchen, rider, and admin workflows to define how every part of the delivery process should connect.",
  },
  {
    n: "2",
    title: "Design",
    text: "We created dedicated interfaces for each stakeholder, keeping every workflow simple, clear, and task-focused.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built and delivered a connected food delivery platform with secure authentication, order management, and real-time status updates.",
  },
];

const roles = [
  [role0, "Customer App", "For order food"],
  [role1, "Kitchen Panel", "Manage orders"],
  [role2, "Rider Panel", "Manage delivery operations"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

function CaseAtleast80() {
  return (
    <div className="case-page">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>AtLeast80</h1>
          <p className="cs-hero-sub">From Home Kitchens to Doorsteps.</p>
          <p className="cs-body">
            A complete food delivery ecosystem connecting customers, kitchens, riders, and
            administrators through one connected platform.
          </p>
          <ul className="cs-tags">
            <li>Food Delivery</li>
            <li>Multi-Role Platform</li>
            <li>Mobile &amp; Web</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img className="cs-hero-laptop" src={heroLaptop} alt="AtLeast80 website on a laptop." />
          <img className="cs-hero-phones" src={heroPhones} alt="AtLeast80 app on two phones." />
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
              AtLeast80 needed a centralized system connecting customers, kitchens, delivery
              partners, and administrators while keeping ordering, preparation, delivery, and
              management connected.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>“One connected platform for the complete food ordering and delivery journey.”</p>
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
              Order food online — live menus, fast checkout, and local delivery partners. Order
              food online — live menus, fast checkout, and local delivery partners.Order food
              online — live menus,
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
              A complete delivery
              <br />
              <span>experience</span>
            </h2>
            <p className="cs-body">
              A connected food-delivery ecosystem bringing customers, kitchens, riders, and
              administrators together through dedicated apps and management panels.
            </p>
            <ul className="cs-roles">
              {roles.map(([icon, title, text]) => (
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="AtLeast80 website on a laptop." />
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
        <img loading="lazy" decoding="async" className="cs-features-band" src={keyFeatures} alt="AtLeast80 home screen on a phone." />
        <img loading="lazy" decoding="async" className="cs-devices" src={devices} alt="AtLeast80 on a desktop and two phones." />
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

export default CaseAtleast80;
