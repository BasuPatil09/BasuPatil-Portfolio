import { useRef } from 'react'
import Scene from '../../layout/Scene'
import { useScrub } from '../../../lib/scene'
import { certifications, personal } from '../../../content/portfolio'
import { ExternalLink } from '../../../lib/icons'

function IssuerMark({ issuer }) {
  const value = issuer.toLowerCase()

  if (value.includes('ibm')) {
    return <span className="credential-brand credential-brand-ibm" aria-label="IBM">IBM</span>
  }

  if (value.includes('linkedin')) {
    return <span className="credential-brand credential-brand-linkedin" aria-label="LinkedIn"><b>in</b><span>LinkedIn</span></span>
  }

  return <span className="credential-brand credential-brand-text">{issuer.split(/[·—]/)[0].trim()}</span>
}

export default function Certifications() {
  const sceneRef = useRef(null)
  const cardRefs = useRef([])
  const dimRefs = useRef([])
  const counterRef = useRef(null)
  const count = certifications.length

  useScrub(sceneRef, (progress) => {
    const virtual = progress * count

    certifications.forEach((_, index) => {
      const offset = index - virtual
      const card = cardRefs.current[index]
      const dim = dimRefs.current[index]
      if (!card) return

      const visible = offset > -1.001 && offset < 1.5
      if (!visible) {
        card.style.opacity = '0'
        card.style.pointerEvents = 'none'
        return
      }

      const left = Math.max(0, offset) * 84
      const opacity = offset < -1 ? 0 : 1 - Math.max(0, -offset) * 0.6
      card.style.left = `${left}%`
      card.style.opacity = String(Math.min(1, opacity))
      card.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10))
      card.style.pointerEvents = Math.abs(offset) < 0.5 ? 'auto' : 'none'
      if (dim) dim.style.opacity = String(Math.max(0, Math.min(0.6, offset * 0.7)))
    })

    if (counterRef.current) {
      const active = Math.min(count, Math.floor(virtual) + 1)
      counterRef.current.textContent = `${String(active).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
    }
  })

  return (
    <Scene ref={sceneRef} id="credentials" index={8} runway={3.4} bg="bg-paper-soft" className="relative">
      <div className="flex-1 flex flex-col px-6 md:px-16 lg:px-24 pt-10 pb-4">
        <div className="text-center mb-6 shrink-0">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">06 Credentials</p>
          <h2 className="font-body font-extrabold text-clamp-h1 text-ink mb-2">CREDENTIALS</h2>
          <p className="text-sm text-ink-dim max-w-md mx-auto">
            Certifications earned across AI, ML, data, and cloud — Oct 2024 through Aug 2026.
          </p>
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
          {certifications.map((certificate, index) => (
            <a
              key={certificate.title}
              ref={(element) => { cardRefs.current[index] = element }}
              href={certificate.link}
              target="_blank"
              rel="noreferrer"
              className={`credential-card group absolute top-0 h-full w-[82%] sm:w-[70%] rounded-2xl p-7 md:p-10 flex flex-col ${index % 2 ? 'credential-card--dark' : 'credential-card--light'}`}
              style={{ opacity: 0 }}
            >
              <div ref={(element) => { dimRefs.current[index] = element }} className="credential-card-dim absolute inset-0 rounded-2xl pointer-events-none" style={{ opacity: 0 }} />

              <div className="credential-card-header relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="credential-card-index font-mono text-[11px]">{certificate.index} CERTIFICATION</span>
                  <IssuerMark issuer={certificate.issuer} />
                </div>
                <span className="credential-card-view inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors">
                  View credential <ExternalLink className="w-3 h-3" strokeWidth={1.8} />
                </span>
              </div>

              <h3 className="credential-card-title relative z-10 font-body font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight mb-8 max-w-xl">
                {certificate.title}
              </h3>

              <div className="credential-card-meta relative z-10 grid grid-cols-3 gap-4 mb-8 max-w-md pt-5">
                <div>
                  <p className="credential-card-label font-mono text-[10px] uppercase tracking-wide mb-1">Issued by</p>
                  <p className="credential-card-value text-sm font-medium">{certificate.issuer.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="credential-card-label font-mono text-[10px] uppercase tracking-wide mb-1">Date</p>
                  <p className="credential-card-value text-sm font-medium">{certificate.date}</p>
                </div>
                <div>
                  <p className="credential-card-label font-mono text-[10px] uppercase tracking-wide mb-1">Credential ID</p>
                  <p className="credential-card-value text-sm font-medium truncate">{certificate.credId}</p>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <p className="credential-card-label font-mono text-[10px] uppercase tracking-wide mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {certificate.topics.map((topic) => (
                    <span key={topic} className="credential-card-topic text-xs rounded-full px-3 py-1.5">{topic}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 shrink-0">
          <span className="font-mono text-[11px] text-ink-faint">06 · {personal.displayName}</span>
          <span ref={counterRef} className="font-mono text-[11px] text-ink-faint">01 / {String(count).padStart(2, '0')}</span>
          <span className="font-mono text-[11px] text-ink-faint">Credentials</span>
        </div>
      </div>
    </Scene>
  )
}
