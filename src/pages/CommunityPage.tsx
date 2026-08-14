import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageHero } from '../components/ui/SharedUI'
import { QA_POSTS } from '../data/pageData'
import { SWIPER_DOCTORS } from '../data/doctorData'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('전체')
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent')
  const navigate = useNavigate()
  const tabs = ['전체', '내과', '피부과', '소아청소년과', '정신건강의학과', '이비인후과']
  const filtered = QA_POSTS.filter((p) => activeTab === '전체' || p.tags.includes(activeTab))
    .sort((a, b) => sortBy === 'helpful' ? b.helpful - a.helpful : b.id - a.id)
  return (
    <div>
      <PageHero label="실시간 질문" title="전문의에게 직접 물어보세요" subtitle="궁금한 증상이나 건강 고민을 올리면 해당 분야 전문의가 직접 답변해 드립니다." gradient="linear-gradient(135deg,#FF6B6B 0%,#ee5a5a 100%)" />
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f5f4', padding: '0 24px', position: 'sticky', top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: 0 }}>
            {tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '16px 18px', fontSize: 14, fontWeight: activeTab === tab ? 700 : 500, color: activeTab === tab ? '#FF6B6B' : '#636E72', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid #FF6B6B' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s' }}>{tab}</button>)}
          </div>
          <button onClick={() => navigate('/symptom')} style={{ padding: '10px 20px', borderRadius: 10, border: 'none', backgroundColor: '#FF6B6B', color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>+ 질문하기</button>
        </div>
      </section>
      <section style={{ backgroundColor: '#F4F9F8', padding: '32px 24px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }} className="qa-layout">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: '#636E72' }}><strong style={{ color: '#2D3436' }}>{filtered.length}개</strong>의 질문</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ key: 'recent', label: '최신순' }, { key: 'helpful', label: '도움순' }].map((s) => <button key={s.key} onClick={() => setSortBy(s.key as 'recent' | 'helpful')} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${sortBy === s.key ? '#FF6B6B' : '#e0ecea'}`, backgroundColor: sortBy === s.key ? '#fff0f0' : '#fff', color: sortBy === s.key ? '#FF6B6B' : '#636E72', fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>{s.label}</button>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map((post) => (
                <div key={post.id} style={{ backgroundColor: '#fff', borderRadius: 18, border: '1px solid #eef4f2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      {post.tags.map((tag) => <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: '#636E72', backgroundColor: '#f5f5f5', padding: '3px 9px', borderRadius: 20 }}>#{tag}</span>)}
                      <span style={{ fontSize: 11, fontWeight: 700, color: post.answered ? '#00B894' : '#FF6B6B', backgroundColor: post.answered ? '#E8F8F5' : '#fff0f0', padding: '3px 9px', borderRadius: 20 }}>{post.answered ? '답변 완료' : '답변 대기 중'}</span>
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 600, color: '#2D3436', lineHeight: 1.5 }}>{post.question}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#aaa' }}>
                      <span>{post.asker} · {post.date}</span><span>조회 {post.views}</span><span>도움됨 {post.helpful}</span>
                    </div>
                  </div>
                  {post.answered && (
                    <div style={{ padding: '16px 22px', backgroundColor: '#F9FDFC', borderTop: '1px solid #E8F8F5' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <img src={post.doctorPhoto} alt={post.doctorName} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }} />
                        <div><div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436' }}>{post.doctorName}</div><div style={{ fontSize: 11, color: '#00B894' }}>{post.doctorDept} 전문의</div></div>
                        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#00B894', backgroundColor: '#E8F8F5', padding: '3px 10px', borderRadius: 20 }}>전문의 답변</div>
                      </div>
                      <p style={{ margin: '0 0 12px', fontSize: 13.5, color: '#2D3436', lineHeight: 1.7 }}>{post.answer}</p>
                      <button style={{ fontSize: 12.5, fontWeight: 600, color: '#00B894', backgroundColor: '#E8F8F5', padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>도움됐어요 {post.helpful}</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px', border: '1px solid #eef4f2' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436', marginBottom: 14 }}>실시간 현황</div>
              {[{ label: '오늘 질문', value: '128건', color: '#FF6B6B' }, { label: '답변 완료', value: '121건', color: '#00B894' }, { label: '평균 답변 시간', value: '23분', color: '#6C63FF' }].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: '#636E72' }}>{s.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px', border: '1px solid #eef4f2' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2D3436', marginBottom: 14 }}>답변 활동 TOP 의사</div>
              {SWIPER_DOCTORS.slice(0, 4).map((doc, i) => (
                <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: i < 3 ? '#FF6B6B' : '#aaa', width: 16 }}>{i + 1}</span>
                  <img src={doc.photo} alt={doc.name} style={{ width: 34, height: 34, borderRadius: 9, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, fontWeight: 700, color: '#2D3436' }}>{doc.name} 원장</div><div style={{ fontSize: 11, color: '#636E72' }}>{doc.dept}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:900px){.qa-layout{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
