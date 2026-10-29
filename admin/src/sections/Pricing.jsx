import { useMemo, useState } from "react";
import { FiGlobe, FiMapPin } from "react-icons/fi";
import { api } from "../api";
import Icon from "../icons";
import { EmptyState, ErrorState, Field, Modal, PageHead, StatCard, TableSkeleton } from "../ui";

export const SERVICES = [
  { slug: "mobile-apps", name: "Mobile App Development", badge: "2. MOBILE APPLICATION DEVELOPMENT", siteHash: "#mobile-apps" },
  { slug: "web-development", name: "Web App Development", badge: "1. WEB APPLICATION DEVELOPMENT", siteHash: "#web-development" },
  { slug: "ecommerce-cms", name: "E-Commerce & CMS", badge: "3. E-COMMERCE & CMS DEVELOPMENT", siteHash: "#ecommerce-cms" },
  { slug: "ai-automation", name: "AI & Automation", badge: "4. AI & AUTOMATION SOLUTIONS", siteHash: "#ai-automation" },
  { slug: "cloud-devops", name: "Cloud & DevOps", badge: "5. CLOUD & DEVOPS INFRASTRUCTURE", siteHash: "#cloud-devops" },
  { slug: "enterprise-it", name: "Enterprise IT Solutions", badge: "6. ENTERPRISE IT SOLUTIONS", siteHash: "#enterprise-it" },
];

export default function Pricing({ packages, search, notify, ask, onUnauthorized }) {
  const [selectedRegion, setSelectedRegion] = useState("domestic"); // "domestic" | "international"
  const [selectedService, setSelectedService] = useState("mobile-apps");
  const [draft, setDraft] = useState(null);
  const [moving, setMoving] = useState(false);

  const allRows = packages.rows || [];
  const needle = (search || "").trim().toLowerCase();

  // 1. Filter rows by active region first (India / Domestic or Global / International)
  const regionRows = useMemo(
    () => allRows.filter((p) => (p.region || "domestic") === selectedRegion),
    [allRows, selectedRegion]
  );

  const serviceObj = useMemo(
    () => SERVICES.find((s) => s.slug === selectedService) || SERVICES[0],
    [selectedService]
  );

  // 2. Filter by selected service within that region
  const serviceRows = useMemo(
    () => regionRows.filter((p) => p.serviceSlug === selectedService),
    [regionRows, selectedService]
  );

  // 3. Then filter by search query if present
  const visible = useMemo(() => {
    if (!needle) return serviceRows;
    return serviceRows.filter((p) =>
      `${p.packageName} ${p.platform} ${p.whatsIncluded} ${p.price}`.toLowerCase().includes(needle)
    );
  }, [serviceRows, needle]);

  const fail = (error) => (error.status === 401 ? onUnauthorized() : notify(error.message, "error"));

  const move = async (index, direction) => {
    const target = index + direction;
    if (moving || target < 0 || target >= serviceRows.length) return;
    setMoving(true);
    const order = serviceRows.slice();
    [order[index], order[target]] = [order[target], order[index]];
    try {
      await Promise.all(
        order.map((pkg, position) =>
          pkg.sortOrder === position + 1
            ? null
            : api(`/api/admin/packages/${pkg.id}`, {
                method: "PUT",
                body: {
                  serviceSlug: pkg.serviceSlug,
                  packageName: pkg.packageName,
                  platform: pkg.platform,
                  whatsIncluded: pkg.whatsIncluded,
                  price: pkg.price,
                  isPopular: pkg.isPopular,
                  region: pkg.region || selectedRegion,
                  sortOrder: position + 1,
                },
              })
        )
      );
      await packages.load();
    } catch (error) {
      fail(error);
    } finally {
      setMoving(false);
    }
  };

  const togglePopular = async (pkg) => {
    try {
      const nextVal = !pkg.isPopular;
      await api(`/api/admin/packages/${pkg.id}/popular`, {
        method: "PATCH",
        body: { isPopular: nextVal },
      });
      await packages.load();
      notify(nextVal ? `“${pkg.packageName}” marked as Most Popular.` : `“${pkg.packageName}” unmarked as Most Popular.`);
    } catch (error) {
      fail(error);
    }
  };

  const remove = (pkg) =>
    ask({
      title: "Delete this pricing package?",
      body: `“${pkg.packageName}” (${pkg.platform}) will be removed from ${serviceObj.name}.`,
      confirmLabel: "Delete Package",
      action: async () => {
        await api(`/api/admin/packages/${pkg.id}`, { method: "DELETE" });
        await packages.load();
        notify("Package deleted.");
      },
    });

  const create = () =>
    setDraft({
      region: selectedRegion,
      serviceSlug: selectedService,
      packageName: "",
      platform: "Android + iOS",
      whatsIncluded: "",
      price: selectedRegion === "domestic" ? "Rs. " : "$",
      isPopular: false,
      sortOrder: serviceRows.reduce((max, p) => Math.max(max, p.sortOrder || 0), 0) + 1,
    });

  const saved = async (message) => {
    setDraft(null);
    notify(message);
    await packages.load();
  };

  return (
    <>
      <PageHead
        title="Service Pricing"
        text="Manage packages, platforms, features, and pricing for each service."
      >
        <button type="button" className="btn btn-primary" onClick={create}>
          <Icon name="plus" size={16} strokeWidth={2.2} />
          Add Package
        </button>
      </PageHead>

      <div className="stats is-three">
        <StatCard
          tone="orange"
          icon="layers"
          label={`${serviceObj.name} Packages`}
          value={packages.loading ? "—" : serviceRows.length}
          note="Active packages on this service"
        />
        <StatCard
          tone="green"
          icon="check"
          label="Total All Services"
          value={packages.loading ? "—" : allRows.length}
          note="Packages across 6 services"
        />
        <StatCard
          tone="purple"
          icon="external"
          label="Current Service"
          value={serviceObj.name}
          note="Live on service detail page"
        />
      </div>

      {/* Market / Region Switcher */}
      <section className="card" style={{ marginBottom: 18, background: "#f8fafc" }}>
        <div style={{ padding: "14px 18px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div>
            <strong style={{ fontSize: 14, color: "var(--text)", display: "block" }}>
              Target Market & Currency
            </strong>
            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
              Switch between Domestic (India / INR) and International (Global / USD) packages:
            </span>
          </div>

          <div style={{ display: "inline-flex", gap: 8, background: "#e2e8f0", padding: 4, borderRadius: 10 }}>
            <button
              type="button"
              className={`btn ${selectedRegion === "domestic" ? "btn-primary" : "btn-subtle"}`}
              style={{
                fontSize: 13,
                fontWeight: selectedRegion === "domestic" ? 700 : 500,
                padding: "6px 16px",
                borderRadius: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => setSelectedRegion("domestic")}
            >
              <FiMapPin size={14} />
              India / Domestic (Rs.)
              <span
                style={{
                  fontSize: 11,
                  padding: "1px 6px",
                  borderRadius: 999,
                  background: selectedRegion === "domestic" ? "rgba(255,255,255,0.25)" : "#cbd5e1",
                  color: selectedRegion === "domestic" ? "#fff" : "inherit",
                }}
              >
                {allRows.filter((r) => (r.region || "domestic") === "domestic").length}
              </span>
            </button>

            <button
              type="button"
              className={`btn ${selectedRegion === "international" ? "btn-primary" : "btn-subtle"}`}
              style={{
                fontSize: 13,
                fontWeight: selectedRegion === "international" ? 700 : 500,
                padding: "6px 16px",
                borderRadius: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onClick={() => setSelectedRegion("international")}
            >
              <FiGlobe size={14} />
              Global / International ($)
              <span
                style={{
                  fontSize: 11,
                  padding: "1px 6px",
                  borderRadius: 999,
                  background: selectedRegion === "international" ? "rgba(255,255,255,0.25)" : "#cbd5e1",
                  color: selectedRegion === "international" ? "#fff" : "inherit",
                }}
              >
                {allRows.filter((r) => r.region === "international").length}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginBottom: 24 }}>
        <div className="card-head" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2>Select Service</h2>
            <span className="card-note">Choose which service page's pricing packages you want to view and manage:</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SERVICES.map((s) => {
              const count = regionRows.filter((r) => r.serviceSlug === s.slug).length;
              const isSelected = s.slug === selectedService;
              return (
                <button
                  key={s.slug}
                  type="button"
                  className={`btn ${isSelected ? "btn-primary" : "btn-subtle"}`}
                  style={{
                    fontSize: 13,
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontWeight: isSelected ? 700 : 500,
                  }}
                  onClick={() => setSelectedService(s.slug)}
                >
                  {s.name}
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: 11,
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: isSelected ? "rgba(255,255,255,0.25)" : "var(--border, #e5e7eb)",
                      color: isSelected ? "#fff" : "inherit",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <h2>
              {serviceObj.name} — Packages
            </h2>
            <span className="card-note">
              {needle ? "Clear search to reorder packages." : "Use arrows to change display order."}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#f68713",
                background: "#fff7ee",
                padding: "4px 10px",
                borderRadius: 999,
                border: "1px solid #fed7aa",
              }}
            >
              Section: App Packages
            </span>
          </div>
        </div>

        {packages.loading ? (
          <TableSkeleton rows={4} />
        ) : packages.error ? (
          <ErrorState message={packages.error} onRetry={packages.retry} />
        ) : visible.length === 0 ? (
          <EmptyState
            icon="layers"
            title={needle ? "No packages match your search" : `No packages added for ${serviceObj.name}`}
            text={needle ? "Try searching for a different keyword." : "Click below to add the first package."}
            action={
              needle ? null : (
                <button type="button" className="btn btn-primary" onClick={create}>
                  <Icon name="plus" size={16} strokeWidth={2.2} />
                  Add First Package
                </button>
              )
            }
          />
        ) : (
          <div className="table-wrap" style={{ border: "1px solid #bcdbe7", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: "#1b3848", color: "#ffffff" }}>
                  <th style={{ width: 44, padding: "12px 10px", textAlign: "center", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>#</th>
                  <th style={{ width: 170, padding: "12px 16px", textAlign: "left", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>Package</th>
                  <th style={{ width: 190, padding: "12px 16px", textAlign: "left", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>Platform</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>What's Included</th>
                  <th style={{ width: 180, padding: "12px 16px", textAlign: "left", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>
                    Price ({selectedRegion === "international" ? "USD - $" : "INR - Rs."})
                  </th>
                  <th style={{ width: 85, padding: "12px 10px", textAlign: "center", border: "1px solid #162f3d", color: "#ffffff", fontWeight: 700, fontSize: 13 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((pkg, index) => {
                  const isEven = index % 2 === 1;
                  return (
                    <tr
                      key={pkg.id}
                      style={{
                        background: isEven ? "#f4f9fc" : "#ffffff",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <td style={{ textAlign: "center", verticalAlign: "middle", padding: "12px 8px", border: "1px solid #d1e5ef" }}>
                        {!needle ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <button
                              type="button"
                              className="icon-btn is-bordered"
                              style={{ width: 20, height: 20, padding: 0 }}
                              onClick={() => move(index, -1)}
                              disabled={index === 0 || moving}
                              title="Move Up"
                            >
                              <Icon name="arrowUp" size={11} />
                            </button>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>
                              {index + 1}
                            </span>
                            <button
                              type="button"
                              className="icon-btn is-bordered"
                              style={{ width: 20, height: 20, padding: 0 }}
                              onClick={() => move(index, 1)}
                              disabled={index === visible.length - 1 || moving}
                              title="Move Down"
                            >
                              <Icon name="arrowDown" size={11} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{index + 1}</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", verticalAlign: "top", border: "1px solid #d1e5ef" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <strong style={{ fontSize: 14, color: "#0f172a", fontWeight: 700 }}>
                            {pkg.packageName}
                          </strong>
                          {pkg.isPopular && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#ea580c",
                                background: "#fff7ed",
                                border: "1px solid #fed7aa",
                                padding: "1px 7px",
                                borderRadius: 4,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              ★ Most Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", verticalAlign: "top", border: "1px solid #d1e5ef", color: "#1e293b", fontSize: 13.5, lineHeight: 1.45 }}>
                        {pkg.platform}
                      </td>
                      <td style={{ padding: "14px 16px", verticalAlign: "top", border: "1px solid #d1e5ef" }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                          {pkg.whatsIncluded}
                        </p>
                      </td>
                      <td style={{ padding: "14px 16px", verticalAlign: "top", border: "1px solid #d1e5ef" }}>
                        <strong style={{ fontSize: 14, color: "#ea580c", fontWeight: 700, whiteSpace: "nowrap", display: "block" }}>
                          {pkg.price}
                        </strong>
                      </td>
                      <td style={{ padding: "14px 8px", verticalAlign: "top", textAlign: "center", border: "1px solid #d1e5ef" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
                          <button
                            type="button"
                            className="icon-btn"
                            style={{ width: 28, height: 28, color: pkg.isPopular ? "#ea580c" : "#94a3b8" }}
                            onClick={() => togglePopular(pkg)}
                            title={pkg.isPopular ? "Marked as Most Popular (Click to unmark)" : "Click to mark as Most Popular plan"}
                            aria-label="Toggle Most Popular"
                          >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill={pkg.isPopular ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="icon-btn"
                            style={{ width: 28, height: 28 }}
                            onClick={() => setDraft(pkg)}
                            title="Edit Package"
                            aria-label="Edit"
                          >
                            <Icon name="pencil" size={15} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn"
                            style={{ width: 28, height: 28, color: "#ef4444" }}
                            onClick={() => remove(pkg)}
                            title="Delete Package"
                            aria-label="Delete"
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {draft ? (
        <PackageModal
          draft={draft}
          onClose={() => setDraft(null)}
          onSaved={saved}
          onUnauthorized={onUnauthorized}
        />
      ) : null}
    </>
  );
}

function PackageModal({ draft, onClose, onSaved, onUnauthorized }) {
  const isNew = !draft.id;
  const [region, setRegion] = useState(draft.region || "domestic");
  const [serviceSlug, setServiceSlug] = useState(draft.serviceSlug || "mobile-apps");
  const [packageName, setPackageName] = useState(draft.packageName || "");
  const [platform, setPlatform] = useState(draft.platform || "Android + iOS");
  const [whatsIncluded, setWhatsIncluded] = useState(draft.whatsIncluded || "");
  const [price, setPrice] = useState(draft.price || "");
  const [sortOrder, setSortOrder] = useState(draft.sortOrder || 1);
  const [isPopular, setIsPopular] = useState(Boolean(draft.isPopular));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setError("");
    setBusy(true);

    const payload = {
      region,
      serviceSlug,
      packageName: packageName.trim(),
      platform: platform.trim(),
      whatsIncluded: whatsIncluded.trim(),
      price: price.trim(),
      sortOrder: Number(sortOrder) || 1,
      isPopular,
    };

    try {
      if (isNew) {
        await api("/api/admin/packages", {
          method: "POST",
          body: payload,
        });
        await onSaved("New pricing package added.");
      } else {
        await api(`/api/admin/packages/${draft.id}`, {
          method: "PUT",
          body: payload,
        });
        await onSaved("Pricing package updated.");
      }
    } catch (err) {
      setBusy(false);
      if (err.status === 401) onUnauthorized();
      else setError(err.message);
    }
  };

  return (
    <Modal
      title={isNew ? "Add Pricing Package" : "Edit Pricing Package"}
      eyebrow={SERVICES.find((s) => s.slug === serviceSlug)?.name || "Service Package"}
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? "Saving…" : isNew ? "Create Package" : "Save Changes"}
          </button>
        </>
      }
    >
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {error ? <p className="alert">{error}</p> : null}

        {/* Region / Target Market */}
        <Field label="Target Market / Region" hint="Choose whether this package belongs to the India site (INR) or Global site (USD)">
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: region === "domestic" ? 700 : 500, color: region === "domestic" ? "var(--text)" : "var(--muted)" }}>
              <input
                type="radio"
                name="pkg_region"
                value="domestic"
                checked={region === "domestic"}
                onChange={() => {
                  setRegion("domestic");
                  if (!price || price.startsWith("$")) setPrice("Rs. ");
                }}
                disabled={busy}
              />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FiMapPin size={14} /> India / Domestic (Rs.)
              </span>
            </label>

            <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: region === "international" ? 700 : 500, color: region === "international" ? "var(--text)" : "var(--muted)" }}>
              <input
                type="radio"
                name="pkg_region"
                value="international"
                checked={region === "international"}
                onChange={() => {
                  setRegion("international");
                  if (!price || price.startsWith("Rs.")) setPrice("$");
                }}
                disabled={busy}
              />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FiGlobe size={14} /> Global / International ($)
              </span>
            </label>
          </div>
        </Field>

        <Field label="Service Page">
          <select
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            disabled={busy}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
          >
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Package Name" hint="e.g. Basic Business App, Standard App, Custom / On-Demand App">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Enter package name"
            required
            autoFocus
            disabled={busy}
          />
        </Field>

        <Field label="Platform" hint="e.g. Android, Android + iOS (Flutter / React Native), Web (Next.js)">
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Enter platform details"
            required
            disabled={busy}
          />
        </Field>

        <Field label="What's Included" hint="Describe the features, screens, integrations, or capabilities included in this package">
          <textarea
            value={whatsIncluded}
            onChange={(e) => setWhatsIncluded(e.target.value)}
            placeholder="e.g. Up to 6 screens, company profile, services, enquiry form, push notifications, admin content control"
            rows={4}
            required
            disabled={busy}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", resize: "vertical" }}
          />
        </Field>

        <Field
          label={region === "international" ? "Price (USD - $)" : "Price (INR - Rs.)"}
          hint={region === "international" ? "e.g. $499 – $699 or $1,699 onwards" : "e.g. Rs. 37,999 – 52,249 or Rs. 1,42,499 onwards"}
        >
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={region === "international" ? "e.g. $499 – $699" : "e.g. Rs. 37,999 – 52,249"}
            required
            disabled={busy}
          />
        </Field>

        <Field label="Display Order (Sort Order)" hint="Smaller numbers appear first (e.g. 1, 2, 3...)">
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            min="1"
            disabled={busy}
          />
        </Field>

        <div style={{ marginTop: 4, padding: "12px 14px", background: "#fff7ee", borderRadius: 8, border: "1px solid #fed7aa" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 600, color: "#9a3412", fontSize: 14 }}>
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              disabled={busy}
              style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#f68713" }}
            />
            <span>Mark as &ldquo;Most Popular&rdquo; Plan</span>
          </label>
          <span style={{ display: "block", fontSize: 12, color: "#b45309", marginTop: 4, marginLeft: 28 }}>
            Highlights this card on the website with the orange gradient casing, crown icon, and solid button.
          </span>
        </div>
      </form>
    </Modal>
  );
}
