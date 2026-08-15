import { useEffect, useMemo, useRef, useState } from 'react'
import Scene from '../../layout/Scene'
import { toolkit } from '../../../content/portfolio'

const allTools = toolkit.flatMap((group) => group.items)

const LOGOS = {
  Python: ['python', '3776AB'], PyTorch: ['pytorch', 'EE4C2C'], TensorFlow: ['tensorflow', 'FF6F00'],
  'Scikit-learn': ['scikitlearn', 'F7931E'], 'Hugging Face': ['huggingface', 'FFD21E'], LangChain: ['langchain', '1C3C3C'],
  OpenCV: ['opencv', '5C3EE8'], YOLOv8: ['ultralytics', '111F68'], Pandas: ['pandas', '150458'],
  NumPy: ['numpy', '4D77CF'], Matplotlib: ['matplotlib', '11557C'], Seaborn: ['python', '4C72B0'],
  'C++': ['cplusplus', '00599C'], JavaScript: ['javascript', 'F7DF1E'], SQL: ['mysql', '4479A1'],
  React: ['react', '61DAFB'], FastAPI: ['fastapi', '009688'], Flask: ['flask', '000000'],
  'Node.js': ['nodedotjs', '339933'], Tailwind: ['tailwindcss', '06B6D4'], AWS: ['amazonwebservices', 'FF9900'],
  Modal: ['modal', '7A5AF8'], Supabase: ['supabase', '3ECF8E'], 'Git & GitHub': ['github', '181717'],
  Colab: ['googlecolab', 'F9AB00'], Figma: ['figma', 'F24E1E'],
}

function ToolMark({ tool }) {
  const [failed, setFailed] = useState(false)
  const [slug, color] = LOGOS[tool.label] || []
  if (!slug || failed) return <b aria-hidden="true">{tool.code}</b>
  return <img src={`https://cdn.simpleicons.org/${slug}/${color}`} alt="" onError={() => setFailed(true)} />
}

function layout(items) {
  return items.map((tool, index) => {
    const ringIndex = index % 2
    const itemIndex = Math.floor(index / 2)
    const itemCount = Math.ceil((items.length - ringIndex) / 2)
    const angle = (itemIndex / itemCount) * Math.PI * 2 - Math.PI / 2 + (ringIndex * Math.PI / itemCount)
    return {
      ...tool,
      ringIndex,
      angle,
      radiusX: [35, 45][ringIndex],
      radiusY: [35, 44][ringIndex],
      speed: [.09, -.075][ringIndex],
      tilt: ((index * 11) % 9) - 4,
    }
  })
}

export default function Toolkit() {
  const root = useRef(null)
  const chipRefs = useRef([])
  const [compact, setCompact] = useState(() => window.innerWidth <= 640)
  const placed = useMemo(() => layout(allTools), [])

  useEffect(() => {
    const updateCompact = () => setCompact(window.innerWidth <= 640)
    window.addEventListener('resize', updateCompact)
    return () => window.removeEventListener('resize', updateCompact)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    const start = performance.now()
    const tick = (time) => {
      const elapsed = (time - start) / 1000
      placed.forEach((tool, index) => {
        const chip = chipRefs.current[index]
        if (!chip) return
        const angle = tool.angle + elapsed * tool.speed
        const radiusX = compact ? [41, 44, 46][tool.ringIndex] : tool.radiusX
        const radiusY = compact ? [29, 36, 42][tool.ringIndex] : tool.radiusY
        chip.style.left = `${50 + Math.cos(angle) * radiusX}%`
        chip.style.top = `${50 + Math.sin(angle) * radiusY}%`
        chip.style.transform = `translate(-50%, -50%) rotate(${tool.tilt}deg)`
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [compact, placed])

  return (
    <Scene ref={root} id="toolkit" index={5} runway={1.5} bg="bg-paper">
      <section className="ref-stack" aria-labelledby="stack-title">
        <div className="ref-stack-glow ref-stack-glow-left" aria-hidden="true" />
        <div className="ref-stack-glow ref-stack-glow-right" aria-hidden="true" />
        {placed.map((tool, index) => {
          const radiusX = compact ? [41, 44, 46][tool.ringIndex] : tool.radiusX
          const radiusY = compact ? [29, 36, 42][tool.ringIndex] : tool.radiusY
          const left = 50 + Math.cos(tool.angle) * radiusX
          const top = 50 + Math.sin(tool.angle) * radiusY
          return (
            <div
              ref={(element) => { chipRefs.current[index] = element }}
              key={tool.label}
              className="ref-stack-chip"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <ToolMark tool={tool} /><span>{tool.label}</span>
            </div>
          )
        })}
        <div className="ref-stack-core">
          <p><span>03</span> Toolkit</p>
          <h2 id="stack-title">My dev <em>stack.</em></h2>
          <p className="ref-stack-lede">The technologies I use to build, train, deploy, and ship practical AI systems.</p>
          <small>{allTools.length} tools <b>·</b> {toolkit.length} disciplines</small>
        </div>
      </section>
    </Scene>
  )
}
