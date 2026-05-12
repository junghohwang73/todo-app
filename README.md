# To Do 앱 🎯

React + Vite + Supabase를 사용한 현대적인 To Do 관리 애플리케이션입니다.

## 주요 기능

- ✨ **우선순위 관리**: 높음 / 중간 / 낮음 3단계 우선순위, 자동 정렬 (동일 우선순위 내 마감일 빠른 순)
- 📅 **마감일 설정**: 업무의 마감일과 완료일을 표시하고, 기한 경과 여부를 시각적으로 강조
- ✏️ **인라인 수정**: 등록된 항목의 제목·우선순위·마감일을 바로 편집
- ✅ **완료 상태 관리**: 완료된 업무를 별도 섹션에서 접기/펴기, 개별 삭제 가능
- 📱 **반응형 디자인**: PC, 태블릿, 모바일 모든 기기에서 완벽 작동
- ☁️ **클라우드 동기화**: Supabase를 통한 데이터 동기화
- 💾 **오프라인 지원**: 로컬 스토리지 백업으로 인터넷 없이도 작동

## 기술 스택

- **Frontend**: React 19, Vite
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS 3
- **Deployment**: Vercel
- **Font**: Malgun Gothic (맑은 고딕)

## 프로젝트 구조

```
├── src/
│   ├── components/
│   │   └── TodoApp.jsx        # 메인 To Do 컴포넌트
│   ├── lib/
│   │   └── supabase.js        # Supabase 설정
│   ├── styles/
│   │   └── TodoApp.css        # 스타일
│   ├── main.jsx               # 진입점
│   └── styles.css             # 전역 스타일
├── .env.local                 # 환경 변수 (수정 필요)
├── supabase-setup.sql         # DB 설정 스크립트
├── vercel.json                # Vercel 배포 설정
└── package.json               # 의존성
```

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 수정하여 Supabase 정보를 입력:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 4. 프로덕션 빌드
```bash
npm run build
```

## Supabase 설정

1. [Supabase 웹사이트](https://supabase.com)에서 새 프로젝트 생성
2. Supabase 대시보드의 SQL Editor에서 `supabase-setup.sql` 파일의 코드 실행
3. Settings → API에서 URL과 Anon Key 복사
4. `.env.local`에 붙여넣기

## Vercel 배포

1. GitHub 저장소에 코드 푸시
2. [Vercel](https://vercel.com)에서 GitHub 저장소 연결
3. 환경 변수 설정 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. 배포 클릭!

## 사용 방법

### 업무 추가
1. 업무 입력 필드에 작업 내용 입력
2. 우선순위 선택 (높음 / 중간 / 낮음)
3. 마감일 설정 (선택사항)
4. "추가" 버튼 클릭

### 업무 관리
- **자동 정렬**: 우선순위 높음 순서, 동일 우선순위면 마감일 빠른 순
- **업무 완료**: ✓ 버튼 클릭
- **업무 수정**: ✎ 버튼 클릭 → 인라인 편집 → 저장/취소
- **업무 삭제**: ✕ 버튼 클릭

### 완료된 업무
- "완료된 업무" 버튼으로 섹션 열기/닫기
- 완료된 업무도 삭제 가능

## 앱 디자인

- **헤더**: 흰 바탕 + 카드형 그림자의 깔끔한 디자인 (14pt)
- **폰트**: 맑은 고딕 (Malgun Gothic), 본문·하단 12pt
- **색상**: 우선순위별 좌측 컬러 바와 연한 톤의 뱃지로 시각화
- **레이아웃**: 모바일 최적화된 반응형 디자인 (480 / 768 / 1024px 단계 대응)

## 트러블슈팅

### Supabase 연결 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- URL과 Anon Key가 정확한지 확인
- 개발 서버 재시작 필요

### 데이터가 안 보임
- 브라우저 개발자도구 Console에서 오류 확인
- Supabase 대시보드에서 RLS 정책 확인
- 로컬 스토리지에는 자동으로 백업됨

### 빌드 오류
- `npm install` 재실행
- `node_modules` 폴더 삭제 후 `npm install` 다시 실행

## 향후 기능 계획

- [ ] 사용자 인증 (Supabase Auth)
- [ ] 카테고리/태그 기능
- [ ] 실시간 협업 (Supabase Realtime)
- [ ] 다크 모드
- [ ] 알림 기능

## 라이센스

MIT License

## 기여

이 프로젝트에 기여하고 싶으시면 Pull Request를 보내주세요!

---

**Made with ❤️ by Jungho Hwang**
