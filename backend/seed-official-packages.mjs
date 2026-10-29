import "dotenv/config";
import { initDatabase, getPool } from "./src/db.js";

const OFFICIAL_PACKAGES = [
  // ==========================================
  // 1. WEBSITE DEVELOPMENT (web-development)
  // ==========================================
  {
    serviceSlug: "web-development",
    packageName: "Static Website (Starter)",
    platform: "Portfolios, small businesses, clinics, coaching",
    whatsIncluded: "Up to 5 pages\nMobile-responsive design\nContact form\nWhatsApp chat button\nBasic SEO\n1 yr free hosting support*\nSSL setup",
    priceInr: "Rs. 9,499 – 14,249",
    priceUsd: "$119 – $179",
    isPopular: false,
    sortOrder: 1,
  },
  {
    serviceSlug: "web-development",
    packageName: "Dynamic Website (Business)",
    platform: "Growing businesses needing content updates",
    whatsIncluded: "Up to 10 pages\nAdmin panel / CMS\nBlog module\nGallery\nEnquiry management\nBasic SEO\nSSL setup\nTraining session",
    priceInr: "Rs. 23,749 – 33,249",
    priceUsd: "$289 – $399",
    isPopular: true,
    sortOrder: 2,
  },
  {
    serviceSlug: "web-development",
    packageName: "E-Commerce Website",
    platform: "Online stores, D2C brands",
    whatsIncluded: "Product catalogue (up to 200 products)\nCart & checkout\nPayment gateway\nOrder & inventory panel\nCustomer login\nCoupon system\nShipping integration",
    priceInr: "Rs. 47,499 – 75,999",
    priceUsd: "$579 – $899",
    isPopular: false,
    sortOrder: 3,
  },
  {
    serviceSlug: "web-development",
    packageName: "Custom Full-Stack Web Application",
    platform: "Startups, portals, marketplaces, SaaS ideas",
    whatsIncluded: "Custom UI/UX\nCustom backend (Node/PHP/Python)\nDatabase design\nUser roles\nDashboards\nREST APIs\nAdmin panel\nDeployment",
    priceInr: "Rs. 85,499 onwards",
    priceUsd: "$1,049 onwards",
    isPopular: false,
    sortOrder: 4,
  },

  // ==========================================
  // 2. MOBILE APPLICATION DEVELOPMENT (mobile-apps)
  // ==========================================
  {
    serviceSlug: "mobile-apps",
    packageName: "Basic Business App",
    platform: "Android",
    whatsIncluded: "Up to 6 screens\nCompany profile, services\nEnquiry form\nPush notifications\nAdmin content control",
    priceInr: "Rs. 37,999 – 52,249",
    priceUsd: "$459 – $629",
    isPopular: false,
    sortOrder: 1,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "Standard App",
    platform: "Android + iOS (Flutter / React Native)",
    whatsIncluded: "Up to 12 screens\nUser login\nDynamic content via API\nNotifications\nAnalytics\nAdmin panel",
    priceInr: "Rs. 71,249 – 94,999",
    priceUsd: "$859 – $1,149",
    isPopular: true,
    sortOrder: 2,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "E-Commerce App",
    platform: "Android + iOS",
    whatsIncluded: "Product listing, cart\nPayment gateway\nOrder tracking, offers\nCustomer accounts\nVendor/admin dashboard",
    priceInr: "Rs. 1,13,999 – 1,70,999",
    priceUsd: "$1,379 – $2,069",
    isPopular: false,
    sortOrder: 3,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "Custom / On-Demand App",
    platform: "Android + iOS",
    whatsIncluded: "Booking, delivery\nService marketplace\nOr any custom concept\nPriced after free requirement study",
    priceInr: "Rs. 1,42,499 onwards",
    priceUsd: "$1,719 onwards",
    isPopular: false,
    sortOrder: 4,
  },

  // ==========================================
  // 3. CUSTOM SOFTWARE, ERP & CRM (enterprise-it)
  // ==========================================
  {
    serviceSlug: "enterprise-it",
    packageName: "CRM System (Standard)",
    platform: "Sales teams, agencies, real estate, education",
    whatsIncluded: "Lead capture & pipeline\nFollow-up reminders\nWhatsApp/email integration\nReports & team roles\nMobile-friendly panel",
    priceInr: "Rs. 56,999 – 85,499",
    priceUsd: "$689 – $1,029",
    isPopular: false,
    sortOrder: 1,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "Billing & Inventory Software",
    platform: "Retail, wholesale, distributors",
    whatsIncluded: "GST invoicing\nStock management\nPurchase & sales reports\nBarcode support\nMulti-user access",
    priceInr: "Rs. 42,749 – 66,499",
    priceUsd: "$519 – $799",
    isPopular: false,
    sortOrder: 2,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "ERP System (Modular)",
    platform: "Manufacturers, schools, hospitals, mid-size firms",
    whatsIncluded: "Choose modules: HR & payroll, accounts, inventory, production, CRM, reporting dashboard\nPrice per 3–4 modules",
    priceInr: "Rs. 1,42,499 – 2,84,999",
    priceUsd: "$1,719 – $3,449",
    isPopular: true,
    sortOrder: 3,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "Hospitality Suite",
    platform: "Restaurants, hotels, cafés, food & stay businesses",
    whatsIncluded: "POS billing & KOT\nTable/room management\nMenu & inventory\nOnline order integration\nSales reports",
    priceInr: "Rs. 66,499 – 1,23,499",
    priceUsd: "$799 – $1,489",
    isPopular: false,
    sortOrder: 4,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "Fully Custom Software",
    platform: "Unique business processes",
    whatsIncluded: "Built from scratch to your workflow\nCustom architecture & database\nRole permissions\nPriced after free requirement study & proposal",
    priceInr: "Rs. 75,999 onwards",
    priceUsd: "$919 onwards",
    isPopular: false,
    sortOrder: 5,
  },

  // ==========================================
  // 4. AI AUTOMATION & WHATSAPP API (ai-automation)
  // ==========================================
  {
    serviceSlug: "ai-automation",
    packageName: "WhatsApp Business API Setup",
    platform: "Official Meta API Integration",
    whatsIncluded: "Official Meta API setup\nGreen-tick application support\nTemplate approvals\nDashboard onboarding",
    priceInr: "Rs. 3,000 one-time",
    priceUsd: "$39 one-time",
    isPopular: false,
    sortOrder: 1,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "WhatsApp Automation Suite",
    platform: "Auto-replies, broadcasts & CRM sync",
    whatsIncluded: "Auto-replies\nBroadcast campaigns\nCatalogue messages\nOrder updates\nCRM sync (per-message Meta charges at actuals)",
    priceInr: "Rs. 14,249 setup + Rs. 1,899/mo",
    priceUsd: "$175 setup + $25/mo",
    isPopular: false,
    sortOrder: 2,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "AI Chatbot (Website / WhatsApp)",
    platform: "Trained on your business data",
    whatsIncluded: "Answers customer queries 24×7\nLead capture & qualification\nHuman handover\nKnowledgebase sync",
    priceInr: "Rs. 23,749 – 47,499",
    priceUsd: "$289 – $579",
    isPopular: true,
    sortOrder: 3,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "AI Workflow Automation",
    platform: "Auto lead follow-ups & sheet automations",
    whatsIncluded: "Auto lead follow-ups\nInvoice/report generation\nEmail & sheet automations\nPer workflow setup",
    priceInr: "Rs. 9,499 – 23,749",
    priceUsd: "$119 – $289",
    isPopular: false,
    sortOrder: 4,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "Custom AI Integration",
    platform: "Document reading, smart search & custom models",
    whatsIncluded: "AI features inside your website/app/software\nDocument reading\nSmart search\nPersonalized recommendations",
    priceInr: "Rs. 33,249 onwards",
    priceUsd: "$399 onwards",
    isPopular: false,
    sortOrder: 5,
  },

  // ==========================================
  // 5. E-COMMERCE & CMS (ecommerce-cms)
  // ==========================================
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Shopify / WooCommerce Store",
    platform: "Web + Mobile Optimized",
    whatsIncluded: "Modern custom storefront\nUp to 50 product catalog\nPayment gateway integration\nShipping & tax setup\nCustomer invoices & orders",
    priceInr: "Rs. 24,999 – 44,999",
    priceUsd: "$299 – $549",
    isPopular: true,
    sortOrder: 1,
  },
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Custom Headless Store",
    platform: "Next.js / Node / Stripe",
    whatsIncluded: "Ultra-fast headless checkout\nReal-time inventory sync\nMulti-currency support\nAutomated cart recovery\nAdvanced ecommerce analytics",
    priceInr: "Rs. 47,499 – 75,999",
    priceUsd: "$579 – $899",
    isPopular: false,
    sortOrder: 2,
  },
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Multi-Vendor Marketplace",
    platform: "Web + Admin + Vendor Portals",
    whatsIncluded: "Vendor self-onboarding\nAutomated commission split\nVendor payout wallet\nCentralized order routing\nMulti-vendor inventory control",
    priceInr: "Rs. 85,499 onwards",
    priceUsd: "$1,049 onwards",
    isPopular: false,
    sortOrder: 3,
  },

  // ==========================================
  // 6. CLOUD & DEVOPS (cloud-devops)
  // ==========================================
  {
    serviceSlug: "cloud-devops",
    packageName: "Cloud Setup & Migration",
    platform: "AWS / GCP / Azure",
    whatsIncluded: "Secure VPC & networking\nCompute & server provisioning\nZero-downtime DB migration\nSSL, CDN & DNS configuration\nBasic backup automation",
    priceInr: "Rs. 18,999 – 34,999",
    priceUsd: "$229 – $419",
    isPopular: false,
    sortOrder: 1,
  },
  {
    serviceSlug: "cloud-devops",
    packageName: "CI/CD & Containerization",
    platform: "Docker / K8s / GitHub Actions",
    whatsIncluded: "Automated test & build pipelines\nDocker containerized architecture\nStaging & production branches\nRolling zero-downtime deployment\nEnvironment secrets security",
    priceInr: "Rs. 32,999 – 54,999",
    priceUsd: "$399 – $659",
    isPopular: true,
    sortOrder: 2,
  },
  {
    serviceSlug: "cloud-devops",
    packageName: "Maintenance & Monitoring (AMC)",
    platform: "Datadog / Prometheus / CloudWatch",
    whatsIncluded: "Real-time uptime & error alerts\nAutomated snapshot recovery\nCloud resource cost reduction\nServer hardening & patch updates\nMonthly infrastructure audit",
    priceInr: "Rs. 14,250 – 28,500 / yr",
    priceUsd: "$175 – $345 / yr",
    isPopular: false,
    sortOrder: 3,
  },
];

async function seed() {
  console.log("Connecting to database...");
  await initDatabase();
  const pool = getPool();

  try {
    console.log("Truncating existing service_packages table...");
    await pool.query("DELETE FROM service_packages");

    console.log("Seeding domestic packages (INR)...");
    for (const p of OFFICIAL_PACKAGES) {
      await pool.query(
        `INSERT INTO service_packages (service_slug, package_name, platform, whats_included, price, is_popular, region, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, 'domestic', ?)`,
        [p.serviceSlug, p.packageName, p.platform, p.whatsIncluded, p.priceInr, p.isPopular ? 1 : 0, p.sortOrder]
      );
    }

    console.log("Seeding international packages (USD)...");
    for (const p of OFFICIAL_PACKAGES) {
      await pool.query(
        `INSERT INTO service_packages (service_slug, package_name, platform, whats_included, price, is_popular, region, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, 'international', ?)`,
        [p.serviceSlug, p.packageName, p.platform, p.whatsIncluded, p.priceUsd, p.isPopular ? 1 : 0, p.sortOrder]
      );
    }

    const [countRows] = await pool.query(
      "SELECT region, COUNT(*) as count FROM service_packages GROUP BY region"
    );
    console.log("Successfully seeded official packages!");
    console.table(countRows);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
