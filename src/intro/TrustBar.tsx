export function TrustBar() {
  return (
    <div style={{ display: 'flex', gap: 28, paddingTop: 8, borderTop: '1px solid rgba(0,184,148,0.15)', flexWrap: 'wrap' }}>
      {[{ value: '12만+', label: '등록 의사' }, { value: '4.9★', label: '평균 만족도' }, { value: '3분', label: '평균 매칭 시간' }].map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#00B894', letterSpacing: '-0.5px' }}>{s.value}</span>
          <span style={{ fontSize: 12, color: '#636E72', fontWeight: 500 }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}