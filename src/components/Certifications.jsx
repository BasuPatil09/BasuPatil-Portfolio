import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Cpu, BarChart2, Bot, ExternalLink } from "lucide-react";
import { certifications } from "../data/portfolio";

const iconMap = { sparkles: Sparkles, cpu: Cpu, "bar-chart-2": BarChart2, bot: Bot };
const colorMap = {
  blue: { bg: "bg-blue-600", badge: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  forest: { bg: "bg-forest-600", badge: "bg-forest-50 text-forest-700 dark:bg-forest-900/30 dark:text-forest-300" },
  amber: { bg: "bg-amber-500", badge: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  purple: { bg: "bg-purple-600", badge: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
};

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

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 bg-cream-200/60 dark:bg-navy-800/40">
      <div className="max-w-7xl mx-auto">
        
        <AnimatedSection>
          <p className="section-label text-center">Certifications</p>
          <h2 className="section-heading text-center mb-2">Verified learning</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-16" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] || Sparkles;
            const colors = colorMap[cert.color] || colorMap.blue;
            return (
              <AnimatedSection key={cert.title} delay={0.08 + i * 0.08}>
                <div className="card p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-cream-100"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-cream-100 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4 leading-relaxed">
                    {cert.topics}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {cert.date}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
