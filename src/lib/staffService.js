// Staff Management Service with localStorage persistence

const STORAGE_KEYS = {
  STAFF_LEAVE: 'ndanduleni_staff_leave',
  STAFF_JOBS: 'ndanduleni_staff_jobs',
  STAFF_ATTENDANCE: 'ndanduleni_staff_attendance',
  STAFF_PERFORMANCE: 'ndanduleni_staff_performance',
  STAFF_TRAINING: 'ndanduleni_staff_training'
};

// Initialize default data
const initializeStaffData = () => {
  // Leave Requests
  if (!localStorage.getItem(STORAGE_KEYS.STAFF_LEAVE)) {
    const defaultLeave = [
      { id: 1, employee: 'John Mbeki', type: 'Annual', startDate: '2026-05-01', endDate: '2026-05-05', days: 5, reason: 'Family vacation', status: 'approved', appliedOn: '2026-04-10', approvedBy: 'CEO' },
      { id: 2, employee: 'Sarah Ndlovu', type: 'Sick', startDate: '2026-04-20', endDate: '2026-04-22', days: 3, reason: 'Medical appointment', status: 'approved', appliedOn: '2026-04-18', approvedBy: 'Admin' },
      { id: 3, employee: 'Mike Khumalo', type: 'Annual', startDate: '2026-05-15', endDate: '2026-05-20', days: 6, reason: 'Wedding', status: 'pending', appliedOn: '2026-04-14', approvedBy: null },
      { id: 4, employee: 'Emily Zulu', type: 'Unpaid', startDate: '2026-04-25', endDate: '2026-04-28', days: 4, reason: 'Personal reasons', status: 'pending', appliedOn: '2026-04-15', approvedBy: null },
      { id: 5, employee: 'Grace Dlamini', type: 'Annual', startDate: '2026-04-10', endDate: '2026-04-12', days: 3, reason: 'Child care', status: 'rejected', appliedOn: '2026-04-05', approvedBy: 'Admin' }
    ];
    localStorage.setItem(STORAGE_KEYS.STAFF_LEAVE, JSON.stringify(defaultLeave));
  }

  // Job Assignments
  if (!localStorage.getItem(STORAGE_KEYS.STAFF_JOBS)) {
    const defaultJobs = [
      { id: 1, employee: 'John Mbeki', jobTitle: 'Operations Manager', department: 'Operations', supervisor: 'CEO', startDate: '2025-01-15', status: 'active', currentProject: 'Sandton City Mall', workload: 85 },
      { id: 2, employee: 'Sarah Ndlovu', jobTitle: 'Senior Cleaner', department: 'Cleaning', supervisor: 'John Mbeki', startDate: '2025-03-20', status: 'active', currentProject: 'Menlyn Park', workload: 70 },
      { id: 3, employee: 'Mike Khumalo', jobTitle: 'Maintenance Technician', department: 'Maintenance', supervisor: 'John Mbeki', startDate: '2025-06-10', status: 'active', currentProject: 'V&A Waterfront', workload: 60 },
      { id: 4, employee: 'Emily Zulu', jobTitle: 'HR Administrator', department: 'HR', supervisor: 'CEO', startDate: '2024-11-05', status: 'active', currentProject: 'Internal', workload: 90 },
      { id: 5, employee: 'David Mthembu', jobTitle: 'Cleaner', department: 'Cleaning', supervisor: 'Sarah Ndlovu', startDate: '2025-08-01', status: 'on-leave', currentProject: null, workload: 0 },
      { id: 6, employee: 'Grace Dlamini', jobTitle: 'Supervisor', department: 'Operations', supervisor: 'John Mbeki', startDate: '2025-02-14', status: 'active', currentProject: 'Fourways Mall', workload: 75 }
    ];
    localStorage.setItem(STORAGE_KEYS.STAFF_JOBS, JSON.stringify(defaultJobs));
  }

  // Attendance Records
  if (!localStorage.getItem(STORAGE_KEYS.STAFF_ATTENDANCE)) {
    const defaultAttendance = [
      { id: 1, employee: 'John Mbeki', date: '2026-04-15', clockIn: '07:55', clockOut: '17:05', hours: 8.2, status: 'present', overtime: 0.2 },
      { id: 2, employee: 'Sarah Ndlovu', date: '2026-04-15', clockIn: '08:10', clockOut: '16:55', hours: 7.8, status: 'present', overtime: 0 },
      { id: 3, employee: 'Mike Khumalo', date: '2026-04-15', clockIn: '08:30', clockOut: '17:00', hours: 7.5, status: 'present', overtime: 0 },
      { id: 4, employee: 'Emily Zulu', date: '2026-04-15', clockIn: '07:50', clockOut: '17:10', hours: 8.3, status: 'present', overtime: 0.3 },
      { id: 5, employee: 'David Mthembu', date: '2026-04-15', clockIn: null, clockOut: null, hours: 0, status: 'absent', overtime: 0 }
    ];
    localStorage.setItem(STORAGE_KEYS.STAFF_ATTENDANCE, JSON.stringify(defaultAttendance));
  }

  // Performance Reviews
  if (!localStorage.getItem(STORAGE_KEYS.STAFF_PERFORMANCE)) {
    const defaultPerformance = [
      { id: 1, employee: 'John Mbeki', reviewPeriod: 'Q1 2026', reviewDate: '2026-03-15', reviewer: 'CEO', rating: 4.5, strengths: 'Leadership', improvements: 'Delegation', goals: 'Complete Q2 projects', status: 'completed' },
      { id: 2, employee: 'Sarah Ndlovu', reviewPeriod: 'Q1 2026', reviewDate: '2026-03-10', reviewer: 'John Mbeki', rating: 4.8, strengths: 'Quality', improvements: 'Time management', goals: 'Train new staff', status: 'completed' },
      { id: 3, employee: 'Emily Zulu', reviewPeriod: 'Q2 2026', reviewDate: '2026-05-01', reviewer: 'CEO', rating: null, strengths: '', improvements: '', goals: '', status: 'scheduled' }
    ];
    localStorage.setItem(STORAGE_KEYS.STAFF_PERFORMANCE, JSON.stringify(defaultPerformance));
  }

  // Training Records
  if (!localStorage.getItem(STORAGE_KEYS.STAFF_TRAINING)) {
    const defaultTraining = [
      { id: 1, employee: 'John Mbeki', course: 'Leadership Excellence', provider: 'Business School', startDate: '2026-02-01', endDate: '2026-02-05', status: 'completed', certificate: 'Yes', cost: 8500 },
      { id: 2, employee: 'Sarah Ndlovu', course: 'Advanced Cleaning', provider: 'CleanPro', startDate: '2026-03-10', endDate: '2026-03-12', status: 'completed', certificate: 'Yes', cost: 3200 },
      { id: 3, employee: 'Mike Khumalo', course: 'Equipment Maintenance', provider: 'TechTrain', startDate: '2026-05-01', endDate: '2026-05-03', status: 'enrolled', certificate: 'Pending', cost: 4500 }
    ];
    localStorage.setItem(STORAGE_KEYS.STAFF_TRAINING, JSON.stringify(defaultTraining));
  }
};

initializeStaffData();

// Helper functions
export const getStaffData = (section) => {
  const key = STORAGE_KEYS[section];
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveStaffData = (section, data) => {
  const key = STORAGE_KEYS[section];
  if (key) localStorage.setItem(key, JSON.stringify(data));
};

// Summary stats
export const getStaffSummary = () => {
  const jobs = getStaffData('STAFF_JOBS');
  const leave = getStaffData('STAFF_LEAVE');
  const attendance = getStaffData('STAFF_ATTENDANCE');
  const today = new Date().toISOString().split('T')[0];
  
  return {
    totalStaff: jobs.filter(j => j.status === 'active').length,
    onLeave: jobs.filter(j => j.status === 'on-leave').length,
    presentToday: attendance.filter(a => a.date === today && a.status === 'present').length,
    pendingLeave: leave.filter(l => l.status === 'pending').length,
    pendingReviews: getStaffData('STAFF_PERFORMANCE').filter(p => p.status === 'scheduled').length,
    activeTraining: getStaffData('STAFF_TRAINING').filter(t => t.status === 'in-progress' || t.status === 'enrolled').length
  };
};
