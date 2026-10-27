'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const COPIES = 4

/**
 * Original ui/VelocityMarquee.jsx — solid + outline rows that move continuously
 * and accelerate with scroll velocity.
 *
 * Corrections vs. the original:
 *  - Direction is now continuous (base speed + smoothed velocity contribution)
 *    instead of a hard ±1 flip — removes the visible stutter/pause-feel when
 *    the scroll direction changes.
 *  - Ticks pause while the marquee is off-screen and when the tab is hidden.
 */
function RowCopy({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <span className="velocity-marquee-copy" aria-hidden="true">
      {items.map((item) => (
        <span className="velocity-marquee-item" key={item}>
          <span className={outline ? 'velocity-marquee-outline' : 'velocity-marquee-solid'}>{item}</span>
          <span className="velocity-marquee-separator">✦</span>
        </span>
      ))}
    </span>
  )
}

export default function VelocityMarquee({
  rows,
}: {
  rows: { items: string[]; velocity?: number; outline?: boolean }[]
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const tracks = [...element.querySelectorAll<HTMLElement>('.velocity-marquee-track')]
    const state = tracks.map((track, index) => ({
      track,
      base: rows[index]?.velocity ?? 30,
      width: 1,
      progress: 0,
    }))
    const measure = () => {
      state.forEach((entry) => {
        entry.width = Math.max(1, entry.track.scrollWidth / COPIES)
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    measure()
    // Re-measure once webfonts land (scrollWidth changes when Inter loads)
    document.fonts?.ready?.then(measure).catch(() => {})

    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { rootMargin: '120px' })
    io.observe(element)

    let previousY = window.scrollY
    let previousTime = performance.now()
    let smoothedVelocity = 0

    const tick = () => {
      if (!visible || document.hidden) return
      const now = performance.now()
      const delta = Math.min(0.05, (now - previousTime) / 1000) || 1 / 60
      previousTime = now
      const raw = delta ? (window.scrollY - previousY) / delta : 0
      previousY = window.scrollY
      smoothedVelocity += (Math.max(-3000, Math.min(3000, raw)) - smoothedVelocity) * 0.08
      const velocityBoost = Math.max(-1, Math.min(1, smoothedVelocity / 1400)) * 1.1
      const acceleration = 1 + Math.abs(velocityBoost)

      state.forEach((entry) => {
        // Rows counter-rotate (sign of base) and smoothly accelerate with
        // scroll velocity in EITHER direction — no hard direction flip.
        const dir = Math.sign(entry.base) || 1
        const speed = (Math.abs(entry.base) * acceleration + Math.abs(velocityBoost) * 260) * delta * dir
        entry.progress -= (speed / entry.width) * 25
        entry.progress = ((entry.progress % 25) + 25) % 25 - 25
        gsap.set(entry.track, { xPercent: entry.progress })
      })
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      observer.disconnect()
      io.disconnect()
    }
  }, [rows])

  return (
    <div className="velocity-marquee" ref={root}>
      <p className="sr-only">{rows.flatMap((row) => row.items).join(', ')}</p>
      {rows.map((row, index) => (
        <div className="velocity-marquee-row" key={index}>
          <div className="velocity-marquee-track">
            {Array.from({ length: COPIES }, (_, copy) => (
              <RowCopy key={copy} items={row.items} outline={row.outline} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
