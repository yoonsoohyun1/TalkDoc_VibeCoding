import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { PickupCard } from '../intro/PickupCard'
export function PrescriptionSection() {
  const { ref, visible } = useScrollReveal()
  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '88px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}><SectionLabel>약 수령 안내</SectionLabel><SectionHeading>처방약, 원하는 방식으로 편하게 수령하세요</SectionHeading></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="pickup-grid">
          <PickupCard title="근처 약국 방문 수령" desc="진료 후 처방전이 지정 약국으로 즉시 전송됩니다." detail="처방전 전송 후 평균 10분 이내 조제 완료" highlight="즉시 전송" bg="#E8F8F5" accent="#00B894" icon={<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="16" r="9" stroke="#00B894" strokeWidth="2"/><circle cx="18" cy="16" r="3" fill="#00B894"/><path d="M18 25v8" stroke="#00B894" strokeWidth="2" strokeLinecap="round"/><path d="M12 31h12" stroke="#00B894" strokeWidth="2" strokeLinecap="round"/></svg>} />
          <PickupCard title="안심 퀵 배송 / 택배 배송" desc="외출이 어려우신가요? 처방약을 집 앞까지 안전하게 배송해 드립니다." detail="퀵 배송 1~3시간 / 일반 택배 1~2일 이내" highlight="당일 배송" bg="linear-gradient(135deg,#FFF9E0 0%,#FFFBF0 100%)" accent="#FFD200" icon={<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="3" y="12" width="24" height="16" rx="3" stroke="#2D3436" strokeWidth="2"/><path d="M27 16h3l3 6v6h-6V16Z" stroke="#2D3436" strokeWidth="2" strokeLinejoin="round"/><circle cx="9" cy="30" r="3" fill="#FFD200" stroke="#2D3436" strokeWidth="1.5"/><circle cx="27" cy="30" r="3" fill="#FFD200" stroke="#2D3436" strokeWidth="1.5"/></svg>} />
        </div>
      </div>
      <style>{`@media(max-width:640px){.pickup-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}