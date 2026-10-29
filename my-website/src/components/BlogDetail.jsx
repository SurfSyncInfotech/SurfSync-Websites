import { useEffect, useState } from "react";
import "./BlogDetail.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

function formatDate(dateString) {
  if (!dateString) return "May 13, 2026";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "May 13, 2026";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "May 13, 2026";
  }
}

function resolveMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default function BlogDetail({ slug }) {
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch single blog by slug
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        if (!res.ok) {
          throw new Error("Article not found.");
        }
        const data = await res.json();
        if (!ignore) {
          setBlog(data);
        }

        // 2. Fetch recent blogs for the sidebar
        const recentRes = await fetch(`${API_BASE}/api/blogs?region=domestic`);
        if (recentRes.ok) {
          const all = await recentRes.json();
          if (!ignore && Array.isArray(all)) {
            const domesticOnly = all.filter((b) => b.region === "domestic" || b.region === "both" || !b.region);
            setRecentPosts(domesticOnly.filter((b) => b.slug !== slug).slice(0, 5));
          }
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load article.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 16 }}>Loading article…</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, color: "#111827", marginBottom: 12 }}>Article Not Found</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>The blog article you are looking for is unavailable or has been moved.</p>
          <a href="#blogs" className="blog-back-btn">
            ← Return to All Blogs
          </a>
        </div>
      </div>
    );
  }

  const coverSrc = resolveMediaUrl(blog.imageUrl);
  const videoSrc = resolveMediaUrl(blog.videoUrl);

  return (
    <div className="blog-detail-page">
      {/* Top Headline Area with #fff8f2 background */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-container">
        {/* Back Link */}
        <div className="blog-detail-breadcrumb">
          <a href="#blogs" className="blog-back-btn">
            ← All Blogs
          </a>
        </div>

        {/* Article Headline Header */}
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.title}</h1>

          </header>
        </div>
      </section>

      <div className="blog-detail-container">

        {/* Main Content & Sidebar Layout */}
        <div className="blog-detail-layout">
          {/* Main Article Body */}
          <main className="blog-detail-main">
            {/* Featured Image */}
            {coverSrc && (
              <div className="blog-detail-hero-media">
                <img src={coverSrc} alt={blog.title} className="blog-detail-featured-img" />
              </div>
            )}

            {/* Video Player if video exists */}
            {videoSrc && (
              <div className="blog-detail-video-wrapper">
                <video src={videoSrc} controls playsInline className="blog-detail-video-player" />
              </div>
            )}

            {/* Short Description Teaser */}
            {blog.shortDescription && (
              <div className="blog-detail-lead-box">
                <p>{blog.shortDescription}</p>
              </div>
            )}

            {/* Full Body Description (Line breaks and formatting strictly preserved) */}
            <div className="blog-detail-content">
              {blog.content}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="blog-detail-sidebar">
            {/* Recent Posts Widget */}
            <div className="blog-sidebar-widget">
              <h3 className="blog-sidebar-title">Recent Post</h3>
              <div className="blog-recent-list">
                {recentPosts.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: 13 }}>No other articles available.</p>
                ) : (
                  recentPosts.map((post) => {
                    const postThumb = resolveMediaUrl(post.imageUrl);
                    return (
                      <article key={post.id || post.slug} className="blog-recent-item">
                        <a href={`#blog-${post.slug}`} className="blog-recent-thumb-link">
                          <img
                            src={postThumb}
                            alt=""
                            className="blog-recent-thumb"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80";
                            }}
                          />
                        </a>
                        <div className="blog-recent-info">
                          <span className="blog-recent-date">{formatDate(post.publishedAt || post.createdAt)}</span>
                          <h4 className="blog-recent-post-title">
                            <a href={`#blog-${post.slug}`}>{post.title}</a>
                          </h4>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>

            {/* Start a project promo box */}
            <div className="blog-sidebar-cta">
              <h4>Build your next product with SurfSync</h4>
              <p>Discuss your web, mobile, or AI requirements with our engineering team.</p>
              <a href="#contact" className="blog-sidebar-cta-btn">
                Start a project →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
