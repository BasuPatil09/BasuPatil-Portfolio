import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reads scroll progress (0 → 1) off a scene's runway container while that
 * scene is pinned, and hands it to `onUpdate` on every tick. Callers should
 * mutate refs/DOM directly inside onUpdate (gsap.set / style.transform) —
 * not React state — so scroll-driven visuals stay off the render loop.
 */
export function useScrub(containerRef, onUpdate, { scrub = 0.35 } = {}) {
  useEffect(() => {
    if (!containerRef.current) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    onUpdate(0, { progress: 0, reduceMotion })

    const frame = containerRef.current
    const next = frame.nextElementSibling
    const runway = next?.hasAttribute('data-runway') ? next : frame

    const st = ScrollTrigger.create({
      trigger: runway,
      start: runway === frame ? 'top top' : 'top bottom',
      end: 'bottom bottom',
      scrub,
      onUpdate: (self) => onUpdate(self.progress, { ...self, reduceMotion }),
    })
    return () => st.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/** Local 0→1 progress for the i-th of `count` equal segments of an overall progress value. */
export function segmentProgress(progress, i, count) {
  const local = progress * count - i
  return Math.min(1, Math.max(0, local))
}

/** Document scroll position for one equal segment of a scene's scrub runway. */
export function sceneProgressPosition(frame, index, count) {
  if (!frame) return 0
  const runway = frame.nextElementSibling?.hasAttribute('data-runway')
    ? frame.nextElementSibling
    : frame
  const top = frame.getBoundingClientRect().top + window.scrollY
  return top + ((index + 0.5) / count) * Math.max(0, runway.offsetHeight)
}
