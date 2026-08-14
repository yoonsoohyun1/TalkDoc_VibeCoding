import { useState } from 'react'
import { PageHero } from '../components/ui/SharedUI'
import { SWIPER_DOCTORS } from '../data/doctorData'

export function HospitalDoctorCard({ doc }: { doc: typeof SWIPER_DOCTORS[0] }) {
  const [h, setH] = useState(false)
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px', border: `1.5px solid ${h ? doc.color : '#eef4f2'}`, transition: 'all 0.2s', boxShadow: h ? `0 6px 28px ${doc.color}18` : '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <img src={doc.photo} alt={doc.name} style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover', border: `2px solid ${doc.color}44`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#2D3436' }}>{doc.name} 원장</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: doc.color, padding: '2px 8px', borderRadius: 6 }}>{doc.dept}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#00B894', backgroundColor: '#E8F8F5', padding: '2px 8px', borderRadius: 6 }}>즉시 가능</span>
        </div>
        <div style={{ fontSize: 13, color: '#636E72', marginBottom: 6 }}>{doc.hospital} · 경력 {doc.exp}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><svg width="13" height="13" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg><span style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{doc.rating}</span><span style={{ fontSize: 12, color: '#aaa' }}>({doc.reviews.toLocaleString()})</span></div>
          <span style={{ fontSize: 12.5, color: '#636E72' }}>{doc.specialty}</span>
        </div>
      </div>
      <button style={{ padding: '12px 22px', borderRadius: 10, border: 'none', backgroundColor: h ? doc.color : '#F4F9F8', color: h ? '#fff' : doc.color, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}>예약하기</button>
    </div>
  )
}

export default function HospitalsPage() {
  const [deptFilter, setDeptFilter] = useState('전체')
  const [sortBy, setSortBy] = useState<'rating' | 'fast'>('rating')
  const depts = ['전체', '내과', '피부과', '소아청소년과', '정신건강의학과', '산부인과', '가정의학과', '이비인후과']
  const filtered = SWIPER_DOCTORS.filter((d) => deptFilter === '전체' || d.dept === deptFilter)
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : 0)
  return (
    <div>
      <PageHero label="의사 찾기" title="내게 맞는 전문의를 찾아보세요" subtitle="진료과, 전문 분야, 평점으로 필터링하고 지금 바로 예약하세요." gradient="linear-gradient(135deg,#2D3436 0%,#404a4c 100%)" />
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f5f4', padding: '20px 24px', position: 'sticky', top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
            {depts.map((d) => <button key={d} onClick={() => setDeptFilter(d)} style={{ padding: '7px 14px', borderRadius: 100, border: `1.5px solid ${deptFilter === d ? '#00B894' : '#e0ecea'}`, backgroundColor: deptFilter === d ? '#00B894' : '#fff', color: deptFilter === d ? '#fff' : '#2D3436', fontSize: 13, fontWeight: deptFilter === d ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>{d}</button>)}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ key: 'rating', label: '평점순' }, { key: 'fast', label: '빠른순' }].map((s) => <button key={s.key} onClick={() => setSortBy(s.key as 'rating' | 'fast')} style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${sortBy === s.key ? '#00B894' : '#e0ecea'}`, backgroundColor: sortBy === s.key ? '#E8F8F5' : 'transparent', color: sortBy === s.key ? '#00B894' : '#636E72', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{s.label}</button>)}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: '#F4F9F8', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }} className="hosp-layout">
          <div>
            <div style={{ fontSize: 14, color: '#636E72', marginBottom: 16 }}><strong style={{ color: '#2D3436' }}>{filtered.length}명</strong>의 전문의가 현재 진료 가능합니다</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map((doc) => <HospitalDoctorCard key={doc.name} doc={doc} />)}
            </div>
          </div>
          <div style={{ position: 'sticky', top: 140 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #eef4f2', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ backgroundColor: '#E8F8F5', height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 40%,rgba(0,184,148,0.15) 0%,transparent 50%)' }} />
                {[{ x: '30%', y: '35%' }, { x: '55%', y: '50%' }, { x: '70%', y: '30%' }, { x: '45%', y: '65%' }].map((pos, i) => <div key={i} style={{ position: 'absolute', left: pos.x, top: pos.y, width: 24, height: 24, borderRadius: '50% 50% 50% 0', background: '#00B894', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,184,148,0.4)', transform: 'rotate(-45deg)', cursor: 'pointer' }}><div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#fff', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>+</div></div>)}
                <div style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#fff', padding: '5px 10px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: 11, fontWeight: 600, color: '#2D3436' }}>지도 보기</div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436', marginBottom: 8 }}>서울 강남구 인근</div>
                <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.6 }}>현재 위치를 허용하면 더 정확한 결과를 보여드립니다.</div>
                <button style={{ marginTop: 12, width: '100%', padding: '10px', borderRadius: 10, border: '1.5px solid #00B894', backgroundColor: '#E8F8F5', color: '#00B894', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>내 위치 사용하기</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.hosp-layout{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
