import bodyWaves from "../assets/services/svc-body_w.svg";
import spark from "../assets/services/svc-spark.svg";
import webArt from "../assets/services/svc-web.webp";
import mobileArt from "../assets/services/svc-mobile.webp";
import commerceArt from "../assets/services/svc-ecommerce.webp";
import cloudArt from "../assets/services/svc-cloud.webp";
import enterpriseArt from "../assets/services/svc-enterprise.webp";
import aiArt from "../assets/services/svc-ai.webp";
import vls from "../assets/services/svc-logo-vls.png";
import doctor360 from "../assets/logo-doctor360.png";
import infocus from "../assets/services/svc-logo-infocus.svg";
import natural from "../assets/services/svc-logo-natural.webp";
import vilvah from "../assets/services/svc-logo-vilvah.svg";
import atleast80 from "../assets/services/svc-logo-atleast80.webp";
import foodies from "../assets/services/svc-logo-foodies.svg";
import vakt from "../assets/services/svc-logo-vakt.webp";
import "./ServicesPage.css";

/* widths and heights are the logo boxes from the design at 1440px */
const logos = [
  { src: vls, name: "VLS Wellness", w: 125, h: 62 },
  { src: doctor360, name: "Doctor 360", w: 150, h: 46 },
  { src: infocus, name: "Infocus", w: 118, h: 18 },
  { src: natural, name: "The Natural Ayurved", w: 63, h: 63 },
  { src: vilvah, name: "Vilvah", w: 87, h: 58 },
  { src: atleast80, name: "Atleast80", w: 134, h: 27 },
  { src: foodies, name: "Foodies", w: 87, h: 32 },
  { src: vakt, name: "VAKT CDC", w: 113, h: 36.56 },
];

/* in the design, rows with the text on the left only highlight their first tag;
   textWidth keeps each description wrapping where the design wraps it */
const services = [
  {
    id: "services-web",
    title: "Web Development",
    text: "Web experiences built to perform, scale and evolve. From websites to web apps tailored to your business.",
    tags: ["Customs web", "Responsive design", "CMS & Integration"],
    art: webArt,
    href: "#web-development",
    textWidth: 480,
  },
  {
    id: "services-mobile",
    title: "Mobile Apps",
    text: "High-performance mobile experiences for iOS and Android that people love to use.",
    tags: ["iOS & Android", "React Native", "Flutter"],
    art: mobileArt,
    href: "#mobile-apps",
    textWidth: 490,
  },
  {
    id: "services-ecommerce",
    title: "E-commerce & CMS",
    text: "Commerce experiences that make buying and managing content simple.",
    tags: ["Online Stores", "Payments", "Product & Content Management"],
    art: commerceArt,
    href: "#ecommerce-cms",
    textWidth: 400,
  },
  {
    id: "services-cloud",
    title: "Cloud & DevOps",
    text: "Reliable infrastructure from development to scale. We set up secure, scalable cloud environments.",
    tags: ["Cloud Migration", "CI/CD", "Monitoring & Support"],
    art: cloudArt,
    href: "#cloud-devops",
    textWidth: 440,
  },
  {
    id: "services-enterprise",
    title: "Enterprise IT Solutions",
    text: "Connect systems, protect operations and keep teams moving.",
    tags: ["System Integration", "Managed IT Support", "IT Infrastructure"],
    art: enterpriseArt,
    href: "#enterprise-it",
    textWidth: 470,
  },
  {
    id: "services-ai",
    title: "AI & Automation",
    text: "Turn repetitive work into intelligent workflows. We help you automate processes and unlock value with AI.",
    tags: ["AI Agents", "Workflow Automation", "Data Processing"],
    art: aiArt,
    href: "#ai-automation",
    textWidth: 482,
  },
];

const steps = [
  {
    title: "Discovery & Scoping",
    text: "We dig into your goals, users and constraints. Output: a clear brief and realistic timeline.",
  },
  {
    title: "Design & Prototype",
    text: "Interactive Figma prototypes reviewed with your team before a single line of code is written.",
  },
  {
    title: "Build & Iterate",
    text: "Agile sprints with weekly demos. You see progress every step of the way and can steer in real time.",
  },
  {
    title: "Launch & Support",
    text: "We handle go-live, monitor performance and stay on for ongoing support and iterations.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

function TopBackdrop() {
  /* soft blue wash with white ribbons behind the hero, logos and intro; vector so it stays smooth at any zoom */
  return (
    <svg
      className="svc-backdrop"
      viewBox="0 0 1440 960"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="svc-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="70" />
        </filter>
        <filter id="svc-ribbon" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="svc-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.16" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="svc-fade-mask" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#svc-fade)" />
        </mask>
      </defs>
      <g mask="url(#svc-fade-mask)">
        <rect width="1440" height="960" fill="#c0e3eb" />
        <g filter="url(#svc-soft)" fill="#fbfeff">
          <ellipse cx="720" cy="300" rx="430" ry="210" />
          <ellipse cx="720" cy="740" rx="560" ry="170" />
          <rect x="300" y="0" width="840" height="120" />
        </g>
        <g
          filter="url(#svc-ribbon)"
          fill="none"
          stroke="#fff"
          strokeWidth="52"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path d="M-40 330C20 120 110 70 170 190C240 330 270 520 340 760C370 870 390 930 410 980" />
          <path d="M560 540C700 440 820 420 960 400C1120 380 1230 300 1480 160" />
          <path d="M1480 330C1340 440 1240 560 1170 700C1140 770 1120 830 1110 900" />
        </g>
      </g>
    </svg>
  );
}

function ServicesPage() {
  return (
    <div className="svc-page">
      <img loading="lazy" decoding="async" className="svc-waves-body" src={bodyWaves} alt="" aria-hidden="true" />

      <div className="svc-top">
        <TopBackdrop />

        <section className="svc-hero">
          <p className="svc-kicker">Full-stack agency</p>
          <h1>
            We build digital
            <br />
            <span className="svc-accent">
              products that last
              <img loading="lazy" decoding="async" className="svc-spark" src={spark} alt="" aria-hidden="true" />
            </span>
          </h1>
          <p className="svc-lead">
            From web apps to enterprise systems — we combine strategy, design
            and engineering to help ambitious teams ship faster.
          </p>
          <div className="svc-actions">
            <a href="#services-list" className="svc-btn svc-btn-primary">
              Explore Services
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 10h13M11 4.5l5.5 5.5-5.5 5.5" />
              </svg>
            </a>
            <a href="#projects" className="svc-btn svc-btn-ghost">
              View our work
            </a>
          </div>
        </section>

        <section className="svc-logos" aria-label="Clients">
          <div className="svc-logo-row">
            {logos.map((logo) => (
              <img loading="lazy" decoding="async"
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                style={{ "--w": logo.w, "--h": logo.h }}
              />
            ))}
          </div>
        </section>

        <section className="svc-intro" id="services-list">
          <div>
            <p className="svc-label">Work</p>
            <h2>
              Six services,
              <br />
              one <span>focused team</span>
            </h2>
          </div>
          <p className="svc-intro-text">
            Whether you need a mobile app, a cloud-ready backend or an AI
            workflow — we have the expertise to deliver it end to end.
          </p>
        </section>
      </div>

      <section className="svc-list">
        {services.map((service, index) => (
          <article
            className={index % 2 ? "svc-row is-flipped" : "svc-row"}
            id={service.id}
            key={service.id}
          >
            {/* services with their own page are clickable on the picture, title and arrow */}
            {service.href ? (
              <a className="svc-art" href={service.href}>
                <img
                  src={service.art}
                  alt={`${service.title} illustration`}
                  loading={index ? "lazy" : undefined}
                />
              </a>
            ) : (
              <div className="svc-art">
                <img
                  src={service.art}
                  alt={`${service.title} illustration`}
                  loading={index ? "lazy" : undefined}
                />
              </div>
            )}
            <div className="svc-copy">
              <p className="svc-count">
                <b>{String(index + 1).padStart(2, "0")}</b> / 06
              </p>
              <div className="svc-head">
                <div>
                  <h3>
                    {service.href ? <a href={service.href}>{service.title}</a> : service.title}
                  </h3>
                  <p style={{ maxWidth: service.textWidth }}>{service.text}</p>
                </div>
                <a
                  className="svc-go"
                  href={service.href || "#contact"}
                  aria-label={
                    service.href
                      ? `Learn more about ${service.title}`
                      : `Talk to us about ${service.title}`
                  }
                >
                  <ArrowIcon />
                </a>
              </div>
              <ul className="svc-tags">
                {service.tags.map((tag, tagIndex) => (
                  <li
                    key={tag}
                    className={index % 2 && tagIndex ? "is-muted" : undefined}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="svc-process" aria-labelledby="svc-process-title">
        <div className="svc-process-inner">
          <div className="svc-process-head">
            <div>
              <p className="svc-label">How we work</p>
              <h2 id="svc-process-title">
                A process built for <span>real outcomes</span>
              </h2>
            </div>
            <p className="svc-process-text">
              We move fast without cutting corners. Every engagement follows
              the same proven playbook.
            </p>
          </div>
          <ol className="svc-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="svc-step-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
