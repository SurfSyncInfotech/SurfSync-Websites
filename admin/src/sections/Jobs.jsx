import { useMemo, useState } from "react";
import { api } from "../api";
import Icon, { ROLE_ICONS } from "../icons";
import { EmptyState, ErrorState, Field, Modal, PageHead, StatCard, Switch, TableSkeleton } from "../ui";

const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];

const BLANK = {
  title: "",
  type: "Full-time",
  area: "",
  place: "",
  icon: "pencil",
  doing: "",
  looking: "",
  about: "",
  sortOrder: 1,
  active: true,
};

const toLines = (text) =>
  String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export default function Jobs({ jobs, applications, search, notify, ask, onUnauthorized }) {
  const [tab, setTab] = useState("all");
  const [draft, setDraft] = useState(null);
  const [toggling, setToggling] = useState(null);
  const rows = jobs.rows;
  const needle = search.trim().toLowerCase();
  const live = rows.filter((job) => job.active).length;

  const appCounts = useMemo(() => {
    const counts = new Map();
    for (const row of applications.rows) {
      if (row.jobId) counts.set(row.jobId, (counts.get(row.jobId) || 0) + 1);
    }
    return counts;
  }, [applications.rows]);

  const visible = useMemo(
    () =>
      rows.filter((job) => {
        if (tab === "open" && !job.active) return false;
        if (tab === "hidden" && job.active) return false;
        if (!needle) return true;
        return [job.title, job.area, job.type, job.place].join(" ").toLowerCase().includes(needle);
      }),
    [rows, tab, needle]
  );

  const fail = (error) => (error.status === 401 ? onUnauthorized() : notify(error.message, "error"));

  const toggle = async (job) => {
    setToggling(job.id);
    try {
      await api(`/api/admin/jobs/${job.id}`, { method: "PUT", body: { ...job, active: !job.active } });
      await jobs.load();
      notify(job.active ? `“${job.title}” is now hidden from the Careers page.` : `“${job.title}” is now live on the Careers page.`);
    } catch (error) {
      fail(error);
    } finally {
      setToggling(null);
    }
  };

  const remove = (job) =>
    ask({
      title: "Delete this job?",
      body: `“${job.title}” will be removed from the Careers page. Applications already received for it stay in Queries.`,
      confirmLabel: "Delete job",
      action: async () => {
        await api(`/api/admin/jobs/${job.id}`, { method: "DELETE" });
        await jobs.load();
        notify("Job deleted.");
      },
    });

  const create = () =>
    setDraft({ ...BLANK, sortOrder: rows.reduce((max, job) => Math.max(max, job.sortOrder), 0) + 1 });

  const edit = (job) => setDraft({ ...job, doing: job.doing.join("\n"), looking: job.looking.join("\n") });

  const saved = async (message) => {
    setDraft(null);
    notify(message);
    await jobs.load();
  };

  const tabs = [
    ["all", "All", rows.length],
    ["open", "Live", live],
    ["hidden", "Hidden", rows.length - live],
  ];

  const busy = jobs.loading;

  return (
    <>
      <PageHead title="Jobs" text="Create, edit, and publish the roles shown on the Careers page.">
        <button type="button" className="btn btn-primary" onClick={create}>
          <Icon name="plus" size={16} strokeWidth={2.2} />
          Add job
        </button>
      </PageHead>

      <div className="stats">
        <StatCard tone="orange" icon="briefcase" label="Total roles" value={busy ? "—" : rows.length} note="Saved in the admin" />
        <StatCard tone="green" icon="eye" label="Live on site" value={busy ? "—" : live} note="Visible to candidates" />
        <StatCard tone="purple" icon="eyeOff" label="Hidden" value={busy ? "—" : rows.length - live} note="Saved as drafts" />
        <StatCard tone="blue" icon="inbox" label="Applications" value={applications.loading ? "—" : applications.rows.length} note="Across all roles" />
      </div>

      <section className="card">
        <div className="card-head">
          <h2>All roles</h2>
          <div className="tabs" role="tablist" aria-label="Filter roles">
            {tabs.map(([id, label, count]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? "is-on" : ""}
                onClick={() => setTab(id)}
              >
                {label}
                <span className="tab-count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {jobs.loading ? (
          <TableSkeleton />
        ) : jobs.error ? (
          <ErrorState message={jobs.error} onRetry={jobs.retry} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="briefcase"
            title="No jobs yet"
            text="Add your first role and it will appear on the Careers page right away."
            action={
              <button type="button" className="btn btn-primary" onClick={create}>
                <Icon name="plus" size={16} strokeWidth={2.2} />
                Add job
              </button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState icon="search" title="No roles match" text="Try a different search or filter." />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Applications</th>
                  <th>Order</th>
                  <th>Live</th>
                  <th className="cell-actions">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((job) => (
                  <tr key={job.id}>
                    <td className="cell-main" data-label="Role">
                      <div className="entity">
                        <span className="entity-icon">
                          <Icon name={job.icon} size={18} />
                        </span>
                        <div>
                          <strong>{job.title}</strong>
                          <small>{job.area}</small>
                        </div>
                      </div>
                    </td>
                    <td data-label="Type">
                      <span className="badge">{job.type}</span>
                    </td>
                    <td data-label="Location">
                      <span className="with-icon">
                        <Icon name="pin" size={15} />
                        {job.place}
                      </span>
                    </td>
                    <td data-label="Applications">
                      <span className="count-chip">{appCounts.get(job.id) || 0}</span>
                    </td>
                    <td data-label="Order">{job.sortOrder}</td>
                    <td data-label="Live">
                      <Switch
                        checked={job.active}
                        disabled={toggling === job.id}
                        onChange={() => toggle(job)}
                        label={job.active ? `Hide ${job.title}` : `Publish ${job.title}`}
                      />
                    </td>
                    <td className="cell-actions">
                      <button type="button" className="icon-btn" onClick={() => edit(job)} aria-label={`Edit ${job.title}`} title="Edit">
                        <Icon name="edit" />
                      </button>
                      <button type="button" className="icon-btn is-danger" onClick={() => remove(job)} aria-label={`Delete ${job.title}`} title="Delete">
                        <Icon name="trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {draft ? <JobForm initial={draft} onClose={() => setDraft(null)} onSaved={saved} onUnauthorized={onUnauthorized} /> : null}
    </>
  );
}

function JobForm({ initial, onClose, onSaved, onUnauthorized }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const types = JOB_TYPES.includes(form.type) ? JOB_TYPES : [form.type, ...JOB_TYPES];
  const doingCount = toLines(form.doing).length;
  const lookingCount = toLines(form.looking).length;

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const body = {
      ...form,
      doing: toLines(form.doing),
      looking: toLines(form.looking),
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (form.id) await api(`/api/admin/jobs/${form.id}`, { method: "PUT", body });
      else await api("/api/admin/jobs", { method: "POST", body });
      onSaved(form.id ? "Job updated." : form.active ? "Job published on the Careers page." : "Job saved as hidden.");
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else {
        setError(err.message);
        setBusy(false);
      }
    }
  };

  return (
    <Modal
      eyebrow="Jobs"
      title={form.id ? "Edit job" : "Add a new job"}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="job-form" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : form.id ? "Save changes" : "Save job"}
          </button>
        </>
      }
    >
      <form id="job-form" className="form" onSubmit={submit} noValidate>
        {error ? <p className="alert">{error}</p> : null}
        <div className="form-grid">
          <Field label="Job title">
            <input value={form.title} onChange={set("title")} maxLength={160} placeholder="e.g. Product Designer" autoFocus />
          </Field>
          <Field label="Team / area">
            <input value={form.area} onChange={set("area")} maxLength={80} placeholder="e.g. Design" />
          </Field>
          <Field label="Job type">
            <select value={form.type} onChange={set("type")}>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <input value={form.place} onChange={set("place")} maxLength={80} placeholder="e.g. Hybrid or Noida" />
          </Field>
        </div>

        <div className="field">
          <span className="field-label">Icon</span>
          <div className="icon-picker" role="radiogroup" aria-label="Job icon">
            {ROLE_ICONS.map((name) => (
              <button
                key={name}
                type="button"
                role="radio"
                aria-checked={form.icon === name}
                aria-label={name}
                className={form.icon === name ? "is-on" : ""}
                onClick={() => setForm((current) => ({ ...current, icon: name }))}
              >
                <Icon name={name} size={20} />
              </button>
            ))}
          </div>
        </div>

        <Field label="What you’ll do" hint={`One point per line · ${doingCount} ${doingCount === 1 ? "point" : "points"}`}>
          <textarea value={form.doing} onChange={set("doing")} rows={4} placeholder={"Design web and mobile journeys\nPrototype and test ideas"} />
        </Field>
        <Field label="What we’re looking for" hint={`One point per line · ${lookingCount} ${lookingCount === 1 ? "point" : "points"}`}>
          <textarea value={form.looking} onChange={set("looking")} rows={4} placeholder={"A strong portfolio\nClear communication"} />
        </Field>
        <Field label="About the role">
          <textarea value={form.about} onChange={set("about")} rows={4} maxLength={4000} placeholder="A short paragraph about the role and the team." />
        </Field>

        <div className="form-grid">
          <Field label="Display order" hint="Lower numbers appear first.">
            <input type="number" min="0" value={form.sortOrder} onChange={set("sortOrder")} />
          </Field>
          <div className="toggle-row">
            <div>
              <strong>Show on Careers page</strong>
              <small>{form.active ? "Candidates can see and apply." : "Saved, but hidden from candidates."}</small>
            </div>
            <Switch
              checked={form.active}
              onChange={(value) => setForm((current) => ({ ...current, active: value }))}
              label="Show on Careers page"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
