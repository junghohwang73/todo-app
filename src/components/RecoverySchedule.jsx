import React, { useState } from 'react'
import ScheduleCalendar from './ScheduleCalendar'
import ExerciseDetail from './ExerciseDetail'
import { generateRecoverySchedule } from '../utils/scheduleGenerator'

export default function RecoverySchedule() {
  const [schedule, setSchedule] = useState(generateRecoverySchedule())
  const [selectedDay, setSelectedDay] = useState(1)
  const [completedExercises, setCompletedExercises] = useState({})

  const handleExerciseComplete = (day, exerciseId) => {
    const key = `${day}-${exerciseId}`
    setCompletedExercises(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const currentDay = schedule.find(day => day.dayNumber === selectedDay)
  const completionRate = Object.values(completedExercises).filter(Boolean).length

  return (
    <div className="recovery-app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏥 경추 수술 재활 운동 스케줄</h1>
          <p className="subtitle">수술 후 45일 경과, 향후 50일 운동 프로그램</p>
        </div>
      </header>

      <main className="app-main">
        <div className="stats-section">
          <div className="stat-card">
            <h3>현재 일차</h3>
            <p className="stat-value">{selectedDay} / 50</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(selectedDay / 50) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>완료한 운동</h3>
            <p className="stat-value">{completionRate}</p>
          </div>

          <div className="stat-card">
            <h3>현재 단계</h3>
            <p className="stat-value">{currentDay?.phase || '-'}</p>
          </div>
        </div>

        <div className="schedule-container">
          <ScheduleCalendar 
            schedule={schedule}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          
          <ExerciseDetail 
            day={currentDay}
            completedExercises={completedExercises}
            onExerciseComplete={handleExerciseComplete}
          />
        </div>
      </main>
    </div>
  )
}
