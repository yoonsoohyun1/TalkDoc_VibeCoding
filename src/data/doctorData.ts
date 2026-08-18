export const DEPT_COLORS: Record<string, string> = { '내과': '#00B894', '피부과': '#FF6B9D', '소아청소년과': '#6C63FF', '정신건강의학과': '#845EF7', '산부인과': '#F06595', '가정의학과': '#20C997', '이비인후과': '#FFA94D', '정형외과': '#339AF0' }

// Soft pastel token system for department tags (bg / text pairs)
export const DEPT_TAG_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  '내과':        { bg: '#E6F9F4', text: '#00876B', border: 'rgba(0,184,148,0.2)' },
  '피부과':      { bg: '#FFF0F5', text: '#C9365F', border: 'rgba(255,107,157,0.2)' },
  '소아청소년과': { bg: '#EEEAFF', text: '#4B3DB5', border: 'rgba(108,99,255,0.2)' },
  '정신건강의학과':{ bg: '#F2EEFF', text: '#5B3EAE', border: 'rgba(132,94,247,0.2)' },
  '산부인과':    { bg: '#FFF0F8', text: '#B83280', border: 'rgba(240,101,149,0.2)' },
  '가정의학과':  { bg: '#E8FBF5', text: '#0F7A5A', border: 'rgba(32,201,151,0.2)' },
  '이비인후과':  { bg: '#FFF4E6', text: '#B3560A', border: 'rgba(255,169,77,0.2)' },
  '정형외과':    { bg: '#E8F3FF', text: '#1A5FA8', border: 'rgba(51,154,240,0.2)' },
}

export const SWIPER_DOCTORS = [
  { name: '김지수', dept: '내과', hospital: '서울아산병원 출신', rating: 4.97, reviews: 1284, exp: '15년', specialty: '감기·발열·소화기', photo: 'https://images.unsplash.com/photo-1686737357932-ae1c50492a9e?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#00B894' },
  { name: '박성민', dept: '피부과', hospital: '연세세브란스 출신', rating: 4.95, reviews: 986, exp: '11년', specialty: '여드름·탈모·아토피', photo: 'https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#FF6B9D' },
  { name: '이수진', dept: '소아청소년과', hospital: '서울대병원 출신', rating: 4.98, reviews: 2103, exp: '13년', specialty: '소아발열·성장·예방', photo: 'https://images.unsplash.com/photo-1686737357914-80a665ca1c29?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#6C63FF' },
  { name: '최재원', dept: '정신건강의학과', hospital: '삼성서울병원 출신', rating: 4.93, reviews: 741, exp: '9년', specialty: '불안·수면장애·우울', photo: 'https://images.unsplash.com/photo-1645066928295-2506defde470?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#845EF7' },
  { name: '정유나', dept: '산부인과', hospital: '강남세브란스 출신', rating: 4.96, reviews: 1458, exp: '12년', specialty: '갱년기·호르몬·여성건강', photo: 'https://images.unsplash.com/photo-1605176647037-cb9e5e5dc87d?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#F06595' },
  { name: '한동현', dept: '가정의학과', hospital: '분당서울대병원 출신', rating: 4.91, reviews: 623, exp: '8년', specialty: '비만·만성피로·건강검진', photo: 'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#20C997' },
  { name: '오지현', dept: '이비인후과', hospital: '아주대학교병원 출신', rating: 4.94, reviews: 892, exp: '10년', specialty: '중이염·코막힘·인후통', photo: 'https://images.unsplash.com/photo-1631203883080-9e5338ebcf2d?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#FFA94D' },
  { name: '강민준', dept: '정형외과', hospital: '국립중앙의료원 출신', rating: 4.89, reviews: 544, exp: '11년', specialty: '근골격·관절·척추상담', photo: 'https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=160&h=160&fit=crop&crop=faces&auto=format', color: '#339AF0' },
]

export const CARD_W = 248
export const CARD_GAP = 18

export const HOSPITAL_TYPES_DATA: Record<string, { title: string; dept: string; color: string; icon: string; desc: string; filter: (d: typeof SWIPER_DOCTORS[0], i: number) => boolean }> = {
  'internal':      { title: '내과', dept: '내과', color: '#00B894', icon: '🫁', desc: '감기, 소화기, 당뇨, 고혈압 등 일반 내과 질환 전문', filter: (d) => d.dept === '내과' },
  'dermatology':   { title: '피부과', dept: '피부과', color: '#FF6B9D', icon: '✨', desc: '여드름, 탈모, 아토피, 피부염 등 피부 질환 전문', filter: (d) => d.dept === '피부과' },
  'pediatrics':    { title: '소아청소년과', dept: '소아청소년과', color: '#6C63FF', icon: '👶', desc: '영유아·소아·청소년 건강 전반을 담당하는 전문과', filter: (d) => d.dept === '소아청소년과' },
  'psychiatry':    { title: '정신건강의학과', dept: '정신건강의학과', color: '#845EF7', icon: '💆', desc: '불안, 우울, 수면장애, ADHD 등 정신건강 전문', filter: (d) => d.dept === '정신건강의학과' },
  'gynecology':    { title: '산부인과', dept: '산부인과', color: '#F06595', icon: '🌸', desc: '갱년기, 월경 이상, 호르몬 관련 여성 건강 전문', filter: (d) => d.dept === '산부인과' },
  'hair-clinic':   { title: '탈모 클리닉', dept: '피부과', color: '#FF6B9D', icon: '💆', desc: '탈모 진단 및 미녹시딜·피나스테리드 처방 전문', filter: (d) => d.dept === '피부과' },
  'obesity-clinic':{ title: '비만 클리닉', dept: '가정의학과', color: '#20C997', icon: '⚖️', desc: '체중 관리·식욕억제제 처방·생활 습관 교정', filter: (d) => d.dept === '가정의학과' },
  'quit-smoking':  { title: '금연 클리닉', dept: '가정의학과', color: '#20C997', icon: '🚭', desc: '금연 상담 및 바레니클린·니코틴 대체 치료 처방', filter: (d) => d.dept === '가정의학과' },
  'sleep-clinic':  { title: '수면 클리닉', dept: '정신건강의학과', color: '#845EF7', icon: '🌙', desc: '불면증·수면무호흡·일주기리듬 장애 전문 치료', filter: (d) => d.dept === '정신건강의학과' },
  'chronic':       { title: '만성질환 관리', dept: '내과', color: '#00B894', icon: '🏥', desc: '고혈압·당뇨·고지혈증 등 만성질환 지속 관리', filter: (d) => d.dept === '내과' || d.dept === '가정의학과' },
  'top-rated':     { title: '평점 TOP 의사', dept: '전체', color: '#FFD200', icon: '⭐', desc: '환자 만족도 4.9 이상, 리뷰 500건 이상 의사', filter: (d) => d.rating >= 4.95 },
  'fast-response': { title: '빠른 응답 의사', dept: '전체', color: '#20C997', icon: '⚡', desc: '평균 응답 시간 5분 이내, 즉시 진료 가능한 의사', filter: () => true },
  'night-weekend': { title: '야간·주말 진료', dept: '전체', color: '#339AF0', icon: '🌙', desc: '평일 야간(18시~익일 9시) 및 주말·공휴일 진료', filter: () => true },
  'multilingual':  { title: '외국어 가능', dept: '전체', color: '#FFA94D', icon: '🌏', desc: '영어·중국어·일본어 진료 가능 의사', filter: () => true },
  'female-doctor': { title: '여성 의사', dept: '전체', color: '#F06595', icon: '👩‍⚕️', desc: '여성 전문의 진료를 선호하는 분을 위한 매칭', filter: (_, i) => i % 2 === 0 },
}
