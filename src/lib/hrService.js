import { supabase } from './supabaseClient';

// Employees
export const fetchEmployees = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createEmployee = async (employeeData) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: employeeData.email,
    password: employeeData.password,
    email_confirm: true,
    user_metadata: {
      full_name: employeeData.full_name,
      role: employeeData.role
    }
  });
  
  if (error) throw error;
  return data;
};

export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
  return data;
};

export const deleteEmployee = async (id) => {
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) throw error;
  return true;
};

// Attendance
export const fetchAttendance = async (startDate, endDate) => {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      employee:profiles(full_name, email)
    `)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const clockIn = async (employeeId) => {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('attendance')
    .insert([{
      employee_id: employeeId,
      date: today,
      clock_in: now,
      status: 'present'
    }]);
  
  if (error) throw error;
  return data;
};

export const clockOut = async (attendanceId) => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('attendance')
    .update({ clock_out: now })
    .eq('id', attendanceId);
  
  if (error) throw error;
  return data;
};

// Leave Management
export const fetchLeaveRequests = async (status = null) => {
  let query = supabase
    .from('leave_requests')
    .select(`
      *,
      employee:profiles(full_name, email)
    `)
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createLeaveRequest = async (requestData) => {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert([requestData]);
  
  if (error) throw error;
  return data;
};

export const updateLeaveRequest = async (id, updates) => {
  const { data, error } = await supabase
    .from('leave_requests')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
  return data;
};

// Payroll
export const fetchPayrollRecords = async (month, year) => {
  const { data, error } = await supabase
    .from('payroll')
    .select(`
      *,
      employee:profiles(full_name, email)
    `)
    .eq('month', month)
    .eq('year', year)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Mock data for demonstration
export const getMockEmployees = () => [
  { id: 1, full_name: 'John Mbeki', email: 'john.m@ndanduleni.com', role: 'admin', department: 'Operations', status: 'active', join_date: '2023-01-15' },
  { id: 2, full_name: 'Sarah Ndlovu', email: 'sarah.n@ndanduleni.com', role: 'staff', department: 'Cleaning', status: 'active', join_date: '2023-03-20' },
  { id: 3, full_name: 'Mike Khumalo', email: 'mike.k@ndanduleni.com', role: 'staff', department: 'Maintenance', status: 'active', join_date: '2023-06-10' },
  { id: 4, full_name: 'Emily Zulu', email: 'emily.z@ndanduleni.com', role: 'admin', department: 'HR', status: 'active', join_date: '2022-11-05' },
  { id: 5, full_name: 'David Mthembu', email: 'david.m@ndanduleni.com', role: 'staff', department: 'Cleaning', status: 'on_leave', join_date: '2023-08-01' },
  { id: 6, full_name: 'Grace Dlamini', email: 'grace.d@ndanduleni.com', role: 'staff', department: 'Supervisor', status: 'active', join_date: '2023-02-14' },
  { id: 7, full_name: 'Peter Nkosi', email: 'peter.n@ndanduleni.com', role: 'staff', department: 'Cleaning', status: 'active', join_date: '2023-09-22' },
  { id: 8, full_name: 'Linda Sithole', email: 'linda.s@ndanduleni.com', role: 'admin', department: 'Finance', status: 'active', join_date: '2023-04-18' }
];

export const getMockAttendance = () => [
  { id: 1, employee: 'John Mbeki', date: '2026-04-11', clock_in: '08:00', clock_out: '17:00', status: 'present', hours: 8 },
  { id: 2, employee: 'Sarah Ndlovu', date: '2026-04-11', clock_in: '08:15', clock_out: '17:00', status: 'present', hours: 7.75 },
  { id: 3, employee: 'Mike Khumalo', date: '2026-04-11', clock_in: '08:30', clock_out: '16:45', status: 'present', hours: 7.25 },
  { id: 4, employee: 'Emily Zulu', date: '2026-04-11', clock_in: '08:00', clock_out: '17:00', status: 'present', hours: 8 },
  { id: 5, employee: 'David Mthembu', date: '2026-04-11', clock_in: null, clock_out: null, status: 'absent', hours: 0 }
];

export const getMockLeaveRequests = () => [
  { id: 1, employee: 'David Mthembu', type: 'Annual', start_date: '2026-04-15', end_date: '2026-04-22', days: 5, status: 'pending', reason: 'Family vacation' },
  { id: 2, employee: 'Sarah Ndlovu', type: 'Sick', start_date: '2026-04-10', end_date: '2026-04-12', days: 2, status: 'approved', reason: 'Medical appointment' },
  { id: 3, employee: 'Peter Nkosi', type: 'Annual', start_date: '2026-05-01', end_date: '2026-05-05', days: 3, status: 'approved', reason: 'Personal' },
  { id: 4, employee: 'Grace Dlamini', type: 'Unpaid', start_date: '2026-04-20', end_date: '2026-04-22', days: 2, status: 'pending', reason: 'Family emergency' }
];
