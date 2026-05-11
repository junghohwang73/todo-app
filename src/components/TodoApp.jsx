import React, { useState, useEffect } from 'react'
import '../styles/TodoApp.css'
import { supabase } from '../lib/supabase'

export default function TodoApp() {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(3)
  const [deadline, setDeadline] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  // Supabase 초기화 및 데이터 로드
  useEffect(() => {
    initializeSupabase()
  }, [])

  const initializeSupabase = async () => {
    try {
      // 세션 확인
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user?.id) {
        setUserId(session.user.id)
        loadTodos(session.user.id)
      } else {
        // 익명 사용자 ID 생성
        const anonId = 'anon_' + Math.random().toString(36).substr(2, 9)
        setUserId(anonId)
        loadTodos(anonId)
      }
    } catch (error) {
      console.error('Supabase 초기화 오류:', error)
      // 로컬 스토리지에서 폴백
      loadFromLocalStorage()
    }
  }

  const loadTodos = async (userId) => {
    try {
      setLoading(true)
      
      // 진행 중인 업무 로드
      const { data: activeTodos, error: activeError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .eq('is_completed', false)
        .order('priority', { ascending: false })

      if (activeError) throw activeError

      // 완료된 업무 로드
      const { data: completed, error: completedError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId)
        .eq('is_completed', true)
        .order('completed_date', { ascending: false })

      if (completedError) throw completedError

      setTodos(activeTodos || [])
      setCompletedTodos(completed || [])
    } catch (error) {
      console.error('데이터 로드 오류:', error)
      // 로컬 스토리지에서 폴백
      loadFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos')
    const savedCompleted = localStorage.getItem('completedTodos')
    if (savedTodos) setTodos(JSON.parse(savedTodos))
    if (savedCompleted) setCompletedTodos(JSON.parse(savedCompleted))
  }

  // 로컬 스토리지에도 백업으로 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
  }, [completedTodos])

  // 우선순위에 따라 정렬
  const sortedTodos = [...todos].sort((a, b) => (b.priority || 3) - (a.priority || 3))

  // To Do 항목 추가
  const handleAddTodo = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('업무를 입력해주세요')
      return
    }

    try {
      setLoading(true)
      
      const newTodo = {
        user_id: userId,
        title: title.trim(),
        priority: parseInt(priority),
        deadline: deadline || null,
        created_date: new Date().toISOString().split('T')[0],
        is_completed: false,
      }

      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select()

      if (error) throw error

      if (data && data[0]) {
        setTodos([...todos, data[0]])
      } else {
        // Supabase 오류 시 로컬 저장
        const localTodo = {
          ...newTodo,
          id: Date.now(),
        }
        setTodos([...todos, localTodo])
      }

      setTitle('')
      setPriority(3)
      setDeadline('')
    } catch (error) {
      console.error('To Do 추가 오류:', error)
      // 로컬 저장 폴백
      const localTodo = {
        id: Date.now(),
        title: title.trim(),
        priority: parseInt(priority),
        deadline: deadline || null,
        created_date: new Date().toISOString().split('T')[0],
      }
      setTodos([...todos, localTodo])
      setTitle('')
      setPriority(3)
      setDeadline('')
    } finally {
      setLoading(false)
    }
  }

  // To Do 항목 완료 처리
  const handleCompleteTodo = async (id) => {
    try {
      setLoading(true)
      
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      const completedDate = new Date().toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('todos')
        .update({
          is_completed: true,
          completed_date: completedDate,
        })
        .eq('id', id)
        .select()

      if (error) throw error

      if (data && data[0]) {
        const completedTodo = data[0]
        setCompletedTodos([...completedTodos, completedTodo])
        setTodos(todos.filter(t => t.id !== id))
      }
    } catch (error) {
      console.error('완료 처리 오류:', error)
      // 로컬 처리 폴백
      const todo = todos.find(t => t.id === id)
      if (todo) {
        const completedTodo = {
          ...todo,
          is_completed: true,
          completed_date: new Date().toISOString().split('T')[0],
        }
        setCompletedTodos([...completedTodos, completedTodo])
        setTodos(todos.filter(t => t.id !== id))
      }
    } finally {
      setLoading(false)
    }
  }

  // 완료된 To Do 항목 삭제
  const handleDeleteCompleted = async (id) => {
    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCompletedTodos(completedTodos.filter(t => t.id !== id))
    } catch (error) {
      console.error('삭제 오류:', error)
      // 로컬 삭제 폴백
      setCompletedTodos(completedTodos.filter(t => t.id !== id))
    } finally {
      setLoading(false)
    }
  }

  // To Do 항목 삭제
  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('삭제 오류:', error)
      // 로컬 삭제 폴백
      setTodos(todos.filter(t => t.id !== id))
    } finally {
      setLoading(false)
    }
  }

  const getPriorityLabel = (priority) => {
    const labels = {
      1: '낮음',
      2: '낮음-중간',
      3: '중간',
      4: '중간-높음',
      5: '높음',
    }
    return labels[priority] || '중간'
  }

  const getPriorityClass = (priority) => {
    return `priority-${priority}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
  }

  const isOverdue = (deadline) => {
    if (!deadline) return false
    const today = new Date().toISOString().split('T')[0]
    return deadline < today
  }

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>To Do</h1>
      </header>

      <main className="todo-content">
        {/* 입력 폼 */}
        <section className="input-section">
          <form onSubmit={handleAddTodo} className="add-form">
            <div className="form-row">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="업무를 입력하세요"
                className="input-field"
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="priority">우선순위</label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="priority-select"
                  disabled={loading}
                >
                  <option value={1}>낮음 (1)</option>
                  <option value={2}>낮음-중간 (2)</option>
                  <option value={3}>중간 (3)</option>
                  <option value={4}>중간-높음 (4)</option>
                  <option value={5}>높음 (5)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="deadline">마감일</label>
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="deadline-input"
                  disabled={loading}
                />
              </div>

              <button type="submit" className="add-btn" disabled={loading}>
                {loading ? '처리 중...' : '추가'}
              </button>
            </div>
          </form>
        </section>

        {/* 업무 리스트 */}
        <section className="todos-section">
          {sortedTodos.length === 0 ? (
            <div className="empty-message">업무가 없습니다</div>
          ) : (
            <ul className="todo-list">
              {sortedTodos.map((todo) => (
                <li key={todo.id} className={`todo-item ${getPriorityClass(todo.priority)}`}>
                  <div className="todo-header-item">
                    <div className="todo-info">
                      <h3 className="todo-title">{todo.title}</h3>
                      <div className="todo-meta">
                        <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                          {getPriorityLabel(todo.priority)}
                        </span>
                        {todo.deadline && (
                          <span className={`deadline-badge ${isOverdue(todo.deadline) ? 'overdue' : ''}`}>
                            마감: {formatDate(todo.deadline)}
                            {isOverdue(todo.deadline) && <span className="overdue-text"> (기한 경과)</span>}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="todo-actions">
                      <button
                        onClick={() => handleCompleteTodo(todo.id)}
                        className="complete-btn"
                        title="완료"
                        disabled={loading}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="delete-btn"
                        title="삭제"
                        disabled={loading}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 완료된 업무 섹션 */}
        <section className="completed-section">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="toggle-btn"
          >
            <span className="toggle-text">완료된 업무 ({completedTodos.length})</span>
            <span className={`toggle-icon ${showCompleted ? 'open' : ''}`}>▼</span>
          </button>

          {showCompleted && (
            <div className="completed-list-wrapper">
              {completedTodos.length === 0 ? (
                <div className="empty-message">완료된 업무가 없습니다</div>
              ) : (
                <ul className="todo-list completed">
                  {completedTodos.map((todo) => (
                    <li key={todo.id} className="todo-item completed-item">
                      <div className="todo-header-item">
                        <div className="todo-info">
                          <h3 className="todo-title completed-title">{todo.title}</h3>
                          <div className="todo-meta">
                            <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                              {getPriorityLabel(todo.priority)}
                            </span>
                            {todo.deadline && (
                              <span className="deadline-badge">
                                마감: {formatDate(todo.deadline)}
                              </span>
                            )}
                            <span className="completed-date">
                              완료: {formatDate(todo.completed_date)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCompleted(todo.id)}
                          className="delete-btn"
                          title="삭제"
                          disabled={loading}
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
