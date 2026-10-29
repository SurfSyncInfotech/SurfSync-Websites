import { useState } from "react";
import clientStories from "./clientStories";
import ameerBrown from "../assets/case-modern-auto/client.jpg";

/* the same two clients as the Projects page: Ameer on his original brown backdrop */
const clients = clientStories.map((c, i) => (i === 0 ? { ...c, photo: ameerBrown, cutout: false } : c));

/* line arrow with a chevron head, as drawn in the designs */
function Arrow({ left = false }) {
  return (
    <svg
      viewBox="0 0 18 14"
      width="18"
      height="14"
      aria-hidden="true"
      style={left ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M1 7h15M10.5 1.5 16 7l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* "What client say": one client card at a time, moved with the previous / next arrows or the
   slide bars under them (one bar per story). A case study can pass its own `stories`. */
function CaseProof({ stories = clients }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState("next");
  const [turn, setTurn] = useState(0);
  const client = stories[index];

  const move = (step) => {
    setIndex((i) => (i + step + stories.length) % stories.length);
    setDir(step < 0 ? "prev" : "next");
    setTurn((t) => t + 1);
  };

  const goTo = (i) => {
    if (i === index) return;
    setDir(i < index ? "prev" : "next");
    setIndex(i);
    setTurn((t) => t + 1);
  };

  return (
    <section className="cs-proof cs-wrap">
      <div className="cs-proof-copy">
        <p className="cs-kicker">What client say</p>
        <h2>
          Real people.
          <br />
          <span>Real results.</span>
        </h2>
        <p>
          We collaborate, design, and build with intent turning ideas into digital products that
          create real impact.
        </p>
        <div className="cs-proof-nav">
          <button
            type="button"
            className={dir === "prev" ? "is-on" : undefined}
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
          >
            <Arrow left />
          </button>
          <button
            type="button"
            className={dir === "next" ? "is-on" : undefined}
            aria-label="Next testimonial"
            onClick={() => move(1)}
          >
            <Arrow />
          </button>
        </div>
        <div className="cs-proof-dashes">
          {stories.map((story, i) => (
            <button
              key={story.name}
              type="button"
              className={i === index ? "is-on" : undefined}
              aria-label={`Show testimonial ${i + 1} of ${stories.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
      <figure
        key={turn}
        className={`cs-proof-card${turn ? ` is-from-${dir}` : ""}`}
        aria-live="polite"
      >
        <img loading="lazy" decoding="async"
          className={client.cutout ? "is-cutout" : undefined}
          src={client.photo}
          alt={client.name}
        />
        <figcaption>
          <p>“{client.quote}”</p>
          <strong>{client.name}</strong>
          <span>{client.company}</span>
          <em aria-label="5 out of 5 stars">★★★★★</em>
        </figcaption>
      </figure>
    </section>
  );
}

export default CaseProof;
