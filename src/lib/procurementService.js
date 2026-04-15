// Mock data for Procurement Module

export let procurementData = {
  suppliers: [
    { id: 1, name: 'CleanCo SA', contact: 'James van der Merwe', email: 'orders@cleanco.co.za', phone: '011 234 5678', address: '15 Industrial Rd, Johannesburg', category: 'Chemicals', status: 'active', rating: 4.5, paymentTerms: 'Net 30' },
    { id: 2, name: 'ChemSupply', contact: 'Priya Naidoo', email: 'sales@chemsupply.co.za', phone: '031 345 6789', address: '22 Chemical Way, Durban', category: 'Chemicals', status: 'active', rating: 4.2, paymentTerms: 'Net 15' },
    { id: 3, name: 'Shine Supplies', contact: 'Thabo Mokoena', email: 'info@shinesupplies.co.za', phone: '021 456 7890', address: '8 Bright St, Cape Town', category: 'Supplies', status: 'active', rating: 4.8, paymentTerms: 'Net 30' },
    { id: 4, name: 'Equipment Pro', contact: 'Linda Pretorius', email: 'orders@equipmentpro.co.za', phone: '012 567 8901', address: '42 Tech Park, Pretoria', category: 'Equipment', status: 'active', rating: 4.0, paymentTerms: 'Net 45' },
    { id: 5, name: 'Industrial Clean Supplies', contact: 'Rajesh Pillay', email: 'sales@ics.co.za', phone: '011 678 9012', address: '67 Factory Rd, Johannesburg', category: 'All', status: 'inactive', rating: 3.5, paymentTerms: 'Net 30' }
  ],
  requisitions: [
    { id: 1, reqNumber: 'REQ-2026-001', requestedBy: 'John Mbeki', department: 'Operations', date: '2026-04-10', requiredDate: '2026-04-20', items: 3, total: 12500.00, status: 'approved', priority: 'high' },
    { id: 2, reqNumber: 'REQ-2026-002', requestedBy: 'Sarah Ndlovu', department: 'Cleaning', date: '2026-04-11', requiredDate: '2026-04-18', items: 2, total: 4750.00, status: 'pending', priority: 'medium' },
    { id: 3, reqNumber: 'REQ-2026-003', requestedBy: 'Mike Khumalo', department: 'Maintenance', date: '2026-04-12', requiredDate: '2026-04-25', items: 5, total: 8750.00, status: 'draft', priority: 'low' }
  ],
  purchaseOrders: [
    { id: 1, poNumber: 'PO-2026-001', supplier: 'CleanCo SA', requisition: 'REQ-2026-001', orderDate: '2026-04-10', expectedDate: '2026-04-20', items: 3, total: 12500.00, status: 'ordered', paymentStatus: 'pending' },
    { id: 2, poNumber: 'PO-2026-002', supplier: 'ChemSupply', requisition: null, orderDate: '2026-04-08', expectedDate: '2026-04-15', items: 2, total: 8750.50, status: 'delivered', paymentStatus: 'paid' },
    { id: 3, poNumber: 'PO-2026-003', supplier: 'Shine Supplies', requisition: 'REQ-2026-002', orderDate: '2026-04-12', expectedDate: '2026-04-22', items: 4, total: 15300.75, status: 'approved', paymentStatus: 'unpaid' }
  ],
  receipts: [
    { id: 1, receiptNumber: 'GRN-2026-001', poNumber: 'PO-2026-002', supplier: 'ChemSupply', receivedDate: '2026-04-14', items: 2, quantity: 2, status: 'completed', inspectedBy: 'Quality Manager' },
    { id: 2, receiptNumber: 'GRN-2026-002', poNumber: 'PO-2026-001', supplier: 'CleanCo SA', receivedDate: '2026-04-15', items: 3, quantity: 2, status: 'partial', inspectedBy: 'Team Leader' }
  ],
  contracts: [
    { id: 1, contractNumber: 'CT-2026-001', supplier: 'CleanCo SA', startDate: '2026-01-01', endDate: '2026-12-31', value: 450000.00, type: 'Fixed', status: 'active', description: 'Annual chemical supply' },
    { id: 2, contractNumber: 'CT-2026-002', supplier: 'Shine Supplies', startDate: '2026-03-01', endDate: '2027-02-28', value: 280000.00, type: 'Framework', status: 'active', description: 'Cleaning supplies' }
  ],
  rfqs: [
    { id: 1, rfqNumber: 'RFQ-2026-001', title: 'Floor Cleaning Equipment', issueDate: '2026-04-01', closingDate: '2026-04-20', suppliers: 4, responses: 3, status: 'open', budget: 150000.00 },
    { id: 2, rfqNumber: 'RFQ-2026-002', title: 'Bulk Chemicals Q2', issueDate: '2026-03-15', closingDate: '2026-04-05', suppliers: 5, responses: 4, status: 'evaluating', budget: 85000.00 },
    { id: 3, rfqNumber: 'RFQ-2026-003', title: 'Uniforms & PPE', issueDate: '2026-02-01', closingDate: '2026-02-28', suppliers: 3, responses: 2, status: 'awarded', budget: 45000.00 }
  ]
};

// Helper functions
export const getProcurementData = (section) => procurementData[section] || [];

export const updateProcurementData = (section, data) => {
  procurementData[section] = data;
};

// Auto-generate numbers
export const generatePRNumber = () => {
  const year = new Date().getFullYear();
  const count = procurementData.requisitions.length + 1;
  return `REQ-${year}-${String(count).padStart(3, '0')}`;
};

export const generatePONumber = () => {
  const year = new Date().getFullYear();
  const count = procurementData.purchaseOrders.length + 1;
  return `PO-${year}-${String(count).padStart(3, '0')}`;
};

export const generateGRNNumber = () => {
  const year = new Date().getFullYear();
  const count = procurementData.receipts.length + 1;
  return `GRN-${year}-${String(count).padStart(3, '0')}`;
};

export const generateContractNumber = () => {
  const year = new Date().getFullYear();
  const count = procurementData.contracts.length + 1;
  return `CT-${year}-${String(count).padStart(3, '0')}`;
};

export const generateRFQNumber = () => {
  const year = new Date().getFullYear();
  const count = procurementData.rfqs.length + 1;
  return `RFQ-${year}-${String(count).padStart(3, '0')}`;
};
