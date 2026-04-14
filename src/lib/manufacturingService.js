// Mock data for Manufacturing Module

export const getMockProducts = () => [
  { id: 1, name: 'Multi-Surface Cleaner 5L', sku: 'PROD-MSC-001', category: 'Cleaning Chemicals', type: 'finished', unit: 'bottle', cost: 45.00, price: 89.99, stock: 120, minStock: 50, status: 'active' },
  { id: 2, name: 'Floor Stripper Concentrate', sku: 'PROD-FSC-002', category: 'Cleaning Chemicals', type: 'finished', unit: 'bottle', cost: 65.00, price: 129.99, stock: 35, minStock: 30, status: 'active' },
  { id: 3, name: 'Glass Cleaner Ready-to-Use', sku: 'PROD-GC-003', category: 'Cleaning Chemicals', type: 'finished', unit: 'bottle', cost: 28.00, price: 49.99, stock: 85, minStock: 40, status: 'active' },
  { id: 4, name: 'Disinfectant Solution', sku: 'PROD-DIS-004', category: 'Cleaning Chemicals', type: 'finished', unit: 'bottle', cost: 55.00, price: 99.99, stock: 18, minStock: 25, status: 'low-stock' },
  { id: 5, name: 'Cleaning Chemical Base', sku: 'RAW-CCB-001', category: 'Raw Materials', type: 'raw', unit: 'L', cost: 12.00, price: null, stock: 500, minStock: 200, status: 'active' },
  { id: 6, name: 'Surfactant Blend', sku: 'RAW-SB-002', category: 'Raw Materials', type: 'raw', unit: 'L', cost: 18.00, price: null, stock: 320, minStock: 150, status: 'active' },
  { id: 7, name: 'Fragrance Oil', sku: 'RAW-FO-003', category: 'Raw Materials', type: 'raw', unit: 'L', cost: 35.00, price: null, stock: 80, minStock: 50, status: 'active' },
  { id: 8, name: 'Plastic Bottles 5L', sku: 'RAW-BTL-004', category: 'Packaging', type: 'raw', unit: 'units', cost: 3.50, price: null, stock: 1000, minStock: 300, status: 'active' }
];

export const getMockBOMs = () => [
  { id: 1, productId: 1, productName: 'Multi-Surface Cleaner 5L', components: [
    { materialId: 5, materialName: 'Cleaning Chemical Base', quantity: 4.5, unit: 'L' },
    { materialId: 6, materialName: 'Surfactant Blend', quantity: 0.3, unit: 'L' },
    { materialId: 7, materialName: 'Fragrance Oil', quantity: 0.05, unit: 'L' },
    { materialId: 8, materialName: 'Plastic Bottles 5L', quantity: 1, unit: 'units' }
  ]},
  { id: 2, productId: 2, productName: 'Floor Stripper Concentrate', components: [
    { materialId: 5, materialName: 'Cleaning Chemical Base', quantity: 3.8, unit: 'L' },
    { materialId: 6, materialName: 'Surfactant Blend', quantity: 0.8, unit: 'L' },
    { materialId: 8, materialName: 'Plastic Bottles 5L', quantity: 1, unit: 'units' }
  ]},
  { id: 3, productId: 3, productName: 'Glass Cleaner Ready-to-Use', components: [
    { materialId: 5, materialName: 'Cleaning Chemical Base', quantity: 0.5, unit: 'L' },
    { materialId: 6, materialName: 'Surfactant Blend', quantity: 0.1, unit: 'L' },
    { materialId: 8, materialName: 'Plastic Bottles 5L', quantity: 1, unit: 'units' }
  ]}
];

export const getMockProductionOrders = () => [
  { id: 1, orderNumber: 'PO-2026-001', product: 'Multi-Surface Cleaner 5L', quantity: 50, startDate: '2026-04-10', endDate: '2026-04-12', status: 'completed', workCenter: 'Mixing Station A', assignedTo: 'Team Alpha' },
  { id: 2, orderNumber: 'PO-2026-002', product: 'Floor Stripper Concentrate', quantity: 25, startDate: '2026-04-13', endDate: '2026-04-14', status: 'in-progress', workCenter: 'Mixing Station B', assignedTo: 'Team Beta' },
  { id: 3, orderNumber: 'PO-2026-003', product: 'Disinfectant Solution', quantity: 40, startDate: '2026-04-15', endDate: '2026-04-17', status: 'planned', workCenter: 'Mixing Station A', assignedTo: 'Team Alpha' },
  { id: 4, orderNumber: 'PO-2026-004', product: 'Glass Cleaner Ready-to-Use', quantity: 60, startDate: '2026-04-18', endDate: '2026-04-19', status: 'planned', workCenter: 'Mixing Station C', assignedTo: 'Team Gamma' }
];

export const getMockWorkCenters = () => [
  { id: 1, name: 'Mixing Station A', type: 'Mixing', capacity: 500, efficiency: 92, status: 'active', currentLoad: 65, operator: 'John Mbeki' },
  { id: 2, name: 'Mixing Station B', type: 'Mixing', capacity: 400, efficiency: 88, status: 'active', currentLoad: 45, operator: 'Sarah Ndlovu' },
  { id: 3, name: 'Mixing Station C', type: 'Mixing', capacity: 300, efficiency: 85, status: 'maintenance', currentLoad: 0, operator: null },
  { id: 4, name: 'Bottling Line 1', type: 'Packaging', capacity: 1000, efficiency: 95, status: 'active', currentLoad: 30, operator: 'Mike Khumalo' },
  { id: 5, name: 'Labeling Station', type: 'Packaging', capacity: 800, efficiency: 90, status: 'active', currentLoad: 25, operator: 'Emily Zulu' }
];

export const getMockQualityChecks = () => [
  { id: 1, productionOrder: 'PO-2026-001', product: 'Multi-Surface Cleaner 5L', batch: 'BATCH-001', date: '2026-04-12', phLevel: 7.2, viscosity: 'Pass', appearance: 'Pass', odor: 'Pass', status: 'approved', inspector: 'Quality Manager' },
  { id: 2, productionOrder: 'PO-2026-002', product: 'Floor Stripper Concentrate', batch: 'BATCH-002', date: '2026-04-14', phLevel: 11.5, viscosity: 'Pass', appearance: 'Pass', odor: 'Pass', status: 'pending', inspector: 'Team Leader' },
  { id: 3, productionOrder: 'PO-2026-001', product: 'Multi-Surface Cleaner 5L', batch: 'BATCH-003', date: '2026-04-11', phLevel: 6.8, viscosity: 'Fail', appearance: 'Pass', odor: 'Pass', status: 'rejected', inspector: 'Quality Manager' }
];

export const getMockCostTracking = () => [
  { id: 1, productionOrder: 'PO-2026-001', product: 'Multi-Surface Cleaner 5L', quantity: 50, materialCost: 1250.00, laborCost: 800.00, overheadCost: 450.00, totalCost: 2500.00, costPerUnit: 50.00 },
  { id: 2, productionOrder: 'PO-2026-002', product: 'Floor Stripper Concentrate', quantity: 25, materialCost: 950.00, laborCost: 500.00, overheadCost: 300.00, totalCost: 1750.00, costPerUnit: 70.00 },
  { id: 3, productionOrder: 'PO-2026-003', product: 'Disinfectant Solution', quantity: 40, materialCost: 1400.00, laborCost: 600.00, overheadCost: 400.00, totalCost: 2400.00, costPerUnit: 60.00 }
];
