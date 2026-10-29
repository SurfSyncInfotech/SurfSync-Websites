import { useEffect, useRef, useState } from "react";
import clientStories from "./clientStories";
import ameerBrown from "../assets/case-modern-auto/client.jpg";
import swagatArt from "../assets/swagat-suite.webp";
import crmArt from "../assets/crm-card.webp";
import hrmsArt from "../assets/hrms-card.webp";
import patronArt from "../assets/patron-card.webp";
import swagatAction from "../assets/swagat-action.webp";
import hrmsAction from "../assets/hrms-action.webp";
import crmAction from "../assets/crm-action.webp";
import patronAction from "../assets/patron-action.webp";
import patronInbox from "../assets/patron-inbox.png";
import patronCampaign from "../assets/patron-campaign.png";
import patronAuto from "../assets/patron-auto.png";
import patronInsights from "../assets/patron-insights.png";
import patronRowInbox from "../assets/patron-row-inbox.png";
import patronRowCampaign from "../assets/patron-row-campaign.png";
import patronRowTemplates from "../assets/patron-row-templates.png";
import patronRowAuto from "../assets/patron-row-auto.png";
import patronChipMessage from "../assets/patron-chip-message.png";
import patronChipApproved from "../assets/patron-chip-approved.png";
import patronChipDelivered from "../assets/patron-chip-delivered.png";
import patronChipSent from "../assets/patron-chip-sent.png";
import patronShot1 from "../assets/patron-shot-1.webp";
import patronShot2 from "../assets/patron-shot-2.webp";
import crmLead from "../assets/crm-lead.png";
import crmFollow from "../assets/crm-follow.png";
import crmPipeline from "../assets/crm-pipeline.png";
import crmReports from "../assets/crm-reports.png";
import crmCapture from "../assets/crm-capture.png";
import crmPipeRow from "../assets/crm-pipe-row.png";
import crmFollowRow from "../assets/crm-follow-row.png";
import crmReportRow from "../assets/crm-report-row.png";
import crmListLead from "../assets/crm-list-lead.png";
import crmProcess from "../assets/crm-process.png";
import crmChat from "../assets/crm-chat.png";
import crmBars from "../assets/crm-bars.png";
import hrmsProfile from "../assets/hrms-profile.png";
import hrmsLeave from "../assets/hrms-leave.png";
import hrmsAccess from "../assets/hrms-access.png";
import hrmsReport from "../assets/hrms-report.png";
import hrmsGrid from "../assets/hrms-grid.png";
import hrmsAttend from "../assets/hrms-attend.png";
import hrmsDept from "../assets/hrms-dept.png";
import hrmsInsights from "../assets/hrms-insights.png";
import hrmsLive from "../assets/hrms-live.png";
import hrmsHod from "../assets/hrms-hod.png";
import hrmsChart from "../assets/hrms-chart.png";
import hrmsShot1 from "../assets/hrms-shot-1.webp";
import hrmsShot2 from "../assets/hrms-shot-2.webp";
import hrmsShot3 from "../assets/hrms-shot-3.webp";
import hrmsShot4 from "../assets/hrms-shot-4.webp";
import crmShot1 from "../assets/crm-shot-1.webp";
import crmShot2 from "../assets/crm-shot-2.webp";
import crmShot3 from "../assets/crm-shot-3.webp";
import crmShot4 from "../assets/crm-shot-4.webp";
import diwakar from "../assets/visionary-diwakar.webp";
import tableIcon from "../assets/crm-lead.png";
import kitchenIcon from "../assets/crm-follow.png";
import menuIcon from "../assets/menu-icon.png";
import kitchenOrder from "../assets/kitchen-order.png";
import billingIcon from "../assets/billing-icon.png";
import reportsIcon from "../assets/reports-icon.png";
import biryani from "../assets/biryani.webp";
import orderDot from "../assets/order-dot.png";
import billCheck from "../assets/bill-check.png";
import salesBars from "../assets/crm-bars.png";
import shotBoard from "../assets/shot-board.webp";
import shotGuest from "../assets/shot-guest.webp";
import shotKitchen from "../assets/shot-kitchen.webp";
import shotCounter from "../assets/shot-counter.webp";
import "./Products.css";

/* imageClass "is-wide": 3:2 artwork drawn larger and centred under the badge */
const cards = [
  {
    id: "products-swagat",
    n: "1",
    name: "Swagat Suite",
    tone: "peach",
    image: swagatArt,
  },
  {
    id: "products-crm",
    n: "2",
    name: "Sales CRM",
    tone: "sand",
    image: crmArt,
    imageClass: "is-wide",
  },
  {
    id: "products-hrms",
    n: "3",
    name: "HRMS",
    tone: "mint",
    image: hrmsArt,
    imageClass: "is-wide",
  },
  {
    id: "products-patron",
    n: "4",
    name: "PatronPing WhatsApp API",
    tone: "leaf",
    image: patronArt,
    imageClass: "is-wide",
  },
];

const details = {
  "products-swagat": {
    id: "products-swagat",
    tab: "Swagat Suite",
    title: "Swagat suite",
    lead: "QR ordering, kitchen updates, billing and reports - so you can focus on your guests.",
    insideTitle: "What's inside Swagat Suite",
    insideLead:
      "Everything you need to run your restaurant operations smoothly, in one simple platform.",
    seeLead: "A quick look at how swagat suite works in real use.",
    action: swagatAction,
    shots: [shotBoard, shotGuest, shotKitchen, shotCounter],
    points: [
      [tableIcon, "Table QR ordering", "Guests can browse the menu and place orders."],
      [kitchenIcon, "Live kitchen updates", "Orders reach the kitchen in real-time."],
      [billingIcon, "Menu management", "Update prices, photos and availability easily."],
      [salesBars, "Reports and billing", "Track sales, tables and popular items."],
    ],
    rows: [
      {
        icon: menuIcon,
        title: "Menu & QR Ordering",
        text: "Everything you need to run your restaurant operations smoothly.",
        chip: "Chicken Biryani",
        meta: "₹ 200",
        thumb: biryani,
        thumbClass: "inside-dish",
      },
      {
        icon: kitchenOrder,
        title: "Kitchen & Order Management",
        text: "Live order tracking from placed to ready. Keep your kitchen and floor in sync.",
        chip: "Order preparing",
        meta: "Table 4 · 983422",
        thumb: orderDot,
        thumbClass: "inside-seal",
      },
      {
        icon: billingIcon,
        title: "Billing & Customer Records",
        text: "Generate bills, manage table sessions and store customer details in one place.",
        chip: "Bill Generated",
        meta: "#2873 · 2973.00",
        thumb: billCheck,
        thumbClass: "inside-seal",
      },
      {
        icon: reportsIcon,
        title: "Reports & Insights",
        text: "See sales, popular items and peak hours. Plan your menu and staff better.",
        chip: "₹ 92377.00",
        meta: "Sales this week",
        thumb: salesBars,
        thumbClass: "inside-bars",
      },
    ],
  },
  "products-hrms": {
    id: "products-hrms",
    tab: "HRMS",
    title: "HRMS",
    actionTail: "in action.",
    lead: "Manage employee records, attendance, leave, departments, and payroll ready.",
    insideTitle: "What's inside HRMS",
    insideLead:
      "Everything your team needs to manage people and everyday HR operations in one place.",
    seeLead: "A quick look at how HRMS works in real use.",
    action: hrmsAction,
    shots: [hrmsShot1, hrmsShot2, hrmsShot3, hrmsShot4],
    points: [
      [hrmsProfile, "Employee Profiles", "Everything about an employee in one place."],
      [hrmsLeave, "Attendance & Leave", "Track attendance and approvals without paper."],
      [hrmsAccess, "Role-based Access", "HR, managers, and staff see only what they need."],
      [hrmsReport, "Reports & Payroll Export", "Get clean HR data whenever payroll needs it."],
    ],
    rows: [
      {
        icon: hrmsGrid,
        title: "Employee Management",
        text: "Manage employee profiles, departments, roles, contacts.",
        chip: "Diwakar yadav",
        meta: "UIUX Designer Intern",
        thumb: diwakar,
        thumbClass: "inside-face",
      },
      {
        icon: hrmsAttend,
        title: "Attendance & Leave",
        text: "Track daily attendance, leave requests, approvals, and team availability.",
        chip: "Attendance track",
        meta: "Live tracking",
        thumb: hrmsLive,
        thumbClass: "inside-seal",
      },
      {
        icon: hrmsDept,
        title: "Departments & Branches",
        text: "Organize teams by department, location, or branch.",
        chip: "HR Department",
        meta: "List of HOD's",
        thumb: hrmsHod,
        thumbClass: "inside-seal",
      },
      {
        icon: hrmsInsights,
        title: "Reports & Insights",
        text: "View headcount, attendance summaries, leave data, and payroll-ready.",
        chip: "Reports",
        meta: "Documentations of Analysis",
        thumb: hrmsChart,
        thumbClass: "inside-seal",
      },
    ],
  },
  "products-crm": {
    id: "products-crm",
    tab: "Sales CRM",
    title: "Sales CRM",
    orangeTail: true,
    lead: "Track leads, follow-ups, deals, and performance in one simple sales system.",
    insideTitle: "What's inside Sales CRM",
    insideLead:
      "Everything your sales team needs to capture, manage, and convert leads in one place.",
    seeLead: "A quick look at how Sales CRM works in real use.",
    action: crmAction,
    shots: [crmShot1, crmShot2, crmShot3, crmShot4],
    points: [
      [crmLead, "Lead Management", "Capture and organize every lead in one place."],
      [crmFollow, "Follow-up Tracking", "Never miss a call, meeting, or next step."],
      [crmPipeline, "Deal Pipeline", "Move deals forward with a clear visual pipeline."],
      [crmReports, "Sales Reports", "See performance, revenue, and team activity instantly."],
    ],
    rows: [
      {
        title: "Lead Capture",
        text: "Collect leads from website forms, WhatsApp, Facebook, referrals.",
        chip: "List Lead",
        meta: "SurfSync Infotech",
        icon: crmCapture,
        thumb: crmListLead,
        thumbClass: "inside-seal is-card",
      },
      {
        title: "Pipeline Management",
        text: "Track: New Lead → Contacted → Proposal → Negotiation → Won.",
        chip: "systematic process",
        meta: "New → client",
        icon: crmPipeRow,
        thumb: crmProcess,
        thumbClass: "inside-seal",
      },
      {
        title: "Customer & Follow-ups",
        text: "Keep notes, conversations, deal history, tasks, and reminders together.",
        chip: "Requesting Follow up",
        meta: "Hello, how it is going",
        icon: crmFollowRow,
        thumb: crmChat,
        thumbClass: "inside-seal",
      },
      {
        title: "Sales Reports",
        text: "See where your leads come from, what converts, pipeline value, revenue.",
        chip: "Reports Manage",
        meta: "No 1 Infotech",
        icon: crmReportRow,
        thumb: crmBars,
        thumbClass: "inside-seal",
      },
    ],
  },
  "products-patron": {
    id: "products-patron",
    tab: "PatronPing",
    title: "PatronPing WhatsApp API",
    greenTitle: true,
    lead: "Official WhatsApp for orders, login codes, campaigns, and customer conversations.",
    insideTitle: "What's inside PatronPing",
    insideLead:
      "Everything your team needs to manage WhatsApp communication, campaigns, and automation in one place.",
    seeLead: "A quick look at how PatronPing works in real use.",
    shots: [patronShot1, patronShot2, patronShot2, patronShot1],
    action: patronAction,
    points: [
      [patronInbox, "Shared Inbox", "Manage customer conversations from one."],
      [patronCampaign, "Campaigns", "Send approved messages to customer lists."],
      [patronAuto, "Automations", "Trigger welcome messages, reminders, updates."],
      [patronInsights, "Delivery Insights", "See delivered, read, replied, and failed."],
    ],
    rows: [
      {
        title: "Shared WhatsApp Inbox",
        text: "Let the whole team reply from one verified business number.",
        chip: "New message",
        meta: "Rahul · 09:02",
        icon: patronRowInbox,
        thumb: patronChipMessage,
        thumbClass: "inside-seal",
      },
      {
        title: "Campaign Management",
        text: "Upload contact lists and send approved campaigns with clear delivery.",
        chip: "Template approved",
        meta: "Order update · Active",
        icon: patronRowCampaign,
        thumb: patronChipApproved,
        thumbClass: "inside-seal",
      },
      {
        title: "Templates & Approvals",
        text: "Create reusable message templates designed for WhatsApp Business.",
        chip: "Message delivered",
        meta: "#1421 · Delivered",
        icon: patronRowTemplates,
        thumb: patronChipDelivered,
        thumbClass: "inside-seal",
      },
      {
        title: "Automation & Integrations",
        text: "Connect Shopify, Razorpay, Zoho, Sheets, and your existing systems.",
        chip: "Campaign sent",
        meta: "6,430 messages",
        icon: patronRowAuto,
        thumb: patronChipSent,
        thumbClass: "inside-seal",
      },
    ],
  },
};

const tabs = ["products-swagat", "products-hrms", "products-crm", "products-patron"];

function currentDetail() {
  const hash = window.location.hash.replace("#", "");
  return details[hash] || details["products-hrms"];
}

function ChipVisual({ row }) {
  if (row.thumb === "dot") {
    return <span className="chip-live" aria-hidden="true" />;
  }

  if (row.thumb === "building") {
    return (
      <span className="chip-building" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 20.5V9.2L12 4.5l8 4.7v11.3" />
          <path d="M9 20.5v-6h6v6" />
        </svg>
      </span>
    );
  }

  if (row.thumb && row.thumbClass === "inside-bars") {
    return (
      <span className="inside-bars" aria-hidden="true">
        <img loading="lazy" decoding="async" src={row.thumb} alt="" />
      </span>
    );
  }

  if (row.thumb && (row.thumbClass || "inside-seal").includes("inside-seal")) {
    return (
      <span className="seal-box">
        <img loading="lazy" decoding="async" className={row.thumbClass || "inside-seal"} src={row.thumb} alt="" />
      </span>
    );
  }

  if (row.thumb) {
    return <img loading="lazy" decoding="async" className={row.thumbClass || "inside-seal"} src={row.thumb} alt="" />;
  }

  return <span className="chip-blank prod-blank" aria-hidden="true" />;
}

function PointMark({ icon }) {
  if (icon) {
    return (
      <span className="prod-emoji" aria-hidden="true">
        <img loading="lazy" decoding="async" src={icon} alt="" />
      </span>
    );
  }

  return <span className="prod-emoji prod-blank" aria-hidden="true" />;
}

function fitSharpImages(root) {
  const scale = window.devicePixelRatio || 1;
  root.querySelectorAll("img").forEach((img) => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    // client photos fill their square frame (object-fit: cover in the CSS)
    if (img.closest(".prod-person")) return;
    let width = img.naturalWidth / scale;
    const height = img.naturalHeight / scale;
    img.style.maxWidth =
      (img.classList.contains("prod-action-art") &&
        img.closest(".is-patron, .is-swagat, .is-hrms")) ||
      img.closest(".prod-card")
        ? `${width}px`
        : `min(100%, ${width}px)`;
    img.style.maxHeight = `${height}px`;
    if (!img.classList.contains("inside-face")) {
      img.style.objectFit = img.style.objectFit || "contain";
    }
  });
}

function Products() {
  const pageRef = useRef(null);
  const product = currentDetail();

  /* fetch every product's pictures once, so moving between products does not wait on them */
  useEffect(() => {
    Object.values(details).forEach((detail) => {
      [detail.action, ...(detail.shots || [])].forEach((src) => {
        if (src) new Image().src = src;
      });
    });
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const fit = () => fitSharpImages(root);
    fit();
    root.querySelectorAll("img").forEach((img) => {
      if (!img.complete || !img.naturalWidth) {
        img.addEventListener("load", fit, { once: true });
      }
      if (typeof img.decode === "function") {
        img.decode().then(fit).catch(() => {});
      }
    });
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
    };
  }, [product.id]);

  return (
    <div className="products-page" ref={pageRef}>
      <section className="prod-hero">
        <p className="prod-kicker">Products</p>
        <h1>
          Scale Your Business with
          <br />
          <span>AI &amp; Custom Software</span>
        </h1>
        <p>
          Ready products for restaurants, teams, sales, and WhatsApp — so the work you
          already do can move faster.
        </p>
        <a className="prod-btn" href="#products-grid">
          Explore products <span aria-hidden="true">→</span>
        </a>
        <div className="prod-pills">
          <span>
            <i aria-hidden="true" />
            Restaurants
          </span>
          <span>
            <i aria-hidden="true" />
            HR &amp; People
          </span>
          <span>
            <i aria-hidden="true" />
            Sales &amp; CRM
          </span>
        </div>
      </section>

      <section className="prod-four" id="products-grid">
        <div className="prod-four-head">
          <div>
            <p className="prod-kicker">Our products</p>
            <h2>
              Four products
              <br />
              <span>one connected idea</span>
            </h2>
          </div>
          <p>
            From the restaurant floor to HR, sales, and WhatsApp. Four products, one way
            of working.
          </p>
        </div>
        <div className="prod-grid">
          {cards.map((card) => (
            <a className={`prod-cell ${card.tone}`} key={card.id} href={`#${card.id}`}>
              <span className="prod-card">
                {card.image ? <img loading="lazy" decoding="async" className={card.imageClass} src={card.image} alt="" /> : null}
                <span className="prod-badge">
                  <b>{card.n}</b>
                  {card.name}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="prod-platform" id={product.id}>
        <p className="prod-kicker">Explore the products</p>
        <h2>
          One platform. Four ways to
          <br />
          <span>move business forward</span>
        </h2>
        <div className="prod-switch">
          {tabs.map((id) => (
            <a className={product.id === id ? "is-on" : undefined} href={`#${id}`} key={id}>
              {details[id].tab}
            </a>
          ))}
        </div>
      </section>

      <section className={`prod-action is-${product.id.replace("products-", "")}`}>
        <div>
          <p className="prod-kicker">Our products</p>
          <h2>
            {product.greenTitle ? <span>{product.title}</span> : product.title}
            <br />
            {product.orangeTail ? (
              <span>{product.actionTail || "in action"}</span>
            ) : (
              product.actionTail || "in action"
            )}
          </h2>
          <p className="prod-lead">{product.lead}</p>
          <ul className="prod-points">
            {product.points.map(([icon, title, text]) => (
              <li key={title}>
                <PointMark icon={icon} />
                <span>
                  <strong>{title}</strong>
                  {text}
                </span>
              </li>
            ))}
          </ul>
          <a className="prod-btn" href={`#${product.id}`}>
            Explore Products <span aria-hidden="true">→</span>
          </a>
        </div>
        {product.action ? (
          <img loading="lazy" decoding="async" className="prod-action-art" key={product.id} src={product.action} alt="" />
        ) : (
          <div className="prod-blank prod-action-blank" aria-hidden="true" />
        )}
      </section>

      <section
        className={`prod-inside${product.id === "products-hrms" ? " is-hrms" : ""}${
          product.id === "products-crm" ? " is-crm" : ""
        }${product.id === "products-patron" ? " is-patron" : ""}`}
      >
        <h2>{product.insideTitle}</h2>
        <p>{product.insideLead}</p>
        <div className="prod-rows">
          {product.rows.map((row) => (
            <article className="inside-row" key={row.title}>
              <div className="inside-main">
                {row.icon ? (
                  <span className="inside-ico" aria-hidden="true">
                    <img loading="lazy" decoding="async" src={row.icon} alt="" />
                  </span>
                ) : (
                  <span className="inside-ico prod-blank" aria-hidden="true" />
                )}
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.text}</p>
                </div>
              </div>
              <div className="inside-chip">
                <ChipVisual row={row} />
                <span>
                  <strong>{row.chip}</strong>
                  <em>{row.meta}</em>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`prod-shots${product.id === "products-crm" ? " is-crm" : ""}${
          product.id === "products-patron" ? " is-patron" : ""
        }`}
      >
        <h2>
          See it <span>in action</span>
        </h2>
        <p>{product.seeLead}</p>
        <div className="shot-grid">
          {product.shots
            ? product.shots.map((src, index) => (
                <figure key={`${index}-${src || "blank"}`}>
                  {src ? (
                    <img loading="lazy" decoding="async" src={src} alt="" />
                  ) : (
                    <div className="prod-blank shot-blank" aria-hidden="true" />
                  )}
                </figure>
              ))
            : ["Screen 1", "Screen 2", "Screen 3", "Screen 4"].map((label) => (
                <figure key={label}>
                  <div className="prod-blank shot-blank" aria-hidden="true" />
                </figure>
              ))}
        </div>
      </section>

      <ProdProof />
    </div>
  );
}

/* Ameer's photo is the original one on the brown backdrop, as on the Projects page and the case studies */
const clients = clientStories.map((c, k) => (k === 0 ? { ...c, photo: ameerBrown, cutout: false } : c));

/* "What client say": the same two clients as the home page, moved with the two arrows */
function ProdProof() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const client = clients[index];

  const move = (step) => {
    setIndex((i) => (i + step + clients.length) % clients.length);
    setDir(step);
  };

  return (
    <section className="prod-proof">
      <div>
        <p className="prod-kicker">What client say</p>
        <h2>
          Real people.
          <br />
          <span>Real results.</span>
        </h2>
        <p>
          We collaborate, design, and build with intent turning ideas into digital
          products that create real impact.
        </p>
        <div className="proof-nav">
          <button
            type="button"
            className={dir < 0 ? "is-on" : undefined}
            aria-label="Previous testimonial"
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className={dir > 0 ? "is-on" : undefined}
            aria-label="Next testimonial"
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
        <div className="proof-bars" aria-hidden="true">
          {clients.map((item, i) => (
            <i key={item.name} className={i === index ? "is-on" : undefined} />
          ))}
        </div>
      </div>
      <blockquote key={client.name} aria-live="polite">
        <div className={`prod-person${client.cutout ? " is-cutout" : ""}`}>
          <img loading="lazy" decoding="async" src={client.photo} alt={client.name} />
        </div>
        <div>
          <p>“{client.quote}”</p>
          <footer>
            <strong>{client.name}</strong>
            <span>{client.company}</span>
            <b aria-label="5 stars">★★★★★</b>
          </footer>
        </div>
      </blockquote>
    </section>
  );
}

export default Products;
