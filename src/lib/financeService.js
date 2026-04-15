// Mock data for Finance Module

export const getMockChartOfAccounts = () => [
  { id: 1, code: '1000', name: 'Cash on Hand', type: 'Asset', balance: 250000.00 },
  { id: 2, code: '1100', name: 'Bank Account - FNB', type: 'Asset', balance: 1850000.00 },
  { id: 3, code: '1200', name: 'Accounts Receivable', type: 'Asset', balance: 450000.00 },
  { id: 4, code: '1300', name: 'Inventory', type: 'Asset', balance: 890000.00 },
  { id: 5, code: '1400', name: 'Equipment', type: 'Asset', balance: 2500000.00 },
  { id: 6, code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 320000.00 },
  { id: 7, code: '2100', name: 'VAT Payable', type: 'Liability', balance: 85000.00 },
  { id: 8, code: '2200', name: 'PAYE Payable', type: 'Liability', balance: 65000.00 },
  { id: 9, code: '3000', name: 'Share Capital', type: 'Equity', balance: 2000000.00 },
  { id: 10, code: '3100', name: 'Retained Earnings', type: 'Equity', balance: 3250000.00 },
  { id: 11, code: '4000', name: 'Service Revenue', type: 'Revenue', balance: 2850000.00 },
  { id: 12, code: '5000', name: 'Salaries & Wages', type: 'Expense', balance: 950000.00 },
  { id: 13, code: '5100', name: 'Rent Expense', type: 'Expense', balance: 360000.00 },
  { id: 14, code: '5200', name: 'Utilities', type: 'Expense', balance: 85000.00 },
  { id: 15, code: '5300', name: 'Supplies Expense', type: 'Expense', balance: 245000.00 }
];

export const getMockGeneralLedger = () => [
  { id: 1, date: '2026-04-01', account: 'Bank Account - FNB', description: 'Initial Deposit', debit: 500000.00, credit: 0, balance: 500000.00 },
  { id: 2, date: '2026-04-05', account: 'Service Revenue', description: 'Sandton City Mall - Invoice #INV-001', debit: 0, credit: 125000.00, balance: 125000.00 },
  { id: 3, date: '2026-04-08', account: 'Salaries & Wages', description: 'April Payroll', debit: 245000.00, credit: 0, balance: 245000.00 },
  { id: 4, date: '2026-04-10', account: 'Supplies Expense', description: 'Cleaning Supplies Purchase', debit: 18500.00, credit: 0, balance: 18500.00 },
  { id: 5, date: '2026-04-12', account: 'Service Revenue', description: 'Menlyn Park - Invoice #INV-002', debit: 0, credit: 87500.00, balance: 212500.00 },
  { id: 6, date: '2026-04-15', account: 'Rent Expense', description: 'April Rent - Warehouse', debit: 30000.00, credit: 0, balance: 30000.00 },
  { id: 7, date: '2026-04-18', account: 'Service Revenue', description: 'V&A Waterfront - Invoice #INV-003', debit: 0, credit: 153000.00, balance: 365500.00 }
];

export const getMockAccountsPayable = () => [
  { id: 1, supplier: 'CleanCo SA', invoiceNumber: 'SUP-001', date: '2026-03-25', dueDate: '2026-04-25', amount: 42500.00, paid: 0, balance: 42500.00, status: 'pending' },
  { id: 2, supplier: 'ChemSupply', invoiceNumber: 'SUP-002', date: '2026-04-01', dueDate: '2026-05-01', amount: 18750.00, paid: 10000.00, balance: 8750.00, status: 'partial' },
  { id: 3, supplier: 'Shine Supplies', invoiceNumber: 'SUP-003', date: '2026-04-05', dueDate: '2026-05-05', amount: 32500.00, paid: 0, balance: 32500.00, status: 'pending' },
  { id: 4, supplier: 'Equipment Pro', invoiceNumber: 'SUP-004', date: '2026-03-15', dueDate: '2026-04-15', amount: 6200.00, paid: 6200.00, balance: 0, status: 'paid' }
];

export const getMockAccountsReceivable = () => [
  { id: 1, customer: 'Sandton City Mall', invoiceNumber: 'INV-2026-001', date: '2026-04-01', dueDate: '2026-05-01', amount: 125000.00, paid: 125000.00, balance: 0, status: 'paid' },
  { id: 2, customer: 'Menlyn Park', invoiceNumber: 'INV-2026-002', date: '2026-04-05', dueDate: '2026-05-05', amount: 87500.00, paid: 40000.00, balance: 47500.00, status: 'partial' },
  { id: 3, customer: 'V&A Waterfront', invoiceNumber: 'INV-2026-003', date: '2026-04-08', dueDate: '2026-05-08', amount: 153000.00, paid: 0, balance: 153000.00, status: 'pending' },
  { id: 4, customer: 'Gateway Theatre', invoiceNumber: 'INV-2026-004', date: '2026-03-20', dueDate: '2026-04-20', amount: 42000.00, paid: 42000.00, balance: 0, status: 'paid' },
  { id: 5, customer: 'Fourways Mall', invoiceNumber: 'INV-2026-005', date: '2026-04-10', dueDate: '2026-05-10', amount: 98000.00, paid: 0, balance: 98000.00, status: 'pending' }
];

export const getMockCashflow = () => [
  { id: 1, date: '2026-04-01', description: 'Opening Balance', type: 'inflow', amount: 500000.00, category: 'Opening', balance: 500000.00 },
  { id: 2, date: '2026-04-05', description: 'Sandton City Payment', type: 'inflow', amount: 125000.00, category: 'Sales', balance: 625000.00 },
  { id: 3, date: '2026-04-08', description: 'Payroll', type: 'outflow', amount: 245000.00, category: 'Salaries', balance: 380000.00 },
  { id: 4, date: '2026-04-10', description: 'Supplies Purchase', type: 'outflow', amount: 18500.00, category: 'Supplies', balance: 361500.00 },
  { id: 5, date: '2026-04-12', description: 'Menlyn Park Payment', type: 'inflow', amount: 40000.00, category: 'Sales', balance: 401500.00 },
  { id: 6, date: '2026-04-15', description: 'Rent Payment', type: 'outflow', amount: 30000.00, category: 'Rent', balance: 371500.00 }
];

export const getMockBudgets = () => [
  { id: 1, category: 'Revenue', subcategory: 'Service Revenue', budgeted: 3500000.00, actual: 365500.00, variance: -3134500.00, period: 'April 2026' },
  { id: 2, category: 'Expense', subcategory: 'Salaries & Wages', budgeted: 280000.00, actual: 245000.00, variance: 35000.00, period: 'April 2026' },
  { id: 3, category: 'Expense', subcategory: 'Rent', budgeted: 30000.00, actual: 30000.00, variance: 0, period: 'April 2026' },
  { id: 4, category: 'Expense', subcategory: 'Utilities', budgeted: 10000.00, actual: 7200.00, variance: 2800.00, period: 'April 2026' },
  { id: 5, category: 'Expense', subcategory: 'Supplies', budgeted: 50000.00, actual: 18500.00, variance: 31500.00, period: 'April 2026' }
];

export const getMockFinancialReports = () => ({
  incomeStatement: {
    revenue: { 'Service Revenue': 365500.00, 'Total Revenue': 365500.00 },
    expenses: { 'Salaries & Wages': 245000.00, 'Rent': 30000.00, 'Utilities': 7200.00, 'Supplies': 18500.00, 'Total Expenses': 300700.00 },
    netIncome: 64800.00
  },
  balanceSheet: {
    assets: { 'Cash': 1850000.00, 'Accounts Receivable': 298500.00, 'Inventory': 890000.00, 'Equipment': 2500000.00, 'Total Assets': 5538500.00 },
    liabilities: { 'Accounts Payable': 83750.00, 'VAT Payable': 85000.00, 'PAYE Payable': 65000.00, 'Total Liabilities': 233750.00 },
    equity: { 'Share Capital': 2000000.00, 'Retained Earnings': 3304750.00, 'Total Equity': 5304750.00 }
  }
});
