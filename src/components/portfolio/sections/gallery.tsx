'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Scene from '../scene'
import { useScrub } from '@/lib/scene'
import { archivePhotos } from '@/lib/portfolio-data'

function PhotoTile({ photo }: { photo: { src: string; label: string } }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className="basu-gallery-tile">
      {missing ? (
        <div className="basu-gallery-placeholder">
          <span>PHOTO</span>
          <small>{photo.label}</small>
          <b>PORTFOLIO FRAME</b>
        </div>
      ) : (
        <img src={photo.src} alt={photo.label} onError={() => setMissing(true)} loading="lazy" />
      )}
    </figure>
  )
}

export default function Archive() {
  const sceneRef = useRef<HTMLElement>(null)
  const columnRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollPushRef = useRef(0)
  const photos = archivePhotos
  const columns = useMemo(() => {
    const items: { src: string; label: string }[][] = Array.from({ length: 4 }, () => [])
    photos.forEach((photo, index) => items[index % items.length].push(photo))
    return items
  }, [photos])

  useScrub(sceneRef, (progress) => {
    scrollPushRef.current = progress * 520
  }, { scrub: 0.7 })

  useEffect(() => {
    let raf = 0
    let running = true
    let visible = true
    let previous = 0
    const offsets = columnRefs.current.map(() => 0)
    const speeds = columnRefs.current.map((_, index) => 24 + index * 10)
    const tick = (now: number) => {
      if (!running) return
      raf = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      const delta = previous ? Math.min(0.05, (now - previous) / 1000) : 0
      previous = now
      columnRefs.current.forEach((column, index) => {
        if (!column) return
        const half = Math.max(1, column.scrollHeight / 2)
        offsets[index] = (offsets[index] + speeds[index] * delta) % half
        const total = (offsets[index] + scrollPushRef.current * (0.7 + index * 0.13)) % half
        column.style.transform = `translate3d(0, ${-total}px, 0)`
      })
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) previous = 0
    }, { rootMargin: '180px' })
    if (sceneRef.current) observer.observe(sceneRef.current)
    raf = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <Scene ref={sceneRef} id="archive" index={9} runway={2.8} bg="bg-paper">
      <section className="basu-gallery" aria-labelledby="gallery-title">
        <header className="basu-gallery-head">
          <p><span>07</span> The archive</p>
          <h2 id="gallery-title">The moments behind <em>the work.</em></h2>
        </header>

        <div className="basu-gallery-view">
          <div className="basu-gallery-wall">
            {columns.map((column, columnIndex) => (
              <div className="basu-gallery-column" key={columnIndex}>
                <div ref={(el) => { columnRefs.current[columnIndex] = el }} className="basu-gallery-column-inner" style={{ paddingTop: `${columnIndex * 50}px` }}>
                  {[...column, ...column].map((photo, index) => <PhotoTile key={`${photo.src}-${index}`} photo={photo} />)}
                </div>
              </div>
            ))}
          </div>
          <div className="basu-gallery-fade" aria-hidden="true" />
        </div>

        <footer className="basu-gallery-foot"><span>{String(photos.length).padStart(2, '0')} frames</span><span>Scroll to drift</span></footer>
      </section>
    </Scene>
  )
}
