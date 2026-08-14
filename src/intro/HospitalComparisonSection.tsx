import { useState } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading, SectionSubheading } from '../components/ui/SharedUI'
import {  HOSPITALS } from '../data/homeData'
import { HospitalData } from '../types'

export function HospitalComparisonSection() {
  const { ref, visible } = useScrollReveal()
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const [sortCol, setSortCol] = useState<keyof HospitalData>('fee1st')
  const sorted = [...HOSPITALS].sort((a, b) => {
    if (sortCol === 'rating') return b.rating - a.rating
    if (sortCol === 'waitMin') return a.waitMin - b.waitMin
    return (parseInt((a[sortCol] as string).replace(/[^0-9]/g, '')) || 0) - (parseInt((b[sortCol] as string).replace(/[^0-9]/g, '')) || 0)
  })
  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '96px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>병원별 진료비 비교</SectionLabel>
        <SectionHeading>여러 병원의 진료비 & 약값을 한눈에 비교</SectionHeading>
        <SectionSubheading>건강보험 적용 후 실부담금 기준 · 항목 클릭 시 정렬됩니다</SectionSubheading>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {[{ label: '평균 절약', value: '최대 65%', color: '#00B894' }, { label: '대기 단축', value: '평균 35분 → 3분', color: '#6C63FF' }, { label: '건강보험', value: '동일 적용', color: '#FFD200' }].map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 10, padding: '10px 16px', border: `1.5px solid ${b.color}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: 13, color: '#636E72' }}>{b.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: b.color === '#FFD200' ? '#2D3436' : b.color }}>{b.value}</span>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.07)', border: '1px solid rgba(0,184,148,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: '#2D3436' }} className="hosp-grid">
            {['병원명', '초진 진료비', '재진 진료비', '인기약 처방비', '평균 대기', '평점'].map((h, i) => {
              const colKey = (['name', 'fee1st', 'feeRe', 'rxDrug', 'waitMin', 'rating'] as (keyof HospitalData)[])[i]
              const active = sortCol === colKey && i > 0
              return <div key={h} onClick={() => i > 0 && setSortCol(colKey)} style={{ padding: '15px 18px', fontSize: 12, fontWeight: 700, color: active ? '#FFD200' : i === 0 ? '#9ba3a7' : '#fff', cursor: i > 0 ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 4, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'color 0.15s', userSelect: 'none' }}>{h}{i > 0 && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: active ? 1 : 0.35 }}><path d="M5 2v6M2 5l3-3 3 3" stroke={active ? '#FFD200' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
            })}
          </div>
          {sorted.map((h, i) => {
            const isTalkdoc = h.badge === '최저가'
            return (
              <div key={h.name} onMouseEnter={() => setHoverRow(i)} onMouseLeave={() => setHoverRow(null)} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: isTalkdoc ? (hoverRow === i ? '#d6f5ed' : '#E8F8F5') : hoverRow === i ? '#f8fffe' : i % 2 === 0 ? '#fff' : '#fafcfc', borderTop: '1px solid #f0f5f4', transition: 'background 0.15s' }} className="hosp-grid">
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: isTalkdoc ? '#00B894' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                    {isTalkdoc ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.5C9 2.5 6 2.5 6 5.5C6 7.25 7.25 8.5 9 9.5C10.75 8.5 12 7.25 12 5.5C12 2.5 9 2.5 9 2.5Z" fill="white" opacity="0.9"/><circle cx="9" cy="13" r="1.5" fill="white"/></svg> : '🏥'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 14, fontWeight: 700, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{h.name}</span>{h.badge && <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', backgroundColor: '#00B894', padding: '2px 7px', borderRadius: 4 }}>{h.badge}</span>}</div>
                    <div style={{ fontSize: 11.5, color: '#636E72', marginTop: 2 }}>{h.dept}</div>
                  </div>
                </div>
                {[h.fee1st, h.feeRe, h.rxDrug].map((val, ci) => <div key={ci} style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4' }}><span style={{ fontSize: 14, fontWeight: isTalkdoc ? 800 : 500, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{val}</span></div>)}
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: '#f0f0f0', overflow: 'hidden' }}><div style={{ width: `${Math.min(100, (h.waitMin / 70) * 100)}%`, height: '100%', backgroundColor: isTalkdoc ? '#00B894' : h.waitMin > 50 ? '#FF6B6B' : '#FFD200', borderRadius: 3 }} /></div><span style={{ fontSize: 13, fontWeight: 600, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{h.waitMin}분</span></div>
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4', gap: 4 }}><svg width="13" height="13" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg><span style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{h.rating.toFixed(2)}</span></div>
              </div>
            )
          })}
          <div style={{ padding: '13px 20px', backgroundColor: '#E8F8F5', borderTop: '1px solid rgba(0,184,148,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11.5, color: '#636E72' }}>* 건강보험 적용 후 실부담금 기준 · 2025년 건강보험심사평가원 데이터 참조</span>
            <Link to="/hospitals" style={{ fontSize: 12, fontWeight: 700, color: '#00B894', textDecoration: 'none' }}>전체 병원 비교 보기 →</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:780px){.hosp-grid{grid-template-columns:1.5fr 1fr 1fr!important;}.hosp-grid>div:nth-child(n+5){display:none!important;}}`}</style>
    </section>
  )
}