import { useRef } from 'react'
import Scene from '../../layout/Scene'
import { useScrub, sceneProgressPosition } from '../../../lib/scene'
import { getLenis } from '../../../lib/lenis'
import { experience } from '../../../content/portfolio'
import { Icon } from '../../../lib/icons'

const CARD_BG = ['bg-accent', 'bg-signal', 'bg-violet']
const DOT_BG = ['bg-accent', 'bg-signal', 'bg-violet']

export default function Experience() {
  const sceneRef = useRef(null)
  const cardRefs = useRef([])
  const counterRef = useRef(null)
  const count = experience.length

  useScrub(sceneRef, (p) => {
    const virtual = p * count
    experience.forEach((_, i) => {
      const local = Math.min(1, Math.max(0, virtual - i))
      const depth = Math.min(6, Math.max(0, virtual - (i + 1)))
      const el = cardRefs.current[i]
      if (!el) return
      let opacity
      let translateY
      let scale = 1
      if (local < 1) {
        opacity = local
        translateY = (1 - local) * 50
      } else {
        opacity = Math.max(0.25, 1 - depth * 0.35)
        translateY = -depth * 22
        scale = 1 - Math.min(depth, 3) * 0.035
      }
      const zIndex = Math.round(200 - depth * 20 - (1 - local) * 5)
      el.style.opacity = String(opacity)
      el.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`
      el.style.zIndex = String(zIndex)
      el.style.pointerEvents = local >= 1 && depth < 0.5 ? 'auto' : 'none'
    })
    if (counterRef.current) {
      const active = Math.min(count, Math.floor(virtual) + 1)
      counterRef.current.textContent = `${String(active).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
    }
  })

  const goTo = (i) => {
    const lenis = getLenis()
    const section = sceneRef.current
    if (!section || !lenis) return
    lenis.scrollTo(sceneProgressPosition(section, i, count), { duration: 1.1 })
  }

  return (
    <Scene ref={sceneRef} id="experience" index={7} runway={3.1} bg="bg-paper" className="relative">
      <div className="ref-experience flex-1 flex flex-col px-6 md:px-16 lg:px-24 py-12 md:py-14">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3 shrink-0">05 Experience</p>
        <h2 className="font-body font-extrabold text-clamp-h2 text-ink mb-6 max-w-2xl shrink-0">
          Where I built my <span className="italic-serif font-normal text-accent text-[1.05em]">judgment.</span>
        </h2>

        <div className="ref-experience-stage relative flex-1 min-h-0">
          {experience.map((e, i) => (
            <div
              key={e.title}
              ref={(el) => { cardRefs.current[i] = el }}
              className={`ref-experience-card absolute left-1/2 top-1/2 w-[94vw] lg:w-[min(78vw,1120px)] max-h-full overflow-y-auto rounded-2xl p-6 md:p-10 shadow-[0_30px_80px_-28px_rgba(20,20,20,0.42)] text-white ${CARD_BG[i % 3]}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                <div>
                  <p className="font-mono text-[11px] text-white/70">{e.period}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 mt-0.5">{e.org}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-white/15 rounded-full px-3 py-1.5">
                  {e.type}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon name={e.icon} className="w-5 h-5" />
                </span>
                <h3 className="font-body font-extrabold text-3xl md:text-5xl leading-[.98] tracking-tight">{e.title}</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="lg:max-w-xl">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-2">What I worked on</p>
                  <ul className="space-y-3">
                    {e.bullets.map((b) => (
                      <li key={b} className="text-sm md:text-base text-white/90 leading-relaxed flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/70 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-2">Impact</p>
                  <p className="text-xl md:text-2xl font-bold leading-snug">{e.impact}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
                {e.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono bg-white/10 rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <span ref={counterRef} className="font-mono text-[11px] text-ink-faint">01 / {String(count).padStart(2, '0')}</span>
            {experience.map((e, i) => (
              <button
                key={e.title}
                type="button"
                onClick={() => goTo(i)}
                className="flex items-center gap-2 font-mono text-[11px] text-ink-dim hover:text-ink transition-colors"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${DOT_BG[i % 3]}`} />
                {e.title.split(' — ')[0].split(' ').slice(0, 3).join(' ')}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Scroll · Click to Jump</span>
        </div>
      </div>
    </Scene>
  )
}
