import { FAQS } from '../data/homeData'
export function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ backgroundColor: '#F4F9F8', borderRadius: 14, border: `1.5px solid ${isOpen ? '#00B894' : '#eef4f2'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', backgroundColor: '#00B894', width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>Q</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#2D3436', lineHeight: 1.45 }}>{faq.q}</span>
        </div>
        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, backgroundColor: isOpen ? '#E8F8F5' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.18s' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s' }}><path d="M3 5l4 4 4-4" stroke={isOpen ? '#00B894' : '#636E72'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </button>
      {isOpen && <div style={{ padding: '0 24px 20px 60px', fontSize: 14, color: '#636E72', lineHeight: 1.75, borderTop: '1px solid #e8f0ee', paddingTop: 16 }}>{faq.a}</div>}
    </div>
  )
}