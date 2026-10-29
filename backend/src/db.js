import mysql from "mysql2/promise";

const seedJobs = [
  {
    icon: "pencil",
    title: "Product Designer",
    type: "Full-time",
    area: "Design",
    place: "Hybrid",
    doing: [
      "Craft intuitive user journeys and interfaces for web and mobile products.",
      "Work closely with product and engineering teams to prototype and validate ideas.",
      "Improve existing products through user feedback and design iterations.",
    ],
    looking: [
      "A strong portfolio showcasing your design process and problem-solving.",
      "Good understanding of interaction and visual design principles.",
      "Clear communication skills and a curiosity to learn and grow.",
    ],
    about:
      "You’ll work on diverse projects across industries, from early concepts to real-world products, and help shape user experiences that make an impact.",
  },
  {
    icon: "code",
    title: "Frontend Developer",
    type: "Full-time",
    area: "Engineering",
    place: "Hybrid",
    doing: [
      "Build fast, accessible interfaces for web products using React.",
      "Turn design files into pixel-accurate, responsive screens.",
      "Work with backend and design teammates to ship features end to end.",
    ],
    looking: [
      "Solid experience with React, modern JavaScript, and CSS.",
      "An eye for detail and care about performance and accessibility.",
      "Comfort giving and receiving feedback in code reviews.",
    ],
    about:
      "You’ll join a team that ships web products for clients across industries, with room to own features from first sketch to launch.",
  },
  {
    icon: "robot",
    title: "AI Automation Intern",
    type: "Internship",
    area: "AI & Automation",
    place: "Hybrid",
    doing: [
      "Help build and test automation workflows and AI-assisted tools.",
      "Research models, prompts, and integrations for client use cases.",
      "Document what works so the team can reuse it.",
    ],
    looking: [
      "Basic Python or JavaScript and an interest in applied AI.",
      "Curiosity about how automation can remove repetitive work.",
      "Willingness to learn quickly with mentoring from the team.",
    ],
    about:
      "This internship gives hands-on experience with real client automation projects, guided by engineers who build them every day.",
  },
  {
    icon: "chart",
    title: "Business Development Executive",
    type: "Full-time",
    area: "Growth",
    place: "Noida",
    doing: [
      "Identify and reach out to potential clients for our digital services.",
      "Understand client needs and work with the team on proposals.",
      "Keep the pipeline organised and follow up consistently.",
    ],
    looking: [
      "Strong communication and relationship-building skills.",
      "An interest in technology products and how they solve business problems.",
      "Self-driven and comfortable working towards targets.",
    ],
    about:
      "You’ll be the first point of contact for new clients and help grow SurfSync’s presence across industries.",
  },
];

const seedFaqs = [
  {
    question: "What is the interview process like?",
    answer:
      "We start with a short intro call, followed by a conversation with the team and, for some roles, a small practical task. We keep you updated at every step.",
  },
  {
    question: "Can I apply for more than one role?",
    answer:
      "I work with clients globally. I have experience collaborating with businesses and individuals across different time zones, utilizing digital communication tools like Zoom, Slack, and email to ensure seamless project management.",
  },
  {
    question: "Do you offer internships?",
    answer:
      "Yes. We offer internships in areas like AI and automation, design, and engineering. Select the internship role above to apply.",
  },
  {
    question: "What if there’s no role for me right now?",
    answer:
      "Send us your portfolio or LinkedIn profile with a short note about what you’d like to work on, and we’ll keep it on file for future openings.",
  },
];

const seedPackages = [
  // Mobile App Development
  {
    serviceSlug: "mobile-apps",
    packageName: "Basic Business App",
    platform: "Android",
    whatsIncluded: "Up to 6 screens, company profile, services, enquiry form, push notifications, admin content control",
    price: "Rs. 37,999 – 52,249",
    sortOrder: 1,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "Standard App",
    platform: "Android + iOS (Flutter / React Native)",
    whatsIncluded: "Up to 12 screens, user login, dynamic content via API, notifications, analytics, admin panel",
    price: "Rs. 71,249 – 94,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "E-Commerce App",
    platform: "Android + iOS",
    whatsIncluded: "Product listing, cart, payment gateway, order tracking, offers, customer accounts, vendor/admin dashboard",
    price: "Rs. 1,13,999 – 1,70,999",
    sortOrder: 3,
  },
  {
    serviceSlug: "mobile-apps",
    packageName: "Custom / On-Demand App",
    platform: "Android + iOS",
    whatsIncluded: "Booking, delivery, service marketplace or any custom concept — priced after free requirement study",
    price: "Rs. 1,42,499 onwards",
    sortOrder: 4,
  },
  // Web App Development
  {
    serviceSlug: "web-development",
    packageName: "Starter Business Website",
    platform: "Web (React / Next.js)",
    whatsIncluded: "Up to 5 responsive pages, contact forms, SEO setup, domain & hosting configuration",
    price: "Rs. 24,999 – 39,999",
    sortOrder: 1,
  },
  {
    serviceSlug: "web-development",
    packageName: "Dynamic Web App",
    platform: "Full Stack (MERN)",
    whatsIncluded: "Interactive portal, user auth, dashboard, database integration, API development",
    price: "Rs. 59,999 – 89,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "web-development",
    packageName: "Custom Enterprise Web Solution",
    platform: "Cloud Native Web",
    whatsIncluded: "High traffic architecture, role-based access, automated workflows, third-party ERP/CRM integration",
    price: "Rs. 1,29,999 onwards",
    sortOrder: 3,
  },
  // E-commerce & CMS
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Shopify / WooCommerce Store",
    platform: "Web + Mobile Optimized",
    whatsIncluded: "Modern theme setup, up to 50 products, payment gateway, shipping rules, invoice setup",
    price: "Rs. 34,999 – 49,999",
    sortOrder: 1,
  },
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Custom Headless E-Commerce",
    platform: "React / Node / Stripe",
    whatsIncluded: "Ultra-fast headless storefront, inventory sync, custom checkout, analytics integration",
    price: "Rs. 89,999 – 1,39,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "ecommerce-cms",
    packageName: "Multi-Vendor Marketplace",
    platform: "Web + Admin + Vendor Portals",
    whatsIncluded: "Vendor onboarding, commission tracking, wallet system, order routing, analytics",
    price: "Rs. 1,79,999 onwards",
    sortOrder: 3,
  },
  // AI & Automation
  {
    serviceSlug: "ai-automation",
    packageName: "AI Workflow Automation",
    platform: "Python / n8n / Zapier",
    whatsIncluded: "Automated document processing, email classification, data syncing across tools",
    price: "Rs. 29,999 – 49,999",
    sortOrder: 1,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "Custom AI Agent / Chatbot",
    platform: "LLM / OpenAI / Claude API",
    whatsIncluded: "Trained on company knowledge base, customer support, lead qualification, CRM sync",
    price: "Rs. 69,999 – 99,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "ai-automation",
    packageName: "Enterprise AI Pipeline",
    platform: "Custom Fine-tuning / Cloud",
    whatsIncluded: "Proprietary data pipelines, automated intelligence reports, multi-agent orchestration",
    price: "Rs. 1,49,999 onwards",
    sortOrder: 3,
  },
  // Cloud & DevOps
  {
    serviceSlug: "cloud-devops",
    packageName: "Cloud Setup & Migration",
    platform: "AWS / GCP / Azure",
    whatsIncluded: "Secure VPC setup, compute instances, database migration, SSL & CDN configuration",
    price: "Rs. 39,999 – 59,999",
    sortOrder: 1,
  },
  {
    serviceSlug: "cloud-devops",
    packageName: "CI/CD & Containerization",
    platform: "Docker / Kubernetes / GitHub Actions",
    whatsIncluded: "Automated pipelines, staging/production environments, zero-downtime deployment",
    price: "Rs. 64,999 – 89,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "cloud-devops",
    packageName: "24/7 Cloud Support & Monitoring",
    platform: "Datadog / Prometheus / CloudWatch",
    whatsIncluded: "Uptime monitoring, disaster recovery planning, cost optimization, incident support",
    price: "Rs. 24,999 / month",
    sortOrder: 3,
  },
  // Enterprise IT Solutions
  {
    serviceSlug: "enterprise-it",
    packageName: "IT Infrastructure & Security Audit",
    platform: "On-Premise / Hybrid Cloud",
    whatsIncluded: "Architecture audit, security baseline review, vulnerability scan, compliance checklist",
    price: "Rs. 49,999 – 79,999",
    sortOrder: 1,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "Custom ERP / CRM Integration",
    platform: "Enterprise API Layer",
    whatsIncluded: "Centralized database, custom APIs connecting billing, inventory, HRMS, and operations",
    price: "Rs. 1,19,999 – 1,89,999",
    sortOrder: 2,
  },
  {
    serviceSlug: "enterprise-it",
    packageName: "Managed Enterprise Support (SLA)",
    platform: "Dedicated Support Engineers",
    whatsIncluded: "Priority SLA, automated backups, system hardening, regular maintenance & upgrades",
    price: "Rs. 45,000 / month",
    sortOrder: 3,
  },
];

export function jobMeta(area, type, place) {
  return [area, type, place].filter(Boolean).join(" · ");
}

export function mapJob(row) {
  return {
    id: row.id,
    icon: row.icon,
    title: row.title,
    meta: row.meta,
    type: row.job_type,
    area: row.area,
    place: row.place,
    doing: parseJson(row.doing_json),
    looking: parseJson(row.looking_json),
    about: row.about,
    active: Boolean(row.is_active),
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapFaq(row) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

export function mapApplication(row) {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: row.job_title,
    name: row.full_name,
    email: row.email,
    link: row.portfolio_url,
    why: row.why_surfsync,
    resumeName: row.resume_original_name,
    hasResume: Boolean(row.resume_stored_name),
    createdAt: row.created_at,
  };
}

export function mapInquiry(row) {
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    code: row.country_code || "+91",
    phone: row.phone,
    service: row.service,
    message: row.message,
    status: row.status || "new",
    createdAt: row.created_at,
  };
}

export function mapPackage(row) {
  return {
    id: row.id,
    serviceSlug: row.service_slug,
    packageName: row.package_name,
    platform: row.platform,
    whatsIncluded: row.whats_included,
    price: row.price,
    sortOrder: row.sort_order,
    isPopular: Boolean(row.is_popular),
    region: row.region || "domestic",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapBlog(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    imageUrl: row.image_url,
    videoUrl: row.video_url || "",
    shortDescription: row.short_description,
    content: row.content,
    author: row.author || "SurfSync Team",
    isPublished: Boolean(row.is_published),
    sortOrder: row.sort_order || 0,
    region: row.region || "both",
    publishedAt: row.published_at || row.created_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function parseJson(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

let pool;

export function getPool() {
  if (!pool) {
    throw new Error("Database is not ready.");
  }
  return pool;
}

export async function initDatabase() {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || "surfsyncinfotech";

  try {
    const bootstrap = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await bootstrap.end();
  } catch (_bootstrapErr) {
    // Non-root user or database already created on remote server
  }

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      icon VARCHAR(32) NOT NULL,
      title VARCHAR(160) NOT NULL,
      meta VARCHAR(220) NOT NULL,
      job_type VARCHAR(40) NOT NULL,
      area VARCHAR(80) NOT NULL,
      place VARCHAR(80) NOT NULL,
      doing_json JSON NOT NULL,
      looking_json JSON NOT NULL,
      about TEXT NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question VARCHAR(300) NOT NULL,
      answer TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      job_id INT NULL,
      job_title VARCHAR(160) NOT NULL,
      full_name VARCHAR(160) NOT NULL,
      email VARCHAR(190) NOT NULL,
      portfolio_url VARCHAR(500) NOT NULL DEFAULT '',
      why_surfsync VARCHAR(600) NOT NULL DEFAULT '',
      resume_original_name VARCHAR(255) NULL,
      resume_stored_name VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_applications_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(160) NOT NULL,
      email VARCHAR(190) NOT NULL,
      country_code VARCHAR(10) NOT NULL DEFAULT '+91',
      phone VARCHAR(30) NOT NULL,
      service VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_packages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_slug VARCHAR(64) NOT NULL,
      package_name VARCHAR(160) NOT NULL,
      platform VARCHAR(120) NOT NULL,
      whats_included TEXT NOT NULL,
      price VARCHAR(120) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      region VARCHAR(20) NOT NULL DEFAULT 'domestic',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_service_packages_slug (service_slug, sort_order),
      INDEX idx_service_packages_region (region, service_slug, sort_order)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      image_url VARCHAR(500) NOT NULL,
      video_url VARCHAR(500) NULL,
      short_description TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      author VARCHAR(100) NOT NULL DEFAULT 'SurfSync Team',
      is_published TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      region VARCHAR(20) NOT NULL DEFAULT 'both',
      published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_blogs_slug (slug),
      INDEX idx_blogs_published (is_published, sort_order),
      INDEX idx_blogs_region (region, is_published, sort_order)
    )
  `);

  const [jobCount] = await pool.query("SELECT COUNT(*) AS total FROM jobs");
  if (jobCount[0].total === 0) {
    for (const [index, job] of seedJobs.entries()) {
      await pool.query(
        `INSERT INTO jobs (icon, title, meta, job_type, area, place, doing_json, looking_json, about, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        [
          job.icon,
          job.title,
          jobMeta(job.area, job.type, job.place),
          job.type,
          job.area,
          job.place,
          JSON.stringify(job.doing),
          JSON.stringify(job.looking),
          job.about,
          index + 1,
        ]
      );
    }
  }

  const [faqCount] = await pool.query("SELECT COUNT(*) AS total FROM faqs");
  if (faqCount[0].total === 0) {
    for (const [index, faq] of seedFaqs.entries()) {
      await pool.query(
        "INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)",
        [faq.question, faq.answer, index + 1]
      );
    }
  }

  const [pkgCount] = await pool.query("SELECT COUNT(*) AS total FROM service_packages");
  if (pkgCount[0].total === 0) {
    for (const pkg of seedPackages) {
      await pool.query(
        `INSERT INTO service_packages (service_slug, package_name, platform, whats_included, price, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [pkg.serviceSlug, pkg.packageName, pkg.platform, pkg.whatsIncluded, pkg.price, pkg.sortOrder]
      );
    }
  }

  const [blogCount] = await pool.query("SELECT COUNT(*) AS total FROM blogs");
  if (blogCount[0].total === 0) {
    const seedBlogs = [
      {
        title: "How Custom Mobile & Web Apps Accelerate Modern Businesses in 2026",
        slug: "how-custom-apps-accelerate-modern-businesses-2026",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "",
        shortDescription: "Discover how scalable architecture, custom APIs, and tailored UX transform standard operations into high-performing digital powerhouses.",
        content: "In today’s hyper-competitive digital landscape, off-the-shelf software often creates bottlenecks that prevent companies from scaling smoothly.\n\nCustom web and mobile solutions allow businesses to control their data, streamline customer interactions, and deploy specialized workflows that reflect their unique value proposition.\n\nFrom automated inventory management to dedicated client self-service portals, custom apps deliver measured efficiency gains and long-term cost advantages.\n\nKey takeaways for 2026:\n1. Dedicated architecture tailored to business goals\n2. Real-time API integrations that break down data silos\n3. Consistent cross-platform user experience across iOS, Android, and web.",
        author: "SurfSync Engineering",
        sortOrder: 1,
      },
      {
        title: "AI & Workflow Automation: Practical Guide for Growing Enterprises",
        slug: "ai-workflow-automation-practical-guide",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "",
        shortDescription: "A pragmatic approach to integrating intelligent document parsing, customer triage bots, and automated pipelines into daily workflows.",
        content: "Artificial intelligence has moved from experimental hype to practical, everyday business utility.\n\nEnterprises are seeing immediate returns not from trying to replace entire teams, but by eliminating tedious repetitive tasks such as invoice processing, lead qualification, and cross-platform data synchronization.\n\nBy connecting your existing CRM and database to smart automated webhooks, response times decrease by up to 80% while error rates drop significantly.\n\nStart small, measure outcomes, and scale the automation across departments.",
        author: "SurfSync Insights",
        sortOrder: 2,
      },
    ];

    for (const b of seedBlogs) {
      await pool.query(
        `INSERT INTO blogs (title, slug, image_url, video_url, short_description, content, author, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [b.title, b.slug, b.imageUrl, b.videoUrl, b.shortDescription, b.content, b.author, b.sortOrder]
      );
    }
  }
}
