import "./Cta.css";
import "./buttons.css";

function Cta() {
  return (
    <section className="cta" id="contact">
      <p>HAVE A PROJECT IN MIND?</p>

      <h2>
        Let's build
        <br />
        something <span>great.</span>
      </h2>

      <a href="mailto:hello@example.com" className="primary-btn">
        Let's talk
        <span>↗</span>
      </a>
    </section>
  );
}

export default Cta;
