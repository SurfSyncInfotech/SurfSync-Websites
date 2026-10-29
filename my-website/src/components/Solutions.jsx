import { useEffect, useRef, useState } from "react";
import solutionVideo from "../assets/video2.mp4";
import "./Solutions.css";

const slides = [
  {
    number: "01",
    title: "Logistics\nIntelligence Platform",
    text: "Smarter operations\nfor a connected world",
  },
  {
    number: "02",
    title: "Logistics\nIntelligence Platform",
    text: "Smarter operations\nfor a connected world",
  },
  {
    number: "03",
    title: "Care\nOperations Platform",
    text: "Systems that help care teams\nwork with less friction",
  },
];

function SolutionVideo({ label }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
          else video.pause();
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={solutionVideo}
      autoPlay
      muted
      loop
      playsInline
      aria-label={label}
    />
  );
}

function Solutions() {
  const [index, setIndex] = useState(0);
  const previous = () => setIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  const next = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <section className="solutions" aria-label="Real solutions">
      <p className="solutions-kicker">Work</p>
      <h2>
        <span>Real Solutions</span>
        <br />
        For real insutries.
      </h2>

      <div className="solutions-carousel">
        <div className="solutions-window">
          <div className="solutions-track" style={{ "--i": index }}>
            {slides.map((slide, slideIndex) => {
              const isNext = slideIndex === (index + 1) % slides.length;
              return (
                <article
                  className={isNext ? "solutions-slide is-next" : "solutions-slide"}
                  key={slide.number}
                  onClick={isNext ? next : undefined}
                >
                  <div className="solutions-copy">
                    <p className={slideIndex === index ? "solutions-num is-current" : "solutions-num"}>
                      {slide.number}
                    </p>
                    <div className="solutions-main">
                      {slideIndex === index && (
                        <button
                          type="button"
                          className="solutions-prev"
                          onClick={(event) => {
                            event.stopPropagation();
                            previous();
                          }}
                          aria-label="Previous case study"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14.5 6.5 9 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      )}
                      <div className="solutions-words">
                        <h3>
                          {slide.title.split("\n").map((line) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </h3>
                        <p className="solutions-text">
                          {slide.text.split("\n").map((line) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                    {slideIndex === index && (
                      <a href="#projects" className="solutions-cta" onClick={(event) => event.stopPropagation()}>
                        Explore Case study <span>→</span>
                      </a>
                    )}
                  </div>
                  <div className="solutions-media">
                    <SolutionVideo label={`${slide.title.replace("\n", " ")} preview`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
