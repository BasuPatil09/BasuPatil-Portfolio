import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { personal } from "../data/portfolio";

function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.01 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    className: "contact-icon-blue",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: personal.phone,
    href: "tel:+919380358480",
    className: "contact-icon-teal",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Belagavi, Karnataka, India",
    className: "contact-icon-location",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Basu!\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`);
    window.open(`https://wa.me/919380358480?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-shell">
        <AnimatedSection>
          <p className="section-label text-center">Contact</p>
          <h2 className="section-heading text-center mb-2">Get in touch</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-4" />
          <p className="contact-intro">
            If you want to talk about internships, AI/ML projects, or a possible collaboration - this is the best place to reach me.
          </p>
        </AnimatedSection>

        <div className="contact-grid">
          <div>
            <div className="contact-card-stack">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className={`contact-card-icon ${item.className}`}>
                      <Icon size={30} />
                    </div>
                    <div>
                      <p className="contact-card-label">{item.label}</p>
                      <p className="contact-card-value">{item.value}</p>
                    </div>
                  </>
                );

                return (
                  <AnimatedSection key={item.label} delay={0.1 + i * 0.07}>
                    {item.href ? (
                      <a href={item.href} className="contact-info-card">
                        {content}
                      </a>
                    ) : (
                      <div className="contact-info-card">{content}</div>
                    )}
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.35}>
              <div className="contact-social-row">
                <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="contact-social-button contact-social-github">
                  <GitHubIcon /> GitHub
                </a>
                <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact-social-button contact-social-linkedin">
                  <LinkedInIcon /> LinkedIn
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="contact-form-card">
              {[
                { name: "name", label: "Name", placeholder: "Your full name" },
                { name: "email", label: "Email", placeholder: "your.email@example.com" },
                { name: "subject", label: "Subject", placeholder: "Project discussion" },
              ].map((field) => (
                <div className="contact-field" key={field.name}>
                  <label>{field.label}</label>
                  <input name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} />
                </div>
              ))}
              <div className="contact-field">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button onClick={handleWhatsApp} className="contact-submit-button">
                Send Message via WhatsApp <Send size={22} />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
