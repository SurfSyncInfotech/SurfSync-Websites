import { useMemo, useRef, useState } from "react";
import { FiGlobe, FiMapPin, FiLayers } from "react-icons/fi";
import { api, getToken } from "../api";
import Icon from "../icons";
import { EmptyState, ErrorState, Field, Modal, PageHead, StatCard, Switch, TableSkeleton } from "../ui";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

const BLANK_BLOG = {
  title: "",
  slug: "",
  imageUrl: "",
  videoUrl: "",
  shortDescription: "",
  content: "",
  author: "SurfSync Team",
  region: "both",
  isPublished: true,
  sortOrder: 1,
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
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function Blogs({ blogs, search = "", notify, ask, onUnauthorized }) {
  const [selectedRegion, setSelectedRegion] = useState("all"); // "all" | "domestic" | "international"
  const [tab, setTab] = useState("all");
  const [draft, setDraft] = useState(null);
  const [toggling, setToggling] = useState(null);
  const rows = blogs.rows || [];
  const needle = search.trim().toLowerCase();

  // 1. Filter rows by selected target market first
  const regionRows = useMemo(
    () =>
      rows.filter((b) => {
        const blogRegion = b.region || "both";
        if (selectedRegion === "domestic") return blogRegion === "domestic" || blogRegion === "both";
        if (selectedRegion === "international") return blogRegion === "international" || blogRegion === "both";
        return true;
      }),
    [rows, selectedRegion]
  );

  const domesticCount = rows.filter((b) => (b.region || "both") === "domestic" || (b.region || "both") === "both").length;
  const internationalCount = rows.filter((b) => (b.region || "both") === "international" || (b.region || "both") === "both").length;

  const publishedCount = regionRows.filter((b) => b.isPublished).length;
  const draftCount = regionRows.length - publishedCount;
  const videoCount = regionRows.filter((b) => Boolean(b.videoUrl)).length;

  // 2. Filter by status tab & search query
  const visible = useMemo(
    () =>
      regionRows.filter((b) => {
        if (tab === "published" && !b.isPublished) return false;
        if (tab === "drafts" && b.isPublished) return false;
        if (tab === "video" && !b.videoUrl) return false;
        if (!needle) return true;
        return [b.title, b.shortDescription, b.author, b.slug].join(" ").toLowerCase().includes(needle);
      }),
    [regionRows, tab, needle]
  );

  const togglePublished = async (blog) => {
    if (toggling) return;
    setToggling(blog.id);
    const nextVal = !blog.isPublished;
    try {
      await api(`/api/admin/blogs/${blog.id}/publish`, {
        method: "PATCH",
        body: { isPublished: nextVal },
      });
      await blogs.load();
      notify(nextVal ? `“${blog.title}” is now published.` : `“${blog.title}” saved as draft.`);
    } catch (err) {
      if (err.status === 401) onUnauthorized();
      else notify(err.message, "error");
    } finally {
      setToggling(null);
    }
  };

  const remove = (blog) =>
    ask({
      title: "Delete this blog post?",
      body: `“${blog.title}” and any uploaded media files will be permanently deleted.`,
      confirmLabel: "Delete Blog",
      action: async () => {
        await api(`/api/admin/blogs/${blog.id}`, { method: "DELETE" });
        await blogs.load();
        notify("Blog post deleted.");
      },
    });

  const create = () =>
    setDraft({
      ...BLANK_BLOG,
      region: selectedRegion === "all" ? "both" : selectedRegion,
      sortOrder: rows.reduce((max, b) => Math.max(max, b.sortOrder || 0), 0) + 1,
    });

  const saved = async (message) => {
    setDraft(null);
    notify(message);
    await blogs.load();
  };

  return (
    <>
      <PageHead
        title="Blog Articles"
        text="Manage blog publications, featured cover images, videos, and detailed article descriptions."
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Market Switcher */}
          <div style={{ display: "inline-flex", background: "#f1f5f9", padding: 3, borderRadius: 8, gap: 2, border: "1px solid #e2e8f0" }}>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                background: selectedRegion === "all" ? "var(--orange-500, #ea580c)" : "transparent",
                color: selectedRegion === "all" ? "#fff" : "var(--text-2, #334155)",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedRegion("all")}
            >
              <FiLayers size={14} /> All ({rows.length})
            </button>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                background: selectedRegion === "domestic" ? "var(--orange-500, #ea580c)" : "transparent",
                color: selectedRegion === "domestic" ? "#fff" : "var(--text-2, #334155)",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedRegion("domestic")}
            >
              <FiMapPin size={14} /> India ({domesticCount})
            </button>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                background: selectedRegion === "international" ? "var(--orange-500, #ea580c)" : "transparent",
                color: selectedRegion === "international" ? "#fff" : "var(--text-2, #334155)",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedRegion("international")}
            >
              <FiGlobe size={14} /> Global ({internationalCount})
            </button>
          </div>

          <button type="button" className="btn btn-primary" onClick={create}>
            <Icon name="plus" size={16} strokeWidth={2.2} />
            Add Blog Post
          </button>
        </div>
      </PageHead>

      <div className="stats is-three">
        <StatCard
          tone="orange"
          icon="newspaper"
          label="Total Articles"
          value={blogs.loading ? "—" : regionRows.length}
          note={`${publishedCount} published, ${draftCount} drafts`}
        />
        <StatCard
          tone="green"
          icon="check"
          label="Live on Website"
          value={blogs.loading ? "—" : publishedCount}
          note="Active blogs visible to visitors"
        />
        <StatCard
          tone="purple"
          icon="video"
          label="Video Articles"
          value={blogs.loading ? "—" : videoCount}
          note="Posts featuring an embedded or uploaded video"
        />
      </div>

      <section className="card">
        <div className="card-head">
          <h2>{selectedRegion === "domestic" ? "India Articles" : selectedRegion === "international" ? "Global Articles" : "All Articles"}</h2>
          <div className="tabs" role="tablist" aria-label="Filter articles">
            {[
              ["all", "All", regionRows.length],
              ["published", "Live", publishedCount],
              ["drafts", "Drafts", draftCount],
              ["video", "With Video", videoCount],
            ].map(([id, label, count]) => (
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

        {blogs.loading ? (
          <TableSkeleton rows={4} />
        ) : blogs.error ? (
          <ErrorState message={blogs.error} onRetry={blogs.retry} />
        ) : visible.length === 0 ? (
          <EmptyState
            icon="newspaper"
            title={needle ? "No articles match your search" : "No blog posts yet"}
            text={needle ? "Try searching for another keyword or author." : "Click below to create your first article."}
            action={
              needle ? null : (
                <button type="button" className="btn btn-primary" onClick={create}>
                  <Icon name="plus" size={16} strokeWidth={2.2} />
                  Add First Post
                </button>
              )
            }
          />
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Slug</th>
                  <th>Summary</th>
                  <th>Status</th>
                  <th className="cell-actions">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((blog) => {
                  const coverSrc = resolveMediaUrl(blog.imageUrl);

                  return (
                    <tr key={blog.id}>
                      {/* Main Article: Cover + Title + Author + Video Badge */}
                      <td className="cell-main" data-label="Article">
                        <div className="entity" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div
                            style={{
                              width: 60,
                              height: 42,
                              borderRadius: 6,
                              overflow: "hidden",
                              flexShrink: 0,
                              background: "#e2e8f0",
                              border: "1px solid var(--border)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {coverSrc ? (
                              <img
                                src={coverSrc}
                                alt=""
                                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <Icon name="image" size={18} style={{ color: "#94a3b8" }} />
                            )}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <strong style={{ fontSize: 13.5, color: "var(--text)", display: "block", lineHeight: 1.3, marginBottom: 2 }}>
                              {blog.title}
                            </strong>
                            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", fontSize: 11.5, color: "var(--muted)" }}>
                              <span>{blog.author}</span>
                              {blog.region === "domestic" ? (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "2px 7px",
                                    borderRadius: 4,
                                    background: "#fff7ed",
                                    color: "#c2410c",
                                    fontWeight: 700,
                                    fontSize: 10.5,
                                    border: "1px solid #fed7aa",
                                  }}
                                >
                                  <FiMapPin size={11} /> India
                                </span>
                              ) : blog.region === "international" ? (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "2px 7px",
                                    borderRadius: 4,
                                    background: "#ecfdf5",
                                    color: "#047857",
                                    fontWeight: 700,
                                    fontSize: 10.5,
                                    border: "1px solid #a7f3d0",
                                  }}
                                >
                                  <FiGlobe size={11} /> Global
                                </span>
                              ) : (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "2px 7px",
                                    borderRadius: 4,
                                    background: "#eff6ff",
                                    color: "#1d4ed8",
                                    fontWeight: 700,
                                    fontSize: 10.5,
                                    border: "1px solid #bfdbfe",
                                  }}
                                >
                                  <FiLayers size={11} /> Both Sites
                                </span>
                              )}
                              {blog.videoUrl && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 3,
                                    padding: "1px 6px",
                                    borderRadius: 4,
                                    background: "#f3e8ff",
                                    color: "#7e22ce",
                                    fontWeight: 700,
                                    fontSize: 10,
                                  }}
                                >
                                  <Icon name="video" size={10} /> Video
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td data-label="Slug">
                        <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--orange-600)" }}>
                          /{blog.slug}
                        </span>
                      </td>

                      {/* Short Description */}
                      <td data-label="Summary">
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12.5,
                            color: "var(--text-2)",
                            lineHeight: 1.4,
                            maxWidth: 320,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {blog.shortDescription}
                        </p>
                      </td>

                      {/* Publish Switch */}
                      <td data-label="Status">
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <Switch
                            checked={blog.isPublished}
                            onChange={() => togglePublished(blog)}
                            disabled={toggling === blog.id}
                            label={blog.isPublished ? `Hide ${blog.title}` : `Publish ${blog.title}`}
                          />
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 600,
                              color: blog.isPublished ? "var(--green-700, #15803d)" : "var(--muted, #64748b)",
                            }}
                          >
                            {blog.isPublished ? "Live" : "Draft"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="cell-actions">
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => setDraft(blog)}
                          title="Edit Article"
                          aria-label={`Edit ${blog.title}`}
                        >
                          <Icon name="pencil" size={15} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn is-danger"
                          onClick={() => remove(blog)}
                          title="Delete Article"
                          aria-label={`Delete ${blog.title}`}
                        >
                          <Icon name="trash" size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {draft && (
        <BlogModal
          draft={draft}
          onClose={() => setDraft(null)}
          onSaved={saved}
          onUnauthorized={onUnauthorized}
        />
      )}
    </>
  );
}


function parseInitialSections(rawContent) {
  if (!rawContent || !rawContent.trim()) {
    return [{ id: "sec-1", type: "paragraph", text: "" }];
  }
  const trimmed = rawContent.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, i) => ({
          id: 'sec-' + Date.now() + '-' + i,
          ...item,
        }));
      }
    } catch {
      // not JSON
    }
  }
  return [{ id: "sec-1", type: "paragraph", text: rawContent }];
}

function serializeSections(sections) {
  const clean = sections.map(({ type, text, imageUrl, caption, image1Url, caption1, image2Url, caption2 }) => {
    if (type === "h2" || type === "h3" || type === "paragraph") {
      return { type, text: text || "" };
    }
    if (type === "image_full") {
      return { type, imageUrl: imageUrl || "", caption: caption || "" };
    }
    if (type === "image_grid2") {
      return {
        type,
        image1Url: image1Url || "",
        caption1: caption1 || "",
        image2Url: image2Url || "",
        caption2: caption2 || "",
      };
    }
    return { type, text: text || "" };
  });
  return JSON.stringify(clean);
}

function BlogModal({ draft, onClose, onSaved, onUnauthorized }) {
  const isNew = !draft.id;
  const [region, setRegion] = useState(draft.region || "both");
  const [title, setTitle] = useState(draft.title || "");
  const [slug, setSlug] = useState(draft.slug || "");
  const [slugEdited, setSlugEdited] = useState(Boolean(draft.slug));
  const [imageUrl, setImageUrl] = useState(draft.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(draft.videoUrl || "");
  const [shortDescription, setShortDescription] = useState(draft.shortDescription || "");
  const [content, setContent] = useState(draft.content || "");
  const [sections, setSections] = useState(() => parseInitialSections(draft.content || ""));
  const [contentMode, setContentMode] = useState("sections");
  const [uploadingSectionImg, setUploadingSectionImg] = useState("");
  const [author, setAuthor] = useState(draft.author || "SurfSync Team");
  const [isPublished, setIsPublished] = useState(Boolean(draft.isPublished));
  const [sortOrder, setSortOrder] = useState(draft.sortOrder || 1);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);


  const addSection = (type) => {
    const newId = 'sec-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    if (type === "h2") {
      setSections((prev) => [...prev, { id: newId, type: "h2", text: "" }]);
    } else if (type === "h3") {
      setSections((prev) => [...prev, { id: newId, type: "h3", text: "" }]);
    } else if (type === "image_full") {
      setSections((prev) => [...prev, { id: newId, type: "image_full", imageUrl: "", caption: "" }]);
    } else if (type === "image_grid2") {
      setSections((prev) => [
        ...prev,
        { id: newId, type: "image_grid2", image1Url: "", caption1: "", image2Url: "", caption2: "" },
      ]);
    } else {
      setSections((prev) => [...prev, { id: newId, type: "paragraph", text: "" }]);
    }
  };

  const updateSection = (id, field, value) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeSection = (id) => {
    setSections((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : [{ id: "sec-1", type: "paragraph", text: "" }]));
  };

  const moveSection = (idx, direction) => {
    setSections((prev) => {
      const next = [...prev];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= next.length) return prev;
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  const handleSectionImageUpload = async (secId, fieldKey, file) => {
    if (!file) return;
    setError("");
    setUploadingSectionImg(secId + '-' + fieldKey);
    try {
      const url = await uploadFile(file);
      updateSection(secId, fieldKey, url);
    } catch (err) {
      setError(err.message || "Failed to upload section image.");
    } finally {
      setUploadingSectionImg("");
    }
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!slugEdited) {
      setSlug(slugify(val));
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = getToken();
    const res = await fetch(`${API_BASE}/api/admin/blogs/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "File upload failed.");
    return data.url;
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploadingImage(true);
    try {
      const url = await uploadFile(file);
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploadingVideo(true);
    try {
      const url = await uploadFile(file);
      setVideoUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingVideo(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setError("");

    if (!imageUrl.trim()) {
      setError("Please upload or provide a featured cover image.");
      return;
    }

    if (!shortDescription.trim()) {
      setError("Please enter a short description.");
      return;
    }

    const finalContent = contentMode === "sections" ? serializeSections(sections) : content.trim();
    if (!finalContent) {
      setError("Please enter the full article description or add at least one section.");
      return;
    }

    setBusy(true);

    const payload = {
      title: title.trim(),
      slug: (slug || slugify(title)).trim(),
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim(),
      shortDescription, // Preserves spaces and empty lines!
      content: finalContent,
      author: author.trim() || "SurfSync Team",
      region,
      isPublished,
      sortOrder: Number(sortOrder) || 1,
    };

    try {
      if (isNew) {
        await api("/api/admin/blogs", {
          method: "POST",
          body: payload,
        });
        await onSaved("New blog post created.");
      } else {
        await api(`/api/admin/blogs/${draft.id}`, {
          method: "PUT",
          body: payload,
        });
        await onSaved("Blog post updated.");
      }
    } catch (err) {
      setBusy(false);
      if (err.status === 401) onUnauthorized();
      else setError(err.message);
    }
  };

  return (
    <Modal
      title={isNew ? "Create Blog Post" : "Edit Blog Post"}
      eyebrow="Blog Article Manager"
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className="btn" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? "Saving…" : isNew ? "Publish Article" : "Save Changes"}
          </button>
        </>
      }
    >
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {error ? <p className="alert">{error}</p> : null}

        {/* Target Market / Website Selector */}
        <Field label="Target Market / Website" hint="Choose which website this blog post appears on">
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid var(--border)" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, fontWeight: region === "both" ? 700 : 500, color: region === "both" ? "var(--orange-600, #ea580c)" : "var(--text)" }}>
              <input
                type="radio"
                name="blog_region_radio"
                value="both"
                checked={region === "both"}
                onChange={() => setRegion("both")}
                disabled={busy}
                style={{ width: "auto", margin: 0, cursor: "pointer", accentColor: "#ea580c" }}
              />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FiLayers size={14} /> Both Websites
              </span>
            </label>

            <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, fontWeight: region === "domestic" ? 700 : 500, color: region === "domestic" ? "var(--orange-600, #ea580c)" : "var(--text)" }}>
              <input
                type="radio"
                name="blog_region_radio"
                value="domestic"
                checked={region === "domestic"}
                onChange={() => setRegion("domestic")}
                disabled={busy}
                style={{ width: "auto", margin: 0, cursor: "pointer", accentColor: "#ea580c" }}
              />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FiMapPin size={14} /> India / Domestic
              </span>
            </label>

            <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, fontWeight: region === "international" ? 700 : 500, color: region === "international" ? "var(--orange-600, #ea580c)" : "var(--text)" }}>
              <input
                type="radio"
                name="blog_region_radio"
                value="international"
                checked={region === "international"}
                onChange={() => setRegion("international")}
                disabled={busy}
                style={{ width: "auto", margin: 0, cursor: "pointer", accentColor: "#ea580c" }}
              />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <FiGlobe size={14} /> Global / International
              </span>
            </label>
          </div>
        </Field>

        {/* Title */}
        <Field label="Blog Title" hint="Enter a descriptive headline for your article">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. How Custom Web Applications Drive Enterprise Growth"
            required
            autoFocus
            disabled={busy}
          />
        </Field>

        {/* Slug & Author Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <Field label="URL Slug" hint="Clean web address for this post">
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugEdited(true);
              }}
              placeholder="e.g. how-custom-web-apps-drive-growth"
              required
              disabled={busy}
            />
          </Field>

          <Field label="Author / Byline" hint="e.g. SurfSync Engineering">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="SurfSync Team"
              disabled={busy}
            />
          </Field>
        </div>

        {/* Cover Image Upload */}
        <Field
          label="Featured Cover Image"
          hint="Upload an image (JPG, PNG, WebP) saved automatically in the backend uploads/ folder"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {imageUrl ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background: "#0f172a",
                }}
              >
                <img
                  src={resolveMediaUrl(imageUrl)}
                  alt="Cover preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: "4px 10px",
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div
                onClick={() => imageInputRef.current?.click()}
                style={{
                  border: "2px dashed #cbd5e1",
                  borderRadius: 10,
                  padding: "24px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#f8fafc",
                  transition: "border-color 0.2s",
                }}
              >
                <Icon name="image" size={32} style={{ color: "#94a3b8", margin: "0 auto 8px" }} />
                <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#1e293b", fontSize: 13.5 }}>
                  {uploadingImage ? "Uploading image to uploads/ folder…" : "Click here to upload cover image"}
                </p>
                <span style={{ fontSize: 12, color: "#64748b" }}>PNG, JPG, WebP supported</span>
              </div>
            )}

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              style={{ display: "none" }}
            />

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or enter direct image URL or /uploads path"
              style={{ fontSize: 12.5 }}
              disabled={busy}
            />
          </div>
        </Field>

        {/* Optional Video Upload */}
        <Field
          label="Featured Video (Optional)"
          hint="Upload an MP4 / WebM video file, or paste a video link"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {videoUrl ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background: "#000",
                }}
              >
                <video
                  src={resolveMediaUrl(videoUrl)}
                  controls
                  style={{ width: "100%", maxHeight: 240, display: "block" }}
                />
                <button
                  type="button"
                  onClick={() => setVideoUrl("")}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: "4px 10px",
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                >
                  Remove Video
                </button>
              </div>
            ) : (
              <div
                onClick={() => videoInputRef.current?.click()}
                style={{
                  border: "2px dashed #cbd5e1",
                  borderRadius: 10,
                  padding: "18px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#f8fafc",
                }}
              >
                <Icon name="video" size={28} style={{ color: "#94a3b8", margin: "0 auto 6px" }} />
                <p style={{ margin: "0 0 2px", fontWeight: 600, color: "#1e293b", fontSize: 13 }}>
                  {uploadingVideo ? "Uploading video to uploads/ folder…" : "Click here to upload MP4 / WebM video (up to 100MB)"}
                </p>
                <span style={{ fontSize: 11.5, color: "#64748b" }}>Leave empty if this article has no video</span>
              </div>
            )}

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoFile}
              style={{ display: "none" }}
            />

            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Or enter video URL or /uploads/blogs/... path"
              style={{ fontSize: 12.5 }}
              disabled={busy}
            />
          </div>
        </Field>

        {/* Short Description */}
        <Field
          label="Short Description"
          hint="Displayed on the blog cards on the website. Paragraph breaks and spaces are preserved."
        >
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            placeholder="Enter brief teaser or card summary…"
            required
            disabled={busy}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              fontFamily: "inherit",
              fontSize: 13.5,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          />
        </Field>

        {/* Full Description / Flexible Section Builder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <label style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-1, #0f172a)" }}>
                Full Description / Article Body
              </label>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted, #64748b)" }}>
                Add headings, paragraphs, 1200px full-width images, and 600px+600px side-by-side cards.
              </p>
            </div>
            <div style={{ display: "inline-flex", background: "#f1f5f9", padding: 3, borderRadius: 8, border: "1px solid #e2e8f0", gap: 4 }}>
              <button
                type="button"
                onClick={() => setContentMode("sections")}
                style={{
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: contentMode === "sections" ? "#ea580c" : "transparent",
                  color: contentMode === "sections" ? "#fff" : "#475569",
                }}
              >
                Structured Sections
              </button>
              <button
                type="button"
                onClick={() => {
                  if (contentMode === "sections") {
                    setContent(serializeSections(sections));
                  }
                  setContentMode("raw");
                }}
                style={{
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: contentMode === "raw" ? "#ea580c" : "transparent",
                  color: contentMode === "raw" ? "#fff" : "#475569",
                }}
              >
                Raw Text
              </button>
            </div>
          </div>

          {contentMode === "raw" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Write or paste your full blog article here…&#10;&#10;Leave empty lines between paragraphs to separate them cleanly."
              disabled={busy}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontFamily: "inherit",
                fontSize: 13.5,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Sections List */}
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Section Header Controls */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {sec.type === "h2" && "H2 Heading"}
                      {sec.type === "h3" && "H3 Subheading"}
                      {sec.type === "paragraph" && "Text Paragraph"}
                      {sec.type === "image_full" && "Full-Width Image (1200px Ratio)"}
                      {sec.type === "image_grid2" && "Two Images Side-by-Side (600px + 600px)"}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveSection(idx, -1)}
                        style={{ border: "none", background: "#f1f5f9", borderRadius: 4, padding: "2px 6px", cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 11 }}
                        title="Move Up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        disabled={idx === sections.length - 1}
                        onClick={() => moveSection(idx, 1)}
                        style={{ border: "none", background: "#f1f5f9", borderRadius: 4, padding: "2px 6px", cursor: idx === sections.length - 1 ? "default" : "pointer", opacity: idx === sections.length - 1 ? 0.3 : 1, fontSize: 11 }}
                        title="Move Down"
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(sec.id)}
                        style={{ border: "none", background: "#fee2e2", color: "#dc2626", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                        title="Delete Section"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Section Inputs based on type */}
                  {sec.type === "h2" && (
                    <input
                      type="text"
                      value={sec.text || ""}
                      onChange={(e) => updateSection(sec.id, "text", e.target.value)}
                      placeholder="e.g. 1. Dedicated Architecture Tailored to Business Goals"
                      style={{ fontSize: 15, fontWeight: 700, padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                    />
                  )}

                  {sec.type === "h3" && (
                    <input
                      type="text"
                      value={sec.text || ""}
                      onChange={(e) => updateSection(sec.id, "text", e.target.value)}
                      placeholder="e.g. Key Performance Metrics in 2026"
                      style={{ fontSize: 14, fontWeight: 600, padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                    />
                  )}

                  {sec.type === "paragraph" && (
                    <textarea
                      rows={4}
                      value={sec.text || ""}
                      onChange={(e) => updateSection(sec.id, "text", e.target.value)}
                      placeholder="Write paragraph content here. Line breaks are preserved."
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-wrap" }}
                    />
                  )}

                  {sec.type === "image_full" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {sec.imageUrl ? (
                        <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0", background: "#0f172a", maxHeight: 180 }}>
                          <img src={resolveMediaUrl(sec.imageUrl)} alt="Preview" style={{ width: "100%", height: 160, objectFit: "cover" }} />
                          <button
                            type="button"
                            onClick={() => updateSection(sec.id, "imageUrl", "")}
                            style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.75)", color: "#fff", border: "none", borderRadius: 4, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}
                          >
                            Change Image
                          </button>
                        </div>
                      ) : (
                        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #cbd5e1", borderRadius: 8, padding: "18px 12px", cursor: "pointer", background: "#f8fafc" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
                            {uploadingSectionImg === `${sec.id}-imageUrl` ? "Uploading full-width image…" : "Click to upload 1200px Full-Width Image"}
                          </span>
                          <span style={{ fontSize: 11.5, color: "#64748b" }}>Recommended: 1200×675 (16:9) PNG, JPG, WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleSectionImageUpload(sec.id, "imageUrl", f);
                            }}
                          />
                        </label>
                      )}
                      <input
                        type="text"
                        value={sec.caption || ""}
                        onChange={(e) => updateSection(sec.id, "caption", e.target.value)}
                        placeholder="Image caption or subtitle (optional)"
                        style={{ fontSize: 12.5, padding: "6px 10px", borderRadius: 6, border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  )}

                  {sec.type === "image_grid2" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {/* Image 1 (600px) */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, border: "1px solid #f1f5f9", padding: 8, borderRadius: 6, background: "#fafafa" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#475569" }}>Card 1 (Left - 600px Ratio)</span>
                        {sec.image1Url ? (
                          <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", height: 120, background: "#0f172a" }}>
                            <img src={resolveMediaUrl(sec.image1Url)} alt="Preview 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button
                              type="button"
                              onClick={() => updateSection(sec.id, "image1Url", "")}
                              style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.75)", color: "#fff", border: "none", borderRadius: 4, padding: "2px 6px", fontSize: 10, cursor: "pointer" }}
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px dashed #cbd5e1", borderRadius: 6, height: 100, cursor: "pointer", background: "#ffffff", textAlign: "center", padding: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>
                              {uploadingSectionImg === `${sec.id}-image1Url` ? "Uploading…" : "Upload Card 1"}
                            </span>
                            <span style={{ fontSize: 10.5, color: "#94a3b8" }}>600×338 (16:9)</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleSectionImageUpload(sec.id, "image1Url", f);
                              }}
                            />
                          </label>
                        )}
                        <input
                          type="text"
                          value={sec.caption1 || ""}
                          onChange={(e) => updateSection(sec.id, "caption1", e.target.value)}
                          placeholder="Caption 1 (optional)"
                          style={{ fontSize: 11.5, padding: "5px 8px", borderRadius: 4, border: "1px solid #cbd5e1" }}
                        />
                      </div>

                      {/* Image 2 (600px) */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, border: "1px solid #f1f5f9", padding: 8, borderRadius: 6, background: "#fafafa" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#475569" }}>Card 2 (Right - 600px Ratio)</span>
                        {sec.image2Url ? (
                          <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", height: 120, background: "#0f172a" }}>
                            <img src={resolveMediaUrl(sec.image2Url)} alt="Preview 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button
                              type="button"
                              onClick={() => updateSection(sec.id, "image2Url", "")}
                              style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.75)", color: "#fff", border: "none", borderRadius: 4, padding: "2px 6px", fontSize: 10, cursor: "pointer" }}
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px dashed #cbd5e1", borderRadius: 6, height: 100, cursor: "pointer", background: "#ffffff", textAlign: "center", padding: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>
                              {uploadingSectionImg === `${sec.id}-image2Url` ? "Uploading…" : "Upload Card 2"}
                            </span>
                            <span style={{ fontSize: 10.5, color: "#94a3b8" }}>600×338 (16:9)</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleSectionImageUpload(sec.id, "image2Url", f);
                              }}
                            />
                          </label>
                        )}
                        <input
                          type="text"
                          value={sec.caption2 || ""}
                          onChange={(e) => updateSection(sec.id, "caption2", e.target.value)}
                          placeholder="Caption 2 (optional)"
                          style={{ fontSize: 11.5, padding: "5px 8px", borderRadius: 4, border: "1px solid #cbd5e1" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add New Section Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                  padding: "10px 14px",
                  background: "#f8fafc",
                  border: "1px dashed #cbd5e1",
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginRight: 4 }}>+ Add Section:</span>
                <button
                  type="button"
                  onClick={() => addSection("h2")}
                  style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer", color: "#334155" }}
                >
                  + H2 Heading
                </button>
                <button
                  type="button"
                  onClick={() => addSection("h3")}
                  style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer", color: "#334155" }}
                >
                  + H3 Subheading
                </button>
                <button
                  type="button"
                  onClick={() => addSection("paragraph")}
                  style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer", color: "#334155" }}
                >
                  + Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addSection("image_full")}
                  style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, background: "#fff7ed", border: "1px solid #fdba74", color: "#c2410c", borderRadius: 6, cursor: "pointer" }}
                >
                  + 1200px Full-Width Image
                </button>
                <button
                  type="button"
                  onClick={() => addSection("image_grid2")}
                  style={{ padding: "5px 10px", fontSize: 12, fontWeight: 600, background: "#eff6ff", border: "1px solid #93c5fd", color: "#1d4ed8", borderRadius: 6, cursor: "pointer" }}
                >
                  + 2 Images Side-by-Side (600px + 600px)
                </button>
              </div>
            </div>
          )}
        </div>


        {/* Publish Status & Sort Order */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            padding: "12px 16px",
            background: "#f8fafc",
            borderRadius: 8,
            border: "1px solid var(--border)",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 600, color: "#0f172a", fontSize: 13.5 }}>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              disabled={busy}
              style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#f97316" }}
            />
            <span>Publish Immediately (Visible on Website)</span>
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#64748b" }}>Display Order:</span>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              min="1"
              style={{ width: 65, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", textAlign: "center" }}
              disabled={busy}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
