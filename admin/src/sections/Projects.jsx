import { useMemo, useRef, useState } from "react";
import { api, getToken } from "../api";
import Icon from "../icons";
import { EmptyState, ErrorState, Field, Modal, PageHead, StatCard, Switch, TableSkeleton } from "../ui";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

/* same tabs as the Projects page on the website */
export const CATEGORIES = [
  { id: "Healthcare", icon: "leaf", text: "Hospitals, clinics, pharma, wellness" },
  { id: "FinTech", icon: "chart", text: "Payments, trading, banking, finance" },
  { id: "Food", icon: "clipboard", text: "Food delivery, restaurants, kitchens" },
  { id: "E-commerce", icon: "layers", text: "Online stores and marketplaces" },
  { id: "Others", icon: "grid", text: "Automobile, publishing and everything else" },
];

const STEPS = ["Category", "Project card", "Case study"];

const BLANK_CASE = {
  subtitle: "",
  intro: "",
  heroImage: "",
  tags: [],
  stats: [],
  needLead: "",
  needText: "",
  quote: "",
  needs: [],
  processText: "",
  steps: [],
  productTitle: "",
  productHighlight: "",
  productText: "",
  productImage: "",
  roles: [],
  featureImages: [],
  tools: [],
  liveUrl: "",
};

const BLANK_PROJECT = {
  category: "",
  title: "",
  slug: "",
  tags: [],
  shortDescription: "",
  cardImage: "",
  cardStyle: "feature",
  cardNote: "",
  region: "both",
  isPublished: true,
  sortOrder: 1,
  hasCaseStudy: true,
  caseStudy: BLANK_CASE,
};

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function resolveMediaUrl(url) {
  if (!url) return "";
  if (/^(https?:|data:)/.test(url)) return url;
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const token = getToken();
  let res;
  try {
    res = await fetch(`${API_BASE}/api/admin/projects/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
  } catch {
    throw new Error("Could not reach the server. Make sure the backend is running.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Image upload failed.");
  return data.url;
}

const toLines = (list) => (list || []).join("\n");
const fromLines = (text) =>
  String(text || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function Projects({ projects, search = "", notify, ask, onUnauthorized }) {
  const [tab, setTab] = useState("all");
  const [draft, setDraft] = useState(null);
  const [toggling, setToggling] = useState(null);
  const rows = projects.rows || [];
  const needle = search.trim().toLowerCase();

  const liveCount = rows.filter((p) => p.isPublished).length;
  const caseCount = rows.filter((p) => p.hasCaseStudy).length;

  const visible = useMemo(
    () =>
      rows.filter((p) => {
        if (tab !== "all" && p.category !== tab) return false;
        if (!needle) return true;
        return [p.title, p.category, p.shortDescription, ...(p.tags || [])].join(" ").toLowerCase().includes(needle);
      }),
    [rows, tab, needle]
  );

  const togglePublished = async (project) => {
    if (toggling) return;
    setToggling(project.id);
    const next = !project.isPublished;
    try {
      await api(`/api/admin/projects/${project.id}/publish`, { method: "PATCH", body: { isPublished: next } });
      await projects.load();
      notify(next ? `“${project.title}” is now live on the website.` : `“${project.title}” is hidden.`);
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else notify(err.message, "error");
    } finally {
      setToggling(null);
    }
  };

  const remove = (project) =>
    ask({
      title: "Delete this project?",
      body: `“${project.title}”, its card, case study and uploaded images will be permanently deleted.`,
      confirmLabel: "Delete Project",
      action: async () => {
        await api(`/api/admin/projects/${project.id}`, { method: "DELETE" });
        await projects.load();
        notify("Project deleted.");
      },
    });

  const create = () =>
    setDraft({
      ...BLANK_PROJECT,
      category: tab === "all" ? "" : tab,
      sortOrder: rows.reduce((max, p) => Math.max(max, p.sortOrder || 0), 0) + 1,
    });

  const saved = async (message) => {
    setDraft(null);
    notify(message);
    await projects.load();
  };

  return (
    <>
      <PageHead title="Projects" text="Add the projects shown under “Featured work” on the Projects page: pick a category, upload the card, then the case study.">
        <button type="button" className="btn btn-primary" onClick={create}>
          <Icon name="plus" size={16} strokeWidth={2.2} />
          Add project
        </button>
      </PageHead>

      <div className="stats is-three">
        <StatCard tone="orange" icon="grid" label="Total projects" value={projects.loading ? "—" : rows.length} note="Added from the admin" />
        <StatCard tone="green" icon="eye" label="Live on site" value={projects.loading ? "—" : liveCount} note="Visible on the Projects page" />
        <StatCard tone="purple" icon="newspaper" label="With case study" value={projects.loading ? "—" : caseCount} note="Cards that open a case study" />
      </div>

      <section className="card">
        <div className="card-head">
          <h2>{tab === "all" ? "All projects" : tab}</h2>
          <div className="tabs" role="tablist" aria-label="Filter by category">
            {[["all", "All", rows.length], ...CATEGORIES.map((c) => [c.id, c.id, rows.filter((p) => p.category === c.id).length])].map(
              ([id, label, count]) => (
                <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? "is-on" : ""} onClick={() => setTab(id)}>
                  {label}
                  <span className="tab-count">{count}</span>
                </button>
              )
            )}
          </div>
        </div>

        {projects.loading ? (
          <TableSkeleton rows={4} />
        ) : projects.error ? (
          <ErrorState message={projects.error} onRetry={projects.retry} />
        ) : visible.length === 0 ? (
          <EmptyState
            icon="grid"
            title={needle ? "No projects match your search" : "No projects yet"}
            text={needle ? "Try another name, category or tag." : "Add a project to show it on the website's Projects page."}
            action={
              needle ? null : (
                <button type="button" className="btn btn-primary" onClick={create}>
                  <Icon name="plus" size={16} strokeWidth={2.2} />
                  Add first project
                </button>
              )
            }
          />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Card</th>
                  <th>Case study</th>
                  <th>Order</th>
                  <th>Live</th>
                  <th className="cell-actions">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((project) => (
                  <tr key={project.id}>
                    <td className="cell-main" data-label="Project">
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 60, height: 42, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#fff7ed", border: "1px solid var(--border)" }}>
                          {project.cardImage ? (
                            <img src={resolveMediaUrl(project.cardImage)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          ) : null}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <strong style={{ fontSize: 13.5, display: "block", lineHeight: 1.3 }}>{project.title}</strong>
                          <small style={{ color: "var(--muted)", fontSize: 11.5 }}>{(project.tags || []).join(" · ") || "No tags"}</small>
                        </div>
                      </div>
                    </td>
                    <td data-label="Category">
                      <span className="badge badge-orange">{project.category}</span>
                    </td>
                    <td data-label="Card" style={{ fontSize: 12.5, color: "var(--text-2)" }}>
                      {project.cardStyle === "mini" ? "Compact" : "Large"}
                    </td>
                    <td data-label="Case study" style={{ fontSize: 12.5 }}>
                      {project.hasCaseStudy ? (
                        <span style={{ color: "var(--green-700, #15803d)", fontWeight: 600 }}>Yes</span>
                      ) : (
                        <span style={{ color: "var(--muted)" }}>No</span>
                      )}
                    </td>
                    <td data-label="Order">{project.sortOrder}</td>
                    <td data-label="Live">
                      <Switch
                        checked={project.isPublished}
                        onChange={() => togglePublished(project)}
                        disabled={toggling === project.id}
                        label={project.isPublished ? `Hide ${project.title}` : `Publish ${project.title}`}
                      />
                    </td>
                    <td className="cell-actions">
                      <button type="button" className="icon-btn" onClick={() => setDraft(project)} title="Edit project" aria-label={`Edit ${project.title}`}>
                        <Icon name="pencil" size={15} />
                      </button>
                      <button type="button" className="icon-btn is-danger" onClick={() => remove(project)} title="Delete project" aria-label={`Delete ${project.title}`}>
                        <Icon name="trash" size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {draft ? <ProjectModal draft={draft} onClose={() => setDraft(null)} onSaved={saved} onUnauthorized={onUnauthorized} /> : null}
    </>
  );
}

function ImageInput({ label, hint, value, onChange, onError, disabled, aspect = "16 / 9" }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    onError("");
    setBusy(true);
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      onError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {value ? (
          <div style={{ position: "relative", width: "100%", aspectRatio: aspect, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", background: "#fff7ed" }}>
            <img src={resolveMediaUrl(value)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={disabled}
              style={{ position: "absolute", top: 8, right: 8, padding: "4px 10px", background: "rgba(0,0,0,0.75)", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={disabled || busy}
            style={{ border: "2px dashed #cbd5e1", borderRadius: 10, padding: "20px 16px", textAlign: "center", cursor: "pointer", background: "#f8fafc", width: "100%" }}
          >
            <Icon name="image" size={28} />
            <p style={{ margin: "6px 0 2px", fontWeight: 600, color: "#1e293b", fontSize: 13 }}>{busy ? "Uploading…" : "Click to upload image"}</p>
            <span style={{ fontSize: 11.5, color: "#64748b" }}>PNG, JPG, WebP or SVG, up to 20 MB</span>
          </button>
        )}
        <input ref={ref} type="file" accept="image/*" onChange={pick} style={{ display: "none" }} />
      </div>
    </Field>
  );
}

function GalleryInput({ value, onChange, onError, disabled }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (event) => {
    const files = [...(event.target.files || [])];
    event.target.value = "";
    if (!files.length) return;
    onError("");
    setBusy(true);
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadImage(file));
      onChange([...value, ...urls].slice(0, 6));
    } catch (err) {
      onError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label="Key feature screens" hint="1st image: full-width band. 2nd image: devices picture (desktop + phones). Any more appear below them. Up to 6.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
        {value.map((url, i) => (
          <div key={url + i} style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", background: "#fff7ed" }}>
            <img src={resolveMediaUrl(url)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              disabled={disabled}
              style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: 11, border: "none", background: "rgba(0,0,0,0.7)", color: "#fff", cursor: "pointer" }}
            >
              ×
            </button>
          </div>
        ))}
        {value.length < 6 ? (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={disabled || busy}
            style={{ aspectRatio: "4 / 3", border: "2px dashed #cbd5e1", borderRadius: 8, background: "#f8fafc", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#475569" }}
          >
            {busy ? "Uploading…" : "+ Add images"}
          </button>
        ) : null}
      </div>
      <input ref={ref} type="file" accept="image/*" multiple onChange={pick} style={{ display: "none" }} />
    </Field>
  );
}

/* editable list of { title, text } rows */
function PairList({ label, hint, value, onChange, max, titleHolder, textHolder, disabled, keys = ["title", "text"] }) {
  const [a, b] = keys;
  const set = (i, key, val) => onChange(value.map((row, j) => (j === i ? { ...row, [key]: val } : row)));
  return (
    <Field label={label} hint={hint}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {value.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(110px, 1fr) 2fr auto", gap: 8 }}>
            <input type="text" value={row[a] || ""} onChange={(e) => set(i, a, e.target.value)} placeholder={titleHolder} disabled={disabled} />
            <input type="text" value={row[b] || ""} onChange={(e) => set(i, b, e.target.value)} placeholder={textHolder} disabled={disabled} />
            <button type="button" className="icon-btn is-danger" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove row" disabled={disabled}>
              <Icon name="trash" size={15} />
            </button>
          </div>
        ))}
        {value.length < max ? (
          <button type="button" className="btn btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => onChange([...value, { [a]: "", [b]: "" }])} disabled={disabled}>
            <Icon name="plus" size={14} /> Add row
          </button>
        ) : null}
      </div>
    </Field>
  );
}

function ProjectModal({ draft, onClose, onSaved, onUnauthorized }) {
  const isNew = !draft.id;
  const [step, setStep] = useState(isNew && !draft.category ? 0 : 1);
  const [form, setForm] = useState(() => ({ ...BLANK_PROJECT, ...draft, caseStudy: { ...BLANK_CASE, ...(draft.caseStudy || {}) } }));
  const [tagsText, setTagsText] = useState(toLines(draft.tags));
  const [caseTagsText, setCaseTagsText] = useState(toLines(draft.caseStudy?.tags));
  const [toolsText, setToolsText] = useState(toLines(draft.caseStudy?.tools));
  const [slugEdited, setSlugEdited] = useState(Boolean(draft.slug));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setCase = (key, value) => setForm((f) => ({ ...f, caseStudy: { ...f.caseStudy, [key]: value } }));
  const cs = form.caseStudy;

  const checkStep = (index) => {
    if (index >= 0 && !form.category) return "Choose a category first.";
    if (index >= 1) {
      if (form.title.trim().length < 2) return "Enter the project name.";
      if (!form.cardImage) return "Upload the project card image.";
      if (!form.shortDescription.trim()) return "Enter a short card description.";
    }
    if (index >= 2 && form.hasCaseStudy) {
      if (!cs.heroImage) return "Upload the case study hero image.";
      if (!cs.intro.trim()) return "Enter the case study introduction.";
    }
    return "";
  };

  const next = () => {
    const problem = checkStep(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    if (busy) return;
    const problem = checkStep(2);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setBusy(true);
    const payload = {
      ...form,
      title: form.title.trim(),
      slug: (form.slug || slugify(form.title)).trim(),
      tags: fromLines(tagsText),
      sortOrder: Number(form.sortOrder) || 1,
      caseStudy: { ...cs, tags: fromLines(caseTagsText), tools: fromLines(toolsText) },
    };
    try {
      if (isNew) {
        await api("/api/admin/projects", { method: "POST", body: payload });
        await onSaved("Project added.");
      } else {
        await api(`/api/admin/projects/${draft.id}`, { method: "PUT", body: payload });
        await onSaved("Project updated.");
      }
    } catch (err) {
      setBusy(false);
      if (err.status === 401) onUnauthorized();
      else setError(err.message);
    }
  };

  const last = step === STEPS.length - 1;

  return (
    <Modal
      title={isNew ? "Add project" : `Edit ${draft.title}`}
      eyebrow={`Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className="btn" onClick={step === 0 ? onClose : () => { setError(""); setStep(step - 1); }} disabled={busy}>
            {step === 0 ? "Cancel" : "Back"}
          </button>
          {last ? (
            <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
              {busy ? "Saving…" : isNew ? "Save project" : "Save changes"}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={next} disabled={busy}>
              Next: {STEPS[step + 1]}
            </button>
          )}
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <ol style={{ display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap" }}>
          {STEPS.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => {
                  const problem = i > step ? checkStep(i - 1) : "";
                  if (problem) setError(problem);
                  else {
                    setError("");
                    setStep(i);
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: i === step ? "#f97316" : "var(--border)",
                  background: i === step ? "#fff7ed" : "#fff",
                  color: i === step ? "#c2410c" : "var(--text-2)",
                  fontWeight: 600,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                <b style={{ width: 20, height: 20, borderRadius: 10, display: "grid", placeItems: "center", background: i <= step ? "#f97316" : "#e2e8f0", color: i <= step ? "#fff" : "#475569", fontSize: 11 }}>
                  {i + 1}
                </b>
                {name}
              </button>
            </li>
          ))}
        </ol>

        {error ? <p className="alert">{error}</p> : null}

        {step === 0 ? (
          <Field label="Category" hint="The tab this project appears under on the Projects page">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {CATEGORIES.map((c) => {
                const on = form.category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      set("category", c.id);
                      setError("");
                    }}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      textAlign: "left",
                      padding: 14,
                      borderRadius: 12,
                      border: `1.5px solid ${on ? "#f97316" : "var(--border)"}`,
                      background: on ? "#fff7ed" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <span className="stat-icon tone-orange-icon" style={{ flexShrink: 0 }}>
                      <Icon name={c.icon} size={18} />
                    </span>
                    <span>
                      <strong style={{ display: "block", fontSize: 14, color: on ? "#c2410c" : "var(--text)" }}>{c.id}</strong>
                      <small style={{ color: "var(--muted)", fontSize: 12 }}>{c.text}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>
        ) : null}

        {step === 1 ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <Field label="Project name" hint="Shown as the card heading">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (!slugEdited) set("slug", slugify(e.target.value));
                  }}
                  placeholder="e.g. Infocus publications"
                  autoFocus
                  disabled={busy}
                />
              </Field>
              <Field label="URL slug" hint="Case study link: #case-p-slug">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    set("slug", e.target.value);
                    setSlugEdited(true);
                  }}
                  placeholder="infocus-publications"
                  disabled={busy}
                />
              </Field>
            </div>

            <Field label="Tags" hint="One per line, e.g. Web platform / Publishing / Research (up to 6)">
              <textarea rows={3} value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder={"Web platform\nPublishing\nResearch"} disabled={busy} />
            </Field>

            <Field label="Short description" hint="The paragraph on the card">
              <textarea
                rows={3}
                value={form.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                placeholder="A digital publishing platform that streamlines manuscript submission, peer review, and journal publishing."
                disabled={busy}
              />
            </Field>

            <ImageInput
              label="Card image"
              hint="Transparent PNG / WebP laptop or phone mockup: shown whole, like the built-in cards. JPG photo or screenshot: fills the picture area in the card's frame."
              value={form.cardImage}
              onChange={(url) => set("cardImage", url)}
              onError={setError}
              disabled={busy}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <Field label="Card size" hint="Large spans the full row; compact cards sit two per row">
                <select value={form.cardStyle} onChange={(e) => set("cardStyle", e.target.value)} disabled={busy}>
                  <option value="feature">Large card</option>
                  <option value="mini">Compact card</option>
                </select>
              </Field>
              <Field label="Handwritten note (optional)" hint="Script text on large cards, e.g. Research Today for a Cleaner Tomorrow">
                <input type="text" value={form.cardNote} onChange={(e) => set("cardNote", e.target.value)} disabled={busy} />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <Field label="Show on website" hint="Same choice as Blogs">
                <select value={form.region} onChange={(e) => set("region", e.target.value)} disabled={busy}>
                  <option value="both">Both websites</option>
                  <option value="domestic">India / Domestic (.in)</option>
                  <option value="international">Global / International</option>
                </select>
              </Field>
              <Field label="Display order" hint="Lower numbers show first in the category">
                <input type="number" min="1" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} disabled={busy} />
              </Field>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
              <input type="checkbox" checked={form.hasCaseStudy} onChange={(e) => set("hasCaseStudy", e.target.checked)} disabled={busy} style={{ width: 18, height: 18, accentColor: "#f97316" }} />
              This project has a case study page (adds “View case study” to the card)
            </label>

            {form.hasCaseStudy ? (
              <>
                <h3 style={{ margin: "4px 0 0", fontSize: 14 }}>Hero</h3>
                <Field label="Tagline" hint="Under the big title, e.g. Publish Research. Build Knowledge.">
                  <input type="text" value={cs.subtitle} onChange={(e) => setCase("subtitle", e.target.value)} disabled={busy} />
                </Field>
                <Field label="Introduction" hint="Opening paragraph of the case study">
                  <textarea rows={3} value={cs.intro} onChange={(e) => setCase("intro", e.target.value)} disabled={busy} />
                </Field>
                <Field label="Hero tags" hint="One per line, e.g. Academic Publishing">
                  <textarea rows={3} value={caseTagsText} onChange={(e) => setCaseTagsText(e.target.value)} disabled={busy} />
                </Field>
                <ImageInput label="Hero image" hint="Large image at the top of the case study" value={cs.heroImage} onChange={(url) => setCase("heroImage", url)} onError={setError} disabled={busy} />
                <PairList
                  label="Stats (optional)"
                  hint="Up to 4, e.g. 6 / Role-based panels"
                  value={cs.stats}
                  onChange={(v) => setCase("stats", v)}
                  max={4}
                  keys={["value", "label"]}
                  titleHolder="6"
                  textHolder="Role-based panels"
                  disabled={busy}
                />

                <h3 style={{ margin: "4px 0 0", fontSize: 14 }}>The idea</h3>
                <Field label="Short bold line (optional)" hint="Under “What the client needed”, e.g. A clearer digital presence for parents.">
                  <input type="text" value={cs.needLead} onChange={(e) => setCase("needLead", e.target.value)} disabled={busy} />
                </Field>
                <Field label="What the client needed">
                  <textarea rows={3} value={cs.needText} onChange={(e) => setCase("needText", e.target.value)} disabled={busy} />
                </Field>
                <Field label="Highlight quote (optional)">
                  <input type="text" value={cs.quote} onChange={(e) => setCase("quote", e.target.value)} disabled={busy} />
                </Field>
                <PairList label="Needs" hint="Up to 4, e.g. Submit / Submit and track manuscripts" value={cs.needs} onChange={(v) => setCase("needs", v)} max={4} titleHolder="Submit" textHolder="Submit and track manuscripts" disabled={busy} />

                <h3 style={{ margin: "4px 0 0", fontSize: 14 }}>Our process</h3>
                <Field label="Process description">
                  <textarea rows={3} value={cs.processText} onChange={(e) => setCase("processText", e.target.value)} disabled={busy} />
                </Field>
                <PairList label="Process steps" hint="Up to 3, e.g. Understand / Design / Develop" value={cs.steps} onChange={(v) => setCase("steps", v)} max={3} titleHolder="Understand" textHolder="What we did in this step" disabled={busy} />

                <h3 style={{ margin: "4px 0 0", fontSize: 14 }}>The product</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                  <Field label="Product heading" hint="Black part, e.g. A complete digital">
                    <input type="text" value={cs.productTitle} onChange={(e) => setCase("productTitle", e.target.value)} disabled={busy} />
                  </Field>
                  <Field label="Heading highlight (optional)" hint="Orange part after it, e.g. information experience.">
                    <input type="text" value={cs.productHighlight} onChange={(e) => setCase("productHighlight", e.target.value)} disabled={busy} />
                  </Field>
                </div>
                <Field label="Product description">
                  <textarea rows={4} value={cs.productText} onChange={(e) => setCase("productText", e.target.value)} disabled={busy} />
                </Field>
                <ImageInput label="Product image (optional)" value={cs.productImage} onChange={(url) => setCase("productImage", url)} onError={setError} disabled={busy} />
                <PairList label="Panels / modules (optional)" hint="Up to 3, e.g. Author Panel / Track all process" value={cs.roles} onChange={(v) => setCase("roles", v)} max={3} titleHolder="Author Panel" textHolder="Track all process." disabled={busy} />

                <h3 style={{ margin: "4px 0 0", fontSize: 14 }}>Key features & tech</h3>
                <GalleryInput value={cs.featureImages} onChange={(v) => setCase("featureImages", v)} onError={setError} disabled={busy} />
                <Field label="Tech stack (optional)" hint="One per line. Logos are shown for React, SQL, Figma, Node.js, Miro, Docker, Google Forms, Google Sheets; other names show as text.">
                  <textarea rows={3} value={toolsText} onChange={(e) => setToolsText(e.target.value)} disabled={busy} />
                </Field>
                <Field label="Live project link (optional)">
                  <input type="url" value={cs.liveUrl} onChange={(e) => setCase("liveUrl", e.target.value)} placeholder="https://" disabled={busy} />
                </Field>
              </>
            ) : null}

            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
              <input type="checkbox" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} disabled={busy} style={{ width: 18, height: 18, accentColor: "#f97316" }} />
              Publish now (visible on the website)
            </label>
          </>
        ) : null}
      </div>
    </Modal>
  );
}
