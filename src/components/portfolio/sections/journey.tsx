'use client'

/*
 * THE JOURNEY v2 — light-cable tunnel (ported from the inspiration design's
 * LightJourney; content is Basu's own six chapters).
 *
 * · 20 wavy light cables (10 on mobile) converge toward a vanishing point;
 *   additive-blended shader pulses travel outward along them — energy moving
 *   through a living system, with direction, depth and falloff.
 * · SCROLL IS THE JOURNEY: the scene pins for ~6 viewports (its runway).
 *   Scroll progress drives travel, pulse energy and the color progression —
 *   blue → orange → coral → purple → green — so the journey has a beginning,
 *   middle and climax. Flick fast and the tunnel surges, then settles.
 * · The pointer leans the camera and sways the tunnel (±0.06).
 * · THE EXIT: light intensity peaks, then the cables dissolve as white
 *   returns and the next scene rises — the same compression-into-white
 *   grammar as the opening tunnel.
 * · prefers-reduced-motion (or no WebGL) drops the pin entirely: chapters
 *   render as a plain readable stack, so content is never motion-gated.
 */

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from '../scene'
import { journey } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

/* palette progression across the journey */
const PALETTE = ['#0072E3', '#FF6A00', '#FF2E0F', '#AB54F7', '#00AA3C']

const DEPTH = 30
const RADIUS = 1.12
const WAVINESS = 0.3
const TRAVEL_TOTAL = 26 // pulse-phase travel across the journey
const T_EXIT = 0.9 // white return begins

/* Chapters live inside this slice of the pin: the head is the section title
   settling, the tail is the last chapter holding before the whiteout. */
const CH_START = 0.06
const CH_END = 0.86
const CH_SPAN = (CH_END - CH_START) / journey.length

const VERT = /* glsl */ `
  varying float vT;
  varying float vZ;
  void main() {
    vT = uv.x;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vZ = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTravel;
  uniform float uPhase;
  uniform float uEnergy;
  uniform float uMaster;
  varying float vT;
  varying float vZ;
  void main() {
    float p = fract(vT * 3.0 - uTravel * 0.14 + uPhase);
    float pulse = smoothstep(0.30, 0.0, p) * (1.1 + uEnergy * 1.6);
    float b = 0.20 + pulse;
    float a = smoothstep(0.6, 2.4, vZ) * (1.0 - smoothstep(16.0, 27.0, vZ));
    vec3 c = uColor * b;
    gl_FragColor = vec4(c, 1.0) * a * uMaster;
  }
`

export default function Journey() {
  const rootRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglOk, setWebglOk] = useState(true)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const rootEl = rootRef.current
    const frame = frameRef.current
    const canvas = canvasRef.current
    if (!rootEl || !frame || !canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Local function indirection (same pattern as the compact sync elsewhere)
    // — static mode flips after mount, keeping the effect body side-effect free.
    const enterStaticMode = () => setStaticMode(true)
    if (reduced) enterStaticMode()
    const compact = window.matchMedia('(max-width: 1000px), (hover: none) and (pointer: coarse)').matches
    const CABLES = compact ? 10 : 20
    const DPR_CAP = compact ? 1.5 : 2

    let renderer: THREE.WebGLRenderer
    // Indirection keeps the effect body free of synchronous setState.
    const markWebglMissing = () => setWebglOk(false)
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
    } catch {
      markWebglMissing()
      return
    }
    renderer.setPixelRatio(Math.min(DPR_CAP, window.devicePixelRatio || 1))

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0a0a0c')
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, 0)

    const group = new THREE.Group()
    scene.add(group)

    const paletteC = PALETTE.map((h) => new THREE.Color(h))

    /* ---------- cables ---------- */
    type Cable = { mat: THREE.ShaderMaterial; baseColor: THREE.Color }
    const cables: Cable[] = []
    const geoms: THREE.BufferGeometry[] = []

    for (let i = 0; i < CABLES; i++) {
      const angle = (i / CABLES) * Math.PI * 2 + (Math.random() - 0.5) * 0.18
      const rBase = RADIUS * (0.86 + Math.random() * 0.34)
      const wPhase = Math.random() * Math.PI * 2
      const wFreq = 1.6 + Math.random() * 1.6

      const pts: THREE.Vector3[] = []
      const STEPS = 26
      for (let s = 0; s <= STEPS; s++) {
        const t = s / STEPS
        const z = 1.4 - t * (DEPTH + 1.4)
        const wob = Math.sin(t * wFreq * Math.PI * 2 + wPhase) * WAVINESS * (0.25 + t)
        const r = rBase + wob * 0.4
        const a = angle + wob * 0.22
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.82, z))
      }
      const curve = new THREE.CatmullRomCurve3(pts)
      const geo = new THREE.TubeGeometry(curve, compact ? 48 : 72, 0.016, 5, false)
      geoms.push(geo)

      const baseColor = paletteC[i % paletteC.length].clone()
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uColor: { value: baseColor.clone() },
          uTravel: { value: 0 },
          uPhase: { value: Math.random() },
          uEnergy: { value: 0.3 },
          uMaster: { value: 1 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      group.add(new THREE.Mesh(geo, mat))
      cables.push({ mat, baseColor })
    }

    /* soft core at the vanishing point — the infinite end of the tunnel */
    const coreCanvas = document.createElement('canvas')
    coreCanvas.width = coreCanvas.height = 128
    const cctx = coreCanvas.getContext('2d')!
    const grad = cctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(255,255,255,0.9)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.28)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    cctx.fillStyle = grad
    cctx.fillRect(0, 0, 128, 128)
    const coreTex = new THREE.CanvasTexture(coreCanvas)
    const coreMat = new THREE.SpriteMaterial({
      map: coreTex,
      color: new THREE.Color(PALETTE[0]),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    })
    const core = new THREE.Sprite(coreMat)
    core.position.set(0, 0, -DEPTH + 4)
    core.scale.setScalar(7)
    scene.add(core)

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = Math.max(1, frame.clientWidth)
      const h = Math.max(1, frame.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      if (reduced) renderer.render(scene, camera)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(frame)
    resize()

    /* ---------- color mixing per progress ---------- */
    const mixed = new THREE.Color()
    const applyColors = (p: number) => {
      const x = gsap.utils.clamp(0, PALETTE.length - 1.001, p * (PALETTE.length - 1))
      const i0 = Math.floor(x)
      const f = x - i0
      mixed.copy(paletteC[i0]).lerp(paletteC[i0 + 1], f)
      for (const c of cables) {
        // controlled variance: 72% progression color, 28% the cable's own hue
        ;(c.mat.uniforms.uColor.value as THREE.Color).copy(mixed).lerp(c.baseColor, 0.28)
      }
      coreMat.color.copy(mixed)
    }
    applyColors(0)

    /* ---------- reduced motion: calm static frame ---------- */
    if (reduced) {
      for (const c of cables) c.mat.uniforms.uTravel.value = 0.6
      applyColors(0.4)
      renderer.render(scene, camera)
      return () => {
        ro.disconnect()
        geoms.forEach((g) => g.dispose())
        cables.forEach((c) => c.mat.dispose())
        coreTex.dispose()
        coreMat.dispose()
        renderer.dispose()
      }
    }

    /* ---------- journey state ---------- */
    let progress = 0
    let travel = 0
    let idle = 0
    let mx = 0
    let my = 0

    const chapterEls = Array.from(rootEl.querySelectorAll<HTMLElement>('.lj-chapter'))
    const tickEls = Array.from(rootEl.querySelectorAll<HTMLElement>('.lj-tick'))
    const introEl = rootEl.querySelector<HTMLElement>('.lj-intro')
    const counterEl = rootEl.querySelector<HTMLElement>('.lj-counter-now')
    const narrative = rootEl.querySelector<HTMLElement>('.lj-overlay')
    const whiteout = rootEl.querySelector<HTMLElement>('.lj-whiteout')
    let shown = -1

    const onPointerMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2
      my = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onPointerLeave = () => {
      mx = 0
      my = 0
    }
    frame.addEventListener('pointermove', onPointerMove)
    frame.addEventListener('pointerleave', onPointerLeave)

    let raf = 0
    let last = 0
    let running = false

    const animate = (now: number) => {
      if (!running) return
      raf = requestAnimationFrame(animate)
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
      last = now

      // travel: progress-mapped + slow idle life, inertia-lerped
      idle += dt * 0.35
      const target = progress * TRAVEL_TOTAL + idle
      travel += (target - travel) * 0.075

      const energy = 0.3 + progress * 1.5 // pulses intensify with depth
      for (const c of cables) {
        c.mat.uniforms.uTravel.value = travel
        c.mat.uniforms.uEnergy.value = energy
      }

      // exit: light peaks then dissolves into white
      const rel = gsap.utils.clamp(0, 1, (progress - T_EXIT) / (1 - T_EXIT))
      const eased = rel * rel * (3 - 2 * rel)
      for (const c of cables) c.mat.uniforms.uMaster.value = 1 - eased
      coreMat.opacity = 0.85 * (1 - eased) + 0.6 * eased
      if (whiteout) whiteout.style.opacity = String(eased)
      // the story dissolves with the tunnel — white text never gets stranded
      if (narrative) narrative.style.opacity = String(1 - eased)

      // atmosphere: camera lean + slow sway
      camera.position.x += (mx * 0.06 - camera.position.x) * 0.05
      camera.position.y += (-my * 0.045 - camera.position.y) * 0.05
      group.rotation.z = Math.sin(travel * 0.05) * 0.05 + mx * 0.02

      applyColors(progress)
      renderer.render(scene, camera)
    }

    const startLoop = () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(animate)
    }
    const stopLoop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    /* ---------- the journey, held by its Scene ----------
       The sticky hold pins this scene, so the trigger only reads progress
       across the scene's runway (same ruler the rest of the site uses). */
    const hold = rootEl.closest('[data-scene]')
    const next = hold?.nextElementSibling ?? null
    const runway = next instanceof HTMLElement && next.hasAttribute('data-runway') ? next : null

    const st = ScrollTrigger.create({
      trigger: runway ?? rootEl,
      start: runway ? 'top bottom' : 'top top',
      end: runway ? 'bottom bottom' : 'bottom top',
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress = self.progress
        const p = self.progress

        // the section title hands over to chapter one
        if (introEl) introEl.style.opacity = String(gsap.utils.clamp(0, 1, 1 - p / CH_START))

        // one chapter at a time; -1 while the title still owns the frame
        const idx = p < CH_START ? -1 : Math.min(journey.length - 1, Math.floor((p - CH_START) / CH_SPAN))

        if (idx !== shown) {
          shown = idx
          // class swap only — the stagger and crossfade are CSS
          chapterEls.forEach((el, i) => el.classList.toggle('lj-on', i === idx))
          tickEls.forEach((el, i) => el.classList.toggle('lj-tick-on', i <= idx))
          if (counterEl) {
            counterEl.textContent = String(Math.max(0, idx) + 1).padStart(2, '0')
          }
        }
      },
      onToggle: (self) => (self.isActive ? startLoop() : stopLoop()),
    })

    // render while approaching too, so it's alive before the pin
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop()
        else if (!st.isActive) stopLoop()
      },
      { rootMargin: '160px' },
    )
    io.observe(rootEl)

    return () => {
      stopLoop()
      st.kill()
      io.disconnect()
      ro.disconnect()
      frame.removeEventListener('pointermove', onPointerMove)
      frame.removeEventListener('pointerleave', onPointerLeave)
      geoms.forEach((g) => g.dispose())
      cables.forEach((c) => c.mat.dispose())
      coreTex.dispose()
      coreMat.dispose()
      renderer.dispose()
    }
  }, [])

  const isStatic = staticMode || !webglOk

  return (
    <Scene id="journey" index={4} runway={6} bg="bg-night">
      <section className="lj-journey" ref={rootRef} aria-label="My journey">
        <div className={`lj-frame ${isStatic ? 'lj-frame-static' : ''}`} ref={frameRef}>
          {webglOk ? <canvas ref={canvasRef} className="lj-canvas" aria-hidden="true" /> : null}

          {/* ---------- travelling narrative (the scroll experience) ---------- */}
          {!isStatic && (
            <>
              <div className="lj-scrim" aria-hidden="true" />

              <div className="lj-overlay">
                <div className="lj-intro">
                  <p className="lj-intro-label">
                    <span>02</span> My Journey
                  </p>
                  <p className="lj-intro-lede">
                    From problem sets at PU College to an IEEE stage — the chapters that turned
                    curiosity into shipped AI systems.
                  </p>
                  <p className="lj-intro-hint">Scroll to travel</p>
                </div>

                {journey.map((chapter) => (
                  <article className="lj-chapter" key={chapter.id}>
                    <span className="lj-ch-year">{chapter.year}</span>
                    <h3 className="lj-ch-title">{chapter.title}</h3>
                    <p className="lj-ch-place">{chapter.place}</p>
                    <p className="lj-ch-story">{chapter.body}</p>
                    <p className="lj-ch-bridge">
                      <i aria-hidden="true">→</i> {chapter.insight}
                    </p>
                  </article>
                ))}

                {/* chapter rail — where you are in the journey */}
                <div className="lj-rail">
                  <span className="lj-counter">
                    <b className="lj-counter-now">01</b> / {String(journey.length).padStart(2, '0')}
                  </span>
                  <span className="lj-ticks">
                    {journey.map((chapter, i) => (
                      <span className={`lj-tick ${i === 0 ? 'lj-tick-on' : ''}`} key={chapter.id} />
                    ))}
                  </span>
                </div>
              </div>

              <div className="lj-whiteout" aria-hidden="true" />
            </>
          )}

          {/* ---------- the same story, readable without motion ---------- */}
          <div className={isStatic ? 'lj-static-story' : 'lj-sr-only'}>
            <h2>My Journey</h2>
            <p className="lj-static-lede">
              From problem sets at PU College to an IEEE stage — the chapters that turned curiosity
              into shipped AI systems.
            </p>
            <ol>
              {journey.map((chapter) => (
                <li key={chapter.id}>
                  <span className="lj-static-year">{chapter.year}</span>
                  <h3>{chapter.title}</h3>
                  <p className="lj-static-place">{chapter.place}</p>
                  <p>{chapter.body}</p>
                  <p className="lj-static-bridge">{chapter.insight}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </Scene>
  )
}
