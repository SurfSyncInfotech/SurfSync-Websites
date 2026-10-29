import "./Services.css";

const services = [
  {
    number: "01",
    title: "Digital Products",
    text: "User-focused digital products designed to solve real problems and create measurable value.",
  },
  {
    number: "02",
    title: "Intelligent Systems",
    text: "Smart systems that help businesses make better decisions and work more efficiently.",
  },
  {
    number: "03",
    title: "Automation",
    text: "Automation solutions that remove repetitive work and give teams more time to focus on what matters.",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="section-label">WHAT WE DO</div>

      <div className="service-grid">
        {services.map((service) => (
          <div className="service-card" key={service.number}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
