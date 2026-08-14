import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { NavItem, SubItem } from '../../types'
import { NAV_ITEMS } from '../../data/navData'

export function Header({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleEnter = useCallback((label: string) => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setActiveMenu(label) }, [])
  const handleLeave = useCallback(() => { leaveTimer.current = setTimeout(() => setActiveMenu(null), 120) }, [])
  const handleMegaEnter = useCallback(() => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }, [])
  return (
    <header style={{ backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(0,184,148,0.1)', position: 'sticky', top: 0, zIndex: 100 }} onMouseLeave={handleLeave}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center' }}>
        <Logo />
        <nav style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 2 }} className="gnb-desktop">
          {NAV_ITEMS.map((item) => (
            <GnbItem key={item.label} item={item} active={activeMenu === item.label} onEnter={() => item.mega && handleEnter(item.label)} onLeave={handleLeave} />
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="gnb-desktop">
          <AppDownloadButton />
          <LoginButton />
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ marginLeft: 'auto', display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#2D3436', borderRadius: 8 }} className="gnb-mobile-btn" aria-label="메뉴">
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>
      {NAV_ITEMS.map((item) => item.mega ? <MegaMenuPanel key={item.label} item={item} visible={activeMenu === item.label} onEnter={handleMegaEnter} onLeave={handleLeave} /> : null)}
      {mobileOpen && <MobileDrawer items={NAV_ITEMS} onClose={() => setMobileOpen(false)} />}
      <style>{`
        @media(max-width:900px){.gnb-desktop{display:none!important;}.gnb-mobile-btn{display:flex!important;}}
        @media(min-width:901px){.gnb-mobile-btn{display:none!important;}}
      `}</style>
    </header>
  )
}

export function GnbItem({ item, active, onEnter, onLeave }: { item: NavItem; active: boolean; onEnter: () => void; onLeave: () => void }) {
  return (
    <div style={{ position: 'relative' }} onMouseEnter={onEnter} onMouseLeave={item.mega ? undefined : onLeave}>
      <Link to={item.path} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 16px', borderRadius: 9, color: active ? '#00B894' : '#2D3436', textDecoration: 'none', fontSize: 14.5, fontWeight: active ? 600 : 500, transition: 'color 0.16s,background 0.16s', backgroundColor: active ? '#E8F8F5' : 'transparent', whiteSpace: 'nowrap' }}>
        {item.label}
        {item.mega && <ChevronIcon style={{ transform: active ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s', opacity: 0.55 }} />}
      </Link>
    </div>
  )
}

export function MegaMenuPanel({ item, visible, onEnter, onLeave }: { item: NavItem; visible: boolean; onEnter: () => void; onLeave: () => void }) {
  const mega = item.mega!
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ position: 'absolute', top: 68, left: 0, right: 0, backgroundColor: '#fff', borderBottom: '1px solid rgba(0,184,148,0.1)', boxShadow: '0 12px 48px rgba(0,0,0,0.08)', overflow: 'hidden', maxHeight: visible ? 480 : 0, opacity: visible ? 1 : 0, transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1),opacity 0.22s ease', zIndex: 99, pointerEvents: visible ? 'auto' : 'none' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px 28px', display: 'grid', gridTemplateColumns: mega.featured ? `240px repeat(${mega.columns.length},1fr)` : `repeat(${mega.columns.length},1fr)`, gap: 0 }}>
        {mega.featured && (
          <div style={{ background: 'linear-gradient(145deg,#00B894 0%,#00997d 100%)', borderRadius: 16, padding: '24px 20px', marginRight: 32, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{mega.featured.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{mega.featured.desc}</div>
            </div>
            <FeaturedCtaButton label={mega.featured.cta} to={mega.featured.ctaPath} />
          </div>
        )}
        {mega.columns.map((col, ci) => (
          <div key={col.heading} style={{ borderLeft: ci > 0 ? '1px solid #f0f5f4' : undefined, paddingLeft: ci > 0 ? 24 : 0, paddingRight: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#00B894', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 14 }}>{col.heading}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {col.items.map((sub) => <MegaSubItem key={sub.label} item={sub} />)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #f0f5f4', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto' }}>
        <span style={{ fontSize: 12.5, color: '#636E72' }}><strong style={{ color: '#2D3436' }}>팁:</strong> AI 챗봇에게 증상을 말하면 맞춤 진료과를 추천해 드려요.</span>
        <Link to={item.path} style={{ fontSize: 12.5, color: '#00B894', fontWeight: 600, textDecoration: 'none' }}>전체 보기 →</Link>
      </div>
    </div>
  )
}

export function MegaSubItem({ item }: { item: SubItem }) {
  const [hovered, setHovered] = useState(false)
  const style: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 9, textDecoration: 'none', backgroundColor: hovered ? '#F4F9F8' : 'transparent', transition: 'background 0.14s' }
  const inner = (
    <>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: hovered ? '#00B894' : '#2D3436', transition: 'color 0.14s', flex: 1 }}>{item.label}</span>
      {item.badge && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.4px', padding: '2px 6px', borderRadius: 4, backgroundColor: item.badge === 'HOT' ? '#FF6B6B' : item.badge === 'NEW' ? '#00B894' : '#FFD200', color: '#fff' }}>{item.badge}</span>}
    </>
  )
  return (
    <li>
      {item.path
        ? <Link to={item.path} style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{inner}</Link>
        : <a href="#" style={style} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{inner}</a>
      }
    </li>
  )
}

export function FeaturedCtaButton({ label, to }: { label: string; to: string }) {
  const [hovered, setHovered] = useState(false)
  return <Link to={to} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: 'block', padding: '10px 16px', borderRadius: 10, textDecoration: 'none', backgroundColor: hovered ? '#FFD200' : 'rgba(255,255,255,0.92)', color: hovered ? '#2D3436' : '#00B894', fontSize: 13, fontWeight: 700, transition: 'all 0.18s', textAlign: 'left' }}>{label}</Link>
}

export function AppDownloadButton() {
  const [h, setH] = useState(false)
  return <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderRadius: 9, border: '1px solid rgba(0,184,148,0.2)', backgroundColor: h ? '#F4F9F8' : 'transparent', color: '#2D3436', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', transition: 'all 0.16s', whiteSpace: 'nowrap' }}>앱 다운로드</button>
}

export function LoginButton() {
  const [h, setH] = useState(false)
  return <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: '9px 20px', borderRadius: 10, border: '1.5px solid #00B894', backgroundColor: h ? '#00B894' : '#E8F8F5', color: h ? '#fff' : '#00B894', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap' }}>로그인 / 회원가입</button>
}

export function MobileDrawer({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div style={{ backgroundColor: '#fff', borderTop: '1px solid rgba(0,184,148,0.1)', padding: '12px 0 24px', maxHeight: '80vh', overflowY: 'auto' }}>
      {items.map((item) => (
        <div key={item.label}>
          {item.mega
            ? <button onClick={() => setExpanded(expanded === item.label ? null : item.label)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500, color: expanded === item.label ? '#00B894' : '#2D3436', textAlign: 'left' }}>{item.label}<ChevronIcon style={{ transform: expanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', opacity: 0.5 }} /></button>
            : <Link to={item.path} onClick={onClose} style={{ display: 'block', padding: '13px 24px', fontSize: 15, fontWeight: 500, color: '#2D3436', textDecoration: 'none' }}>{item.label}</Link>
          }
          {item.mega && expanded === item.label && (
            <div style={{ backgroundColor: '#F9FDFC', padding: '8px 24px 16px' }}>
              {item.mega.columns.map((col) => (
                <div key={col.heading} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#00B894', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 8 }}>{col.heading}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {col.items.map((sub) => (
                      sub.path
                        ? <Link key={sub.label} to={sub.path} onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, backgroundColor: '#fff', border: '1px solid #e8f0ee', textDecoration: 'none', fontSize: 13, color: '#2D3436', fontWeight: 500 }}>{sub.label}{sub.badge && <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3, backgroundColor: sub.badge === 'HOT' ? '#FF6B6B' : '#00B894', color: '#fff' }}>{sub.badge}</span>}</Link>
                        : <a key={sub.label} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, backgroundColor: '#fff', border: '1px solid #e8f0ee', textDecoration: 'none', fontSize: 13, color: '#2D3436', fontWeight: 500 }}>{sub.label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ padding: '12px', borderRadius: 10, border: '1px solid rgba(0,184,148,0.2)', backgroundColor: 'transparent', color: '#2D3436', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>앱 다운로드</button>
        <button style={{ padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>로그인 / 회원가입</button>
      </div>
    </div>
  )
}

export function Logo() {
  return (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0, marginRight: 16 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z" fill="white" opacity="0.9"/><circle cx="10" cy="16" r="2" fill="white" opacity="0.9"/><circle cx="10" cy="12" r="1" fill="white"/></svg>
        <div style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFD200', border: '2px solid #fff' }} />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#2D3436', letterSpacing: '-0.5px' }}>톡닥<span style={{ color: '#00B894' }}>.</span></span>
    </Link>
  )
}

export function ChevronIcon({ style }: { style?: React.CSSProperties }) {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={style}><path d="M3 5L6.5 8.5L10 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export function HamburgerIcon({ open }: { open: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">{open ? <><line x1="4" y1="4" x2="18" y2="18" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"/><line x1="18" y1="4" x2="4" y2="18" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"/></> : <><line x1="3" y1="6" x2="19" y2="6" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="#2D3436" strokeWidth="2" strokeLinecap="round"/></>}</svg>
}
