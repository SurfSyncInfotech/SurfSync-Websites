import { useRef } from "react";
import banking from "../assets/industry-banking.png";
import insurance from "../assets/industry-insurance.webp";
import healthcare from "../assets/industry-healthcare.webp";
import lifeSciences from "../assets/industry-lifesciences.webp";
import software from "../assets/industry-software.webp";
import telecom from "../assets/industry-telecom.webp";
import consumer from "../assets/industry-consumer.webp";
import "./Industries.css";

const icons = {
  bank: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16M6 10v7M10 10v7M14 10v7M18 10v7M4 17h16M3 20h18M12 3.5 20 10H4L12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 19 6.5v6c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8v-6L12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 19.5s-6.5-4.1-6.5-8.3a3.7 3.7 0 0 1 6.5-2.2 3.7 3.7 0 0 1 6.5 2.2c0 4.2-6.5 8.3-6.5 8.3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6M10 3v5.5L5.2 18.2A2.8 2.8 0 0 0 7.7 22h8.6a2.8 2.8 0 0 0 2.5-3.8L14 8.5V3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tower: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20V10M8.5 20h7M12 10a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 12 10ZM6 12.5a7 7 0 0 1 2.2-4M18 12.5a7 7 0 0 0-2.2-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 18.5h17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const industries = [
  {
    title: "Banking & Finance",
    text: "Secure. Smarter. More connected.",
    image: banking,
    icon: "bank",
  },
  {
    title: "Insurance",
    text: "Smarter risk. Better decisions.",
    image: insurance,
    icon: "shield",
  },
  {
    title: "Healthcare",
    text: "Better care through technology.",
    image: healthcare,
    icon: "heart",
  },
  {
    title: "Life Sciences",
    text: "Discovery that reaches patients.",
    image: lifeSciences,
    icon: "flask",
  },
  {
    title: "Software and Hitech",
    text: "Software teams can build on.",
    image: software,
    icon: "code",
  },
  {
    title: "Telecom & Media",
    text: "Networks that stay connected.",
    image: telecom,
    icon: "tower",
  },
  {
    title: "Consumer Tech",
    text: "Products people keep close.",
    image: consumer,
    icon: "device",
  },
];

function Industries() {
  const scroller = useRef(null);

  const showMore = () => {
    const row = scroller.current;
    if (!row) return;
    const card = row.querySelector(".industry-card");
    const step = card ? card.offsetWidth + 16 : 268;
    const max = row.scrollWidth - row.clientWidth;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    if (row.scrollLeft >= max - 8) {
      row.scrollTo({ left: 0, behavior });
      return;
    }
    row.scrollBy({ left: step, behavior });
  };

  return (
    <section className="industries" id="industries">
      <div className="industries-copy">
        <p className="industries-kicker">Our work</p>
        <h2>
          Different Industries.
          <br />
          <span>A common purpose.</span>
        </h2>
        <button type="button" className="industries-next" onClick={showMore} aria-label="Show more industries">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 6.5 15 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="industry-scroller" ref={scroller}>
        <div className="industry-grid">
          {industries.map((item) => (
            <a key={item.title} className="industry-card" href="#projects">
              <img loading="lazy" decoding="async" src={item.image} alt="" />
              <span className="industry-explore">
                Explore <span>→</span>
              </span>
              <div className="industry-caption">
                {icons[item.icon]}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
