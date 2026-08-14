import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { FAQS } from '../data/homeData'
import { FAQItem } from '@/intro/FAQItem'

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, visible } = useScrollReveal()
  const navigate = useNavigate()
  return (
    <section style={{ backgroundColor: '#fff', padding: '88px 24px 100px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}><SectionLabel>FAQ</SectionLabel><SectionHeading>자주 묻는 질문</SectionHeading></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
        </div>
        <div style={{ marginTop: 48, backgroundColor: '#2D3436', borderRadius: 20, padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div><div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>지금 바로 비대면 진료를 시작해 보세요</div><div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>가입 후 첫 진료 50% 할인 · 처방 배송비 무료</div></div>
          <button onClick={() => navigate('/symptom')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,184,148,0.4)' }}>무료로 시작하기 →</button>
        </div>
      </div>
    </section>
  )
}