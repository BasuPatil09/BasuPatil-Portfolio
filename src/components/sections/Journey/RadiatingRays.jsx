const RAYS = [
  { angle: 8, len: 78, color: '#5824a3', spread: 34, opacity: .48 },
  { angle: 31, len: 74, color: '#8a1c75', spread: 28, opacity: .5 },
  { angle: 54, len: 82, color: '#312069', spread: 26, opacity: .46 },
  { angle: 78, len: 76, color: '#b11bb8', spread: 38, opacity: .5 },
  { angle: 103, len: 80, color: '#7b2059', spread: 29, opacity: .48 },
  { angle: 128, len: 73, color: '#46308e', spread: 27, opacity: .44 },
  { angle: 151, len: 84, color: '#9f216b', spread: 34, opacity: .48 },
  { angle: 177, len: 77, color: '#5e267f', spread: 30, opacity: .46 },
  { angle: 201, len: 81, color: '#3a2878', spread: 34, opacity: .48 },
  { angle: 225, len: 74, color: '#8e1a78', spread: 27, opacity: .44 },
  { angle: 249, len: 84, color: '#c328c9', spread: 40, opacity: .5 },
  { angle: 273, len: 78, color: '#6e266e', spread: 30, opacity: .46 },
  { angle: 296, len: 81, color: '#312370', spread: 28, opacity: .46 },
  { angle: 320, len: 74, color: '#8d1d72', spread: 34, opacity: .46 },
  { angle: 344, len: 81, color: '#45216f', spread: 30, opacity: .48 },
]

export default function RadiatingRays({ className = '', fieldRef }) {
  return (
    <div ref={fieldRef} className={`journey-rays absolute inset-0 overflow-hidden flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="journey-rays-wheel relative w-[170vmax] h-[170vmax]">
        {RAYS.map((ray, index) => (
          <div
            key={ray.angle}
            className="journey-ray absolute left-1/2 top-1/2 origin-left"
            style={{
              width: `${ray.len}%`,
              height: `${ray.spread}px`,
              '--ray-color': ray.color,
              '--ray-opacity': ray.opacity,
              '--ray-phase': index / RAYS.length,
              transform: `rotate(${ray.angle}deg)`,
            }}
          >
            <span className="journey-ray-charge" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 journey-ray-vignette" />
    </div>
  )
}
