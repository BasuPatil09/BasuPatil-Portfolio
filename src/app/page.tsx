'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, getLenis } from '@/lib/lenis'
import TopNav from '@/components/portfolio/top-nav'
import Intro from '@/components/portfolio/sections/intro'
import Hero from '@/components/portfolio/sections/hero'
import About from '@/components/portfolio/sections/about'
import Journey from '@/components/portfolio/sections/journey'
import Stack from '@/components/portfolio/sections/stack'
import Work from '@/components/portfolio/sections/work'
import Experience from '@/components/portfolio/sections/experience'
import Certifications from '@/components/portfolio/sections/certifications'
import Gallery from '@/components/portfolio/sections/gallery'
import Connect from '@/components/portfolio/sections/connect'

export default function Home() {
  useEffect(() => {
    initLenis()

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 300)
    // Fonts change text metrics → runway/trigger positions shift. Refresh when
    // they land (fixes sections being off-position on first paint).
    document.fonts?.ready?.then(refresh).catch(() => {})

    // Smooth in-page anchor clicks through Lenis (hero buttons, about link).
    // Native hash jumps bypass Lenis, and scrolling to a sticky scene element
    // is a no-op (its rect is pinned at top) — target the runway instead.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      event.preventDefault()
      const runway = el.nextElementSibling?.hasAttribute('data-runway')
        ? (el.nextElementSibling as HTMLElement)
        : null
      const target = runway
        ? runway.offsetTop - window.innerHeight + 2
        : el.getBoundingClientRect().top + window.scrollY
      getLenis()?.scrollTo(target, { duration: 1.15, offset: 0 })
    }
    document.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('load', refresh)
      document.removeEventListener('click', onClick)
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
