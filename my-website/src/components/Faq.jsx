import { useState } from "react";
import "./Faq.css";

const questions = [
  {
    question: "How do I get started?",
    answer:
      "Share what you want to build. We start with a short call, shape the first step, and move from idea to a clear plan.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "I work with clients globally. I have experience collaborating with businesses and individuals across different time zones, utilizing digital communication tools like Zoom, Slack, and email to ensure seamless project management.",
  },
  {
    question: "What makes your SaaS platform different from others on the market?",
    answer:
      "We design and build products people actually keep using, with strategy, design, and engineering in one team.",
  },
  {
    question: "How do I get started?",
    answer:
      "Share what you want to build. We start with a short call, shape the first step, and move from idea to a clear plan.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Yes. We work with teams across time zones and keep the work moving with clear updates.",
  },
  {
    question: "What makes your SaaS platform different from others on the market?",
    answer:
      "We design and build products people actually keep using, with strategy, design, and engineering in one team.",
  },
];

function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section className="faq">
      <p className="faq-kicker">Faq</p>
      <h2>Common Questions About Surfsync</h2>
      <p className="faq-intro">
        Everything you need to know about our process, service, and how we work.
      </p>
      <div className="faq-list">
        {questions.map((item, index) => {
          const isOpen = open === index;
          return (
            <article key={`${item.question}-${index}`} className={isOpen ? "is-open" : ""}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? "×" : "+"}
                </span>
              </button>
              {isOpen && <p>{item.answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
