// Mock data for Services Module (Cleaning Operations)

export const getMockScheduledJobs = () => [
  { id: 1, client: 'Sandton City Mall', service: 'Deep Clean', area: 'Food Court', date: '2026-04-15', time: '06:00', duration: '4 hours', team: 'Team Alpha', status: 'scheduled', priority: 'high' },
  { id: 2, client: 'Menlyn Park', service: 'Daily Maintenance', area: 'Restrooms', date: '2026-04-15', time: '08:00', duration: '2 hours', team: 'Team Beta', status: 'in-progress', priority: 'medium' },
  { id: 3, client: 'V&A Waterfront', service: 'Window Cleaning', area: 'Atrium', date: '2026-04-15', time: '09:30', duration: '3 hours', team: 'Team Gamma', status: 'scheduled', priority: 'medium' },
  { id: 4, client: 'Gateway Theatre', service: 'Carpet Cleaning', area: 'Auditorium', date: '2026-04-16', time: '07:00', duration: '5 hours', team: 'Team Alpha', status: 'scheduled', priority: 'high' },
  { id: 5, client: 'Fourways Mall', service: 'Floor Buffing', area: 'Main Concourse', date: '2026-04-16', time: '22:00', duration: '6 hours', team: 'Team Delta', status: 'scheduled', priority: 'low' },
  { id: 6, client: 'Brooklyn Mall', service: 'Daily Maintenance', area: 'Offices', date: '2026-04-15', time: '14:00', duration: '2 hours', team: 'Team Beta', status: 'completed', priority: 'medium' },
  { id: 7, client: 'Clearwater Mall', service: 'Sanitization', area: 'Play Area', date: '2026-04-15', time: '11:00', duration: '1.5 hours', team: 'Team Gamma', status: 'pending', priority: 'urgent' }
];

export const getMockTeams = () => [
  { id: 1, name: 'Team Alpha', leader: 'John Mbeki', members: ['Sarah Ndlovu', 'Mike Khumalo'], status: 'active', current_job: 'Sandton City Mall', equipment: ['Floor Buffer', 'Vacuum'] },
  { id: 2, name: 'Team Beta', leader: 'Emily Zulu', members: ['Peter Nkosi', 'Linda Sithole'], status: 'active', current_job: 'Menlyn Park', equipment: ['Mop Set', 'Cleaning Caddy'] },
  { id: 3, name: 'Team Gamma', leader: 'Grace Dlamini', members: ['David Mthembu', 'Thabo Molefe'], status: 'active', current_job: 'V&A Waterfront', equipment: ['Window Kit', 'Pressure Washer'] },
  { id: 4, name: 'Team Delta', leader: 'Sipho Ndlovu', members: ['Lerato Mokoena', 'Nomsa Dube'], status: 'standby', current_job: null, equipment: ['Floor Scrubber', 'Polisher'] }
];

export const getMockEquipment = () => [
  { id: 1, name: 'Industrial Floor Buffer', serial: 'BUF-2023-001', condition: 'good', last_service: '2026-03-10', next_service: '2026-05-10', assigned_to: 'Team Alpha', status: 'in-use' },
  { id: 2, name: 'Commercial Vacuum', serial: 'VAC-2023-008', condition: 'excellent', last_service: '2026-04-01', next_service: '2026-06-01', assigned_to: 'Team Alpha', status: 'in-use' },
  { id: 3, name: 'Pressure Washer', serial: 'PW-2024-003', condition: 'good', last_service: '2026-02-15', next_service: '2026-04-15', assigned_to: 'Team Gamma', status: 'needs-service' },
  { id: 4, name: 'Floor Scrubber', serial: 'SCR-2023-005', condition: 'fair', last_service: '2026-01-20', next_service: '2026-03-20', assigned_to: 'Team Delta', status: 'available' },
  { id: 5, name: 'Carpet Extractor', serial: 'EXT-2024-001', condition: 'good', last_service: '2026-03-25', next_service: '2026-05-25', assigned_to: null, status: 'available' }
];

export const getMockChemicals = () => [
  { id: 1, name: 'Multi-Surface Cleaner', type: 'Cleaner', quantity: 45, unit: 'L', min_stock: 20, location: 'Store A', supplier: 'CleanCo SA', last_ordered: '2026-04-01' },
  { id: 2, name: 'Floor Stripper', type: 'Stripper', quantity: 12, unit: 'L', min_stock: 10, location: 'Store B', supplier: 'ChemSupply', last_ordered: '2026-03-15' },
  { id: 3, name: 'Disinfectant', type: 'Sanitizer', quantity: 8, unit: 'L', min_stock: 15, location: 'Store A', supplier: 'CleanCo SA', last_ordered: '2026-04-10', status: 'low' },
  { id: 4, name: 'Glass Cleaner', type: 'Cleaner', quantity: 28, unit: 'L', min_stock: 10, location: 'Store C', supplier: 'Shine Supplies', last_ordered: '2026-03-28' },
  { id: 5, name: 'Carpet Shampoo', type: 'Shampoo', quantity: 5, unit: 'L', min_stock: 8, location: 'Store B', supplier: 'ChemSupply', last_ordered: '2026-03-01', status: 'critical' },
  { id: 6, name: 'Degreaser', type: 'Degreaser', quantity: 22, unit: 'L', min_stock: 15, location: 'Store A', supplier: 'CleanCo SA', last_ordered: '2026-04-05' }
];

export const getMockQualityChecks = () => [
  { id: 1, job_id: 1, client: 'Sandton City Mall', inspector: 'Quality Manager', date: '2026-04-15', score: 95, items: ['Floor Cleanliness', 'Restroom Sanitation', 'Surface Dusting'], status: 'passed', notes: 'Excellent work, all areas spotless' },
  { id: 2, job_id: 6, client: 'Brooklyn Mall', inspector: 'Quality Manager', date: '2026-04-15', score: 88, items: ['Floor Cleanliness', 'Window Streaks', 'Trash Removal'], status: 'passed', notes: 'Minor streaks on windows, otherwise good' },
  { id: 3, job_id: 2, client: 'Menlyn Park', inspector: 'Team Leader', date: '2026-04-15', score: 92, items: ['Restroom Cleanliness', 'Supply Restocking', 'Floor Mopping'], status: 'passed', notes: 'All standards met' }
];

export const getMockFeedback = () => [
  { id: 1, client: 'Sandton City Mall', rating: 5, comment: 'Outstanding service! The team was professional and thorough.', date: '2026-04-10', job_id: 1 },
  { id: 2, client: 'Brooklyn Mall', rating: 4, comment: 'Good service, but windows could be cleaner.', date: '2026-04-12', job_id: 6 },
  { id: 3, client: 'Menlyn Park', rating: 5, comment: 'Very satisfied with the daily maintenance.', date: '2026-04-14', job_id: 2 },
  { id: 4, client: 'V&A Waterfront', rating: 5, comment: 'Excellent window cleaning, great attention to detail.', date: '2026-04-09', job_id: 3 }
];
