import hero from "../assets/case-vls/hero.webp";
import productImac from "../assets/case-vls/product-imac.webp";
import keyFeatures from "../assets/case-vls/key-features.jpg";
import devices from "../assets/case-vls/devices.webp";
import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
import stat0 from "../assets/case-vls/stat-0.png";
import stat1 from "../assets/case-vls/stat-1.png";
import stat2 from "../assets/case-vls/stat-2.png";
import stat3 from "../assets/case-infocus/stat-3.png";
import need0 from "../assets/case-vls/need-0.png";
import need1 from "../assets/case-vls/need-1.png";
import need2 from "../assets/case-vls/need-2.png";
import need3 from "../assets/case-vls/need-3.png";
import role0 from "../assets/case-vls/role-0.png";
import role1 from "../assets/case-vls/role-1.png";
import role2 from "../assets/case-vls/role-2.png";
import tool0 from "../assets/case-modern-auto/tool-0.png";
import tool1 from "../assets/case-modern-auto/tool-1.png";
import tool2 from "../assets/case-modern-auto/tool-2.png";
import tool3 from "../assets/case-modern-auto/tool-3.png";
import tool4 from "../assets/case-modern-auto/tool-4.png";
import tool5 from "../assets/case-modern-auto/tool-5.png";
import CaseProof from "./CaseProof";
import "./CaseStudy.css";
import "./CaseVls.css";

const stats = [
  [stat0, "6", "Product\ncategories"],
  [stat1, "2", "Payment\noptions"],
  [stat2, "1", "Complete online\nstore"],
  [stat3, "100%", "Responsive\nexperience"],
];

const needs = [
  [need0, "Discover", "Browse products"],
  [need1, "Explore", "Understand products"],
  [need2, "Shop", "Just add and buy"],
  [need3, "Trust", "warranty & support"],
];

const steps = [
  {
    n: "1",
    title: "Understand",
    text: "We gathered the product range, categories, brand content, and e-commerce requirements.",
  },
  {
    n: "2",
    title: "Design",
    text: "We created a premium shopping experience with clear navigation and strong product presentation.",
  },
  {
    n: "3",
    title: "Develop",
    text: "We built and delivered a responsive e-commerce website for desktop and mobile.",
  },
];

const features = [
  [role0, "Product Catalogue", "Browse any products."],
  [role1, "Product Discovery", "Search product pages"],
  [role2, "Customer Experience", "Wishlist, accounts, COD etc"],
];

const tools = [
  [tool0, "React"],
  [tool1, "Miro"],
  [tool2, "Google Forms"],
  [tool3, "Google Sheets"],
  [tool4, "Miro"],
  [tool5, "Google Sheets"],
];

function CaseVls() {
  return (
    <div className="case-page is-vls">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>VLS WELLNESS</h1>
          <p className="cs-hero-sub">Wellness for Every Body &amp; Lifestyle.</p>
          <p className="cs-body">
            A premium e-commerce experience built to help customers discover wellness products,
            understand their benefits, and shop with confidence.
          </p>
          <ul className="cs-tags">
            <li>E-commerce</li>
            <li>Wellness</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        <div className="cs-hero-art">
          <img src={hero} alt="VLS Wellness store on a laptop and two phones." />
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
              VLS Wellness needed a modern e-commerce website to showcase its wellness range,
              simplify product discovery, build customer trust, and make online shopping easy from
              browsing to checkout.
            </p>
          </div>
          <blockquote className="cs-quote">
            <img loading="lazy" decoding="async" src={bulb} alt="" />
            <p>
              “A premium online store where customers can discover, compare, and purchase wellness
              products with confidence.”
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
              VLS Wellness is a premium wellness and lifestyle brand dedicated to bringing health,
              relaxation, and comfort into homes, workplaces, and hospitality spaces across India.
              Built on the trusted legacy of VLS Logistics.
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
              A complete
              <br />
              wellness shopping
              <br />
              experience.
            </h2>
            <p className="cs-body">
              A premium storefront that helps customers discover VLS Wellness products, explore
              details, save favourites, and complete purchases online.
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
            <img loading="lazy" decoding="async" src={productImac} alt="VLS Wellness store on an iMac." />
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
        <img loading="lazy" decoding="async" className="cs-features-band" src={keyFeatures} alt="VLS Wellness store on a phone." />
        <img loading="lazy" decoding="async" className="cs-devices" src={devices} alt="VLS Wellness on a desktop and two phones." />
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

export default CaseVls;
