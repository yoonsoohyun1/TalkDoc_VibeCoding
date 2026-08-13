// TalkDoc landing page – v5
import { useState, useRef, useCallback, useEffect } from 'react'

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Mega Menu Data ───────────────────────────────────────────────────────────

type SubItem = { label: string; badge?: string }
type NavItem = {
  label: string
  mega?: {
    featured?: { title: string; desc: string; cta: string }
    columns: { heading: string; items: SubItem[] }[]
  }
}

const NAV_ITEMS: NavItem[] = [
  {
    label: '증상별 진료',
    mega: {
      featured: {
        title: 'AI 증상 분석',
        desc: '증상을 입력하면 AI가 적합한 진료과를 추천해 드립니다.',
        cta: '증상 입력하기 →',
      },
      columns: [
        {
          heading: '호흡기·내과',
          items: [
            { label: '감기·몸살' },
            { label: '기침·가래' },
            { label: '발열·두통' },
            { label: '소화불량' },
            { label: '만성피로' },
          ],
        },
        {
          heading: '피부·미용',
          items: [
            { label: '여드름·트러블' },
            { label: '탈모', badge: 'HOT' },
            { label: '피부염·아토피' },
            { label: '두드러기' },
            { label: '건선' },
          ],
        },
        {
          heading: '소아·가족',
          items: [
            { label: '소아청소년과', badge: 'NEW' },
            { label: '소아 발열' },
            { label: '영유아 건강' },
            { label: '성장 상담' },
            { label: '예방접종 상담' },
          ],
        },
        {
          heading: '다이어트·건강',
          items: [
            { label: '비만·체중 관리', badge: 'HOT' },
            { label: '당뇨·혈당' },
            { label: '고혈압' },
            { label: '갱년기' },
            { label: '수면 장애' },
          ],
        },
      ],
    },
  },
  {
    label: '의사 찾기',
    mega: {
      columns: [
        {
          heading: '진료과 선택',
          items: [
            { label: '내과' },
            { label: '피부과' },
            { label: '소아청소년과' },
            { label: '정신건강의학과' },
            { label: '산부인과' },
          ],
        },
        {
          heading: '전문 클리닉',
          items: [
            { label: '탈모 클리닉', badge: 'HOT' },
            { label: '비만 클리닉' },
            { label: '금연 클리닉' },
            { label: '수면 클리닉' },
            { label: '만성질환 관리' },
          ],
        },
        {
          heading: '의사 찾기 방법',
          items: [
            { label: '평점 TOP 의사' },
            { label: '빠른 응답 의사', badge: 'NEW' },
            { label: '야간·주말 진료' },
            { label: '외국어 가능' },
            { label: '여성 의사' },
          ],
        },
      ],
    },
  },
  {
    label: '진료 예약',
    mega: {
      featured: {
        title: '지금 바로 예약',
        desc: '평균 3분 안에 의사와 연결됩니다. 대기 없이 비대면으로.',
        cta: '예약 시작하기 →',
      },
      columns: [
        {
          heading: '예약 유형',
          items: [
            { label: '즉시 진료 (바로 연결)', badge: 'LIVE' },
            { label: '시간 예약' },
            { label: '재진 예약' },
          ],
        },
        {
          heading: '진료 방식',
          items: [
            { label: '화상 진료' },
            { label: '채팅 진료' },
            { label: '전화 진료' },
          ],
        },
      ],
    },
  },
  {
    label: '내 예약 현황',
  },
]

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ backgroundColor: '#F4F9F8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes floatBob {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .reveal-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        button:active { transform: scale(0.97) !important; }
      `}</style>
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <HeroSection />
      <HowItWorksSection />
      <HospitalComparisonSection />
      <LiveDoctorsSwiper />
      <ReviewsSection />
      <PrescriptionSection />
      <FAQSection />
      <FloatingAIButton />
      <SiteFooter />
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMenu(label)
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }, [])

  const handleMegaEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
  }, [])

  return (
    <header
      style={{
        backgroundColor: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,184,148,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
      onMouseLeave={handleLeave}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 28px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Logo */}
        <Logo />

        {/* Center nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            gap: 2,
          }}
          className="gnb-desktop"
        >
          {NAV_ITEMS.map((item) => (
            <GnbItem
              key={item.label}
              item={item}
              active={activeMenu === item.label}
              onEnter={() => item.mega && handleEnter(item.label)}
              onLeave={handleLeave}
            />
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="gnb-desktop">
          <AppDownloadButton />
          <LoginButton />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            marginLeft: 'auto',
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: '#2D3436',
            borderRadius: 8,
          }}
          aria-label="메뉴"
          className="gnb-mobile-btn"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mega Menu Panel */}
      {NAV_ITEMS.map((item) =>
        item.mega ? (
          <MegaMenuPanel
            key={item.label}
            item={item}
            visible={activeMenu === item.label}
            onEnter={handleMegaEnter}
            onLeave={handleLeave}
          />
        ) : null,
      )}

      {/* Mobile Drawer */}
      {mobileOpen && <MobileDrawer items={NAV_ITEMS} onClose={() => setMobileOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .gnb-desktop { display: none !important; }
          .gnb-mobile-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .gnb-mobile-btn { display: none !important; }
        }
      `}</style>
    </header>
  )
}

// ─── GNB Item ─────────────────────────────────────────────────────────────────

function GnbItem({
  item,
  active,
  onEnter,
  onLeave,
}: {
  item: NavItem
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={onEnter}
      onMouseLeave={item.mega ? undefined : onLeave}
    >
      <a
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '8px 16px',
          borderRadius: 9,
          color: active ? '#00B894' : '#2D3436',
          textDecoration: 'none',
          fontSize: 14.5,
          fontWeight: active ? 600 : 500,
          transition: 'color 0.16s, background 0.16s',
          backgroundColor: active ? '#E8F8F5' : 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
        {item.mega && (
          <ChevronIcon
            style={{
              transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.22s',
              opacity: 0.55,
            }}
          />
        )}
      </a>
    </div>
  )
}

// ─── Mega Menu Panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({
  item,
  visible,
  onEnter,
  onLeave,
}: {
  item: NavItem
  visible: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const mega = item.mega!
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        top: 68,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(0,184,148,0.1)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        maxHeight: visible ? 480 : 0,
        opacity: visible ? 1 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease',
        zIndex: 99,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 28px 28px',
          display: 'grid',
          gridTemplateColumns: mega.featured
            ? `240px repeat(${mega.columns.length}, 1fr)`
            : `repeat(${mega.columns.length}, 1fr)`,
          gap: 0,
        }}
      >
        {/* Featured panel */}
        {mega.featured && (
          <div
            style={{
              background: 'linear-gradient(145deg, #00B894 0%, #00997d 100%)',
              borderRadius: 16,
              padding: '24px 20px',
              marginRight: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}
              >
                {mega.featured.title}
              </div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                {mega.featured.desc}
              </div>
            </div>
            <FeaturedCtaButton label={mega.featured.cta} />
          </div>
        )}

        {/* Columns */}
        {mega.columns.map((col, ci) => (
          <div
            key={col.heading}
            style={{
              borderLeft: ci > 0 ? '1px solid #f0f5f4' : undefined,
              paddingLeft: ci > 0 ? 24 : 0,
              paddingRight: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#00B894',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              {col.heading}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {col.items.map((sub) => (
                <MegaSubItem key={sub.label} item={sub} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: '1px solid #f0f5f4',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: 12.5, color: '#636E72' }}>
          <strong style={{ color: '#2D3436' }}>팁:</strong> AI 챗봇에게 증상을 말하면 맞춤 진료과를 추천해 드려요.
        </span>
        <a
          href="#"
          style={{
            fontSize: 12.5,
            color: '#00B894',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          전체 진료과 보기 →
        </a>
      </div>
    </div>
  )
}

// ─── Mega Sub Item ────────────────────────────────────────────────────────────

function MegaSubItem({ item }: { item: SubItem }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 10px',
          borderRadius: 9,
          textDecoration: 'none',
          backgroundColor: hovered ? '#F4F9F8' : 'transparent',
          transition: 'background 0.14s',
        }}
      >
        <span
          style={{
            fontSize: 13.5,
            fontWeight: 500,
            color: hovered ? '#00B894' : '#2D3436',
            transition: 'color 0.14s',
            flex: 1,
          }}
        >
          {item.label}
        </span>
        {item.badge && (
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.4px',
              padding: '2px 6px',
              borderRadius: 4,
              backgroundColor:
                item.badge === 'HOT'
                  ? '#FF6B6B'
                  : item.badge === 'NEW'
                    ? '#00B894'
                    : '#FFD200',
              color: item.badge === 'LIVE' ? '#2D3436' : '#fff',
            }}
          >
            {item.badge}
          </span>
        )}
      </a>
    </li>
  )
}

// ─── Featured CTA Button ──────────────────────────────────────────────────────

function FeaturedCtaButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 16px',
        borderRadius: 10,
        border: 'none',
        backgroundColor: hovered ? '#FFD200' : 'rgba(255,255,255,0.92)',
        color: hovered ? '#2D3436' : '#00B894',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.18s',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  )
}

// ─── App Download Button ──────────────────────────────────────────────────────

function AppDownloadButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: 9,
        border: '1px solid rgba(0,184,148,0.2)',
        backgroundColor: hovered ? '#F4F9F8' : 'transparent',
        color: '#2D3436',
        fontSize: 13.5,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.16s',
        whiteSpace: 'nowrap',
      }}
    >
      앱 다운로드
    </button>
  )
}

// ─── Login Button ─────────────────────────────────────────────────────────────

function LoginButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 20px',
        borderRadius: 10,
        border: '1.5px solid #00B894',
        backgroundColor: hovered ? '#00B894' : '#E8F8F5',
        color: hovered ? '#fff' : '#00B894',
        fontSize: 13.5,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.18s',
        whiteSpace: 'nowrap',
      }}
    >
      로그인 / 회원가입
    </button>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ items, onClose }: { items: NavItem[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderTop: '1px solid rgba(0,184,148,0.1)',
        padding: '12px 0 24px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      {items.map((item) => (
        <div key={item.label}>
          <button
            onClick={() => {
              if (item.mega) setExpanded(expanded === item.label ? null : item.label)
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 500,
              color: expanded === item.label ? '#00B894' : '#2D3436',
              textAlign: 'left',
            }}
          >
            {item.label}
            {item.mega && (
              <ChevronIcon
                style={{
                  transform: expanded === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  opacity: 0.5,
                }}
              />
            )}
          </button>
          {item.mega && expanded === item.label && (
            <div style={{ backgroundColor: '#F9FDFC', padding: '8px 24px 16px' }}>
              {item.mega.columns.map((col) => (
                <div key={col.heading} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#00B894',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    {col.heading}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {col.items.map((sub) => (
                      <a
                        key={sub.label}
                        href="#"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          borderRadius: 8,
                          backgroundColor: '#fff',
                          border: '1px solid #e8f0ee',
                          textDecoration: 'none',
                          fontSize: 13,
                          color: '#2D3436',
                          fontWeight: 500,
                        }}
                      >
                        {sub.label}
                        {sub.badge && (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              padding: '1px 5px',
                              borderRadius: 3,
                              backgroundColor: sub.badge === 'HOT' ? '#FF6B6B' : '#00B894',
                              color: '#fff',
                            }}
                          >
                            {sub.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          style={{
            padding: '12px',
            borderRadius: 10,
            border: '1px solid rgba(0,184,148,0.2)',
            backgroundColor: 'transparent',
            color: '#2D3436',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          앱 다운로드
        </button>
        <button
          style={{
            padding: '12px',
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#00B894',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          로그인 / 회원가입
        </button>
      </div>
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a
      href="#"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        textDecoration: 'none',
        flexShrink: 0,
        marginRight: 16,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: '#00B894',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="10" cy="16" r="2" fill="white" opacity="0.9" />
          <circle cx="10" cy="12" r="1" fill="white" />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: -3,
            right: -3,
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#FFD200',
            border: '2px solid #fff',
          }}
        />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#2D3436', letterSpacing: '-0.5px' }}>
        톡닥<span style={{ color: '#00B894' }}>.</span>
      </span>
    </a>
  )
}

// ─── Chevron Icon ─────────────────────────────────────────────────────────────

function ChevronIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={style}>
      <path
        d="M3 5L6.5 8.5L10 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

// ─── Hero Section (preserved) ─────────────────────────────────────────────────

function HeroSection() {
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <section
      style={{
        background: 'linear-gradient(145deg, #F4F9F8 0%, #E8F8F5 50%, #F4F9F8 100%)',
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BackgroundDecor />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 16px',
                borderRadius: 100,
                backgroundColor: '#FFD200',
                color: '#2D3436',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '-0.1px',
                boxShadow: '0 2px 8px rgba(255, 210, 0, 0.4)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#2D3436',
                  display: 'inline-block',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              24시간 AI 사전 상담 대기 중
            </span>
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 800,
                color: '#2D3436',
                lineHeight: 1.18,
                letterSpacing: '-1.5px',
              }}
            >
              언제 어디서나{' '}
              <span style={{ color: '#00B894', position: 'relative', display: 'inline-block' }}>
                Fast & Easy
                <UnderlineDecor />
              </span>
              ,<br />
              AI 맞춤 비대면 진료{' '}
              <span style={{ color: '#00B894' }}>톡닥</span>
            </h1>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#636E72',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: 480,
            }}
          >
            증상 입력부터 전문 의사 매칭까지,{' '}
            <strong style={{ color: '#2D3436', fontWeight: 600 }}>AI 챗봇</strong>과 함께{' '}
            <strong style={{ color: '#2D3436', fontWeight: 600 }}>1분 만에</strong> 예약하세요.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4 }}>
            <button
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 28px',
                borderRadius: 14,
                border: 'none',
                backgroundColor: ctaHovered ? '#00997d' : '#00B894',
                color: '#fff',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: ctaHovered
                  ? '0 8px 24px rgba(0,184,148,0.45)'
                  : '0 4px 16px rgba(0,184,148,0.3)',
                transform: ctaHovered ? 'translateY(-2px)' : 'translateY(0)',
                letterSpacing: '-0.2px',
              }}
            >
              증상 체크하고 의사 매칭하기
              <span style={{ fontSize: 18 }}>→</span>
            </button>
            <SecondaryCtaButton />
          </div>

          <TrustBar />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-visual">
          <DoctorCard />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(3deg); }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-visual { order: -1; }
        }
      `}</style>
    </section>
  )
}

function SecondaryCtaButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '16px 24px',
        borderRadius: 14,
        border: '1.5px solid rgba(0,184,148,0.3)',
        backgroundColor: hovered ? '#E8F8F5' : 'transparent',
        color: '#00B894',
        fontSize: 15,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.18s',
      }}
    >
      의사 찾아보기
    </button>
  )
}

function TrustBar() {
  const stats = [
    { value: '12만+', label: '등록 의사' },
    { value: '4.9★', label: '평균 만족도' },
    { value: '3분', label: '평균 매칭 시간' },
  ]
  return (
    <div
      style={{
        display: 'flex',
        gap: 28,
        paddingTop: 8,
        borderTop: '1px solid rgba(0,184,148,0.15)',
        flexWrap: 'wrap',
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#00B894', letterSpacing: '-0.5px' }}>
            {s.value}
          </span>
          <span style={{ fontSize: 12, color: '#636E72', fontWeight: 500 }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function DoctorCard() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        animation: 'floatSlow 6s ease-in-out infinite',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 24,
          padding: 28,
          boxShadow: '0 20px 60px rgba(0,184,148,0.12), 0 4px 16px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,184,148,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: '#E8F8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            👩‍⚕️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#2D3436' }}>김지수 원장</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#00B894',
                  backgroundColor: '#E8F8F5',
                  padding: '2px 8px',
                  borderRadius: 20,
                }}
              >
                ONLINE
              </span>
            </div>
            <span style={{ fontSize: 13, color: '#636E72', fontWeight: 400 }}>
              내과 전문의 · 서울아산병원 출신
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#F4F9F8',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 16,
            borderLeft: '3px solid #00B894',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#00B894',
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            AI 증상 분석 결과
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: '#2D3436', lineHeight: 1.6 }}>
            입력하신 증상 (두통, 발열 38.2°C)을 분석한 결과,{' '}
            <strong>내과 진료</strong>를 추천드립니다.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {['두통', '발열', '감기·몸살', '소화불량'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#636E72',
                backgroundColor: '#F4F9F8',
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid #e0ecea',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>⭐</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>4.97</span>
            <span style={{ fontSize: 12, color: '#636E72' }}>리뷰 1,284개</span>
          </div>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#00B894',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '-0.2px',
            }}
          >
            바로 예약
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: -18,
          right: -16,
          backgroundColor: '#FFD200',
          borderRadius: 12,
          padding: '10px 16px',
          boxShadow: '0 6px 20px rgba(255,210,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'float 4s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: 16 }}>🤖</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2D3436', whiteSpace: 'nowrap' }}>
            AI 매칭 완료!
          </div>
          <div style={{ fontSize: 10, color: '#4a4a2d', whiteSpace: 'nowrap' }}>1분 35초 소요</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: -16,
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: '10px 16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'float 5s ease-in-out infinite 1s',
          border: '1px solid #E8F8F5',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#E8F8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          💊
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2D3436' }}>처방전 발행 완료</div>
          <div style={{ fontSize: 10, color: '#636E72' }}>가까운 약국에서 수령하세요</div>
        </div>
      </div>
    </div>
  )
}

function BackgroundDecor() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,184,148,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,0,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {[
        { top: '12%', left: '8%', size: 20, opacity: 0.08 },
        { top: '75%', left: '12%', size: 14, opacity: 0.06 },
        { top: '20%', right: '6%', size: 16, opacity: 0.07 },
        { top: '60%', right: '10%', size: 22, opacity: 0.05 },
      ].map((pos, i) => (
        <MedicalCross key={i} {...pos} />
      ))}
    </>
  )
}

function MedicalCross({
  top, left, right, size = 16, opacity = 0.08,
}: {
  top?: string; left?: string; right?: string; size?: number; opacity?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ position: 'absolute', top, left, right, opacity, pointerEvents: 'none' }}
    >
      <rect x="6" y="0" width="4" height="16" rx="2" fill="#00B894" />
      <rect x="0" y="6" width="16" height="4" rx="2" fill="#00B894" />
    </svg>
  )
}

function UnderlineDecor() {
  return (
    <svg
      viewBox="0 0 200 12"
      style={{
        position: 'absolute',
        bottom: -6,
        left: 0,
        width: '100%',
        height: 10,
        overflow: 'visible',
      }}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8 Q50 2, 100 7 Q150 12, 198 6"
        stroke="#FFD200"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Shared Section Utilities ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: '#00B894',
        backgroundColor: '#E8F8F5',
        padding: '5px 14px',
        borderRadius: 100,
        marginBottom: 16,
      }}
    >
      {children}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: '0 0 12px',
        fontSize: 'clamp(26px, 3.5vw, 38px)',
        fontWeight: 800,
        color: '#2D3436',
        letterSpacing: '-1px',
        lineHeight: 1.2,
      }}
    >
      {children}
    </h2>
  )
}

function SectionSubheading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: '0 0 48px',
        fontSize: 16,
        color: '#636E72',
        lineHeight: 1.65,
        maxWidth: 560,
      }}
    >
      {children}
    </p>
  )
}

// ─── Section 1: How It Works ──────────────────────────────────────────────────

// ─── Section 1: How It Works (Premium Timeline) ───────────────────────────────

const HOW_STEPS = [
  {
    num: 1,
    label: 'STEP 1',
    title: '증상 입력 & AI 사전 상담',
    desc: '채팅창에 증상을 입력하면 AI가 즉시 분석해 맞춤 진료과와 의사를 추천합니다.',
    color: '#00B894',
    mockup: (
      <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 4px 24px rgba(0,184,148,0.15)', width: 200, border: '1px solid #E8F8F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="white" opacity="0.3"/><path d="M4 7h6M7 4v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2D3436' }}>AI 챗봇</span>
          <div style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#00B894' }} />
        </div>
        {[{ msg: '두통이 3일째 계속됩니다', mine: true }, { msg: '내과 진료를 추천드립니다 ✓', mine: false }].map((b, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: b.mine ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
            <div style={{ background: b.mine ? '#00B894' : '#F4F9F8', color: b.mine ? '#fff' : '#2D3436', borderRadius: b.mine ? '12px 12px 2px 12px' : '12px 12px 12px 2px', padding: '7px 11px', fontSize: 11, maxWidth: 130, lineHeight: 1.4 }}>{b.msg}</div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          <div style={{ flex: 1, height: 28, borderRadius: 8, background: '#F4F9F8', border: '1px solid #e0ecea', display: 'flex', alignItems: 'center', paddingLeft: 8 }}><span style={{ fontSize: 10, color: '#aaa' }}>증상을 입력하세요...</span></div>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    label: 'STEP 2',
    title: '맞춤 의사 선택 & 예약',
    desc: '평점·전문성·응답속도를 한눈에 비교하고 원하는 시간에 바로 예약합니다.',
    color: '#6C63FF',
    mockup: (
      <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 4px 24px rgba(108,99,255,0.12)', width: 200, border: '1px solid #f0eeff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6C63FF', marginBottom: 10, letterSpacing: '0.4px' }}>추천 의사 목록</div>
        {[{ name: '김지수 원장', dept: '내과', r: 4.97, wait: '3분' }, { name: '박성민 원장', dept: '내과', r: 4.95, wait: '즉시' }].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i === 0 ? '1px solid #f5f5f5' : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: i === 0 ? '#E8F8F5' : '#f0eeff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{i === 0 ? '👩' : '👨'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2D3436' }}>{d.name}</div>
              <div style={{ fontSize: 10, color: '#636E72' }}>{d.dept} · ★{d.r}</div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? '#00B894' : '#6C63FF', background: i === 0 ? '#E8F8F5' : '#f0eeff', padding: '3px 7px', borderRadius: 5 }}>{d.wait}</div>
          </div>
        ))}
        <div style={{ marginTop: 10, background: '#6C63FF', borderRadius: 8, padding: '8px', textAlign: 'center' }}><span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>예약 확정하기</span></div>
      </div>
    ),
  },
  {
    num: 3,
    label: 'STEP 3',
    title: '화상 / 음성 비대면 진료',
    desc: '스마트폰으로 집에서 전문의와 1:1 화상 진료. 평균 대기 없이 바로 시작.',
    color: '#FF6B6B',
    mockup: (
      <div style={{ background: '#1a1a2e', borderRadius: 16, padding: '16px', boxShadow: '0 4px 24px rgba(255,107,107,0.15)', width: 200, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(0,184,148,0.15), transparent 60%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, position: 'relative' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>화상 진료 중</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B6B', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 10, color: '#FF6B6B', fontWeight: 700 }}>LIVE</span>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, position: 'relative' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #E8F8F5, #00B894)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👩‍⚕️</div>
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '3px 7px' }}><span style={{ fontSize: 9, color: '#fff' }}>김지수 원장</span></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {['🎤', '📹', '🔴'].map((ico, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: i === 2 ? '#FF6B6B' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{ico}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: 4,
    label: 'STEP 4',
    title: '처방전 전송 & 약 수령',
    desc: '진료 종료 즉시 처방전이 약국으로 전송됩니다. 방문 또는 당일 배송 선택.',
    color: '#FFD200',
    mockup: (
      <div style={{ background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 4px 24px rgba(255,210,0,0.15)', width: 200, border: '1px solid #fff8d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF8D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💊</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2D3436' }}>처방전 발행 완료</div>
            <div style={{ fontSize: 10, color: '#00B894', fontWeight: 600 }}>약국 전송됨</div>
          </div>
        </div>
        <div style={{ background: '#F4F9F8', borderRadius: 10, padding: '10px', marginBottom: 8 }}>
          {['아목시실린 500mg · 3일분', '이부프로펜 400mg · 3일분'].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: i === 0 ? 6 : 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00B894', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#2D3436' }}>{m}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, background: '#E8F8F5', borderRadius: 8, padding: '7px', textAlign: 'center' }}><div style={{ fontSize: 9, fontWeight: 700, color: '#00B894' }}>약국 방문</div></div>
          <div style={{ flex: 1, background: '#FFD200', borderRadius: 8, padding: '7px', textAlign: 'center' }}><div style={{ fontSize: 9, fontWeight: 700, color: '#2D3436' }}>배송 신청</div></div>
        </div>
      </div>
    ),
  },
]

function HowItWorksSection() {
  const { ref, visible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: '#fff', padding: '96px 24px' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel>이용 방법</SectionLabel>
          <SectionHeading>톡닥으로 1분 만에 비대면 진료받는 법</SectionHeading>
          <p style={{ margin: '12px auto 0', fontSize: 16, color: '#636E72', lineHeight: 1.65, maxWidth: 500 }}>
            카드에 마우스를 올리거나 클릭하면 상세 내용을 확인할 수 있습니다.
          </p>
        </div>

        {/* Fixed-height timeline container — prevents layout shift */}
        <div style={{ position: 'relative', height: 500 }} className="how-timeline-wrap">
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #00B894, #6C63FF, #FF6B6B, #FFD200)', borderRadius: 2, zIndex: 0 }} className="timeline-line" />

          <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0 }}>
            {HOW_STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, cursor: 'pointer', position: 'relative', zIndex: 1, padding: '0 8px' }}
                >
                  {/* Step bubble */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: isActive ? step.color : '#fff',
                      border: `3px solid ${step.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.28s ease',
                      boxShadow: isActive ? `0 8px 28px ${step.color}44` : '0 2px 12px rgba(0,0,0,0.08)',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 26, fontWeight: 900, color: isActive ? '#fff' : step.color, letterSpacing: '-1px' }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Content card — fixed height, mockup fades in via opacity */}
                  <div
                    style={{
                      backgroundColor: isActive ? '#fff' : '#fafcfc',
                      borderRadius: 18,
                      padding: '24px 20px',
                      border: `1.5px solid ${isActive ? step.color : '#eef4f2'}`,
                      boxShadow: isActive ? `0 12px 40px ${step.color}18` : 'none',
                      transition: 'border-color 0.28s, box-shadow 0.28s, background 0.28s',
                      width: '100%',
                      height: 380,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{step.label}</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436', lineHeight: 1.35 }}>{step.title}</div>
                    <div style={{ fontSize: 12.5, color: '#636E72', lineHeight: 1.6 }}>{step.desc}</div>

                    {/* Mockup — always visible */}
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 8,
                      }}
                    >
                      {step.mockup}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {HOW_STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              style={{
                width: activeStep === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: activeStep === i ? step.color : '#ddd',
                transition: 'all 0.3s',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .how-timeline-wrap { height: auto !important; }
          .how-timeline-wrap > div:last-child { flex-direction: column !important; gap: 16px !important; }
          .timeline-line { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Section 2: Fee Comparison ────────────────────────────────────────────────

// ─── Section 2: Hospital-to-Hospital Comparison ───────────────────────────────

type HospitalData = {
  name: string; dept: string; fee1st: string; feeRe: string; rxDrug: string; waitMin: number; rating: number; badge?: string
}

const HOSPITALS: HospitalData[] = [
  { name: '톡닥 비대면', dept: '내과·피부과 외', fee1st: '6,500원~', feeRe: '4,200원~', rxDrug: '2,800원~', waitMin: 3, rating: 4.96, badge: '최저가' },
  { name: '서울 연세내과의원', dept: '내과', fee1st: '12,800원', feeRe: '8,400원', rxDrug: '4,200원', waitMin: 35, rating: 4.5 },
  { name: '강남 메디컬센터', dept: '내과·소아과', fee1st: '14,200원', feeRe: '9,600원', rxDrug: '5,100원', waitMin: 42, rating: 4.3 },
  { name: '홍대 스마트클리닉', dept: '내과·피부과', fee1st: '11,500원', feeRe: '7,800원', rxDrug: '3,900원', waitMin: 28, rating: 4.6 },
  { name: '잠실 종합병원 외래', dept: '내과', fee1st: '18,700원', feeRe: '12,300원', rxDrug: '6,400원', waitMin: 68, rating: 4.2 },
]

const COL_HEADERS = ['병원명', '초진 진료비', '재진 진료비', '인기약 처방비', '평균 대기', '평점']

function HospitalComparisonSection() {
  const { ref, visible } = useScrollReveal()
  const [hoverRow, setHoverRow] = useState<number | null>(null)
  const [sortCol, setSortCol] = useState<keyof HospitalData>('fee1st')

  const sorted = [...HOSPITALS].sort((a, b) => {
    if (sortCol === 'rating') return b.rating - a.rating
    if (sortCol === 'waitMin') return a.waitMin - b.waitMin
    const aVal = parseInt((a[sortCol] as string).replace(/[^0-9]/g, '')) || 0
    const bVal = parseInt((b[sortCol] as string).replace(/[^0-9]/g, '')) || 0
    return aVal - bVal
  })

  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '96px 24px' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        <SectionLabel>병원별 진료비 비교</SectionLabel>
        <SectionHeading>여러 병원의 진료비 & 약값을 한눈에 비교</SectionHeading>
        <SectionSubheading>건강보험 적용 후 실부담금 기준 · 항목 클릭 시 정렬됩니다</SectionSubheading>

        {/* Summary badges */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { label: '평균 절약', value: '최대 65%', color: '#00B894' },
            { label: '대기 단축', value: '평균 35분 → 3분', color: '#6C63FF' },
            { label: '건강보험', value: '동일 적용', color: '#FFD200', dark: true },
          ].map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 10, padding: '10px 16px', border: `1.5px solid ${b.color}22`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: 13, color: '#636E72' }}>{b.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: b.dark ? '#2D3436' : b.color }}>{b.value}</span>
            </div>
          ))}
        </div>

        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.07)', border: '1px solid rgba(0,184,148,0.1)' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: '#2D3436' }} className="hosp-grid">
            {COL_HEADERS.map((h, i) => {
              const colKey = (['name', 'fee1st', 'feeRe', 'rxDrug', 'waitMin', 'rating'] as (keyof HospitalData)[])[i]
              const active = sortCol === colKey && i > 0
              return (
                <div
                  key={h}
                  onClick={() => i > 0 && setSortCol(colKey)}
                  style={{
                    padding: '15px 18px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: active ? '#FFD200' : i === 0 ? '#9ba3a7' : '#fff',
                    cursor: i > 0 ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    transition: 'color 0.15s',
                    userSelect: 'none',
                  }}
                >
                  {h}
                  {i > 0 && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: active ? 1 : 0.35 }}>
                      <path d="M5 2v6M2 5l3-3 3 3" stroke={active ? '#FFD200' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>

          {/* Rows */}
          {sorted.map((h, i) => {
            const isTalkdoc = h.badge === '최저가'
            return (
              <div
                key={h.name}
                onMouseEnter={() => setHoverRow(i)}
                onMouseLeave={() => setHoverRow(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                  backgroundColor: isTalkdoc ? (hoverRow === i ? '#d6f5ed' : '#E8F8F5') : hoverRow === i ? '#f8fffe' : i % 2 === 0 ? '#fff' : '#fafcfc',
                  borderTop: '1px solid #f0f5f4',
                  transition: 'background 0.15s',
                }}
                className="hosp-grid"
              >
                {/* Hospital name */}
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: isTalkdoc ? '#00B894' : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                    {isTalkdoc ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2.5C9 2.5 6 2.5 6 5.5C6 7.25 7.25 8.5 9 9.5C10.75 8.5 12 7.25 12 5.5C12 2.5 9 2.5 9 2.5Z" fill="white" opacity="0.9"/><circle cx="9" cy="13" r="1.5" fill="white"/></svg> : '🏥'}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{h.name}</span>
                      {h.badge && <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', backgroundColor: '#00B894', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.3px' }}>{h.badge}</span>}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#636E72', marginTop: 2 }}>{h.dept}</div>
                  </div>
                </div>
                {/* Fee cols */}
                {[h.fee1st, h.feeRe, h.rxDrug].map((val, ci) => (
                  <div key={ci} style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4' }}>
                    <span style={{ fontSize: 14, fontWeight: isTalkdoc ? 800 : 500, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{val}</span>
                  </div>
                ))}
                {/* Wait */}
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (h.waitMin / 70) * 100)}%`, height: '100%', backgroundColor: isTalkdoc ? '#00B894' : h.waitMin > 50 ? '#FF6B6B' : '#FFD200', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: isTalkdoc ? '#00B894' : '#2D3436' }}>{h.waitMin}분</span>
                  </div>
                </div>
                {/* Rating */}
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #f0f5f4', gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{h.rating.toFixed(2)}</span>
                </div>
              </div>
            )
          })}

          {/* Footer */}
          <div style={{ padding: '13px 20px', backgroundColor: '#E8F8F5', borderTop: '1px solid rgba(0,184,148,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11.5, color: '#636E72' }}>* 건강보험 적용 후 실부담금 기준 · 병원 및 진료과에 따라 상이 · 2025년 건강보험심사평가원 데이터 참조</span>
            <a href="#" style={{ fontSize: 12, fontWeight: 700, color: '#00B894', textDecoration: 'none', whiteSpace: 'nowrap' }}>전체 병원 비교 보기 →</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 780px) {
          .hosp-grid { grid-template-columns: 1.5fr 1fr 1fr !important; }
          .hosp-grid > div:nth-child(n+5) { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Section 3: Live Doctors ──────────────────────────────────────────────────

const DEPT_COLORS: Record<string, string> = {
  '내과': '#00B894', '피부과': '#FF6B9D', '소아청소년과': '#6C63FF',
  '정신건강의학과': '#845EF7', '산부인과': '#F06595', '가정의학과': '#20C997',
  '이비인후과': '#FFA94D', '정형외과': '#339AF0',
}

// ─── Section 3: Live Doctors Swiper ──────────────────────────────────────────

const SWIPER_DOCTORS = [
  { name: '김지수', dept: '내과', hospital: '서울아산병원 출신', rating: 4.97, reviews: 1284, exp: '15년', specialty: '감기·발열·소화기', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&auto=format', color: '#00B894' },
  { name: '박성민', dept: '피부과', hospital: '연세세브란스 출신', rating: 4.95, reviews: 986, exp: '11년', specialty: '여드름·탈모·아토피', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&auto=format', color: '#FF6B9D' },
  { name: '이수진', dept: '소아청소년과', hospital: '서울대병원 출신', rating: 4.98, reviews: 2103, exp: '13년', specialty: '소아발열·성장·예방', photo: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=120&h=120&fit=crop&auto=format', color: '#6C63FF' },
  { name: '최재원', dept: '정신건강의학과', hospital: '삼성서울병원 출신', rating: 4.93, reviews: 741, exp: '9년', specialty: '불안·수면장애·우울', photo: 'https://images.unsplash.com/photo-1645066928295-2506defde470?w=120&h=120&fit=crop&auto=format', color: '#845EF7' },
  { name: '정유나', dept: '산부인과', hospital: '강남세브란스 출신', rating: 4.96, reviews: 1458, exp: '12년', specialty: '갱년기·호르몬·여성건강', photo: 'https://images.unsplash.com/photo-1706565029539-d09af5896340?w=120&h=120&fit=crop&auto=format', color: '#F06595' },
  { name: '한동현', dept: '가정의학과', hospital: '분당서울대병원 출신', rating: 4.91, reviews: 623, exp: '8년', specialty: '비만·만성피로·건강검진', photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop&auto=format', color: '#20C997' },
  { name: '오지현', dept: '이비인후과', hospital: '아주대학교병원 출신', rating: 4.94, reviews: 892, exp: '10년', specialty: '중이염·코막힘·인후통', photo: 'https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=120&h=120&fit=crop&auto=format', color: '#FFA94D' },
  { name: '강민준', dept: '정형외과', hospital: '국립중앙의료원 출신', rating: 4.89, reviews: 544, exp: '11년', specialty: '근골격·관절·척추상담', photo: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=120&h=120&fit=crop&auto=format', color: '#339AF0' },
]

const CARD_W = 248
const CARD_GAP = 18

function LiveDoctorsSwiper() {
  const { ref, visible } = useScrollReveal()
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Duplicate for infinite loop
  const items = [...SWIPER_DOCTORS, ...SWIPER_DOCTORS]
  const total = SWIPER_DOCTORS.length
  const step = CARD_W + CARD_GAP

  const advance = useCallback(() => {
    setOffset((prev) => {
      const next = prev + 1
      return next >= total ? 0 : next
    })
    setActiveIdx((prev) => (prev + 1) % total)
  }, [total])

  useEffect(() => {
    if (paused) return
    tickRef.current = setInterval(advance, 2200)
    return () => { if (tickRef.current) clearInterval(tickRef.current) }
  }, [paused, advance])

  const goTo = (i: number) => {
    setOffset(i)
    setActiveIdx(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 4000)
  }

  return (
    <section style={{ backgroundColor: '#fff', padding: '96px 0' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 36 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionLabel>실시간 진료</SectionLabel>
            <SectionHeading>지금 바로 진료 가능한 전문 의사</SectionHeading>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => goTo((activeIdx - 1 + total) % total)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #e0ecea', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => goTo((activeIdx + 1) % total)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #00B894', background: '#E8F8F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#00B894" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a href="#" style={{ fontSize: 14, fontWeight: 600, color: '#00B894', textDecoration: 'none', whiteSpace: 'nowrap' }}>전체 의사 보기 →</a>
          </div>
        </div>
      </div>

      {/* Swiper track — overflow visible so hover lift isn't clipped */}
      <div
        style={{ overflowX: 'clip', overflowY: 'visible', paddingLeft: 'max(24px, calc((100vw - 1200px)/2 + 24px))', paddingTop: 12, paddingBottom: 12 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: 'flex',
            gap: CARD_GAP,
            transform: `translateX(-${offset * step}px)`,
            transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'transform',
          }}
        >
          {items.map((doc, i) => (
            <SwiperDoctorCard key={`${doc.name}-${i}`} doc={doc} active={i % total === activeIdx} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
        {SWIPER_DOCTORS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{ width: activeIdx === i ? 20 : 7, height: 7, borderRadius: 4, border: 'none', background: activeIdx === i ? '#00B894' : '#ddd', transition: 'all 0.3s', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>
    </section>
  )
}

function SwiperDoctorCard({ doc, active }: { doc: typeof SWIPER_DOCTORS[0]; active: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isActive = active || hovered
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: CARD_W,
        backgroundColor: '#fff',
        borderRadius: 20,
        border: `1.5px solid ${isActive ? doc.color : '#eef4f2'}`,
        padding: '22px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'all 0.25s ease',
        boxShadow: isActive ? `0 12px 40px ${doc.color}28` : '0 2px 12px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Photo + status dot */}
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <img
          src={doc.photo}
          alt={`${doc.name} 원장`}
          style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: `2.5px solid ${doc.color}44`, display: 'block', backgroundColor: '#E8F8F5' }}
        />
        <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: '50%', backgroundColor: '#00B894', border: '2.5px solid #fff', boxShadow: '0 0 0 2px rgba(0,184,148,0.3)' }} />
      </div>

      {/* Name + Hospital */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#2D3436' }}>{doc.name} 원장</span>
        </div>
        <div style={{ fontSize: 12, color: '#636E72', marginBottom: 8 }}>{doc.hospital}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: doc.color, padding: '3px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>{doc.dept}</span>
          <span style={{ fontSize: 11, color: '#636E72', whiteSpace: 'nowrap' }}>경력 {doc.exp}</span>
        </div>
      </div>

      {/* Specialty */}
      <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.55 }}>{doc.specialty}</div>

      {/* Rating + LIVE badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{doc.rating}</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>({doc.reviews.toLocaleString()})</span>
        </div>
        {/* Fixed badge: nowrap, single line */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 700, color: '#00B894', backgroundColor: '#E8F8F5', padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#00B894', display: 'inline-block', flexShrink: 0 }} />
          실시간 진료 가능
        </span>
      </div>

      <button
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: 11,
          border: 'none',
          backgroundColor: isActive ? doc.color : '#F4F9F8',
          color: isActive ? '#fff' : doc.color,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '-0.2px',
        }}
      >
        바로 예약
      </button>
    </div>
  )
}

// ─── Section 4: Reviews ───────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: '이*영',
    tag: '#야간소아과',
    rating: 5,
    text: '새벽 2시에 아이가 고열이 났는데 바로 소아과 원장님과 연결됐어요. 처방전도 금방 나와서 정말 다행이었습니다. 톡닥 없었으면 응급실 갈 뻔 했어요.',
    date: '2025.07.12',
    dept: '소아청소년과',
  },
  {
    name: '박*준',
    tag: '#탈모약처방',
    rating: 5,
    text: '탈모 때문에 병원 가기 창피했는데 집에서 편하게 진료받고 처방전 받았어요. 의사 선생님도 친절하시고 설명도 자세해서 매우 만족합니다.',
    date: '2025.07.28',
    dept: '피부과',
  },
  {
    name: '김*희',
    tag: '#감기처방',
    rating: 5,
    text: '회사 점심시간에 10분 만에 진료 끝내고 처방전 받았어요. 병원 가면 최소 1시간인데 톡닥은 정말 빠르고 간편합니다. 강력 추천!',
    date: '2025.08.03',
    dept: '내과',
  },
  {
    name: '최*민',
    tag: '#수면장애상담',
    rating: 4,
    text: '수면 문제로 오래 고민했는데 정신건강의학과 상담을 이렇게 쉽게 받을 수 있다니 놀랐어요. 선생님이 매우 전문적이고 공감해주셨습니다.',
    date: '2025.07.19',
    dept: '정신건강의학과',
  },
  {
    name: '정*은',
    tag: '#갱년기상담',
    rating: 5,
    text: '갱년기 증상으로 힘들었는데 여성 전문의 선생님께 편하게 상담받았어요. 비대면이라 더 솔직하게 얘기할 수 있었고 처방도 빠르게 나왔어요.',
    date: '2025.08.01',
    dept: '산부인과',
  },
  {
    name: '한*진',
    tag: '#다이어트처방',
    rating: 5,
    text: '비만 클리닉 가려면 예약도 어렵고 비용도 비쌌는데, 톡닥에서 합리적인 가격에 전문 상담 받고 처방받았어요. 앞으로도 계속 이용할게요!',
    date: '2025.07.30',
    dept: '가정의학과',
  },
]

// ─── Floating AI Button ───────────────────────────────────────────────────────

function FloatingAIButton() {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {/* Chat bubble */}
      {open && (
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '16px 18px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid #E8F8F5', width: 220, animation: 'slideInUp 0.25s ease' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436', marginBottom: 8 }}>AI 증상 분석</div>
          <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.6, marginBottom: 12 }}>증상을 입력하면 즉시 맞춤 진료과를 추천해 드립니다.</div>
          <div style={{ background: '#F4F9F8', borderRadius: 10, padding: '8px 12px', display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 11, color: '#aaa', flex: 1 }}>증상을 입력하세요...</span>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      )}

      {/* Main button */}
      <div style={{ position: 'relative' }}>
        {/* Ripple ring */}
        {!open && (
          <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(255,210,0,0.4)', animation: 'ripple 2s ease-out infinite', pointerEvents: 'none' }} />
        )}
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#FFD200',
            boxShadow: hovered ? '0 8px 28px rgba(255,210,0,0.6)' : '0 4px 18px rgba(255,210,0,0.45)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: open ? 'none' : 'floatBob 3s ease-in-out infinite',
            transition: 'box-shadow 0.2s, transform 0.2s',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          aria-label="AI 상담 열기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="14" rx="4" fill="#2D3436" opacity="0.15"/>
            <rect x="3" y="5" width="18" height="12" rx="3" stroke="#2D3436" strokeWidth="1.6"/>
            <circle cx="8" cy="11" r="1.2" fill="#2D3436"/>
            <circle cx="12" cy="11" r="1.2" fill="#2D3436"/>
            <circle cx="16" cy="11" r="1.2" fill="#2D3436"/>
            <path d="M8 17l2 3h4l2-3" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Section 4: Reviews ───────────────────────────────────────────────────────

function ReviewsSection() {
  const { ref, visible } = useScrollReveal()
  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '88px 24px' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>환자 후기</SectionLabel>
          <SectionHeading>톡닥을 경험한 환자들의 생생한 후기</SectionHeading>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 13 13" fill="#FFD200">
                  <path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2D3436' }}>4.96</span>
            <span style={{ fontSize: 14, color: '#636E72' }}>· 전체 리뷰 38,492개</span>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
          className="reviews-grid"
        >
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name + r.tag} review={r} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const color = DEPT_COLORS[review.dept] ?? '#00B894'
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        border: '1px solid #eef4f2',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Stars + Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[...Array(review.rating)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 13 13" fill="#FFD200">
              <path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z" />
            </svg>
          ))}
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: color,
            backgroundColor: `${color}18`,
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          {review.tag}
        </span>
      </div>

      {/* Review text */}
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: '#2D3436',
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        "{review.text}"
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f5f4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              backgroundColor: `${color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: color,
            }}
          >
            {review.name[0]}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#2D3436' }}>{review.name}</div>
            <div style={{ fontSize: 11, color: '#636E72' }}>{review.date}</div>
          </div>
        </div>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: '#00B894',
            backgroundColor: '#E8F8F5',
            padding: '3px 8px',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" stroke="#00B894" strokeWidth="1" />
            <path d="M3 5l1.5 1.5L7 3.5" stroke="#00B894" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          인증 환자
        </span>
      </div>
    </div>
  )
}

// ─── Section 5: Prescription & Delivery ──────────────────────────────────────

function PrescriptionSection() {
  const { ref, visible } = useScrollReveal()
  return (
    <section style={{ backgroundColor: '#fff', padding: '88px 24px' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 1000, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>약 수령 안내</SectionLabel>
          <SectionHeading>처방약, 원하는 방식으로 편하게 수령하세요</SectionHeading>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
          className="pickup-grid"
        >
          <PickupCard
            title="근처 약국 방문 수령"
            desc="진료 후 처방전이 지정 약국으로 즉시 전송됩니다. 약국에 방문하면 바로 수령 가능합니다."
            detail="처방전 전송 후 평균 10분 이내 조제 완료"
            highlight="즉시 전송"
            bg="#E8F8F5"
            accent="#00B894"
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="16" r="9" stroke="#00B894" strokeWidth="2" />
                <circle cx="18" cy="16" r="3" fill="#00B894" />
                <path d="M18 25v8" stroke="#00B894" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 31h12" stroke="#00B894" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
          <PickupCard
            title="안심 퀵 배송 / 택배 배송"
            desc="외출이 어려우신가요? 처방약을 집 앞까지 안전하게 배송해 드립니다."
            detail="퀵 배송 1~3시간 / 일반 택배 1~2일 이내"
            highlight="당일 배송"
            bg="linear-gradient(135deg, #FFF9E0 0%, #FFFBF0 100%)"
            accent="#FFD200"
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="3" y="12" width="24" height="16" rx="3" stroke="#2D3436" strokeWidth="2" />
                <path d="M27 16h3l3 6v6h-6V16Z" stroke="#2D3436" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="9" cy="30" r="3" fill="#FFD200" stroke="#2D3436" strokeWidth="1.5" />
                <circle cx="27" cy="30" r="3" fill="#FFD200" stroke="#2D3436" strokeWidth="1.5" />
                <path d="M9 12V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" stroke="#2D3436" strokeWidth="2" />
              </svg>
            }
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pickup-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function PickupCard({
  title, desc, detail, highlight, bg, accent, icon,
}: {
  title: string; desc: string; detail: string; highlight: string
  bg: string; accent: string; icon: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: 20,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        border: `1.5px solid ${hovered ? accent : 'transparent'}`,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? `0 8px 32px ${accent}28` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: accent === '#FFD200' ? '#2D3436' : '#fff',
            backgroundColor: accent,
            padding: '5px 12px',
            borderRadius: 20,
            letterSpacing: '0.3px',
          }}
        >
          {highlight}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#2D3436', marginBottom: 10, letterSpacing: '-0.3px' }}>
          {title}
        </div>
        <div style={{ fontSize: 14, color: '#636E72', lineHeight: 1.65 }}>{desc}</div>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: accent === '#FFD200' ? '#2D3436' : accent,
          backgroundColor: '#fff',
          padding: '10px 16px',
          borderRadius: 10,
          display: 'inline-block',
        }}
      >
        {detail}
      </div>
    </div>
  )
}

// ─── Section 6: FAQ ───────────────────────────────────────────────────────────

const FAQS = [
  {
    q: '비대면 진료도 건강보험 적용이 되나요?',
    a: '네, 톡닥의 비대면 진료는 건강보험이 적용됩니다. 2023년 비대면 진료 법제화 이후 대부분의 진료과에서 일반 대면 진료와 동일한 건강보험 수가가 적용되어 본인부담금을 크게 줄일 수 있습니다. 다만 일부 미용·성형 등 비급여 항목은 제외될 수 있습니다.',
  },
  {
    q: '야간이나 주말에도 진료를 받을 수 있나요?',
    a: '가능합니다. 톡닥에는 야간·주말 진료가 가능한 의사가 24시간 대기 중입니다. 평일 야간(18시~익일 9시) 및 주말·공휴일에도 내과, 소아청소년과, 피부과 등 주요 진료과에서 실시간 진료를 받으실 수 있습니다.',
  },
  {
    q: '처방전은 지정한 약국으로 바로 발송되나요?',
    a: '네. 진료 완료 즉시 처방전이 전자 형태로 지정하신 약국에 자동 전송됩니다. 앱에서 근처 약국을 검색하거나 자주 이용하는 약국을 즐겨찾기로 등록해두면 더욱 빠르게 처리됩니다. 배송을 선택하신 경우 약국과 제휴된 배송 서비스를 통해 집으로 배송됩니다.',
  },
  {
    q: '진료 기록과 개인정보는 안전하게 관리되나요?',
    a: '톡닥은 의료법 및 개인정보보호법에 따라 모든 진료 기록과 개인정보를 암호화하여 보관합니다. 서버는 국내 의료 기관 수준의 보안 인프라를 사용하며, 진료 기록은 법정 보존 기간 동안 안전하게 관리되고 제3자에게 제공되지 않습니다.',
  },
  {
    q: '처음 이용하는데 가입 절차가 복잡하지 않나요?',
    a: '매우 간단합니다. 카카오, 네이버, 애플 계정으로 소셜 로그인 후 휴대폰 본인 인증만 완료하면 바로 이용 가능합니다. 최초 가입 후 진료 예약까지 평균 2분 이내로 완료됩니다.',
  },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, visible } = useScrollReveal()
  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '88px 24px 100px' }}>
      <div
        ref={ref}
        className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`}
        style={{ maxWidth: 780, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading>자주 묻는 질문</SectionHeading>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 48,
            backgroundColor: '#2D3436',
            borderRadius: 20,
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.4px' }}>
              지금 바로 비대면 진료를 시작해 보세요
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              가입 후 첫 진료 50% 할인 · 처방 배송비 무료
            </div>
          </div>
          <button
            style={{
              padding: '14px 28px',
              borderRadius: 12,
              border: 'none',
              backgroundColor: '#00B894',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,184,148,0.4)',
            }}
          >
            무료로 시작하기 →
          </button>
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  faq, isOpen, onToggle,
}: {
  faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 14,
        border: `1.5px solid ${isOpen ? '#00B894' : '#eef4f2'}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: '#fff',
              backgroundColor: '#00B894',
              width: 22,
              height: 22,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            Q
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#2D3436', lineHeight: 1.45 }}>
            {faq.q}
          </span>
        </div>
        <div
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: 8,
            backgroundColor: isOpen ? '#E8F8F5' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.18s',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s' }}
          >
            <path d="M3 5l4 4 4-4" stroke={isOpen ? '#00B894' : '#636E72'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div
          style={{
            padding: '0 24px 20px 60px',
            fontSize: 14,
            color: '#636E72',
            lineHeight: 1.75,
            borderTop: '1px solid #f0f5f4',
            paddingTop: 16,
          }}
        >
          {faq.a}
        </div>
      )}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function SiteFooter() {
  const cols = [
    {
      heading: '서비스',
      links: ['증상별 진료', '의사 찾기', '진료 예약', '내 예약 현황', '처방전 확인'],
    },
    {
      heading: '진료과',
      links: ['내과', '피부과', '소아청소년과', '정신건강의학과', '가정의학과'],
    },
    {
      heading: '고객지원',
      links: ['공지사항', '자주 묻는 질문', '이용 가이드', '1:1 문의', '의사 등록 문의'],
    },
    {
      heading: '회사',
      links: ['회사 소개', '채용', '파트너십', '언론 보도', '의료진 파트너'],
    },
  ]

  return (
    <footer style={{ backgroundColor: '#1a1f2e', color: '#fff' }}>
      {/* App download strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="16" r="2" fill="white" opacity="0.9"/>
                <circle cx="10" cy="12" r="1" fill="white"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>톡닥 앱 다운로드</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>더 빠르고 편리한 비대면 진료</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'App Store', sub: 'iPhone & iPad' },
              { label: 'Google Play', sub: 'Android' },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', backgroundColor: 'rgba(255,255,255,0.05)', transition: 'background 0.16s' }}
              >
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>{s.sub}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 2 }}>{s.label}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 24px 40px', display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)', gap: 40 }} className="footer-grid">
        {/* Brand column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C10 3 6 3 6 7C6 9.5 7.5 11 10 12C12.5 11 14 9.5 14 7C14 3 10 3 10 3Z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="16" r="2" fill="white" opacity="0.9"/>
              </svg>
              <div style={{ position: 'absolute', top: -3, right: -3, width: 9, height: 9, borderRadius: '50%', backgroundColor: '#FFD200', border: '2px solid #1a1f2e' }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              톡닥<span style={{ color: '#00B894' }}>.</span>
            </span>
          </a>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 220 }}>
            언제 어디서나 빠르고 안전한 AI 비대면 진료 서비스. 건강보험 적용으로 합리적인 진료를 경험하세요.
          </p>
          {/* Social links */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['카카오톡', '인스타그램', '유튜브'].map((s) => (
              <a key={s} href="#" style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: 7, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>
                {s}
              </a>
            ))}
          </div>
          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['의료법 준수', 'ISO 27001', 'KISA 인증'].map((b) => (
              <span key={b} style={{ fontSize: 10, fontWeight: 700, color: '#00B894', backgroundColor: 'rgba(0,184,148,0.1)', padding: '4px 9px', borderRadius: 5, border: '1px solid rgba(0,184,148,0.2)', letterSpacing: '0.2px' }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#00B894', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 4 }}>
              {col.heading}
            </div>
            {col.links.map((link) => (
              <a key={link} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s', lineHeight: 1 }}>
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
            <div>주식회사 톡닥 · 대표이사 홍길동 · 사업자등록번호 123-45-67890</div>
            <div>서울특별시 강남구 테헤란로 152, 강남파이낸스센터 25층 · 의료기관 개설신고번호 제2024-강남-0001호</div>
            <div style={{ marginTop: 4 }}>© 2025 TalkDoc Inc. All rights reserved.</div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['이용약관', '개인정보처리방침', '의료법 고지'].map((t, i) => (
              <a key={t} href="#" style={{ fontSize: 12, color: i === 1 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)', textDecoration: 'none', fontWeight: i === 1 ? 600 : 400 }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
