'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Original lib/useReveal.js — fires a GSAP entrance animation once a scene's
 * trigger element reaches the viewport. Sticky scenes fire "top top" exactly
 * when they become the active, pinned frame.
 */
export function useReveal(
  triggerRef: RefObject<HTMLElement | null>,
  animate: (reduceMotion: boolean) => void,
  deps: unknown[] = [],
) {
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
  }, deps)
}
