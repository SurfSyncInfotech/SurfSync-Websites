import { useEffect } from "react";
import logo from "../assets/logo.webp";
import "./ThankYouPage.css";

const GOOGLE_TAG_ID = "AW-17483691504";

function ThankYouPage() {
  useEffect(() => {
    // 1. Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;
    gtag("js", new Date());
    gtag("config", GOOGLE_TAG_ID);

    // 2. Inject Google Tag Manager script if not already present
    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
    const existingScript = document.querySelector(`script[src*="${GOOGLE_TAG_ID}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="thank-you-page">
      <header className="thank-you-header">
        <a href="/enquries" aria-label="SurfSync home">
          <img src={logo} alt="SurfSync Infotech" />
        </a>
      </header>
      <main className="thank-you-content">
        <span className="thank-you-check" aria-hidden="true">
          <svg viewBox="0 0 32 32">
            <path d="m8 16 5.2 5.2L24.5 10" />
          </svg>
        </span>
        <h1>Thanks for reaching out.</h1>
        <p>Your enquiry has been received. The SurfSync team will be in touch soon.</p>
        <a className="thank-you-home" href="/enquries">
          Back to SurfSync
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M3.5 10h12M10 4.5l5.5 5.5-5.5 5.5" />
          </svg>
        </a>
      </main>
      <footer className="thank-you-footer">
        <span>SurfSync Infotech</span>
        <a href="mailto:info@surfsyncinfotech.in">info@surfsyncinfotech.in</a>
      </footer>
    </div>
  );
}

export default ThankYouPage;
