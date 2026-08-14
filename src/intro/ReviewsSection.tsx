import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { REVIEWS } from '../data/homeData'
import { ReviewCard } from '../intro/ReviewCard'
export function ReviewsSection() {
  const { ref, visible } = useScrollReveal()
  return (
    <section style={{ backgroundColor: '#F4F9F8', padding: '88px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''}`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel>환자 후기</SectionLabel>
          <SectionHeading>톡닥을 경험한 환자들의 생생한 후기</SectionHeading>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 2 }}>{[...Array(5)].map((_, i) => <svg key={i} width="18" height="18" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg>)}</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2D3436' }}>4.96</span>
            <span style={{ fontSize: 14, color: '#636E72' }}>· 전체 리뷰 38,492개</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="reviews-grid">
          {REVIEWS.map((r) => <ReviewCard key={r.name + r.tag} review={r} />)}
        </div>
      </div>
      <style>{`@media(max-width:900px){.reviews-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:560px){.reviews-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}