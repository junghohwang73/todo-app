export function generateRecoverySchedule() {
  const schedule = []

  // 운동 정보 정의
  const exercises = {
    basic: [
      { id: 'neck-stretch-1', name: '목 전방 스트레칭', repetitions: '10회', duration: '3초 유지', intensity: '낮음', notes: '천천히 부드럽게 수행' },
      { id: 'neck-stretch-2', name: '목 옆 스트레칭', repetitions: '8회/측', duration: '3초 유지', intensity: '낮음', notes: '양쪽 모두 동일하게' },
      { id: 'chin-tuck', name: '턱 끌어당기기', repetitions: '15회', duration: '2초 유지', intensity: '낮음', notes: '목 근육 안정화' },
      { id: 'shoulder-shrug', name: '어깨 으쓱 운동', repetitions: '12회', duration: '2초 유지', intensity: '낮음', notes: '천천히 올렸다 내려주기' },
    ],
    intermediate: [
      { id: 'neck-iso-1', name: '목 정적 수축 - 전방', repetitions: '8회', duration: '5초 유지', intensity: '중간', notes: '손으로 가볍게 저항' },
      { id: 'neck-iso-2', name: '목 정적 수축 - 측면', repetitions: '8회/측', duration: '5초 유지', intensity: '중간', notes: '손으로 가볍게 저항' },
      { id: 'shoulder-raise', name: '옆으로 팔 들기', repetitions: '10회', duration: '2초 유지', intensity: '중간', notes: '어깨 높이까지만' },
      { id: 'scapular-squeeze', name: '견갑골 오므리기', repetitions: '12회', duration: '2초 유지', intensity: '중간', notes: '가슴을 펼치면서' },
    ],
    advanced: [
      { id: 'neck-strength-1', name: '목 근력운동 - 전방', repetitions: '10회', duration: '2-3초 유지', intensity: '높음', notes: '약한 저항 사용 가능' },
      { id: 'neck-strength-2', name: '목 근력운동 - 측면', repetitions: '10회/측', duration: '2-3초 유지', intensity: '높음', notes: '약한 저항 사용 가능' },
      { id: 'prone-cobra', name: '프론 코브라 자세', repetitions: '8회', duration: '3-5초 유지', intensity: '높음', notes: '등 근육 활성화' },
      { id: 'row-exercise', name: '팔 당기기 운동', repetitions: '12회', duration: '2초 유지', intensity: '높음', notes: '어깨뼈 모으기' },
      { id: 'light-walk', name: '가벼운 산책', repetitions: '1회', duration: '10-15분', intensity: '중간', notes: '평탄한 곳에서' },
    ],
  }

  // 일일 운동 계획 생성
  const dailyPlans = []

  // 1-14일: 기본 단계
  for (let i = 1; i <= 14; i++) {
    const dayOfWeek = (i - 1) % 7

    let dayExercises = [
      exercises.basic[0], // 목 전방 스트레칭
      exercises.basic[2], // 턱 끌어당기기
      exercises.basic[3], // 어깨 으쓱
    ]

    // 월/수/금에 목 옆 스트레칭 추가
    if (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4) {
      dayExercises.push(exercises.basic[1])
    }

    // 토요일에만 가벼운 산책
    if (dayOfWeek === 5) {
      dayExercises.push({
        id: 'light-walk-' + i,
        name: '가벼운 산책',
        repetitions: '1회',
        duration: '5-10분',
        intensity: '낮음',
        notes: '천천히 편안한 속도로'
      })
    }

    dailyPlans.push({
      dayNumber: i,
      phase: '기본',
      focus: '목 안정화 및 가벼운 스트레칭',
      exercises: dayExercises,
      tips: '부드럽고 천천히 모든 운동을 수행하세요. 통증이 있으면 즉시 중단하세요.'
    })
  }

  // 15-28일: 초기 강화 단계
  for (let i = 15; i <= 28; i++) {
    const dayOfWeek = (i - 1) % 7

    let dayExercises = [
      exercises.basic[0], // 목 전방 스트레칭
      exercises.basic[2], // 턱 끌어당기기
      exercises.intermediate[0], // 목 정적 수축 - 전방
    ]

    // 월/수/금에 강화 운동
    if (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4) {
      dayExercises.push(exercises.intermediate[1])
      dayExercises.push(exercises.intermediate[2])
    }

    // 화/목에 견갑골 운동
    if (dayOfWeek === 1 || dayOfWeek === 3) {
      dayExercises.push(exercises.intermediate[3])
    }

    // 토/일에 산책
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      dayExercises.push({
        id: 'light-walk-' + i,
        name: '가벼운 산책',
        repetitions: '1회',
        duration: '10-15분',
        intensity: '중간',
        notes: '일정한 속도 유지'
      })
    }

    dailyPlans.push({
      dayNumber: i,
      phase: '초기 강화',
      focus: '근력 강화 시작',
      exercises: dayExercises,
      tips: '저항을 천천히 증가시키세요. 5주차에 접어드니 적극적으로 운동하세요.'
    })
  }

  // 29-50일: 고급 단계
  for (let i = 29; i <= 50; i++) {
    const dayOfWeek = (i - 1) % 7

    let dayExercises = [
      exercises.basic[0], // 목 전방 스트레칭
      exercises.intermediate[0], // 목 정적 수축 - 전방
      exercises.advanced[0], // 목 근력운동 - 전방
    ]

    // 월/수/금에 고급 운동
    if (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4) {
      dayExercises.push(exercises.advanced[1])
      dayExercises.push(exercises.advanced[3])
    }

    // 화/목에 등 운동
    if (dayOfWeek === 1 || dayOfWeek === 3) {
      dayExercises.push(exercises.advanced[2])
      dayExercises.push(exercises.intermediate[3])
    }

    // 토/일에 산책 추가
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      dayExercises.push(exercises.advanced[4])
    }

    dailyPlans.push({
      dayNumber: i,
      phase: '고급',
      focus: '기능 회복 및 근력 강화',
      exercises: dayExercises,
      tips: '저항을 점진적으로 증가시킬 수 있습니다. 주 3-4회 정도 더 강한 운동을 할 수 있습니다.'
    })
  }

  return dailyPlans
}
