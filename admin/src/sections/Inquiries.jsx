import { useMemo, useState } from "react";
import { api } from "../api";
import { Donut, LineChart } from "../charts";
import Icon from "../icons";
import { Avatar, EmptyState, ErrorState, Modal, PageHead, Pagination, StatCard, TableSkeleton } from "../ui";
import { dailyCounts, downloadCsv, formatDate, timeAgo, withinDays } from "../utils";

const PAGE_SIZE = 10;

function getWhatsAppUrl(row) {
  const cleanPhone = (row.phone || "").replace(/[^\d]/g, "");
  const waCode = (row.code || "+91").replace(/[^\d]/g, "");
  const waNumber = cleanPhone.startsWith(waCode) ? cleanPhone : `${waCode}${cleanPhone}`;
  const defaultMsg = `Hello ${row.name}, thank you for reaching out to SurfSync Infotech regarding your ${row.service || "project"} inquiry. How can we help you today?`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMsg)}`;
}

export default function Inquiries({ inquiries, search, notify, ask, onUnauthorized }) {
  const rows = inquiries.rows;
  const [service, setService] = useState("all");
  const [range, setRange] = useState("all");
  const [chartDays, setChartDays] = useState(7);
  const [selectedId, setSelectedId] = useState(null);
  const [pager, setPager] = useState({ key: "", page: 1 });
  const [refreshing, setRefreshing] = useState(false);
  const needle = search.trim().toLowerCase();

  const services = useMemo(() => Array.from(new Set(rows.map((row) => row.service).filter(Boolean))).sort(), [rows]);

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        if (service !== "all" && row.service !== service) return false;
        if (range !== "all" && !withinDays(row.createdAt, Number(range))) return false;
        if (!needle) return true;
        return [row.name, row.email, row.phone, row.code, row.service, row.message]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      }),
    [rows, service, range, needle]
  );

  const pageKey = `${needle}|${service}|${range}`;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pager.key === pageKey ? pager.page : 1, pageCount);
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const week = rows.filter((row) => withinDays(row.createdAt, 7)).length;
    const lastWeek = rows.filter((row) => withinDays(row.createdAt, 14) && !withinDays(row.createdAt, 7)).length;
    let note = "Same as last week";
    let trend;
    if (week !== lastWeek) {
      if (!lastWeek) {
        note = "New this week";
        trend = "up";
      } else {
        const change = Math.round(((week - lastWeek) / lastWeek) * 100);
        note = `${Math.abs(change)}% vs last week`;
        trend = change > 0 ? "up" : "down";
      }
    }

    // Top requested service
    const counts = new Map();
    for (const row of rows) {
      if (row.service) counts.set(row.service, (counts.get(row.service) || 0) + 1);
    }
    let topService = "None yet";
    let topCount = 0;
    for (const [srv, count] of counts.entries()) {
      if (count > topCount) {
        topCount = count;
        topService = srv;
      }
    }

    return {
      week,
      note,
      trend,
      spark: dailyCounts(rows, 7).map((item) => item.value),
      topService,
      topCount,
      uniqueServices: counts.size,
    };
  }, [rows]);

  const chartData = useMemo(() => dailyCounts(rows, chartDays), [rows, chartDays]);

  const byService = useMemo(() => {
    const counts = new Map();
    for (const row of rows) {
      const key = row.service || "Unspecified";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const sorted = Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
    if (sorted.length <= 5) return sorted;
    const rest = sorted.slice(4).reduce((sum, item) => sum + item.value, 0);
    return [...sorted.slice(0, 4), { label: "Other services", value: rest }];
  }, [rows]);

  const selected = selectedId ? rows.find((row) => row.id === selectedId) : null;

  const refresh = async () => {
    setRefreshing(true);
    await inquiries.load();
    setRefreshing(false);
  };

  const remove = (row) =>
    ask({
      title: "Delete this inquiry?",
      body: `The project inquiry from ${row.name} (${row.email}) will be permanently deleted.`,
      confirmLabel: "Delete inquiry",
      action: async () => {
        await api(`/api/admin/inquiries/${row.id}`, { method: "DELETE" });
        setSelectedId(null);
        await inquiries.load();
        notify("Inquiry deleted.");
      },
    });

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`surfsync-inquiries-${stamp}.csv`, [
      ["Submitted", "Client Name", "Email", "Country Code", "Phone", "Service Requested", "Project Requirements"],
      ...filtered.map((row) => [
        formatDate(row.createdAt),
        row.name,
        row.email,
        row.code,
        row.phone,
        row.service,
        row.message,
      ]),
    ]);
    notify(`Exported ${filtered.length} ${filtered.length === 1 ? "inquiry" : "inquiries"}.`);
  };

  const loading = inquiries.loading;

  return (
    <>
      <PageHead title="Project Inquiries" text="Client inquiries and requirements submitted from the Contact Us form.">
        <button type="button" className="btn" onClick={refresh} disabled={refreshing}>
          <Icon name="refresh" size={16} className={refreshing ? "is-spinning" : undefined} />
          Refresh
        </button>
        <button type="button" className="btn btn-primary" onClick={exportCsv} disabled={!filtered.length}>
          <Icon name="download" size={16} strokeWidth={2.2} />
          Export CSV
        </button>
      </PageHead>

      <div className="stats">
        <StatCard
          tone="orange"
          icon="inbox"
          label="Total inquiries"
          value={loading ? "—" : rows.length}
          note="All time leads"
          spark={loading ? null : stats.spark}
        />
        <StatCard
          tone="amber"
          icon="clock"
          label="Last 7 days"
          value={loading ? "—" : stats.week}
          note={stats.note}
          trend={stats.trend}
        />
        <StatCard
          tone="green"
          icon="chart"
          label="Top service"
          value={loading ? "—" : stats.topService}
          note={stats.topCount ? `${stats.topCount} requests` : "No requests yet"}
        />
        <StatCard
          tone="purple"
          icon="layers"
          label="Services requested"
          value={loading ? "—" : stats.uniqueServices}
          note="Distinct service types"
        />
      </div>

      <div className="chart-grid">
        <section className="card">
          <div className="card-head">
            <h2>Inquiries overview</h2>
            <select
              className="select-sm"
              value={chartDays}
              onChange={(event) => setChartDays(Number(event.target.value))}
              aria-label="Chart range"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
          <div className="chart-body">
            <LineChart data={chartData} />
          </div>
        </section>
        <section className="card">
          <div className="card-head">
            <h2>Breakdown by service</h2>
          </div>
          <div className="chart-body">
            {rows.length ? (
              <Donut items={byService} />
            ) : (
              <p className="chart-empty">Service breakdown will appear once inquiries are received.</p>
            )}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>All client inquiries</h2>
          <div className="card-tools">
            <select
              className="select-sm"
              value={service}
              onChange={(event) => setService(event.target.value)}
              aria-label="Filter by service"
            >
              <option value="all">All services</option>
              {services.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="select-sm"
              value={range}
              onChange={(event) => setRange(event.target.value)}
              aria-label="Filter by date"
            >
              <option value="all">All time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : inquiries.error ? (
          <ErrorState message={inquiries.error} onRetry={inquiries.retry} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="mail"
            title="No inquiries yet"
            text="Client inquiries submitted from the website Contact Us form will appear here."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="search"
            title="No inquiries match"
            text="Try a different search, service, or date filter."
          />
        ) : (
          <>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Project Requirements</th>
                    <th>Received</th>
                    <th className="cell-actions">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => {
                    const cleanPhone = (row.phone || "").replace(/[^\d+]/g, "");
                    const fullPhone = `${row.code || "+91"} ${row.phone}`;
                    const waNumber = cleanPhone.startsWith("+")
                      ? cleanPhone.replace("+", "")
                      : `${(row.code || "91").replace("+", "")}${cleanPhone}`;

                    return (
                      <tr key={row.id} className="is-clickable" onClick={() => setSelectedId(row.id)}>
                        <td className="cell-main" data-label="Client">
                          <div className="entity">
                            <Avatar name={row.name} />
                            <div>
                              <strong>{row.name}</strong>
                              <small>{row.email}</small>
                            </div>
                          </div>
                        </td>
                        <td data-label="Phone">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="table-link"
                            onClick={(e) => e.stopPropagation()}
                            title="Click to call"
                          >
                            <span>{fullPhone}</span>
                          </a>
                        </td>
                        <td data-label="Service">
                          <span className="badge badge-purple">{row.service}</span>
                        </td>
                        <td data-label="Requirements" style={{ maxWidth: "280px" }}>
                          <span
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              color: "var(--text-2)",
                            }}
                            title={row.message}
                          >
                            {row.message}
                          </span>
                        </td>
                        <td data-label="Received">
                          <span title={formatDate(row.createdAt)}>{timeAgo(row.createdAt)}</span>
                        </td>
                        <td className="cell-actions">
                          <a
                            href={getWhatsAppUrl(row)}
                            target="_blank"
                            rel="noreferrer"
                            className="icon-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="Chat on WhatsApp with default greeting message"
                            aria-label="WhatsApp"
                          >
                            <span style={{ fontSize: "14px", fontWeight: "700", color: "#10b981" }}>WA</span>
                          </a>
                          <button
                            type="button"
                            className="icon-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedId(row.id);
                            }}
                            aria-label={`View inquiry from ${row.name}`}
                            title="View"
                          >
                            <Icon name="eye" />
                          </button>
                          <button
                            type="button"
                            className="icon-btn is-danger"
                            onClick={(event) => {
                              event.stopPropagation();
                              remove(row);
                            }}
                            aria-label={`Delete inquiry from ${row.name}`}
                            title="Delete"
                          >
                            <Icon name="trash" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              pageCount={pageCount}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              onChange={(next) => setPager({ key: pageKey, page: next })}
            />
          </>
        )}
      </section>

      {selected ? (
        <InquiryDrawer row={selected} onClose={() => setSelectedId(null)} onDelete={remove} />
      ) : null}
    </>
  );
}

function InquiryDrawer({ row, onClose, onDelete }) {
  const cleanPhone = (row.phone || "").replace(/[^\d+]/g, "");
  const fullPhone = `${row.code || "+91"} ${row.phone}`;
  const waNumber = cleanPhone.startsWith("+")
    ? cleanPhone.replace("+", "")
    : `${(row.code || "91").replace("+", "")}${cleanPhone}`;

  return (
    <Modal
      variant="drawer"
      eyebrow="Project Inquiry"
      title={row.name}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-danger-soft" onClick={() => onDelete(row)}>
            <Icon name="trash" size={16} />
            Delete
          </button>
          <span className="spacer" />
          <a
            className="btn"
            href={getWhatsAppUrl(row)}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#059669", borderColor: "#a7f3d0" }}
          >
            WhatsApp
          </a>
          <a className="btn" href={`tel:${cleanPhone}`}>
            Call
          </a>
          <a className="btn btn-primary" href={`mailto:${row.email}?subject=${encodeURIComponent("Re: Project Inquiry - SurfSync Infotech")}`}>
            <Icon name="mail" size={16} />
            Email
          </a>
        </>
      }
    >
      <div className="detail-hero">
        <Avatar name={row.name} size="lg" />
        <div>
          <strong>{row.name}</strong>
          <span className="badge badge-purple">{row.service}</span>
        </div>
      </div>
      <dl className="detail-list">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${row.email}`}>{row.email}</a>
          </dd>
        </div>
        <div>
          <dt>Phone Number</dt>
          <dd>
            <a href={`tel:${cleanPhone}`}>{fullPhone}</a>
          </dd>
        </div>
        <div>
          <dt>Service Requested</dt>
          <dd>{row.service}</dd>
        </div>
        <div>
          <dt>Received</dt>
          <dd>
            {formatDate(row.createdAt)} · {timeAgo(row.createdAt)}
          </dd>
        </div>
      </dl>
      <div className="detail-block">
        <h3>Project Requirements</h3>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{row.message || "No details provided."}</p>
      </div>
    </Modal>
  );
}
