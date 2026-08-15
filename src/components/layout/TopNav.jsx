import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '../../lib/lenis'
import { personal } from '../../content/portfolio'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'connect', label: 'Connect' },
]

export default function TopNav() {
  const barRef = useRef(null)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return undefined
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const sectionIds = ['intro', 'hero', 'about', 'journey', 'toolkit', 'work', 'experience', 'credentials', 'archive', 'connect']
    const map = { intro: 'hero', journey: 'about', toolkit: 'about', experience: 'work', credentials: 'work', archive: 'connect' }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(map[entry.target.id] || entry.target.id)
        })
      },
      { threshold: 0.6 },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = (id) => {
    const lenis = getLenis()
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { duration: 1.1, offset: 0 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="portfolio-nav fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-2xl">
      <div className="relative rounded-full bg-paper-raised/90 backdrop-blur-md border border-line shadow-[0_10px_30px_-14px_rgba(23,20,15,0.25)] px-2 py-2 flex items-center justify-between overflow-hidden">
        <button
          type="button"
          onClick={() => goTo('hero')}
          className="font-body text-[15px] font-extrabold tracking-[-0.04em] pl-4 pr-3 text-ink shrink-0"
        >
          {personal.displayName.toUpperCase()}<span className="text-accent">.</span>
        </button>

        <nav className="hidden sm:flex items-center gap-1">
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={`font-body text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors ${
                active === id ? 'text-ink bg-paper-soft' : 'text-ink-faint hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <a
          href={personal.resumeUrl}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-accent text-paper-raised text-[12px] font-semibold px-4 py-2 mr-0.5 hover:bg-accent-dim transition-colors"
        >
          Resume
        </a>

        <div className="absolute left-0 bottom-0 h-[2px] w-full bg-line overflow-hidden">
          <div ref={barRef} className="h-full w-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </header>
  )
}
