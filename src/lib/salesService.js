// Mock data for Sales & Orders Module

export const getMockOrders = () => [
  { id: 1, orderNumber: 'ORD-2026-001', customer: 'Sandton City Mall', date: '2026-04-10', items: 5, total: 12500.00, status: 'delivered', paymentStatus: 'paid' },
  { id: 2, orderNumber: 'ORD-2026-002', customer: 'Menlyn Park', date: '2026-04-11', items: 3, total: 8750.50, status: 'processing', paymentStatus: 'partial' },
  { id: 3, orderNumber: 'ORD-2026-003', customer: 'V&A Waterfront', date: '2026-04-12', items: 7, total: 15300.75, status: 'pending', paymentStatus: 'unpaid' },
  { id: 4, orderNumber: 'ORD-2026-004', customer: 'Gateway Theatre', date: '2026-04-09', items: 2, total: 4200.00, status: 'shipped', paymentStatus: 'paid' },
  { id: 5, orderNumber: 'ORD-2026-005', customer: 'Fourways Mall', date: '2026-04-13', items: 4, total: 9800.00, status: 'confirmed', paymentStatus: 'unpaid' }
];

export const getMockQuotations = () => [
  { 
    id: 1, 
    quoteNumber: 'QUO-2026-001', 
    customer: 'Clearwater Mall', 
    customerAddress: 'Hendrik Potgieter Road, Roodepoort, 1709',
    customerEmail: 'procurement@clearwatermall.co.za',
    date: '2026-04-10', 
    items: 6, 
    total: 18500.00, 
    validUntil: '2026-05-10', 
    status: 'sent' 
  },
  { 
    id: 2, 
    quoteNumber: 'QUO-2026-002', 
    customer: 'Brooklyn Mall', 
    customerAddress: 'Fehrsen Street, Brooklyn, Pretoria, 0181',
    customerEmail: 'finance@brooklynmall.co.za',
    date: '2026-04-11', 
    items: 3, 
    total: 7200.00, 
    validUntil: '2026-05-11', 
    status: 'accepted' 
  },
  { 
    id: 3, 
    quoteNumber: 'QUO-2026-003', 
    customer: 'Canal Walk', 
    customerAddress: 'Century Boulevard, Century City, Cape Town, 7441',
    customerEmail: 'accounts@canalwalk.co.za',
    date: '2026-04-12', 
    items: 5, 
    total: 22300.00, 
    validUntil: '2026-05-12', 
    status: 'draft' 
  },
  { 
    id: 4, 
    quoteNumber: 'QUO-2026-004', 
    customer: 'Eastgate', 
    customerAddress: '43 Bradford Road, Bedfordview, Germiston, 2008',
    customerEmail: 'billing@eastgate.co.za',
    date: '2026-04-08', 
    items: 4, 
    total: 9500.00, 
    validUntil: '2026-05-08', 
    status: 'rejected' 
  },
  { 
    id: 5, 
    quoteNumber: 'QUO-2026-005', 
    customer: 'Mall of Africa', 
    customerAddress: 'Lone Creek Crescent, Waterfall City, Midrand, 1685',
    customerEmail: 'finance@mallofafrica.co.za',
    date: '2026-04-14', 
    items: 8, 
    total: 32500.00, 
    validUntil: '2026-05-14', 
    status: 'accepted' 
  }
];

export const getMockInvoices = () => [
  { 
    id: 1, 
    invoiceNumber: 'INV-2026-001', 
    order: 'ORD-2026-001', 
    customer: 'Sandton City Mall', 
    customerAddress: '83 Rivonia Road, Sandton, Johannesburg, 2196',
    customerEmail: 'accounts@sandtoncity.co.za',
    date: '2026-04-10', 
    dueDate: '2026-05-10', 
    total: 12500.00, 
    paid: 12500.00, 
    status: 'paid',
    items: [
      { description: 'Deep Cleaning - Food Court', quantity: 1, unitPrice: 8500.00 },
      { description: 'Window Cleaning - Atrium', quantity: 1, unitPrice: 4000.00 }
    ]
  },
  { 
    id: 2, 
    invoiceNumber: 'INV-2026-002', 
    order: 'ORD-2026-002', 
    customer: 'Menlyn Park', 
    customerAddress: 'Atterbury Road, Menlyn, Pretoria, 0063',
    customerEmail: 'finance@menlynpark.co.za',
    date: '2026-04-11', 
    dueDate: '2026-05-11', 
    total: 8750.50, 
    paid: 4000.00, 
    status: 'partial',
    items: [
      { description: 'Daily Maintenance - Restrooms', quantity: 5, unitPrice: 1200.00 },
      { description: 'Floor Buffing - Concourse', quantity: 1, unitPrice: 2750.50 }
    ]
  },
  { 
    id: 3, 
    invoiceNumber: 'INV-2026-003', 
    order: 'ORD-2026-003', 
    customer: 'V&A Waterfront', 
    customerAddress: '19 Dock Road, V&A Waterfront, Cape Town, 8001',
    customerEmail: 'billing@waterfront.co.za',
    date: '2026-04-12', 
    dueDate: '2026-05-12', 
    total: 15300.75, 
    paid: 0, 
    status: 'unpaid',
    items: [
      { description: 'Window Cleaning - All Buildings', quantity: 3, unitPrice: 3500.00 },
      { description: 'Carpet Shampoo - Offices', quantity: 2, unitPrice: 2400.38 }
    ]
  },
  { 
    id: 4, 
    invoiceNumber: 'INV-2026-004', 
    order: 'ORD-2026-004', 
    customer: 'Gateway Theatre', 
    customerAddress: '1 Palm Boulevard, Umhlanga, Durban, 4319',
    customerEmail: 'accounts@gateway.co.za',
    date: '2026-04-09', 
    dueDate: '2026-05-09', 
    total: 4200.00, 
    paid: 4200.00, 
    status: 'paid',
    items: [
      { description: 'Auditorium Deep Clean', quantity: 1, unitPrice: 4200.00 }
    ]
  }
];

export const getMockPayments = () => [
  { id: 1, invoice: 'INV-2026-001', customer: 'Sandton City Mall', amount: 12500.00, method: 'EFT', date: '2026-04-12', reference: 'PAY-001', status: 'completed' },
  { id: 2, invoice: 'INV-2026-002', customer: 'Menlyn Park', amount: 4000.00, method: 'Credit Card', date: '2026-04-13', reference: 'PAY-002', status: 'completed' },
  { id: 3, invoice: 'INV-2026-004', customer: 'Gateway Theatre', amount: 4200.00, method: 'EFT', date: '2026-04-10', reference: 'PAY-003', status: 'completed' }
];

export const getMockDeliveries = () => [
  { id: 1, order: 'ORD-2026-001', customer: 'Sandton City Mall', address: 'Sandton, Johannesburg', scheduled: '2026-04-12', delivered: '2026-04-12', driver: 'Thabo Molefe', status: 'delivered' },
  { id: 2, order: 'ORD-2026-004', customer: 'Gateway Theatre', address: 'Umhlanga, Durban', scheduled: '2026-04-11', delivered: '2026-04-11', driver: 'Sipho Ndlovu', status: 'delivered' },
  { id: 3, order: 'ORD-2026-005', customer: 'Fourways Mall', address: 'Fourways, Johannesburg', scheduled: '2026-04-15', delivered: null, driver: 'Lerato Mokoena', status: 'scheduled' }
];

export const getMockCommissions = () => [
  { id: 1, salesperson: 'John Mbeki', month: 'April 2026', orders: 8, totalSales: 45800.00, commissionRate: 5, commission: 2290.00, status: 'pending' },
  { id: 2, salesperson: 'Emily Zulu', month: 'April 2026', orders: 6, totalSales: 32400.00, commissionRate: 5, commission: 1620.00, status: 'paid' },
  { id: 3, salesperson: 'Sarah Ndlovu', month: 'April 2026', orders: 5, totalSales: 21500.00, commissionRate: 5, commission: 1075.00, status: 'pending' }
];
