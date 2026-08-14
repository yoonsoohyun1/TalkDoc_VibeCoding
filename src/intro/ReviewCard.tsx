import { REVIEWS } from '../data/homeData'
import { DEPT_COLORS } from '../data/doctorData'
export function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const color = DEPT_COLORS[review.dept] ?? '#00B894'
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column', gap: 14, border: '1px solid #eef4f2', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 2 }}>{[...Array(review.rating)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 13 13" fill="#FFD200"><path d="M6.5 1l1.545 3.09L11.5 4.635l-2.5 2.42.59 3.41L6.5 8.77l-3.09 1.695.59-3.41-2.5-2.42 3.455-.545L6.5 1z"/></svg>)}</div>
        <span style={{ fontSize: 11, fontWeight: 700, color, backgroundColor: `${color}18`, padding: '3px 10px', borderRadius: 20 }}>{review.tag}</span>
      </div>
      <p style={{ margin: 0, fontSize: 14, color: '#2D3436', lineHeight: 1.7, flex: 1 }}>"{review.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #f0f5f4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color }}>{review.name[0]}</div>
          <div><div style={{ fontSize: 13, fontWeight: 600, color: '#2D3436' }}>{review.name}</div><div style={{ fontSize: 11, color: '#636E72' }}>{review.date}</div></div>
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: '#00B894', backgroundColor: '#E8F8F5', padding: '3px 8px', borderRadius: 5 }}>인증 환자</span>
      </div>
    </div>
  )
}