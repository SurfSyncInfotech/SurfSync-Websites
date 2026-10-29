import hero from "../assets/case-infocus/hero.webp";
import productLaptop from "../assets/case-infocus/product.webp";
import keyFeatures from "../assets/case-infocus/key-features.jpg";
import devices from "../assets/case-infocus/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-infocus/stat-0.png";
import stat1 from "../assets/case-infocus/stat-1.png";
import stat2 from "../assets/case-infocus/stat-2.png";
import stat3 from "../assets/case-infocus/stat-3.png";
import need0 from "../assets/case-infocus/need-0.png";
import need1 from "../assets/case-infocus/need-1.png";
import need2 from "../assets/case-infocus/need-2.png";
import need3 from "../assets/case-infocus/need-3.png";
import role0 from "../assets/case-infocus/role-0.png";
import role1 from "../assets/case-infocus/role-1.png";
import role2 from "../assets/case-infocus/role-2.png";
import tool0 from "../assets/case-modern-auto/tool-0.png";
import tool1 from "../assets/case-modern-auto/tool-1.png";
import tool2 from "../assets/case-modern-auto/tool-2.png";
import tool3 from "../assets/case-modern-auto/tool-3.png";
import tool4 from "../assets/case-modern-auto/tool-4.png";
import tool5 from "../assets/case-modern-auto/tool-5.png";
import CaseProof from "./CaseProof";
import "./CaseStudy.css";
import "./CaseInfocus.css";

const stats = [
  [stat0, "6", "Role-based\npanels"],
  [stat1, "1", "Connected publishing\nplatform"],
  [stat2, "1", "Complete journal\nworkflow"],
  [stat3, "100%", "Responsive\nexperience"],
];

const needs = [
  [need0, "Submit", "Submit and track manuscripts"],
  [need1, "Review", "Manage reviewers, assignments."],
  [need2, "Publish", "Revisions to publication"],
  [need3, "Manage", "Right tools and access"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We mapped the journal workflow, stakeholder roles, manuscript process, and publishing requirements.",
  },
  {
    n: "2",
    title: "Design",
    text: "We created dedicated interfaces for authors, reviewers, editors, and administrators.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built and delivered a responsive journal publishing platform with role-based workflows.",
  },
];

const panels = [
  [role0, "Author Panel", "Track all process."],
  [role1, "Reviewer Panel", "Access all workflows."],
  [role2, "Editorial Panel", "Manage all workflows."],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

function CaseInfocus() {
  return (
    <div className="case-page is-infocus">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>
            INFOCUS
            <br />
            PUBLICATIONS
          </h1>
          <p className="cs-hero-sub">Publish Research. Build Knowledge.</p>
          <p className="cs-body">
            A complete digital publishing platform designed to connect authors, reviewers,
            editors, and administrators through one structured journal workflow.
          </p>
          <ul className="cs-tags">
            <li>Academic Publishing</li>
            <li>Journal Platform</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="Infocus Publications on a laptop and two phones." />
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
              Infocus Publications needed a centralized platform to manage manuscripts, reviewers,
              editors, publications, and journal information from submission through final
              publication.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>One connected platform for every stage of the journal publishing process.</p>
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
              Infocus Publications is an open-access publisher of peer-reviewed academic journals.
              We turned its submission, review, editorial, and publishing steps into one clear,
              connected workflow.
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
              One platform for <span>complete</span>
              <br />
              <span>publication journey.</span>
            </h2>
            <p className="cs-body">
              Infocus Publications required a complete digital publishing platform to manage the
              end-to-end workflow of academic journals. The platform needed to support authors,
              corresponding authors, reviewers, editors, the Editor-in-Chief, and administrators,
              while providing a professional public-facing journal website.
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
            <img loading="lazy" decoding="async" src={productLaptop} alt="Infocus journal website on a laptop." />
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
        <img loading="lazy" decoding="async" className="cs-features-band" src={keyFeatures} alt="Infocus journal site on a phone." />
        <img loading="lazy" decoding="async"
          className="cs-devices"
          src={devices}
          alt="Infocus Publications on a desktop and two phones."
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

export default CaseInfocus;
