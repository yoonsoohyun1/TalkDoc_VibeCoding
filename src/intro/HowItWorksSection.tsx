import { SectionLabel, SectionHeading, SectionSubheading } from '../components/ui/SharedUI'
import { HOW_STEPS, HOSPITALS, REVIEWS, FORM_DEPTS, FAQS } from '../data/homeData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState, useRef, useCallback, useEffect } from 'react'
export function HowItWorksSection() {
  const { ref, visible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState<number | null>(null)
  return (
    <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel>이용 방법</SectionLabel>
          <SectionHeading>톡닥으로 1분 만에 비대면 진료받는 법</SectionHeading>
          <p style={{ margin: '12px auto 0', fontSize: 16, color: '#636E72', lineHeight: 1.65, maxWidth: 500 }}>카드에 마우스를 올리거나 클릭하면 상세 내용을 확인할 수 있습니다.</p>
        </div>
        <div style={{ position: 'relative', height: 500 }} className="how-timeline-wrap">
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg,#00B894,#6C63FF,#FF6B6B,#FFD200)', borderRadius: 2, zIndex: 0 }} className="timeline-line" />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
            {HOW_STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <div key={step.num} onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)} onClick={() => setActiveStep(isActive ? null : i)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, cursor: 'pointer', position: 'relative', zIndex: 1, padding: '0 8px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: isActive ? step.color : '#fff', border: `3px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.28s ease', boxShadow: isActive ? `0 8px 28px ${step.color}44` : '0 2px 12px rgba(0,0,0,0.08)', flexShrink: 0 }}>
                    <span style={{ fontSize: 26, fontWeight: 900, color: isActive ? '#fff' : step.color, letterSpacing: '-1px' }}>{step.num}</span>
                  </div>
                  <div style={{ backgroundColor: isActive ? '#fff' : '#fafcfc', borderRadius: 18, padding: '24px 20px', border: `1.5px solid ${isActive ? step.color : '#eef4f2'}`, boxShadow: isActive ? `0 12px 40px ${step.color}18` : 'none', transition: 'border-color 0.28s,box-shadow 0.28s,background 0.28s', width: '100%', height: 380, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{step.label}</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436', lineHeight: 1.35 }}>{step.title}</div>
                    <div style={{ fontSize: 12.5, color: '#636E72', lineHeight: 1.6 }}>{step.desc}</div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>{step.mockup}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {HOW_STEPS.map((step, i) => <button key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{ width: activeStep === i ? 24 : 8, height: 8, borderRadius: 4, border: 'none', background: activeStep === i ? step.color : '#ddd', transition: 'all 0.3s', cursor: 'pointer', padding: 0 }} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){.how-timeline-wrap{height:auto!important;}.how-timeline-wrap>div:last-child{flex-direction:column!important;gap:16px!important;}.timeline-line{display:none!important;}}`}</style>
    </section>
  )
}