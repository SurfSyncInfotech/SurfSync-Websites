import hero from "../assets/case-vakt/hero.webp";
import productLaptop from "../assets/case-vakt/product-laptop.webp";
import keyFeatures from "../assets/case-vakt/key-features.jpg";
import devices from "../assets/case-vakt/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-vakt/stat-0.png";
import stat1 from "../assets/case-vakt/stat-1.png";
import stat2 from "../assets/case-vakt/stat-2.png";
import stat3 from "../assets/case-infocus/stat-3.png";
import need0 from "../assets/case-vakt/need-0.png";
import need1 from "../assets/case-vakt/need-1.png";
import need2 from "../assets/case-vakt/need-2.png";
import need3 from "../assets/case-vakt/need-3.png";
import role0 from "../assets/case-vakt/role-0.png";
import role1 from "../assets/case-vakt/role-1.png";
import role2 from "../assets/case-vakt/role-2.png";
import tool0 from "../assets/case-vakt/tool-0.png";
import tool1 from "../assets/case-vakt/tool-1.png";
import tool2 from "../assets/case-vakt/tool-2.png";
import tool3 from "../assets/case-vakt/tool-3.png";
import tool4 from "../assets/case-vakt/tool-4.png";
import tool5 from "../assets/case-vakt/tool-5.png";
import CaseProof from "./CaseProof";
import "./CaseStudy.css";
import "./CaseVakt.css";

const stats = [
  [stat0, "14+", "Therapy & support programs"],
  [stat1, "6", "Core service areas"],
  [stat2, "1", "Parent-focused platform"],
  [stat3, "100%", "Responsive experience"],
];

const needs = [
  [need0, "Understand", "Clear information"],
  [need1, "Explore", "Easy access for all."],
  [need2, "Trust", "child-focused care"],
  [need3, "Connect", "Simple experience"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We gathered the centre’s requirements, content, services, and communication needs.",
  },
  {
    n: "2",
    title: "Design",
    text: "We created a clear, parent-friendly interface with simple navigation and structured information.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built and delivered a responsive website for desktop, tablet, and mobile.",
  },
];

const features = [
  [role0, "Centre Overview", "A clear introduction to VAKT CDC and its mission."],
  [
    role1,
    "Therapy Services",
    "Explore speech therapy, ABA, special education, individual and group therapy, and more.",
  ],
  [role2, "Parent Support", "Dedicated information for parent training and home-based support."],
];

const tools = [
  [tool0, "React"],
  [tool1, "SQL"],
  [tool2, "Figma"],
  [tool3, "Node.js"],
  [tool4, "Miro"],
  [tool5, "Docker"],
];

function CaseVakt() {
  return (
    <div className="case-page is-vakt">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>
            VAKT Child <br />
            Development Centre
          </h1>
          <p className="cs-hero-sub">A Centre for Every Neurodiverse Child.</p>
          <p className="cs-body">
            A professional website built to help parents understand VAKT’s therapies, approach,
            and support services — all in one clear digital experience.
          </p>
          <ul className="cs-tags">
            <li>Healthcare</li>
            <li>Informative Website</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="VAKT website on a laptop and two phones." />
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
            <p className="cs-lead">A clearer digital presence for parents.</p>
            <p className="cs-body">
              VAKT CDC needed a professional website to explain its services, introduce its team,
              build trust with parents, and make it easier for families to understand the support
              available.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>
              “A simple, trustworthy website where parents can understand our services and take
              the next step with confidence.”
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
              VAKT Child Development Centre - A Centre For Every Neurodiverse Children. We provide
              comprehensive therapy and support services for children with diverse developmental
              needs.
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
              A complete digital
              <br />
              <span>
                information
                <br />
                experience.
              </span>
            </h2>
            <p className="cs-body">
              A clean website that helps parents discover VAKT CDC, understand its therapies,
              explore its approach, and connect with the centre.
            </p>
            <ul className="cs-roles">
              {features.map(([icon, title, text]) => (
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="VAKT website on a laptop." />
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
        <img loading="lazy" decoding="async" className="cs-features-band" src={keyFeatures} alt="VAKT home screen on a phone." />
        <img loading="lazy" decoding="async" className="cs-devices" src={devices} alt="VAKT on a desktop and two phones." />
      </section>

      <section className="cs-tools">
        <div className="cs-wrap">
          <p className="cs-kicker">Tech stack</p>
          <h2>
            Built with <span>right tools.</span>
          </h2>
          <ul>
            {tools.map(([icon, name]) => (
              <li key={name}>
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

export default CaseVakt;
