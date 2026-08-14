import { useState } from 'react'
import { useNavigate } from 'react-router'
export function SecondaryCtaButton() {
  const [h, setH] = useState(false)
  const navigate = useNavigate()
  return <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => navigate('/hospitals')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 24px', borderRadius: 14, border: '1.5px solid rgba(0,184,148,0.3)', backgroundColor: h ? '#E8F8F5' : 'transparent', color: '#00B894', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s' }}>의사 찾아보기</button>
}