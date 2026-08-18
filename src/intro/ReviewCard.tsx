import { REVIEWS } from '../data/homeData'
import { DEPT_TAG_STYLES } from '../data/doctorData'

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 13 13" fill={i < rating ? '#FFD200' : '#e0e0e0'}>
          <path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const tag = DEPT_TAG_STYLES[review.dept] ?? { bg: '#F4F9F8', text: '#00B894', border: 'rgba(0,184,148,0.2)' }

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid #eef4f2', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
      {/* Doctor header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src={review.doctorPhoto}
          alt={review.doctorName}
          style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover', border: `2px solid ${tag.border}`, flexShrink: 0, backgroundColor: tag.bg }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#2D3436', letterSpacing: '-0.3px' }}>{review.doctorName} 원장</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: tag.text, backgroundColor: tag.bg, border: `1px solid ${tag.border}`, padding: '2px 9px', borderRadius: 20 }}>{review.dept}</span>
          </div>
          <div style={{ fontSize: 12, color: '#636E72' }}>{review.doctorHospital}</div>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: '#f0f5f4' }} />

      <p style={{ margin: 0, fontSize: 13.5, color: '#2D3436', lineHeight: 1.75, flex: 1 }}>"{review.text}"</p>

      {/* Footer: reviewer + stars + tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: tag.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: tag.text }}>{review.name[0]}</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#2D3436' }}>{review.name}</div>
            <div style={{ fontSize: 11, color: '#aaa' }}>{review.date}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <StarRow rating={review.rating} />
          <span style={{ fontSize: 10.5, fontWeight: 600, color: '#00B894', backgroundColor: '#E8F8F5', padding: '2px 7px', borderRadius: 5 }}>#{review.tag}</span>
        </div>
      </div>
    </div>
  )
}
