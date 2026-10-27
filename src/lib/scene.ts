'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrubSelf = { progress: number; reduceMotion: boolean }

/**
 * Original lib/scene.js useScrub — reads scroll progress (0 → 1) off a scene's
 * runway container while that scene is pinned. Mutate refs/DOM directly inside
 * onUpdate, never React state, so scroll visuals stay off the render loop.
 */
export function useScrub(
  containerRef: RefObject<HTMLElement | null>,
  onUpdate: (progress: number, self: ScrubSelf) => void,
  { scrub = 0.35 }: { scrub?: number } = {},
) {
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
      onUpdate: (self) => onUpdate(self.progress, { progress: self.progress, reduceMotion }),
    })
    return () => st.kill()
  }, [])
}

/** Local 0→1 progress for the i-th of `count` equal segments of an overall progress value. */
export function segmentProgress(progress: number, i: number, count: number): number {
  const local = progress * count - i
  return Math.min(1, Math.max(0, local))
}

/** Document scroll position for one equal segment of a scene's scrub runway.
 *  Sticky frames report their *stuck* rect, so the flow position is derived
 *  from the runway sibling (normal flow) instead of the frame's rect. */
export function sceneProgressPosition(
  frame: HTMLElement | null,
  index: number,
  count: number,
): number {
  if (!frame) return 0
  const runway = frame.nextElementSibling?.hasAttribute('data-runway')
    ? (frame.nextElementSibling as HTMLElement)
    : frame
  const flowTop =
    runway === frame
      ? frame.getBoundingClientRect().top + window.scrollY
      : runway.offsetTop - window.innerHeight
  return flowTop + ((index + 0.5) / count) * Math.max(0, runway.offsetHeight)
}
