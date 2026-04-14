import { useState, useEffect } from 'react';
import { 
  getMockProducts, 
  getMockBOMs, 
  getMockProductionOrders, 
  getMockWorkCenters,
  getMockQualityChecks,
  getMockCostTracking
} from '../lib/manufacturingService';

// Global state for products
let globalProducts = null;
let globalProductionOrders = null;

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalProducts) {
          setProducts(globalProducts);
        } else {
          const data = getMockProducts();
          globalProducts = data;
          setProducts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Math.max(...products.map(p => p.id), 0) + 1 };
    const updated = [...products, newProduct];
    globalProducts = updated;
    setProducts(updated);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    globalProducts = updated;
    setProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    globalProducts = updated;
    setProducts(updated);
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export const useBOMs = () => {
  const [boms, setBOMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockBOMs();
        setBOMs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { boms, loading, error };
};

export const useProductionOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalProductionOrders) {
          setOrders(globalProductionOrders);
        } else {
          const data = getMockProductionOrders();
          globalProductionOrders = data;
          setOrders(data);
        }
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
      orderNumber: `PO-2026-${String(orders.length + 1).padStart(3, '0')}`
    };
    const updated = [...orders, newOrder];
    globalProductionOrders = updated;
    setOrders(updated);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    globalProductionOrders = updated;
    setOrders(updated);
  };

  return { orders, loading, error, addOrder, updateOrderStatus };
};

export const useWorkCenters = () => {
  const [workCenters, setWorkCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockWorkCenters();
        setWorkCenters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { workCenters, loading, error };
};

export const useQualityChecks = () => {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockQualityChecks();
        setChecks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addCheck = (check) => {
    setChecks(prev => [{ ...check, id: Math.max(...prev.map(c => c.id), 0) + 1 }, ...prev]);
  };

  const updateCheckStatus = (id, status) => {
    setChecks(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return { checks, loading, error, addCheck, updateCheckStatus };
};

export const useCostTracking = () => {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockCostTracking();
        setCosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { costs, loading, error };
};
