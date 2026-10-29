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
  const [author, setAuthor] = useState(draft.author || "SurfSync Team");
  const [isPublished, setIsPublished] = useState(Boolean(draft.isPublished));
  const [sortOrder, setSortOrder] = useState(draft.sortOrder || 1);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

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

    if (!content.trim()) {
      setError("Please enter the full article description.");
      return;
    }

    setBusy(true);

    const payload = {
      title: title.trim(),
      slug: (slug || slugify(title)).trim(),
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim(),
      shortDescription, // Preserves spaces and empty lines!
      content, // Preserves spaces and empty lines!
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

        {/* Full Description / Content */}
        <Field
          label="Full Description / Article Body"
          hint="Full article text. Line breaks, empty paragraph lines, and bullet spaces are preserved exactly as you type."
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Write or paste your full blog article here…&#10;&#10;Leave empty lines between paragraphs to separate them cleanly."
            required
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
        </Field>

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
