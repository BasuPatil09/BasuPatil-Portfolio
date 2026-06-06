import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Database, Globe, Code2, Users, Sparkles } from "lucide-react";
import { personal } from "../data/portfolio";

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const activityCards = [
  {
    icon: Brain,
    title: "AI / ML Projects",
    description: "Building and evaluating machine learning models with real-world datasets and clean pipelines.",
  },
  {
    icon: Database,
    title: "Data Science",
    description: "Data analysis, visualisation, and insight extraction using Pandas, NumPy, and Matplotlib.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Full-stack interfaces combining React frontends with FastAPI or Node.js backends.",
  },
  {
    icon: Users,
    title: "Community & Leadership",
    description: "NSS volunteer, national hackathon participant, and Karnataka Youth Representative.",
  },
];

const focusItems = [
  { title: "AI / ML", description: "Building models that solve real problems" },
  { title: "Data Science", description: "Extracting insights from complex datasets" },
  { title: "Web Development", description: "Clean, functional full-stack interfaces" },
];

const focusIcons = { "AI / ML": Brain, "Data Science": Database, "Web Development": Globe };

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <AnimatedSection>
          <p className="section-label text-center">About</p>
          <h2 className="section-heading text-center mb-2">A quick view of what I bring</h2>
          <div className="w-12 h-1 bg-forest-600 mx-auto rounded-full mb-16" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div>
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-cream-100 flex items-center justify-center">
                  <span className="text-white dark:text-navy-900 text-lg">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-cream-100">Career summary</h3>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                I am a Computer Science and Engineering student specialising in Artificial Intelligence
                and Machine Learning at KLS Gogte Institute of Technology, Belagavi.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                My work spans building ML models, data analysis pipelines, and full-stack web applications.
                I am driven by curiosity and focused on delivering projects that create measurable impact —
                not just functional code.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-2 gap-4">
              {activityCards.map((card, i) => (
                <AnimatedSection key={card.title} delay={0.15 + i * 0.07}>
                  <div className="card p-4 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <card.icon size={16} className="text-forest-600 dark:text-forest-400 flex-shrink-0" />
                      <p className="font-semibold text-sm text-gray-900 dark:text-cream-100">{card.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{card.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          
          <AnimatedSection delay={0.2}>
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-5 bg-forest-600 rounded-full" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-cream-100">What I'm focused on</h3>
              </div>

              <div className="flex flex-col gap-3">
                {focusItems.map((area) => {
                  const Icon = focusIcons[area.title] || Brain;
                  return (
                    <div key={area.title} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-forest-400/40 transition-colors">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon size={16} className="text-forest-600 dark:text-forest-400" />
                        <p className="font-semibold text-gray-900 dark:text-cream-100">{area.title}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 pl-7">{area.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>📍</span>
                <span>KLS GIT, Belagavi, Karnataka</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
