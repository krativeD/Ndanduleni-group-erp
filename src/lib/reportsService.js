// Mock data for Reports & Analytics Module

export const reportsData = {
  salesSummary: {
    totalRevenue: 2850000.00,
    totalOrders: 156,
    averageOrderValue: 18269.23,
    topCustomers: [
      { name: 'Sandton City Mall', revenue: 450000.00, orders: 12 },
      { name: 'V&A Waterfront', revenue: 385000.00, orders: 8 },
      { name: 'Menlyn Park', revenue: 320000.00, orders: 10 },
      { name: 'Fourways Mall', revenue: 275000.00, orders: 7 },
      { name: 'Gateway Theatre', revenue: 210000.00, orders: 6 }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 380000.00 },
      { month: 'Feb', revenue: 420000.00 },
      { month: 'Mar', revenue: 510000.00 },
      { month: 'Apr', revenue: 485000.00 },
      { month: 'May', revenue: 520000.00 },
      { month: 'Jun', revenue: 535000.00 }
    ],
    productPerformance: [
      { name: 'Deep Cleaning', revenue: 850000.00, quantity: 45 },
      { name: 'Window Cleaning', revenue: 620000.00, quantity: 78 },
      { name: 'Floor Maintenance', revenue: 480000.00, quantity: 32 },
      { name: 'Sanitization', revenue: 350000.00, quantity: 89 },
      { name: 'Carpet Cleaning', revenue: 280000.00, quantity: 41 }
    ]
  },
  
  financialSummary: {
    totalAssets: 5538500.00,
    totalLiabilities: 233750.00,
    totalEquity: 5304750.00,
    netIncome: 648000.00,
    cashFlow: {
      operating: 450000.00,
      investing: -120000.00,
      financing: 0,
      netChange: 330000.00
    },
    expenseBreakdown: [
      { category: 'Salaries', amount: 2450000.00, percentage: 45 },
      { category: 'Supplies', amount: 1200000.00, percentage: 22 },
      { category: 'Rent', amount: 600000.00, percentage: 11 },
      { category: 'Utilities', amount: 350000.00, percentage: 6 },
      { category: 'Marketing', amount: 280000.00, percentage: 5 },
      { category: 'Other', amount: 620000.00, percentage: 11 }
    ],
    revenueBreakdown: [
      { category: 'Services', amount: 2850000.00, percentage: 75 },
      { category: 'Products', amount: 850000.00, percentage: 22 },
      { category: 'Other', amount: 100000.00, percentage: 3 }
    ],
    kpis: [
      { name: 'Gross Margin', value: '42%', trend: 'up', change: '+3.2%' },
      { name: 'Net Profit Margin', value: '18%', trend: 'up', change: '+2.1%' },
      { name: 'Current Ratio', value: '2.4', trend: 'stable', change: '0.0' },
      { name: 'Debt to Equity', value: '0.04', trend: 'down', change: '-0.01' }
    ]
  },
  
  inventorySummary: {
    totalItems: 1245,
    totalValue: 1890000.00,
    lowStockItems: 18,
    turnoverRate: 4.2,
    topMoving: [
      { name: 'Multi-Surface Cleaner', sold: 450, stock: 120 },
      { name: 'Microfiber Cloths', sold: 380, stock: 85 },
      { name: 'Disinfectant', sold: 320, stock: 45 },
      { name: 'Glass Cleaner', sold: 290, stock: 78 },
      { name: 'Floor Stripper', sold: 180, stock: 35 }
    ],
    slowMoving: [
      { name: 'Carpet Shampoo', sold: 25, stock: 95, daysInStock: 180 },
      { name: 'Floor Buffer Pads', sold: 18, stock: 62, daysInStock: 210 },
      { name: 'Specialty Chemicals', sold: 12, stock: 45, daysInStock: 300 }
    ],
    stockByCategory: [
      { category: 'Chemicals', value: 650000.00, items: 45 },
      { category: 'Supplies', value: 520000.00, items: 78 },
      { category: 'Equipment', value: 720000.00, items: 32 }
    ]
  },
  
  hrSummary: {
    totalEmployees: 48,
    departments: [
      { name: 'Operations', count: 22, percentage: 46 },
      { name: 'Cleaning', count: 12, percentage: 25 },
      { name: 'Admin', count: 8, percentage: 17 },
      { name: 'Management', count: 6, percentage: 12 }
    ],
    attendance: {
      present: 42,
      absent: 4,
      leave: 2,
      rate: 87.5
    },
    turnover: {
      annual: 12.5,
      voluntary: 8.3,
      involuntary: 4.2
    },
    training: {
      completed: 35,
      inProgress: 8,
      planned: 5,
      totalHours: 420
    },
    payrollSummary: {
      monthly: 485000.00,
      average: 10104.17,
      highest: 35000.00,
      lowest: 5500.00
    }
  },
  
  serviceSummary: {
    totalJobs: 342,
    completed: 298,
    inProgress: 28,
    scheduled: 16,
    completionRate: 87.1,
    customerSatisfaction: 4.7,
    topServices: [
      { name: 'Daily Cleaning', jobs: 145, revenue: 890000.00 },
      { name: 'Deep Cleaning', jobs: 68, revenue: 520000.00 },
      { name: 'Window Cleaning', jobs: 52, revenue: 310000.00 },
      { name: 'Floor Maintenance', jobs: 38, revenue: 245000.00 },
      { name: 'Sanitization', jobs: 39, revenue: 195000.00 }
    ],
    teamPerformance: [
      { team: 'Team Alpha', jobs: 89, rating: 4.8, efficiency: 94 },
      { team: 'Team Beta', jobs: 76, rating: 4.6, efficiency: 88 },
      { team: 'Team Gamma', jobs: 72, rating: 4.9, efficiency: 92 },
      { team: 'Team Delta', jobs: 61, rating: 4.5, efficiency: 85 }
    ]
  },
  
  scheduledReports: [
    { id: 1, name: 'Weekly Sales Report', type: 'Sales', frequency: 'Weekly', recipients: 'ceo@ndanduleni.co.za', lastSent: '2026-04-14', status: 'active' },
    { id: 2, name: 'Monthly Financial Statement', type: 'Financial', frequency: 'Monthly', recipients: 'finance@ndanduleni.co.za', lastSent: '2026-03-31', status: 'active' },
    { id: 3, name: 'Daily Attendance', type: 'HR', frequency: 'Daily', recipients: 'hr@ndanduleni.co.za', lastSent: '2026-04-15', status: 'active' }
  ]
};

export const getReportsData = (section) => reportsData[section] || {};

export const getScheduledReports = () => reportsData.scheduledReports;
