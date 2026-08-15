import { forwardRef } from 'react'

/**
 * `runway` is how many viewport-heights tall the container is. 1 = just the
 * sticky hold (brief, no internal scrub room). >1 = the extra (runway-1)*100vh
 * stays scrollable while this scene is pinned, giving 3D/scroll set-pieces
 * inside it real distance to scrub against (see lib/scene.js: useScrub).
 */
const Scene = forwardRef(function Scene(
  { id, index, runway = 1.15, bg = 'bg-paper', children, className = '' },
  ref,
) {
  const extraRunway = Math.max(0.01, runway - 1)

  return (
    <>
      <section
        id={id}
        ref={ref}
        data-scene={id}
        className="scene-hold"
        style={{ zIndex: index }}
      >
        <div className={`scene-inner flex flex-col ${bg} ${className}`}>
          {children}
        </div>
      </section>
      <div
        data-runway={id}
        className="scene-runway"
        style={{ height: `${extraRunway * 100}svh` }}
        aria-hidden="true"
      />
    </>
  )
})

export default Scene
