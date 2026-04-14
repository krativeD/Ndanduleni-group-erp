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
    status: 'sent',
    lineItems: [
      { description: 'Deep Cleaning - Food Court', quantity: 1, unitPrice: 8500.00 },
      { description: 'Window Cleaning - Storefronts', quantity: 2, unitPrice: 3500.00 },
      { description: 'Floor Buffing - Main Concourse', quantity: 1, unitPrice: 6500.00 }
    ]
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
    status: 'accepted',
    lineItems: [
      { description: 'Daily Maintenance - Restrooms', quantity: 5, unitPrice: 1200.00 },
      { description: 'Sanitization - High Touch Areas', quantity: 1, unitPrice: 1200.00 }
    ]
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
    status: 'draft',
    lineItems: [
      { description: 'Window Cleaning - All Buildings', quantity: 3, unitPrice: 4500.00 },
      { description: 'Carpet Shampoo - Offices', quantity: 2, unitPrice: 2400.00 },
      { description: 'Pressure Washing - Parking Area', quantity: 1, unitPrice: 4000.00 }
    ]
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
    status: 'rejected',
    lineItems: [
      { description: 'Floor Stripping and Waxing', quantity: 1, unitPrice: 9500.00 }
    ]
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
    status: 'accepted',
    lineItems: [
      { description: 'Full Mall Deep Clean', quantity: 1, unitPrice: 25000.00 },
      { description: 'Window Cleaning - All Levels', quantity: 1, unitPrice: 7500.00 }
    ]
  }
];
