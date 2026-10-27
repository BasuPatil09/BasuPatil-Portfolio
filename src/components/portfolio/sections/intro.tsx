'use client'

import { useEffect, useRef } from 'react'
import Scene from '../scene'
import { useScrub } from '@/lib/scene'
import dynamic from 'next/dynamic'

// Three.js is heavy and browser-only — load it lazily, never on the server.
const IntroTunnel = dynamic(() => import('./intro-tunnel'), { ssr: false })

export default function Intro() {
  const sceneRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)

  useScrub(sceneRef, (progress) => {
    progressRef.current = progress
    document.body.classList.toggle('intro-active', progress < 0.92)
  }, { scrub: 0.6 })

  return (
    <Scene ref={sceneRef} id="intro" index={1} runway={6.5} bg="bg-paper" className="relative">
      <IntroTunnel progressRef={progressRef} text="BASU PATIL" />
    </Scene>
  )
}
