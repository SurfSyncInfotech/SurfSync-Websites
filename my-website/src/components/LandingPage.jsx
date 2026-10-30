import logo from "../assets/logo.webp";
import heroImage from "../assets/image3_hero.jpg";
import webArt from "../assets/services/svc-web.webp";
import mobileArt from "../assets/services/svc-mobile.webp";
import commerceArt from "../assets/services/svc-ecommerce.webp";
import cloudArt from "../assets/services/svc-cloud.webp";
import enterpriseArt from "../assets/services/svc-enterprise.webp";
import aiArt from "../assets/services/svc-ai.webp";
import swagatArt from "../assets/swagat-suite.webp";
import crmArt from "../assets/crm-card.webp";
import hrmsArt from "../assets/hrms-card.webp";
import Contact from "./LandingContact";
import "./LandingPage.css";

const services = [
  {
    title: "Web development",
    description: "Websites and web apps built to perform, scale, and evolve with your business.",
    image: webArt,
  },
  {
    title: "Mobile apps",
    description: "High-performance iOS and Android experiences designed around the people who use them.",
    image: mobileArt,
  },
  {
    title: "E-commerce and CMS",
    description: "Commerce and content systems that make buying and managing simpler.",
    image: commerceArt,
  },
  {
    title: "Cloud and DevOps",
    description: "Secure infrastructure, cloud migration, CI/CD, and ongoing monitoring.",
    image: cloudArt,
  },
  {
    title: "Enterprise IT solutions",
    description: "Connected systems and dependable IT support that keep teams moving.",
    image: enterpriseArt,
  },
  {
    title: "AI and automation",
    description: "Intelligent workflows that reduce repetitive work and make room for better decisions.",
    image: aiArt,
  },
];

const products = [
  {
    name: "HRMS",
    description: "Manage employee records, attendance, leave, departments, and payroll-ready data.",
    image: hrmsArt,
  },
  {
    name: "Swagat Suite",
    description: "QR ordering, kitchen updates, billing, and reports for restaurant teams.",
    image: swagatArt,
  },
  {
    name: "PatronPing",
    description: "Sales CRM to manage leads, follow-ups, deals, and sales performance in one place.",
    image: crmArt,
  },
];

const diwaliBenefits = [
  { title: "Expert", detail: "Consultation", icon: "chat" },
  { title: "Tailored", detail: "Solutions", icon: "idea" },
  { title: "Clear", detail: "Roadmap", icon: "rocket" },
];

const offerMessages = [
  "Diwali special offer: free consultation for your next project",
  "Celebrate this Diwali with a smarter digital start for your business",
  "Limited time Diwali offer: free scope, timeline & expert guidance",
  "Diwali special offer: book your free 1-on-1 consultation today",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function DiyaIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="landing-diya-icon">
      <path
        d="M10 1.5c-1.3 2-2.1 3.5-1.9 4.8.2 1.3 1 2.2 1.9 2.2s1.7-.9 1.9-2.2c.2-1.3-.6-2.8-1.9-4.8Z"
        fill="#FFE066"
      />
      <path
        d="M10 3.2c-.7 1.3-1.1 2.2-1 3 .1.8.5 1.3 1 1.3s.9-.5 1-1.3c.1-.8-.3-1.7-1-3Z"
        fill="#FF9E1B"
      />
      <path
        d="M3 9.5c.8 4 3.5 6.5 7 6.5s6.2-2.5 7-6.5c-2.3 1.6-4.5 2-7 2s-4.7-.4-7-2Z"
        fill="#FFD27D"
      />
      <path
        d="M3 9.5c2.3 1.6 4.5 2 7 2s4.7-.4 7-2"
        stroke="#FFF1CC"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7.5 16h5"
        stroke="#FFB84D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function OfferMarquee() {
  return (
    <div className="landing-offer-bar">
      <span className="landing-sr-only">
        Diwali offer: free consultation for website, app, or AI automation projects.
      </span>
      <div className="landing-offer-window" aria-hidden="true">
        <div className="landing-offer-track">
          {[0, 1].map((group) => (
            <div className="landing-offer-group" key={group}>
              {offerMessages.map((message) => (
                <span className="landing-offer-item" key={`${group}-${message}`}>
                  <DiyaIcon />
                  {message}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenefitIcon({ name }) {
  const paths = {
    chat: <><path d="M6 7.5h12a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-5l-4.5 3v-3H6a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z" /><path d="M8 12.5h8" /></>,
    idea: <><path d="M12 3.5a6.5 6.5 0 0 0-4 11.6c.8.6 1.3 1.4 1.5 2.4h5c.2-1 .7-1.8 1.5-2.4A6.5 6.5 0 0 0 12 3.5Z" /><path d="M9.5 21h5M10 17.5v-2m4 2v-2" /></>,
    rocket: <><path d="M14 4c3.5-1 6-1 6-1s0 2.5-1 6c-.7 2.4-2.2 4.7-4.2 6.7l-4.5-4.5C12.3 8.2 13.6 6 14 4Z" /><path d="m10.3 11.2-3.8.5-3 3 5.2.8m5.1-5.2-.5 3.8-3 3-.8-5.2M6.5 18.5c-1.3.2-2 1-2 2.5 1.5 0 2.3-.7 2.5-2Z" /><circle cx="16" cy="7" r="1.3" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ContactLink({ children, className = "" }) {
  return (
    <a className={`landing-link ${className}`} href="/enquries#contact">
      {children}
      <ArrowIcon />
    </a>
  );
}

function SectionArtwork({ kind }) {
  return (
    <div className={`landing-heading-art is-${kind}`} aria-hidden="true">
      {kind === "services" ? (
        <svg viewBox="0 0 180 110" fill="none">
          <path d="M37 30h43m-43 25h43m-43 25h43m0-50 47 25-47 25m0-25h47" />
          <circle cx="28" cy="30" r="8" />
          <circle cx="28" cy="55" r="8" />
          <circle cx="28" cy="80" r="8" />
          <rect x="119" y="42" width="34" height="26" rx="8" />
          <path d="M130 55h12" />
        </svg>
      ) : (
        <svg viewBox="0 0 180 110" fill="none">
          <rect x="28" y="20" width="124" height="70" rx="9" />
          <path d="M28 38h124" />
          <circle cx="40" cy="29" r="2" />
          <circle cx="49" cy="29" r="2" />
          <rect x="42" y="50" width="28" height="25" rx="4" />
          <path d="M80 53h48M80 62h38M80 71h44" />
        </svg>
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <div className="landing-page" id="top">
      <header className="landing-header">
        <a className="landing-brand" href="/enquries#top" aria-label="SurfSync Infotech home">
          <img src={logo} alt="SurfSync Infotech" />
        </a>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="/enquries#landing-services">Services</a>
          <a href="/enquries#landing-products">Products</a>
          <a className="landing-nav-contact" href="/enquries#contact">
            Contact us <ArrowIcon />
          </a>
        </nav>
      </header>
      <OfferMarquee />

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-copy">
            <h1 id="landing-title">A smarter tomorrow, built together.</h1>
            <p>
              We design and build digital products, intelligent systems, and automation for a more
              human future.
            </p>
            <ContactLink className="landing-link-primary">Let’s build together</ContactLink>
            <span className="landing-hero-note">Digital products and technology for ambitious teams</span>
          </div>
          <figure className="landing-hero-image">
            <img src={heroImage} alt="A team working together around a computer" fetchPriority="high" />
            <figcaption>Ideas become useful when people can put them to work.</figcaption>
          </figure>
        </section>

        <section className="landing-diwali" aria-labelledby="diwali-title">
          <div className="landing-diwali-photo">
            <img
              src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=900&q=85"
              alt="Colorful fireworks lighting up the night sky"
              loading="lazy"
            />
          </div>
          <div className="landing-diwali-copy">
            <div className="landing-diwali-tag">
              <span className="landing-diwali-tag-icon">
                <DiyaIcon />
              </span>
              <span className="landing-diwali-tag-text">Diwali Special Offer</span>
              <span className="landing-diwali-tag-sparkle">✨</span>
            </div>
            <h2 id="diwali-title">
              A brighter start for
              <br />
              your <span>next big idea.</span>
            </h2>
            <span>Get a free consultation for your website, app, or AI automation project.</span>
            <ul className="landing-diwali-benefits" aria-label="Consultation benefits">
              {diwaliBenefits.map((benefit) => (
                <li key={benefit.title}>
                  <span className="landing-diwali-benefit-icon">
                    <BenefitIcon name={benefit.icon} />
                  </span>
                  <span className="landing-diwali-benefit-copy">
                    <strong>{benefit.title}</strong>
                    <span>{benefit.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="landing-diwali-action">
            <ContactLink className="landing-link-light">Book a free consultation</ContactLink>
            <span>Let’s build what’s next.</span>
          </div>
        </section>

        <section className="landing-services" id="landing-services" aria-labelledby="services-title">
          <div className="landing-section-heading">
            <h2 id="services-title">The right expertise, from first idea to launch.</h2>
            <SectionArtwork kind="services" />
          </div>
          <div className="landing-service-grid">
            {services.map((service) => (
              <article className="landing-service" key={service.title}>
                <img src={service.image} alt="" loading="lazy" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ContactLink>Discuss this service</ContactLink>
              </article>
            ))}
          </div>
          <div className="landing-service-close">
            <p>Have a challenge in mind?</p>
            <ContactLink className="landing-link-light">Talk with our team</ContactLink>
          </div>
        </section>

        <section className="landing-products" id="landing-products" aria-labelledby="products-title">
          <div className="landing-section-heading">
            <h2 id="products-title">Products made for everyday work.</h2>
            <SectionArtwork kind="products" />
          </div>
          <div className="landing-product-grid">
            {products.map((product) => (
              <article className="landing-product" key={product.name}>
                <div className="landing-product-image">
                  <img src={product.image} alt={`${product.name} product preview`} loading="lazy" />
                </div>
                <div className="landing-product-copy">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ContactLink>Ask about {product.name}</ContactLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Contact compact />
      </main>

      <footer className="landing-footer">
        <a className="landing-brand" href="/enquries#top" aria-label="SurfSync Infotech home">
          <img src={logo} alt="SurfSync Infotech" />
        </a>
        <span>Technology for people and progress.</span>
        <a href="/enquries#contact">Get in touch</a>
      </footer>
    </div>
  );
}

export default LandingPage;