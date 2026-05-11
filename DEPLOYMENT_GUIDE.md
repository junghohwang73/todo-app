# To Do 앱 Supabase & Vercel 배포 가이드

## 1. Supabase 설정

### 1.1 Supabase 프로젝트 생성
1. https://supabase.com 에 접속하여 로그인/회원가입
2. "New project" 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호 설정
4. 지역 선택 (Korea 추천)
5. "Create new project" 클릭

### 1.2 데이터베이스 테이블 생성
1. Supabase 대시보드 → SQL Editor
2. "supabase-setup.sql" 파일의 SQL 코드를 모두 복사
3. SQL Editor에 붙여넣기
4. "RUN" 클릭하여 실행

### 1.3 API 키 얻기
1. 프로젝트 설정 → API
2. "Project URL"과 "anon public" 키 복사
3. 프로젝트 폴더의 `.env.local` 파일을 아래와 같이 수정:

```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 2. 로컬 테스트

```bash
npm run dev
```

브라우저에서 http://localhost:3000 에 접속하여 기능 테스트

## 3. GitHub 저장소 생성

1. GitHub (https://github.com) 로그인
2. "New repository" 클릭
3. Repository 이름: `todo-app` (또는 원하는 이름)
4. "Create repository" 클릭
5. 로컬에서 다음 명령어 실행:

```bash
cd /Users/1104310/Desktop/Vibe\ Coding
git init
git add .
git commit -m "Initial commit: To Do app with Supabase"
git branch -M main
git remote add origin https://github.com/your-username/todo-app.git
git push -u origin main
```

## 4. Vercel 배포

### 4.1 Vercel 계정 생성
1. https://vercel.com 접속
2. GitHub로 로그인 (또는 회원가입)
3. "Import Git Repository" 클릭
4. 위에서 생성한 GitHub 저장소 선택

### 4.2 환경 변수 설정
1. "Environment Variables" 섹션
2. 다음을 추가:
   - Name: `VITE_SUPABASE_URL` / Value: `https://your-project-url.supabase.co`
   - Name: `VITE_SUPABASE_ANON_KEY` / Value: `your-anon-key`

### 4.3 배포 시작
1. "Deploy" 클릭
2. 배포 완료 대기
3. 제공된 URL에서 앱 확인

## 5. 배포 후 확인

1. Vercel에서 제공한 URL 방문
2. 브라우저 개발자도구 → Console에서 오류 확인
3. 기능 테스트 (추가, 완료, 삭제)

## 6. 문제 해결

### Supabase 연결 오류
- `.env.local`에서 URL과 키가 정확한지 확인
- 환경 변수 파일명이 정확한지 확인 (`.env.local`)

### 배포 후 데이터가 안 보임
- Vercel의 환경 변수가 올바르게 설정되었는지 확인
- 브라우저 Console에서 오류 메시지 확인
- 로컬 스토리지 백업은 정상 작동함

### 빌드 오류
- `npm run build` 로컬에서 실행하여 오류 확인
- 필요한 패키지 설치 확인: `npm install`

## 7. 추가 기능 (선택사항)

### 7.1 사용자 인증 추가
Supabase Auth를 사용하여 사용자 로그인 기능 추가 가능

### 7.2 실시간 동기화
Supabase Realtime을 사용하여 여러 장치 간 실시간 동기화 구현 가능

### 7.3 백업 및 복구
Supabase에서 자동 백업 설정 가능

---

**완료!** 이제 To Do 앱이 클라우드에 배포되었습니다. 언제 어디서나 접근 가능합니다! 🎉
