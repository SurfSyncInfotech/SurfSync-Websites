import { useEffect, useState } from "react";
import "./DynamicProjects.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";
/* projects added in the admin panel for this site ("domestic" = .in, "international" = .com) */
export const PROJECT_REGION = "international";

export function mediaUrl(url) {
  if (!url) return "";
  if (/^(https?:|data:)/.test(url)) return url;
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function caseHref(project) {
  return `#case-p-${project.slug}`;
}

/* the projects the admin has published; an empty list while loading or if the API is down,
   so the page always shows its built-in projects */
export function useDynamicProjects() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let live = true;
    fetch(`${API_BASE}/api/projects?region=${PROJECT_REGION}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (live && Array.isArray(data)) setRows(data);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  return rows;
}

export function useDynamicProject(slug) {
  const [state, setState] = useState({ project: null, loading: true });

  useEffect(() => {
    let live = true;
    fetch(`${API_BASE}/api/projects/${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((project) => live && setState({ project, loading: false }))
      .catch(() => live && setState({ project: null, loading: false }));
    return () => {
      live = false;
    };
  }, [slug]);

  return state;
}

function CaseLink({ project }) {
  if (!project.hasCaseStudy) return null;
  return (
    <a className="proj-case" href={caseHref(project)}>
      View case study <span aria-hidden="true">→</span>
    </a>
  );
}

function Tags({ tags }) {
  if (!tags?.length) return null;
  return (
    <ul className="proj-tags">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

/* each section on the Projects page has its own card look; admin cards copy the built-in
   cards of the same section (Healthcare: Doctor 360 / Click4Appointment, Food: AtLeast80,
   E-commerce: The Natural Ayurveda / ReetSutra, Others: Modern Auto Parts, FinTech: MarutiPay / GuruTrade7) */
const SECTION_LOOK = {
  Healthcare: { feature: "proj-feature is-health", row: "proj-health-row", health: true },
  Food: { feature: "proj-feature is-pay is-case", row: "proj-mini-row is-case" },
  "E-commerce": { feature: "proj-feature is-pay is-case is-cutout", row: "proj-mini-row is-case" },
  Others: { feature: "proj-feature is-pay is-case is-cutout", row: "proj-mini-row is-case" },
  FinTech: { feature: "proj-feature is-pay is-cutout", row: "proj-mini-row" },
};

/* a JPG has no transparent background, so it is a photo or screenshot: it fills the picture area
   (in the same curved frame as the AtLeast80 photo). PNG / WebP / SVG are treated like the
   built-in device cut-outs and shown whole. */
function isPhoto(url) {
  return /\.jpe?g(\?|$)/i.test(url || "");
}

function FeatureCard({ project, look }) {
  const photo = isPhoto(project.cardImage);
  const art = <img loading="lazy" decoding="async" src={mediaUrl(project.cardImage)} alt={project.title} />;
  const note = project.cardNote ? <p className="proj-script">{project.cardNote}</p> : null;
  let className = look.feature;
  if (photo && !look.health) className = "proj-feature is-pay is-case";
  return (
    <article className={`${className} is-dynamic${photo ? " is-photo" : ""}`} id={`projects-${project.slug}`}>
      <div>
        <h3>{project.title}</h3>
        <Tags tags={project.tags} />
        <p>{project.shortDescription}</p>
        <CaseLink project={project} />
      </div>
      {look.health ? (
        <div className="proj-feature-art">
          {art}
          {note}
        </div>
      ) : (
        <>
          <div className="proj-feature-art">{art}</div>
          {note}
        </>
      )}
    </article>
  );
}

function MiniCard({ project, look }) {
  const photo = isPhoto(project.cardImage);
  const flags = ` is-dynamic${photo ? " is-photo" : ""}`;
  const art = <img loading="lazy" decoding="async" src={mediaUrl(project.cardImage)} alt={project.title} />;
  if (look.health) {
    return (
      <article className={`proj-health-card${flags}`} id={`projects-${project.slug}`}>
        <div className="proj-health-copy">
          <h3>{project.title}</h3>
          <Tags tags={project.tags} />
          <p className="proj-desc">{project.shortDescription}</p>
          <CaseLink project={project} />
        </div>
        <div className="proj-health-art">{art}</div>
      </article>
    );
  }
  return (
    <article className={`proj-mini${flags}`} id={`projects-${project.slug}`}>
      <div>
        <h3>{project.title}</h3>
        <Tags tags={project.tags} />
        <p className="proj-desc">{project.shortDescription}</p>
        <CaseLink project={project} />
      </div>
      <div className="proj-mini-art">{art}</div>
    </article>
  );
}

/* large cards take a full row; compact cards are paired two to a row, like the built-in ones */
export function DynamicCards({ projects, category }) {
  const look = SECTION_LOOK[category] || SECTION_LOOK.Others;
  const blocks = [];
  let minis = [];
  const flush = () => {
    for (let i = 0; i < minis.length; i += 2) {
      const pair = minis.slice(i, i + 2);
      blocks.push(
        <div className={look.row} key={`mini-${pair[0].id}`}>
          {pair.map((p) => (
            <MiniCard key={p.id} project={p} look={look} />
          ))}
        </div>
      );
    }
    minis = [];
  };
  for (const project of projects) {
    if (project.cardStyle === "mini") {
      minis.push(project);
    } else {
      flush();
      blocks.push(<FeatureCard key={project.id} project={project} look={look} />);
    }
  }
  flush();
  return blocks;
}
