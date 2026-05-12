import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey)
  } catch (e) {
    console.error('[Supabase] 클라이언트 초기화 실패:', e)
  }
} else {
  console.warn(
    '[Supabase] 환경 변수(VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)가 비어 있습니다. ' +
    '클라우드 동기화가 비활성화되고 로컬 스토리지 모드로만 동작합니다.'
  )
}

export const supabase = client
export const hasSupabase = client !== null
