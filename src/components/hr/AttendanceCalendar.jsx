import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './AttendanceCalendar.module.css';

const AttendanceCalendar = ({ attendance }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayStatus = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = attendance.find(a => a.date === dateStr);
    return record?.status || null;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDayStatus(day);
      const isToday = day === new Date().getDate() && 
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();
      
      days.push(
        <div
          key={day}
          className={`${styles.day} ${status ? styles[status] : ''} ${isToday ? styles.today : ''}`}
          onClick={() => setSelectedDate(day)}
        >
          <span>{day}</span>
          {status && <span className={styles.statusDot}></span>}
        </div>
      );
    }
    
    return days;
  };

  const getSummary = () => {
    const monthAttendance = attendance.filter(a => {
      const date = new Date(a.date);
      return date.getMonth() === currentDate.getMonth() &&
             date.getFullYear() === currentDate.getFullYear();
    });
    
    return {
      present: monthAttendance.filter(a => a.status === 'present').length,
      absent: monthAttendance.filter(a => a.status === 'absent').length,
      late: monthAttendance.filter(a => a.status === 'late').length
    };
  };

  const summary = getSummary();

  return (
    <Card className={styles.calendarCard}>
      <div className={styles.calendarHeader}>
        <div className={styles.monthSelector}>
          <button onClick={prevMonth} className={styles.monthBtn}>←</button>
          <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={nextMonth} className={styles.monthBtn}>→</button>
        </div>
        <Button variant="primary" size="small">Clock In/Out</Button>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Present</span>
          <span className={styles.summaryValue} style={{ color: '#10b981' }}>{summary.present}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Absent</span>
          <span className={styles.summaryValue} style={{ color: '#ef4444' }}>{summary.absent}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Late</span>
          <span className={styles.summaryValue} style={{ color: '#f59e0b' }}>{summary.late}</span>
        </div>
      </div>

      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {dayNames.map(day => (
            <div key={day} className={styles.weekday}>{day}</div>
          ))}
        </div>
        <div className={styles.days}>
          {renderCalendarDays()}
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.present}`}></span>
          <span>Present</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.absent}`}></span>
          <span>Absent</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.late}`}></span>
          <span>Late</span>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceCalendar;
