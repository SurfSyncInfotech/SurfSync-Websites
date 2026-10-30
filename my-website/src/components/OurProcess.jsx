import blob from "../assets/process-blob.png";
import stepsArt from "../assets/process-steps.webp";
import "./OurProcess.css";

function fitSharp(event) {
  const img = event.currentTarget;
  const scale = window.devicePixelRatio || 1;
  img.style.maxWidth = `${img.naturalWidth / scale}px`;
}

function OurProcess() {
  return (
    <section className="our-process" aria-label="Our process">
      <div className="our-process-inner">
      <img loading="lazy" decoding="async" className="our-process-blob is-left" src={blob} alt="" onLoad={fitSharp} />
      <img loading="lazy" decoding="async" className="our-process-blob is-right" src={blob} alt="" onLoad={fitSharp} />
      <div className="our-process-copy">
        <p className="our-process-kicker">Our process</p>
        <h2>
          From Idea
          <br />
          <span>to Impact.</span>
        </h2>
        <p>
          We help startups and enterprises accelerate growth with AI-powered solutions, web
          and mobile applications, and cloud-native platforms. Based in Noida, ISO 9001:2015
          certified.
        </p>
        <div className="our-process-actions">
          <a className="our-process-primary" href="#about">
            About Surfsync <span aria-hidden="true">→</span>
          </a>
          <a className="our-process-secondary" href="#about">
            Watch our story <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <img loading="lazy" decoding="async"
        className="our-process-art"
        src={stepsArt}
        alt="Discover, Plan, Build, and Launch"
        onLoad={fitSharp}
      />
      </div>
    </section>
  );
}

export default OurProcess;
