'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/lib/lenis'
import { personal } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'connect', label: 'Connect' },
]

const SCENE_IDS = ['intro', 'hero', 'about', 'journey', 'toolkit', 'work', 'experience', 'credentials', 'archive', 'connect']
const ACTIVE_MAP: Record<string, string> = {
  intro: 'hero',
  journey: 'about',
  toolkit: 'about',
  experience: 'work',
  credentials: 'work',
  archive: 'connect',
}

export default function TopNav() {
  const barRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('hero')

  // Progress bar + active link, both derived from one scrub so they stay in
  // sync. Active scene is computed from live sticky rects (the original used
  // IntersectionObserver with threshold .6 on always-intersecting sticky
  // scenes, which made the highlight jump unpredictably).
  useEffect(() => {
    const bar = barRef.current
    const scenes = SCENE_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )

    const computeActive = () => {
      const mid = window.innerHeight * 0.5
      let current = scenes[0]?.id ?? 'hero'
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect()
        if (rect.top <= mid && rect.bottom > mid) current = scene.id
      }
      setActive(ACTIVE_MAP[current] ?? current)
    }

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        if (bar) bar.style.transform = `scaleX(${self.progress})`
      },
    })

    computeActive()
    const onScroll = () => computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      st.kill()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Click fix: sticky scenes report their *stuck* rect (top=0) for both
  // getBoundingClientRect and offsetTop, so scrolling "to the element" is a
  // no-op once pinned. Measure the scene's runway sibling instead — it lives
  // in normal flow and never moves. Scene top = runway top - viewport height.
  const goTo = (id: string) => {
    const lenis = getLenis()
    const el = document.getElementById(id)
    if (!el) return
    const runway = el.nextElementSibling?.hasAttribute('data-runway')
      ? (el.nextElementSibling as HTMLElement)
      : null
    const target = runway
      ? runway.offsetTop - window.innerHeight + 2
      : el.getBoundingClientRect().top + window.scrollY
    if (lenis) lenis.scrollTo(target, { duration: 1.15, offset: 0 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <header className="portfolio-nav fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-2xl">
      <div className="relative rounded-full bg-paper-raised/90 backdrop-blur-md border border-line shadow-[0_10px_30px_-14px_rgba(23,20,15,0.25)] px-2 py-2 flex items-center justify-between overflow-hidden">
        <button
          type="button"
          onClick={() => goTo('hero')}
          className="font-body text-[15px] font-extrabold tracking-[-0.04em] pl-4 pr-3 text-ink shrink-0"
        >
          {personal.displayName.toUpperCase()}
          <span className="text-accent">.</span>
        </button>

        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
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
