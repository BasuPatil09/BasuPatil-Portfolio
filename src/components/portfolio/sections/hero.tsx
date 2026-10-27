'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import Scene from '../scene'
import { useReveal } from '@/lib/use-reveal'
import { personal, media } from '@/lib/portfolio-data'
import { ArrowUpRight, Icon } from '@/lib/icons'

function PortraitSlot() {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <div className="ref-portrait-slot" aria-label="Portrait photo placeholder">
        <span>BASU PATIL</span>
        <small>BASU PATIL</small>
      </div>
    )
  }
  return (
    <Image
      className="ref-portrait-image"
      src={media.hero.src}
      alt={media.hero.alt}
      width={816}
      height={1208}
      priority
      onError={() => setMissing(true)}
    />
  )
}

function StatCard({ stat }: { stat: { icon: string; value: string; suffix: string; label: string } }) {
  return (
    <div className="ref-stat-card">
      <span className="ref-stat-icon"><Icon name={stat.icon} className="w-4 h-4" /></span>
      <strong>{stat.value}<i>{stat.suffix}</i></strong>
      <small>{stat.label}</small>
    </div>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useReveal(root, (reduceMotion) => {
    gsap.fromTo('.ref-hero-enter', { autoAlpha: 0, y: 28 }, {
      autoAlpha: 1,
      y: 0,
      duration: reduceMotion ? 0 : 0.85,
      ease: 'power3.out',
      stagger: 0.1,
    })
  })

  return (
    <Scene id="hero" index={2} runway={1.35} bg="bg-paper" className="hero-scene">
      <section ref={root} className="ref-hero" aria-labelledby="hero-title">
        <div className="ref-hero-ambient" aria-hidden="true">
          <span className="ref-hero-glow ref-hero-glow-left" />
          <span className="ref-hero-glow ref-hero-glow-right" />
          <span className="ref-hero-ring" />
          <span className="ref-hero-plus ref-hero-plus-left">+</span>
          <span className="ref-hero-plus ref-hero-plus-right">+</span>
          {[['8%', '26%'], ['14%', '62%'], ['5%', '78%'], ['90%', '22%'], ['94%', '58%'], ['86%', '82%']].map(([left, top], index) => (
            <span key={index} className={`ref-hero-particle ${index === 0 || index === 4 ? 'is-accent' : ''}`} style={{ left, top }} />
          ))}
        </div>

        <div className="ref-hero-head">
          <p className="ref-hero-enter ref-hero-kicker">{personal.role}</p>
          <h1 id="hero-title" className="ref-hero-enter ref-hero-title">
            Systems that learn <em>fast.</em><br />
            Code that <em className="is-red">ships.</em>
          </h1>
          <p className="ref-hero-enter ref-hero-sub">{personal.tagline}</p>
          <div className="ref-hero-enter ref-hero-actions">
            <a href="#work" className="ref-button-primary">View My Work <ArrowUpRight className="w-4 h-4" /></a>
            <a href="#about" className="ref-button-secondary">See How I Work</a>
          </div>
        </div>

        <div className="ref-hero-stage-row">
          <div className="ref-hero-side ref-hero-side-left">
            {personal.stats.slice(0, 2).map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>

          <div className="ref-hero-stage">
            <div className="ref-hero-arch-line" aria-hidden="true" />
            <div className="ref-hero-arch" aria-hidden="true" />
            <PortraitSlot />
          </div>

          <div className="ref-hero-side ref-hero-side-right">
            {personal.stats.slice(2).map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>
        </div>

        <div className="ref-hero-cue ref-hero-enter" aria-hidden="true">
          <span>Scroll</span>
          <span className="ref-hero-cue-arrow">↓</span>
        </div>

      </section>
    </Scene>
  )
}
