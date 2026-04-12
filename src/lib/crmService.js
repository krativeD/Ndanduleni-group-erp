// Mock data for CRM Module
export const getMockContacts = () => [
  { id: 1, name: 'Sandton City Mall', type: 'client', email: 'facilities@sandtoncity.co.za', phone: '011 783 4000', status: 'active', address: 'Sandton, Johannesburg', contact_person: 'James Mabena', last_contact: '2026-04-10' },
  { id: 2, name: 'Menlyn Park', type: 'client', email: 'ops@menlynpark.co.za', phone: '012 368 9000', status: 'active', address: 'Pretoria', contact_person: 'Sarah Pretorius', last_contact: '2026-04-11' },
  { id: 3, name: 'Gateway Theatre', type: 'lead', email: 'info@gateway.co.za', phone: '031 566 2332', status: 'prospect', address: 'Umhlanga, Durban', contact_person: 'Rajesh Govender', last_contact: '2026-04-09' },
  { id: 4, name: 'V&A Waterfront', type: 'client', email: 'admin@waterfront.co.za', phone: '021 408 7600', status: 'active', address: 'Cape Town', contact_person: 'Michelle Adams', last_contact: '2026-04-08' },
  { id: 5, name: 'Fourways Mall', type: 'lead', email: 'management@fourwaysmall.co.za', phone: '011 465 8000', status: 'negotiation', address: 'Fourways, Johannesburg', contact_person: 'Thabo Nkosi', last_contact: '2026-04-07' },
  { id: 6, name: 'Brooklyn Mall', type: 'client', email: 'info@brooklynmall.co.za', phone: '012 346 1063', status: 'inactive', address: 'Brooklyn, Pretoria', contact_person: 'Linda van Wyk', last_contact: '2026-03-15' },
  { id: 7, name: 'Clearwater Mall', type: 'lead', email: 'contact@clearwatermall.co.za', phone: '011 675 3006', status: 'new', address: 'Roodepoort', contact_person: 'Sipho Dlamini', last_contact: '2026-04-12' },
  { id: 8, name: 'Canal Walk', type: 'partner', email: 'partners@canalwalk.co.za', phone: '021 555 3600', status: 'active', address: 'Century City, Cape Town', contact_person: 'Fatima Abrahams', last_contact: '2026-04-05' }
];

export const getMockLeads = () => [
  { id: 1, name: 'Gateway Theatre', company: 'Gateway', value: 45000, stage: 'prospect', probability: 30, expected_close: '2026-05-15', owner: 'John Mbeki' },
  { id: 2, name: 'Fourways Mall', company: 'Fourways', value: 125000, stage: 'negotiation', probability: 70, expected_close: '2026-04-30', owner: 'Emily Zulu' },
  { id: 3, name: 'Clearwater Mall', company: 'Clearwater', value: 35000, stage: 'new', probability: 10, expected_close: '2026-06-01', owner: 'Sarah Ndlovu' },
  { id: 4, name: 'Eastgate Shopping Centre', company: 'Eastgate', value: 85000, stage: 'qualified', probability: 50, expected_close: '2026-05-20', owner: 'John Mbeki' },
  { id: 5, name: 'Mall of Africa', company: 'MOA', value: 200000, stage: 'proposal', probability: 60, expected_close: '2026-05-10', owner: 'Emily Zulu' }
];

export const getMockDeals = () => [
  { id: 1, name: 'Sandton City - Q2 Contract', client: 'Sandton City Mall', value: 350000, stage: 'closed-won', close_date: '2026-03-15', owner: 'John Mbeki' },
  { id: 2, name: 'Menlyn Park Annual', client: 'Menlyn Park', value: 180000, stage: 'closed-won', close_date: '2026-02-28', owner: 'Emily Zulu' },
  { id: 3, name: 'V&A Waterfront Extension', client: 'V&A Waterfront', value: 275000, stage: 'negotiation', close_date: '2026-04-25', owner: 'Sarah Ndlovu' },
  { id: 4, name: 'Brooklyn Mall Renewal', client: 'Brooklyn Mall', value: 95000, stage: 'proposal', close_date: '2026-04-20', owner: 'John Mbeki' }
];

export const getMockActivities = () => [
  { id: 1, type: 'call', subject: 'Follow up on proposal', contact: 'James Mabena', company: 'Sandton City', date: '2026-04-12', time: '10:00', status: 'completed', notes: 'Discussed contract terms' },
  { id: 2, type: 'meeting', subject: 'Site inspection', contact: 'Rajesh Govender', company: 'Gateway Theatre', date: '2026-04-13', time: '14:00', status: 'pending', notes: 'Tour of facilities' },
  { id: 3, type: 'email', subject: 'Send service catalogue', contact: 'Thabo Nkosi', company: 'Fourways Mall', date: '2026-04-11', time: '09:30', status: 'completed', notes: 'Catalogue sent with pricing' },
  { id: 4, type: 'task', subject: 'Prepare contract', contact: 'Michelle Adams', company: 'V&A Waterfront', date: '2026-04-14', time: '11:00', status: 'pending', notes: 'Draft service agreement' },
  { id: 5, type: 'call', subject: 'Introduction call', contact: 'Sipho Dlamini', company: 'Clearwater Mall', date: '2026-04-15', time: '09:00', status: 'pending', notes: 'Initial outreach' }
];

export const getMockCommunications = () => [
  { id: 1, contact: 'James Mabena', company: 'Sandton City', channel: 'Phone', direction: 'outbound', summary: 'Discussed Q2 contract renewal', date: '2026-04-10', user: 'John Mbeki' },
  { id: 2, contact: 'Sarah Pretorius', company: 'Menlyn Park', channel: 'Email', direction: 'inbound', summary: 'Inquiry about additional services', date: '2026-04-11', user: 'Emily Zulu' },
  { id: 3, contact: 'Rajesh Govender', company: 'Gateway Theatre', channel: 'Meeting', direction: 'outbound', summary: 'Initial consultation', date: '2026-04-09', user: 'Sarah Ndlovu' },
  { id: 4, contact: 'Thabo Nkosi', company: 'Fourways Mall', channel: 'Phone', direction: 'outbound', summary: 'Follow-up on proposal', date: '2026-04-07', user: 'John Mbeki' }
];
