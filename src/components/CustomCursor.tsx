import { useEffect, useRef } from 'react'

const ORANGE = '#ff4d1c'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const cDotRef = useRef<SVGCircleElement>(null)
  const cRingRef = useRef<SVGCircleElement>(null)
  const cRingOuterRef = useRef<SVGCircleElement>(null)
  const tracesRef = useRef<(SVGLineElement | null)[]>([null, null, null, null])
  const nodesRef = useRef<(SVGCircleElement | null)[]>([null, null, null, null])

  const mxRef = useRef(-100)
  const myRef = useRef(-100)
  const cxRef = useRef(-100)
  const cyRef = useRef(-100)
  const pulseRef = useRef(0)
  const tracePhaseRef = useRef(0)
  const hoveredRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active')
    const cursorRoot = rootRef.current
    const cDot = cDotRef.current
    const cRing = cRingRef.current
    const cRingOuter = cRingOuterRef.current
    const traces = tracesRef.current
    const nodes = nodesRef.current

    const handleMouseMove = (e: MouseEvent) => {
      mxRef.current = e.clientX
      myRef.current = e.clientY
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a, button, [role="button"]')
      hoveredRef.current = !!el
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    let rafId: number

    function animate() {
      const mx = mxRef.current
      const my = myRef.current
      let cx = cxRef.current
      let cy = cyRef.current
      let pulse = pulseRef.current
      let tracePhase = tracePhaseRef.current
      const hovered = hoveredRef.current

      cx = lerp(cx, mx, 0.28)
      cy = lerp(cy, my, 0.28)
      cxRef.current = cx
      cyRef.current = cy

      if (cursorRoot) {
        cursorRoot.style.transform = `translate(${cx - 30}px, ${cy - 30}px) scale(0.65)`
      }

      pulseRef.current += 0.045
      tracePhaseRef.current += 0.03
      pulse = pulseRef.current
      tracePhase = tracePhaseRef.current

      const outerR = 20 + Math.sin(pulse) * 5
      const innerR = hovered ? 14 : 10 + Math.sin(pulse + 1) * 2
      if (cRing) {
        cRing.setAttribute('r', String(innerR))
      }
      if (cRingOuter) {
        cRingOuter.setAttribute('r', String(outerR))
        cRingOuter.setAttribute('stroke-width', String(0.8 + Math.sin(pulse) * 0.4))
        cRingOuter.setAttribute('opacity', String(0.2 + Math.sin(pulse) * 0.15))
      }
      if (cDot) {
        cDot.setAttribute('r', hovered ? '5' : '3')
      }

      const traceConfigs = [
        { el: traces[0], node: nodes[0], nx: 1, ny: 0 },
        { el: traces[1], node: nodes[1], nx: -1, ny: 0 },
        { el: traces[2], node: nodes[2], nx: 0, ny: -1 },
        { el: traces[3], node: nodes[3], nx: 0, ny: 1 },
      ]

      traceConfigs.forEach((t, i) => {
        if (!t.el || !t.node) return
        const phase = tracePhase + i * (Math.PI / 2)
        const len = innerR + 4 + Math.sin(phase) * 6
        const end = len + 6
        t.el.setAttribute('x1', String(t.nx * (innerR + 1)))
        t.el.setAttribute('y1', String(t.ny * (innerR + 1)))
        t.el.setAttribute('x2', String(t.nx * len))
        t.el.setAttribute('y2', String(t.ny * len))
        t.el.setAttribute('opacity', String(0.4 + Math.sin(phase) * 0.4))
        t.node.setAttribute('cx', String(t.nx * end))
        t.node.setAttribute('cy', String(t.ny * end))
        t.node.setAttribute('r', String(1.5 + Math.abs(Math.sin(phase)) * 1.5))
        t.node.setAttribute('opacity', String(0.4 + Math.abs(Math.sin(phase)) * 0.6))
      })

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div id="cursor-root" className="cursor-root" ref={rootRef} aria-hidden>
      <svg width="60" height="60" viewBox="-30 -30 60 60">
        <circle className="cursor-ring-outer" cx="0" cy="0" r="20" ref={cRingOuterRef} />
        <circle className="cursor-ring" cx="0" cy="0" r="10" ref={cRingRef} />
        <line className="cursor-trace" x1="10" y1="0" x2="22" y2="0" ref={(el) => { tracesRef.current[0] = el }} style={{ opacity: 0.7 }} />
        <line className="cursor-trace" x1="-10" y1="0" x2="-22" y2="0" ref={(el) => { tracesRef.current[1] = el }} style={{ opacity: 0.7 }} />
        <line className="cursor-trace" x1="0" y1="-10" x2="0" y2="-22" ref={(el) => { tracesRef.current[2] = el }} style={{ opacity: 0.7 }} />
        <line className="cursor-trace" x1="0" y1="10" x2="0" y2="22" ref={(el) => { tracesRef.current[3] = el }} style={{ opacity: 0.7 }} />
        <circle r="2" cx="18" cy="0" fill={ORANGE} opacity={0.8} ref={(el) => { nodesRef.current[0] = el }} />
        <circle r="2" cx="-18" cy="0" fill={ORANGE} opacity={0.8} ref={(el) => { nodesRef.current[1] = el }} />
        <circle r="2" cx="0" cy="-18" fill={ORANGE} opacity={0.8} ref={(el) => { nodesRef.current[2] = el }} />
        <circle r="2" cx="0" cy="18" fill={ORANGE} opacity={0.8} ref={(el) => { nodesRef.current[3] = el }} />
        <circle className="cursor-dot" cx="0" cy="0" r="3" ref={cDotRef} />
      </svg>
    </div>
  )
}
