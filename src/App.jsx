import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis } from './lib/lenis'
import TopNav from './components/layout/TopNav'
import About from './components/sections/About/About'
import Certifications from './components/sections/Certifications/Certifications'
import Connect from './components/sections/Connect/Connect'
import Experience from './components/sections/Experience/Experience'
import Gallery from './components/sections/Gallery/Gallery'
import Hero from './components/sections/Hero/Hero'
import Intro from './components/sections/Intro/Intro'
import Journey from './components/sections/Journey/Journey'
import Stack from './components/sections/Stack/Stack'
import Work from './components/sections/Work/Work'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = initLenis()
    lenis.on('scroll', ScrollTrigger.update)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 300)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <TopNav />
      <main className="relative">
        <Intro />
        <Hero />
        <About />
        <Journey />
        <Stack />
        <Work />
        <Experience />
        <Certifications />
        <Gallery />
        <Connect />
      </main>
    </>
  )
}
