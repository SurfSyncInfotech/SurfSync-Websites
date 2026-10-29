import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import earth from "../assets/footer-earth.webp";
import "./Footer.css";

const quickLinks = [
  ["About Us", "#about"],
  ["Services", "#services"],
  ["Products", "#products"],
  ["Projects", "#projects"],
  ["Blogs", "#blogs"],
  ["Careers", "#careers"],
  ["Contact", "#contact"],
];

const services = [
  ["Web Development", "#web-development"],
  ["Mobile Apps", "#mobile-apps"],
  ["E-commerce & CMS", "#ecommerce-cms"],
  ["Cloud & DevOps", "#cloud-devops"],
  ["Enterprise IT Solutions", "#enterprise-it"],
  ["AI & Automation", "#ai-automation"],
];

const products = [
  ["Swagat Suite", "#products-swagat"],
  ["HRMS", "#products-hrms"],
  ["Sales CRM", "#products-crm"],
  ["PatronPing", "#products-patron"],
];

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/shivambhrdwz/"],
  ["Facebook", "https://www.facebook.com/surfsyncinfotech"],
  ["Instagram", "https://www.instagram.com/surfsync_infotech"],
];

function Footer() {
  /* the columns rise into place when the footer scrolls into view */
  const mainRef = useRef(null);
  const [shown, setShown] = useState(
    () => !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const main = mainRef.current;
    if (!main || shown) return undefined;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        seen.disconnect();
      },
      { threshold: 0.2 }
    );
    seen.observe(main);
    return () => seen.disconnect();
  }, [shown]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <section className="footer-banner">
        <img loading="lazy" decoding="async" src={earth} alt="" />
        <div className="footer-banner-inner">
          <div>
            <p className="footer-kicker">Let's connect</p>
            <h2>Let's build What's next.</h2>
            <div className="footer-actions">
              <a className="footer-start" href="mailto:info@surfsyncinfotech.in">
                Start a conversation <span aria-hidden="true">→</span>
              </a>
              <a className="footer-experts" href="mailto:info@surfsyncinfotech.in">
                Talk to our experts
              </a>
            </div>
          </div>
          <p className="footer-script">
            New
            <br />
            Horizons
            <br />
            Together
            <svg className="footer-swoosh" viewBox="0 0 180 28" aria-hidden="true">
              <path
                d="M4 16c28-10 52-12 78-8 22 3 40 2 70-8"
                fill="none"
                stroke="#7fd3df"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M8 22c34-6 62-6 96-2"
                fill="none"
                stroke="#7fd3df"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </p>
        </div>
      </section>

      <div ref={mainRef} className={`footer-main${shown ? " is-in" : ""}`}>
        <div className="footer-about">
          <a className="footer-brand" href="#top" aria-label="SurfSync Infotech, back to the home page">
            <img loading="lazy" decoding="async" src={logo} alt="SurfSync Infotech" />
          </a>
          <p className="footer-blurb">
            AI powered software, web, and mobile solutions. ISO 9001:2015 Certified. Noida, India.
          </p>
          <div className="footer-follow">
            <h3>Follow Us</h3>
            <div className="footer-social">
              {socials.map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                  {name === "LinkedIn" ? <LinkedInIcon /> : name === "Facebook" ? <FacebookIcon /> : <InstagramIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3>Quick Links</h3>
          {quickLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <nav aria-label="Our services">
          <h3>Our Services</h3>
          {services.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <nav aria-label="Our products">
          <h3>Products</h3>
          {products.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer-aside">
          <h3>Get in Touch</h3>
          <a className="footer-line" href="mailto:info@surfsyncinfotech.in">
            <MailIcon />
            info@surfsyncinfotech.in
          </a>
          <a className="footer-line" href="tel:+919429694356">
            <PhoneIcon />
            +91 94296 94356
          </a>
          <a className="footer-line" href="#contact">
            <PinIcon />
            Sector 73, Noida, Uttar Pradesh 201316
          </a>
        </div>
      </div>

      <div className="footer-bar">
        <p>© {new Date().getFullYear()} SurfSync Infotech Pvt. Ltd. All rights reserved.</p>
        <button type="button" className="footer-top" onClick={toTop} aria-label="Back to top">
          <span aria-hidden="true">↑</span> Back to top
        </button>
        <nav aria-label="Legal">
          <a href="#contact">Privacy policy</a>
          <span aria-hidden="true">|</span>
          <a href="#contact">Terms</a>
          <span aria-hidden="true">|</span>
          <a href="#contact">Sitemap</a>
        </nav>
      </div>
    </footer>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 4h3l1.5 4-2 1.5a12 12 0 0 0 4 4L16 12l4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 5 6a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the official brand marks (as published by each company), drawn in their own colours */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-brand" x1="0.1" y1="1" x2="0.9" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-brand)"
        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
      />
    </svg>
  );
}

export default Footer;
