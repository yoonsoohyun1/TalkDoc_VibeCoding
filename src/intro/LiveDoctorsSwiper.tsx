import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { SWIPER_DOCTORS, CARD_W, CARD_GAP } from '../data/doctorData'
import { SwiperDoctorCard } from '../intro/SwiperDoctorCard'

export function LiveDoctorsSwiper() {
  const { ref, visible } = useScrollReveal()
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const items = [...SWIPER_DOCTORS, ...SWIPER_DOCTORS]
  const total = SWIPER_DOCTORS.length
  const step = CARD_W + CARD_GAP
  const advance = useCallback(() => { setOffset((p) => { const n = p + 1; return n >= total ? 0 : n }); setActiveIdx((p) => (p + 1) % total) }, [total])
  useEffect(() => { if (paused) return; tickRef.current = setInterval(advance, 2200); return () => { if (tickRef.current) clearInterval(tickRef.current) } }, [paused, advance])
  const goTo = (i: number) => { setOffset(i); setActiveIdx(i); setPaused(true); setTimeout(() => setPaused(false), 4000) }
  return (
    <section style={{ backgroundColor: '#fff', padding: '96px 0' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div><SectionLabel>실시간 진료</SectionLabel><SectionHeading>지금 바로 진료 가능한 전문 의사</SectionHeading></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => goTo((activeIdx - 1 + total) % total)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #e0ecea', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button onClick={() => goTo((activeIdx + 1) % total)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #00B894', background: '#E8F8F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#00B894" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <Link to="/hospitals" style={{ fontSize: 14, fontWeight: 600, color: '#00B894', textDecoration: 'none', whiteSpace: 'nowrap' }}>전체 의사 보기 →</Link>
          </div>
        </div>
      </div>
      <div style={{ overflowX: 'clip', overflowY: 'visible', paddingLeft: 'max(24px,calc((100vw - 1200px)/2 + 24px))', paddingTop: 12, paddingBottom: 12 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div style={{ display: 'flex', gap: CARD_GAP, transform: `translateX(-${offset * step}px)`, transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)', willChange: 'transform' }}>
          {items.map((doc, i) => <SwiperDoctorCard key={`${doc.name}-${i}`} doc={doc} active={i % total === activeIdx} />)}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {SWIPER_DOCTORS.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: activeIdx === i ? 20 : 7, height: 7, borderRadius: 4, border: 'none', background: activeIdx === i ? '#00B894' : '#ddd', transition: 'all 0.3s', cursor: 'pointer', padding: 0 }} />)}
      </div>
    </section>
  )
}