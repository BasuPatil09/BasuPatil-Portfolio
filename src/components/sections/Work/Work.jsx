import { useRef } from 'react'
import Scene from '../../layout/Scene'
import { useScrub, sceneProgressPosition } from '../../../lib/scene'
import { getLenis } from '../../../lib/lenis'
import { projects } from '../../../content/portfolio'
import { ArrowUpRight } from '../../../lib/icons'

const COVER_STYLES = [
  { bg: 'from-[#ff704d] via-[#ff5a34] to-[#b8381d]', label: 'VISION / 01', mark: '◉' },
  { bg: 'from-[#4a6ce3] via-[#3457d5] to-[#233d9a]', label: 'AGENT / 02', mark: '✦' },
  { bg: 'from-[#a17bff] via-[#8b5cf6] to-[#5f34be]', label: 'LANGUAGE / 03', mark: '↗' },
]

export default function Projects() {
  const sceneRef = useRef(null)
  const cardRefs = useRef([])
  const countRef = useRef(null)
  const dotRefs = useRef([])
  const count = projects.length

  useScrub(sceneRef, (progress) => {
    const focus = progress * (count - 1)
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const distance = i - focus
      const absolute = Math.abs(distance)
      const x = distance * 340
      const y = Math.min(110, absolute * absolute * 15)
      const rotation = Math.max(-32, Math.min(32, -distance * 14))
      const scale = 1 - Math.min(0.36, absolute * 0.085)
      card.style.transform = `translateX(${x}px) translateY(${y}px) rotateY(${rotation}deg) scale(${scale})`
      card.style.opacity = String(absolute > 2.1 ? Math.max(0.35, 1 - (absolute - 2) * 0.25) : 1)
      card.style.zIndex = String(Math.round(100 - absolute * 10))
      card.style.pointerEvents = absolute < 0.55 ? 'auto' : 'none'
    })

    const active = Math.round(Math.max(0, Math.min(count - 1, focus)))
    if (countRef.current) countRef.current.textContent = `${String(active + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
    dotRefs.current.forEach((dot, i) => {
      if (dot) dot.style.transform = `scaleX(${i === active ? 2.2 : 1})`
      if (dot) dot.style.opacity = i === active ? '1' : '0.3'
    })
  }, { scrub: 0.55 })

  const goTo = (index) => {
    const lenis = getLenis()
    if (!sceneRef.current) return
    const top = sceneProgressPosition(sceneRef.current, index, count)
    if (lenis) lenis.scrollTo(top, { duration: 1 })
    else window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <Scene ref={sceneRef} id="work" index={6} runway={3.7} bg="bg-paper" className="relative">
      <div className="flex-1 min-h-0 flex flex-col px-6 md:px-16 lg:px-24 pt-12 pb-6">
        <div className="flex items-end justify-between flex-wrap gap-5 mb-5 shrink-0">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">04 Featured Work</p>
            <h2 className="font-body font-extrabold text-clamp-h2 text-ink leading-[1.02] max-w-xl">
              Three builds, designed to <span className="italic-serif font-normal text-accent text-[1.05em]">ship.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-dim max-w-xs pb-1">
            Scroll the arc or select a dot to explore computer vision, agents, and NLP.
          </p>
        </div>

        <div className="project-arc-stage relative flex-1 min-h-[360px] overflow-hidden [perspective:1200px]">
          <div className="project-arc-track absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
            {projects.map((project, i) => {
              const cover = COVER_STYLES[i % COVER_STYLES.length]
              return (
                <article
                  key={project.id}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className="project-arc-card absolute w-[min(82vw,390px)] origin-center [transform-style:preserve-3d] transition-[box-shadow] duration-300"
                  style={{ zIndex: 100 - i }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-[22px] bg-paper-raised border border-line shadow-[0_28px_58px_-30px_rgba(23,20,15,0.45)] hover:shadow-[0_34px_70px_-26px_rgba(23,20,15,0.35)]"
                  >
                    <div className={`relative h-52 bg-gradient-to-br ${cover.bg} overflow-hidden text-white p-6`}>
                      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.32)_1px,transparent_1px)] [background-size:24px_24px]" />
                      <span className="relative font-mono text-[10px] tracking-[.24em]">{cover.label}</span>
                      <span className="absolute -right-2 -bottom-11 font-display text-[10rem] leading-none text-white/20">{cover.mark}</span>
                      <span className="absolute right-5 bottom-4 font-display italic-serif text-4xl">{project.number}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-ink leading-none">{project.title}</h3>
                          <p className="font-mono text-[10px] tracking-wide text-accent mt-2">{project.category}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-[13px] text-ink-dim leading-relaxed mt-4">{project.tagline}</p>
                      <div className="flex items-center justify-between border-t border-line mt-5 pt-3 font-mono text-[10px] text-ink-faint">
                        <span>{project.tags.slice(0, 2).join(' · ')}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </a>
                </article>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 shrink-0">
          <span ref={countRef} className="font-mono text-[11px] text-ink-faint">01 / {String(count).padStart(2, '0')}</span>
          <div className="flex items-center gap-3">
            {projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${project.title}`}
                className="h-1.5 w-5 rounded-full bg-accent origin-center transition-transform"
                ref={(el) => { dotRefs.current[i] = el }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Scroll to travel</span>
        </div>
      </div>
    </Scene>
  )
}
