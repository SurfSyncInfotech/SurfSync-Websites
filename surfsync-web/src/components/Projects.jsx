import { useEffect, useState } from "react";
import heroFlat1 from "../assets/proj-hero-flat-1.webp";
import heroFlat2 from "../assets/proj-hero-flat-2.webp";
import heroFlat3 from "../assets/proj-hero-flat-3.webp";
import heroFlat4 from "../assets/proj-hero-flat-4.webp";
import heroFlat6 from "../assets/proj-hero-flat-6.webp";
import heroFlat7 from "../assets/proj-hero-flat-7.webp";
import infocusArt from "../assets/proj-infocus-blob.webp";
import marutiPayArt from "../assets/proj-marutipay-blob.webp";
import doctorArt from "../assets/proj-doctor-art.webp";
import pharmaArt from "../assets/proj-pharmatrack-art.png";
import clinicArt from "../assets/proj-click4-art.webp";
import vaktArt from "../assets/proj-vakt-art.webp";
import bullionArt from "../assets/proj-bullion-art.webp";
import guruArt from "../assets/proj-gurutrade-art.webp";
import atleastArt from "../assets/proj-atleast80-art.webp";
import atleastAppArt from "../assets/proj-atleast80-app-art.webp";
import foodiesArt from "../assets/proj-foodies-art.webp";
import modernAutoArt from "../assets/proj-modern-auto-art.webp";
import naturalArt from "../assets/proj-natural-art.webp";
/* the ReetSutra card reuses the case study's full-size hero, so it stays sharp when zoomed */
import reetArt from "../assets/case-reetsutra/hero.webp";
import vlsArt from "../assets/proj-vls-art.webp";
import statClients from "../assets/proj-stat-clients.png";
import statProjects from "../assets/proj-stat-projects.png";
import statIso from "../assets/proj-stat-iso.png";
import statCountries from "../assets/proj-stat-countries.png";
import clientStories from "./clientStories";
import ameerBrown from "../assets/case-modern-auto/client.jpg";
import ProjectReel from "./ProjectReel";
import "./Projects.css";

const filters = [
  "All",
  "Healthcare",
  "FinTech",
  "Food",
  "E-commerce",
  "Automobile",
];

/* flat 760 × 1200 project posters; the wheel below tilts, sizes and spins them */
const heroShots = [
  [heroFlat1, "Atleast80. Trusted Homemade Food and Essentials."],
  [heroFlat2, "The Natural Ayurved."],
  [heroFlat3, "Doctor 360. Book trusted healthcare services."],
  [heroFlat4, "Better care, healthier tomorrow."],
  [heroFlat6, "D.D. Bullions. Trade gold with confidence."],
  [heroFlat7, "VLS Wellness."],
];

const projects = [
  {
    id: "projects-infocus",
    title: "Infocus publications",
    text: "Magazines, issues, and a reading experience built for the publisher.",
    group: "Infocus",
    layout: "feature",
  },
  {
    id: "projects-marutipay",
    title: "Marutipay Portal",
    group: "Marutipay",
    layout: "shot",
  },
  {
    id: "projects-marutipay-desk",
    title: "Marutipay Portal",
    group: "Marutipay",
    layout: "shot",
  },
  {
    id: "projects-swagat",
    title: "Swagat Suite",
    group: "Swagat",
    layout: "shot",
  },
  {
    id: "projects-patron",
    title: "PatronPing",
    group: "PatronPing",
    layout: "shot",
  },
  {
    id: "projects-hrms",
    title: "HRMS",
    group: "HRMS",
    layout: "shot",
  },
  {
    id: "projects-clinicspots",
    title: "Click4Appointment",
    group: "Custom",
    layout: "shot",
  },
  {
    id: "projects-doctor",
    title: "Doctor 360",
    group: "Custom",
    layout: "shot",
  },
  {
    id: "projects-pharmatrack",
    title: "PharmaTrack",
    group: "Healthcare",
    layout: "shot",
  },
  {
    id: "projects-atleast80",
    title: "Atleast80",
    group: "Food",
    layout: "shot",
  },
  {
    id: "projects-atleast80-app",
    title: "Atleast80 App",
    group: "Food",
    layout: "shot",
  },
  {
    id: "projects-natural",
    title: "The Natural Ayurveda",
    group: "E-commerce",
    layout: "shot",
  },
  {
    id: "projects-vls-wellness",
    title: "VLS Wellness",
    group: "E-commerce",
    layout: "shot",
  },
  {
    id: "projects-drive",
    title: "Drive Tribe",
    group: "Custom",
  },
  {
    id: "projects-modern-auto",
    title: "Modern Auto Parts",
    group: "Automobile",
    layout: "shot",
  },
  {
    id: "projects-vakt",
    title: "VAKT CDC",
    group: "Custom",
    layout: "shot",
  },
  {
    id: "projects-foodies",
    title: "Foodies App",
    group: "Food",
    layout: "shot",
  },
];

const stats = [
  ["250+", "Happy Clients", statClients],
  ["250+", "Projects Delivered", statProjects],
  ["ISO", "9001:2015 certified", statIso],
  ["4+", "Countries we serve", statCountries],
];

function groupFromHash(hash) {
  const id = hash.replace("#", "");
  return projects.find((project) => project.id === id)?.group || "All";
}

function filterFromHash(hash) {
  const group = groupFromHash(hash);
  return filters.includes(group) ? group : "All";
}

function Projects() {
  const [tab, setTab] = useState(() => filterFromHash(window.location.hash));

  useEffect(() => {
    const sync = () => setTab(filterFromHash(window.location.hash));
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const fit = () => {
      const scale = window.devicePixelRatio || 1;
      document.querySelectorAll(".proj-tile img, .proj-feature-art img, .proj-health-art img, .proj-shot.is-maruti img, .proj-shot.is-vls img, .proj-mini-art img").forEach((img) => {
        if (!img.naturalWidth) return;
        img.style.maxWidth = `${img.naturalWidth / scale}px`;
        img.style.maxHeight = `${img.naturalHeight / scale}px`;
      });
    };
    fit();
    document.querySelectorAll(".proj-tile img, .proj-feature-art img, .proj-health-art img, .proj-shot.is-maruti img, .proj-shot.is-vls img, .proj-mini-art img").forEach((img) => {
      if (!img.complete || !img.naturalWidth) img.addEventListener("load", fit, { once: true });
      if (typeof img.decode === "function") img.decode().then(fit).catch(() => {});
    });
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [tab]);

  const infocusCards = (
    <>
            <article className="proj-feature is-focus" id="projects-infocus">
              <div>
                <h3>
                  Infocus
                  <br />
                  publications
                </h3>
                <ul className="proj-tags">
                  <li>Web platform</li>
                  <li>Publishing</li>
                  <li>Research</li>
                </ul>
                <p>
                  A digital publishing platform that streamlines manuscript submission, peer
                  review, and journal publishing.
                </p>
                <a className="proj-case" href="#case-infocus">
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="proj-feature-art">
                <img loading="lazy" decoding="async" src={infocusArt} alt="Infocus publication on a desk." />
                <p className="proj-script">
                  Research Today for a
                  <br />
                  Cleaner Tomorrow
                </p>
              </div>
            </article>
    </>
  );

  const ecommerceCards = (
          <>
            <article className="proj-feature is-pay is-case is-cutout" id="projects-natural">
              <div>
                <h3>
                  The Natural
                  <br />
                  Ayurveda
                </h3>
                <ul className="proj-tags">
                  <li>E-commerce</li>
                  <li>Ayurveda</li>
                  <li>Wellness</li>
                </ul>
                <p>
                  An Ayurvedic e-commerce platform offering natural products for wellness and
                  targeted health concerns.
                </p>
                <a className="proj-case" href="#case-natural-ayurved">
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="proj-feature-art">
                <img loading="lazy" decoding="async" src={naturalArt} alt="The Natural Ayurveda on a laptop and phone." />
              </div>
              <p className="proj-script">
                Research Today for a
                <br />
                Cleaner Tomorrow
              </p>
            </article>
            <div className="proj-mini-row is-case">
              <article className="proj-mini" id="projects-reetsutra">
                <div>
                  <h3>ReetSutra</h3>
                  <ul className="proj-tags">
                    <li>E-commerce Food</li>
                    <li>Beverage Heritage</li>
                  </ul>
                  <p className="proj-desc">
                    A heritage food e-commerce platform bringing authentic Bihar delicacies and
                    traditional flavors to modern shoppers.
                  </p>
                  <a className="proj-case" href="#case-reetsutra">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={reetArt} alt="ReetSutra on a laptop and phone." />
                </div>
              </article>
              <article className="proj-mini" id="projects-vls-wellness">
                <div>
                  <h3>VLS Wellness</h3>
                  <ul className="proj-tags">
                    <li>E-commerce</li>
                    <li>Wellness</li>
                    <li>Healthcare</li>
                  </ul>
                  <p className="proj-desc">Premium wellness products for a healthier life at home.</p>
                  <a className="proj-case" href="#case-vls">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={vlsArt} alt="VLS Wellness on a laptop and phone." />
                </div>
              </article>
            </div>
          </>
  );

  const foodCards = (
          <>
            <article className="proj-feature is-pay is-case" id="projects-atleast80">
              <div>
                <h3>AtLeast80</h3>
                <ul className="proj-tags">
                  <li>Mobile App</li>
                  <li>Food Delivery</li>
                  <li>Delivery</li>
                </ul>
                <p>
                  A homemade food platform bringing trusted kitchen-made meals and essentials
                  closer to you.
                </p>
                <a className="proj-case" href="#case-atleast80">
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="proj-feature-art">
                <img loading="lazy" decoding="async" src={atleastArt} alt="AtLeast80 on a laptop and phone." />
              </div>
              <p className="proj-script">
                Research Today for a
                <br />
                Cleaner Tomorrow
              </p>
            </article>
            <div className="proj-mini-row is-case">
              <article className="proj-mini" id="projects-atleast80-app">
                <div>
                  <h3>
                    AtLeast80 <span>App</span>
                  </h3>
                  <ul className="proj-tags">
                    <li>Mobile App</li>
                    <li>Food Delivery</li>
                    <li>Marketplace</li>
                  </ul>
                  <p className="proj-desc">Order homemade meals and daily essentials from local kitchens.</p>
                  <a className="proj-case" href="#case-atleast80">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={atleastAppArt} alt="AtLeast80 app screens." />
                </div>
              </article>
              <article className="proj-mini" id="projects-foodies">
                <div>
                  <h3>Foodies</h3>
                  <ul className="proj-tags">
                    <li>Mobile App</li>
                    <li>Finance</li>
                    <li>Bullion</li>
                  </ul>
                  <p className="proj-desc">Food, groceries, and pet supplies delivered from one app.</p>
                  <a className="proj-case" href="#case-foodies">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={foodiesArt} alt="Foodies app screens." />
                </div>
              </article>
            </div>
          </>
  );

  const healthCards = (
          <>
            <article className="proj-feature is-health" id="projects-doctor">
              <div>
                <h3>Doctor 360</h3>
                <ul className="proj-tags">
                  <li>Healthcare</li>
                  <li>Web Platform</li>
                  <li>Appointments</li>
                </ul>
                <p>
                  A healthcare platform connecting patients with doctors, hospitals, appointments,
                  and diagnostic services.
                </p>
                <a className="proj-case" href="#case-doctor360">
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="proj-feature-art">
                <img loading="lazy" decoding="async" src={doctorArt} alt="Doctor 360 on a laptop and phone." />
                <p className="proj-script">
                  Research Today for a
                  <br />
                  Cleaner tomorrow
                </p>
              </div>
            </article>
            <article className="proj-feature is-health is-pharma" id="projects-pharmatrack">
              <div>
                <h3>PharmaTrack</h3>
                <p>
                  A centralized pharmaceutical supply chain platform connecting
                  manufacturers, distributors, stockists, and warehouses through
                  batch tracking.
                </p>
                <ul className="proj-tags">
                  <li>Pharmaceutical</li>
                  <li>Batch Tracking</li>
                </ul>
                <a className="proj-case" href="#case-pharmatrack">
                  View case study <span aria-hidden="true">→</span>
                </a>
                <p className="proj-count">
                  <b>01</b> / 06
                </p>
              </div>
              <div className="proj-feature-art">
                <img
                  loading="lazy"
                  decoding="async"
                  src={pharmaArt}
                  alt="PharmaTrack platform across multiple devices."
                />
                <p className="proj-script">
                  Batch tracking
                  <br />
                  pharmaceutical
                </p>
              </div>
              <a
                className="proj-next"
                href="#case-pharmatrack"
                aria-label="View PharmaTrack case study"
              >
                <span aria-hidden="true">→</span>
              </a>
            </article>
            <div className="proj-health-row">
              <article className="proj-health-card is-click4" id="projects-clinicspots">
                <div className="proj-health-copy">
                  <h3>Click4Appointment</h3>
                  <ul className="proj-tags">
                    <li>Healthcare</li>
                    <li>Appointment Booking</li>
                  </ul>
                  <p className="proj-desc">
                    A healthcare platform connecting patients and doctors through convenient
                    appointment booking and online consultations.
                  </p>
                  <a className="proj-case" href="#case-click4appointment">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-health-art">
                  <img loading="lazy" decoding="async" src={clinicArt} alt="Click4Appointment on a laptop and two phones." />
                </div>
              </article>
              <article className="proj-health-card" id="projects-vakt">
                <div className="proj-health-copy">
                  <h3>VAKT CDC</h3>
                  <ul className="proj-tags">
                    <li>E-Commerce</li>
                    <li>Wellness</li>
                    <li>Retail</li>
                  </ul>
                  <p className="proj-desc">Therapy programs and parent resources for child development.</p>
                  <a className="proj-case" href="#case-vakt">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-health-art">
                  <img loading="lazy" decoding="async" src={vaktArt} alt="VAKT Child Development Centre on a laptop and phone." />
                </div>
              </article>
            </div>
          </>
  );

  const autoCards = (
          <article className="proj-feature is-pay is-case is-cutout is-auto" id="projects-modern-auto">
            <div>
              <h3>Modern Auto Parts</h3>
              <ul className="proj-tags">
                <li>Automotive Car</li>
                <li>Services</li>
                <li>Marketplace</li>
              </ul>
              <p>
                An automotive platform for booking car services and exploring essential parts
                and accessories.
              </p>
              <a className="proj-case" href="#case-modern-auto">
                View case study <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="proj-feature-art">
              <img loading="lazy" decoding="async"
                src={modernAutoArt}
                alt="Modern Auto Parts car services website on a laptop and phone."
              />
            </div>
          </article>
  );

  const fintechCards = (
    <>
            <article className="proj-feature is-pay is-cutout" id="projects-marutipay-portal">
              <div>
                <h3>
                  MarutiPay <span>Portal</span>
                </h3>
                <ul className="proj-tags">
                  <li>Web Platform</li>
                  <li>FinTech</li>
                  <li>Payments</li>
                </ul>
                <p>
                  A digital payments platform for mobile recharge, bill payments, FASTag, utilities,
                  and more.
                </p>
                <a className="proj-case" href="#case-marutipay">
                  View case study <span aria-hidden="true">→</span>
                </a>
              </div>
              <p className="proj-note">
                Organize essential bill
                <br />
                payment
              </p>
              <div className="proj-feature-art">
                <img loading="lazy" decoding="async" src={marutiPayArt} alt="MarutiPay on a laptop." />
              </div>
            </article>
            <div className="proj-mini-row">
              <article className="proj-mini" id="projects-gurutrade">
                <div>
                  <h3>GuruTrade7</h3>
                  <ul className="proj-tags">
                    <li>Mobile App</li>
                    <li>FinTech</li>
                    <li>Trading</li>
                  </ul>
                  <p className="proj-desc">Live charts, watchlists, and trading tools on the go.</p>
                  <a className="proj-case" href="#case-gurutrade">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={guruArt} alt="GuruTrade7 on a laptop." />
                </div>
              </article>
              <article className="proj-mini" id="projects-bullions">
                <div>
                  <h3>D.D. Bullions</h3>
                  <ul className="proj-tags">
                    <li>Mobile App</li>
                    <li>Finance</li>
                    <li>Bullion</li>
                  </ul>
                  <p className="proj-desc">Live gold and silver rates with easy bullion ordering.</p>
                  <a className="proj-case" href="#case-dd-bullions">
                    View case study <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="proj-mini-art">
                  <img loading="lazy" decoding="async" src={bullionArt} alt="D.D. Bullions on a laptop." />
                </div>
              </article>
            </div>
    </>
  );

  return (
    <div className="projects-page">
      <section className="proj-hero">
        <div className="proj-strip-copy">
          <p className="proj-hero-kicker">Digital projects • Real people • Real impact</p>
          <h1>
            Turning Ideas Into
            <br />
            <span>Meaningful Products.</span>
          </h1>
          <p className="proj-hero-lead">
            We design and build websites, web apps, and mobile products that solve real
            problems and create measurable impact.
          </p>
          <a className="proj-btn" href="#projects-list">
            View all work <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="proj-stage">
          <div className="proj-strip" aria-label="Project previews">
            <ProjectReel shots={heroShots} />
          </div>
        </div>
      </section>

      <section className="proj-list" id="projects-list">
        <div className="proj-list-head">
          <div>
            <p className="proj-featured">Featured work</p>
            <h2>
              Products that
              <br />
              create <span>real value.</span>
            </h2>
          </div>
          <p>
            From ambitious startups to established enterprises, we design and build digital
            products that people love and businesses rely on.
          </p>
        </div>
        <div className="proj-tabs" role="tablist" aria-label="Project groups">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              className={tab === name ? "is-on" : ""}
              onClick={() => setTab(name)}
            >
              {name}
            </button>
          ))}
        </div>
        {tab === "All" ? (
          <>
            {infocusCards}
            <h3 className="proj-group">Healthcare</h3>
            {healthCards}
            <h3 className="proj-group">Food</h3>
            {foodCards}
            <h3 className="proj-group">E-commerce</h3>
            {ecommerceCards}
            <h3 className="proj-group">Automobile</h3>
            {autoCards}
            <h3 className="proj-group">FinTech</h3>
            {fintechCards}
          </>
        ) : tab === "E-commerce" ? (
          ecommerceCards
        ) : tab === "Food" ? (
          foodCards
        ) : tab === "Healthcare" ? (
          healthCards
        ) : tab === "Automobile" ? (
          autoCards
        ) : (
          fintechCards
        )}
      </section>

      <section className="proj-stats" aria-label="Company figures">
        <div>
          <p>Our impact</p>
          <div className="proj-stats-row">
            {stats.map(([value, label, icon]) => (
              <article key={label}>
                <i aria-hidden="true">
                  <img loading="lazy" decoding="async" src={icon} alt="" />
                </i>
                <div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjProof />
    </div>
  );
}

/* Ameer's photo here is the original one on the brown backdrop, as in the design */
const clients = clientStories.map((c, i) => (i === 0 ? { ...c, photo: ameerBrown, cutout: false } : c));

/* "Real people. Real results.": the same two clients as the home page, moved with the two arrows */
function ProjProof() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const client = clients[index];

  const move = (step) => {
    setIndex((i) => (i + step + clients.length) % clients.length);
    setDir(step);
  };

  return (
    <section className="proj-proof">
      <div>
        <h2>
          Real people.
          <br />
          <span>Real results.</span>
        </h2>
        <p>Work shipped with the teams who use it every day.</p>
        <div className="proj-proof-nav">
          <button
            type="button"
            className={dir < 0 ? "is-on" : undefined}
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className={dir > 0 ? "is-on" : undefined}
            aria-label="Next testimonial"
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
        <div className="proj-proof-bars">
          {clients.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={i === index ? "is-on" : undefined}
              aria-label={`Show testimonial ${i + 1} of ${clients.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => {
                setDir(i >= index ? 1 : -1);
                setIndex(i);
              }}
            />
          ))}
        </div>
      </div>
      <blockquote key={client.name} aria-live="polite">
        <div className={`proj-person${client.cutout ? " is-cutout" : ""}`}>
          <img loading="lazy" decoding="async" src={client.photo} alt={client.name} />
        </div>
        <div>
          <p>“{client.quote}”</p>
          <footer>
            <strong>{client.name}</strong>
            <span>{client.company}</span>
            <em aria-label="5 stars">★★★★★</em>
          </footer>
        </div>
      </blockquote>
    </section>
  );
}

export default Projects;
