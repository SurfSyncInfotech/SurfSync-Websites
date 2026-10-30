import fs from "fs";
import path from "path";
import { Router } from "express";
import multer from "multer";
import { checkAdminLogin, requireAdmin, requireRole, signToken } from "./auth.js";
import { getPool, jobMeta, mapApplication, mapBlog, mapFaq, mapInquiry, mapJob, mapPackage, mapProject } from "./db.js";

const ICONS = ["pencil", "code", "robot", "chart", "leaf", "route", "clipboard"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, path.resolve("uploads")),
    filename: (_req, file, cb) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}.pdf`;
      cb(null, id);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const pdf = file.mimetype === "application/pdf" || /\.pdf$/i.test(file.originalname);
    cb(pdf ? null : new Error("Please upload a PDF file."), pdf);
  },
});

const blogUploadDir = path.resolve("uploads", "blogs");
if (!fs.existsSync(blogUploadDir)) {
  fs.mkdirSync(blogUploadDir, { recursive: true });
}

const blogMediaUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, blogUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const cleanBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .slice(0, 50);
      const filename = `${Date.now()}-${cleanBase}${ext}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for high-res images & videos
  fileFilter: (_req, file, cb) => {
    const isImage = /image\/(jpeg|jpg|png|webp|gif|svg\+xml)/i.test(file.mimetype) || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.originalname);
    const isVideo = /video\/(mp4|webm|quicktime|x-matroska)/i.test(file.mimetype) || /\.(mp4|webm|mov|mkv)$/i.test(file.originalname);
    if (isImage || isVideo) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image (JPG, PNG, WebP) or video (MP4, WebM) file."));
    }
  },
});

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function blogInput(body) {
  const title = clean(body.title, 255);
  let slug = clean(body.slug, 255);
  if (!slug && title) slug = slugify(title);
  const imageUrl = clean(body.imageUrl || body.image_url, 500);
  const videoUrl = clean(body.videoUrl || body.video_url, 500);
  const shortDescription = String(body.shortDescription || body.short_description || "").trim();
  const content = String(body.content || "").trim();
  const author = clean(body.author, 100) || "SurfSync Team";
  const region = clean(body.region, 20) || "both";
  const isPublished = body.isPublished === false || body.isPublished === 0 || body.isPublished === "0" ? 0 : 1;
  const sortOrder = Number.isFinite(Number(body.sortOrder ?? body.sort_order))
    ? Number(body.sortOrder ?? body.sort_order)
    : 0;

  if (!title) return { error: "Enter blog title." };
  if (!slug) return { error: "Enter a valid slug for the blog." };
  if (!imageUrl) return { error: "Provide a featured image for the blog." };
  if (!shortDescription) return { error: "Enter a short description." };
  if (!content) return { error: "Enter the full description / content." };

  return {
    value: { title, slug, imageUrl, videoUrl, shortDescription, content, author, region, isPublished, sortOrder },
  };
}

function lines(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

function jobInput(body) {
  const title = clean(body.title, 160);
  const type = clean(body.type, 40);
  const area = clean(body.area, 80);
  const place = clean(body.place, 80);
  const about = clean(body.about, 4000);
  const icon = ICONS.includes(body.icon) ? body.icon : "pencil";
  const doing = lines(body.doing).slice(0, 12);
  const looking = lines(body.looking).slice(0, 12);
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
  const active = body.active === false || body.active === 0 || body.active === "0" ? 0 : 1;

  if (title.length < 2) return { error: "Enter a job title." };
  if (!type) return { error: "Enter the job type." };
  if (!area) return { error: "Enter the team or area." };
  if (!place) return { error: "Enter the location." };
  if (!doing.length) return { error: "Add at least one responsibility." };
  if (!looking.length) return { error: "Add at least one requirement." };
  if (about.length < 10) return { error: "Add a short description of the role." };

  return {
    value: {
      icon,
      title,
      meta: jobMeta(area, type, place),
      type,
      area,
      place,
      doing,
      looking,
      about,
      active,
      sortOrder,
    },
  };
}

function packageInput(body) {
  const serviceSlug = clean(body.serviceSlug || body.service_slug, 64);
  const packageName = clean(body.packageName || body.package_name, 160);
  const platform = clean(body.platform, 120);
  const whatsIncluded = clean(body.whatsIncluded || body.whats_included, 2000);
  const price = clean(body.price, 120);
  const sortOrder = Number.isFinite(Number(body.sortOrder ?? body.sort_order))
    ? Number(body.sortOrder ?? body.sort_order)
    : 0;
  const isPopular = body.isPopular === true || body.isPopular === 1 || body.isPopular === "1" ? 1 : 0;
  const region = clean(body.region, 20) || "domestic";

  if (!serviceSlug) return { error: "Select a service." };
  if (!packageName) return { error: "Enter package name." };
  if (!platform) return { error: "Enter platform." };
  if (!whatsIncluded) return { error: "Enter what's included in this package." };
  if (!price) return { error: "Enter package price." };

  return {
    value: { serviceSlug, packageName, platform, whatsIncluded, price, sortOrder, isPopular, region },
  };
}

const PROJECT_CATEGORIES = ["Healthcare", "FinTech", "Food", "E-commerce", "Others"];

const projectUploadDir = path.resolve("uploads", "projects");
if (!fs.existsSync(projectUploadDir)) {
  fs.mkdirSync(projectUploadDir, { recursive: true });
}

const projectImageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, projectUploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const cleanBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .slice(0, 50);
      cb(null, `${Date.now()}-${cleanBase}${ext}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isImage = /image\/(jpeg|jpg|png|webp|gif|svg\+xml)/i.test(file.mimetype) || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.originalname);
    cb(isImage ? null : new Error("Please upload an image (JPG, PNG, WebP, SVG)."), isImage);
  },
});

function pairs(value, max) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({ title: clean(item?.title, 120), text: clean(item?.text, 600) }))
    .filter((item) => item.title || item.text)
    .slice(0, max);
}

function caseInput(body) {
  const c = body && typeof body === "object" ? body : {};
  return {
    subtitle: clean(c.subtitle, 200),
    intro: clean(c.intro, 2000),
    heroImage: clean(c.heroImage, 500),
    tags: lines(c.tags).slice(0, 8),
    stats: Array.isArray(c.stats)
      ? c.stats
          .map((item) => ({ value: clean(item?.value, 20), label: clean(item?.label, 80) }))
          .filter((item) => item.value || item.label)
          .slice(0, 4)
      : [],
    needLead: clean(c.needLead, 200),
    needText: clean(c.needText, 2000),
    quote: clean(c.quote, 300),
    needs: pairs(c.needs, 4),
    processText: clean(c.processText, 2000),
    steps: pairs(c.steps, 3),
    productTitle: clean(c.productTitle, 160),
    productHighlight: clean(c.productHighlight, 160),
    productText: clean(c.productText, 3000),
    productImage: clean(c.productImage, 500),
    roles: pairs(c.roles, 3),
    featureImages: lines(c.featureImages).slice(0, 6),
    tools: lines(c.tools).slice(0, 12),
    liveUrl: clean(c.liveUrl, 500),
  };
}

function projectInput(body) {
  const title = clean(body.title, 160);
  const slug = slugify(clean(body.slug, 180) || title);
  const category = PROJECT_CATEGORIES.includes(body.category) ? body.category : "";
  const tags = lines(body.tags).slice(0, 6);
  const shortDescription = clean(body.shortDescription, 1000);
  const cardImage = clean(body.cardImage, 500);
  const cardStyle = body.cardStyle === "mini" ? "mini" : "feature";
  const cardNote = clean(body.cardNote, 160);
  const region = ["both", "domestic", "international"].includes(body.region) ? body.region : "both";
  const isPublished = body.isPublished === false || body.isPublished === 0 || body.isPublished === "0" ? 0 : 1;
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
  const hasCaseStudy = body.hasCaseStudy === true || body.hasCaseStudy === 1 || body.hasCaseStudy === "1" ? 1 : 0;
  const caseStudy = caseInput(body.caseStudy);

  if (!category) return { error: "Choose a category." };
  if (title.length < 2) return { error: "Enter the project name." };
  if (!slug) return { error: "Enter a valid slug." };
  if (!cardImage) return { error: "Upload the project card image." };
  if (!shortDescription) return { error: "Enter a short card description." };
  if (hasCaseStudy && !caseStudy.heroImage) return { error: "Upload the case study hero image." };
  if (hasCaseStudy && !caseStudy.intro) return { error: "Enter the case study introduction." };

  return {
    value: { title, slug, category, tags, shortDescription, cardImage, cardStyle, cardNote, region, isPublished, sortOrder, hasCaseStudy, caseStudy },
  };
}

async function uniqueProjectSlug(slug, id = 0) {
  const [rows] = await getPool().query("SELECT id FROM projects WHERE slug = ? AND id != ?", [slug, id]);
  return rows.length ? `${slug}-${Date.now().toString().slice(-4)}` : slug;
}

function projectFiles(row) {
  const caseStudy = mapProject(row).caseStudy;
  return [row.card_image, caseStudy.heroImage, caseStudy.productImage, ...(caseStudy.featureImages || [])].filter(
    (url) => typeof url === "string" && url.startsWith("/uploads/projects/")
  );
}

export function publicRouter() {
  const router = Router();

  router.get("/blogs", async (req, res, next) => {
    try {
      const region = clean(req.query.region, 20);
      let query = "SELECT id, title, slug, image_url, video_url, short_description, author, region, is_published, sort_order, published_at, created_at FROM blogs WHERE is_published = 1";
      const params = [];
      if (region === "domestic") {
        query += " AND (region = 'domestic' OR region = 'both' OR region IS NULL OR region = '')";
      } else if (region === "international") {
        query += " AND (region = 'international' OR region = 'both')";
      }
      query += " ORDER BY sort_order ASC, published_at DESC, id DESC";
      const [rows] = await getPool().query(query, params);
      res.json(rows.map(mapBlog));
    } catch (error) {
      next(error);
    }
  });

  router.get("/blogs/:slug", async (req, res, next) => {
    try {
      const slug = clean(req.params.slug, 255);
      const [rows] = await getPool().query(
        "SELECT * FROM blogs WHERE slug = ? AND is_published = 1 LIMIT 1",
        [slug]
      );
      if (!rows.length) {
        res.status(404).json({ error: "Blog post not found." });
        return;
      }
      res.json(mapBlog(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.get("/packages", async (req, res, next) => {
    try {
      const slug = clean(req.query.service, 64);
      const region = clean(req.query.region, 20);
      let query = "SELECT * FROM service_packages";
      const conditions = [];
      const params = [];
      if (slug) {
        conditions.push("service_slug = ?");
        params.push(slug);
      }
      if (region) {
        conditions.push("region = ?");
        params.push(region);
      }
      if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
      }
      query += " ORDER BY sort_order ASC, id ASC";
      const [rows] = await getPool().query(query, params);
      res.json(rows.map(mapPackage));
    } catch (error) {
      next(error);
    }
  });

  router.get("/services/:slug/packages", async (req, res, next) => {
    try {
      const slug = clean(req.params.slug, 64);
      const region = clean(req.query.region, 20) || "domestic";
      const [rows] = await getPool().query(
        "SELECT * FROM service_packages WHERE service_slug = ? AND region = ? ORDER BY sort_order ASC, id ASC",
        [slug, region]
      );
      res.json(rows.map(mapPackage));
    } catch (error) {
      next(error);
    }
  });

  router.get("/projects", async (req, res, next) => {
    try {
      const region = clean(req.query.region, 20);
      let query = "SELECT * FROM projects WHERE is_published = 1";
      if (region === "domestic") query += " AND region IN ('domestic', 'both')";
      else if (region === "international") query += " AND region IN ('international', 'both')";
      query += " ORDER BY sort_order ASC, id ASC";
      const [rows] = await getPool().query(query);
      res.json(rows.map(mapProject));
    } catch (error) {
      next(error);
    }
  });

  router.get("/projects/:slug", async (req, res, next) => {
    try {
      const [rows] = await getPool().query(
        "SELECT * FROM projects WHERE slug = ? AND is_published = 1 LIMIT 1",
        [clean(req.params.slug, 180)]
      );
      if (!rows.length) {
        res.status(404).json({ error: "Project not found." });
        return;
      }
      res.json(mapProject(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.get("/jobs", async (_req, res, next) => {
    try {
      const [rows] = await getPool().query(
        "SELECT * FROM jobs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC"
      );
      res.json(rows.map(mapJob));
    } catch (error) {
      next(error);
    }
  });

  router.get("/faqs", async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC");
      res.json(rows.map(mapFaq));
    } catch (error) {
      next(error);
    }
  });

  router.post("/applications", (req, res, next) => {
    upload.single("resume")(req, res, (error) => {
      if (error) {
        const message = error.code === "LIMIT_FILE_SIZE" ? "That file is over 5 MB. Please upload a smaller PDF." : error.message;
        res.status(400).json({ error: message });
        return;
      }
      saveApplication(req, res).catch(async (saveError) => {
        if (req.file) await fs.promises.unlink(req.file.path).catch(() => {});
        next(saveError);
      });
    });
  });

  router.post("/contact", async (req, res, next) => {
    try {
      const name = clean(req.body.name, 160);
      const email = clean(req.body.email, 190);
      const code = clean(req.body.code || "+91", 10);
      const phone = clean(req.body.phone, 30);
      const service = clean(req.body.service, 100);
      const message = clean(req.body.message, 2000);

      if (name.length < 2) {
        res.status(400).json({ error: "Please enter your name." });
        return;
      }
      if (!EMAIL.test(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }
      if (phone.length < 5) {
        res.status(400).json({ error: "Please enter a valid phone number." });
        return;
      }
      if (!service) {
        res.status(400).json({ error: "Please select a service." });
        return;
      }
      if (message.length < 5) {
        res.status(400).json({ error: "Please tell us a bit about your project requirements." });
        return;
      }

      const [result] = await getPool().query(
        "INSERT INTO contact_inquiries (full_name, email, country_code, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, code, phone, service, message]
      );

      res.status(201).json({ ok: true, id: result.insertId });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

async function removeUpload(req) {
  if (req.file) await fs.promises.unlink(req.file.path).catch(() => {});
}

async function saveApplication(req, res) {
  const name = clean(req.body.name, 160);
  const email = clean(req.body.email, 190);
  const link = clean(req.body.link, 500);
  const why = clean(req.body.why, 600);
  const jobId = Number(req.body.jobId);

  if (name.length < 2) {
    await removeUpload(req);
    res.status(400).json({ error: "Please enter your full name." });
    return;
  }
  if (!EMAIL.test(email)) {
    await removeUpload(req);
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }
  if (!Number.isInteger(jobId)) {
    await removeUpload(req);
    res.status(400).json({ error: "Choose a role before applying." });
    return;
  }

  const [jobs] = await getPool().query("SELECT id, title FROM jobs WHERE id = ? AND is_active = 1", [jobId]);
  if (!jobs.length) {
    await removeUpload(req);
    res.status(400).json({ error: "That role is no longer open." });
    return;
  }

  await getPool().query(
    `INSERT INTO applications
      (job_id, job_title, full_name, email, portfolio_url, why_surfsync, resume_original_name, resume_stored_name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      jobs[0].id,
      jobs[0].title,
      name,
      email,
      link,
      why,
      req.file ? req.file.originalname.slice(0, 255) : null,
      req.file ? req.file.filename : null,
    ]
  );

  res.status(201).json({ ok: true });
}

export function adminRouter() {
  const router = Router();

  router.post("/login", (req, res) => {
    const email = clean(req.body?.email, 190);
    const password = String(req.body?.password || "");
    const requestedRole = clean(req.body?.role, 30) || "manager";

    const auth = checkAdminLogin(email, password, requestedRole);
    if (!auth.ok) {
      res.status(401).json({ error: "Email or password is incorrect for the selected role." });
      return;
    }
    res.json({
      token: signToken(auth.role, auth.email),
      email: auth.email,
      role: auth.role,
    });
  });

  router.use(requireAdmin);

  router.get("/jobs", async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM jobs ORDER BY sort_order ASC, id ASC");
      res.json(rows.map(mapJob));
    } catch (error) {
      next(error);
    }
  });

  router.post("/jobs", async (req, res, next) => {
    try {
      const parsed = jobInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const job = parsed.value;
      const [result] = await getPool().query(
        `INSERT INTO jobs (icon, title, meta, job_type, area, place, doing_json, looking_json, about, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [job.icon, job.title, job.meta, job.type, job.area, job.place, JSON.stringify(job.doing), JSON.stringify(job.looking), job.about, job.active, job.sortOrder]
      );
      const [rows] = await getPool().query("SELECT * FROM jobs WHERE id = ?", [result.insertId]);
      res.status(201).json(mapJob(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.put("/jobs/:id", async (req, res, next) => {
    try {
      const parsed = jobInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const job = parsed.value;
      const [result] = await getPool().query(
        `UPDATE jobs
         SET icon = ?, title = ?, meta = ?, job_type = ?, area = ?, place = ?, doing_json = ?, looking_json = ?, about = ?, is_active = ?, sort_order = ?
         WHERE id = ?`,
        [job.icon, job.title, job.meta, job.type, job.area, job.place, JSON.stringify(job.doing), JSON.stringify(job.looking), job.about, job.active, job.sortOrder, req.params.id]
      );
      if (!result.affectedRows) {
        res.status(404).json({ error: "Job not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM jobs WHERE id = ?", [req.params.id]);
      res.json(mapJob(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/jobs/:id", async (req, res, next) => {
    try {
      const [result] = await getPool().query("DELETE FROM jobs WHERE id = ?", [req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Job not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get("/faqs", async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC");
      res.json(rows.map(mapFaq));
    } catch (error) {
      next(error);
    }
  });

  router.post("/faqs", async (req, res, next) => {
    try {
      const question = clean(req.body?.question, 300);
      const answer = clean(req.body?.answer, 4000);
      const sortOrder = Number.isFinite(Number(req.body?.sortOrder)) ? Number(req.body.sortOrder) : 0;
      if (question.length < 5) {
        res.status(400).json({ error: "Enter the question." });
        return;
      }
      if (answer.length < 5) {
        res.status(400).json({ error: "Enter the answer." });
        return;
      }
      const [result] = await getPool().query(
        "INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)",
        [question, answer, sortOrder]
      );
      const [rows] = await getPool().query("SELECT * FROM faqs WHERE id = ?", [result.insertId]);
      res.status(201).json(mapFaq(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.put("/faqs/:id", async (req, res, next) => {
    try {
      const question = clean(req.body?.question, 300);
      const answer = clean(req.body?.answer, 4000);
      const sortOrder = Number.isFinite(Number(req.body?.sortOrder)) ? Number(req.body.sortOrder) : 0;
      if (question.length < 5 || answer.length < 5) {
        res.status(400).json({ error: "Question and answer are both required." });
        return;
      }
      const [result] = await getPool().query(
        "UPDATE faqs SET question = ?, answer = ?, sort_order = ? WHERE id = ?",
        [question, answer, sortOrder, req.params.id]
      );
      if (!result.affectedRows) {
        res.status(404).json({ error: "FAQ not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM faqs WHERE id = ?", [req.params.id]);
      res.json(mapFaq(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/faqs/:id", async (req, res, next) => {
    try {
      const [result] = await getPool().query("DELETE FROM faqs WHERE id = ?", [req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "FAQ not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get("/applications", async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM applications ORDER BY created_at DESC, id DESC");
      res.json(rows.map(mapApplication));
    } catch (error) {
      next(error);
    }
  });

  router.get("/applications/:id/resume", async (req, res, next) => {
    try {
      const [rows] = await getPool().query(
        "SELECT resume_original_name, resume_stored_name FROM applications WHERE id = ?",
        [req.params.id]
      );
      if (!rows.length || !rows[0].resume_stored_name) {
        res.status(404).json({ error: "Resume not found." });
        return;
      }
      const stored = path.basename(rows[0].resume_stored_name);
      const filePath = path.resolve("uploads", stored);
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ error: "Resume file is missing." });
        return;
      }
      res.download(filePath, rows[0].resume_original_name || "resume.pdf");
    } catch (error) {
      next(error);
    }
  });

  router.delete("/applications/:id", async (req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT resume_stored_name FROM applications WHERE id = ?", [req.params.id]);
      if (!rows.length) {
        res.status(404).json({ error: "Application not found." });
        return;
      }
      await getPool().query("DELETE FROM applications WHERE id = ?", [req.params.id]);
      if (rows[0].resume_stored_name) {
        const filePath = path.resolve("uploads", path.basename(rows[0].resume_stored_name));
        await fs.promises.unlink(filePath).catch(() => {});
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get("/inquiries", requireRole("manager"), async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM contact_inquiries ORDER BY created_at DESC, id DESC");
      res.json(rows.map(mapInquiry));
    } catch (error) {
      next(error);
    }
  });

  router.patch("/inquiries/:id/status", requireRole("manager"), async (req, res, next) => {
    try {
      const status = clean(req.body.status, 20);
      const [result] = await getPool().query("UPDATE contact_inquiries SET status = ? WHERE id = ?", [status, req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Inquiry not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/inquiries/:id", requireRole("manager"), async (req, res, next) => {
    try {
      const [result] = await getPool().query("DELETE FROM contact_inquiries WHERE id = ?", [req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Inquiry not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.get("/packages", requireRole("manager"), async (req, res, next) => {
    try {
      const slug = clean(req.query.service, 64);
      const region = clean(req.query.region, 20);
      let query = "SELECT * FROM service_packages";
      const conditions = [];
      const params = [];
      if (slug) {
        conditions.push("service_slug = ?");
        params.push(slug);
      }
      if (region) {
        conditions.push("region = ?");
        params.push(region);
      }
      if (conditions.length) {
        query += " WHERE " + conditions.join(" AND ");
      }
      query += " ORDER BY sort_order ASC, id ASC";
      const [rows] = await getPool().query(query, params);
      res.json(rows.map(mapPackage));
    } catch (error) {
      next(error);
    }
  });

  router.post("/packages", requireRole("manager"), async (req, res, next) => {
    try {
      const parsed = packageInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const p = parsed.value;
      const region = p.region || "domestic";
      if (p.isPopular) {
        await getPool().query("UPDATE service_packages SET is_popular = 0 WHERE service_slug = ? AND region = ?", [p.serviceSlug, region]);
      }
      const [result] = await getPool().query(
        `INSERT INTO service_packages (service_slug, package_name, platform, whats_included, price, sort_order, is_popular, region)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.serviceSlug, p.packageName, p.platform, p.whatsIncluded, p.price, p.sortOrder, p.isPopular, region]
      );
      const [rows] = await getPool().query("SELECT * FROM service_packages WHERE id = ?", [result.insertId]);
      res.status(201).json(mapPackage(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.put("/packages/:id", requireRole("manager"), async (req, res, next) => {
    try {
      const parsed = packageInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const p = parsed.value;
      const region = p.region || "domestic";
      if (p.isPopular) {
        await getPool().query("UPDATE service_packages SET is_popular = 0 WHERE service_slug = ? AND region = ?", [p.serviceSlug, region]);
      }
      const [result] = await getPool().query(
        `UPDATE service_packages
         SET service_slug = ?, package_name = ?, platform = ?, whats_included = ?, price = ?, sort_order = ?, is_popular = ?, region = ?
         WHERE id = ?`,
        [p.serviceSlug, p.packageName, p.platform, p.whatsIncluded, p.price, p.sortOrder, p.isPopular, region, req.params.id]
      );
      if (!result.affectedRows) {
        res.status(404).json({ error: "Package not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM service_packages WHERE id = ?", [req.params.id]);
      res.json(mapPackage(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.patch("/packages/:id/popular", requireRole("manager"), async (req, res, next) => {
    try {
      const isPopular = req.body.isPopular ? 1 : 0;
      // If setting this package to popular, unmark others in the same service and region
      const [existing] = await getPool().query("SELECT service_slug, region FROM service_packages WHERE id = ?", [req.params.id]);
      if (!existing.length) {
        res.status(404).json({ error: "Package not found." });
        return;
      }
      if (isPopular) {
        await getPool().query("UPDATE service_packages SET is_popular = 0 WHERE service_slug = ? AND region = ?", [existing[0].service_slug, existing[0].region || "domestic"]);
      }
      await getPool().query("UPDATE service_packages SET is_popular = ? WHERE id = ?", [isPopular, req.params.id]);
      const [rows] = await getPool().query("SELECT * FROM service_packages WHERE id = ?", [req.params.id]);
      res.json(mapPackage(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/packages/:id", requireRole("manager"), async (req, res, next) => {
    try {
      const [result] = await getPool().query("DELETE FROM service_packages WHERE id = ?", [req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Package not found." });
        return;
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  // Blogs Upload Endpoint (Images & Videos)
  router.post("/blogs/upload", (req, res) => {
    blogMediaUpload.single("file")(req, res, (err) => {
      if (err) {
        res.status(400).json({ error: err.message || "Failed to upload media file." });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No media file provided." });
        return;
      }
      const fileUrl = `/uploads/blogs/${req.file.filename}`;
      res.json({
        ok: true,
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });
    });
  });

  // Blogs Management Routes
  router.get("/blogs", async (req, res, next) => {
    try {
      const region = clean(req.query.region, 20);
      let query = "SELECT * FROM blogs";
      const params = [];
      if (region && region !== "all") {
        query += " WHERE region = ? OR region = 'both'";
        params.push(region);
      }
      query += " ORDER BY sort_order ASC, created_at DESC, id DESC";
      const [rows] = await getPool().query(query, params);
      res.json(rows.map(mapBlog));
    } catch (error) {
      next(error);
    }
  });

  router.post("/blogs", async (req, res, next) => {
    try {
      const parsed = blogInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const b = parsed.value;

      // Ensure slug uniqueness
      const [existingSlug] = await getPool().query("SELECT id FROM blogs WHERE slug = ?", [b.slug]);
      if (existingSlug.length > 0) {
        b.slug = `${b.slug}-${Date.now().toString().slice(-4)}`;
      }

      const [result] = await getPool().query(
        `INSERT INTO blogs (title, slug, image_url, video_url, short_description, content, author, region, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [b.title, b.slug, b.imageUrl, b.videoUrl, b.shortDescription, b.content, b.author, b.region, b.isPublished, b.sortOrder]
      );
      const [rows] = await getPool().query("SELECT * FROM blogs WHERE id = ?", [result.insertId]);
      res.status(201).json(mapBlog(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.put("/blogs/:id", async (req, res, next) => {
    try {
      const parsed = blogInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const b = parsed.value;

      // Check slug collision
      const [existingSlug] = await getPool().query("SELECT id FROM blogs WHERE slug = ? AND id != ?", [b.slug, req.params.id]);
      if (existingSlug.length > 0) {
        b.slug = `${b.slug}-${Date.now().toString().slice(-4)}`;
      }

      const [result] = await getPool().query(
        `UPDATE blogs
         SET title = ?, slug = ?, image_url = ?, video_url = ?, short_description = ?, content = ?, author = ?, region = ?, is_published = ?, sort_order = ?
         WHERE id = ?`,
        [b.title, b.slug, b.imageUrl, b.videoUrl, b.shortDescription, b.content, b.author, b.region, b.isPublished, b.sortOrder, req.params.id]
      );
      if (!result.affectedRows) {
        res.status(404).json({ error: "Blog not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM blogs WHERE id = ?", [req.params.id]);
      res.json(mapBlog(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.patch("/blogs/:id/publish", async (req, res, next) => {
    try {
      const isPublished = req.body.isPublished ? 1 : 0;
      const [result] = await getPool().query("UPDATE blogs SET is_published = ? WHERE id = ?", [isPublished, req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Blog not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM blogs WHERE id = ?", [req.params.id]);
      res.json(mapBlog(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/blogs/:id", async (req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT image_url, video_url FROM blogs WHERE id = ?", [req.params.id]);
      if (!rows.length) {
        res.status(404).json({ error: "Blog not found." });
        return;
      }
      await getPool().query("DELETE FROM blogs WHERE id = ?", [req.params.id]);

      // Remove local uploads if any
      const media = [rows[0].image_url, rows[0].video_url].filter(Boolean);
      for (const m of media) {
        if (m.startsWith("/uploads/blogs/")) {
          const filePath = path.resolve("uploads", "blogs", path.basename(m));
          await fs.promises.unlink(filePath).catch(() => {});
        }
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  // Projects (Featured work on the Projects page)
  router.post("/projects/upload", requireRole("manager"), (req, res) => {
    projectImageUpload.single("file")(req, res, (err) => {
      if (err) {
        const message = err.code === "LIMIT_FILE_SIZE" ? "That image is over 20 MB." : err.message;
        res.status(400).json({ error: message || "Failed to upload image." });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No image provided." });
        return;
      }
      res.json({ ok: true, url: `/uploads/projects/${req.file.filename}` });
    });
  });

  router.get("/projects", requireRole("manager"), async (_req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM projects ORDER BY sort_order ASC, id ASC");
      res.json(rows.map(mapProject));
    } catch (error) {
      next(error);
    }
  });

  router.post("/projects", requireRole("manager"), async (req, res, next) => {
    try {
      const parsed = projectInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const p = parsed.value;
      p.slug = await uniqueProjectSlug(p.slug);
      const [result] = await getPool().query(
        `INSERT INTO projects (title, slug, category, tags_json, short_description, card_image, card_style, card_note, region, is_published, sort_order, has_case_study, case_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.title, p.slug, p.category, JSON.stringify(p.tags), p.shortDescription, p.cardImage, p.cardStyle, p.cardNote, p.region, p.isPublished, p.sortOrder, p.hasCaseStudy, JSON.stringify(p.caseStudy)]
      );
      const [rows] = await getPool().query("SELECT * FROM projects WHERE id = ?", [result.insertId]);
      res.status(201).json(mapProject(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.put("/projects/:id", requireRole("manager"), async (req, res, next) => {
    try {
      const parsed = projectInput(req.body || {});
      if (parsed.error) {
        res.status(400).json({ error: parsed.error });
        return;
      }
      const p = parsed.value;
      p.slug = await uniqueProjectSlug(p.slug, req.params.id);
      const [result] = await getPool().query(
        `UPDATE projects
         SET title = ?, slug = ?, category = ?, tags_json = ?, short_description = ?, card_image = ?, card_style = ?, card_note = ?, region = ?, is_published = ?, sort_order = ?, has_case_study = ?, case_json = ?
         WHERE id = ?`,
        [p.title, p.slug, p.category, JSON.stringify(p.tags), p.shortDescription, p.cardImage, p.cardStyle, p.cardNote, p.region, p.isPublished, p.sortOrder, p.hasCaseStudy, JSON.stringify(p.caseStudy), req.params.id]
      );
      if (!result.affectedRows) {
        res.status(404).json({ error: "Project not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
      res.json(mapProject(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.patch("/projects/:id/publish", requireRole("manager"), async (req, res, next) => {
    try {
      const isPublished = req.body.isPublished ? 1 : 0;
      const [result] = await getPool().query("UPDATE projects SET is_published = ? WHERE id = ?", [isPublished, req.params.id]);
      if (!result.affectedRows) {
        res.status(404).json({ error: "Project not found." });
        return;
      }
      const [rows] = await getPool().query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
      res.json(mapProject(rows[0]));
    } catch (error) {
      next(error);
    }
  });

  router.delete("/projects/:id", requireRole("manager"), async (req, res, next) => {
    try {
      const [rows] = await getPool().query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
      if (!rows.length) {
        res.status(404).json({ error: "Project not found." });
        return;
      }
      await getPool().query("DELETE FROM projects WHERE id = ?", [req.params.id]);
      for (const url of projectFiles(rows[0])) {
        await fs.promises.unlink(path.resolve("uploads", "projects", path.basename(url))).catch(() => {});
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
