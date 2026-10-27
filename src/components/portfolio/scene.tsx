'use client'

import { forwardRef } from 'react'

/**
 * Original layout/Scene.jsx — a sticky 100svh frame plus a "runway" below it.
 * `runway` is how many viewport-heights tall the container is. >1 = the extra
 * (runway-1)*100vh stays scrollable while this scene is pinned, giving 3D /
 * scroll set-pieces real distance to scrub against (see lib/scene.ts).
 */
const Scene = forwardRef(function Scene(
  {
    id,
    index,
    runway = 1.15,
    bg = 'bg-paper',
    children,
    className = '',
  }: {
    id: string
    index: number
    runway?: number
    bg?: string
    children: React.ReactNode
    className?: string
  },
  ref: React.Ref<HTMLElement>,
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
