import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { projects } from "../data/portfolio";

function GitHubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <p className="section-label text-center">Projects</p>
          <h2 className="section-heading text-center mb-2">Selected Work</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-4" />
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-16">
            Focused on AI/ML projects that solve real problems with clean, well-evaluated pipelines.
            More projects coming soon.
          </p>
        </AnimatedSection>

        {projects.map((project, i) => (
          <AnimatedSection key={project.id} delay={0.15}>
            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              
              <div className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden bg-gray-900 dark:bg-navy-800 aspect-video flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-10">
                      <div className="w-16 h-16 rounded-2xl bg-forest-600/20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🧠</span>
                      </div>
                      <p className="text-gray-400 text-sm font-medium">Sentiment Analysis System</p>
                      <p className="text-gray-600 text-xs mt-1">NLP · Scikit-learn · Python</p>
                    </div>
                  )}
                </div>
              </div>

              
              <div>
                <span className="inline-block border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs font-semibold tracking-widest px-3 py-1 rounded-full mb-4">
                  {project.number}
                </span>
                <h3 className="font-display text-3xl font-semibold text-gray-900 dark:text-cream-100 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                  {project.description}
                </p>
                <ul className="flex flex-col gap-2 mb-6">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 size={15} className="text-forest-600 dark:text-forest-400 flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium bg-forest-600/10 text-forest-700 dark:text-forest-400 border border-forest-600/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 dark:bg-cream-100 text-white dark:text-navy-900 px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                      <GitHubIcon size={14} /> View on GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-full text-sm font-medium hover:border-gray-500 transition-colors">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        
        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl p-8 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-2xl mb-2">🚀</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">More projects coming soon</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Currently building — check back later</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
