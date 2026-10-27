'use client'

/*
 * MY DEV STACK — full-viewport spiral orbit (ported from the inspiration
 * design's DesignStack; content is Basu's own toolkit).
 *
 * · Archimedean path (radius falls linearly with angle → evenly spaced arms)
 *   with arc-length reparameterization — a lookup table inverts cumulative
 *   arc length so equal steps along the PATH give equal visual gaps.
 * · The path is an ELLIPSE matched to the viewport; the table rebuilds when
 *   the aspect ratio changes, so spacing stays visually even.
 * · Rotation is a BANK taken from the tangent vector (lean ∝ dy/|d|) —
 *   every name stays upright, continuous through angle wrap.
 * · DOM, not canvas — glassmorphism, per-card hover and screen-reader access
 *   are impossible on canvas. Driven by the shared gsap ticker and gated by
 *   an IntersectionObserver so it stops when off screen.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Scene from '../scene'
import { toolkit } from '@/lib/portfolio-data'

const TWO_PI = Math.PI * 2

/* path shape */
const TURNS = 1.9
const PHASE = -Math.PI * 0.5
/* innermost radius as a fraction of the outer one — the clean disc the
   stationary center content lives in */
const INNER_WIDE = 0.4
const INNER_COMPACT = 0.62

/* motion */
const SPEED = 0.021 // path fractions per second (~48s per full traverse)
const HOVER_SLOW = 0.16

/* appearance along the path */
const FADE_IN = 0.09
const FADE_OUT = 0.3
const SCALE_POW = 0.5
const LEAN_MAX = 11 // degrees

/* ---------- arc-length reparameterization ----------
   Built in units of Rx, for a given ratio = Ry/Rx and inner radius. Cached;
   rebuilt only when the viewport's aspect ratio changes meaningfully. */
const M = 1000
const K = 1024

type Table = { nForArc: Float32Array; ratio: number; inner: number }

function buildArcTable(ratio: number, inner: number): Table {
  const point = (n: number) => {
    const a = n * TURNS * TWO_PI + PHASE
    const r = 1 - n * (1 - inner)
    return { x: r * Math.cos(a), y: -r * Math.sin(a) * ratio }
  }

  const cum = new Float32Array(M + 1)
  let prev = point(0)
  for (let k = 1; k <= M; k++) {
    const p = point(k / M)
    cum[k] = cum[k - 1] + Math.hypot(p.x - prev.x, p.y - prev.y)
    prev = p
  }
  const total = cum[M] || 1

  const nForArc = new Float32Array(K + 1)
  let j = 0
  for (let a = 0; a <= K; a++) {
    const target = (a / K) * total
    while (j < M && cum[j + 1] < target) j++
    const seg = cum[j + 1] - cum[j]
    nForArc[a] = (j + (seg > 0 ? (target - cum[j]) / seg : 0)) / M
  }
  return { nForArc, ratio, inner }
}

/* Tool marks — self-hosted brand SVGs (public/logos/tools/, vendored from the
   simple-icons package by scripts/build-tool-logos.mjs, brand color baked in).
   Tools without a vendored mark render a brand-tinted monogram instead, which
   keeps the set visually uniform (same pattern as the inspiration design). */
const MARKS: Record<string, string> = {
  Python: '/logos/tools/python.svg', PyTorch: '/logos/tools/pytorch.svg',
  TensorFlow: '/logos/tools/tensorflow.svg', 'Scikit-learn': '/logos/tools/scikit-learn.svg',
  'Hugging Face': '/logos/tools/hugging-face.svg', LangChain: '/logos/tools/langchain.svg',
  LangGraph: '/logos/tools/langgraph.svg', OpenCV: '/logos/tools/opencv.svg',
  YOLOv8: '/logos/tools/yolov8.svg', Pandas: '/logos/tools/pandas.svg',
  NumPy: '/logos/tools/numpy.svg', Seaborn: '/logos/tools/seaborn.svg',
  'C++': '/logos/tools/c.svg', JavaScript: '/logos/tools/javascript.svg',
  SQL: '/logos/tools/sql.svg', React: '/logos/tools/react.svg',
  FastAPI: '/logos/tools/fastapi.svg', Flask: '/logos/tools/flask.svg',
  'Node.js': '/logos/tools/node-js.svg',
  Docker: '/logos/tools/docker.svg', MLflow: '/logos/tools/mlflow.svg',
  Modal: '/logos/tools/modal.svg', Supabase: '/logos/tools/supabase.svg',
  'Git & GitHub': '/logos/tools/git-github.svg', Colab: '/logos/tools/colab.svg',
  Figma: '/logos/tools/figma.svg',
}

/* Brand tint for the monogram fallback (Matplotlib and AWS were removed from
   the simple-icons set; MLOps is a practice, not a brand). */
const TINTS: Record<string, string> = {
  Matplotlib: '#11557C', AWS: '#FF9900', MLOps: '#141414',
}

type Tool = { name: string; code: string; group: string }

const TOOLS: Tool[] = toolkit.flatMap((group) =>
  group.items.map((item) => ({ name: item.label, code: item.code, group: group.group })),
)

function ToolMark({ tool }: { tool: Tool }) {
  const src = MARKS[tool.name]
  const tint = TINTS[tool.name] ?? '#141414'
  return (
    <span className={`dstk-mark ${src ? '' : 'no-img'}`}>
      {src ? (
        <img
          src={src}
          alt=""
          onError={(event) => event.currentTarget.parentElement?.classList.add('is-broken')}
        />
      ) : null}
      <span className="dstk-mono" style={{ color: tint, background: `${tint}14` }} aria-hidden="true">
        {tool.code}
      </span>
    </span>
  )
}

export default function Toolkit() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stageEl = stage.current
    const rootEl = root.current
    if (!stageEl || !rootEl) return

    const cards = Array.from(stageEl.querySelectorAll<HTMLElement>('.dstk-card'))
    const N = cards.length
    if (!N) return

    // Any mark whose image failed before hydration attached its handler (the
    // error event was lost) is flipped to the monogram here.
    stageEl.querySelectorAll<HTMLElement>('.dstk-mark').forEach((mark) => {
      const img = mark.querySelector('img')
      if (img && img.complete && img.naturalWidth === 0) mark.classList.add('is-broken')
    })

    const compactMQ = window.matchMedia('(max-width: 700px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let Rx = 0
    let Ry = 0
    let inner = INNER_WIDE
    let table = buildArcTable(1, INNER_WIDE)

    const measure = () => {
      const w = stageEl.clientWidth
      const h = stageEl.clientHeight
      const compact = compactMQ.matches

      inner = compact ? INNER_COMPACT : INNER_WIDE
      // the outer ring reaches every edge; on very narrow screens it is
      // allowed to overflow horizontally so the orbit still clears the text
      Rx = compact ? Math.max(0.5 * w, 236) : 0.5 * w
      Ry = 0.5 * h

      const ratio = Ry / Rx
      if (Math.abs(ratio - table.ratio) / table.ratio > 0.02 || inner !== table.inner) {
        table = buildArcTable(ratio, inner)
      }
    }

    /** arc fraction s ∈ [0,1) → spiral parameter n (interpolated) */
    const arcToN = (s: number) => {
      const x = Math.min(K, Math.max(0, s * K))
      const i = Math.floor(x)
      const a = table.nForArc[i]
      const b = table.nForArc[Math.min(i + 1, K)]
      return a + (b - a) * (x - i)
    }

    const at = (n: number) => {
      const ang = n * TURNS * TWO_PI + PHASE
      const rFrac = 1 - n * (1 - inner)
      return { x: Rx * rFrac * Math.cos(ang), y: -Ry * rFrac * Math.sin(ang), rFrac }
    }

    const zSet = cards.map(() => -1)

    const place = (base: number) => {
      for (let i = 0; i < N; i++) {
        const s = (base + i / N) % 1
        const n = arcToN(s)
        const p = at(n)

        // fade at both ends of the path
        let o = 1
        if (s < FADE_IN) o = s / FADE_IN
        else if (s > 1 - FADE_OUT) o = (1 - s) / FADE_OUT
        o = Math.max(0, Math.min(1, o))

        // smaller toward the center
        const scale = Math.pow(p.rFrac, SCALE_POW)

        // bank taken from the true tangent vector — continuous, always upright
        const q = at(Math.min(n + 0.002, 1))
        const dx = q.x - p.x
        const dy = q.y - p.y
        const len = Math.hypot(dx, dy) || 1
        const lean = LEAN_MAX * (dy / len)

        const el = cards[i]
        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${lean.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        el.style.opacity = o.toFixed(3)

        const z = Math.round((1 - n) * 100)
        if (z !== zSet[i]) {
          el.style.zIndex = String(z)
          zSet[i] = z
        }
      }
    }

    measure()

    if (reduced) {
      place(0)
      return
    }

    let base = 0
    let speedMul = 1
    let target = 1

    const tick = (_time: number, dt: number) => {
      const f = Math.min(dt / 1000, 0.05)
      speedMul += (target - speedMul) * Math.min(f * 6, 1)
      base = (base + SPEED * speedMul * f) % 1
      place(base)
    }

    // the orbit eases down only while a CARD is hovered, so you can read the
    // one you reached for; crossing empty stage does nothing
    let hovered = 0
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.('.dstk-card')) {
        hovered++
        target = HOVER_SLOW
      }
    }
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.('.dstk-card')) {
        hovered = Math.max(0, hovered - 1)
        if (!hovered) target = 1
      }
    }
    stageEl.addEventListener('pointerover', onOver)
    stageEl.addEventListener('pointerout', onOut)

    const ro = new ResizeObserver(() => {
      measure()
      place(base)
    })
    ro.observe(stageEl)

    let running = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          gsap.ticker.add(tick)
          running = true
        } else if (!entry.isIntersecting && running) {
          gsap.ticker.remove(tick)
          running = false
        }
      },
      { rootMargin: '120px' },
    )
    io.observe(rootEl)

    place(0)

    return () => {
      if (running) gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      stageEl.removeEventListener('pointerover', onOver)
      stageEl.removeEventListener('pointerout', onOut)
    }
  }, [])

  return (
    <Scene ref={root} id="toolkit" index={5} runway={1.15} bg="bg-paper">
      <section className="dstk-section" aria-labelledby="stack-title">
        <div className="dstk-glow-a" aria-hidden="true" />
        <div className="dstk-glow-b" aria-hidden="true" />

        <div className="dstk-stage" ref={stage}>
          {/* stationary focal point */}
          <div className="dstk-center">
            <p className="dstk-eyebrow">
              <span>03</span> Toolkit
            </p>
            <h2 id="stack-title" className="dstk-h2">
              My dev <em className="dstk-serif">stack.</em>
            </h2>
            <p className="dstk-lede">
              The technologies I use to build, train, deploy, and ship practical AI systems.
            </p>
            <p className="dstk-count">
              {TOOLS.length} tools · <span>{toolkit.length}</span> disciplines
            </p>
          </div>

          {/* orbiting cards — a real list, so screen readers get the full set */}
          <ul className="dstk-orbit">
            {TOOLS.map((tool) => (
              <li className="dstk-card" key={tool.name}>
                <span className="dstk-face">
                  <ToolMark tool={tool} />
                  <span className="dstk-name">{tool.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Scene>
  )
}
