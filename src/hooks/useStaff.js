import { useState, useEffect, useCallback } from 'react';
import { getStaffData, saveStaffData, getStaffSummary } from '../lib/staffService';

export const useStaffSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSummary(getStaffSummary());
    setLoading(false);
  }, []);

  return { summary, loading };
};

export const useLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setRequests(getStaffData('STAFF_LEAVE'));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateStatus = (id, status, approvedBy = 'Admin') => {
    const current = getStaffData('STAFF_LEAVE');
    const updated = current.map(r => r.id === id ? { ...r, status, approvedBy, approvedOn: new Date().toISOString().split('T')[0] } : r);
    saveStaffData('STAFF_LEAVE', updated);
    refresh();
  };

  const addRequest = (request) => {
    const current = getStaffData('STAFF_LEAVE');
    const newRequest = { ...request, id: Math.max(...current.map(r => r.id), 0) + 1, appliedOn: new Date().toISOString().split('T')[0], status: 'pending' };
    saveStaffData('STAFF_LEAVE', [...current, newRequest]);
    refresh();
  };

  const deleteRequest = (id) => {
    const current = getStaffData('STAFF_LEAVE');
    const updated = current.filter(r => r.id !== id);
    saveStaffData('STAFF_LEAVE', updated);
    refresh();
  };

  return { requests, loading, updateStatus, addRequest, deleteRequest };
};

export const useJobAssignments = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setJobs(getStaffData('STAFF_JOBS'));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateJob = (id, updates) => {
    const current = getStaffData('STAFF_JOBS');
    const updated = current.map(j => j.id === id ? { ...j, ...updates } : j);
    saveStaffData('STAFF_JOBS', updated);
    refresh();
  };

  const assignJob = (job) => {
    const current = getStaffData('STAFF_JOBS');
    const newJob = { ...job, id: Math.max(...current.map(j => j.id), 0) + 1 };
    saveStaffData('STAFF_JOBS', [...current, newJob]);
    refresh();
  };

  const deleteJob = (id) => {
    const current = getStaffData('STAFF_JOBS');
    const updated = current.filter(j => j.id !== id);
    saveStaffData('STAFF_JOBS', updated);
    refresh();
  };

  return { jobs, loading, updateJob, assignJob, deleteJob };
};

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setAttendance(getStaffData('STAFF_ATTENDANCE'));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const recordAttendance = (record) => {
    const current = getStaffData('STAFF_ATTENDANCE');
    
    // Calculate hours if clock in/out provided
    let hours = 0;
    let overtime = 0;
    if (record.clockIn && record.clockOut) {
      const [inH, inM] = record.clockIn.split(':').map(Number);
      const [outH, outM] = record.clockOut.split(':').map(Number);
      hours = (outH - inH) + (outM - inM) / 60;
      overtime = Math.max(0, hours - 8);
      hours = Math.min(hours, 8);
    }
    
    const newRecord = { 
      ...record, 
      id: Math.max(...current.map(a => a.id), 0) + 1,
      hours: Math.round(hours * 10) / 10,
      overtime: Math.round(overtime * 10) / 10
    };
    saveStaffData('STAFF_ATTENDANCE', [...current, newRecord]);
    refresh();
  };

  const deleteAttendance = (id) => {
    const current = getStaffData('STAFF_ATTENDANCE');
    const updated = current.filter(a => a.id !== id);
    saveStaffData('STAFF_ATTENDANCE', updated);
    refresh();
  };

  return { attendance, loading, recordAttendance, deleteAttendance };
};

export const usePerformance = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setReviews(getStaffData('STAFF_PERFORMANCE'));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addReview = (review) => {
    const current = getStaffData('STAFF_PERFORMANCE');
    const newReview = { ...review, id: Math.max(...current.map(r => r.id), 0) + 1 };
    saveStaffData('STAFF_PERFORMANCE', [...current, newReview]);
    refresh();
  };

  const updateReview = (id, updates) => {
    const current = getStaffData('STAFF_PERFORMANCE');
    const updated = current.map(r => r.id === id ? { ...r, ...updates } : r);
    saveStaffData('STAFF_PERFORMANCE', updated);
    refresh();
  };

  const deleteReview = (id) => {
    const current = getStaffData('STAFF_PERFORMANCE');
    const updated = current.filter(r => r.id !== id);
    saveStaffData('STAFF_PERFORMANCE', updated);
    refresh();
  };

  return { reviews, loading, addReview, updateReview, deleteReview };
};

export const useTraining = () => {
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setTraining(getStaffData('STAFF_TRAINING'));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addTraining = (course) => {
    const current = getStaffData('STAFF_TRAINING');
    const newCourse = { ...course, id: Math.max(...current.map(t => t.id), 0) + 1 };
    saveStaffData('STAFF_TRAINING', [...current, newCourse]);
    refresh();
  };

  const updateTraining = (id, updates) => {
    const current = getStaffData('STAFF_TRAINING');
    const updated = current.map(t => t.id === id ? { ...t, ...updates } : t);
    saveStaffData('STAFF_TRAINING', updated);
    refresh();
  };

  const deleteTraining = (id) => {
    const current = getStaffData('STAFF_TRAINING');
    const updated = current.filter(t => t.id !== id);
    saveStaffData('STAFF_TRAINING', updated);
    refresh();
  };

  return { training, loading, addTraining, updateTraining, deleteTraining };
};
