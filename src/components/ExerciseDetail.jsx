import React from 'react'

export default function ExerciseDetail({ day, completedExercises, onExerciseComplete }) {
  if (!day) {
    return <div className="exercise-section empty">날짜를 선택해주세요</div>
  }

  return (
    <div className="exercise-section">
      <div className="exercise-header">
        <h2>Day {day.dayNumber} 운동 계획</h2>
        <div className="day-info">
          <span className={`phase-badge phase-${day.phase === '기본' ? '1' : day.phase === '초기 강화' ? '2' : '3'}`}>
            {day.phase}
          </span>
          <span className="focus-area">중점: {day.focus}</span>
        </div>
      </div>

      <div className="exercise-list">
        {day.exercises.map((exercise) => {
          const isCompleted = completedExercises[`${day.dayNumber}-${exercise.id}`]
          return (
            <div key={exercise.id} className={`exercise-item ${isCompleted ? 'completed' : ''}`}>
              <div className="exercise-checkbox">
                <input
                  type="checkbox"
                  id={`exercise-${day.dayNumber}-${exercise.id}`}
                  checked={isCompleted || false}
                  onChange={() => onExerciseComplete(day.dayNumber, exercise.id)}
                />
                <label htmlFor={`exercise-${day.dayNumber}-${exercise.id}`}></label>
              </div>

              <div className="exercise-content">
                <div className="exercise-name">{exercise.name}</div>
                <div className="exercise-details">
                  <span className="detail-item">
                    <strong>반복:</strong> {exercise.repetitions}
                  </span>
                  <span className="detail-item">
                    <strong>시간:</strong> {exercise.duration}
                  </span>
                  <span className={`detail-item intensity ${exercise.intensity}`}>
                    <strong>강도:</strong> {exercise.intensity}
                  </span>
                </div>
              </div>

              {exercise.notes && (
                <div className="exercise-notes">
                  <strong>📝 주의:</strong> {exercise.notes}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="exercise-tips">
        <h3>💡 오늘의 팁</h3>
        <p>{day.tips}</p>
      </div>
    </div>
  )
}
