import { useState, useEffect } from 'react';
import { getMockContacts, getMockLeads, getMockDeals, getMockActivities, getMockCommunications } from '../lib/crmService';

// Global state for contacts
let globalContacts = null;

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalContacts) {
          setContacts(globalContacts);
        } else {
          const data = getMockContacts();
          globalContacts = data;
          setContacts(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      last_contact: new Date().toISOString().split('T')[0]
    };
    const updated = [...contacts, newContact];
    globalContacts = updated;
    setContacts(updated);
    return newContact;
  };

  const updateContact = (id, updates) => {
    const updated = contacts.map(contact => 
      contact.id === id ? { ...contact, ...updates, last_contact: new Date().toISOString().split('T')[0] } : contact
    );
    globalContacts = updated;
    setContacts(updated);
    return updated.find(c => c.id === id);
  };

  const deleteContact = (id) => {
    const updated = contacts.filter(contact => contact.id !== id);
    globalContacts = updated;
    setContacts(updated);
  };

  return { contacts, loading, error, addContact, updateContact, deleteContact };
};

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockLeads();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { leads, loading, error };
};

export const useDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockDeals();
        setDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { deals, loading, error };
};

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockActivities();
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { activities, loading, error };
};

export const useCommunications = () => {
  const [communications, setCommunications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = getMockCommunications();
        setCommunications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { communications, loading, error };
};
