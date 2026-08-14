
export function BackgroundDecor() {
  return (
    <>
      <div style={{ position: 'absolute', top: -120, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,184,148,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,210,0,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
      {[{ top: '12%', left: '8%', size: 20, opacity: 0.08 }, { top: '75%', left: '12%', size: 14, opacity: 0.06 }, { top: '20%', right: '6%', size: 16, opacity: 0.07 }, { top: '60%', right: '10%', size: 22, opacity: 0.05 }].map((pos, i) => (
        <svg key={i} width={pos.size} height={pos.size} viewBox="0 0 16 16" style={{ position: 'absolute', top: pos.top, left: pos.left, right: (pos as {right?: string}).right, opacity: pos.opacity, pointerEvents: 'none' }}><rect x="6" y="0" width="4" height="16" rx="2" fill="#00B894"/><rect x="0" y="6" width="16" height="4" rx="2" fill="#00B894"/></svg>
      ))}
    </>
  )
}