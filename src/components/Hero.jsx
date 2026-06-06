import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Mail, ArrowRight, MapPin } from "lucide-react";
import { personal } from "../data/portfolio";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function LeetCodeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        
        <div>
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
            Portfolio of {personal.displayName}
          </motion.div>

          <motion.p {...fadeUp(0.15)} className="section-label mb-4">
            Computer Science & AI/ML
          </motion.p>

          
          <motion.h1 {...fadeUp(0.2)} className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.08] text-gray-900 dark:text-cream-100 mb-6">
            Building intelligent systems,{" "}
            <span className="text-forest-600 dark:text-forest-400 italic">
              one model at a time.
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mb-8">
            {personal.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3 mb-10">
            {["AI / ML", "Data Science", "Full-Stack"].map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.35)} className="flex flex-wrap gap-4 mb-8">
            <Link to="projects" smooth={true} offset={-80} duration={500}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-cream-100 text-white dark:text-navy-900 px-6 py-3 rounded-full font-medium cursor-pointer hover:opacity-90 transition-opacity">
              View Projects <ArrowRight size={16} />
            </Link>
            <Link to="contact" smooth={true} offset={-80} duration={500}
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium cursor-pointer hover:border-gray-500 transition-colors">
              <Mail size={16} /> Contact Me
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex items-center gap-3 mb-8">
            {[
              { href: personal.links.github, icon: <GitHubIcon size={16} /> },
              { href: personal.links.linkedin, icon: <LinkedInIcon size={16} /> },
              { href: personal.links.leetcode, icon: <LeetCodeIcon size={16} /> },
            ].map(({ href, icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-cream-100 hover:border-gray-400 transition-all">
                {icon}
              </a>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.45)} className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-forest-600" />
              Belagavi, Karnataka
            </span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
            <span className="text-forest-600 dark:text-forest-400 font-medium">Open to internships and junior roles</span>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            
            <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-gray-200 dark:bg-gray-800"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)" }}>
              <img
                src={personal.photo}
                alt={personal.displayName}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 10%" }}
              />
            </div>

            
            <div className="bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl mx-4 -mt-20 relative z-10 p-5">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-forest-600 dark:text-forest-400">Profile</span>
                <span className="text-xs font-semibold text-forest-600 dark:text-forest-400 bg-forest-600/10 px-2.5 py-1 rounded-full">
                  CSE Student
                </span>
              </div>
              <p className="font-display text-xl font-semibold text-gray-900 dark:text-cream-100 mb-1">
                {personal.displayName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Focused on AI/ML, data science, and building projects that solve real problems.
              </p>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  🎓 KLS Gogte Institute of Technology
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
