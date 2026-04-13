import { useState, useEffect } from 'react';
import {
  getMockScheduledJobs,
  getMockTeams,
  getMockEquipment,
  getMockChemicals,
  getMockQualityChecks,
  getMockFeedback
} from '../lib/servicesService';

// Global state for jobs
let globalJobs = null;

export const useScheduledJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalJobs) {
          setJobs(globalJobs);
        } else {
          const data = getMockScheduledJobs();
          globalJobs = data;
          setJobs(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateJobStatus = (id, newStatus) => {
    const updated = jobs.map(job =>
      job.id === id ? { ...job, status: newStatus } : job
    );
    globalJobs = updated;
    setJobs(updated);
    return updated.find(j => j.id === id);
  };

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Math.max(...jobs.map(j => j.id), 0) + 1
    };
    const updated = [...jobs, newJob];
    globalJobs = updated;
    setJobs(updated);
    return newJob;
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(job => job.id !== id);
    globalJobs = updated;
    setJobs(updated);
  };

  const updateJob = (id, updates) => {
    const updated = jobs.map(job =>
      job.id === id ? { ...job, ...updates } : job
    );
    globalJobs = updated;
    setJobs(updated);
    return updated.find(j => j.id === id);
  };

  return { jobs, loading, error, updateJobStatus, addJob, deleteJob, updateJob };
};

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockTeams();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { teams, loading, error };
};

export const useEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockEquipment();
        setEquipment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { equipment, loading, error };
};

export const useChemicals = () => {
  const [chemicals, setChemicals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockChemicals();
        setChemicals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { chemicals, loading, error };
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

  return { checks, loading, error };
};

export const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockFeedback();
        setFeedback(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { feedback, loading, error };
};
