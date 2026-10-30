import { useEffect } from "react";
import vls from "../assets/logo-vls.png";
import doctor360 from "../assets/logo-doctor360.png";
import infocus from "../assets/logo-infocus.png";
import natural from "../assets/logo-natural.png";
import atleast80 from "../assets/logo-atleast80.png";
import foodies from "../assets/logo-foodies.png";
import "./Trusted.css";

const logos = [
  { src: vls, name: "VLS Wellness" },
  { src: doctor360, name: "Doctor360" },
  { src: infocus, name: "INFOCUS" },
  { src: natural, name: "The Natural Ayurved" },
  { src: atleast80, name: "Atleast80" },
  { src: foodies, name: "Foodies" },
];

function Trusted() {
  useEffect(() => {
    const imgs = [...document.querySelectorAll(".logo-row img")];
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      imgs.forEach((img) => {
        if (!img.naturalHeight) return;
        img.style.height = `${Math.min(47, img.naturalHeight / dpr)}px`;
      });
    };
    imgs.forEach((img) => {
      if (img.complete) fit();
      else img.addEventListener("load", fit);
    });
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      imgs.forEach((img) => img.removeEventListener("load", fit));
    };
  }, []);

  return (
    <section className="marquee" id="work" aria-label="Client logos">
      <div className="logo-track">
        {[0, 1].map((copy) => (
          <div className="logo-row" key={copy} aria-hidden={copy === 1}>
            {logos.map((logo) => (
              <img loading="lazy" decoding="async"
                key={`${copy}-${logo.name}`}
                src={logo.src}
                alt={copy === 0 ? logo.name : ""}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trusted;
