import { useState } from 'react'
import { SWIPER_DOCTORS, CARD_W, DEPT_TAG_STYLES } from '../data/doctorData'

export function SwiperDoctorCard({ doc, active }: { doc: typeof SWIPER_DOCTORS[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isActive = active || hovered
  const deptStyle = DEPT_TAG_STYLES[doc.dept] ?? { bg: '#E8F8F5', text: '#00B894', border: 'rgba(0,184,148,0.2)' }
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ flexShrink: 0, width: CARD_W, backgroundColor: '#fff', borderRadius: 20, border: `1.5px solid ${isActive ? doc.color : '#eef4f2'}`, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14, transition: 'all 0.25s ease', boxShadow: isActive ? `0 12px 40px ${doc.color}28` : '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer', transform: isActive ? 'translateY(-4px)' : 'translateY(0)' }}>
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <img src={doc.photo} alt={`${doc.name} 원장`} style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: `2.5px solid ${doc.color}44`, display: 'block', backgroundColor: '#E8F8F5' }} />
        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: '50%', backgroundColor: '#00B894', border: '2.5px solid #fff', boxShadow: '0 0 0 2px rgba(0,184,148,0.3)' }} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}><span style={{ fontSize: 15, fontWeight: 800, color: '#2D3436' }}>{doc.name} 원장</span></div>
        <div style={{ fontSize: 12, color: '#636E72', marginBottom: 8 }}>{doc.hospital}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, fontWeight: 700, color: deptStyle.text, backgroundColor: deptStyle.bg, border: `1px solid ${deptStyle.border}`, padding: '3px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>{doc.dept}</span><span style={{ fontSize: 11, color: '#636E72', whiteSpace: 'nowrap' }}>경력 {doc.exp}</span></div>
      </div>
      <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.55 }}>{doc.specialty}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><svg width="13" height="13" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg><span style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{doc.rating}</span><span style={{ fontSize: 11, color: '#aaa' }}>({doc.reviews.toLocaleString()})</span></div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: '#00B894', backgroundColor: '#E8F8F5', padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}><span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#00B894', display: 'inline-block' }} />실시간 진료 가능</span>
      </div>
      <button style={{ width: '100%', padding: '11px', borderRadius: 11, border: 'none', backgroundColor: isActive ? doc.color : '#F4F9F8', color: isActive ? '#fff' : doc.color, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>바로 예약</button>
    </div>
  )
}