import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, BarChart2, Code2, Globe, Wrench } from "lucide-react";
import { skills } from "../data/portfolio";

const iconMap = {
  brain: Brain,
  "bar-chart-2": BarChart2,
  "code-2": Code2,
  globe: Globe,
  wrench: Wrench,
};

const colorMap = {
  forest: {
    bg: "bg-forest-600",
    text: "text-white",
    dot: "bg-forest-500",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-white",
    dot: "bg-amber-400",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-white",
    dot: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-600",
    text: "text-white",
    dot: "bg-purple-500",
  },
  slate: {
    bg: "bg-slate-700",
    text: "text-white",
    dot: "bg-slate-500",
  },
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

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-cream-200/60 dark:bg-navy-800/40">
      <div className="max-w-7xl mx-auto">
        
        <AnimatedSection>
          <p className="section-label text-center">Skills</p>
          <h2 className="section-heading text-center mb-2">The tools I use most</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-4" />
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-14">
            A compact view of the stack I reach for when building AI/ML models,
            analysing data, or putting together a project from idea to finish.
          </p>
        </AnimatedSection>

        
        <AnimatedSection delay={0.1}>
          <div className="card p-6 mb-10">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">Core stack</p>
            <div className="flex flex-wrap gap-3">
              {skills.coreStack.map((skill) => (
                <span key={skill} className="tag-pill">{skill}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code2;
            const colors = colorMap[cat.color] || colorMap.forest;
            return (
              <AnimatedSection key={cat.title} delay={0.1 + i * 0.07}>
                <div className="card p-6 h-full hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={colors.text} />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-cream-100 mb-4">
                    {cat.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
