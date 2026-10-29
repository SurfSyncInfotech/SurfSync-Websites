import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import "./Navbar.css";

const whatPanels = {
  industries: {
    label: "Industries we serve",
    intro: "We build software that fits how your industry really works.",
    cta: "Talk to us about your industry →",
    href: "#contact",
    items: [
      ["Banking & Financial Services", "#industries"],
      ["Insurance", "#industries"],
      ["Healthcare", "#industries"],
      ["Life Sciences", "#industries"],
      ["Industrial", "#industries"],
      ["Software & Hi-Tech", "#industries"],
      ["Telecom & Media", "#industries"],
      ["Consumer Tech", "#industries"],
    ],
  },
  services: {
    label: "Services",
    intro: "Websites, apps, AI, and hosting — from a first version to a full product.",
    cta: "View all services →",
    href: "#services",
    items: [
      ["Web App Development", "#web-development"],
      ["Mobile App Development", "#mobile-apps"],
      ["AI & Automation", "#ai-automation"],
      ["E-commerce & CMS", "#ecommerce-cms"],
      ["Cloud & DevOps", "#cloud-devops"],
      ["Enterprise IT Solutions", "#enterprise-it"],
      ["WhatsApp Business API", "#services"],
    ],
  },
  products: {
    label: "Products and Platforms",
    intro: "Ready products for restaurants, HR, sales, and official WhatsApp.",
    cta: "View all products →",
    href: "#products",
    items: [
      ["Swagat Suite", "#products-swagat"],
      ["HRMS", "#products-hrms"],
      ["Sales CRM", "#products-crm"],
      ["PatronPing WhatsApp API", "#products-patron"],
    ],
  },
};

const whoPanels = {
  about: {
    label: "About us",
    intro:
      "A Noida-based technology team building AI, web, and mobile products for startups and enterprises.",
    cta: "Learn more about SurfSync →",
    href: "#about",
    items: [
      ["Our story", "#about"],
      ["Meet the founder", "#founder"],
      ["Blogs & Articles", "#blogs"],
      ["Job search", "#careers"],
      ["Saved jobs", "#careers"],
      ["Contact", "#contact"],
    ],
  },
  projects: {
    label: "Projects",
    intro:
      "Websites and apps we have shipped — publishing, healthcare, food, tyres, and more.",
    cta: "View all projects →",
    href: "#projects",
    items: [
      ["Infocus Publications", "#projects-infocus"],
      ["Click4Appointment", "#projects-clinicspots"],
      ["Doctor 360", "#projects-doctor"],
      ["Atleast80", "#projects-atleast80"],
      ["VAKT CDC", "#projects-vakt"],
      ["Foodies App", "#projects-foodies"],
    ],
  },
  academy: {
    label: "Academy",
    intro:
      "Live project training, mentorship, and career-ready programs from SurfSync Academy.",
    cta: "Explore SurfSync Academy →",
    href: "#careers",
    items: [
      ["Academy programs", "#careers"],
      ["Register", "#careers"],
    ],
  },
};

function Navbar() {
  // true once the page has scrolled a little, so the bar can switch to its solid, shadowed look
  const [stuck, setStuck] = useState(() => window.scrollY > 8);
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatOpen, setWhatOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [whatPanel, setWhatPanel] = useState("industries");
  const [whoPanel, setWhoPanel] = useState("about");

  // which top-level link matches the page being shown, so it can be marked
  const [here, setHere] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHere(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const at = (hash) => (here === hash ? "page" : undefined);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktop = () => window.matchMedia("(min-width: 901px)").matches;

  const closeMenus = () => {
    setMenuOpen(false);
    setWhatOpen(false);
    setWhoOpen(false);
  };

  return (
    <header
      className={`navbar${stuck ? " is-stuck" : ""}`}
      onMouseLeave={() => {
        if (desktop()) {
          setWhatOpen(false);
          setWhoOpen(false);
        }
      }}
    >
      <a href="#top" className="logo" onClick={closeMenus}>
        <img loading="lazy" decoding="async" src={logo} alt="SurfSync Infotech" />
      </a>

      <button
        className="menu-btn"
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <div
          className={whatOpen ? "nav-what is-open" : "nav-what"}
          onMouseEnter={() => {
            if (desktop()) {
              setWhatOpen(true);
              setWhoOpen(false);
            }
          }}
        >
          <button
            className="nav-trigger"
            type="button"
            aria-expanded={whatOpen}
            aria-controls="what-we-do"
            onClick={() => {
              if (desktop()) {
                setWhatOpen(true);
                setWhoOpen(false);
              } else setWhatOpen((open) => !open);
            }}
          >
            What we do
            <span className="caret" aria-hidden="true"></span>
          </button>

          <MegaMenu
            id="what-we-do"
            open={whatOpen}
            label="What we do"
            title="Web, mobile, and AI for your industry"
            text="We help you design and build websites, apps, and AI tools that match how your business actually works."
            leadHref="#services"
            leadLabel="See our services →"
            panels={whatPanels}
            panel={whatPanel}
            setPanel={setWhatPanel}
            onNavigate={closeMenus}
          />
        </div>

        <div
          className={whoOpen ? "nav-what is-open" : "nav-what"}
          onMouseEnter={() => {
            if (desktop()) {
              setWhoOpen(true);
              setWhatOpen(false);
            }
          }}
        >
          <button
            className="nav-trigger"
            type="button"
            aria-expanded={whoOpen}
            aria-controls="who-we-are"
            onClick={() => {
              if (desktop()) {
                setWhoOpen(true);
                setWhatOpen(false);
              } else setWhoOpen((open) => !open);
            }}
          >
            Who we are
            <span className="caret" aria-hidden="true"></span>
          </button>

          <MegaMenu
            id="who-we-are"
            open={whoOpen}
            label="Who we are"
            title="A team built to ship real products"
            text="We partner with founders and enterprises from our base in Noida — with delivery, training, and long-term product support in one place."
            leadHref="#about"
            leadLabel="Meet SurfSync →"
            panels={whoPanels}
            panel={whoPanel}
            setPanel={setWhoPanel}
            onNavigate={closeMenus}
          />
        </div>

        <a
          href="#careers"
          aria-current={at("#careers")}
          onClick={closeMenus}
          onMouseEnter={() => {
            if (desktop()) {
              setWhatOpen(false);
              setWhoOpen(false);
            }
          }}
        >
          Careers
        </a>
        <a
          href="#blogs"
          aria-current={at("#blogs")}
          onClick={closeMenus}
          onMouseEnter={() => {
            if (desktop()) {
              setWhatOpen(false);
              setWhoOpen(false);
            }
          }}
        >
          Blogs
        </a>
        <a
          href="#contact"
          aria-current={at("#contact")}
          onClick={closeMenus}
          onMouseEnter={() => {
            if (desktop()) {
              setWhatOpen(false);
              setWhoOpen(false);
            }
          }}
        >
          Contact Us
        </a>
      </nav>

      <a className="nav-talk" href="#contact" aria-current={at("#contact")} onClick={closeMenus}>
        Let's talk
      </a>
    </header>
  );
}

function MegaMenu({
  id,
  open,
  label,
  title,
  text,
  leadHref,
  leadLabel,
  panels,
  panel,
  setPanel,
  onNavigate,
}) {
  const active = panels[panel];

  return (
    <div className={open ? "mega is-open" : "mega"} id={id}>
      <div className="mega-lead">
        <h2>{title}</h2>
        <p>{text}</p>
        <a href={leadHref} onClick={onNavigate}>
          {leadLabel}
        </a>
      </div>

      <div className="mega-tabs" role="tablist" aria-label={label}>
        {Object.entries(panels).map(([key, item]) => (
          <button
            key={key}
            className={panel === key ? "mega-tab is-on" : "mega-tab"}
            type="button"
            role="tab"
            aria-selected={panel === key}
            onClick={() => {
              setPanel(key);
              if (item.href === "#projects") {
                window.location.hash = "#projects";
                onNavigate();
              }
            }}
          >
            {item.label}
            {panel === key && <span aria-hidden="true">›</span>}
          </button>
        ))}
      </div>

      <div className="mega-detail" role="tabpanel">
        <p>{active.intro}</p>
        <div className="mega-links">
          {active.items.map(([name, href]) => (
            <a key={name} href={href} onClick={onNavigate}>
              {name}
            </a>
          ))}
        </div>
        <a className="mega-cta" href={active.href} onClick={onNavigate}>
          {active.cta}
        </a>
      </div>
    </div>
  );
}

export default Navbar;
