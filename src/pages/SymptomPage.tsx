import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChatMessage } from '../types'
import { PageHero } from '../components/ui/SharedUI'
import { INITIAL_SUGGESTIONS, getDeptRec } from '../data/symptomData'
import { SWIPER_DOCTORS, HOSPITAL_TYPES_DATA } from '../data/doctorData'

export function ChatBubble({ msg, onSuggestion }: { msg: ChatMessage; onSuggestion: (s: string) => void }) {
  const isBot = msg.role === 'bot'
  const deptDoctors = msg.showDoctors ? SWIPER_DOCTORS.filter((d) => {
    const t = HOSPITAL_TYPES_DATA[msg.dept ?? '']
    return t ? t.filter(d, 0) : true
  }).slice(0, 3) : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isBot ? 'flex-start' : 'flex-end', gap: 10 }}>
      {isBot && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="3" stroke="white" strokeWidth="1.8"/><circle cx="8" cy="11" r="1.4" fill="white"/><circle cx="12" cy="11" r="1.4" fill="white"/><circle cx="16" cy="11" r="1.4" fill="white"/></svg>
          </div>
          <div style={{ maxWidth: '75%' }}>
            <div style={{ backgroundColor: '#F4F9F8', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', border: '1px solid #eef4f2' }}>
              {msg.text.split('\n').map((line, i) => (
                <span key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1').split(/(\*\*.*?\*\*)/).map((part, j) =>
                  part.startsWith('**') ? <strong key={j} style={{ color: '#00B894' }}>{part.slice(2, -2)}</strong> : part
                )}{i < msg.text.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
            {/* Doctor recommendations */}
            {msg.showDoctors && deptDoctors.length > 0 && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
                {deptDoctors.map((doc) => (
                  <div key={doc.name} style={{ backgroundColor: '#fff', borderRadius: 14, padding: '12px 14px', border: '1px solid #eef4f2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={doc.photo} alt={doc.name} style={{ width: 44, height: 44, borderRadius: 11, objectFit: 'cover', border: `2px solid ${doc.color}44`, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{doc.name} 원장</div>
                      <div style={{ fontSize: 11.5, color: '#636E72' }}>{doc.dept} · 경력 {doc.exp}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}><svg width="11" height="11" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg><span style={{ fontSize: 11.5, fontWeight: 700, color: '#2D3436' }}>{doc.rating}</span></div>
                    </div>
                    <button style={{ padding: '7px 14px', borderRadius: 9, border: 'none', backgroundColor: doc.color, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>예약</button>
                  </div>
                ))}
              </div>
            )}
            {/* Suggestions */}
            {msg.suggestions && (
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {msg.suggestions.map((s) => (
                  <button key={s} onClick={() => onSuggestion(s)}
                    style={{ padding: '7px 14px', borderRadius: 100, border: '1.5px solid rgba(0,184,148,0.3)', backgroundColor: '#fff', color: '#00B894', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8F8F5' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff' }}
                  >{s}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {!isBot && (
        <div style={{ maxWidth: '75%', backgroundColor: '#00B894', borderRadius: '16px 4px 16px 16px', padding: '12px 16px' }}>
          <span style={{ fontSize: 14, color: '#fff', lineHeight: 1.5 }}>{msg.text}</span>
        </div>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="3" stroke="white" strokeWidth="1.8"/><circle cx="8" cy="11" r="1.4" fill="white"/><circle cx="12" cy="11" r="1.4" fill="white"/><circle cx="16" cy="11" r="1.4" fill="white"/></svg>
      </div>
      <div style={{ backgroundColor: '#F4F9F8', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', border: '1px solid #eef4f2', display: 'flex', gap: 5, alignItems: 'center' }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00B894', animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
      </div>
    </div>
  )
}

export default function SymptomPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: 'bot', text: '안녕하세요! 저는 톡닥 AI 어시스턴트입니다 👋\n어떤 증상이 있으신가요? 자유롭게 말씀해 주세요.', suggestions: INITIAL_SUGGESTIONS },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [stage, setStage] = useState(0)
  const [firstSymptom, setFirstSymptom] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || typing) return
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      let bot: ChatMessage

      if (stage === 0) {
        setFirstSymptom(text)
        setStage(1)
        bot = { id: Date.now() + 1, role: 'bot', text: `"${text}" 증상을 확인했습니다.\n언제부터 이 증상이 시작되었나요?`, suggestions: ['오늘 처음', '2~3일 전', '1주일 이상', '한 달 이상'] }
      } else if (stage === 1) {
        setStage(2)
        bot = { id: Date.now() + 1, role: 'bot', text: `알겠습니다. 다른 동반 증상이 있으신가요?\n여러 개를 선택하시거나 직접 입력해 주세요.`, suggestions: ['발열', '두통', '구역감·구토', '식욕 저하', '없음'] }
      } else if (stage === 2) {
        setStage(3)
        const rec = getDeptRec(firstSymptom)
        bot = {
          id: Date.now() + 1, role: 'bot',
          text: `📊 AI 분석이 완료됐습니다!\n\n말씀하신 "${firstSymptom}" 증상에는 **${rec.name}** 진료를 추천드립니다. 현재 진료 가능한 전문의들을 확인해 보세요.`,
          showDoctors: true, dept: rec.key,
        }
      } else {
        bot = { id: Date.now() + 1, role: 'bot', text: '추가로 궁금한 점이 있으시면 언제든 말씀해 주세요!\n아래에서 바로 의사를 예약하실 수 있습니다.', suggestions: ['처음부터 다시', '의사 찾기', '약국 찾기'] }
      }
      setMessages((prev) => [...prev, bot])
      inputRef.current?.focus()
    }, 900 + Math.random() * 700)
  }, [typing, stage, firstSymptom])

  const handleSuggestion = (s: string) => {
    if (s === '처음부터 다시') { setMessages([{ id: Date.now(), role: 'bot', text: '안녕하세요! 저는 톡닥 AI 어시스턴트입니다 👋\n어떤 증상이 있으신가요?', suggestions: INITIAL_SUGGESTIONS }]); setStage(0); setFirstSymptom(''); return }
    if (s === '의사 찾기') { navigate('/hospitals'); return }
    if (s === '약국 찾기') { navigate('/pharmacy'); return }
    sendMessage(s)
  }

  return (
    <div>
      <PageHero label="AI 증상 분석" title="AI와 대화하며 증상을 분석하세요" subtitle="자연어로 증상을 말씀해 주시면 AI가 즉시 분석해 최적의 진료과와 의사를 추천합니다." />

      <section style={{ backgroundColor: '#F4F9F8', padding: '40px 24px 64px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Chat window */}
          <div style={{ backgroundColor: '#fff', borderRadius: 24, border: '1px solid #eef4f2', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {/* Chat header */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid #f0f5f4', display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#fff' }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: '#00B894', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="3" stroke="white" strokeWidth="1.6"/><circle cx="8" cy="11" r="1.2" fill="white"/><circle cx="12" cy="11" r="1.2" fill="white"/><circle cx="16" cy="11" r="1.2" fill="white"/><path d="M8 17l2 3h4l2-3" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436' }}>톡닥 AI 어시스턴트</div>
                <div style={{ fontSize: 12, color: '#00B894', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00B894', display: 'inline-block' }} />
                  온라인 · 즉시 응답
                </div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11.5, color: '#636E72', backgroundColor: '#F4F9F8', padding: '4px 10px', borderRadius: 20 }}>AI 분석 무료</div>
            </div>

            {/* Messages */}
            <div style={{ height: 460, overflowY: 'auto', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {messages.map((msg) => <ChatBubble key={msg.id} msg={msg} onSuggestion={handleSuggestion} />)}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f5f4', backgroundColor: '#fafcfc', display: 'flex', gap: 10 }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
                placeholder="증상을 자유롭게 입력하세요... (Enter로 전송)"
                style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e0ecea', fontSize: 14, backgroundColor: '#fff', color: '#2D3436' }}
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
                style={{ padding: '12px 18px', borderRadius: 12, border: 'none', backgroundColor: input.trim() && !typing ? '#00B894' : '#e0ecea', color: input.trim() && !typing ? '#fff' : '#aaa', fontSize: 13, fontWeight: 700, cursor: input.trim() && !typing ? 'pointer' : 'not-allowed', transition: 'all 0.15s', flexShrink: 0 }}>
                전송
              </button>
            </div>
          </div>

          {/* Reset & help */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
            <button onClick={() => handleSuggestion('처음부터 다시')} style={{ fontSize: 13, color: '#636E72', background: 'none', border: '1px solid #e0ecea', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', backgroundColor: '#fff' }}>↺ 처음부터</button>
            <button onClick={() => navigate('/hospitals')} style={{ fontSize: 13, color: '#00B894', background: 'none', border: '1px solid rgba(0,184,148,0.3)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', backgroundColor: '#E8F8F5' }}>의사 바로 찾기 →</button>
          </div>
        </div>
      </section>
    </div>
  )
}
