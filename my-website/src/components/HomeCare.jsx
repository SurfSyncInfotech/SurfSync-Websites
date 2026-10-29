import { useEffect } from "react";
import doctorArt from "../assets/proj-doctor-art.webp";
import clinicArt from "../assets/proj-clinic-art.webp";
import vaktArt from "../assets/proj-vakt-art.webp";
import "./Projects.css";
import "./HomeCare.css";

function HomeCare() {
  useEffect(() => {
    const fit = () => {
      const scale = window.devicePixelRatio || 1;
      document.querySelectorAll(".home-care .proj-feature-art img, .home-care .proj-health-art img").forEach((img) => {
        if (!img.naturalWidth) return;
        img.style.maxWidth = `${img.naturalWidth / scale}px`;
        img.style.maxHeight = `${img.naturalHeight / scale}px`;
      });
    };
    fit();
    document.querySelectorAll(".home-care .proj-feature-art img, .home-care .proj-health-art img").forEach((img) => {
      if (!img.complete || !img.naturalWidth) img.addEventListener("load", fit, { once: true });
      if (typeof img.decode === "function") img.decode().then(fit).catch(() => {});
    });
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <section className="home-care" aria-label="Healthcare projects">
      <article className="proj-feature is-health">
        <div>
          <h3>Doctor 360</h3>
          <p>
            A healthcare platform connecting patients with doctors, hospitals, appointments, and
            diagnostic services.
          </p>
          <ul className="proj-tags">
            <li>Healthcare</li>
            <li>Web Platform</li>
            <li>Appointments</li>
          </ul>
          <a className="proj-case" href="#projects">
            View case study <span aria-hidden="true">→</span>
          </a>
          <p className="proj-count">
            <b>01</b> / 06
          </p>
        </div>
        <div className="proj-feature-art">
          <img loading="lazy" decoding="async" src={doctorArt} alt="Doctor 360 on a laptop and phone." />
          <p className="proj-script">
            Research Today for a
            <br />
            Cleaner tomorrow
          </p>
        </div>
        <a className="proj-next" href="#projects" aria-label="Next project">
          →
        </a>
      </article>
      <div className="proj-health-row">
        <article className="proj-health-card">
          <div className="proj-health-copy">
            <h3>ClinicSpots</h3>
            <ul className="proj-tags">
              <li>Healthcare</li>
              <li>Web Platform</li>
              <li>Telemedicine</li>
            </ul>
            <a className="proj-case" href="#projects">
              View case study <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="proj-health-art">
            <img loading="lazy" decoding="async" src={clinicArt} alt="ClinicSpots on a laptop." />
          </div>
        </article>
        <article className="proj-health-card">
          <div className="proj-health-copy">
            <h3>VAKT CDC</h3>
            <ul className="proj-tags">
              <li>E-Commerce</li>
              <li>Wellness</li>
              <li>Retail</li>
            </ul>
            <a className="proj-case" href="#projects">
              View case study <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="proj-health-art">
            <img loading="lazy" decoding="async" src={vaktArt} alt="VAKT Child Development Centre on a laptop and phone." />
          </div>
        </article>
      </div>
    </section>
  );
}

export default HomeCare;
