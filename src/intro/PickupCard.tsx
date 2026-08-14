import { useState } from 'react'
export function PickupCard({ title, desc, detail, highlight, bg, accent, icon }: { title: string; desc: string; detail: string; highlight: string; bg: string; accent: string; icon: React.ReactNode }) {
  const [h, setH] = useState(false)
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: bg, borderRadius: 20, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 18, border: `1.5px solid ${h ? accent : 'transparent'}`, transition: 'border-color 0.2s,box-shadow 0.2s', boxShadow: h ? `0 8px 32px ${accent}28` : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>{icon}</div>
        <span style={{ fontSize: 11, fontWeight: 800, color: accent === '#FFD200' ? '#2D3436' : '#fff', backgroundColor: accent, padding: '5px 12px', borderRadius: 20 }}>{highlight}</span>
      </div>
      <div><div style={{ fontSize: 18, fontWeight: 800, color: '#2D3436', marginBottom: 10 }}>{title}</div><div style={{ fontSize: 14, color: '#636E72', lineHeight: 1.65 }}>{desc}</div></div>
      <div style={{ fontSize: 13, fontWeight: 600, color: accent === '#FFD200' ? '#2D3436' : accent, backgroundColor: '#fff', padding: '10px 16px', borderRadius: 10 }}>{detail}</div>
    </div>
  )
}