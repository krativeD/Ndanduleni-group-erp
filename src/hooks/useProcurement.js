import { useState, useEffect } from 'react';
import { 
  procurementData,
  generatePRNumber,
  generatePONumber,
  generateGRNNumber,
  generateContractNumber,
  generateRFQNumber
} from '../lib/procurementService';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setSuppliers([...procurementData.suppliers]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addSupplier = (supplier) => {
    const newSupplier = { ...supplier, id: Math.max(...procurementData.suppliers.map(s => s.id), 0) + 1 };
    procurementData.suppliers = [...procurementData.suppliers, newSupplier];
    refresh();
  };

  const updateSupplier = (id, updates) => {
    procurementData.suppliers = procurementData.suppliers.map(s => s.id === id ? { ...s, ...updates } : s);
    refresh();
  };

  const deleteSupplier = (id) => {
    procurementData.suppliers = procurementData.suppliers.filter(s => s.id !== id);
    refresh();
  };

  return { suppliers, loading, addSupplier, updateSupplier, deleteSupplier };
};

export const useRequisitions = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setRequisitions([...procurementData.requisitions]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addRequisition = (req) => {
    const newReq = { ...req, id: Math.max(...procurementData.requisitions.map(r => r.id), 0) + 1, reqNumber: generatePRNumber(), date: new Date().toISOString().split('T')[0], status: 'draft' };
    procurementData.requisitions = [...procurementData.requisitions, newReq];
    refresh();
  };

  const updateRequisition = (id, updates) => {
    procurementData.requisitions = procurementData.requisitions.map(r => r.id === id ? { ...r, ...updates } : r);
    refresh();
  };

  const deleteRequisition = (id) => {
    procurementData.requisitions = procurementData.requisitions.filter(r => r.id !== id);
    refresh();
  };

  const approveRequisition = (id) => {
    procurementData.requisitions = procurementData.requisitions.map(r => r.id === id ? { ...r, status: 'approved' } : r);
    refresh();
  };

  return { requisitions, loading, addRequisition, updateRequisition, deleteRequisition, approveRequisition };
};

export const usePurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setOrders([...procurementData.purchaseOrders]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addOrder = (order) => {
    const newOrder = { ...order, id: Math.max(...procurementData.purchaseOrders.map(o => o.id), 0) + 1, poNumber: generatePONumber(), orderDate: new Date().toISOString().split('T')[0], status: 'draft', paymentStatus: 'unpaid' };
    procurementData.purchaseOrders = [...procurementData.purchaseOrders, newOrder];
    refresh();
  };

  const updateOrder = (id, updates) => {
    procurementData.purchaseOrders = procurementData.purchaseOrders.map(o => o.id === id ? { ...o, ...updates } : o);
    refresh();
  };

  const deleteOrder = (id) => {
    procurementData.purchaseOrders = procurementData.purchaseOrders.filter(o => o.id !== id);
    refresh();
  };

  const approveOrder = (id) => {
    procurementData.purchaseOrders = procurementData.purchaseOrders.map(o => o.id === id ? { ...o, status: 'approved' } : o);
    refresh();
  };

  const sendOrder = (id) => {
    procurementData.purchaseOrders = procurementData.purchaseOrders.map(o => o.id === id ? { ...o, status: 'ordered' } : o);
    refresh();
  };

  return { orders, loading, addOrder, updateOrder, deleteOrder, approveOrder, sendOrder };
};

export const useReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setReceipts([...procurementData.receipts]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addReceipt = (receipt) => {
    const newReceipt = { ...receipt, id: Math.max(...procurementData.receipts.map(r => r.id), 0) + 1, receiptNumber: generateGRNNumber(), receivedDate: new Date().toISOString().split('T')[0] };
    procurementData.receipts = [...procurementData.receipts, newReceipt];
    refresh();
  };

  const deleteReceipt = (id) => {
    procurementData.receipts = procurementData.receipts.filter(r => r.id !== id);
    refresh();
  };

  return { receipts, loading, addReceipt, deleteReceipt };
};

export const useContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setContracts([...procurementData.contracts]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addContract = (contract) => {
    const newContract = { ...contract, id: Math.max(...procurementData.contracts.map(c => c.id), 0) + 1, contractNumber: generateContractNumber() };
    procurementData.contracts = [...procurementData.contracts, newContract];
    refresh();
  };

  const updateContract = (id, updates) => {
    procurementData.contracts = procurementData.contracts.map(c => c.id === id ? { ...c, ...updates } : c);
    refresh();
  };

  const deleteContract = (id) => {
    procurementData.contracts = procurementData.contracts.filter(c => c.id !== id);
    refresh();
  };

  return { contracts, loading, addContract, updateContract, deleteContract };
};

export const useRFQs = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setRfqs([...procurementData.rfqs]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addRFQ = (rfq) => {
    const newRFQ = { ...rfq, id: Math.max(...procurementData.rfqs.map(r => r.id), 0) + 1, rfqNumber: generateRFQNumber(), issueDate: new Date().toISOString().split('T')[0], suppliers: 0, responses: 0, status: 'draft' };
    procurementData.rfqs = [...procurementData.rfqs, newRFQ];
    refresh();
  };

  const updateRFQ = (id, updates) => {
    procurementData.rfqs = procurementData.rfqs.map(r => r.id === id ? { ...r, ...updates } : r);
    refresh();
  };

  const deleteRFQ = (id) => {
    procurementData.rfqs = procurementData.rfqs.filter(r => r.id !== id);
    refresh();
  };

  return { rfqs, loading, addRFQ, updateRFQ, deleteRFQ };
};
