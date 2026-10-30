import { useState } from "react";
import heroAiVideo from "../assets/hero-ai-solutions.mp4";
import heroWebAppVideo from "../assets/hero-web-app-dev.mp4";
import heroTransformVideo from "../assets/hero-digital-transformation.mp4";
import trustAmeer from "../assets/trust-avatar-ameer.webp";
import trustShubham from "../assets/trust-avatar-shubham.webp";
import StaggeredText from "./StaggeredText";
import "./Hero.css";
import "./buttons.css";

const panels = [
  {
    type: "video",
    src: heroAiVideo,
    label: "AI & Software Solutions",
  },
  {
    type: "video",
    src: heroWebAppVideo,
    label: "Web & App Development",
  },
  {
    type: "video",
    src: heroTransformVideo,
    label: "Digital Transformation",
  },
];

function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <StaggeredText text="A Smarter" />
          <br />
          <StaggeredText className="hero-accent" text="Tomorrow" delay={0.45} />
        </h1>

        <p className="hero-description">
          We design and build digital products, intelligent systems
          and automation for a more human future.
        </p>

        <div className="hero-buttons">
          <a href="#contact" className="primary-btn">
            Let's Build together
            <span>→</span>
          </a>

          <a href="#projects" className="secondary-btn">
            View Our Work
            <span>→</span>
          </a>
        </div>

        <div className="hero-trust">
          <div className="avatars" aria-hidden="true">
            <img loading="lazy" decoding="async" src={trustAmeer} alt="" />
            <img loading="lazy" decoding="async" src={trustShubham} alt="" />
            <img loading="lazy" decoding="async" src={trustAmeer} alt="" />
            <img loading="lazy" decoding="async" src={trustShubham} alt="" />
          </div>
          <p>Trusted by forward-thinking businesses</p>
        </div>
      </div>

      <div className="hero-media">
        {panels.map((panel, index) => (
          <button
            key={panel.label}
            type="button"
            className={index === active ? "media-panel is-active" : "media-panel"}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            aria-label={panel.label}
          >
            {panel.type === "video" ? (
              <video src={panel.src} autoPlay muted loop playsInline />
            ) : (
              <img loading="lazy" decoding="async" src={panel.src} alt="" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
