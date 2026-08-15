import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fires a GSAP entrance animation once a scene's own trigger element
 * reaches a given point in the viewport. Because scenes are `position: sticky`,
 * "top top" fires exactly when the scene becomes the active, pinned frame.
 */
export function useReveal(triggerRef, animate, deps = []) {
  useEffect(() => {
    if (!triggerRef.current) return undefined
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 55%',
        once: true,
        onEnter: () => animate(reduceMotion),
      })
    }, triggerRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
