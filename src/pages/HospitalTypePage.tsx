import { useParams, useNavigate, Link } from 'react-router'
import { SWIPER_DOCTORS, HOSPITAL_TYPES_DATA } from '../data/doctorData'
import { HospitalDoctorCard } from './HospitalsPage'

export default function HospitalTypePage() {
  const { type } = useParams<{ type: string }>()
  const navigate = useNavigate()
  const typeData = type ? HOSPITAL_TYPES_DATA[type] : null

  if (!typeData) {
    return <div style={{ padding: '80px 24px', textAlign: 'center' }}><h2 style={{ color: '#2D3436' }}>페이지를 찾을 수 없습니다</h2><button onClick={() => navigate('/hospitals')} style={{ marginTop: 16, padding: '12px 24px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>의사 찾기로 이동</button></div>
  }

  const doctors = SWIPER_DOCTORS.filter((d, i) => typeData.filter(d, i))
  const displayDoctors = doctors.length > 0 ? doctors : SWIPER_DOCTORS.slice(0, 4)

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${typeData.color} 0%, ${typeData.color}bb 100%)`, padding: '72px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>홈</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <Link to="/hospitals" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>의사 찾기</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{typeData.title}</span>
          </div>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{typeData.icon}</div>
          <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>{typeData.title}</h1>
          <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 500 }}>{typeData.desc}</p>
        </div>
      </section>
      <section style={{ backgroundColor: '#F4F9F8', padding: '52px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#2D3436', marginBottom: 20 }}><strong style={{ color: typeData.color }}>{displayDoctors.length}명</strong>의 전문의가 현재 진료 가능합니다</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {displayDoctors.map((doc) => <HospitalDoctorCard key={doc.name} doc={doc} />)}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button onClick={() => navigate('/hospitals')} style={{ padding: '14px 32px', borderRadius: 12, border: 'none', backgroundColor: typeData.color, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${typeData.color}40` }}>전체 의사 보기 →</button>
          </div>
        </div>
      </section>
    </div>
  )
}
