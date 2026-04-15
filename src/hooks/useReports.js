import { useState, useEffect } from 'react';
import { reportsData, getScheduledReports } from '../lib/reportsService';

export const useSalesReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(reportsData.salesSummary);
    setLoading(false);
  }, []);

  return { data, loading };
};

export const useFinancialReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(reportsData.financialSummary);
    setLoading(false);
  }, []);

  return { data, loading };
};

export const useInventoryReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(reportsData.inventorySummary);
    setLoading(false);
  }, []);

  return { data, loading };
};

export const useHRReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(reportsData.hrSummary);
    setLoading(false);
  }, []);

  return { data, loading };
};

export const useServiceReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(reportsData.serviceSummary);
    setLoading(false);
  }, []);

  return { data, loading };
};

export const useScheduledReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReports(getScheduledReports());
    setLoading(false);
  }, []);

  const addScheduledReport = (report) => {
    const newReport = { ...report, id: Math.max(...reports.map(r => r.id), 0) + 1, status: 'active' };
    setReports(prev => [...prev, newReport]);
  };

  const deleteScheduledReport = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return { reports, loading, addScheduledReport, deleteScheduledReport };
};
