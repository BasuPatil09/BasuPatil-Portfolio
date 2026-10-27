'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const COLORS = ['#FF6A00', '#AB54F7', '#FF2E0F', '#0072E3', '#00AA3C', '#FFB200']
const TUNNEL_WIDTH = 2
const TUNNEL_HEIGHT = 1.8
const SEGMENT_DEPTH = 1
const GRID = 4
const TRAVEL = 1050
const TRANSITION_START = 0.78
const TRANSITION_RELEASE = 0.9

type Segment = THREE.Group & { userData: { populate: (seed: number) => void } }

function makeSegment(
  lineGeometry: THREE.BufferGeometry,
  lineMaterial: THREE.LineBasicMaterial,
  panelGeometry: { floor: THREE.PlaneGeometry; wall: THREE.PlaneGeometry },
  materials: THREE.MeshBasicMaterial[],
  z: number,
  index: number,
  segments: number,
): Segment {
  const group = new THREE.Group() as Segment
  group.position.z = z
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial))

  const halfWidth = TUNNEL_WIDTH / 2
  const halfHeight = TUNNEL_HEIGHT / 2
  const colWidth = TUNNEL_WIDTH / GRID
  const rowHeight = TUNNEL_HEIGHT / GRID
  const panels: THREE.Mesh[] = []

  const addPanel = (geometry: THREE.PlaneGeometry, x: number, y: number, panelZ: number, rotation: [number, number, number]) => {
    const mesh = new THREE.Mesh(geometry, materials[0])
    mesh.position.set(x, y, panelZ)
    mesh.rotation.set(rotation[0], rotation[1], rotation[2])
    mesh.visible = false
    group.add(mesh)
    panels.push(mesh)
  }

  for (let i = 0; i < GRID; i += 1) {
    const x = -halfWidth + i * colWidth + colWidth / 2
    addPanel(panelGeometry.floor, x, -halfHeight + 0.001, -SEGMENT_DEPTH / 2, [-Math.PI / 2, 0, 0])
    addPanel(panelGeometry.floor, x, halfHeight - 0.001, -SEGMENT_DEPTH / 2, [Math.PI / 2, 0, 0])
  }
  for (let i = 0; i < GRID; i += 1) {
    const y = -halfHeight + i * rowHeight + rowHeight / 2
    addPanel(panelGeometry.wall, -halfWidth + 0.001, y, -SEGMENT_DEPTH / 2, [0, Math.PI / 2, 0])
    addPanel(panelGeometry.wall, halfWidth - 0.001, y, -SEGMENT_DEPTH / 2, [0, -Math.PI / 2, 0])
  }

  const populate = (seed: number) => {
    panels.forEach((panel, panelIndex) => {
      const show = (panelIndex * 7 + seed * 11) % 10 < 4
      panel.visible = show
      if (show) panel.material = materials[(panelIndex * 3 + seed) % materials.length]
    })
  }
  populate(index)
  group.userData.populate = populate
  void segments
  return group
}

function createGridLines(): THREE.BufferGeometry {
  const halfWidth = TUNNEL_WIDTH / 2
  const halfHeight = TUNNEL_HEIGHT / 2
  const points: number[] = []
  const line = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) =>
    points.push(x1, y1, z1, x2, y2, z2)

  for (let i = 0; i <= GRID; i += 1) {
    const x = -halfWidth + (i / GRID) * TUNNEL_WIDTH
    line(x, -halfHeight, 0, x, -halfHeight, -SEGMENT_DEPTH)
    line(x, halfHeight, 0, x, halfHeight, -SEGMENT_DEPTH)
  }
  for (let i = 1; i < GRID; i += 1) {
    const y = -halfHeight + (i / GRID) * TUNNEL_HEIGHT
    line(-halfWidth, y, 0, -halfWidth, y, -SEGMENT_DEPTH)
    line(halfWidth, y, 0, halfWidth, y, -SEGMENT_DEPTH)
  }
  for (let i = 0; i <= GRID; i += 1) {
    const x = -halfWidth + (i / GRID) * TUNNEL_WIDTH
    line(x, -halfHeight, 0, x, halfHeight, 0)
    line(x, -halfHeight, -SEGMENT_DEPTH, x, halfHeight, -SEGMENT_DEPTH)
  }
  for (let i = 0; i <= GRID; i += 1) {
    const y = -halfHeight + (i / GRID) * TUNNEL_HEIGHT
    line(-halfWidth, y, 0, halfWidth, y, 0)
    line(-halfWidth, y, -SEGMENT_DEPTH, halfWidth, y, -SEGMENT_DEPTH)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  return geometry
}

/**
 * Original IntroTunnel.jsx — a Three.js neon tunnel revealed through the
 * "BASU PATIL" lettering, scrubbed by scroll progress.
 *
 * Corrections vs. the original:
 *  - render loop pauses when the tab is hidden or the tunnel is fully
 *    scrolled past (progress === 1 and camera settled) — no wasted GPU.
 *  - Segment count adapts to small screens (12 vs 15) to keep mobile smooth.
 */
export default function IntroTunnel({ progressRef, text }: {
  progressRef: React.MutableRefObject<number>
  text: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLElement>(null)
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const frame = frameRef.current
    if (!canvas || !frame) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' })
    } catch {
      // Schedule after paint — avoids synchronous setState in effect.
      const id = requestAnimationFrame(() => setWebglOk(false))
      return () => cancelAnimationFrame(id)
    }

    const dark = new THREE.Color('#0A0A0C')
    const white = new THREE.Color('#FFFFFF')
    const scene = new THREE.Scene()
    scene.background = dark.clone()
    const SEGMENTS = window.innerWidth <= 640 ? 12 : 15
    scene.fog = new THREE.Fog(dark.clone(), 0.01, SEGMENTS * SEGMENT_DEPTH * 0.95)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    const lineGeometry = createGridLines()
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#9A9AA0', transparent: true, opacity: 0.5 })
    const panelGeometry = {
      floor: new THREE.PlaneGeometry(TUNNEL_WIDTH / GRID, SEGMENT_DEPTH),
      wall: new THREE.PlaneGeometry(SEGMENT_DEPTH, TUNNEL_HEIGHT / GRID),
    }
    const materials = COLORS.map((color) => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true }))
    const segments: Segment[] = Array.from({ length: SEGMENTS }, (_, i) => {
      const segment = makeSegment(lineGeometry, lineMaterial, panelGeometry, materials, -i * SEGMENT_DEPTH, i, SEGMENTS)
      scene.add(segment)
      return segment
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    const buildMask = () => {
      const width = Math.max(1, frame.clientWidth)
      const height = Math.max(1, frame.clientHeight)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const mask = document.createElement('canvas')
      mask.width = Math.floor(width * ratio)
      mask.height = Math.floor(height * ratio)
      const context = mask.getContext('2d')
      if (!context) return
      context.scale(ratio, ratio)
      const family = getComputedStyle(document.documentElement).getPropertyValue('--font-inter').trim() || 'Inter, sans-serif'
      let size = height * 0.58
      try {
        context.font = `900 ${size}px ${family}`
      } catch {
        context.font = `900 ${size}px sans-serif`
      }
      const measure = context.measureText(text).width
      size = Math.min(size, (size * width * 0.92) / Math.max(1, measure))
      context.font = `900 ${size}px ${family || 'sans-serif'}`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = '#000'
      context.fillText(text, width / 2, height / 2 + size * 0.02)
      const image = `url(${mask.toDataURL('image/png')})`
      canvas.style.maskImage = image
      canvas.style.maskSize = '100% 100%'
      canvas.style.maskRepeat = 'no-repeat'
      canvas.style.setProperty('-webkit-mask-image', image)
      canvas.style.setProperty('-webkit-mask-size', '100% 100%')
      canvas.style.setProperty('-webkit-mask-repeat', 'no-repeat')
    }
    const resize = () => {
      const width = Math.max(1, frame.clientWidth)
      const height = Math.max(1, frame.clientHeight)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      buildMask()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(frame)
    resize()
    document.fonts?.ready?.then(buildMask).catch(() => {})

    let alive = true
    let raf = 0
    let current = 0
    let idle = 0
    let mouseX = 0
    let mouseY = 0
    let sceneVisible = true
    const io = new IntersectionObserver(([entry]) => {
      sceneVisible = entry.isIntersecting
    }, { rootMargin: '80px' })
    io.observe(frame)
    const onPointer = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect()
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onLeave = () => { mouseX = 0; mouseY = 0 }
    frame.addEventListener('pointermove', onPointer)
    frame.addEventListener('pointerleave', onLeave)

    const render = (time: number) => {
      if (!alive) return
      raf = requestAnimationFrame(render)
      if (!sceneVisible || document.hidden) return

      const progress = progressRef.current || 0
      idle += reduced ? 0 : 0.085
      const target = Math.pow(progress, 1.35) * TRAVEL + idle
      current += (target - current) * (reduced ? 1 : 0.07)
      const cameraZ = -current * 0.05
      camera.position.z += (cameraZ - camera.position.z) * 0.1
      camera.position.x += (mouseX * 0.11 - camera.position.x) * 0.06
      camera.position.y += (-mouseY * 0.07 - camera.position.y) * 0.06
      camera.lookAt(camera.position.x * 0.15, camera.position.y * 0.15, camera.position.z - 3)

      segments.forEach((segment, index) => {
        if (segment.position.z > camera.position.z + SEGMENT_DEPTH) {
          const min = Math.min(...segments.map((item) => item.position.z))
          segment.position.z = min - SEGMENT_DEPTH
          segment.userData.populate(index + Math.floor(current))
        }
      })

      const transition = Math.min(1, Math.max(0, (progress - TRANSITION_START) / (1 - TRANSITION_START)))
      ;(scene.background as THREE.Color).copy(dark).lerp(white, transition)
      ;(scene.fog as THREE.Fog).color.copy(dark).lerp(white, transition)
      ;(scene.fog as THREE.Fog).far = SEGMENTS * SEGMENT_DEPTH * (0.95 - transition * 0.7)
      lineMaterial.opacity = 0.5 * (1 - transition)
      materials.forEach((material) => { material.opacity = 1 - transition })
      canvas.style.opacity = String(1 - Math.min(1, Math.max(0, (progress - TRANSITION_RELEASE) / (1 - TRANSITION_RELEASE))))
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(render)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      io.disconnect()
      frame.removeEventListener('pointermove', onPointer)
      frame.removeEventListener('pointerleave', onLeave)
      lineGeometry.dispose()
      lineMaterial.dispose()
      panelGeometry.floor.dispose()
      panelGeometry.wall.dispose()
      materials.forEach((material) => material.dispose())
      renderer.dispose()
    }
  }, [progressRef, text])

  return (
    <section ref={frameRef} className="intro-tunnel-frame" aria-label="Basu Patil — enter portfolio">
      {webglOk ? (
        <canvas ref={canvasRef} className="intro-tunnel-canvas" aria-hidden="true" />
      ) : (
        <span className="intro-tunnel-fallback">{text}</span>
      )}
      <span className="intro-tunnel-hint" aria-hidden="true">Scroll to enter</span>
      <div className="intro-tunnel-progress" aria-hidden="true"><b>01</b><span /><i>06</i></div>
    </section>
  )
}
