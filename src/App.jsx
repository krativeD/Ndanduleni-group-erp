// Add these imports
import Contacts from './pages/crm/Contacts';
import Leads from './pages/crm/Leads';
import Deals from './pages/crm/Deals';
import Activities from './pages/crm/Activities';
import CRMReports from './pages/crm/Reports';

// Add these routes inside the Routes component
<Route path="/crm/contacts" element={
  <ProtectedRoute>
    <Contacts />
  </ProtectedRoute>
} />
<Route path="/crm/leads" element={
  <ProtectedRoute>
    <Leads />
  </ProtectedRoute>
} />
<Route path="/crm/deals" element={
  <ProtectedRoute>
    <Deals />
  </ProtectedRoute>
} />
<Route path="/crm/activities" element={
  <ProtectedRoute>
    <Activities />
  </ProtectedRoute>
} />
<Route path="/crm/reports" element={
  <ProtectedRoute>
    <CRMReports />
  </ProtectedRoute>
} />
