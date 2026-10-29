const DAY = 24 * 60 * 60 * 1000;

export function formatDate(value, withTime = true) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(
    "en-IN",
    withTime
      ? { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
      : { day: "2-digit", month: "short", year: "numeric" }
  );
}

export function timeAgo(value) {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "—";
  const seconds = Math.max(0, Math.round((Date.now() - time) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(value, false);
}

export function withinDays(value, days) {
  const time = new Date(value).getTime();
  return !Number.isNaN(time) && Date.now() - time <= days * DAY;
}

function dayKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function dailyCounts(rows, days) {
  const counts = new Map();
  for (const row of rows) {
    const date = new Date(row.createdAt);
    if (Number.isNaN(date.getTime())) continue;
    const key = dayKey(date);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    out.push({
      label: date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      value: counts.get(dayKey(date)) || 0,
    });
  }
  return out;
}

export function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

const TONES = ["orange", "blue", "green", "purple", "rose", "amber"];

export function toneFor(text = "") {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return TONES[hash % TONES.length];
}

export function safeHref(link) {
  const value = String(link || "").trim();
  if (!value) return null;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function shortUrl(link) {
  const href = safeHref(link);
  if (!href) return link || "";
  const url = new URL(href);
  const path = url.pathname.replace(/\/$/, "");
  return `${url.hostname.replace(/^www\./, "")}${path}`;
}

export function downloadCsv(filename, rows) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const text = String(cell ?? "");
          const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
          return `"${safe.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\r\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
