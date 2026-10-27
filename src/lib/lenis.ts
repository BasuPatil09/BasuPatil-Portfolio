import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null
let started = false

/**
 * Original lib/lenis.js — Lenis driven by the GSAP ticker so smooth scroll
 * and ScrollTrigger share one clock. Singleton, client-only.
 */
export function initLenis(): Lenis {
  if (started && lenis) return lenis
  started = true

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenis = new Lenis({
    duration: reduceMotion ? 0.4 : 1.15,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: !reduceMotion,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
  started = false
}
