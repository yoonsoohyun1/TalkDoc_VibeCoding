import { useState } from 'react'
import { PageHero } from '../components/ui/SharedUI'
import { PHARMACIES } from '../data/pageData'

export default function PharmacyPage() {
  const [mode, setMode] = useState<'visit' | 'delivery'>('visit')
  return (
    <div>
      <PageHero label="약국 찾기" title="가까운 약국에서 편리하게" subtitle="처방전 전송 후 방문 수령 또는 배송으로 처방약을 받아보세요." gradient="linear-gradient(135deg,#00997d 0%,#007a63 100%)" />
      <section style={{ backgroundColor: '#fff', padding: '36px 24px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', backgroundColor: '#F4F9F8', borderRadius: 12, padding: 4, marginBottom: 32 }}>
            {[{ key: 'visit', label: '약국 방문 수령' }, { key: 'delivery', label: '배송 신청' }].map((m) => <button key={m.key} onClick={() => setMode(m.key as 'visit' | 'delivery')} style={{ padding: '10px 24px', borderRadius: 9, border: 'none', backgroundColor: mode === m.key ? '#fff' : 'transparent', color: mode === m.key ? '#00B894' : '#636E72', fontSize: 14, fontWeight: mode === m.key ? 700 : 500, cursor: 'pointer', transition: 'all 0.18s', boxShadow: mode === m.key ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}>{m.label}</button>)}
          </div>
          {/* Prescription status */}
          <div style={{ backgroundColor: '#E8F8F5', borderRadius: 16, padding: '20px 24px', marginBottom: 32, border: '1px solid rgba(0,184,148,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>처방전 상태 추적</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#00B894', backgroundColor: '#fff', padding: '4px 12px', borderRadius: 20 }}>오늘 14:32 발행</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[{ label: '진료 완료', done: true }, { label: '처방전 발행', done: true }, { label: '약국 전송', done: true }, { label: '조제 완료', done: false }].map((step, i, arr) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: step.done ? '#00B894' : '#e0ecea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {step.done ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#c0c8c7' }} />}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: step.done ? '#00B894' : '#aaa', whiteSpace: 'nowrap' }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: step.done ? '#00B894' : '#e0ecea', marginBottom: 18 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {mode === 'visit' ? (
        <section style={{ backgroundColor: '#fff', padding: '0 24px 64px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#F4F9F8', borderRadius: 12, padding: '12px 18px', border: '1.5px solid #e0ecea' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="#636E72" strokeWidth="1.5"/><path d="M13 13l3 3" stroke="#636E72" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <input placeholder="약국 이름 또는 주소 검색..." style={{ border: 'none', background: 'none', fontSize: 14, color: '#2D3436', width: '100%' }} />
              </div>
              <button style={{ padding: '12px 20px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>내 위치</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PHARMACIES.map((p) => (
                <div key={p.name} style={{ backgroundColor: '#fff', borderRadius: 14, padding: '16px 20px', border: '1.5px solid #eef4f2', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: p.open ? '#E8F8F5' : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>💊</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#2D3436' }}>{p.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: p.open ? '#00B894' : '#FF6B6B', backgroundColor: p.open ? '#E8F8F5' : '#fff0f0', padding: '2px 8px', borderRadius: 20 }}>{p.open ? '영업 중' : '영업 종료'}</span>
                      {p.delivery && <span style={{ fontSize: 11, fontWeight: 600, color: '#6C63FF', backgroundColor: '#f0eeff', padding: '2px 8px', borderRadius: 20 }}>배송 가능</span>}
                    </div>
                    <div style={{ fontSize: 13, color: '#636E72' }}>{p.address} · {p.dist} · {p.hours}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ padding: '8px 14px', borderRadius: 9, border: '1px solid #e0ecea', backgroundColor: '#fff', color: '#2D3436', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>전화</button>
                    <button style={{ padding: '8px 14px', borderRadius: 9, border: 'none', backgroundColor: p.open ? '#00B894' : '#e0ecea', color: p.open ? '#fff' : '#aaa', fontSize: 13, fontWeight: 700, cursor: p.open ? 'pointer' : 'not-allowed' }}>처방전 전송</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section style={{ backgroundColor: '#fff', padding: '0 24px 64px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }} className="delivery-grid">
              <div style={{ backgroundColor: '#E8F8F5', borderRadius: 16, padding: '24px', border: '1.5px solid rgba(0,184,148,0.3)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#00B894', marginBottom: 4 }}>퀵 배송</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#2D3436', marginBottom: 8 }}>1~3시간 이내</div>
                <div style={{ fontSize: 13, color: '#636E72', lineHeight: 1.6 }}>배송비 3,900원 · 서울 전 지역</div>
                <button style={{ marginTop: 16, padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', width: '100%' }}>퀵 배송 신청</button>
              </div>
              <div style={{ backgroundColor: '#FFF9E0', borderRadius: 16, padding: '24px', border: '1.5px solid rgba(255,210,0,0.3)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#b8960a', marginBottom: 4 }}>일반 택배</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#2D3436', marginBottom: 8 }}>1~2일 이내</div>
                <div style={{ fontSize: 13, color: '#636E72', lineHeight: 1.6 }}>배송비 2,500원 · 전국 배송</div>
                <button style={{ marginTop: 16, padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#FFD200', color: '#2D3436', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', width: '100%' }}>일반 택배 신청</button>
              </div>
            </div>
            <div style={{ backgroundColor: '#F4F9F8', borderRadius: 14, padding: '20px 24px', border: '1px solid #eef4f2' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436', marginBottom: 8 }}>배송 주소</div>
              <div style={{ fontSize: 14, color: '#636E72', backgroundColor: '#fff', padding: '14px 18px', borderRadius: 10, border: '1px solid #e0ecea' }}>서울특별시 강남구 테헤란로 152 (기본 배송지)</div>
              <button style={{ marginTop: 10, fontSize: 13, fontWeight: 600, color: '#00B894', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>배송지 변경 →</button>
            </div>
          </div>
        </section>
      )}
      <style>{`@media(max-width:640px){.delivery-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
