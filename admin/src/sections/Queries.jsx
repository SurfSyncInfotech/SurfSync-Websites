import { useMemo, useState } from "react";
import { api, downloadResume } from "../api";
import { Donut, LineChart } from "../charts";
import Icon from "../icons";
import { Avatar, EmptyState, ErrorState, Modal, PageHead, Pagination, StatCard, TableSkeleton } from "../ui";
import { dailyCounts, downloadCsv, formatDate, safeHref, shortUrl, timeAgo, withinDays } from "../utils";

const PAGE_SIZE = 10;

export default function Queries({ applications, search, notify, ask, onUnauthorized }) {
  const rows = applications.rows;
  const [role, setRole] = useState("all");
  const [range, setRange] = useState("all");
  const [chartDays, setChartDays] = useState(7);
  const [selectedId, setSelectedId] = useState(null);
  const [pager, setPager] = useState({ key: "", page: 1 });
  const [refreshing, setRefreshing] = useState(false);
  const needle = search.trim().toLowerCase();

  const roles = useMemo(() => Array.from(new Set(rows.map((row) => row.jobTitle))).sort(), [rows]);

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        if (role !== "all" && row.jobTitle !== role) return false;
        if (range !== "all" && !withinDays(row.createdAt, Number(range))) return false;
        if (!needle) return true;
        return [row.name, row.email, row.jobTitle, row.link, row.why].join(" ").toLowerCase().includes(needle);
      }),
    [rows, role, range, needle]
  );

  const pageKey = `${needle}|${role}|${range}`;
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
    return {
      week,
      note,
      trend,
      spark: dailyCounts(rows, 7).map((item) => item.value),
      withResume: rows.filter((row) => row.hasResume).length,
      roles: new Set(rows.map((row) => row.jobTitle)).size,
    };
  }, [rows]);

  const chartData = useMemo(() => dailyCounts(rows, chartDays), [rows, chartDays]);

  const byRole = useMemo(() => {
    const counts = new Map();
    for (const row of rows) counts.set(row.jobTitle, (counts.get(row.jobTitle) || 0) + 1);
    const sorted = Array.from(counts, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
    if (sorted.length <= 5) return sorted;
    const rest = sorted.slice(4).reduce((sum, item) => sum + item.value, 0);
    return [...sorted.slice(0, 4), { label: "Other roles", value: rest }];
  }, [rows]);

  const selected = selectedId ? rows.find((row) => row.id === selectedId) : null;

  const fail = (error) => (error.status === 401 ? onUnauthorized() : notify(error.message, "error"));

  const refresh = async () => {
    setRefreshing(true);
    await applications.load();
    setRefreshing(false);
  };

  const resume = async (row) => {
    try {
      await downloadResume(row.id, row.resumeName);
    } catch (error) {
      fail(error);
    }
  };

  const remove = (row) =>
    ask({
      title: "Delete this application?",
      body: `The application from ${row.name} and the attached resume will be permanently deleted.`,
      confirmLabel: "Delete application",
      action: async () => {
        await api(`/api/admin/applications/${row.id}`, { method: "DELETE" });
        setSelectedId(null);
        await applications.load();
        notify("Application deleted.");
      },
    });

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`surfsync-applications-${stamp}.csv`, [
      ["Submitted", "Role", "Name", "Email", "Portfolio / LinkedIn", "Why SurfSync?", "Resume"],
      ...filtered.map((row) => [formatDate(row.createdAt), row.jobTitle, row.name, row.email, row.link, row.why, row.resumeName || ""]),
    ]);
    notify(`Exported ${filtered.length} ${filtered.length === 1 ? "application" : "applications"}.`);
  };

  const loading = applications.loading;

  return (
    <>
      <PageHead title="Job Applications" text="Candidate applications and resumes submitted from the Careers page.">
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
        <StatCard tone="rose" icon="users" label="Total applications" value={loading ? "—" : rows.length} note="All time" spark={loading ? null : stats.spark} />
        <StatCard tone="amber" icon="clock" label="Last 7 days" value={loading ? "—" : stats.week} note={stats.note} trend={stats.trend} />
        <StatCard tone="green" icon="file" label="With a resume" value={loading ? "—" : stats.withResume} note={rows.length ? `${Math.round((stats.withResume / rows.length) * 100)}% of applicants` : "No applications yet"} />
        <StatCard tone="purple" icon="briefcase" label="Roles applied for" value={loading ? "—" : stats.roles} note="Distinct roles" />
      </div>

      <div className="chart-grid">
        <section className="card">
          <div className="card-head">
            <h2>Applications overview</h2>
            <select className="select-sm" value={chartDays} onChange={(event) => setChartDays(Number(event.target.value))} aria-label="Chart range">
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
            <h2>Applications by role</h2>
          </div>
          <div className="chart-body">
            {rows.length ? <Donut items={byRole} /> : <p className="chart-empty">Role breakdown appears after the first application.</p>}
          </div>
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>All applications</h2>
          <div className="card-tools">
            <select className="select-sm" value={role} onChange={(event) => setRole(event.target.value)} aria-label="Filter by role">
              <option value="all">All roles</option>
              {roles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <select className="select-sm" value={range} onChange={(event) => setRange(event.target.value)} aria-label="Filter by date">
              <option value="all">All time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : applications.error ? (
          <ErrorState message={applications.error} onRetry={applications.retry} />
        ) : rows.length === 0 ? (
          <EmptyState icon="inbox" title="No applications yet" text="Applications from the Careers page will show up here automatically." />
        ) : filtered.length === 0 ? (
          <EmptyState icon="search" title="No applications match" text="Try a different search, role, or date range." />
        ) : (
          <>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Role</th>
                    <th>Portfolio / LinkedIn</th>
                    <th>Resume</th>
                    <th>Submitted</th>
                    <th className="cell-actions">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => {
                    const href = safeHref(row.link);
                    return (
                      <tr key={row.id} className="is-clickable" onClick={() => setSelectedId(row.id)}>
                        <td className="cell-main" data-label="Applicant">
                          <div className="entity">
                            <Avatar name={row.name} />
                            <div>
                              <strong>{row.name}</strong>
                              <small>{row.email}</small>
                            </div>
                          </div>
                        </td>
                        <td data-label="Role">
                          <span className="badge badge-orange">{row.jobTitle}</span>
                        </td>
                        <td data-label="Portfolio">
                          {href ? (
                            <a className="table-link" href={href} target="_blank" rel="noreferrer noopener" onClick={(event) => event.stopPropagation()}>
                              <Icon name="link" size={14} />
                              <span>{shortUrl(row.link)}</span>
                            </a>
                          ) : (
                            <span className="muted">{row.link || "—"}</span>
                          )}
                        </td>
                        <td data-label="Resume">
                          {row.hasResume ? (
                            <button
                              type="button"
                              className="file-chip"
                              onClick={(event) => {
                                event.stopPropagation();
                                resume(row);
                              }}
                              title={row.resumeName}
                            >
                              <Icon name="file" size={14} />
                              PDF
                            </button>
                          ) : (
                            <span className="muted">—</span>
                          )}
                        </td>
                        <td data-label="Submitted">
                          <span title={formatDate(row.createdAt)}>{timeAgo(row.createdAt)}</span>
                        </td>
                        <td className="cell-actions">
                          <button
                            type="button"
                            className="icon-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedId(row.id);
                            }}
                            aria-label={`View application from ${row.name}`}
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
                            aria-label={`Delete application from ${row.name}`}
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

      {selected ? <ApplicationDrawer row={selected} onClose={() => setSelectedId(null)} onDelete={remove} onResume={resume} /> : null}
    </>
  );
}

function ApplicationDrawer({ row, onClose, onDelete, onResume }) {
  const href = safeHref(row.link);
  return (
    <Modal
      variant="drawer"
      eyebrow="Application"
      title={row.name}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-danger-soft" onClick={() => onDelete(row)}>
            <Icon name="trash" size={16} />
            Delete
          </button>
          <span className="spacer" />
          <a className="btn" href={`mailto:${row.email}`}>
            <Icon name="mail" size={16} />
            Email
          </a>
          {row.hasResume ? (
            <button type="button" className="btn btn-primary" onClick={() => onResume(row)}>
              <Icon name="download" size={16} strokeWidth={2.2} />
              Resume
            </button>
          ) : null}
        </>
      }
    >
      <div className="detail-hero">
        <Avatar name={row.name} size="lg" />
        <div>
          <strong>{row.name}</strong>
          <span className="badge badge-orange">{row.jobTitle}</span>
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
          <dt>Portfolio / LinkedIn</dt>
          <dd>
            {href ? (
              <a href={href} target="_blank" rel="noreferrer noopener">
                {row.link}
              </a>
            ) : (
              row.link || "Not provided"
            )}
          </dd>
        </div>
        <div>
          <dt>Submitted</dt>
          <dd>
            {formatDate(row.createdAt)} · {timeAgo(row.createdAt)}
          </dd>
        </div>
        <div>
          <dt>Resume</dt>
          <dd>{row.hasResume ? row.resumeName || "resume.pdf" : "Not attached"}</dd>
        </div>
      </dl>
      <div className="detail-block">
        <h3>Why SurfSync?</h3>
        <p>{row.why || "No answer provided."}</p>
      </div>
    </Modal>
  );
}
