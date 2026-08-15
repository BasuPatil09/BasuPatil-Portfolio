import { useRef } from 'react'
import Scene from '../../layout/Scene'
import RadiatingRays from './RadiatingRays'
import { useScrub, segmentProgress, sceneProgressPosition } from '../../../lib/scene'
import { getLenis } from '../../../lib/lenis'
import { journey } from '../../../content/portfolio'

export default function Journey() {
  const sceneRef = useRef(null)
  const rayFieldRef = useRef(null)
  const panelRefs = useRef([])
  const segmentRefs = useRef([])
  const activeLabelRef = useRef(null)
  const count = journey.length

  useScrub(sceneRef, (progress) => {
    if (rayFieldRef.current) {
      rayFieldRef.current.style.setProperty('--journey-progress', String(progress))
      rayFieldRef.current.style.setProperty('--journey-zoom', String(1.08 - progress * .08))
      rayFieldRef.current.style.setProperty('--journey-rotate', `${(progress - .5) * 3}deg`)
    }

    journey.forEach((_, index) => {
      const center = (index + .5) / count
      const distance = Math.abs(progress - center)
      const opacity = Math.max(0, 1 - distance * count * 1.8)
      const panel = panelRefs.current[index]
      if (panel) {
        panel.style.opacity = String(opacity)
        panel.style.transform = `translate3d(0, ${(1 - opacity) * 20}px, 0) scale(${.98 + opacity * .02})`
        panel.style.pointerEvents = opacity > .5 ? 'auto' : 'none'
      }

      const segment = segmentRefs.current[index]
      if (segment) {
        const local = segmentProgress(progress, index, count)
        segment.style.setProperty('--fill', `${local * 100}%`)
        segment.style.opacity = local > 0 ? '1' : '.35'
      }
    })

    const activeIndex = Math.min(count - 1, Math.floor(progress * count))
    if (activeLabelRef.current) activeLabelRef.current.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
  })

  const goToChapter = (index) => {
    const lenis = getLenis()
    if (!sceneRef.current || !lenis) return
    lenis.scrollTo(sceneProgressPosition(sceneRef.current, index, count), { duration: 1.1 })
  }

  return (
    <Scene ref={sceneRef} id="journey" index={4} runway={6} bg="bg-night" className="relative">
      <RadiatingRays fieldRef={rayFieldRef} />

      <div className="journey-content relative flex-1 flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 md:py-14">
        <div className="journey-header flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent">02 My Journey</p>
          <span ref={activeLabelRef} className="font-mono text-xs text-white/50">01 / {String(count).padStart(2, '0')}</span>
        </div>

        <div className="journey-stage relative h-[62vh] max-h-[620px] min-h-[360px] flex items-center justify-center text-center">
          {journey.map((chapter, index) => (
            <article
              key={chapter.id}
              ref={(element) => { panelRefs.current[index] = element }}
              className="journey-panel absolute inset-x-0 max-w-2xl mx-auto px-4"
              style={{ opacity: 0 }}
            >
              <p className="journey-year font-body font-black text-6xl sm:text-7xl md:text-8xl text-white mb-3 tracking-tight">{chapter.year}</p>
              <h3 className="journey-title font-body font-extrabold text-2xl sm:text-3xl text-white mb-1.5">{chapter.title}</h3>
              <p className="journey-place font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 mb-5">{chapter.place}</p>
              <p className="journey-body text-white/70 text-base leading-relaxed max-w-xl mx-auto mb-5">{chapter.body}</p>
              <p className="journey-insight italic-serif text-lg text-white/90">→ {chapter.insight}</p>
            </article>
          ))}
        </div>

        <div className="journey-progress flex items-center justify-center gap-2">
          {journey.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => goToChapter(index)}
              aria-label={`Go to ${chapter.title}`}
              ref={(element) => { segmentRefs.current[index] = element }}
              className="relative h-[3px] w-8 sm:w-10 rounded-full bg-white/15 overflow-hidden transition-opacity"
              style={{ opacity: .35 }}
            >
              <span className="absolute inset-y-0 left-0 bg-accent rounded-full" style={{ width: 'var(--fill, 0%)' }} />
            </button>
          ))}
        </div>
      </div>
    </Scene>
  )
}
