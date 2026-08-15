import { useRef } from 'react'
import gsap from 'gsap'
import Scene from '../../layout/Scene'
import VelocityMarquee from '../../ui/VelocityMarquee'
import { useReveal } from '../../../lib/useReveal'
import { aboutStats, education, personal } from '../../../content/portfolio'
import { ArrowRight } from '../../../lib/icons'

const MARQUEE_ROWS = [
  {
    items: ['AI / ML', 'Computer Vision', 'NLP', 'Data Science', 'AI Agents', 'Model Deployment', 'Automation'],
    velocity: 34,
  },
  {
    items: ['Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'React', 'LangChain', 'SQL', 'AWS', 'GitHub', 'Frontend Development'],
    velocity: -28,
    outline: true,
  },
]

export default function About() {
  const root = useRef(null)
  useReveal(root, (reduceMotion) => {
    gsap.fromTo('.ref-about-enter', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: reduceMotion ? 0 : 0.75, ease: 'power3.out', stagger: 0.09 })
  })

  return (
    <Scene id="about" index={3} runway={1.25} bg="bg-paper">
      <section ref={root} className="ref-about" aria-labelledby="about-title">
        <VelocityMarquee rows={MARQUEE_ROWS} />
        <div className="ref-about-main">
          <div className="ref-about-copy">
            <p className="ref-about-enter ref-eyebrow"><span>01</span> About me</p>
            <h2 id="about-title" className="ref-about-enter">Learning is how I build.<br /><em>Impact</em> is how I aim it.</h2>
            <p className="ref-about-enter ref-about-lede">I’m {personal.displayName}, a Computer Science and AI/ML engineering student in Belagavi. I turn curiosity into systems—from model experiments to production-minded projects.</p>
            <a href="#work" className="ref-about-enter ref-text-link">Explore my work <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="ref-about-side ref-about-enter">
            <div className="ref-about-education"><span>Currently studying</span><strong>{education[0].degree}</strong><small>{education[0].institution} · {education[0].period}</small></div>
            <div className="ref-about-orbit" aria-hidden="true"><span>AI / ML</span><i>+</i><b>BUILD</b><i>+</i><span>SHIP</span></div>
          </div>
        </div>
        <div className="ref-about-stats">
          {aboutStats.map((stat) => <div className="ref-about-enter" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </section>
    </Scene>
  )
}
