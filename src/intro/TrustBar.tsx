export function TrustBar() {
  const stats = [
    { value: '2,400+', unit: '명', label: '등록 전문의' },
    { value: '4.9', unit: '/5.0', label: '평균 만족도' },
    { value: '45', unit: '초', label: '평균 매칭 시간' },
  ]
  return (
    <div style={{ display: 'flex', gap: 32, paddingTop: 20, borderTop: '1px solid rgba(0,184,148,0.15)', flexWrap: 'wrap' }}>
      {stats.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span style={{ fontSize: 38, fontWeight: 900, color: '#00B894', letterSpacing: '-2px', lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#00B894', letterSpacing: '-0.5px' }}>{s.unit}</span>
          </div>
          <span style={{ fontSize: 12.5, color: '#636E72', fontWeight: 500 }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
