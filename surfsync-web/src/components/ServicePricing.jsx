import { useEffect, useRef, useState } from "react";
import heroWaves from "../assets/services/svc-hero_w.svg";
import "./ServicePricing.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

const DEFAULT_PACKAGES = {
  "mobile-apps": [
    {
      id: 1,
      packageName: "Basic Business App",
      platform: "Android",
      whatsIncluded: "Up to 6 screens\nCompany profile, services\nEnquiry form\nPush notifications\nAdmin content control",
      price: "$499 – $699",
      btnText: "Get Started →",
      isPopular: false,
      icon: "phone",
    },
    {
      id: 2,
      packageName: "Standard App",
      platform: "Android + iOS (Flutter / React Native)",
      whatsIncluded: "Up to 12 screens\nUser login\nDynamic content via API\nNotifications\nAnalytics\nAdmin panel",
      price: "$949 – $1,299",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "dualPhone",
    },
    {
      id: 3,
      packageName: "E-Commerce App",
      platform: "Android + iOS",
      whatsIncluded: "Product listing\nCart\nPayment gateway\nOrder tracking\nOffers\nCustomer accounts\nVendor/admin dashboard",
      price: "$1,499 – $2,299",
      btnText: "Get Started →",
      isPopular: false,
      icon: "cart",
    },
    {
      id: 4,
      packageName: "Custom / On-Demand App",
      platform: "Android + iOS",
      whatsIncluded: "Booking, delivery\nService marketplace\nOr any custom concept\nPriced after free requirement study",
      price: "$1,899 onwards",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
  "web-development": [
    {
      id: 5,
      packageName: "Static Website (Starter)",
      platform: "Portfolios, small businesses, clinics, coaching",
      whatsIncluded: "Up to 5 pages\nMobile-responsive design\nContact form\nWhatsApp chat button\nBasic SEO\n1 yr free hosting support*\nSSL setup",
      price: "$119 – $179",
      btnText: "Get Started →",
      isPopular: false,
      icon: "phone",
    },
    {
      id: 6,
      packageName: "Dynamic Website (Business)",
      platform: "Growing businesses needing content updates",
      whatsIncluded: "Up to 10 pages\nAdmin panel / CMS\nBlog module\nGallery\nEnquiry management\nBasic SEO\nSSL setup\nTraining session",
      price: "$289 – $399",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "dualPhone",
    },
    {
      id: 7,
      packageName: "E-Commerce Website",
      platform: "Online stores, D2C brands",
      whatsIncluded: "Product catalogue (up to 200 products)\nCart & checkout\nPayment gateway\nOrder & inventory panel\nCustomer login\nCoupon system\nShipping integration",
      price: "$579 – $899",
      btnText: "Get Started →",
      isPopular: false,
      icon: "cart",
    },
    {
      id: 8,
      packageName: "Custom Full-Stack Web Application",
      platform: "Startups, portals, marketplaces, SaaS ideas",
      whatsIncluded: "Custom UI/UX\nCustom backend (Node/PHP/Python)\nDatabase design\nUser roles\nDashboards\nREST APIs\nAdmin panel\nDeployment",
      price: "$1,049 onwards",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
  "ecommerce-cms": [
    {
      id: 8,
      packageName: "Shopify / WooCommerce Store",
      platform: "Web + Mobile Optimized",
      whatsIncluded: "Modern custom storefront\nUp to 50 product catalog\nPayment gateway integration\nShipping & tax setup\nCustomer invoices & orders",
      price: "$449 – $649",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "cart",
    },
    {
      id: 9,
      packageName: "Custom Headless Store",
      platform: "Next.js / Node / Stripe",
      whatsIncluded: "Ultra-fast headless checkout\nReal-time inventory sync\nMulti-currency support\nAutomated cart recovery\nAdvanced ecommerce analytics",
      price: "$1,199 – $1,799",
      btnText: "Get Started →",
      isPopular: false,
      icon: "dualPhone",
    },
    {
      id: 10,
      packageName: "Multi-Vendor Marketplace",
      platform: "Web + Admin + Vendor Portals",
      whatsIncluded: "Vendor self-onboarding\nAutomated commission split\nVendor payout wallet\nCentralized order routing\nMulti-vendor inventory control",
      price: "$2,399 onwards",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
  "ai-automation": [
    {
      id: 11,
      packageName: "AI Workflow Automation",
      platform: "Python / n8n / Zapier",
      whatsIncluded: "Automated document scanning\nEmail parsing & triage\nMulti-tool synchronization\nScheduled reporting bots\nError alerting & audit logs",
      price: "$399 – $649",
      btnText: "Get Started →",
      isPopular: false,
      icon: "phone",
    },
    {
      id: 12,
      packageName: "Custom AI Agent / Bot",
      platform: "LLM / OpenAI / Claude API",
      whatsIncluded: "Company knowledge base training\n24/7 customer support chatbot\nLead qualification & booking\nCRM & Helpdesk automated sync\nHuman handoff workflows",
      price: "$899 – $1,299",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "dualPhone",
    },
    {
      id: 13,
      packageName: "Enterprise AI Pipeline",
      platform: "Custom Fine-Tuning / Cloud",
      whatsIncluded: "Proprietary vector database\nAutomated business intelligence\nMulti-agent decision systems\nPrivate on-prem/VPC deployment\nData governance & compliance",
      price: "$1,999 onwards",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
  "cloud-devops": [
    {
      id: 14,
      packageName: "Cloud Setup & Migration",
      platform: "AWS / GCP / Azure",
      whatsIncluded: "Secure VPC & networking\nCompute & server provisioning\nZero-downtime DB migration\nSSL, CDN & DNS configuration\nBasic backup automation",
      price: "$499 – $799",
      btnText: "Get Started →",
      isPopular: false,
      icon: "phone",
    },
    {
      id: 15,
      packageName: "CI/CD & Containerization",
      platform: "Docker / K8s / GitHub Actions",
      whatsIncluded: "Automated test & build pipelines\nDocker containerized architecture\nStaging & production branches\nRolling zero-downtime deployment\nEnvironment secrets security",
      price: "$849 – $1,199",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "dualPhone",
    },
    {
      id: 16,
      packageName: "24/7 Monitoring & Support",
      platform: "Datadog / Prometheus / CloudWatch",
      whatsIncluded: "Real-time uptime & error alerts\nAutomated snapshot recovery\nCloud resource cost reduction\nServer hardening & patch updates\nMonthly infrastructure audit",
      price: "$349 / month",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
  "enterprise-it": [
    {
      id: 17,
      packageName: "IT Infrastructure Audit",
      platform: "On-Premise / Hybrid Cloud",
      whatsIncluded: "Full IT infrastructure inspection\nSecurity & firewall audit\nVulnerability scanning\nBackup recovery verification\nCompliance & upgrade report",
      price: "$649 – $999",
      btnText: "Get Started →",
      isPopular: false,
      icon: "phone",
    },
    {
      id: 18,
      packageName: "Custom ERP / CRM Integration",
      platform: "Enterprise API Layer",
      whatsIncluded: "Centralized database syncing\nCustom microservice APIs\nBilling & inventory automation\nLegacy software modern adapters\nRole-based data access",
      price: "$1,599 – $2,499",
      btnText: "Choose Plan →",
      isPopular: true,
      icon: "dualPhone",
    },
    {
      id: 19,
      packageName: "Managed IT Support (SLA)",
      platform: "Dedicated Engineering Team",
      whatsIncluded: "Guaranteed priority response SLA\nAutomated disaster recovery\nEndpoint & network security\nQuarterly IT roadmap reviews\nProactive preventive maintenance",
      price: "$599 / month",
      btnText: "Discuss Your Idea →",
      isPopular: false,
      icon: "grid",
    },
  ],
};

const SERVICE_META = {
  "mobile-apps": {
    orangeTitle: "Mobile Application",
    darkTitle: "Development",
    subtitle: "Choose the right app solution for your business. Transparent pricing, scalable features and end-to-end development support.",
  },
  "web-development": {
    orangeTitle: "Web Application",
    darkTitle: "Development",
    subtitle: "Choose the right web package for your business. High performance, clean architecture and full-cycle development support.",
  },
  "ecommerce-cms": {
    orangeTitle: "E-Commerce & CMS",
    darkTitle: "Solutions",
    subtitle: "Launch and scale your online store with flexible e-commerce packages tailored to your brand's growth.",
  },
  "ai-automation": {
    orangeTitle: "AI & Automation",
    darkTitle: "Solutions",
    subtitle: "Streamline your workflows and empower your business with custom AI integrations and smart automated systems.",
  },
  "cloud-devops": {
    orangeTitle: "Cloud & DevOps",
    darkTitle: "Infrastructure",
    subtitle: "Reliable cloud environments, seamless CI/CD automation, and proactive 24/7 infrastructure support.",
  },
  "enterprise-it": {
    orangeTitle: "Enterprise IT",
    darkTitle: "Solutions",
    subtitle: "Robust IT infrastructure, end-to-end system integrations, and dedicated SLA management for your enterprise.",
  },
};

function PackageIcon({ type, index }) {
  if (type === "phone" || index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (type === "dualPhone" || index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="8" height="16" rx="2" />
        <rect x="13" y="2" width="8" height="16" rx="2" />
      </svg>
    );
  }
  if (type === "cart" || index === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function parseFeatures(text) {
  if (!text) return [];
  if (Array.isArray(text)) return text;
  return String(text)
    .split(/[\r\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ServicePricing({ slug = "mobile-apps" }) {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES[slug] || []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const trackRef = useRef(null);

  const meta = SERVICE_META[slug] || {
    orangeTitle: "Transparent",
    darkTitle: "Pricing",
    subtitle: "Choose the right package for your business needs with end-to-end support.",
  };

  useEffect(() => {
    let ignore = false;
    async function fetchPricing() {
      try {
        const response = await fetch(`${API_BASE}/api/services/${slug}/packages?region=international`);
        if (response.ok) {
          const data = await response.json();
          if (!ignore && Array.isArray(data) && data.length > 0) {
            // Keep strictly global/international packages (USD $)
            const globalOnly = data.filter((p) => p.region === "international" || p.price?.includes("$"));
            setPackages(globalOnly.length > 0 ? globalOnly : data);
          }
        }
      } catch (_err) {
        // Fallback preloaded
      }
    }
    fetchPricing();
    return () => {
      ignore = true;
    };
  }, [slug]);

  useEffect(() => {
    function checkOverflow() {
      if (!trackRef.current) return;
      const el = trackRef.current;
      setCanScroll(el.scrollWidth > el.clientWidth + 10);
    }
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [packages]);

  if (!packages || packages.length === 0) {
    return null;
  }

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveSlide(index);
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeSlide - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(packages.length - 1, activeSlide + 1);
    scrollToIndex(nextIdx);
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const cardWidth = el.children[0]?.offsetWidth || 280;
    const newIndex = Math.round(el.scrollLeft / (cardWidth + 20));
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < packages.length) {
      setActiveSlide(newIndex);
    }
  };

  return (
    <section className="sp-section" id="pricing-packages">
      <img className="sp-section-waves" src={heroWaves} alt="" aria-hidden="true" />
      <div className="sp-wrap">
        {/* Section Header */}
        <div className="sp-head">
          <h2 className="sp-title">
            <span className="sp-title-orange">{meta.orangeTitle}</span>{" "}
            <span className="sp-title-dark">{meta.darkTitle}</span>
          </h2>
          <p className="sp-subtitle">{meta.subtitle}</p>
        </div>

        {/* Carousel Container */}
        <div className={`sp-carousel-wrapper${canScroll ? " has-overflow" : ""}`}>
          {canScroll && (
            <button
              type="button"
              className="sp-nav-btn sp-nav-prev"
              onClick={handlePrev}
              disabled={activeSlide === 0}
              aria-label="Previous Package"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Cards Track (Centered automatically) */}
          <div className="sp-track" ref={trackRef} onScroll={onScroll}>
            {(() => {
              const hasExplicitPopular = packages.some((p) => Boolean(p.isPopular));
              return packages.map((pkg, index) => {
                const isPopular = hasExplicitPopular ? Boolean(pkg.isPopular) : index === 1;
                const features = parseFeatures(pkg.whatsIncluded || pkg.whats_included);
              const btnLabel =
                pkg.btnText ||
                (isPopular ? "Choose Plan →" : index === packages.length - 1 ? "Discuss Your Idea →" : "Get Started →");

              return (
                <div
                  key={pkg.id || index}
                  className={`sp-card${isPopular ? " is-popular" : ""}`}
                >
                  {isPopular && (
                    <div className="sp-popular-banner">
                      <svg className="sp-crown-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                      </svg>
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="sp-card-inner">
                    <div className="sp-card-waves-bg" aria-hidden="true" />
                    {/* Icon Badge */}
                    <div className="sp-icon-box">
                      <PackageIcon type={pkg.icon} index={index} />
                    </div>

                    {/* Title & Platform */}
                    <h3 className="sp-card-title">{pkg.packageName || pkg.package_name}</h3>
                    <p className="sp-card-platform">{pkg.platform}</p>

                    {/* Price */}
                    <div className="sp-price-wrap">
                      <span className="sp-price">{pkg.price}</span>
                    </div>

                    {/* Features List with Orange Checkmarks */}
                    <ul className="sp-features-list">
                      {features.map((feature, fIdx) => (
                        <li key={fIdx}>
                          <span className="sp-check">✓</span>
                          <span className="sp-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="sp-card-action">
                      <a
                        href="#contact"
                        className={`sp-btn${isPopular ? " is-primary" : " is-outline"}`}
                      >
                        {btnLabel}
                      </a>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
          </div>

          {canScroll && (
            <button
              type="button"
              className="sp-nav-btn sp-nav-next"
              onClick={handleNext}
              disabled={activeSlide === packages.length - 1}
              aria-label="Next Package"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Carousel Pagination Dots */}
        {canScroll && packages.length > 1 && (
          <div className="sp-dots">
            {packages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`sp-dot${dotIdx === activeSlide ? " is-active" : ""}`}
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
