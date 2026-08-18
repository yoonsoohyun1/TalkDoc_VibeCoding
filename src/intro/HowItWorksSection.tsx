import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { HOW_STEPS } from '../data/homeData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState, useEffect, useRef, useCallback } from 'react'

export function HowItWorksSection() {
  const { ref, visible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // mobile swiper
  const [mobileIdx, setMobileIdx] = useState(0)
  const touchStartX = useRef(0)

  const advance = useCallback(() => {
    setActiveStep((p) => (p + 1) % HOW_STEPS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    tickRef.current = setInterval(advance, 2500)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [paused, advance])

  const goTo = (i: number) => {
    setActiveStep(i)
    setMobileIdx(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 6000)
  }

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      const next = dx < 0
        ? (mobileIdx + 1) % HOW_STEPS.length
        : (mobileIdx - 1 + HOW_STEPS.length) % HOW_STEPS.length
      goTo(next)
    }
  }

  return (
    <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel>이용 방법</SectionLabel>
          <SectionHeading>톡닥으로 1분 만에 비대면 진료받는 법</SectionHeading>
          <p style={{ margin: '12px auto 0', fontSize: 16, color: '#636E72', lineHeight: 1.65, maxWidth: 500 }}>
            단계가 자동으로 진행됩니다. 원하는 단계를 클릭해 멈출 수 있습니다.
          </p>
        </div>

        {/* ── Desktop: 4-column timeline ── */}
        <div className="how-desktop">
          <div style={{ position: 'relative', height: 520 }}>
            <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg,#00B894,#6C63FF,#FF6B6B,#FFD200)', borderRadius: 2, zIndex: 0 }} />
            {/* progress overlay */}
            <div style={{ position: 'absolute', top: 36, left: '12.5%', width: `${(activeStep / (HOW_STEPS.length - 1)) * 75}%`, height: 2, background: 'rgba(0,0,0,0.15)', borderRadius: 2, zIndex: 1, transition: 'width 2.5s linear' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0, zIndex: 2 }}>
              {HOW_STEPS.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <div key={step.num} onClick={() => goTo(i)}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, cursor: 'pointer', padding: '0 8px' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: isActive ? step.color : '#fff', border: `3px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', boxShadow: isActive ? `0 8px 28px ${step.color}55` : '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0 }}>
                      <span style={{ fontSize: 26, fontWeight: 900, color: isActive ? '#fff' : step.color, letterSpacing: '-1px' }}>{step.num}</span>
                    </div>
                    <div style={{ backgroundColor: isActive ? '#fff' : '#fafcfc', borderRadius: 18, padding: '24px 20px', border: `1.5px solid ${isActive ? step.color : '#eef4f2'}`, boxShadow: isActive ? `0 12px 40px ${step.color}20` : 'none', transition: 'all 0.4s ease', width: '100%', height: 400, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{step.label}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436', lineHeight: 1.35 }}>{step.title}</div>
                      <div style={{ fontSize: 12.5, color: '#636E72', lineHeight: 1.6 }}>{step.desc}</div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 8, opacity: isActive ? 1 : 0.45, transition: 'opacity 0.4s' }}>{step.mockup}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile: swiper ── */}
        <div className="how-mobile" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', transform: `translateX(-${mobileIdx * 100}%)` }}>
            {HOW_STEPS.map((step, i) => (
              <div key={step.num} style={{ minWidth: '100%', padding: '0 4px', boxSizing: 'border-box' }}>
                <div style={{ borderRadius: 20, padding: '28px 22px', border: `2px solid ${step.color}`, backgroundColor: '#fff', boxShadow: `0 8px 32px ${step.color}20`, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${step.color}44` }}>
                      <span style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{step.num}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: step.color, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{step.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#2D3436', marginTop: 2 }}>{step.title}</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#636E72', lineHeight: 1.65 }}>{step.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>{step.mockup}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots (shared) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {HOW_STEPS.map((step, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: activeStep === i ? 28 : 8, height: 8, borderRadius: 4, border: 'none', background: activeStep === i ? step.color : '#ddd', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>
      </div>
      <style>{`
        .how-desktop { display: block; }
        .how-mobile  { display: none; }
        @media(max-width:820px) {
          .how-desktop { display: none !important; }
          .how-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  )
}
