// Add these imports at the top
import Employees from './pages/hr/Employees';
import Attendance from './pages/hr/Attendance';
import LeaveManagement from './pages/hr/LeaveManagement';
import Payroll from './pages/hr/Payroll';
import Recruitment from './pages/hr/Recruitment';
import Performance from './pages/hr/Performance';
import Training from './pages/hr/Training';

// Add these routes inside the Routes component
<Route path="/hr/employees" element={
  <ProtectedRoute>
    <Employees />
  </ProtectedRoute>
} />
<Route path="/hr/attendance" element={
  <ProtectedRoute>
    <Attendance />
  </ProtectedRoute>
} />
<Route path="/hr/leave" element={
  <ProtectedRoute>
    <LeaveManagement />
  </ProtectedRoute>
} />
<Route path="/hr/payroll" element={
  <ProtectedRoute>
    <Payroll />
  </ProtectedRoute>
} />
<Route path="/hr/recruitment" element={
  <ProtectedRoute>
    <Recruitment />
  </ProtectedRoute>
} />
<Route path="/hr/performance" element={
  <ProtectedRoute>
    <Performance />
  </ProtectedRoute>
} />
<Route path="/hr/training" element={
  <ProtectedRoute>
    <Training />
  </ProtectedRoute>
} />
