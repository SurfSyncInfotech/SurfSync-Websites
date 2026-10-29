import { useEffect, useRef, useState } from "react";
/* the artwork with the big "250" taken out (the "+" stays in the image), so
   the number can count up live in the same spot */
import impactGraphic from "../assets/impact-graphic-clean.webp";
import "./Impact.css";

/* counts 0 → target once, the first time the element scrolls into view */
function useCountUp(to, duration = 1600) {
  const ref = useRef(null);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    const el = ref.current;
    if (reduced) return undefined;
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration, reduced]);

  return [ref, value];
}

function CountUp({ to, suffix = "" }) {
  const [ref, value] = useCountUp(to);

  return (
    <strong ref={ref} className="stat-count" aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </strong>
  );
}

/* the big translucent "250" on the artwork, drawn in the image's own pixel
   space (1578 × 1335) so it lands exactly where the designed number was and
   sits right before the "+" that is still part of the picture */
function GraphicCount() {
  const [ref, value] = useCountUp(250, 2000);

  return (
    <svg
      ref={ref}
      className="impact-visual-count"
      viewBox="0 0 1578 1335"
      aria-hidden="true"
    >
      <text x="892" y="641" textAnchor="end">
        {value}
      </text>
    </svg>
  );
}

/* line icons drawn in code so they stay crisp at any zoom */
const stats = [
  {
    value: "250+",
    countTo: 250,
    label: "Projects Delivered",
    tone: "green",
    icon: (
      <>
        <circle cx="9" cy="7.5" r="3" />
        <path d="M3.5 19.5v-1a5.5 5.5 0 0 1 11 0v1" />
        <circle cx="16.5" cy="8.5" r="2.4" />
        <path d="M15.5 13.6a4.6 4.6 0 0 1 5 4.6v1.3" />
      </>
    ),
  },
  {
    value: "ISO",
    label: "9001:2015 certified",
    tone: "purple",
    icon: (
      <>
        <circle cx="12" cy="9.5" r="5.5" />
        <circle cx="12" cy="9.5" r="2.6" />
        <path d="m8.4 13.7-1.9 6.3 3.2-1.1 2.3 2.3 1.4-4.6M15.6 13.7l1.9 6.3-3.2-1.1" />
      </>
    ),
  },
  {
    value: "4+",
    label: "Countries we serve",
    tone: "orange",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5M12 3.5C9.6 5.8 8.4 8.6 8.4 12s1.2 6.2 3.6 8.5M5 7.5h14M5 16.5h14" />
      </>
    ),
  },
];

function Impact() {
  return (
    <section className="impact" aria-label="Our impact">
      <div className="impact-visual">
        <img loading="lazy" decoding="async"
          src={impactGraphic}
          alt="Happy clients across global, 250+. Startups, from idea to scale. Enterprise, digital transformation. Global reach, India and beyond."
        />
        <GraphicCount />
      </div>

      <div className="impact-copy">
        <p className="impact-label">Our impact</p>
        <h2>
          Transforming
          <br />
          Business Through
          <br />
          <span>Intelligent Technology</span>
        </h2>
        <p className="impact-text">
          We help startups and enterprises accelerate growth with AI-powered
          solutions, web and mobile applications, and cloud-native platforms.
          Based in Noida, ISO 9001:2015 certified.
        </p>
        <div className="impact-actions">
          <a href="#about" className="impact-primary">
            About Surfsync <span>→</span>
          </a>
          <a href="#contact" className="impact-secondary">
            Watch out story <span>→</span>
          </a>
        </div>
        <div className="impact-stats">
          {stats.map((stat) => (
            <div key={stat.value}>
              <span className={`stat-icon stat-${stat.tone}`} aria-hidden="true">
                <svg viewBox="0 0 24 24">{stat.icon}</svg>
              </span>
              <div>
                {stat.countTo ? (
                  <CountUp to={stat.countTo} suffix="+" />
                ) : (
                  <strong>{stat.value}</strong>
                )}
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Impact;
