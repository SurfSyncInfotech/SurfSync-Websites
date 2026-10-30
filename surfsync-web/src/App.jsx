import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";
import Impact from "./components/Impact";
import Clarity from "./components/Clarity";
import Stages from "./components/Stages";
import OurProcess from "./components/OurProcess";
import Industries from "./components/Industries";
import Visionaries from "./components/Visionaries";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import LandingPage from "./components/LandingPage";
import ThankYouPage from "./components/ThankYouPage";
import serviceDetails from "./components/serviceDetails";
import Footer from "./components/Footer";
/* case study styles load up front, in this order, because later pages override earlier ones */
import "./components/CaseStudy.css";
import "./components/CaseVakt.css";
import "./components/CaseVls.css";
import "./components/CaseInfocus.css";
import "./components/CaseModernAuto.css";
import "./components/CaseMarutiPay.css";
import "./components/CaseDoctor360.css";
import "./components/CaseClinicSpots.css";
import "./components/CaseFoodies.css";
import "./components/CaseNaturalAyurved.css";
import "./components/CaseDDBullions.css";
import "./components/CaseGuruTrade.css";
import "./components/CaseClick4Appointment.css";
import "./components/CaseReetSutra.css";
import "./polish.css";

/* each case study loads on demand, so the home page does not download all of them.
   They are also fetched in the background once the page is idle and as soon as a link
   to one is hovered or touched, so opening one does not wait on the network. */
const loaders = {
  About: () => import("./components/About"),
  Products: () => import("./components/Products"),
  Projects: () => import("./components/Projects"),
  ServicesPage: () => import("./components/ServicesPage"),
  ServiceDetail: () => import("./components/ServiceDetail"),
  CaseAtleast80: () => import("./components/CaseAtleast80"),
  CaseVakt: () => import("./components/CaseVakt"),
  CaseVls: () => import("./components/CaseVls"),
  CaseInfocus: () => import("./components/CaseInfocus"),
  CaseModernAuto: () => import("./components/CaseModernAuto"),
  CaseMarutiPay: () => import("./components/CaseMarutiPay"),
  CaseDoctor360: () => import("./components/CaseDoctor360"),
  CaseClick4Appointment: () => import("./components/CaseClick4Appointment"),
  CaseFoodies: () => import("./components/CaseFoodies"),
  CaseNaturalAyurved: () => import("./components/CaseNaturalAyurved"),
  CaseDDBullions: () => import("./components/CaseDDBullions"),
  Careers: () => import("./components/Careers"),
  CaseGuruTrade: () => import("./components/CaseGuruTrade"),
  CaseReetSutra: () => import("./components/CaseReetSutra"),
  CasePharmaTrack: () => import("./components/CasePharmaTrack"),
  BlogsPage: () => import("./components/BlogsPage"),
  BlogDetail: () => import("./components/BlogDetail"),
};
const About = lazy(loaders.About);
const Products = lazy(loaders.Products);
const Projects = lazy(loaders.Projects);
const ServicesPage = lazy(loaders.ServicesPage);
const ServiceDetail = lazy(loaders.ServiceDetail);
const CaseAtleast80 = lazy(loaders.CaseAtleast80);
const CaseVakt = lazy(loaders.CaseVakt);
const CaseVls = lazy(loaders.CaseVls);
const CaseInfocus = lazy(loaders.CaseInfocus);
const CaseModernAuto = lazy(loaders.CaseModernAuto);
const CaseMarutiPay = lazy(loaders.CaseMarutiPay);
const CaseDoctor360 = lazy(loaders.CaseDoctor360);
const CaseClick4Appointment = lazy(loaders.CaseClick4Appointment);
const CaseFoodies = lazy(loaders.CaseFoodies);
const CaseNaturalAyurved = lazy(loaders.CaseNaturalAyurved);
const CaseDDBullions = lazy(loaders.CaseDDBullions);
const Careers = lazy(loaders.Careers);
const CaseGuruTrade = lazy(loaders.CaseGuruTrade);
const CaseReetSutra = lazy(loaders.CaseReetSutra);
const CasePharmaTrack = lazy(loaders.CasePharmaTrack);
const BlogsPage = lazy(loaders.BlogsPage);
const BlogDetail = lazy(loaders.BlogDetail);

const preloadPages = () => Object.values(loaders).forEach((load) => load());

function isAboutHash(hash) {
  return hash === "#about" || hash.startsWith("#about-");
}

function isProductsHash(hash) {
  return hash === "#products" || hash.startsWith("#products-");
}

function isProjectsHash(hash) {
  return hash === "#projects" || hash.startsWith("#projects-") || hash === "#work";
}

/* "#web-development" or "#web-development-capabilities" -> "web-development" */
function serviceDetailSlug(hash) {
  return Object.keys(serviceDetails).find(
    (slug) => hash === `#${slug}` || hash.startsWith(`#${slug}-`)
  );
}

function isServicesHash(hash) {
  return hash === "#services" || hash.startsWith("#services-");
}

function isContactHash(hash) {
  return hash === "#contact";
}

function nextPage(hash) {
  if (hash === "#careers") return "careers";
  if (hash === "#case-atleast80") return "case-atleast80";
  if (hash === "#case-vakt") return "case-vakt";
  if (hash === "#case-vls") return "case-vls";
  if (hash === "#case-infocus") return "case-infocus";
  if (hash === "#case-modern-auto") return "case-modern-auto";
  if (hash === "#case-marutipay") return "case-marutipay";
  if (hash === "#case-doctor360") return "case-doctor360";
  if (hash === "#case-click4appointment" || hash === "#case-clinicspots") return "case-click4appointment";
  if (hash === "#case-foodies") return "case-foodies";
  if (hash === "#case-natural-ayurved") return "case-natural-ayurved";
  if (hash === "#case-dd-bullions") return "case-dd-bullions";
  if (hash === "#case-gurutrade") return "case-gurutrade";
  if (hash === "#case-reetsutra") return "case-reetsutra";
  if (hash === "#case-pharmatrack") return "case-pharmatrack";
  if (hash === "#blogs" || hash.startsWith("#blogs-")) return "blogs";
  if (hash.startsWith("#blog-")) return `blog:${hash.slice(6)}`;
  if (isAboutHash(hash)) return "about";
  if (isProductsHash(hash)) return "products";
  if (isProjectsHash(hash)) return "projects";
  const detail = serviceDetailSlug(hash);
  if (detail) return `detail:${detail}`;
  if (isServicesHash(hash)) return "services";
  if (isContactHash(hash)) return "contact";
  return "home";
}

function resolvePage(pathname, hash) {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (["/enquries/thank-you", "/enquiries/thank-you"].includes(cleanPath)) return "thank-you";
  if (["/enquries", "/enquiries"].includes(cleanPath)) return "enquiries";
  return nextPage(hash);
}

function renderPage(page) {
  return (
    page === "enquiries" ? (
      <LandingPage />
    ) : page === "thank-you" ? (
      <ThankYouPage />
    ) : page === "about" ? (
      <About />
    ) : page === "products" ? (
      <Products />
    ) : page === "projects" ? (
      <Projects />
    ) : page.startsWith("detail:") ? (
      <ServiceDetail key={page} page={serviceDetails[page.slice(7)]} />
    ) : page === "services" ? (
      <ServicesPage />
    ) : page === "contact" ? (
      <Contact />
    ) : page === "careers" ? (
      <Careers />
    ) : page === "case-atleast80" ? (
      <CaseAtleast80 />
    ) : page === "case-vakt" ? (
      <CaseVakt />
    ) : page === "case-vls" ? (
      <CaseVls />
    ) : page === "case-infocus" ? (
      <CaseInfocus />
    ) : page === "case-modern-auto" ? (
      <CaseModernAuto />
    ) : page === "case-marutipay" ? (
      <CaseMarutiPay />
    ) : page === "case-doctor360" ? (
      <CaseDoctor360 />
    ) : page === "case-click4appointment" ? (
      <CaseClick4Appointment />
    ) : page === "case-foodies" ? (
      <CaseFoodies />
    ) : page === "case-natural-ayurved" ? (
      <CaseNaturalAyurved />
    ) : page === "case-dd-bullions" ? (
      <CaseDDBullions />
    ) : page === "case-gurutrade" ? (
      <CaseGuruTrade />
    ) : page === "case-reetsutra" ? (
      <CaseReetSutra />
    ) : page === "case-pharmatrack" ? (
      <CasePharmaTrack />
    ) : page === "blogs" ? (
      <BlogsPage />
    ) : page.startsWith("blog:") ? (
      <BlogDetail key={page} slug={page.slice(5)} />
    ) : (
      <>
        <div className="home-top">
          <Hero />
          <Trusted />
        </div>
        <Impact />
        <Clarity />
        <Stages />
        <OurProcess />
        <Industries />
        <Visionaries />
        <Faq />
      </>
    )
  );
}

/* A case study is kept out of sight until the pictures at the top have arrived (or a few
   seconds have passed), so it appears in one piece instead of building up in front of you. */
function Holding({ onHold }) {
  useLayoutEffect(() => {
    onHold(true);
    return () => onHold(false);
  }, [onHold]);
  return <div className="page-loading" aria-hidden="true" />;
}

function CaseGate({ children, onHold }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    onHold(true);
    return () => onHold(false);
  }, [onHold]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
      onHold(false);
    };
    const near = [...root.querySelectorAll("img")].filter(
      (img) => img.getBoundingClientRect().top < window.innerHeight * 1.5
    );
    const timer = window.setTimeout(finish, 3500);
    Promise.all(
      near.map((img) => (img.complete ? Promise.resolve() : img.decode?.().catch(() => {}) ?? Promise.resolve()))
    ).then(() => {
      window.clearTimeout(timer);
      finish();
    });
    return () => window.clearTimeout(timer);
  }, [onHold]);

  return (
    <div ref={ref} className={ready ? "case-gate is-ready" : "case-gate"}>
      {children}
    </div>
  );
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [page, setPage] = useState(() => resolvePage(window.location.pathname, window.location.hash));
  // true while a page is still on its way; the footer waits so it never shows first
  const [busy, setBusy] = useState(false);

  // once the page has shown and the browser is idle, fetch the pictures further down in the
  // background, so they are already there by the time you scroll to them
  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => window.setTimeout(fn, 800));
    const handle = idle(
      () => {
        document.querySelectorAll('main img[loading="lazy"]').forEach((img) => {
          img.loading = "eager";
        });
      },
      { timeout: 2500 }
    );
    return () => (window.cancelIdleCallback || window.clearTimeout)(handle);
  }, [page]);

  useEffect(() => {
    // a refresh must not bring back the old scroll position: it lands on the footer while a page is still loading
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => window.setTimeout(fn, 1500));
    const handle = idle(preloadPages);
    const warm = (event) => {
      if (event.target.closest?.('a[href^="#case-"], a[href="#careers"]')) preloadPages();
    };
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    return () => {
      (window.cancelIdleCallback || window.clearTimeout)(handle);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("touchstart", warm);
    };
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash;
      // leave the old page's scroll position behind straight away
      if (resolvePage(window.location.pathname, next) !== "home") window.scrollTo({ top: 0, behavior: "instant" });
      setHash(next);
      setPage(resolvePage(window.location.pathname, next));
    };

    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (
      !hash ||
      hash === "#top" ||
      hash === "#about" ||
      hash === "#products" ||
      hash === "#projects" ||
      hash === "#work" ||
      hash === "#contact" ||
      hash === "#careers" ||
      hash === "#services" ||
      hash === "#blogs" ||
      hash.startsWith("#blog-") ||
      Boolean(serviceDetails[hash.slice(1)]) ||
      hash.startsWith("#case-")
    ) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, [hash, page]);

  return (
    <div className={`app${page === "home" ? " is-home" : ""}`}>
      {page !== "enquiries" && page !== "thank-you" && <Navbar />}
      <main>
        <Suspense fallback={<Holding onHold={setBusy} />}>
          {page.startsWith("case-") ? <CaseGate key={page} onHold={setBusy}>{renderPage(page)}</CaseGate> : renderPage(page)}
        </Suspense>
      </main>
      {page !== "enquiries" && page !== "thank-you" && !busy && <Footer />}
    </div>
  );
}

export default App;
