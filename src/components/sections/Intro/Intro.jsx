import { useEffect, useRef } from 'react'
import Scene from '../../layout/Scene'
import IntroTunnel from './IntroTunnel'
import { useScrub } from '../../../lib/scene'

export default function Intro() {
  const sceneRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    document.body.classList.add('intro-active')
    return () => document.body.classList.remove('intro-active')
  }, [])

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
