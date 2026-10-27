'use client'

/*
 * EXPERIENCE — centred stacked panel composition (ported from the original
 * inspiration design, populated with Basu's entries).
 *
 *   · The stack is the hero visual and sits in the CENTRE of the viewport.
 *   · Boards are WIDE, SHORT panels, sharp-edged and perspective-distorted —
 *     physical sheets, not rounded app cards.
 *   · Depth stack recedes up-and-back on a diagonal; the active board is
 *     closest, largest, sharpest. Exit travels down + back + blur + fade.
 *   · TEXT NEVER COLLIDES: waiting boards render their identity strip only
 *     (period · org · type). Bullets, impact and tags exist ONLY on the
 *     active board, which nothing sits in front of.
 *   · Scroll physics: scroll → dwell curve → placement. Each board HOLDS at
 *     full focus for HOLD_RATIO of its segment, then hands off — the deck
 *     reads "pause, slide, pause", matching the credentials deck.
 *   · One curated colour per board; air tint behind the stage follows it.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Scene from '../scene'
import { useScrub, sceneProgressPosition } from '@/lib/scene'
import { getLenis } from '@/lib/lenis'
import { experience } from '@/lib/portfolio-data'
import { Icon } from '@/lib/icons'

/* One curated colour per board — original design tokens only. */
const BOARD_COLORS = ['#FF2E0F', '#0072E3', '#AB54F7', '#130F17'] as const
const DARK_TEXT = new Set<number>([])

const DEPTH = 3
const UP = 74
const RIGHT = 26
const BACK = 96
const TILT = 6

const HOLD_RATIO = 0.6

export default function Experience() {
  const sceneRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const boardRefs = useRef<(HTMLElement | null)[]>([])
  const counterRef = useRef<HTMLSpanElement>(null)
  const tintRef = useRef<HTMLDivElement>(null)
  const legendRefs = useRef<(HTMLButtonElement | null)[]>([])
  const count = experience.length
  const activeRef = useRef(-1)

  /* Each board holds at full focus for the first HOLD_RATIO of its scroll
     segment, then smoothsteps to the next — pause, slide, pause. */
  const dwell = (units: number) => {
    const last = count - 1
    const i = Math.min(last, Math.floor(units))
    const frac = units - i
    if (i >= last || frac <= HOLD_RATIO) return i
    const t = (frac - HOLD_RATIO) / (1 - HOLD_RATIO)
    return i + t * t * (3 - 2 * t)
  }

  const setActive = (idx: number) => {
    if (idx === activeRef.current) return
    activeRef.current = idx
    boardRefs.current.forEach((b, i) => b?.classList.toggle('is-on', i === idx))
    legendRefs.current.forEach((it, i) => it?.classList.toggle('is-active', i === idx))
    if (counterRef.current) {
      counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
    }
    if (tintRef.current) {
      tintRef.current.style.background = `${BOARD_COLORS[idx]}14`
    }
  }

  const place = (p: number) => {
    const compact =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 1000px)').matches
    const up = compact ? 56 : UP
    const right = compact ? 0 : RIGHT
    const back = compact ? 70 : BACK

    for (let i = 0; i < count; i++) {
      const d = i - p /* >0 waiting · 0 active · <0 leaving */
      const b = boardRefs.current[i]
      if (!b) continue

      if (d > DEPTH + 0.6 || d < -1.1) {
        b.style.visibility = 'hidden'
        continue
      }
      b.style.visibility = 'visible'

      if (d >= 0) {
        const k = Math.min(d, DEPTH)
        b.style.transform =
          `translate3d(${(k * right).toFixed(1)}px, ${(-k * up).toFixed(1)}px, ${(-k * back).toFixed(1)}px)` +
          ` scale(${(1 - k * 0.028).toFixed(3)})`
        b.style.opacity = String(Math.max(0, 1 - k * 0.16))
        b.style.filter = k > 1.2 ? `blur(${Math.min(3, (k - 1.2) * 1.2).toFixed(2)}px)` : ''
        b.style.zIndex = String(200 - Math.round(k * 10))
      } else {
        const t = Math.min(1, -d / 1.1)
        b.style.transform =
          `translate3d(${(-t * 40).toFixed(1)}px, ${(t * 230).toFixed(1)}px, ${(-t * 320).toFixed(1)}px)` +
          ` scale(${(1 - t * 0.06).toFixed(3)})`
        b.style.opacity = String(Math.max(0, 1 - t * 1.35))
        b.style.filter = t > 0.25 ? `blur(${((t - 0.25) * 5).toFixed(2)}px)` : ''
        b.style.zIndex = '210'
      }
    }
    setActive(Math.round(gsap.utils.clamp(0, count - 1, p)))
  }

  useScrub(
    sceneRef,
    (progress) => {
      const virtual = dwell(progress * count)
      place(virtual)
    },
    { scrub: 0.5 },
  )

  const goTo = (i: number) => {
    const lenis = getLenis()
    const section = sceneRef.current
    if (!section || !lenis) return
    lenis.scrollTo(sceneProgressPosition(section, i, count), { duration: 1.1 })
  }

  /* Pointer tilt — very small perspective response, desktop only. */
  useEffect(() => {
    const el = sceneRef.current
    const stage = stageRef.current
    if (!el || !stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 1000px)').matches) return

    const rx = gsap.quickTo(stage, 'rotationX', { duration: 1, ease: 'power3.out' })
    const ry = gsap.quickTo(stage, 'rotationY', { duration: 1, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const cy = ((e.clientY - r.top) / r.height - 0.5) * 2
      rx(TILT - cy * 2.2)
      ry(cx * 2.6)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Scene ref={sceneRef} id="experience" index={7} runway={3.8} bg="bg-paper" className="ref-experience relative">
      <div ref={tintRef} className="ref-exp-tint" aria-hidden="true" style={{ background: '#FF2E0F14' }} />

      <div className="ref-exp-header shrink-0">
        <p className="ref-exp-eyebrow">
          <span>05</span> Experience
        </p>
        <h2 className="ref-exp-h2">
          Where I built my <em className="italic-serif">judgment.</em>
        </h2>
      </div>

      <div className="ref-exp-stage-wrap">
        <div className="ref-exp-stage" ref={stageRef}>
          {experience.map((e, i) => {
            const dark = DARK_TEXT.has(i)
            return (
              <article
                key={e.title}
                ref={(el) => { boardRefs.current[i] = el }}
                className={`ref-exp-board ${dark ? 'ref-exp-board--dark' : ''} ${i === 0 ? 'is-on' : ''}`}
                style={{ background: BOARD_COLORS[i], zIndex: 200 - i, visibility: i === 0 ? 'visible' : 'hidden' }}
                onClick={() => goTo(i)}
              >
                {/* Identity strip — the only thing visible on waiting boards */}
                <div className="ref-exp-strip">
                  <span className="ref-exp-year">{e.period}</span>
                  <span className="ref-exp-org">{e.org}</span>
                  <span className="ref-exp-type">{e.type}</span>
                </div>

                {/* Full content — active board only */}
                <div className="ref-exp-detail">
                  <div className="ref-exp-content">
                    <div className="flex items-center gap-4">
                      <span className="ref-exp-mark" aria-hidden="true">
                        <Icon name={e.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="ref-exp-role">{e.title}</h3>
                    </div>
                    <p className="ref-exp-loc">{e.org}</p>

                    <div className="ref-exp-body">
                      <div>
                        <p className="ref-exp-lbl">What I worked on</p>
                        <ul className="ref-exp-list">
                          {e.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="ref-exp-lbl">Impact</p>
                        <p className="ref-exp-outcome">{e.impact}</p>
                        <p className="ref-exp-lbl ref-exp-lbl-gap">Toolkit</p>
                        <div className="ref-exp-skills">
                          {e.tags.map((t) => (
                            <i key={t}>{t}</i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="ref-exp-foot shrink-0">
        <span ref={counterRef} className="ref-exp-count">01 / 0{count}</span>
        <div className="ref-exp-legend" role="list">
          {experience.map((e, i) => (
            <button
              key={e.title}
              ref={(el) => { legendRefs.current[i] = el }}
              type="button"
              className={`ref-exp-legend-item ${i === 0 ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              <i style={{ background: BOARD_COLORS[i] }} />
              {e.title.split(' — ')[0]}
            </button>
          ))}
        </div>
        <span className="ref-exp-hint">Scroll · Click to jump</span>
      </div>
    </Scene>
  )
}
