import React from 'react'
import { Link } from 'react-router'

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#00B894', backgroundColor: '#E8F8F5', padding: '5px 14px', borderRadius: 100, marginBottom: 16 }}>{children}</span>
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: '#2D3436', letterSpacing: '-1px', lineHeight: 1.2 }}>{children}</h2>
}

export function SectionSubheading({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 48px', fontSize: 16, color: '#636E72', lineHeight: 1.65, maxWidth: 560 }}>{children}</p>
}

export function PageHero({ label, title, subtitle, gradient }: { label: string; title: string; subtitle: string; gradient?: string }) {
  return (
    <section style={{ background: gradient || 'linear-gradient(135deg,#00B894 0%,#00997d 100%)', padding: '72px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: 40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,210,0,0.12)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
          <Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>홈</Link>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>›</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{label}</span>
        </div>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1.2 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: 'clamp(14px,1.6vw,17px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 560 }}>{subtitle}</p>
      </div>
    </section>
  )
}
