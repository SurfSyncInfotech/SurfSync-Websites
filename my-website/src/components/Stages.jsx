import { useEffect, useRef, useState } from "react";
import analyticsArt from "../assets/stage-analytics.webp";
import designArt from "../assets/stage-design.webp";
import cloudArt from "../assets/stage-cloud.webp";
import trainingArt from "../assets/stage-training.webp";
import appArt from "../assets/stage-app.webp";
import webArt from "../assets/stage-web.webp";
import commerceArt from "../assets/stage-commerce.webp";
import devopsArt from "../assets/stage-devops.webp";
import aiArt from "../assets/stage-ai.webp";
import enterpriseArt from "../assets/stage-enterprise.webp";
import "./Stages.css";

const corners = [
  {
    title: "Free Analytics Setup",
    text: "Get powerful insights from day one.",
    flip: false,
    tone: "blue",
    icon: "chart",
    image: analyticsArt,
  },
  {
    title: "Free Cloud Deployment",
    text: "We deploy and configure it for you.",
    flip: true,
    tone: "peach",
    icon: "cloud",
    image: cloudArt,
  },
  {
    title: "UI/UX Design Support",
    text: "Beautiful, user-focused designs included.",
    flip: false,
    tone: "peach",
    icon: "pen",
    image: designArt,
  },
  {
    title: "Training & Documentation",
    text: "Step-by-step guides for your team.",
    flip: true,
    tone: "blue",
    icon: "doc",
    image: trainingArt,
  },
];

const features = [
  {
    pill: "AI & Automation",
    title: "AI & Automation",
    text: "Automate repeated work so your team can move faster.",
    image: aiArt,
    href: "#ai-automation",
  },
  {
    pill: "Web Development",
    title: "Web Development",
    text: "Modern websites that stay fast, responsive, and easy to manage.",
    image: webArt,
    href: "#web-development",
  },
  {
    pill: "Mobile Development",
    title: "App Development",
    text: "iOS and Android apps with React Native and Flutter that feel simple to use.",
    image: appArt,
    href: "#mobile-apps",
  },
  {
    pill: "E-commerce",
    title: "E-commerce",
    text: "Online stores built to sell and stay easy to run.",
    image: commerceArt,
    href: "#ecommerce-cms",
  },
  {
    pill: "Cloud & DevOps",
    title: "Cloud & DevOps",
    text: "We deploy and configure it for you.",
    image: devopsArt,
    href: "#cloud-devops",
  },
  {
    pill: "Enterprise IT",
    title: "Enterprise IT",
    text: "Infrastructure, security, and support for larger teams.",
    image: enterpriseArt,
    href: "#enterprise-it",
  },
];

function Mark({ icon }) {
  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V11M10 19V7M15 19v-5M20 19V9" />
      </svg>
    );
  }
  if (icon === "cloud") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.5 17h9a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 7.5 17Z" />
      </svg>
    );
  }
  if (icon === "pen") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h7l4 4v12H7V4Z" />
      <path d="M14 4v4h4" />
    </svg>
  );
}

/* every service is a full card in one deck; slot 0 is the front card and
   each slot behind it peeks out one step higher and a little narrower */
const slotScale = (slot) => (slot === 0 ? 1 : 1.025 - slot * 0.055);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Stages() {
  const [active, setActive] = useState(2);
  /* the card currently sliding from the front to the back of the deck */
  const [leaving, setLeaving] = useState(null);
  /* the cards rise into place the first time the board scrolls into view */
  const boardRef = useRef(null);
  const instant = () => !("IntersectionObserver" in window) || prefersReducedMotion();
  const [shown, setShown] = useState(instant);
  const [settled, setSettled] = useState(instant);

  useEffect(() => {
    const board = boardRef.current;
    if (!board || shown) return undefined;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        seen.disconnect();
      },
      { threshold: 0.18 }
    );
    seen.observe(board);
    return () => {
      seen.disconnect();
    };
  }, [shown]);

  /* after the entrance, hovering reacts straight away instead of waiting for the stagger delay */
  useEffect(() => {
    if (!shown || settled) return undefined;
    const timer = window.setTimeout(() => setSettled(true), 1600);
    return () => window.clearTimeout(timer);
  }, [shown, settled]);

  /* bring a service to the front: the old front card dips down, slips
     behind the deck and rises to its new slot while the rest ease forward */
  const showFeature = (index) => {
    if (index === active || leaving !== null) return;
    if (!prefersReducedMotion()) setLeaving(active);
    setActive(index);
  };

  const handleCardClick = (event) => {
    if (event.target.closest("a")) return;
    showFeature((active + 1) % features.length);
  };

  return (
    <section className="stages" id="services">
      <p className="stages-label">Our menu</p>
      <h2>
        Technology Solutions for every <br />stage of growth
      </h2>

      <div
        ref={boardRef}
        className={`stage-board${shown ? " is-in" : ""}${settled ? " is-settled" : ""}`}
      >
        {corners.map((service, i) => (
          <article
            key={service.title}
            style={{ "--i": i }}
            className={
              service.flip
                ? `stage-side is-flip is-${service.tone}`
                : `stage-side is-${service.tone}`
            }
          >
            <div className="stage-thumb">
              {service.image ? <img loading="lazy" decoding="async" src={service.image} alt="" /> : null}
            </div>
            <div className="stage-copy">
              <span className="stage-mark" aria-hidden="true">
                <Mark icon={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        ))}

        <div className="stage-feature">
          {features.map((feature, index) => {
            const slot = (index - active + features.length) % features.length;
            const isFront = slot === 0;
            const classes = ["stage-card"];
            if (isFront) classes.push("is-front");
            if (index === leaving) classes.push("is-leaving");

            return (
              <article
                key={feature.title}
                className={classes.join(" ")}
                style={{
                  "--slot": slot,
                  "--scale": slotScale(slot),
                  "--z": features.length - slot,
                }}
                aria-hidden={!isFront}
                inert={!isFront}
                title={isFront ? "Click to see the next service" : undefined}
                onClick={isFront ? handleCardClick : undefined}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget) setLeaving(null);
                }}
              >
                <div className="stage-shot">
                  <img loading="lazy" decoding="async" className="stage-feature-art" src={feature.image} alt="" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <a className="stage-explore" href={feature.href || "#services"}>
                  <span>Explore Service</span>
                  <span className="stage-explore-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            );
          })}
        </div>
      </div>

      <div className="stage-pills" role="tablist" aria-label="Services">
        {features.map((filter, index) => (
          <button
            key={filter.pill}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "is-active" : undefined}
            onClick={() => showFeature(index)}
          >
            {filter.pill}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Stages;
