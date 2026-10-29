import { useState } from "react";
import stories from "./clientStories";
import "./Visionaries.css";

function Visionaries() {
  const [index, setIndex] = useState(0);
  const story = stories[index];

  const step = (direction) => {
    setIndex((current) => (current + direction + stories.length) % stories.length);
  };

  return (
    <section className="visionaries" id="founder">
      <div className="vision-layout">
        <div className="vision-copy">
          <p className="vision-kicker">Client stories</p>
          <h2>
            Trusted by
            <br />
            <span>Visionaries.</span>
          </h2>
          <p className="vision-lede">
            Real Experience. Lasting partnership.Real Experience. Lasting partnership.
          </p>
          <div className="vision-nav">
            <button type="button" onClick={() => step(-1)} aria-label="Previous story">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 6.5 9 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="is-next" onClick={() => step(1)} aria-label="Next story">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 6.5 15 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="vision-meter" aria-hidden="true">
            {stories.map((item, itemIndex) => (
              <span key={item.name} className={itemIndex === index ? "is-on" : ""} />
            ))}
          </div>
        </div>

        <div className={`vision-portrait${story.cutout ? "" : " is-photo"}`}>
          <img loading="lazy" decoding="async"
            key={story.name}
            src={story.photo}
            alt={story.name}
            onLoad={(event) => {
              const img = event.currentTarget;
              const scale = window.devicePixelRatio || 1;
              img.style.maxWidth = `${Math.floor(img.naturalWidth / scale)}px`;
              img.style.maxHeight = `${Math.floor(img.naturalHeight / scale)}px`;
            }}
          />
        </div>

        <blockquote className="vision-bubble">
          <span className="vision-mark" aria-hidden="true">
            “
          </span>
          <p>{story.quote}</p>
          <span className="vision-rule" aria-hidden="true" />
          <footer className="vision-person">
            <img loading="lazy" decoding="async" src={story.avatar || story.photo} alt="" />
            <div>
              <strong>{story.name}</strong>
              <span>{story.company}</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export default Visionaries;
