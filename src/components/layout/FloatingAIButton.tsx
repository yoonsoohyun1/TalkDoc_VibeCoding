import { useState } from 'react'
import { useNavigate } from 'react-router'
import { MessageCircleQuestion } from 'lucide-react'

export function FloatingAIButton() {
  const [h, setH] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleNav = (path: string) => { navigate(path); setOpen(false) }

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '20px 18px', boxShadow: '0 8px 40px rgba(0,0,0,0.13)', border: '1px solid #E8F8F5', width: 240, animation: 'slideInUp 0.25s ease' }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#2D3436', marginBottom: 4 }}>🤖 AI 증상 분석</div>
            <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.6, marginBottom: 10 }}>증상을 입력하면 즉시 맞춤 진료과를 추천해 드립니다.</div>
            <button onClick={() => handleNav('/symptom')} style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>AI 챗봇 시작하기 →</button>
          </div>
          <div style={{ height: 1, backgroundColor: '#f0f5f4', margin: '4px 0 14px' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#2D3436', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageCircleQuestion size={14} color="#b8960a" strokeWidth={2.5} />
              실시간 질문 1:1
            </div>
            <div style={{ fontSize: 12, color: '#636E72', lineHeight: 1.6, marginBottom: 10 }}>전문의에게 직접 궁금한 점을 물어보세요.</div>
            <button onClick={() => handleNav('/community')} style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1.5px solid rgba(255,210,0,0.4)', backgroundColor: '#FFF9E0', color: '#2D3436', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>질문하러 가기 →</button>
          </div>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        {!open && <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(255,210,0,0.4)', animation: 'ripple 2s ease-out infinite', pointerEvents: 'none' }} />}
        <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => setOpen((o) => !o)}
          style={{ width: 58, height: 58, borderRadius: '50%', border: 'none', backgroundColor: '#FFD200', boxShadow: h ? '0 8px 28px rgba(255,210,0,0.6)' : '0 4px 18px rgba(255,210,0,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: open ? 'none' : 'floatBob 3s ease-in-out infinite', transition: 'box-shadow 0.2s,transform 0.2s', transform: h ? 'scale(1.08)' : 'scale(1)' }}
          aria-label="AI 상담 열기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="3" stroke="#2D3436" strokeWidth="1.6"/><circle cx="8" cy="11" r="1.2" fill="#2D3436"/><circle cx="12" cy="11" r="1.2" fill="#2D3436"/><circle cx="16" cy="11" r="1.2" fill="#2D3436"/><path d="M8 17l2 3h4l2-3" stroke="#2D3436" strokeWidth="1.5" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}
