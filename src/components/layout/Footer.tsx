import React from 'react'
import { Link } from 'react-router'

export function SiteFooter() {
  const footerCols = [
    { heading: '서비스', links: [{ label: '증상별 진료', path: '/symptom' }, { label: '의사 찾기', path: '/hospitals' }, { label: '약국 찾기', path: '/pharmacy' }, { label: '내 예약 현황', path: '/my-appointments' }, { label: '실시간 질문', path: '/community' }] },
    { heading: '진료과', links: [{ label: '내과', path: '/hospitals/internal' }, { label: '피부과', path: '/hospitals/dermatology' }, { label: '소아청소년과', path: '/hospitals/pediatrics' }, { label: '정신건강의학과', path: '/hospitals/psychiatry' }, { label: '가정의학과', path: '/symptom/fatigue' }] },
    { heading: '고객지원', links: [{ label: '공지사항', path: '/community' }, { label: '자주 묻는 질문', path: '/' }, { label: '1:1 문의', path: '/community' }, { label: '의사 등록 문의', path: '/community' }] },
    { heading: '회사', links: [{ label: '회사 소개', path: '/' }, { label: '채용', path: '/' }, { label: '파트너십', path: '/' }, { label: '언론 보도', path: '/' }] },
  ]
  return (
    <footer style={{ backgroundColor: '#1a1f2e', color: '#fff' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z" fill="white" opacity="0.9"/><circle cx="10" cy="16" r="2" fill="white" opacity="0.9"/></svg></div>
            <div><div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>톡닥 앱 다운로드</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>더 빠르고 편리한 비대면 진료</div></div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ label: 'App Store', sub: 'iPhone & iPad' }, { label: 'Google Play', sub: 'Android' }].map((s) => (
              <a key={s.label} href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{s.sub}</div><div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>{s.label}</div></div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 24px 40px', display: 'grid', gridTemplateColumns: '1.6fr repeat(4,1fr)', gap: 40 }} className="footer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z" fill="white" opacity="0.9"/></svg></div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>톡닥<span style={{ color: '#00B894' }}>.</span></span>
          </Link>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 220 }}>언제 어디서나 빠르고 안전한 AI 비대면 진료 서비스.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['의료법 준수', 'ISO 27001', 'KISA 인증'].map((b) => <span key={b} style={{ fontSize: 10, fontWeight: 700, color: '#00B894', backgroundColor: 'rgba(0,184,148,0.1)', padding: '4px 9px', borderRadius: 5, border: '1px solid rgba(0,184,148,0.2)' }}>{b}</span>)}
          </div>
        </div>
        {footerCols.map((col) => (
          <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#00B894', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 4 }}>{col.heading}</div>
            {col.links.map((link) => <Link key={link.label} to={link.path} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', lineHeight: 1 }}>{link.label}</Link>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
            <div>주식회사 톡닥 · 대표이사 홍길동 · 사업자등록번호 123-45-67890</div>
            <div style={{ marginTop: 4 }}>© 2025 TalkDoc Inc. All rights reserved.</div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>{['이용약관', '개인정보처리방침', '의료법 고지'].map((t, i) => <a key={t} href="#" style={{ fontSize: 12, color: i === 1 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', textDecoration: 'none', fontWeight: i === 1 ? 600 : 400 }}>{t}</a>)}</div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important;}}@media(max-width:520px){.footer-grid{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  )
}
