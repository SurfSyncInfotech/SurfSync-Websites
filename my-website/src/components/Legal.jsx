import "./Legal.css";

const pages = {
  privacy: {
    kicker: "Legal",
    title: "Privacy",
    accent: "Policy",
    intro:
      "At SurfSync Infotech Pvt Ltd, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data.",
    sections: [
      {
        title: "Information we collect",
        text: "We may collect the following types of information:",
        list: [
          ["Personal information", "Name, email address, phone number, company name, and other contact details."],
          ["Business information", "Project requirements, business needs, and service preferences."],
          ["Technical information", "IP address, browser type, device information, and website usage data."],
          ["Communication data", "Messages, inquiries, and correspondence with our team."],
        ],
      },
      {
        title: "How we use your information",
        text: "We use the collected information for the following purposes:",
        list: [
          "To provide and deliver our IT services and solutions.",
          "To communicate with you about projects, services, and inquiries.",
          "To improve our services and website functionality.",
          "To send marketing communications (with your consent).",
          "To comply with legal obligations and protect our rights.",
        ],
      },
      {
        title: "Data security",
        text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        title: "Data sharing and disclosure",
        text: "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
        list: [
          "With service providers who assist us in operating our business.",
          "When required by law or to protect our legal rights.",
          "With your explicit consent.",
        ],
      },
      {
        title: "Your rights",
        text: "You have the right to:",
        list: [
          "Access and review your personal information.",
          "Request correction of inaccurate data.",
          "Request deletion of your personal information.",
          "Opt out of marketing communications.",
          "Object to processing of your personal data.",
        ],
      },
      {
        title: "Cookies and tracking",
        text: "Our website may use cookies and similar tracking technologies to enhance user experience and analyze website traffic. You can control cookie preferences through your browser settings.",
      },
      {
        title: "Changes to this policy",
        text: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
      },
    ],
  },
  terms: {
    kicker: "Legal",
    title: "Terms &",
    accent: "Conditions",
    intro:
      "These terms and conditions govern your use of the SurfSync Infotech Pvt Ltd website and the services we provide. By using this website or engaging our services, you agree to these terms.",
    sections: [
      {
        title: "Use of this website",
        text: "You may use this website for lawful purposes only. You agree not to misuse the website, attempt to gain unauthorized access to it, or interfere with its normal operation.",
      },
      {
        title: "Our services",
        text: "SurfSync provides AI and automation, web and mobile development, e-commerce, cloud and DevOps, enterprise IT, and training services. The scope, timeline, deliverables, and fees for each engagement are set out in a separate proposal or agreement, which takes precedence over these terms where they differ.",
      },
      {
        title: "Quotes and payments",
        text: "Quotes are valid for the period stated on them. Unless agreed otherwise in writing:",
        list: [
          "Projects begin once the agreed advance payment is received.",
          "Invoices are payable within the period stated on the invoice.",
          "Prices are exclusive of applicable taxes, including GST.",
          "Delays in payment may pause work on the project.",
        ],
      },
      {
        title: "Client responsibilities",
        text: "You agree to provide accurate information, timely feedback, and any content, access, or approvals needed to deliver the work. Delays in these may affect the project timeline.",
      },
      {
        title: "Intellectual property",
        text: "On full payment, ownership of the final deliverables created specifically for you passes to you, as set out in your agreement. SurfSync keeps ownership of its pre-existing tools, frameworks, and know-how, and may show completed work in its portfolio unless you ask us not to in writing.",
      },
      {
        title: "SurfSync Academy",
        text: "Academy program fees, schedules, and certificates are as published on the Academy page at the time of enrolment. Course materials are for the enrolled learner's personal use and may not be shared or resold.",
      },
      {
        title: "Limitation of liability",
        text: "We work with care, but the website and its content are provided as is. To the extent permitted by law, SurfSync is not liable for indirect or consequential losses arising from use of this website or our services. Our total liability for any engagement is limited to the fees paid for that engagement.",
      },
      {
        title: "Third-party links",
        text: "This website may link to third-party websites. We are not responsible for their content or privacy practices.",
      },
      {
        title: "Governing law",
        text: "These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Noida, Uttar Pradesh.",
      },
      {
        title: "Changes to these terms",
        text: "We may update these terms from time to time. Changes will be posted on this page with an updated revision date.",
      },
    ],
  },
};

/* in-page links scroll without touching the hash, which would switch the page */
function jump(event) {
  event.preventDefault();
  document.getElementById(event.currentTarget.getAttribute("href").slice(1))?.scrollIntoView({ behavior: "smooth" });
}

function Legal({ kind }) {
  const page = pages[kind];

  return (
    <div className="legal-page">
      <section className="lg-hero">
        <p className="lg-kicker">{page.kicker}</p>
        <h1>
          {page.title} <span>{page.accent}</span>
        </h1>
        <p className="lg-lead">{page.intro}</p>
        <p className="lg-date">Last updated: October 29, 2026</p>
      </section>

      <div className="lg-wrap">
        <nav className="lg-toc" aria-label="On this page">
          <p>On this page</p>
          {page.sections.map((section, i) => (
            <a key={section.title} href={`#${kind}-${i + 1}`} onClick={jump}>
              {section.title}
            </a>
          ))}
          <a href={`#${kind}-contact`} onClick={jump}>
            Contact us
          </a>
        </nav>

        <div className="lg-body">
          {page.sections.map((section, i) => (
            <section key={section.title} id={`${kind}-${i + 1}`}>
              <h2>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {section.title}
              </h2>
              <p>{section.text}</p>
              {section.list ? (
                <ul>
                  {section.list.map((item) =>
                    Array.isArray(item) ? (
                      <li key={item[0]}>
                        <strong>{item[0]}:</strong> {item[1]}
                      </li>
                    ) : (
                      <li key={item}>{item}</li>
                    )
                  )}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="lg-contact" id={`${kind}-contact`}>
            <h2>Contact us</h2>
            <p>If you have questions about this page, please get in touch.</p>
            <ul>
              <li>
                Email: <a href="mailto:info@surfsyncinfotech.in">info@surfsyncinfotech.in</a>
              </li>
              <li>
                Phone: <a href="tel:+919429694356">+91 94296 94356</a>
              </li>
              <li>Location: Sector 73, Noida, Uttar Pradesh 201316</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Legal;
