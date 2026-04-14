// Mock data for Inventory Module

export const getMockStockItems = () => [
  { id: 1, name: 'Multi-Surface Cleaner', sku: 'CLN-MSC-001', category: 'Chemicals', quantity: 45, unit: 'L', minStock: 20, maxStock: 100, location: 'Warehouse A - Shelf 3', status: 'in-stock', lastUpdated: '2026-04-10' },
  { id: 2, name: 'Floor Stripper', sku: 'CLN-FS-002', category: 'Chemicals', quantity: 12, unit: 'L', minStock: 10, maxStock: 50, location: 'Warehouse A - Shelf 5', status: 'low-stock', lastUpdated: '2026-04-09' },
  { id: 3, name: 'Disinfectant', sku: 'CLN-DIS-003', category: 'Chemicals', quantity: 5, unit: 'L', minStock: 15, maxStock: 60, location: 'Warehouse B - Shelf 1', status: 'critical', lastUpdated: '2026-04-11' },
  { id: 4, name: 'Glass Cleaner', sku: 'CLN-GC-004', category: 'Chemicals', quantity: 28, unit: 'L', minStock: 10, maxStock: 40, location: 'Warehouse A - Shelf 2', status: 'in-stock', lastUpdated: '2026-04-08' },
  { id: 5, name: 'Microfiber Cloths (Pack 50)', sku: 'SUP-MFC-001', category: 'Supplies', quantity: 35, unit: 'packs', minStock: 20, maxStock: 80, location: 'Warehouse B - Shelf 4', status: 'in-stock', lastUpdated: '2026-04-07' },
  { id: 6, name: 'Mop Heads', sku: 'SUP-MH-002', category: 'Supplies', quantity: 18, unit: 'units', minStock: 15, maxStock: 50, location: 'Warehouse B - Shelf 6', status: 'low-stock', lastUpdated: '2026-04-06' },
  { id: 7, name: 'Floor Buffer Pads', sku: 'EQP-FBP-001', category: 'Equipment Parts', quantity: 8, unit: 'units', minStock: 10, maxStock: 30, location: 'Warehouse C - Shelf 1', status: 'critical', lastUpdated: '2026-04-05' },
  { id: 8, name: 'Vacuum Bags (Pack 10)', sku: 'EQP-VB-002', category: 'Equipment Parts', quantity: 22, unit: 'packs', minStock: 15, maxStock: 50, location: 'Warehouse C - Shelf 3', status: 'in-stock', lastUpdated: '2026-04-04' },
  { id: 9, name: 'Trash Bags (Roll 100)', sku: 'SUP-TB-003', category: 'Supplies', quantity: 42, unit: 'rolls', minStock: 30, maxStock: 100, location: 'Warehouse B - Shelf 2', status: 'in-stock', lastUpdated: '2026-04-03' },
  { id: 10, name: 'Hand Soap Refill', sku: 'CLN-HS-005', category: 'Chemicals', quantity: 15, unit: 'L', minStock: 12, maxStock: 40, location: 'Warehouse A - Shelf 4', status: 'low-stock', lastUpdated: '2026-04-02' },
  { id: 11, name: 'Paper Towels (Case)', sku: 'SUP-PT-004', category: 'Supplies', quantity: 25, unit: 'cases', minStock: 20, maxStock: 60, location: 'Warehouse B - Shelf 5', status: 'in-stock', lastUpdated: '2026-04-01' },
  { id: 12, name: 'Carpet Shampoo', sku: 'CLN-CS-006', category: 'Chemicals', quantity: 3, unit: 'L', minStock: 8, maxStock: 30, location: 'Warehouse A - Shelf 6', status: 'critical', lastUpdated: '2026-03-30' }
];

export const getMockStockMovements = () => [
  { id: 1, item: 'Multi-Surface Cleaner', sku: 'CLN-MSC-001', type: 'in', quantity: 20, date: '2026-04-10', reference: 'PO-2026-001', user: 'John Mbeki', notes: 'Restock order' },
  { id: 2, item: 'Disinfectant', sku: 'CLN-DIS-003', type: 'out', quantity: 5, date: '2026-04-11', reference: 'JOB-1234', user: 'Sarah Ndlovu', notes: 'Used for Sandton City job' },
  { id: 3, item: 'Microfiber Cloths', sku: 'SUP-MFC-001', type: 'out', quantity: 3, date: '2026-04-10', reference: 'JOB-1235', user: 'Mike Khumalo', notes: 'Menlyn Park cleaning' },
  { id: 4, item: 'Floor Stripper', sku: 'CLN-FS-002', type: 'in', quantity: 10, date: '2026-04-09', reference: 'PO-2026-002', user: 'Emily Zulu', notes: 'Monthly restock' },
  { id: 5, item: 'Glass Cleaner', sku: 'CLN-GC-004', type: 'out', quantity: 2, date: '2026-04-08', reference: 'JOB-1236', user: 'Grace Dlamini', notes: 'V&A Waterfront windows' },
  { id: 6, item: 'Vacuum Bags', sku: 'EQP-VB-002', type: 'in', quantity: 15, date: '2026-04-07', reference: 'PO-2026-003', user: 'John Mbeki', notes: 'Equipment supplies' },
  { id: 7, item: 'Floor Buffer Pads', sku: 'EQP-FBP-001', type: 'out', quantity: 2, date: '2026-04-06', reference: 'MAINT-001', user: 'Sipho Ndlovu', notes: 'Replacement pads' },
  { id: 8, item: 'Trash Bags', sku: 'SUP-TB-003', type: 'out', quantity: 5, date: '2026-04-05', reference: 'JOB-1237', user: 'Linda Sithole', notes: 'Fourways Mall job' }
];

export const getMockWarehouses = () => [
  { id: 1, name: 'Warehouse A', location: 'Johannesburg Depot', type: 'Main', capacity: 5000, used: 3200, sections: ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Shelf 4', 'Shelf 5', 'Shelf 6'] },
  { id: 2, name: 'Warehouse B', location: 'Pretoria Depot', type: 'Secondary', capacity: 3000, used: 1800, sections: ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Shelf 4', 'Shelf 5', 'Shelf 6'] },
  { id: 3, name: 'Warehouse C', location: 'Cape Town Depot', type: 'Regional', capacity: 2000, used: 850, sections: ['Shelf 1', 'Shelf 2', 'Shelf 3', 'Shelf 4'] }
];

export const getMockSuppliers = () => [
  { id: 1, name: 'CleanCo SA', contact: 'James van der Merwe', email: 'orders@cleanco.co.za', phone: '011 234 5678', address: '15 Industrial Rd, Johannesburg', category: 'Chemicals', status: 'active', paymentTerms: 'Net 30', rating: 4.5 },
  { id: 2, name: 'ChemSupply', contact: 'Priya Naidoo', email: 'sales@chemsupply.co.za', phone: '031 345 6789', address: '22 Chemical Way, Durban', category: 'Chemicals', status: 'active', paymentTerms: 'Net 15', rating: 4.2 },
  { id: 3, name: 'Shine Supplies', contact: 'Thabo Mokoena', email: 'info@shinesupplies.co.za', phone: '021 456 7890', address: '8 Bright St, Cape Town', category: 'Supplies', status: 'active', paymentTerms: 'Net 30', rating: 4.8 },
  { id: 4, name: 'Equipment Pro', contact: 'Linda Pretorius', email: 'orders@equipmentpro.co.za', phone: '012 567 8901', address: '42 Tech Park, Pretoria', category: 'Equipment', status: 'active', paymentTerms: 'Net 45', rating: 4.0 },
  { id: 5, name: 'Industrial Clean Supplies', contact: 'Rajesh Pillay', email: 'sales@ics.co.za', phone: '011 678 9012', address: '67 Factory Rd, Johannesburg', category: 'All', status: 'inactive', paymentTerms: 'Net 30', rating: 3.5 }
];

export const getMockPurchaseOrders = () => [
  { id: 1, poNumber: 'PO-2026-001', supplier: 'CleanCo SA', orderDate: '2026-04-01', expectedDate: '2026-04-08', status: 'delivered', items: 3, total: 12500.00 },
  { id: 2, poNumber: 'PO-2026-002', supplier: 'ChemSupply', orderDate: '2026-04-05', expectedDate: '2026-04-12', status: 'in-transit', items: 2, total: 8750.50 },
  { id: 3, poNumber: 'PO-2026-003', supplier: 'Shine Supplies', orderDate: '2026-04-08', expectedDate: '2026-04-15', status: 'pending', items: 5, total: 15300.75 },
  { id: 4, poNumber: 'PO-2026-004', supplier: 'Equipment Pro', orderDate: '2026-04-10', expectedDate: '2026-04-17', status: 'approved', items: 2, total: 6200.00 }
];

export const getMockStockTakeHistory = () => [
  { id: 1, date: '2026-03-15', warehouse: 'Warehouse A', items: 45, discrepancies: 2, status: 'completed', conductedBy: 'John Mbeki' },
  { id: 2, date: '2026-03-20', warehouse: 'Warehouse B', items: 38, discrepancies: 1, status: 'completed', conductedBy: 'Emily Zulu' },
  { id: 3, date: '2026-04-01', warehouse: 'Warehouse A', items: 42, discrepancies: 0, status: 'completed', conductedBy: 'Sarah Ndlovu' }
];
