import talk from "../assets/count-talk.webp";
import lasting from "../assets/count-lasting.webp";
import stay from "../assets/count-stay.webp";
import globe from "../assets/count-globe.webp";
import GlobeOrbit from "./GlobeOrbit";
import trustAmeer from "../assets/trust-avatar-ameer.webp";
import trustShubham from "../assets/trust-avatar-shubham.webp";
import vls from "../assets/logo-vls.png";
import doctor360 from "../assets/logo-doctor360.png";
import vilvah from "../assets/logo-vilvah.png";
import foodies from "../assets/logo-foodies.png";
import founderPhoto from "../assets/founder-shivam.webp";
import linkedin from "../assets/linkedin.png";
import "./About.css";

const faces = [trustAmeer, trustShubham, trustAmeer, trustShubham];

const brands = [
  { src: vls, name: "VLS Wellness" },
  { src: doctor360, name: "Doctor360" },
  { src: vilvah, name: "Vilvah" },
  { src: foodies, name: "Foodies" },
];

const stats = [
  {
    value: "250+",
    label: "Happy clients",
    tone: "orange",
    icon: "people",
  },
  {
    value: "250+",
    label: "Projects shipped",
    tone: "orange",
    icon: "file",
  },
  {
    value: "ISO",
    label: "9001:2015 certified",
    tone: "teal",
    icon: "badge",
  },
  {
    value: "Noida",
    label: "Home base in India",
    tone: "orange",
    icon: "pin",
  },
];

const promises = [
  {
    title: "Clear Talk",
    text: "We explain the work in plain words. You always know what we are building and why.",
    image: talk,
    icon: "chat",
    tone: "orange",
  },
  {
    title: "Built to last",
    text: "We make websites and apps your team can still open next year, not a demo that fades after launch.",
    image: lasting,
    icon: "code",
    tone: "teal",
  },
  {
    title: "We stay with you",
    text: "After go-live we stay on the line for fixes, updates, and the next version.",
    image: stay,
    icon: "people",
    tone: "orange",
  },
  {
    title: "We ship globally",
    text: "We deliver for teams in the US, UK, and Canada — same quality, across time zones.",
    image: globe,
    icon: "globe",
    tone: "teal",
  },
];

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="about-kicker">About us</p>
          <h1>
            Technology
            <br />
            With a <span>Purpose.</span>
          </h1>
          <p>
            We're a Noida-based team building digital products that help businesses grow, move
            faster, and create real impact.
          </p>
          <a className="about-btn" href="#contact">
            Get in touch <span aria-hidden="true">→</span>
          </a>
          <div className="about-trust">
            <div className="about-faces" aria-hidden="true">
              {faces.map((src, index) => (
                <img loading="lazy" decoding="async" key={index} src={src} alt="" />
              ))}
            </div>
            <span>A Noida team trusted India and beyond</span>
          </div>
        </div>
        <GlobeOrbit />
      </section>

      <section className="about-story" id="about-story">
        <div className="about-story-copy">
          <div>
            <p className="about-kicker">Our story</p>
            <h2>A Noida team that builds software people actually use.</h2>
          </div>
          <p>
            SurfSync Infotech designs websites, apps, and AI tools for startups and enterprises.
            From a first version to a full product, we stay with the work — delivery, training,
            and long-term support from our base in Noida, India.
          </p>
        </div>
        <div className="about-stats">
          {stats.map((item) => (
            <article key={item.label} className={item.tone}>
              <span className="stat-icon">
                <StatIcon name={item.icon} />
              </span>
              <strong>{item.value}</strong>
              <span className="stat-label">{item.label}</span>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="about-founder" id="about-founder">
        <div className="founder-card">
          <img loading="lazy" decoding="async" className="founder-photo" src={founderPhoto} alt="Shivam Bhardwaj" />
          <div className="founder-copy">
            <p className="about-kicker">The founder</p>
            <h2>Shivam Bhardwaj</h2>
            <p className="founder-role">Founder &amp; CEO, Surfsync Infotech</p>
            <p>
              I started SurfSync so businesses in India, the US, the UK, and Canada could get
              careful technology — without a huge agency bill or a product that nobody uses after
              launch.
            </p>
            <p>
              From AI tools and mobile apps to full websites, our team works with founders and
              established brands to turn a clear idea into something reliable. We care about
              craft, honest timelines, and staying with you after the first release.
            </p>
            <blockquote>
              “World-class technology from India — for teams that want to move faster, scale
              smarter, and compete with anyone.”
            </blockquote>
            <p className="founder-note">
              “I would also like to thank Shivam Sir for understanding my requirements and
              handling the whole work carefully and professionally.” — Shubham Sutar, Infocus
              Publications
            </p>
            <div className="founder-actions">
              <a className="about-btn" href="#contact">
                Talk to our team <span aria-hidden="true">→</span>
              </a>
              <a
                className="founder-in"
                href="https://www.linkedin.com/in/shivambhrdwz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img loading="lazy" decoding="async" src={linkedin} alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-promises">
        <p className="about-kicker center">Our promise</p>
        <h2>What you can count on</h2>
        <p className="about-lede">
          Simple habits that show up in every project, from a first website to a full product.
        </p>
        <div className="promise-grid">
          {promises.map((item) => (
            <article key={item.title} className={`promise is-${item.tone}`}>
              <div className="promise-photo">
                <img loading="lazy" decoding="async" src={item.image} alt="" />
              </div>
              <span className="promise-icon" aria-hidden="true">
                <PromiseIcon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-brands">
        <p className="about-kicker center">Our clients</p>
        <h2>Brands that grow with us</h2>
        <p className="about-lede">
          From tyres and food to publishing and child care — live products, not mockups.
        </p>
        <div className="brand-grid">
          {brands.map((brand) => (
            <div key={brand.name} className="brand-card">
              <img loading="lazy" decoding="async" src={brand.src} alt={brand.name} />
            </div>
          ))}
        </div>
        <a className="about-btn" href="#projects">
          View our work <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  );
}

function PromiseIcon({ name }) {
  if (name === "chat") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M5 6.5h14v9H11l-4 3.2v-3.2H5v-9Z" />
        <path d="M8.6 10.2h6.8M8.6 12.8h4.2" />
      </svg>
    );
  }
  if (name === "code") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="m8.6 8-4 4 4 4M15.4 8l4 4-4 4M13.2 6.4l-2.4 11.2" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M4.2 12h15.6M12 4c2.2 2.3 3.3 5 3.3 8s-1.1 5.7-3.3 8M12 4c-2.2 2.3-3.3 5-3.3 8s1.1 5.7 3.3 8" />
      </svg>
    );
  }
  return <StatIcon name={name} />;
}

function StatIcon({ name }) {
  if (name === "people") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="2.2" />
        <circle cx="15.5" cy="9" r="1.7" />
        <path d="M4.8 17.5c.6-2.4 2.4-3.6 4.2-3.6s3.6 1.2 4.2 3.6" />
        <path d="M14 14.2c1.4-.3 2.8.4 3.5 2.3" />
      </svg>
    );
  }
  if (name === "badge") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8.2" r="4.4" />
        <circle cx="12" cy="8.2" r="1.7" />
        <path d="M8.8 12 7 19.2l2.6-1.3L12 20.6l2.4-2.7L17 19.2 15.2 12" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }
  if (name === "file") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3.8h6.2L18.2 9v10.2A1.6 1.6 0 0 1 16.6 20.8H7.4A1.6 1.6 0 0 1 5.8 19.2V5.4A1.6 1.6 0 0 1 7.4 3.8H7Z" />
        <path d="M13 3.8V9h5.2M8.2 13h7.2M8.2 16.4h4.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </svg>
  );
}

export default About;
