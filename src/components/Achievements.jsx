import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Flag, Star, Award } from "lucide-react";
import { achievements } from "../data/portfolio";

const iconMap = { trophy: Trophy, flag: Flag, star: Star, award: Award };
const colorMap = {
  amber: { bg: "bg-amber-500", ring: "ring-amber-200 dark:ring-amber-900" },
  forest: { bg: "bg-forest-600", ring: "ring-forest-200 dark:ring-forest-900" },
  blue: { bg: "bg-blue-600", ring: "ring-blue-200 dark:ring-blue-900" },
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

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 bg-cream-200/60 dark:bg-navy-800/40">
      <div className="max-w-7xl mx-auto">
        
        <AnimatedSection>
          <p className="section-label text-center">Achievements</p>
          <h2 className="section-heading text-center mb-2">Recognition and leadership</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-16" />
        </AnimatedSection>

        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon] || Trophy;
            const colors = colorMap[item.color] || colorMap.forest;
            return (
              <AnimatedSection key={item.title} delay={0.1 + i * 0.1}>
                <div className="card p-6 h-full hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full ${colors.bg} ring-4 ${colors.ring} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-cream-100">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                      <p className="text-xs text-forest-600 dark:text-forest-400 font-medium mt-0.5">{item.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
