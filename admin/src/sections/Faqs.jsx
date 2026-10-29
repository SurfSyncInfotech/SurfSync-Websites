import { useMemo, useState } from "react";
import { api } from "../api";
import Icon from "../icons";
import { EmptyState, ErrorState, Field, Modal, PageHead, StatCard, TableSkeleton } from "../ui";
import { timeAgo } from "../utils";

export default function Faqs({ faqs, search, notify, ask, onUnauthorized }) {
  const [draft, setDraft] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [moving, setMoving] = useState(false);
  const rows = faqs.rows;
  const needle = search.trim().toLowerCase();

  const visible = useMemo(
    () => (needle ? rows.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(needle)) : rows),
    [rows, needle]
  );

  const lastEdited = useMemo(() => {
    let latest = null;
    for (const faq of rows) {
      const time = new Date(faq.updatedAt).getTime();
      if (!Number.isNaN(time) && (!latest || time > latest)) latest = time;
    }
    return latest;
  }, [rows]);

  const avgWords = rows.length
    ? Math.round(rows.reduce((sum, faq) => sum + faq.answer.trim().split(/\s+/).length, 0) / rows.length)
    : 0;

  const fail = (error) => (error.status === 401 ? onUnauthorized() : notify(error.message, "error"));

  const move = async (index, direction) => {
    const target = index + direction;
    if (moving || target < 0 || target >= rows.length) return;
    setMoving(true);
    const order = rows.slice();
    [order[index], order[target]] = [order[target], order[index]];
    try {
      await Promise.all(
        order.map((faq, position) =>
          faq.sortOrder === position + 1
            ? null
            : api(`/api/admin/faqs/${faq.id}`, {
                method: "PUT",
                body: { question: faq.question, answer: faq.answer, sortOrder: position + 1 },
              })
        )
      );
      await faqs.load();
    } catch (error) {
      fail(error);
    } finally {
      setMoving(false);
    }
  };

  const remove = (faq) =>
    ask({
      title: "Delete this FAQ?",
      body: `“${faq.question}” will be removed from the Careers page.`,
      confirmLabel: "Delete FAQ",
      action: async () => {
        await api(`/api/admin/faqs/${faq.id}`, { method: "DELETE" });
        await faqs.load();
        notify("FAQ deleted.");
      },
    });

  const create = () =>
    setDraft({ question: "", answer: "", sortOrder: rows.reduce((max, faq) => Math.max(max, faq.sortOrder), 0) + 1 });

  const saved = async (message) => {
    setDraft(null);
    notify(message);
    await faqs.load();
  };

  return (
    <>
      <PageHead title="FAQs" text="Questions and answers shown at the bottom of the Careers page.">
        <button type="button" className="btn btn-primary" onClick={create}>
          <Icon name="plus" size={16} strokeWidth={2.2} />
          Add FAQ
        </button>
      </PageHead>

      <div className="stats is-three">
        <StatCard tone="orange" icon="help" label="Published questions" value={faqs.loading ? "—" : rows.length} note="Live on the Careers page" />
        <StatCard tone="green" icon="clock" label="Last edited" value={faqs.loading ? "—" : lastEdited ? timeAgo(lastEdited) : "Never"} note="Most recent change" />
        <StatCard tone="purple" icon="text" label="Average answer" value={faqs.loading ? "—" : `${avgWords} words`} note="Short answers read best" />
      </div>

      <section className="card">
        <div className="card-head">
          <h2>Careers FAQs</h2>
          <span className="card-note">{needle ? "Clear the search to reorder questions." : "Use the arrows to change the order."}</span>
        </div>

        {faqs.loading ? (
          <TableSkeleton rows={4} />
        ) : faqs.error ? (
          <ErrorState message={faqs.error} onRetry={faqs.retry} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="help"
            title="No FAQs yet"
            text="Add the questions candidates ask most often."
            action={
              <button type="button" className="btn btn-primary" onClick={create}>
                <Icon name="plus" size={16} strokeWidth={2.2} />
                Add FAQ
              </button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState icon="search" title="No questions match" text="Try a different search." />
        ) : (
          <ol className="faq-list">
            {visible.map((faq) => {
              const index = rows.indexOf(faq);
              const open = openId === faq.id;
              return (
                <li key={faq.id} className={`faq-row${open ? " is-open" : ""}`}>
                  <span className="faq-num">{index + 1}</span>
                  <div className="faq-copy">
                    <button type="button" className="faq-q" onClick={() => setOpenId(open ? null : faq.id)} aria-expanded={open}>
                      {faq.question}
                    </button>
                    <p className="faq-a">{faq.answer}</p>
                  </div>
                  <div className="faq-actions">
                    {!needle ? (
                      <>
                        <button type="button" className="icon-btn" onClick={() => move(index, -1)} disabled={moving || index === 0} aria-label="Move up" title="Move up">
                          <Icon name="arrowUp" size={16} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => move(index, 1)}
                          disabled={moving || index === rows.length - 1}
                          aria-label="Move down"
                          title="Move down"
                        >
                          <Icon name="arrowDown" size={16} />
                        </button>
                      </>
                    ) : null}
                    <button type="button" className="icon-btn" onClick={() => setDraft(faq)} aria-label="Edit FAQ" title="Edit">
                      <Icon name="edit" />
                    </button>
                    <button type="button" className="icon-btn is-danger" onClick={() => remove(faq)} aria-label="Delete FAQ" title="Delete">
                      <Icon name="trash" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {draft ? <FaqForm initial={draft} onClose={() => setDraft(null)} onSaved={saved} onUnauthorized={onUnauthorized} /> : null}
    </>
  );
}

function FaqForm({ initial, onClose, onSaved, onUnauthorized }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    if (form.question.trim().length < 5) {
      setError("Enter a question of at least 5 characters.");
      return;
    }
    if (form.answer.trim().length < 5) {
      setError("Enter an answer of at least 5 characters.");
      return;
    }
    setBusy(true);
    setError("");
    const body = { question: form.question, answer: form.answer, sortOrder: Number(form.sortOrder) || 0 };
    try {
      if (form.id) await api(`/api/admin/faqs/${form.id}`, { method: "PUT", body });
      else await api("/api/admin/faqs", { method: "POST", body });
      onSaved(form.id ? "FAQ updated." : "FAQ added to the Careers page.");
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
      eyebrow="FAQs"
      title={form.id ? "Edit FAQ" : "Add a new FAQ"}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="faq-form" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : form.id ? "Save changes" : "Add FAQ"}
          </button>
        </>
      }
    >
      <form id="faq-form" className="form" onSubmit={submit} noValidate>
        {error ? <p className="alert">{error}</p> : null}
        <Field label="Question" hint={`${form.question.length}/300`}>
          <input value={form.question} onChange={set("question")} maxLength={300} placeholder="e.g. Do you offer internships?" autoFocus />
        </Field>
        <Field label="Answer">
          <textarea value={form.answer} onChange={set("answer")} rows={6} maxLength={4000} placeholder="Write a clear, short answer." />
        </Field>
        <Field label="Display order" hint="Lower numbers appear first.">
          <input type="number" min="0" value={form.sortOrder} onChange={set("sortOrder")} />
        </Field>
      </form>
    </Modal>
  );
}
