import processCurve from "../assets/case-vakt/process-curve.svg";
import bulb from "../assets/case-modern-auto/bulb.png";
/* the same icon set as the VAKT case study, used in order for stats, needs and product points */
import stat0 from "../assets/case-vakt/stat-0.png";
import stat1 from "../assets/case-vakt/stat-1.png";
import stat2 from "../assets/case-vakt/stat-2.png";
import stat3 from "../assets/case-infocus/stat-3.png";
import need0 from "../assets/case-vakt/need-0.png";
import need1 from "../assets/case-vakt/need-1.png";
import need2 from "../assets/case-vakt/need-2.png";
import need3 from "../assets/case-vakt/need-3.png";
import role0 from "../assets/case-vakt/role-0.png";
import role1 from "../assets/case-vakt/role-1.png";
import role2 from "../assets/case-vakt/role-2.png";
import toolReact from "../assets/case-vakt/tool-0.png";
import toolSql from "../assets/case-vakt/tool-1.png";
import toolFigma from "../assets/case-vakt/tool-2.png";
import toolNode from "../assets/case-vakt/tool-3.png";
import toolMiro from "../assets/case-vakt/tool-4.png";
import toolDocker from "../assets/case-vakt/tool-5.png";
import toolForms from "../assets/case-modern-auto/tool-2.png";
import toolSheets from "../assets/case-modern-auto/tool-3.png";
import CaseProof from "./CaseProof";
import { mediaUrl, useDynamicProject } from "./DynamicProjects";
import "./CaseStudy.css";
import "./CaseDynamic.css";

const statIcons = [stat0, stat1, stat2, stat3];
const needIcons = [need0, need1, need2, need3];
const roleIcons = [role0, role1, role2];

/* tech names the admin types -> the logos the built-in case studies use */
const toolLogos = {
  react: toolReact,
  "react.js": toolReact,
  reactjs: toolReact,
  sql: toolSql,
  mysql: toolSql,
  figma: toolFigma,
  node: toolNode,
  "node.js": toolNode,
  nodejs: toolNode,
  miro: toolMiro,
  docker: toolDocker,
  "google forms": toolForms,
  "google sheets": toolSheets,
};

/* case study page for a project added in the admin panel; it follows the same layout as the
   built-in case studies (VAKT, Infocus…) and leaves out any section the admin left empty */
function CaseDynamic({ slug }) {
  const { project, loading } = useDynamicProject(slug);

  if (loading) return <div className="case-page is-dynamic cs-dyn-empty" aria-busy="true" />;

  if (!project || !project.hasCaseStudy) {
    return (
      <div className="case-page is-dynamic cs-dyn-empty">
        <div className="cs-wrap">
          <p className="cs-kicker">Case study</p>
          <h1>Case study not found</h1>
          <a className="cs-btn" href="#projects">
            Back to projects <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy || {};
  const stats = cs.stats || [];
  const needs = cs.needs || [];
  const steps = cs.steps || [];
  const roles = cs.roles || [];
  const [band, devices, ...moreScreens] = cs.featureImages || [];
  const tools = cs.tools || [];

  return (
    <div className="case-page is-dynamic">
      <section className="cs-hero cs-wrap">
        <div className="cs-hero-copy">
          <p className="cs-kicker">Case study</p>
          <h1>{project.title}</h1>
          {cs.subtitle ? <p className="cs-hero-sub">{cs.subtitle}</p> : null}
          <p className="cs-body">{cs.intro}</p>
          {cs.tags?.length ? (
            <ul className="cs-tags">
              {cs.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
          {cs.liveUrl ? (
            <a className="cs-btn" href={cs.liveUrl} target="_blank" rel="noreferrer">
              Visit live project <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
        <div className="cs-hero-art">
          <img src={mediaUrl(cs.heroImage)} alt={project.title} />
        </div>
      </section>

      {stats.length ? (
        <div className="cs-wrap">
          <ul className="cs-stats">
            {stats.map((stat, i) => (
              <li key={i}>
                <img loading="lazy" decoding="async" src={statIcons[i % statIcons.length]} alt="" />
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {cs.needLead || cs.needText || needs.length ? (
        <section className="cs-idea cs-wrap">
          <div className="cs-idea-head">
            <div>
              <p className="cs-kicker">The idea</p>
              <h2>What the client needed</h2>
              {cs.needLead ? <p className="cs-lead">{cs.needLead}</p> : null}
              {cs.needText ? <p className="cs-body">{cs.needText}</p> : null}
            </div>
            {cs.quote ? (
              <blockquote className="cs-quote">
                <img loading="lazy" decoding="async" src={bulb} alt="" />
                <p>{cs.quote}</p>
              </blockquote>
            ) : null}
          </div>
          {needs.length ? (
            <ul className="cs-needs">
              {needs.map((need, i) => (
                <li key={i}>
                  <img loading="lazy" decoding="async" src={needIcons[i % needIcons.length]} alt="" />
                  <div>
                    <strong>{need.title}</strong>
                    <span>{need.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {steps.length ? (
        <section className="cs-process">
          <div className="cs-process-stage">
            <div className="cs-process-head">
              <p className="cs-kicker">Our process</p>
              <h2>
                From <span>idea to product</span>
              </h2>
              {cs.processText ? <p className="cs-body">{cs.processText}</p> : null}
              <a className="cs-btn" href="#contact">
                Get started <span aria-hidden="true">→</span>
              </a>
            </div>
            <span className="cs-blob" aria-hidden="true" />
            <img loading="lazy" decoding="async" className="cs-curve" src={processCurve} alt="" aria-hidden="true" />
            <ol className="cs-steps">
              {steps.map((step, i) => (
                <li key={i} className={`cs-step is-${i + 1}`}>
                  <i aria-hidden="true" />
                  <b aria-hidden="true">{i + 1}</b>
                  <strong>{step.title}</strong>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {cs.productTitle || cs.productHighlight || cs.productText || cs.productImage ? (
        <section className="cs-product">
          <div className="cs-wrap cs-product-grid">
            <div>
              <p className="cs-kicker">The product</p>
              {cs.productTitle || cs.productHighlight ? (
                <h2>
                  {cs.productTitle}
                  {cs.productTitle && cs.productHighlight ? <br /> : null}
                  {cs.productHighlight ? <span>{cs.productHighlight}</span> : null}
                </h2>
              ) : null}
              {cs.productText ? <p className="cs-body">{cs.productText}</p> : null}
              {roles.length ? (
                <ul className="cs-roles">
                  {roles.map((role, i) => (
                    <li key={i}>
                      <img loading="lazy" decoding="async" src={roleIcons[i % roleIcons.length]} alt="" />
                      <div>
                        <strong>{role.title}</strong>
                        <span>{role.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {cs.productImage ? (
              <div className="cs-product-art">
                <p className="cs-script" aria-hidden="true">
                  clean &amp;
                  <br />
                  <em>Easy to</em>
                  <br />
                  use
                </p>
                <img loading="lazy" decoding="async" src={mediaUrl(cs.productImage)} alt={`${project.title} product.`} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {band ? (
        <section className="cs-features">
          <div className="cs-wrap">
            <p className="cs-kicker">Key screens</p>
            <h2>
              Key <span>features</span>
            </h2>
          </div>
          <img loading="lazy" decoding="async" className="cs-features-band" src={mediaUrl(band)} alt={`${project.title} key screens.`} />
          {devices ? (
            <img loading="lazy" decoding="async" className="cs-devices" src={mediaUrl(devices)} alt={`${project.title} on several devices.`} />
          ) : null}
          {moreScreens.length ? (
            <div className="cs-wrap cs-dyn-gallery">
              {moreScreens.map((url, i) => (
                <img key={i} loading="lazy" decoding="async" src={mediaUrl(url)} alt={`${project.title} screen ${i + 3}.`} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {tools.length ? (
        <section className="cs-tools">
          <div className="cs-wrap">
            <p className="cs-kicker">Tech stack</p>
            <h2>
              Built with <span>right tools.</span>
            </h2>
            <ul>
              {tools.map((name) => {
                const logo = toolLogos[name.trim().toLowerCase()];
                return (
                  <li key={name}>
                    {logo ? (
                      <img loading="lazy" decoding="async" src={logo} alt={name} />
                    ) : (
                      <span className="cs-dyn-tool">{name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <CaseProof />
    </div>
  );
}

export default CaseDynamic;
