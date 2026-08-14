import { SWIPER_DOCTORS } from './doctorData'

export const PHARMACIES = [
  { name: '강남 온누리약국', address: '강남구 테헤란로 28', dist: '0.3km', hours: '09:00~21:00', open: true, delivery: true },
  { name: '역삼역 메디팜', address: '강남구 역삼동 824', dist: '0.5km', hours: '08:30~22:00', open: true, delivery: true },
  { name: '강남구청 약국', address: '강남구 학동로 426', dist: '0.8km', hours: '09:00~19:00', open: true, delivery: false },
  { name: '선릉 헬스케어약국', address: '강남구 선릉로 512', dist: '1.1km', hours: '08:00~20:00', open: false, delivery: true },
  { name: '삼성동 그린약국', address: '강남구 영동대로 214', dist: '1.4km', hours: '10:00~20:00', open: true, delivery: false },
]

export const MY_APPOINTMENTS = [
  { id: 'A001', doctor: '김지수', dept: '내과', hospital: '서울아산병원 출신', photo: SWIPER_DOCTORS[0].photo, color: '#00B894', date: '2026.08.13', time: '오후 3:30', status: 'confirmed', type: '화상 진료', fee: '6,500원', symptoms: ['두통', '발열'] },
  { id: 'A002', doctor: '박성민', dept: '피부과', hospital: '연세세브란스 출신', photo: SWIPER_DOCTORS[1].photo, color: '#FF6B9D', date: '2026.08.10', time: '오전 10:00', status: 'completed', type: '화상 진료', fee: '8,000원', symptoms: ['여드름', '피부염'], rx: '트레티노인 0.05% 크림 1개월분' },
  { id: 'A003', doctor: '이수진', dept: '소아청소년과', hospital: '서울대병원 출신', photo: SWIPER_DOCTORS[2].photo, color: '#6C63FF', date: '2026.07.28', time: '오후 7:00', status: 'completed', type: '화상 진료', fee: '7,500원', symptoms: ['소아 발열', '기침'], rx: '아목시실린 125mg/5ml 7일분' },
  { id: 'A004', doctor: '최재원', dept: '정신건강의학과', hospital: '삼성서울병원 출신', photo: SWIPER_DOCTORS[3].photo, color: '#845EF7', date: '2026.08.20', time: '오후 9:00', status: 'pending', type: '음성 진료', fee: '15,000원', symptoms: ['불면증', '불안'] },
]

export const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: '예약 확정', color: '#00B894', bg: '#E8F8F5' },
  completed:  { label: '진료 완료', color: '#6C63FF', bg: '#f0eeff' },
  pending:    { label: '결제 대기', color: '#FFD200', bg: '#FFF9E0' },
  cancelled:  { label: '취소됨', color: '#FF6B6B', bg: '#fff0f0' },
}

export const QA_POSTS = [
  { id: 1, question: '3일째 목이 너무 아픈데 편도염인가요 아니면 인후염인가요? 열은 37.5도이고 삼킬 때 많이 아픕니다.', tags: ['이비인후과', '인후통'], asker: '이*준', date: '2026.08.13', views: 342, helpful: 28, answered: true, doctorName: '오지현 원장', doctorDept: '이비인후과', doctorPhoto: SWIPER_DOCTORS[6].photo, answer: '증상으로 보아 급성 인후염 가능성이 높습니다. 37.5도 미열과 인후통은 바이러스성 인후염의 전형적인 증상입니다. 현재 증상이면 충분한 수분 섭취와 휴식으로 호전될 수 있으나, 열이 38도를 넘거나 3일 이상 지속되면 항생제 처방이 필요할 수 있어 진료를 권장드립니다.' },
  { id: 2, question: '7살 아이가 어제부터 배꼽 주위 복통을 호소합니다. 열은 없고 밥도 잘 먹는데 맹장인가요?', tags: ['소아청소년과', '복통'], asker: '김*영', date: '2026.08.12', views: 521, helpful: 47, answered: true, doctorName: '이수진 원장', doctorDept: '소아청소년과', doctorPhoto: SWIPER_DOCTORS[2].photo, answer: '7세 소아의 배꼽 주위 복통은 맹장보다는 기능성 복통이나 장염 초기, 변비 등이 더 흔합니다. 현재 열 없이 밥을 잘 먹는다면 당장 응급은 아니지만, 통증이 오른쪽으로 이동하거나 악화되면 즉시 응급실 방문이 필요합니다.' },
  { id: 3, question: '탈모가 심해지고 있어요. 매일 아침 베개에 머리카락이 100개 이상 빠집니다.', tags: ['피부과', '탈모'], asker: '박*현', date: '2026.08.11', views: 893, helpful: 72, answered: true, doctorName: '박성민 원장', doctorDept: '피부과', doctorPhoto: SWIPER_DOCTORS[1].photo, answer: '하루 100개 이상 탈모는 휴지기 탈모 또는 안드로겐성 탈모일 가능성이 있습니다. 피부과에서 비대면으로도 사진을 통한 초기 평가 후 적절한 처방이 가능합니다.' },
  { id: 4, question: '매일 밤 잠들기가 너무 힘들고 새벽 3~4시에 깨면 다시 못 자요. 수면제를 처방받을 수 있을까요?', tags: ['정신건강의학과', '불면증'], asker: '최*민', date: '2026.08.10', views: 678, helpful: 54, answered: true, doctorName: '최재원 원장', doctorDept: '정신건강의학과', doctorPhoto: SWIPER_DOCTORS[3].photo, answer: '수면 개시 어려움과 새벽 각성은 전형적인 불면증 증상입니다. 비대면 진료를 통해 증상 평가 후 필요시 단기 수면보조제 처방이 가능합니다. 인지행동치료(CBT-I)와 병행을 권장합니다.' },
  { id: 5, question: '갑자기 눈 주위에 두드러기처럼 붓고 가려운데 알레르기인가요? 오늘 새로운 화장품을 썼어요.', tags: ['피부과', '알레르기'], asker: '정*은', date: '2026.08.13', views: 215, helpful: 18, answered: false, doctorName: '', doctorDept: '', doctorPhoto: '', answer: '' },
]
