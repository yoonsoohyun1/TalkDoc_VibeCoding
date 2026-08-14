import { useParams, useNavigate, Link } from 'react-router'
import { SYMPTOM_CATS } from '../data/symptomData'
import { SWIPER_DOCTORS } from '../data/doctorData'

export default function SymptomCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const cat = slug ? SYMPTOM_CATS[slug] : null

  if (!cat) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, color: '#2D3436' }}>페이지를 찾을 수 없습니다</h2>
        <p style={{ color: '#636E72', marginBottom: 24 }}>요청하신 증상 카테고리가 존재하지 않습니다.</p>
        <button onClick={() => navigate('/symptom')} style={{ padding: '12px 24px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>AI 증상 분석으로 이동</button>
      </div>
    )
  }

  const relatedDoctors = SWIPER_DOCTORS.filter((d) => d.dept === cat.dept).slice(0, 4)
  const allDoctors = relatedDoctors.length > 0 ? relatedDoctors : SWIPER_DOCTORS.slice(0, 4)

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg, ${cat.deptColor} 0%, ${cat.deptColor}cc 100%)`, padding: '72px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>홈</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <Link to="/symptom" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>증상별 진료</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{cat.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 48 }}>{cat.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px', marginBottom: 8 }}>{cat.dept} 진료</div>
              <h1 style={{ margin: 0, fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px' }}>{cat.title}</h1>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 500 }}>{cat.desc}</p>
        </div>
      </section>

      {/* Symptoms list */}
      <section style={{ backgroundColor: '#fff', padding: '52px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }} className="cat-grid">
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#636E72', marginBottom: 16, letterSpacing: '0.3px', textTransform: 'uppercase' }}>주요 증상</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {cat.symptoms.map((s) => (
                <span key={s} style={{ padding: '8px 16px', borderRadius: 100, border: `1.5px solid ${cat.deptColor}30`, backgroundColor: `${cat.deptColor}0a`, color: '#2D3436', fontSize: 13.5, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#636E72', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.3px' }}>알아두세요</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cat.info.map((info, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: `${cat.deptColor}18`, border: `1.5px solid ${cat.deptColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 5l1.5 1.5L7 3.5" stroke={cat.deptColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13.5, color: '#2D3436', lineHeight: 1.6 }}>{info}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ backgroundColor: `${cat.deptColor}0f`, borderRadius: 20, padding: '28px 24px', border: `1.5px solid ${cat.deptColor}20` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: cat.deptColor, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.3px' }}>AI 빠른 진료 시작</div>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: '#636E72', lineHeight: 1.6 }}>AI 챗봇에 "{cat.title}" 증상을 말하면 즉시 최적의 전문의를 연결해 드립니다.</p>
              <button onClick={() => navigate('/symptom')} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', backgroundColor: cat.deptColor, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>AI 증상 분석 시작 →</button>
              <button onClick={() => navigate(`/hospitals/${cat.dept === '피부과' ? 'dermatology' : cat.dept === '소아청소년과' ? 'pediatrics' : cat.dept === '정신건강의학과' ? 'psychiatry' : 'internal'}`)} style={{ width: '100%', padding: '13px', borderRadius: 12, border: `1.5px solid ${cat.deptColor}40`, backgroundColor: '#fff', color: cat.deptColor, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{cat.dept} 전문의 보기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Related doctors */}
      <section style={{ backgroundColor: '#F4F9F8', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#2D3436', marginBottom: 20 }}>{cat.dept} 전문의 · 지금 진료 가능</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="cat-docs-grid">
            {allDoctors.map((doc) => (
              <div key={doc.name} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '16px 18px', border: '1px solid #eef4f2', display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={doc.photo} alt={doc.name} style={{ width: 52, height: 52, borderRadius: 13, objectFit: 'cover', border: `2px solid ${doc.color}44`, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>{doc.name} 원장</div>
                  <div style={{ fontSize: 12, color: '#636E72' }}>{doc.hospital}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><svg width="11" height="11" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg><span style={{ fontSize: 12, fontWeight: 700, color: '#2D3436' }}>{doc.rating}</span></div>
                </div>
                <button style={{ padding: '8px 14px', borderRadius: 9, border: 'none', backgroundColor: doc.color, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>예약</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:720px){.cat-grid{grid-template-columns:1fr!important;}.cat-docs-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
