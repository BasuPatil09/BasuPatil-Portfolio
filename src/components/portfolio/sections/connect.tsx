'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import Scene from '../scene'
import { useReveal } from '@/lib/use-reveal'
import { personal, finalGalleryPhotos } from '@/lib/portfolio-data'
import { ArrowUpRight, ArrowUp, Github, Linkedin, Code, Mail } from '@/lib/icons'
import { getLenis } from '@/lib/lenis'

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: personal.links.linkedin },
  { icon: Github, label: 'GitHub', href: personal.links.github },
  { icon: Code, label: 'LeetCode', href: personal.links.leetcode },
  { icon: Mail, label: 'Email', href: `mailto:${personal.email}` },
]

function Photo({ photo, index }: { photo: { src: string; label: string } | undefined; index: number }) {
  const [missing, setMissing] = useState(false)
  if (!photo || missing) {
    return (
      <div className={`connect-gallery-card connect-gallery-placeholder card-${index + 1}`} aria-label="Empty photo slot" />
    )
  }
  return (
    <figure className={`connect-gallery-card card-${index + 1}`}>
      <img src={photo.src} alt={photo.label || `Portfolio moment ${index + 1}`} onError={() => setMissing(true)} />
    </figure>
  )
}

export default function Connect() {
  const root = useRef<HTMLElement>(null)
  const photos = finalGalleryPhotos

  // Click fix: the original used window.scrollTo which fights Lenis' raf loop
  // (it would snap, then Lenis snaps back). Route it through Lenis instead.
  const backToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useReveal(root, (reduceMotion) => {
    gsap.fromTo('.connect-gallery-enter', { autoAlpha: 0, y: 28 }, {
      autoAlpha: 1,
      y: 0,
      duration: reduceMotion ? 0 : .8,
      ease: 'power3.out',
      stagger: .08,
    })
  })

  return (
    <Scene id="connect" index={10} runway={1.3} bg="bg-paper">
      <section ref={root} className="connect-gallery" aria-labelledby="connect-title">
        <p className="connect-gallery-enter connect-gallery-kicker"><span>08</span> Let&apos;s connect</p>
        <h2 id="connect-title" className="connect-gallery-enter">The person behind <em>the systems.</em></h2>
        <p className="connect-gallery-enter connect-gallery-lede">Open to AI/ML internships, collaborations, and hackathon teams.</p>

        <div className="connect-gallery-row">
          {Array.from({ length: 5 }, (_, index) => <Photo key={index} photo={photos[index]} index={index} />)}
        </div>

        <div className="connect-gallery-socials">
          {SOCIALS.map(({ icon: SocialIcon, label, href }) => (
            <a className="connect-gallery-enter" key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
              <SocialIcon className="w-4 h-4" strokeWidth={1.8} /> {label} <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </a>
          ))}
        </div>

        <footer className="connect-gallery-footer connect-gallery-enter">
          <span>© {new Date().getFullYear()} {personal.legalName}</span>
          <button type="button" onClick={backToTop} className="connect-back-to-top">Back to top <ArrowUp className="w-3.5 h-3.5" /></button>
          <span>{personal.location}</span>
        </footer>
      </section>
    </Scene>
  )
}
