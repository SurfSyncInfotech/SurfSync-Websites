import { useEffect, useRef } from "react";
import Icon from "./icons";
import { initials, toneFor } from "./utils";

let locks = 0;
const layers = [];

export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    locks += 1;
    document.body.classList.add("is-locked");
    return () => {
      locks = Math.max(0, locks - 1);
      if (!locks) document.body.classList.remove("is-locked");
    };
  }, [active]);
}

export function Modal({ title, eyebrow, onClose, children, footer, variant = "dialog", size = "md" }) {
  const closeRef = useRef(onClose);
  useScrollLock();

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const id = Symbol("layer");
    layers.push(id);
    const onKey = (event) => {
      if (event.key === "Escape" && layers[layers.length - 1] === id) closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      layers.splice(layers.indexOf(id), 1);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={`overlay is-${variant}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeRef.current();
      }}
    >
      <div className={`sheet sheet-${variant} sheet-${size}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="sheet-head">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </header>
        <div className="sheet-body">{children}</div>
        {footer ? <footer className="sheet-foot">{footer}</footer> : null}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, body, confirmLabel = "Delete", busy, onCancel, onConfirm }) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      size="sm"
      footer={
        <>
          <button type="button" className="btn" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </button>
        </>
      }
    >
      <div className="confirm">
        <span className="confirm-icon">
          <Icon name="trash" size={20} />
        </span>
        <p>{body}</p>
      </div>
    </Modal>
  );
}

export function Toasts({ items, onDismiss }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {items.map((toast) => (
        <div key={toast.id} className={`toast is-${toast.tone}`}>
          <span className="toast-icon">
            <Icon name={toast.tone === "error" ? "alert" : "check"} size={16} strokeWidth={2.2} />
          </span>
          <span className="toast-text">{toast.message}</span>
          <button type="button" className="toast-close" onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function PageHead({ title, text, children }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children ? <div className="page-actions">{children}</div> : null}
    </div>
  );
}

export function Sparkline({ values }) {
  const width = 96;
  const height = 40;
  const max = Math.max(1, ...values);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const points = values.map((value, index) => [index * step, height - 4 - (value / max) * (height - 10)]);
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon className="spark-area" points={`0,${height} ${line} ${width},${height}`} />
      <polyline className="spark-line" points={line} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function StatCard({ tone, icon, label, value, note, trend, spark }) {
  return (
    <article className={`stat tone-${tone}${spark ? " has-spark" : ""}`}>
      <span className="stat-icon">
        <Icon name={icon} size={20} />
      </span>
      <div className="stat-copy">
        <p>{label}</p>
        <strong>{value}</strong>
        {note ? (
          <small className={trend ? `trend is-${trend}` : undefined}>
            {trend === "up" ? <Icon name="arrowUp" size={12} strokeWidth={2.4} /> : null}
            {trend === "down" ? <Icon name="arrowDown" size={12} strokeWidth={2.4} /> : null}
            {note}
          </small>
        ) : null}
      </div>
      {spark ? <Sparkline values={spark} /> : null}
    </article>
  );
}

export function Switch({ checked, onChange, label, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch${checked ? " is-on" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onChange(!checked);
      }}
      disabled={disabled}
    >
      <span />
    </button>
  );
}

export function Avatar({ name, size }) {
  return <span className={`avatar tone-${toneFor(name)}${size ? ` avatar-${size}` : ""}`}>{initials(name)}</span>;
}

export function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <small className="field-hint">{hint}</small> : null}
    </label>
  );
}

export function EmptyState({ icon = "inbox", title, text, action }) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <Icon name={icon} size={22} />
      </span>
      <h3>{title}</h3>
      {text ? <p>{text}</p> : null}
      {action || null}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="empty">
      <span className="empty-icon is-error">
        <Icon name="alert" size={22} />
      </span>
      <h3>Could not load this data</h3>
      <p>{message}</p>
      <button type="button" className="btn" onClick={onRetry}>
        <Icon name="refresh" size={16} />
        Try again
      </button>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="skeleton-list" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div className="skeleton-item" key={index}>
          <span className="sk sk-circle" />
          <span className="sk sk-line" />
          <span className="sk sk-line is-short" />
        </div>
      ))}
    </div>
  );
}

export function Pagination({ page, pageCount, total, pageSize, onChange }) {
  if (total <= pageSize) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  return (
    <div className="pager">
      <span>
        Showing {from}–{to} of {total}
      </span>
      <div className="pager-controls">
        <button type="button" className="icon-btn is-bordered" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <Icon name="chevronLeft" size={16} />
        </button>
        <span className="pager-page">
          {page} / {pageCount}
        </span>
        <button type="button" className="icon-btn is-bordered" onClick={() => onChange(page + 1)} disabled={page >= pageCount} aria-label="Next page">
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}
