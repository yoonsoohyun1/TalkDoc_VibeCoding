export function DoctorCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420, animation: 'floatSlow 6s ease-in-out infinite' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 20px 60px rgba(0,184,148,0.12),0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,184,148,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>👩‍⚕️</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 16, fontWeight: 700, color: '#2D3436' }}>김지수 원장</span><span style={{ fontSize: 11, fontWeight: 600, color: '#00B894', backgroundColor: '#E8F8F5', padding: '2px 8px', borderRadius: 20 }}>ONLINE</span></div>
            <span style={{ fontSize: 13, color: '#636E72' }}>내과 전문의 · 서울아산병원 출신</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#F4F9F8', borderRadius: 14, padding: '14px 16px', marginBottom: 16, borderLeft: '3px solid #00B894' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#00B894', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI 증상 분석 결과</div>
          <p style={{ margin: 0, fontSize: 13.5, color: '#2D3436', lineHeight: 1.6 }}>입력하신 증상 (두통, 발열 38.2°C)을 분석한 결과, <strong>내과 진료</strong>를 추천드립니다.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {['두통', '발열', '감기·몸살', '소화불량'].map((tag) => <span key={tag} style={{ fontSize: 12, fontWeight: 500, color: '#636E72', backgroundColor: '#F4F9F8', padding: '4px 12px', borderRadius: 20, border: '1px solid #e0ecea' }}>{tag}</span>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 16 }}>⭐</span><span style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>4.97</span><span style={{ fontSize: 12, color: '#636E72' }}>리뷰 1,284개</span></div>
          <button style={{ padding: '10px 20px', borderRadius: 10, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>바로 예약</button>
        </div>
      </div>
      <div style={{ position: 'absolute', top: -18, right: -16, backgroundColor: '#FFD200', borderRadius: 12, padding: '10px 16px', boxShadow: '0 6px 20px rgba(255,210,0,0.35)', display: 'flex', alignItems: 'center', gap: 8, animation: 'float 4s ease-in-out infinite', zIndex: 2 }}>
        <span style={{ fontSize: 16 }}>🤖</span>
        <div><div style={{ fontSize: 11, fontWeight: 700, color: '#2D3436', whiteSpace: 'nowrap' }}>AI 매칭 완료!</div><div style={{ fontSize: 10, color: '#4a4a2d', whiteSpace: 'nowrap' }}>1분 35초 소요</div></div>
      </div>
      <div style={{ position: 'absolute', bottom: -16, left: -16, backgroundColor: '#fff', borderRadius: 12, padding: '10px 16px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 10, animation: 'float 5s ease-in-out infinite 1s', border: '1px solid #E8F8F5', zIndex: 2 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💊</div>
        <div><div style={{ fontSize: 12, fontWeight: 700, color: '#2D3436' }}>처방전 발행 완료</div><div style={{ fontSize: 10, color: '#636E72' }}>가까운 약국에서 수령하세요</div></div>
      </div>
    </div>
  )
}