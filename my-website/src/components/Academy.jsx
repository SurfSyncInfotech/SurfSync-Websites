import { useState } from "react";
import StaggeredText from "./StaggeredText";
import "./Academy.css";

const programs = [
  "Full Stack Web Development",
  "MERN Stack Development",
  "AWS Cloud Computing",
  "DevOps Engineering",
  "Linux Administration",
  "Digital Marketing",
  "Data Analytics",
  "Power BI Mastery",
  "Python Programming",
  "Java Development",
  "Kubernetes Masterclass",
  "UI/UX Designing",
  "Graphic Designing",
  "Cyber Security Basics",
  "Artificial Intelligence",
  "Machine Learning",
  "React JS Development",
  "Mobile App Development",
  "WordPress Development",
  "SQL & Database Management",
];

const teaching = [
  "Real projects and applied learning, not theory only.",
  "Guidance from experts who understand what employers expect.",
  "Structured paths for beginners through to working professionals.",
];

const delivery = [
  {
    tone: "orange",
    title: "Weekday & weekend batches",
    text: "Choose weekday evening slots (typically 7:00–9:00 PM IST) or full weekend cohorts. The same syllabus, mentors, and projects run on both schedules, so learning never clashes with college hours.",
  },
  {
    tone: "blue",
    title: "Live + recorded classes",
    text: "Interactive live sessions for doubt-solving, demos, and code reviews. Every session is recorded in HD with chapter markers, so you can replay, revise, or catch up.",
  },
  {
    tone: "green",
    title: "Built for college curriculum",
    text: "Modules map to common B.Tech, BCA, MCA, and B.Sc. Computer Science and Data Science syllabi, so your coursework and the Academy reinforce each other.",
  },
  {
    tone: "orange",
    title: "Mentor-led & project-driven",
    text: "Small batches, dedicated doubt channels, periodic assessments, and portfolio-ready projects at every tier, so you finish with proof of skills, not just a certificate.",
  },
];

const tracks = [
  ["Foundation", "Core concepts, tools, and your first complete project from scratch."],
  ["Professional", "Deeper workflows and graded case studies that mirror real internship tasks."],
  ["Internship", "Weekly sprints, reviews, and a capstone worthy of job interviews."],
];

const courses = [
  {
    name: "Data Science",
    tag: "Python · Jupyter",
    lead: "From Python fundamentals to applied ML, structured for real projects and placements.",
    tools: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn", "Jupyter"],
    outcomes: [
      "Write clean Python for data ingestion, cleaning, and analysis",
      "Perform exploratory data analysis (EDA) with visual storytelling",
      "Train and evaluate supervised learning models (regression & classification)",
      "Understand bias, overfitting, and basic model validation strategies",
      "Present insights to a non-technical audience using slides and notebooks",
    ],
  },
  {
    name: "Data Analytics",
    tag: "SQL · BI tools",
    lead: "Turn raw data into dashboards, KPIs, and decisions, from Excel to SQL to BI tools.",
    tools: ["SQL", "PostgreSQL / MySQL", "Excel", "Google Sheets", "Power BI / Looker Studio", "dbt (awareness)"],
    outcomes: [
      "Write SQL queries for joins, aggregations, window functions, and CTEs",
      "Design KPIs and dashboards aligned to business questions",
      "Use Excel and Google Sheets for models, pivoting, and scenario analysis",
      "Build a portfolio of dashboard and SQL projects",
      "Explain limitations of data and avoid common visualization pitfalls",
    ],
  },
  {
    name: "MERN Stack Development",
    tag: "MongoDB · React · Node",
    lead: "MongoDB, Express, React, and Node: full-stack web apps with REST APIs and deployment.",
    tools: ["JavaScript", "Node.js", "Express", "React", "MongoDB", "Mongoose", "JWT", "Git"],
    outcomes: [
      "Build Node and Express APIs with middleware, routing, and error handling",
      "Design React components with hooks, routing, and state management",
      "Model data in MongoDB with Mongoose and validate inputs",
      "Implement JWT-based auth flows",
      "Deploy a full-stack app (e.g. Render, Vercel + Atlas)",
    ],
  },
  {
    name: "Linux",
    tag: "Bash · systemd",
    lead: "Command line, shell scripting, users and permissions: the foundation for servers and DevOps.",
    tools: ["Bash", "GNU coreutils", "systemd", "SSH", "vim / nano", "Ubuntu / Debian"],
    outcomes: [
      "Navigate the filesystem and manipulate files from the CLI",
      "Manage users, groups, and file permissions (chmod, chown, ACLs intro)",
      "Write shell scripts for automation",
      "Monitor processes, logs, and disk usage",
      "Understand service management basics (systemd) and SSH hardening",
    ],
  },
  {
    name: "Docker",
    tag: "Containers",
    lead: "Containerize applications, compose multi-service stacks, and ship with confidence.",
    tools: ["Docker Engine", "Docker Compose", "Docker Hub", "BuildKit", "Multi-stage builds"],
    outcomes: [
      "Write and debug Dockerfiles for Node, Python, and static sites",
      "Use Docker Compose for multi-container apps",
      "Manage volumes and networks for persistence and service discovery",
      "Understand image tags, registries, and basic security scanning",
      "Prepare apps for deployment on container orchestrators",
    ],
  },
  {
    name: "Kubernetes",
    tag: "Clusters",
    lead: "Deploy, scale, and operate containerized workloads on clusters.",
    tools: ["kubectl", "Minikube / kind", "Helm (intro)", "YAML", "Prometheus / Grafana (awareness)"],
    outcomes: [
      "Apply core resources: Pod, Deployment, Service, Namespace",
      "Configure ConfigMaps and Secrets safely",
      "Expose apps with Ingress and TLS basics",
      "Understand scaling, rolling updates, and rollbacks",
      "Debug common issues with kubectl logs and describe",
    ],
  },
  {
    name: "DevOps",
    tag: "CI/CD · IaC",
    lead: "CI/CD, infrastructure as code, automation, and culture: ship faster with fewer incidents.",
    tools: ["Git", "GitHub Actions", "Docker", "Kubernetes", "Terraform", "Linux", "Bash"],
    outcomes: [
      "Design a basic CI/CD pipeline (build, test, deploy)",
      "Use Terraform or similar for IaC fundamentals",
      "Understand branching strategies and release gates",
      "Implement basic monitoring and alerting",
      "Document systems and take part in blameless postmortems",
    ],
  },
];

/* in-page links scroll without touching the hash, which would switch the page */
function jump(event) {
  event.preventDefault();
  document.getElementById(event.currentTarget.getAttribute("href").slice(1))?.scrollIntoView({ behavior: "smooth" });
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Academy() {
  const [open, setOpen] = useState(0);

  return (
    <div className="academy-page">
      <section className="ac-hero">
        <p className="ac-kicker">SurfSync Academy</p>
        <h1>
          <StaggeredText text="Learn by doing." stagger={0.035} />
          <br />
          <StaggeredText className="ac-accent" text="Get career-ready." delay={0.4} stagger={0.035} />
        </h1>
        <p className="ac-lead">
          Industry-relevant programs with live classes, mentor support, hands-on projects, and
          internship tracks, for students, professionals, and beginners.
        </p>
        <div className="ac-actions">
          <a className="ac-btn is-solid" href="#contact">
            Register now <Arrow />
          </a>
          <a className="ac-btn is-line" href="#ac-programs" onClick={jump}>
            Explore programs
          </a>
        </div>
        <ul className="ac-stats" aria-label="Academy at a glance">
          <li>
            <strong>20+</strong>
            <span>Programs</span>
          </li>
          <li>
            <strong>2 months</strong>
            <span>Per program</span>
          </li>
          <li>
            <strong>₹429</strong>
            <span>+ 18% GST</span>
          </li>
        </ul>
      </section>

      <section className="ac-about">
        <div className="ac-wrap ac-about-grid">
          <div>
            <p className="ac-kicker">About us</p>
            <h2>
              About <span>SurfSync Academy</span>
            </h2>
            <p>
              SurfSync Academy is a modern online learning platform focused on building
              real-world skills for today's digital economy. We deliver high-quality,
              industry-relevant programs for students, professionals, and beginners who want to
              grow their careers in technology.
            </p>
            <p>
              Our approach combines live and recorded sessions, mentor support, hands-on
              projects, and internship tracks, so you learn by doing, not just watching. Every
              program is designed to help you build a portfolio and become job-ready.
            </p>
          </div>
          <aside className="ac-join">
            <span className="ac-badge">Free student account</span>
            <h3>Join SurfSync Academy</h3>
            <p>Create your free student account to explore courses, watch assigned lectures, and track your progress.</p>
            <a className="ac-btn is-solid" href="#contact">
              Register now <Arrow />
            </a>
          </aside>
        </div>
      </section>

      <section className="ac-programs" id="ac-programs">
        <div className="ac-wrap">
          <div className="ac-head">
            <div>
              <p className="ac-kicker">Programs</p>
              <h2>
                Programs <span>we offer</span>
              </h2>
            </div>
            <p>A wide range of in-demand topics: practical, hands-on, and aligned with industry needs.</p>
          </div>
          <ul className="ac-program-grid">
            {programs.map((name, i) => (
              <li key={name}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <strong>{name}</strong>
                <span>2 months · ₹429 + 18% GST</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ac-teach">
        <div className="ac-wrap ac-teach-grid">
          <div>
            <p className="ac-kicker">How we teach</p>
            <h2>
              Practical, <span>mentor-led learning</span>
            </h2>
            <p className="ac-sub">
              Our courses combine strong fundamentals with hands-on projects, so learners can
              apply knowledge in real scenarios.
            </p>
            <ul className="ac-checks">
              {teaching.map((line) => (
                <li key={line}>
                  <i>
                    <Check />
                  </i>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <aside className="ac-belief">
            <p className="ac-kicker">Our belief</p>
            <p>
              Learning should be simple, accessible, and career-focused. That's why our programs
              are written in easy-to-understand language, guided by experts, and aligned with
              current industry needs.
            </p>
            <a className="ac-btn is-solid" href="#contact">
              Get started <Arrow />
            </a>
          </aside>
        </div>
      </section>

      <section className="ac-delivery">
        <div className="ac-wrap">
          <div className="ac-head">
            <div>
              <p className="ac-kicker">Delivery</p>
              <h2>
                How you'll <span>learn with us</span>
              </h2>
            </div>
            <p>Weekday and weekend batches, live and recorded sessions, and programs that fit around college.</p>
          </div>
          <ul className="ac-delivery-grid">
            {delivery.map((item) => (
              <li key={item.title} className={`is-${item.tone}`}>
                <span className="ac-dot" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ac-curriculum">
        <div className="ac-wrap">
          <div className="ac-head">
            <div>
              <p className="ac-kicker">Curriculum</p>
              <h2>
                Detailed courses <span>& curriculum</span>
              </h2>
            </div>
            <p>
              Every program runs for 2 months at ₹429 + 18% GST (₹506 total), with foundation,
              professional, and internship tracks, mentorship, and a completion certificate.
            </p>
          </div>

          <div className="ac-courses">
            {courses.map((course, i) => {
              const isOpen = open === i;
              return (
                <article key={course.name} className={isOpen ? "ac-course is-open" : "ac-course"}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="ac-course-tag">{course.tag}</span>
                    <span className="ac-course-name">
                      <strong>{course.name}</strong>
                      <em>{course.lead}</em>
                    </span>
                    <span className="ac-course-toggle" aria-hidden="true" />
                  </button>
                  {isOpen ? (
                    <div className="ac-course-body">
                      <div>
                        <h4>Tools & technologies</h4>
                        <ul className="ac-chips">
                          {course.tools.map((tool) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                        <h4>What you'll achieve</h4>
                        <ul className="ac-checks is-small">
                          {course.outcomes.map((line) => (
                            <li key={line}>
                              <i>
                                <Check />
                              </i>
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Curriculum by track</h4>
                        <ol className="ac-tracks">
                          {tracks.map(([name, text]) => (
                            <li key={name}>
                              <strong>{name}</strong>
                              <span>{text}</span>
                              <em>₹429 + 18% GST · 2 months</em>
                            </li>
                          ))}
                        </ol>
                        <a className="ac-btn is-line" href="#contact">
                          Enquire about {course.name}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ac-cta">
        <div className="ac-wrap">
          <h2>
            Start building your <span>portfolio today.</span>
          </h2>
          <p>Create your free student account and pick the program that fits your goals.</p>
          <a className="ac-btn is-solid" href="#contact">
            Register now <Arrow />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Academy;
