import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SectionLabel, SectionHeading } from '../components/ui/SharedUI'
import { FORM_DEPTS } from '../data/homeData'

export function QuickConsultFormSection() {
  const { ref, visible } = useScrollReveal()
  const [form, setForm] = useState({ name: '', phone: '', dept: '', symptom: '', time: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })) }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = '이름을 입력해 주세요'
    if (!form.phone.trim()) errs.phone = '연락처를 입력해 주세요'
    if (!form.symptom.trim()) errs.symptom = '증상을 입력해 주세요'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <section style={{ backgroundColor: '#fff', padding: '88px 24px' }}>
      <div ref={ref} className={`reveal-hidden ${visible ? 'reveal-visible' : ''} form-grid`} style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Left copy */}
        <div>
          <SectionLabel>빠른 상담 신청</SectionLabel>
          <SectionHeading>지금 바로 비대면 진료를<br />신청하세요</SectionHeading>
          <p style={{ fontSize: 15, color: '#636E72', lineHeight: 1.7, marginBottom: 32, marginTop: 12 }}>간단한 정보를 입력하시면 담당 의사가 직접 연락드립니다. 평균 <strong style={{ color: '#00B894' }}>3분 이내</strong> 응답을 보장합니다.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[{ icon: '⚡', title: '즉시 매칭', desc: 'AI가 증상을 분석해 최적의 의사를 즉시 연결합니다' }, { icon: '🔒', title: '완전 보호', desc: '입력하신 정보는 암호화되어 안전하게 보관됩니다' }, { icon: '💰', title: '건강보험 적용', desc: '일반 병원과 동일하게 건강보험이 적용됩니다' }].map((item) => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2D3436', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#636E72', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={{ backgroundColor: '#F4F9F8', borderRadius: 24, padding: '36px 32px', border: '1px solid #eef4f2', boxShadow: '0 4px 24px rgba(0,184,148,0.08)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#E8F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✅</div>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 800, color: '#2D3436' }}>신청 완료!</h3>
              <p style={{ margin: '0 0 28px', fontSize: 14, color: '#636E72', lineHeight: 1.7 }}><strong style={{ color: '#00B894' }}>{form.name}</strong>님의 상담 신청이 완료됐습니다.<br />담당 의사가 <strong style={{ color: '#2D3436' }}>3분 이내</strong>로 연락드릴 예정입니다.</p>
              <button onClick={() => navigate('/symptom')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%', marginBottom: 10 }}>AI 증상 분석 바로 시작</button>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', dept: '', symptom: '', time: '' }) }} style={{ padding: '12px', borderRadius: 12, border: '1px solid #e0ecea', backgroundColor: '#fff', color: '#636E72', fontSize: 14, cursor: 'pointer', width: '100%' }}>다시 신청하기</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#2D3436', marginBottom: 4 }}>상담 신청서</div>
              {/* Name */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#636E72', display: 'block', marginBottom: 6 }}>이름 <span style={{ color: '#FF6B6B' }}>*</span></label>
                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="홍길동" style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${errors.name ? '#FF6B6B' : '#e0ecea'}`, fontSize: 14, backgroundColor: '#fff', boxSizing: 'border-box', color: '#2D3436' }} />
                {errors.name && <div style={{ fontSize: 11.5, color: '#FF6B6B', marginTop: 4 }}>{errors.name}</div>}
              </div>
              {/* Phone */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#636E72', display: 'block', marginBottom: 6 }}>연락처 <span style={{ color: '#FF6B6B' }}>*</span></label>
                <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="010-0000-0000" type="tel" style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${errors.phone ? '#FF6B6B' : '#e0ecea'}`, fontSize: 14, backgroundColor: '#fff', boxSizing: 'border-box', color: '#2D3436' }} />
                {errors.phone && <div style={{ fontSize: 11.5, color: '#FF6B6B', marginTop: 4 }}>{errors.phone}</div>}
              </div>
              {/* Dept */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#636E72', display: 'block', marginBottom: 6 }}>희망 진료과</label>
                <select value={form.dept} onChange={(e) => set('dept', e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0ecea', fontSize: 14, backgroundColor: '#fff', boxSizing: 'border-box', color: form.dept ? '#2D3436' : '#aaa' }}>
                  {FORM_DEPTS.map((d) => <option key={d} value={d === '진료과 선택' ? '' : d} disabled={d === '진료과 선택'}>{d}</option>)}
                </select>
              </div>
              {/* Symptom */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#636E72', display: 'block', marginBottom: 6 }}>증상 및 고민 <span style={{ color: '#FF6B6B' }}>*</span></label>
                <textarea value={form.symptom} onChange={(e) => set('symptom', e.target.value)} placeholder="예: 3일째 두통과 발열이 있고 기침도 심합니다." rows={3} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${errors.symptom ? '#FF6B6B' : '#e0ecea'}`, fontSize: 14, backgroundColor: '#fff', boxSizing: 'border-box', resize: 'none', color: '#2D3436', fontFamily: 'inherit' }} />
                {errors.symptom && <div style={{ fontSize: 11.5, color: '#FF6B6B', marginTop: 4 }}>{errors.symptom}</div>}
              </div>
              {/* Time preference */}
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#636E72', display: 'block', marginBottom: 8 }}>원하는 진료 시간</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['오전', '오후', '야간', '지금 즉시'].map((t) => (
                    <button key={t} type="button" onClick={() => set('time', t)} style={{ flex: 1, padding: '9px 4px', borderRadius: 9, border: `1.5px solid ${form.time === t ? '#00B894' : '#e0ecea'}`, backgroundColor: form.time === t ? '#E8F8F5' : '#fff', color: form.time === t ? '#00B894' : '#636E72', fontSize: 12, fontWeight: form.time === t ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s' }}>{t}</button>
                  ))}
                </div>
              </div>
              <button type="submit" style={{ padding: '14px', borderRadius: 12, border: 'none', backgroundColor: '#00B894', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4, boxShadow: '0 4px 16px rgba(0,184,148,0.3)' }}>
                무료 상담 신청하기 →
              </button>
              <p style={{ margin: 0, fontSize: 11.5, color: '#aaa', textAlign: 'center' }}>개인정보는 암호화되어 보호되며 진료 목적 외 사용되지 않습니다.</p>
            </form>
          )}
        </div>
      </div>
      <style>{`@media(max-width:820px){.form-grid{grid-template-columns:1fr!important;gap:32px!important;}}`}</style>
    </section>
  )
}