import { Link } from "react-scroll";
import { Mail, MapPin, Phone } from "lucide-react";
import { personal } from "../data/portfolio";

const quickLinks = [
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Education", to: "education" },
  { label: "Contact", to: "contact" },
];

function GitHubIcon({ size = 23 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.01 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 23 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}

const socialLinks = [
  { href: personal.links.github, icon: GitHubIcon, label: "GitHub" },
  { href: personal.links.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
];

export default function Footer() {
  const [firstName, ...restName] = personal.displayName.split(" ");
  const lastName = restName.join(" ");
  const location = personal.location.replace(", India", ", Karnataka, India");

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-about">
            <p className="footer-name">
              <span>{firstName}</span>
              {lastName && <> {lastName}</>}
            </p>
            <p className="footer-bio">
              Computer Science and AIML student building practical AI projects with a focus on clarity.
            </p>
            <div className="footer-socials">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-link"
                >
                  <Icon size={23} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-heading">
              <span />
              <p>Quick Links</p>
            </div>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    offset={-80}
                    duration={500}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <div className="footer-heading">
              <span />
              <p>Contact Info</p>
            </div>
            <ul>
              <li>
                <Mail size={24} strokeWidth={1.8} />
                <a href={`mailto:${personal.email}`}>
                  {personal.email}
                </a>
              </li>
              <li>
                <Phone size={24} strokeWidth={1.8} />
                <span>{personal.phone}</span>
              </li>
              <li>
                <MapPin size={24} strokeWidth={1.8} />
                <span>{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 {personal.displayName}. All rights reserved.</p>
          <p>
            Built with <span className="footer-react">React</span> and{" "}
            <span className="footer-tailwind">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
