import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const COPIES = 4

function RowCopy({ items, outline }) {
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

export default function VelocityMarquee({ rows }) {
  const root = useRef(null)

  useEffect(() => {
    const element = root.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const tracks = [...element.querySelectorAll('.velocity-marquee-track')]
    const state = tracks.map((track, index) => ({
      track,
      base: rows[index]?.velocity ?? 30,
      width: 1,
      progress: 0,
    }))
    const measure = () => state.forEach((entry) => { entry.width = Math.max(1, entry.track.scrollWidth / COPIES) })
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    measure()

    let previousY = window.scrollY
    let previousTime = performance.now()
    let boost = 0
    const tick = () => {
      const now = performance.now()
      const delta = Math.min(.05, (now - previousTime) / 1000)
      previousTime = now
      const raw = delta ? (window.scrollY - previousY) / delta : 0
      previousY = window.scrollY
      boost += (Math.max(-3000, Math.min(3000, raw)) - boost) * .1
      const direction = boost < -40 ? -1 : 1
      const acceleration = 1 + Math.min(Math.abs(boost) / 1400, 1.2)
      state.forEach((entry) => {
        entry.progress -= ((entry.base * direction * acceleration * delta) / entry.width) * 25
        entry.progress = ((entry.progress % 25) + 25) % 25 - 25
        gsap.set(entry.track, { xPercent: entry.progress })
      })
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      observer.disconnect()
    }
  }, [rows])

  return (
    <div className="velocity-marquee" ref={root}>
      <p className="sr-only">{rows.flatMap((row) => row.items).join(', ')}</p>
      {rows.map((row, index) => (
        <div className="velocity-marquee-row" key={index}>
          <div className="velocity-marquee-track">
            {Array.from({ length: COPIES }, (_, copy) => <RowCopy key={copy} items={row.items} outline={row.outline} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
