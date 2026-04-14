import { useState, useEffect } from 'react';
import { 
  getMockStockItems, 
  getMockStockMovements, 
  getMockWarehouses, 
  getMockSuppliers,
  getMockPurchaseOrders,
  getMockStockTakeHistory
} from '../lib/inventoryService';

// Global state for stock items
let globalStockItems = null;

export const useStockItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalStockItems) {
          setItems(globalStockItems);
        } else {
          const data = getMockStockItems();
          globalStockItems = data;
          setItems(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Math.max(...items.map(i => i.id), 0) + 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    const updated = [...items, newItem];
    globalStockItems = updated;
    setItems(updated);
    return newItem;
  };

  const updateItem = (id, updates) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : item
    );
    globalStockItems = updated;
    setItems(updated);
    return updated.find(i => i.id === id);
  };

  const deleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    globalStockItems = updated;
    setItems(updated);
  };

  const adjustStock = (id, quantity, type) => {
    const item = items.find(i => i.id === id);
    if (!item) return null;
    
    const newQuantity = type === 'in' ? item.quantity + quantity : item.quantity - quantity;
    const status = newQuantity <= item.minStock ? (newQuantity <= item.minStock / 2 ? 'critical' : 'low-stock') : 'in-stock';
    
    return updateItem(id, { quantity: newQuantity, status });
  };

  return { items, loading, error, addItem, updateItem, deleteItem, adjustStock };
};

export const useStockMovements = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockStockMovements();
        setMovements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addMovement = (movement) => {
    const newMovement = {
      ...movement,
      id: Math.max(...movements.map(m => m.id), 0) + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setMovements(prev => [newMovement, ...prev]);
    return newMovement;
  };

  return { movements, loading, error, addMovement };
};

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockWarehouses();
        setWarehouses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { warehouses, loading, error };
};

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockSuppliers();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addSupplier = (supplier) => {
    const newSupplier = {
      ...supplier,
      id: Math.max(...suppliers.map(s => s.id), 0) + 1
    };
    setSuppliers(prev => [...prev, newSupplier]);
    return newSupplier;
  };

  const updateSupplier = (id, updates) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  return { suppliers, loading, error, addSupplier, updateSupplier, deleteSupplier };
};

export const usePurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockPurchaseOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      poNumber: `PO-2026-${String(orders.length + 1).padStart(3, '0')}`
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return { orders, loading, error, addOrder, updateOrderStatus };
};

export const useStockTakeHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockStockTakeHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addStockTake = (stockTake) => {
    const newStockTake = {
      ...stockTake,
      id: Math.max(...history.map(h => h.id), 0) + 1
    };
    setHistory(prev => [newStockTake, ...prev]);
    return newStockTake;
  };

  return { history, loading, error, addStockTake };
};
