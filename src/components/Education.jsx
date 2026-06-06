import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, Heart, Briefcase } from "lucide-react";
import { education, experience } from "../data/portfolio";

const iconMap = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  heart: Heart,
  briefcase: Briefcase,
};

const colorMap = {
  forest: { bg: "bg-forest-600", dot: "bg-forest-600", ring: "ring-forest-200 dark:ring-forest-900/50", status: "text-forest-600 dark:text-forest-400" },
  amber:  { bg: "bg-amber-500",  dot: "bg-amber-500",  ring: "ring-amber-200 dark:ring-amber-900/50",  status: "text-amber-600 dark:text-amber-400" },
  blue:   { bg: "bg-blue-600",   dot: "bg-blue-600",   ring: "ring-blue-200 dark:ring-blue-900/50",   status: "text-blue-600 dark:text-blue-400" },
};

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function TimelineCard({ item, colors }) {
  const Icon = iconMap[item.icon] || GraduationCap;
  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-5 w-full">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={17} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-cream-100 text-sm leading-snug">
            {item.degree || item.title}
          </p>
          <p className={`text-xs font-medium mt-0.5 ${colors.status}`}>
            • {item.status}
          </p>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">
        {item.institution || item.organization}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{item.period}</p>
      {item.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
      )}
    </div>
  );
}

export default function Education() {
  const allItems = [
    ...experience.map((e) => ({ ...e })),
    ...education.map((e)  => ({ ...e })),
  ];

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <p className="section-label text-center">Experience</p>
          <h2 className="section-heading text-center mb-2">Education & Experience Timeline</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-16" />
        </AnimatedSection>

        
        <div className="hidden md:block relative">
          
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-forest-600/25 dark:bg-forest-500/25" />

          {allItems.map((item, i) => {
            const colors = colorMap[item.color] || colorMap.forest;
            const isLeft = i % 2 === 0;

            return (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <div className="relative flex items-start mb-10">
                  {isLeft ? (
                    <>
                      
                      <div className="w-[calc(50%-28px)] pr-6">
                        <TimelineCard item={item} colors={colors} />
                      </div>
                      
                      <div className="flex-shrink-0 w-14 flex justify-center pt-5">
                        <div className={`w-3.5 h-3.5 rounded-full ${colors.dot} ring-4 ${colors.ring}`} />
                      </div>
                      
                      <div className="w-[calc(50%-28px)]" />
                    </>
                  ) : (
                    <>
                      
                      <div className="w-[calc(50%-28px)]" />
                      
                      <div className="flex-shrink-0 w-14 flex justify-center pt-5">
                        <div className={`w-3.5 h-3.5 rounded-full ${colors.dot} ring-4 ${colors.ring}`} />
                      </div>
                      
                      <div className="w-[calc(50%-28px)] pl-6">
                        <TimelineCard item={item} colors={colors} />
                      </div>
                    </>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        
        <div className="md:hidden relative pl-8">
          
          <div className="absolute left-3 top-0 bottom-0 w-px bg-forest-600/25" />

          {allItems.map((item, i) => {
            const colors = colorMap[item.color] || colorMap.forest;
            return (
              <AnimatedSection key={i} delay={0.1 + i * 0.08}>
                <div className="relative mb-8">
                  
                  <div className={`absolute -left-[21px] top-5 w-3 h-3 rounded-full ${colors.dot} ring-4 ${colors.ring}`} />
                  <TimelineCard item={item} colors={colors} />
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}