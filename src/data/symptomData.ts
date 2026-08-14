export const SYMPTOM_CATS: Record<string, { title: string; dept: string; deptColor: string; icon: string; desc: string; info: string[]; symptoms: string[] }> = {
  'cold':       { title: '감기·몸살', dept: '내과', deptColor: '#00B894', icon: '🤧', desc: '바이러스 감염으로 인한 상기도 증상', info: ['충분한 수분 섭취와 휴식이 중요합니다', '38도 이상 고열 지속 시 진료가 필요합니다', '기침·가래 동반 시 항생제 처방이 필요할 수 있습니다'], symptoms: ['콧물', '코막힘', '목 통증', '기침', '발열', '근육통', '피로감'] },
  'cough':      { title: '기침·가래', dept: '내과', deptColor: '#00B894', icon: '😷', desc: '호흡기 자극으로 인한 기침과 가래', info: ['2주 이상 지속되는 기침은 정밀 검사가 필요합니다', '혈담이 있을 경우 즉시 진료를 받으세요', '야간에 심해지는 기침은 기관지천식일 수 있습니다'], symptoms: ['건성 기침', '습성 기침', '가래', '흉통', '호흡곤란', '쌕쌕거림'] },
  'fever':      { title: '발열·두통', dept: '내과', deptColor: '#00B894', icon: '🌡️', desc: '체온 상승 및 두통 증상', info: ['38도 이상 발열은 감염 가능성이 있습니다', '두통이 매우 심하거나 갑작스럽다면 즉시 응급실을 방문하세요', '해열제 복용 후에도 지속되면 진료를 받으세요'], symptoms: ['발열', '두통', '오한', '근육통', '어지럼증', '구토'] },
  'digestion':  { title: '소화불량', dept: '내과', deptColor: '#00B894', icon: '🫀', desc: '위장관 기능 저하로 인한 소화 문제', info: ['식사 후 30분 이내 눕지 않는 것이 좋습니다', '자극적인 음식·알코올·카페인을 줄이세요', '2주 이상 지속 시 위내시경 검사를 권장합니다'], symptoms: ['속쓰림', '구역감', '복부 팽만', '트림', '식욕 저하', '복통'] },
  'fatigue':    { title: '만성피로', dept: '가정의학과', deptColor: '#20C997', icon: '😴', desc: '6개월 이상 지속되는 피로 증상', info: ['갑상선 기능 저하, 빈혈 등 원인 질환 감별이 필요합니다', '규칙적인 수면 패턴이 중요합니다', '혈액검사로 기본적인 원인을 확인할 수 있습니다'], symptoms: ['지속적 피로', '집중력 저하', '수면 문제', '근육통', '두통', '기억력 감퇴'] },
  'acne':       { title: '여드름·트러블', dept: '피부과', deptColor: '#FF6B9D', icon: '✨', desc: '모공 막힘과 세균 감염으로 인한 피부 트러블', info: ['압출은 흉터와 2차 감염 위험이 있습니다', '레티노이드, 항생제 등 처방 치료가 효과적입니다', 'SPF30 이상 자외선 차단제를 매일 사용하세요'], symptoms: ['블랙헤드', '화이트헤드', '염증성 여드름', '낭종', '흉터', '색소침착'] },
  'hair-loss':  { title: '탈모', dept: '피부과', deptColor: '#FF6B9D', icon: '💆', desc: '모발 손실 및 두피 건강 문제', info: ['하루 100개 이상 빠지면 탈모 치료를 고려하세요', '미녹시딜, 피나스테리드 등 처방 치료가 있습니다', '조기 치료일수록 효과가 좋습니다'], symptoms: ['전두부 탈모', '정수리 탈모', '원형 탈모', '두피 가려움', '비듬', '모발 가늘어짐'] },
  'atopy':      { title: '피부염·아토피', dept: '피부과', deptColor: '#FF6B9D', icon: '🩺', desc: '만성 염증성 피부 질환', info: ['보습제를 하루 2회 이상 듬뿍 바르세요', '긁으면 악화되므로 시원하게 냉찜질 해보세요', '스테로이드 연고는 전문의 처방에 따라 사용하세요'], symptoms: ['가려움증', '붉은 발진', '건조함', '피부 두꺼워짐', '삼출물', '수면 방해'] },
  'hives':      { title: '두드러기', dept: '피부과', deptColor: '#FF6B9D', icon: '🔴', desc: '알레르기 반응으로 인한 피부 팽진', info: ['원인 물질(음식, 약물, 환경)을 파악하는 것이 중요합니다', '항히스타민제가 주요 치료제입니다', '호흡 곤란이 동반되면 즉시 응급실에 방문하세요'], symptoms: ['피부 팽진', '심한 가려움', '붉어짐', '부종', '작열감'] },
  'psoriasis':  { title: '건선', dept: '피부과', deptColor: '#FF6B9D', icon: '🩹', desc: '면역 이상으로 인한 만성 피부 질환', info: ['스트레스, 음주, 흡연이 악화 요인입니다', '생물학적 제제 등 최신 치료법이 있습니다', '자외선 치료(광선 치료)가 효과적일 수 있습니다'], symptoms: ['은백색 인설', '붉은 반점', '가려움증', '관절 통증', '손발톱 변형'] },
  'child-care': { title: '소아청소년과', dept: '소아청소년과', deptColor: '#6C63FF', icon: '👶', desc: '소아·청소년 전반적인 건강 관리', info: ['예방접종 일정을 꼭 지켜주세요', '성장 발달 이상은 조기 발견이 중요합니다', '소아 비대면 진료는 보호자 동의 후 가능합니다'], symptoms: ['성장 문제', '발달 지연', '식욕 부진', '잦은 감기', '알레르기', '행동 문제'] },
  'child-fever':{ title: '소아 발열', dept: '소아청소년과', deptColor: '#6C63FF', icon: '🌡️', desc: '소아의 체온 상승 증상', info: ['생후 3개월 미만 영아의 발열은 즉시 응급실로 가세요', '38도 이상이면 해열제를 사용하세요', '48시간 이상 지속되면 진료가 필요합니다'], symptoms: ['고열', '보챔', '식욕 저하', '발진', '구토', '경련'] },
  'infant':     { title: '영유아 건강', dept: '소아청소년과', deptColor: '#6C63FF', icon: '🍼', desc: '영아 및 유아 건강 관리', info: ['월령별 발달 이정표를 확인하세요', '모유/분유 수유량이 적절한지 확인하세요', '황달, 배꼽 이상 등은 즉시 확인이 필요합니다'], symptoms: ['황달', '수유 거부', '구토', '체중 미달', '잦은 울음', '발진'] },
  'growth':     { title: '성장 상담', dept: '소아청소년과', deptColor: '#6C63FF', icon: '📏', desc: '키, 체중, 발달 성장 상담', info: ['성장 호르몬 치료는 만 3세 이후부터 가능합니다', '뼈 나이 검사로 성장 가능성을 예측할 수 있습니다', '균형 잡힌 식단과 충분한 수면이 성장에 중요합니다'], symptoms: ['또래 대비 저신장', '성조숙증', '체중 문제', '성장통', '자세 이상'] },
  'vaccination':{ title: '예방접종 상담', dept: '소아청소년과', deptColor: '#6C63FF', icon: '💉', desc: '예방접종 일정 및 부작용 상담', info: ['표준 예방접종 일정을 준수하는 것이 중요합니다', '접종 후 발열, 부위 통증은 일반적 반응입니다', '알레르기 체질은 접종 전 반드시 상담하세요'], symptoms: ['접종 일정 문의', '접종 후 발열', '접종 부위 부기', '알레르기 반응'] },
  'obesity':    { title: '비만·체중 관리', dept: '가정의학과', deptColor: '#20C997', icon: '⚖️', desc: '체중 조절 및 비만 치료', info: ['BMI 25 이상이면 의학적 관리가 필요합니다', '처방 식욕억제제는 단기간 보조적으로만 사용합니다', '운동·식이 요법이 기본입니다'], symptoms: ['체중 증가', '복부 지방', '혈당 이상', '관절 통증', '수면 무호흡', '피로'] },
  'diabetes':   { title: '당뇨·혈당', dept: '내과', deptColor: '#00B894', icon: '🩸', desc: '혈당 조절 및 당뇨 관리', info: ['공복 혈당 126mg/dL 이상이면 당뇨입니다', '정기적인 혈당 모니터링이 중요합니다', '합병증 예방을 위해 꾸준한 관리가 필요합니다'], symptoms: ['잦은 소변', '심한 갈증', '체중 감소', '피로', '시력 저하', '상처 잘 낫지 않음'] },
  'hypertension':{ title: '고혈압', dept: '내과', deptColor: '#00B894', icon: '❤️', desc: '혈압 조절 및 심혈관 건강', info: ['수축기 혈압 140mmHg 이상이면 고혈압입니다', '짜게 먹지 않고 규칙적인 운동이 중요합니다', '약물 치료 시 임의 중단하지 마세요'], symptoms: ['두통', '어지럼증', '이명', '심계항진', '코피', '시력 흐림'] },
  'menopause':  { title: '갱년기', dept: '산부인과', deptColor: '#F06595', icon: '🌸', desc: '폐경 전후 갱년기 증상 관리', info: ['호르몬 대체 요법이 증상 완화에 효과적입니다', '골다공증 예방을 위해 칼슘·비타민D를 보충하세요', '정기적인 여성 암 검진을 받으세요'], symptoms: ['안면 홍조', '발한', '수면 장애', '기분 변화', '관절 통증', '질 건조'] },
  'insomnia':   { title: '수면 장애', dept: '정신건강의학과', deptColor: '#845EF7', icon: '🌙', desc: '수면 관련 문제 진단 및 치료', info: ['취침·기상 시간을 일정하게 유지하세요', '인지행동치료가 장기적으로 가장 효과적입니다', '수면제는 단기 보조 수단으로만 사용하세요'], symptoms: ['잠들기 어려움', '자주 깸', '일찍 깸', '낮 졸음', '집중력 저하', '피로'] },
}

export const INITIAL_SUGGESTIONS = ['감기·발열', '두통·어지럼증', '피부 트러블', '소화 불량', '탈모', '수면 장애', '소아 발열', '기타 증상']

export function getDeptRec(symptom: string) {
  const s = symptom.toLowerCase()
  if (s.includes('피부') || s.includes('여드름') || s.includes('탈모') || s.includes('아토피') || s.includes('두드러기') || s.includes('건선'))
    return { name: '피부과', color: '#FF6B9D', key: 'dermatology' }
  if (s.includes('소아') || s.includes('아이') || s.includes('아기') || s.includes('어린이') || s.includes('유아'))
    return { name: '소아청소년과', color: '#6C63FF', key: 'pediatrics' }
  if (s.includes('불안') || s.includes('우울') || s.includes('수면') || s.includes('불면') || s.includes('공황') || s.includes('adhd'))
    return { name: '정신건강의학과', color: '#845EF7', key: 'psychiatry' }
  if (s.includes('비만') || s.includes('다이어트') || s.includes('체중') || s.includes('갱년기') || s.includes('만성'))
    return { name: '가정의학과', color: '#20C997', key: 'family' }
  if (s.includes('이비') || s.includes('귀') || s.includes('코') || s.includes('목') || s.includes('인후') || s.includes('편도'))
    return { name: '이비인후과', color: '#FFA94D', key: 'ent' }
  if (s.includes('산부') || s.includes('생리') || s.includes('임신') || s.includes('여성'))
    return { name: '산부인과', color: '#F06595', key: 'gynecology' }
  return { name: '내과', color: '#00B894', key: 'internal' }
}
