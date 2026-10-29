import art from "../assets/clarity-art.webp";
import "./Clarity.css";

function Clarity() {
  return (
    <section className="clarity">
      <div className="clarity-copy">
        <p className="clarity-kicker">Industries we serve</p>
        <h2>
          Built for <span>Clarity.</span>
          <br />
          Designed for
          <br />
          <span>adoption.</span>
        </h2>
        <a href="#contact" className="clarity-btn">
          Learn more <span>→</span>
        </a>
      </div>

      <div className="clarity-art-wrap">
        <img loading="lazy" decoding="async" className="clarity-art" src={art} alt="" />
      </div>

      <p className="clarity-note">
        We combine strategy, design and engineering to turn ambitious ideas into real-world products that last.
      </p>
    </section>
  );
}

export default Clarity;
