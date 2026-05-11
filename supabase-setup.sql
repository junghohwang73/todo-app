-- Supabase에서 실행할 SQL 스크립트
-- 아래 코드를 Supabase SQL Editor에 복사하여 실행해주세요

-- todos 테이블 생성
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 3,
  deadline DATE,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성 (쿼리 성능 향상)
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_is_completed ON todos(is_completed);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos(priority);

-- RLS (Row Level Security) 활성화
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- RLS 정책 (모든 사용자가 자신의 데이터만 접근)
CREATE POLICY "Users can see their own todos" 
  ON todos FOR SELECT 
  USING (TRUE);

CREATE POLICY "Users can insert their own todos" 
  ON todos FOR INSERT 
  WITH CHECK (TRUE);

CREATE POLICY "Users can update their own todos" 
  ON todos FOR UPDATE 
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "Users can delete their own todos" 
  ON todos FOR DELETE 
  USING (TRUE);
