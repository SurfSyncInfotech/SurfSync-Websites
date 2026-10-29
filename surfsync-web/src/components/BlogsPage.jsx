import { useEffect, useState } from "react";
import blogBanner from "../assets/Insights That Move Businesses Forward (1).png";
import "./BlogsPage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: "How Custom Mobile & Web Apps Accelerate Modern Businesses in 2026",
    slug: "how-custom-apps-accelerate-modern-businesses-2026",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    shortDescription: "Discover how scalable architecture, custom APIs, and tailored UX transform standard operations into high-performing digital powerhouses.",
    author: "SurfSync Engineering",
    publishedAt: "2026-05-13T10:00:00.000Z",
  },
  {
    id: 2,
    title: "AI & Workflow Automation: Practical Guide for Growing Enterprises",
    slug: "ai-workflow-automation-practical-guide",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    shortDescription: "A pragmatic approach to integrating intelligent document parsing, customer triage bots, and automated pipelines into daily workflows.",
    author: "SurfSync Insights",
    publishedAt: "2026-05-13T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Architecting High-Volume Cloud Systems for Resilience & Zero Downtime",
    slug: "architecting-high-volume-cloud-systems-resilience",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "",
    shortDescription: "Modern DevOps patterns, automated failovers, and containerized deployments that keep mission-critical applications running 24/7.",
    author: "SurfSync Cloud Team",
    publishedAt: "2026-05-13T10:00:00.000Z",
  },
];

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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadBlogs() {
      try {
        const res = await fetch(`${API_BASE}/api/blogs?region=international`);
        if (res.ok) {
          const data = await res.json();
          if (!ignore && Array.isArray(data) && data.length > 0) {
            // Keep international or both
            const globalOnly = data.filter((b) => b.region === "international" || b.region === "both");
            setBlogs(globalOnly.length > 0 ? globalOnly : data);
          }
        }
      } catch (_err) {
        // Fallback default
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadBlogs();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="blogs-page">
      {/* Hero Banner Section */}
      <section className="blogs-hero">
        <div className="blogs-banner-wrap">
          <div className="blogs-banner-card">
            <img
              className="blogs-banner-img"
              src={blogBanner}
              alt="Insights That Move Businesses Forward"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="blogs-grid-section">
        <div className="blogs-container">
          <div className="blogs-grid">
            {blogs.map((blog) => {
              const coverSrc = resolveMediaUrl(blog.imageUrl);
              const readMoreHref = `#blog-${blog.slug}`;

              return (
                <article key={blog.id || blog.slug} className="blog-card">
                  {/* Card Media Image */}
                  <a href={readMoreHref} className="blog-card-img-wrap" aria-label={blog.title}>
                    <img
                      src={coverSrc}
                      alt={blog.title}
                      loading="lazy"
                      className="blog-card-img"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    {blog.videoUrl && (
                      <span className="blog-video-badge" title="Includes video">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Video
                      </span>
                    )}
                  </a>

                  {/* Card Meta & Content */}
                  <div className="blog-card-body">
                    <span className="blog-card-date">{formatDate(blog.publishedAt || blog.createdAt)}</span>

                    <h2 className="blog-card-title">
                      <a href={readMoreHref}>{blog.title}</a>
                    </h2>

                    <p className="blog-card-desc">{blog.shortDescription}</p>

                    <div className="blog-card-footer">
                      <a href={readMoreHref} className="blog-read-more-btn">
                        READ MORE
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
