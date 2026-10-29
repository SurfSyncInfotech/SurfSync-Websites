import aiArt from "../assets/services/svc-ai.webp";
import webArt from "../assets/services/svc-web.webp";
import commerceArt from "../assets/services/svc-ecommerce-hero.webp";
import mobileArt from "../assets/services/svc-mobile.webp";
import cloudArt from "../assets/services/svc-cloud.webp";
import enterpriseArt from "../assets/services/svc-enterprise.webp";
import heroWaves from "../assets/services/svc-hero_w.svg";
import bodyWaves from "../assets/services/svc-body_w.svg";
import aiHealthcare from "../assets/services/ai-industry-healthcare.webp";
import aiEcommerce from "../assets/services/ai-industry-ecommerce.webp";
import aiFinance from "../assets/services/ai-industry-finance.webp";
import aiRealEstate from "../assets/services/ai-industry-real-estate.webp";
import webPublishing from "../assets/services/commerce-industry-publishing.webp";
import webProfessional from "../assets/services/web-industry-professional.webp";
import webSpeed from "../assets/services/web-problem-speed.png";
import webMobile from "../assets/services/web-problem-mobile.png";
import webContent from "../assets/services/web-problem-content.png";
import webSystems from "../assets/services/web-problem-systems.png";
import mobileFood from "../assets/services/commerce-industry-food.webp";
import mobileRetail from "../assets/services/commerce-industry-retail.webp";
import mobileFinance from "../assets/services/ai-industry-finance.webp";
import commerceRetail from "../assets/services/commerce-industry-retail.webp";
import commerceWellness from "../assets/services/commerce-industry-wellness.webp";
import commerceFood from "../assets/services/commerce-industry-food.webp";
import commercePublishing from "../assets/services/commerce-industry-publishing.webp";
import cloudSaas from "../assets/services/cloud-industry-saas.webp";
import cloudEcommerce from "../assets/services/ai-industry-ecommerce.webp";
import cloudFinance from "../assets/services/ai-industry-finance.webp";
import cloudHealthcare from "../assets/services/ai-industry-healthcare.webp";
import enterpriseLogistics from "../assets/services/enterprise-industry-logistics.webp";
import enterpriseFinance from "../assets/services/enterprise-industry-finance.webp";
import enterpriseMultiLocation from "../assets/services/enterprise-industry-multi-location.webp";
import enterpriseInfrastructure from "../assets/services/enterprise-cap-infrastructure.png";
import enterpriseIntegration from "../assets/services/enterprise-cap-integration.png";
import enterpriseSecurity from "../assets/services/enterprise-cap-security.png";
import enterpriseSupport from "../assets/services/enterprise-cap-support.png";
import enterpriseProblemSystems from "../assets/services/enterprise-problem-systems.png";
import enterpriseProblemVisibility from "../assets/services/enterprise-problem-visibility.png";
import enterpriseProblemSupport from "../assets/services/enterprise-problem-support.png";
import enterpriseProblemAccess from "../assets/services/enterprise-problem-access.png";

/* content for the ServiceDetail template, keyed by URL hash (#<slug>).
   Industry photos are empty in the designs; set `photo` to an image import to fill a card. */
const serviceDetails = {
  "ai-automation": {
    slug: "ai-automation",
    kicker: "AI & Automation",
    title: "Turn AI into practical",
    titleAccent: "business systems.",
    lead: "Automate workflows, process documents, connect your data and build AI solutions that save time and unlock new possibilities.",
    leadWidth: 596,
    art: aiArt,
    artAlt: "AI assistant, workflow automation, data processing and integrations around an AI robot",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      title: "Intelligent automation",
      accent: "modern businesses.",
      text: "We design and build AI-powered automation systems that fit into your existing tools and workflows — simple, secure and built for real impact.",
    },
    capabilities: [
      { icon: "bolt", title: "Workflow Automation", text: "Automate repetitive tasks across your tools" },
      { icon: "bot", title: "AI Agents", text: "Custom AI agents for research, support and ops." },
      { icon: "file", title: "Document Processing", text: "Extract, classify and organize data." },
      { icon: "database", title: "Data Integration", text: "Connect systems and unlock your data.", tone: "green" },
    ],
    problemsText: "We help teams eliminate manual work, make sense of their data and respond faster — with practical AI solutions.",
    problems: [
      { icon: "calculator", title: "Repetitive Manual Work", text: "Teams spend hours on tasks that can be automated." },
      { icon: "file", title: "Unstructured Data", text: "Important information is scattered and hard to use." },
      { icon: "clock", title: "Slow Responses", text: "Customers and teams wait for manual replies.", tone: "red" },
      { icon: "link", title: "Disconnected Tools", text: "Systems don't talk to each other, creating inefficiencies.", tone: "green" },
    ],
    industriesTitle: "Built for",
    industries: [
      { icon: "clipboard", title: "Healthcare", text: "Automate appointment scheduling, patient data processing and reports.", photo: aiHealthcare },
      { icon: "bag", title: "E- commerce", text: "Automate order processing, inventory updates and customer support.", photo: aiEcommerce, photoBg: "#fff7ee" },
      { icon: "bot", title: "Finance & Accounting", text: "Automate invoice processing, reconciliation and reporting.", photo: aiFinance },
      { icon: "home", title: "Real Estate", text: "Systems don't talk to each other, creating inefficiencies.", photo: aiRealEstate, tone: "green" },
    ],
  },

  "web-development": {
    slug: "web-development",
    kicker: "Services · Web Development",
    title: "Build websites that",
    titleAccent: "work harder.",
    lead: "We design and develop modern websites and web applications that help businesses deliver better experiences, operate efficiently, and grow online.",
    leadWidth: 640,
    art: webArt,
    artAlt: "Laptop showing a modern website surrounded by HTML, CSS, JavaScript, responsive design, SEO and security panels",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      layout: "accent-first",
      accent: "Digital experiences",
      title: "designed to perform.",
      text: "From business websites to complex web applications, we create responsive, secure, and scalable digital experiences around your goals.",
    },
    capabilities: [
      { icon: "code", title: "Custom Development", text: "Build digital experiences around your business needs.", tone: "navy" },
      { icon: "pen", title: "Responsive Web Design", text: "Deliver seamless experiences across every screen.", tone: "navy" },
      { icon: "rings", title: "CMS Integration", text: "Manage your website content with ease.", tone: "navy" },
      { icon: "growth", title: "Performance Optimization", text: "Create faster, smoother, more reliable websites.", tone: "navy" },
    ],
    problemsText: "We help businesses overcome slow websites, inconsistent experiences, and outdated platforms that make growth harder.",
    problems: [
      { iconSrc: webSpeed, title: "Slow Performance", text: "Long load times make visitors leave." },
      { iconSrc: webMobile, title: "Poor Mobile Experience", text: "Layouts break across different screen sizes." },
      { iconSrc: webContent, title: "Difficult Content Updates", text: "Simple changes require too much effort.", tone: "red" },
      { iconSrc: webSystems, title: "Disconnected Systems", text: "Websites fail to connect with essential business tools.", tone: "green" },
    ],
    industriesTitle: "Web solutions for",
    industries: [
      { icon: "clipboard", title: "Healthcare", text: "Present services and help visitors find the right care.", photo: aiHealthcare },
      { icon: "bag", title: "E-commerce", text: "Create intuitive storefronts that simplify buying.", photo: aiEcommerce, photoBg: "#fff7ee" },
      { icon: "bot", title: "Publishing", text: "Organize content, publications, and digital resources.", photo: webPublishing, photoBg: "#fff7ee" },
      { icon: "home", title: "Professional Services", text: "Communicate expertise and generate enquiries.", photo: webProfessional, tone: "green" },
    ],
  },

  "ecommerce-cms": {
    slug: "ecommerce-cms",
    kicker: "Services · E-commerce & CMS",
    title: "Turn browsing into",
    titleAccent: "buying.",
    titleAccentTone: "orange",
    lead: "We build online stores and content platforms that make it easier to showcase products, manage operations, and deliver smooth shopping experiences.",
    leadWidth: 640,
    art: commerceArt,
    artAlt: "Online store on a laptop and phone with product, order, sales analytics and content management panels",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      layout: "accent-after",
      title: "Commerce experiences",
      accent: "made simpler.",
      text: "From product discovery to checkout and content management, we create connected commerce experiences that support your customers and your operations.",
      textStyle: { "--head-text": "500px" },
    },
    capabilities: [
      { icon: "cart", title: "Online Store Setup", text: "Launch a storefront designed for your products.", tone: "navy" },
      { icon: "catalog", title: "Product Management", text: "Organize product details, categories, and availability.", tone: "navy" },
      { icon: "card", title: "Payment Integration", text: "Connect checkout with suitable payment methods.", tone: "navy" },
      { icon: "openBook", title: "Content Management", text: "Update pages, campaigns, and product stories with ease.", tone: "mint" },
    ],
    problemsText: "We help teams eliminate manual work, make sense of their data and respond faster — with practical AI solutions.",
    problems: [
      { icon: "fileX", title: "Complicated Checkout", text: "Too many steps interrupt purchase completion.", tone: "orange" },
      { icon: "redo", title: "Difficult Product Updates", text: "Managing large catalogs takes unnecessary effort.", tone: "navy" },
      { icon: "shopfront", title: "Outdated Store Content", text: "Pages and promotions become difficult to maintain.", tone: "red" },
      { icon: "docLines", title: "Fragmented Order Management", text: "Orders and customer details live across different tools.", tone: "green" },
    ],
    industriesTitle: "Commerce for different",
    industriesAccent: "business models.",
    industriesTitleWidth: 680,
    industryIconsLight: true,
    industryCompact: true,
    industriesLinkStyle: { marginBottom: 53, marginRight: 2.5 },
    industries: [
      { icon: "store", title: "Retail & D2C", text: "Present products and simplify online purchasing.", photo: commerceRetail, photoBg: "#fff7ee" },
      { icon: "jar", title: "Wellness & Beauty", text: "Organize product discovery and brand content.", photo: commerceWellness, photoBg: "#fff5f8" },
      { icon: "bowlFilled", title: "Food & Grocery", text: "Make catalog browsing and ordering convenient.", photo: commerceFood, photoBg: "#eaf5f1" },
      { icon: "book", title: "Publishing", text: "Showcase collections with organized product information.", photo: commercePublishing, photoBg: "#fff7ee" },
    ],
  },

  "mobile-apps": {
    slug: "mobile-apps",
    kicker: "Services · Mobile Apps",
    title: "Apps people",
    titleAccentInline: "enjoy",
    titleAccent: "using.",
    titleAccentTone: "orange",
    lead: "We build intuitive mobile applications that connect people, simplify everyday tasks, and deliver reliable experiences on iOS and Android.",
    leadWidth: 580,
    art: mobileArt,
    artAlt: "Phone app surrounded by iOS, Android, Flutter, development and app performance panels",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      layout: "accent-inline",
      title: "Mobile experiences",
      lineTwo: "built around",
      accent: "people.",
      text: "From first interaction to everyday use, we develop mobile applications that combine thoughtful UX, dependable technology, and smooth performance.",
    },
    capabilities: [
      { icon: "phone", title: "iOS & Android Apps", text: "Build applications for the devices people use daily." },
      { icon: "platforms", title: "Cross-Platform", text: "Reach both platforms with a consistent experience." },
      { icon: "figma", title: "Mobile UI/UX Design", text: "Make every interaction clear and intuitive." },
      { icon: "datastore", title: "API & Backend Integration", text: "Connect apps with services and business data.", tone: "mint" },
    ],
    problemsText: "We help businesses turn complicated mobile workflows into useful, reliable, and accessible app experiences.",
    problems: [
      { icon: "userCheck", title: "Confusing User Journeys", text: "Too many steps make simple tasks difficult.", tone: "orange" },
      { icon: "hexGear", title: "Inconsistent App Experiences", text: "Features behave differently across devices." },
      { icon: "pinX", title: "Disconnected Services", text: "Users have to switch between multiple tools.", tone: "peach" },
      { icon: "laptopChart", title: "Unreliable Performance", text: "Slow screens and errors interrupt everyday use.", tone: "mint" },
    ],
    industryIconsLight: true,
    industryCompact: true,
    industriesLinkStyle: { marginBottom: 30, marginRight: 2.5 },
    industriesTitle: "Built for",
    industries: [
      { icon: "bowlFilled", title: "Food & Delivery", text: "Connect customers, kitchens, and delivery partners.", photo: mobileFood, photoBg: "#eaf5f1" },
      { icon: "health", title: "Healthcare", text: "Make healthcare discovery and access more convenient.", photo: aiHealthcare },
      { icon: "wallet", title: "Finance & Payments", text: "Simplify payments and essential account workflows.", photo: mobileFinance },
      { icon: "shop", title: "Retail & Wellness", text: "Bring product discovery and shopping to mobile.", photo: mobileRetail, photoBg: "#fff7ee", tone: "mint" },
    ],
  },

  "cloud-devops": {
    slug: "cloud-devops",
    kicker: "Services · Cloud & DevOps",
    titleParts: [["Ship "], ["faster.", true], [" Stay "], ["reliable.", true]],
    lead: "We help teams deploy confidently, manage infrastructure, protect important data, and keep digital products running as they grow.",
    leadWidth: 580,
    art: cloudArt,
    /* this design leaves extra room under the one-line heading */
    artStyle: { marginTop: "clamp(48px, 8.3vw, 119px)" },
    artAlt: "Cloud server stack with CI/CD pipeline, AWS, Docker, Kubernetes and infrastructure monitoring panels",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      title: "Reliable infrastructure",
      accent: "growing products.",
      text: "We help businesses build dependable cloud environments and repeatable delivery workflows without adding unnecessary operational complexity.",
    },
    capabilities: [
      { icon: "cloudNetwork", title: "Cloud Migration", text: "Move workloads toward suitable cloud environments.", tone: "navy" },
      { icon: "ciBadge", title: "CI/CD Automation", text: "Automate build, test, and deployment steps.", tone: "navy" },
      { icon: "shieldKey", title: "Backup & Security", text: "Protect systems and prepare for recovery.", tone: "navy" },
      { icon: "mailDot", title: "Monitoring & Alerts", text: "See system health and respond to issues sooner.", tone: "mint" },
    ],
    problemsText: "We help teams reduce deployment friction, improve visibility, and prepare their infrastructure for reliable growth.",
    problems: [
      { icon: "deployBox", title: "Manual Deployments", text: "Teams spend hours on tasks that can be automated.", tone: "orange" },
      { icon: "cloudLines", title: "Unclear Infrastructure Costs", text: "Resources are difficult to track and optimize." },
      { icon: "shieldKey", title: "Backup & Security Gaps", text: "Recovery plans and protections remain incomplete.", tone: "red" },
      { icon: "eyeOff", title: "Limited System Visibility", text: "Teams discover problems after users are affected.", tone: "green" },
    ],
    industryIconsLight: true,
    industryCompact: true,
    industriesLinkStyle: { marginBottom: 28, marginRight: 2.5 },
    industriesGridStyle: { marginTop: 43 },
    industriesTextWidth: 246,
    industriesTitle: "Built for",
    industries: [
      { icon: "cloud", title: "SaaS & Platforms", text: "Support stable releases and expanding workloads.", photo: cloudSaas },
      { icon: "shoppingBag", title: "E-commerce", text: "Keep shopping and checkout services dependable", photo: cloudEcommerce, photoBg: "#fff7ee" },
      { icon: "botHead", title: "Financial Services", text: "Strengthen operational visibility and data protection.", photo: cloudFinance },
      { icon: "clipboardPlus", title: "Healthcare", text: "Support reliable access to important digital systems.", photo: cloudHealthcare },
    ],
  },

  "enterprise-it": {
    slug: "enterprise-it",
    kicker: "Services · Enterprise IT Solutions",
    title: "Make your systems",
    titleAccentInline: "work",
    titleAccent: "as one.",
    titleAccentTone: "orange",
    lead: "We connect business systems, improve IT operations, and strengthen infrastructure so teams can work securely and efficiently.",
    leadWidth: 600,
    art: enterpriseArt,
    artAlt: "Enterprise IT dashboard with server racks, cloud, cybersecurity, managed IT support and system integration panels",
    wavesHero: heroWaves,
    wavesBody: bodyWaves,
    whatWeDo: {
      title: "Connected technology",
      accent: "better operations.",
      text: "We help businesses coordinate their systems, simplify everyday IT management, and maintain reliable technology across teams and locations.",
    },
    capabilities: [
      { iconSrc: enterpriseInfrastructure, title: "IT Infrastructure", text: "Build a dependable foundation for business operations." },
      { iconSrc: enterpriseIntegration, title: "System Integration", text: "Connect tools and systems with less friction." },
      { iconSrc: enterpriseSecurity, title: "Security & Compliance", text: "Strengthen access controls and operational safeguards." },
      { iconSrc: enterpriseSupport, title: "Managed IT Support", text: "Keep essential systems supported and maintained.", tone: "mint" },
    ],
    problemsText: "We help teams eliminate manual work, make sense of their data and respond faster — with practical AI solutions.",
    problems: [
      { iconSrc: enterpriseProblemSystems, title: "Disconnected Business Systems", text: "Teams move information manually between tools." },
      { iconSrc: enterpriseProblemVisibility, title: "Limited Infrastructure Visibility", text: "Issues are difficult to identify and track." },
      { iconSrc: enterpriseProblemSupport, title: "Reactive IT Support", text: "Problems interrupt work before they are resolved.", tone: "red" },
      { iconSrc: enterpriseProblemAccess, title: "Inconsistent Access & Security", text: "Permissions and safeguards are hard to manage.", tone: "green" },
    ],
    industryIconsLight: true,
    industryCompact: true,
    industriesLinkStyle: { marginBottom: 28, marginRight: 2.5 },
    industriesGridStyle: { marginTop: 43 },
    industriesTitle: "Built for",
    industries: [
      { icon: "clipboardPlus", title: "Healthcare", text: "Connect operational systems and support reliable access.", photo: cloudHealthcare },
      { icon: "truckClock", title: "Logistics & Operations", text: "Coordinate workflows, data, and operational visibility.", photo: enterpriseLogistics, photoBg: "#fff7ee" },
      { icon: "botHead", title: "Finance & Accounting", text: "Improve system coordination and information handling.", photo: enterpriseFinance },
      { icon: "house", title: "Multi-Location Businesses", text: "Keep teams and business tools connected across locations.", photo: enterpriseMultiLocation, tone: "mint" },
    ],
  },
};

export default serviceDetails;
