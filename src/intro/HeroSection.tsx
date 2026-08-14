import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { BackgroundDecor } from './BackgroundDecor'
import { SecondaryCtaButton } from './SecondaryCtaButton'
import { UnderlineDecor } from '../intro/UnderlineDecor'
import { TrustBar } from '../intro/TrustBar'
import { DoctorCard } from '../intro/DoctorCard'


export function HeroSection() {
  const [ctaHovered, setCtaHovered] = useState(false)
  const navigate = useNavigate()
  return (
    <section style={{ background: 'linear-gradient(145deg,#F4F9F8 0%,#E8F8F5 50%,#F4F9F8 100%)', minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', padding: '60px 24px 80px', position: 'relative', overflow: 'hidden' }}>
      <BackgroundDecor />
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, backgroundColor: '#FFD200', color: '#2D3436', fontSize: 13, fontWeight: 700, boxShadow: '0 2px 8px rgba(255,210,0,0.4)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#2D3436', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
              24시간 AI 사전 상담 대기 중
            </span>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, color: '#2D3436', lineHeight: 1.18, letterSpacing: '-1.5px' }}>
              언제 어디서나{' '}
              <span style={{ color: '#00B894', position: 'relative', display: 'inline-block' }}>Fast & Easy<UnderlineDecor /></span>
              ,<br />AI 맞춤 비대면 진료{' '}<span style={{ color: '#00B894' }}>톡닥</span>
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(15px,1.8vw,18px)', color: '#636E72', lineHeight: 1.7, maxWidth: 480 }}>
            증상 입력부터 전문 의사 매칭까지, <strong style={{ color: '#2D3436', fontWeight: 600 }}>AI 챗봇</strong>과 함께 <strong style={{ color: '#2D3436', fontWeight: 600 }}>1분 만에</strong> 예약하세요.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
            <button onMouseEnter={() => setCtaHovered(true)} onMouseLeave={() => setCtaHovered(false)} onClick={() => navigate('/symptom')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRadius: 14, border: 'none', backgroundColor: ctaHovered ? '#00997d' : '#00B894', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: ctaHovered ? '0 8px 24px rgba(0,184,148,0.45)' : '0 4px 16px rgba(0,184,148,0.3)', transform: ctaHovered ? 'translateY(-2px)' : 'translateY(0)', letterSpacing: '-0.2px' }}>
              AI 증상 분석 시작하기 →
            </button>
            <SecondaryCtaButton />
          </div>
          <TrustBar />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-visual"><DoctorCard /></div>
      </div>
      <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr!important;gap:48px!important;}.hero-visual{order:-1;}}`}</style>
    </section>
  )
}
