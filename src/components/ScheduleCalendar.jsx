import React from 'react'

export default function ScheduleCalendar({ schedule, selectedDay, onSelectDay }) {
  // 7개씩 묶어서 주 단위로 표시
  const weeks = []
  for (let i = 0; i < schedule.length; i += 7) {
    weeks.push(schedule.slice(i, i + 7))
  }

  return (
    <div className="calendar-section">
      <h2>50일 스케줄</h2>
      <div className="calendar-grid">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            <div className="week-number">
              <span className="week-label">주 {weekIndex + 1}</span>
            </div>
            <div className="days-row">
              {week.map(day => (
                <button
                  key={day.dayNumber}
                  className={`day-btn ${selectedDay === day.dayNumber ? 'selected' : ''} ${day.phase === '기본' ? 'phase-1' : day.phase === '초기 강화' ? 'phase-2' : 'phase-3'}`}
                  onClick={() => onSelectDay(day.dayNumber)}
                  title={`${day.dayNumber}일차: ${day.focus}`}
                >
                  <span className="day-number">{day.dayNumber}</span>
                  <span className="day-phase">{day.phase.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="phase-legend">
        <div className="legend-item">
          <div className="legend-color phase-1"></div>
          <span>기본 (1-14일)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color phase-2"></div>
          <span>초기 강화 (15-28일)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color phase-3"></div>
          <span>고급 (29-50일)</span>
        </div>
      </div>
    </div>
  )
}
