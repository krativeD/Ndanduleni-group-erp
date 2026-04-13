import { useState, useEffect } from 'react';
import { getMockEmployees, getMockAttendance, getMockLeaveRequests } from '../lib/hrService';

// Global state for employees (so changes persist across pages)
let globalEmployees = null;

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalEmployees) {
          setEmployees(globalEmployees);
        } else {
          const data = getMockEmployees();
          globalEmployees = data;
          setEmployees(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Math.max(...employees.map(e => e.id), 0) + 1,
      status: 'active',
      join_date: new Date().toISOString().split('T')[0]
    };
    const updated = [...employees, newEmployee];
    globalEmployees = updated;
    setEmployees(updated);
    return newEmployee;
  };

  const updateEmployee = (id, updates) => {
    const updated = employees.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    );
    globalEmployees = updated;
    setEmployees(updated);
    return updated.find(e => e.id === id);
  };

  const deleteEmployee = (id) => {
    const updated = employees.filter(emp => emp.id !== id);
    globalEmployees = updated;
    setEmployees(updated);
  };

  return { employees, loading, error, addEmployee, updateEmployee, deleteEmployee };
};

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockAttendance();
        setAttendance(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { attendance, loading, error };
};

export const useLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockLeaveRequests();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateRequest = (id, updates) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, ...updates } : req)
    );
  };

  return { requests, loading, error, updateRequest };
};
