import { NavItem } from '../types'

export const NAV_ITEMS: NavItem[] = [
  {
    label: '증상별 진료',
    path: '/symptom',
    mega: {
      featured: {
        title: 'AI 증상 분석',
        desc: '증상을 입력하면 AI가 적합한 진료과를 추천해 드립니다.',
        cta: '증상 입력하기 →',
        ctaPath: '/symptom',
      },
      columns: [
        {
          heading: '호흡기·내과',
          items: [
            { label: '감기·몸살', path: '/symptom/cold' },
            { label: '기침·가래', path: '/symptom/cough' },
            { label: '발열·두통', path: '/symptom/fever' },
            { label: '소화불량', path: '/symptom/digestion' },
            { label: '만성피로', path: '/symptom/fatigue' },
          ],
        },
        {
          heading: '피부·미용',
          items: [
            { label: '여드름·트러블', path: '/symptom/acne' },
            { label: '탈모', badge: 'HOT', path: '/symptom/hair-loss' },
            { label: '피부염·아토피', path: '/symptom/atopy' },
            { label: '두드러기', path: '/symptom/hives' },
            { label: '건선', path: '/symptom/psoriasis' },
          ],
        },
        {
          heading: '소아·가족',
          items: [
            { label: '소아청소년과', badge: 'NEW', path: '/symptom/child-care' },
            { label: '소아 발열', path: '/symptom/child-fever' },
            { label: '영유아 건강', path: '/symptom/infant' },
            { label: '성장 상담', path: '/symptom/growth' },
            { label: '예방접종 상담', path: '/symptom/vaccination' },
          ],
        },
        {
          heading: '다이어트·건강',
          items: [
            { label: '비만·체중 관리', badge: 'HOT', path: '/symptom/obesity' },
            { label: '당뇨·혈당', path: '/symptom/diabetes' },
            { label: '고혈압', path: '/symptom/hypertension' },
            { label: '갱년기', path: '/symptom/menopause' },
            { label: '수면 장애', path: '/symptom/insomnia' },
          ],
        },
      ],
    },
  },
  {
    label: '의사 찾기',
    path: '/hospitals',
    mega: {
      columns: [
        {
          heading: '진료과별',
          items: [
            { label: '내과', path: '/hospitals/internal' },
            { label: '피부과', path: '/hospitals/dermatology' },
            { label: '소아청소년과', path: '/hospitals/pediatrics' },
            { label: '정신건강의학과', path: '/hospitals/psychiatry' },
            { label: '산부인과', path: '/hospitals/gynecology' },
          ],
        },
        {
          heading: '전문 클리닉',
          items: [
            { label: '탈모 클리닉', badge: 'HOT', path: '/hospitals/hair-clinic' },
            { label: '비만 클리닉', path: '/hospitals/obesity-clinic' },
            { label: '금연 클리닉', path: '/hospitals/quit-smoking' },
            { label: '수면 클리닉', path: '/hospitals/sleep-clinic' },
            { label: '만성질환 관리', path: '/hospitals/chronic' },
          ],
        },
        {
          heading: '의사 찾기 방법',
          items: [
            { label: '평점 TOP 의사', path: '/hospitals/top-rated' },
            { label: '빠른 응답 의사', badge: 'NEW', path: '/hospitals/fast-response' },
            { label: '야간·주말 진료', path: '/hospitals/night-weekend' },
            { label: '외국어 가능', path: '/hospitals/multilingual' },
            { label: '여성 의사', path: '/hospitals/female-doctor' },
          ],
        },
      ],
    },
  },
  { label: '약국 찾기', path: '/pharmacy' },
]
