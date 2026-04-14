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
