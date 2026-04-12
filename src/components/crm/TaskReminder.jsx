import React from 'react';
import Card from '../common/Card';
import styles from './TaskReminder.module.css';

const TaskReminder = ({ tasks }) => {
  return (
    <Card className={styles.taskCard}>
      <div className={styles.header}>
        <h3>Upcoming Tasks</h3>
      </div>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskCheckbox}>
              <input type="checkbox" />
            </div>
            <div className={styles.taskContent}>
              <span className={styles.taskTitle}>{task.subject}</span>
              <span className={styles.taskMeta}>{task.contact} • {task.company}</span>
              <span className={styles.taskDue}>
                📅 {task.date} at {task.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaskReminder;
