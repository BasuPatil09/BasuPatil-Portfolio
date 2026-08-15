import Lenis from 'lenis'
import gsap from 'gsap'

let lenis = null
let started = false

export function initLenis() {
  if (started) return lenis
  started = true

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenis = new Lenis({
    duration: reduceMotion ? 0.4 : 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: !reduceMotion,
    syncTouch: false,
  })

  lenis.on('scroll', () => {
    // ScrollTrigger listens for the 'scroll' event on window via a proxy —
    // see App.jsx's scrollerProxy registration.
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis() {
  return lenis
}
