import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageHero } from '../components/ui/SharedUI'
import { MY_APPOINTMENTS, STATUS_LABELS } from '../data/pageData'

export default function MyAppointmentsPage() {
  const [filter, setFilter] = useState('전체')
  const navigate = useNavigate()
  const filters = ['전체', '예약 확정', '진료 완료', '결제 대기']
  const filtered = MY_APPOINTMENTS.filter((a) => filter === '전체' || STATUS_LABELS[a.status]?.label === filter)

  return (
    <div>
      <PageHero label="내 예약 현황" title="나의 예약 내역" subtitle="예약하신 진료 일정과 처방 내역을 한눈에 확인하세요." gradient="linear-gradient(135deg,#2D3436 0%,#404a4c 100%)" />

      {/* Summary cards */}
      <section style={{ backgroundColor: '#fff', padding: '32px 24px', borderBottom: '1px solid #f0f5f4' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="apt-summary">
          {[{ label: '전체 예약', value: MY_APPOINTMENTS.length, color: '#2D3436', icon: '📋' }, { label: '예약 확정', value: MY_APPOINTMENTS.filter((a) => a.status === 'confirmed').length, color: '#00B894', icon: '✅' }, { label: '진료 완료', value: MY_APPOINTMENTS.filter((a) => a.status === 'completed').length, color: '#6C63FF', icon: '🩺' }, { label: '처방전 발행', value: MY_APPOINTMENTS.filter((a) => (a as {rx?: string}).rx).length, color: '#FFD200', icon: '💊' }].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#F4F9F8', borderRadius: 14, padding: '16px 20px', textAlign: 'center', border: '1px solid #eef4f2' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#636E72', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f5f4', padding: '0 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 0 }}>
          {filters.map((f) => <button key={f} onClick={() => setFilter(f)} style={{ padding: '14px 20px', fontSize: 14, fontWeight: filter === f ? 700 : 500, color: filter === f ? '#2D3436' : '#636E72', background: 'none', border: 'none', borderBottom: filter === f ? '2px solid #2D3436' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s' }}>{f}</button>)}
        </div>
      </section>

      {/* Appointment list */}
      <section style={{ backgroundColor: '#F4F9F8', padding: '32px 24px 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#636E72' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#2D3436', marginBottom: 8 }}>해당 예약이 없습니다</div>
              <button onClick={() => navigate('/symptom')} style={{ marginTop: 12, padding: '12px 24px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>새 진료 예약하기</button>
            </div>
          )}
          {filtered.map((apt) => {
            const st = STATUS_LABELS[apt.status]
            const aptWithRx = apt as typeof apt & { rx?: string }
            return (
              <div key={apt.id} style={{ backgroundColor: '#fff', borderRadius: 18, border: '1px solid #eef4f2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <img src={apt.photo} alt={apt.doctor} style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', border: `2px solid ${apt.color}44`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#2D3436' }}>{apt.doctor} 원장</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: apt.color, padding: '2px 8px', borderRadius: 6 }}>{apt.dept}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: st.color, backgroundColor: st.bg, padding: '2px 8px', borderRadius: 6 }}>{st.label}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#636E72', marginBottom: 6 }}>{apt.hospital} · {apt.type}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#2D3436' }}>📅 {apt.date} {apt.time}</span>
                      <span style={{ fontSize: 13, color: '#636E72' }}>진료비 {apt.fee}</span>
                      <div style={{ display: 'flex', gap: 4 }}>{apt.symptoms.map((s) => <span key={s} style={{ fontSize: 11, backgroundColor: '#F4F9F8', color: '#636E72', padding: '2px 8px', borderRadius: 20, border: '1px solid #e0ecea' }}>{s}</span>)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                    {apt.status === 'confirmed' && <button style={{ padding: '9px 18px', borderRadius: 10, border: 'none', backgroundColor: apt.color, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>진료 시작</button>}
                    {apt.status === 'completed' && <button style={{ padding: '9px 18px', borderRadius: 10, border: 'none', backgroundColor: '#6C63FF', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>리뷰 작성</button>}
                    {apt.status === 'pending' && <button style={{ padding: '9px 18px', borderRadius: 10, border: 'none', backgroundColor: '#FFD200', color: '#2D3436', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>결제하기</button>}
                    <button style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid #e0ecea', backgroundColor: '#fff', color: '#636E72', fontSize: 13, cursor: 'pointer' }}>상세보기</button>
                  </div>
                </div>
                {aptWithRx.rx && (
                  <div style={{ padding: '14px 24px', backgroundColor: '#F9FDFC', borderTop: '1px solid #E8F8F5', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#00B894' }}>💊 처방전</span>
                    <span style={{ fontSize: 13, color: '#2D3436' }}>{aptWithRx.rx}</span>
                    <button style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, border: 'none', backgroundColor: '#E8F8F5', color: '#00B894', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>처방전 보기</button>
                    <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>약국 전송</button>
                  </div>
                )}
              </div>
            )
          })}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={() => navigate('/symptom')} style={{ padding: '14px 32px', borderRadius: 12, border: 'none', backgroundColor: '#2D3436', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>새 진료 예약하기 →</button>
            </div>
          )}
        </div>
      </section>
      <style>{`@media(max-width:720px){.apt-summary{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  )
}
