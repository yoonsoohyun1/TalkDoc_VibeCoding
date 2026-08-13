import { useState, useRef, useCallback } from 'react'

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
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <HeroSection />
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
