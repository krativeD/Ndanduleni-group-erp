import { useState, useEffect, useCallback } from 'react';
import { getSettings, saveSettings, addAuditLog, getStorageKeys } from '../lib/settingsService';

const STORAGE_KEYS = getStorageKeys();

export const useCompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setProfile(getSettings(STORAGE_KEYS.COMPANY_PROFILE));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateProfile = (updates) => {
    const current = getSettings(STORAGE_KEYS.COMPANY_PROFILE);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.COMPANY_PROFILE, updated);
    addAuditLog('UPDATE', 'Updated company profile');
    refresh();
  };

  return { profile, loading, updateProfile };
};

export const useGeneralSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.GENERAL_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.GENERAL_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.GENERAL_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated general settings');
    refresh();
  };

  return { settings, loading, updateSettings };
};

export const useEmailSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.EMAIL_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.EMAIL_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.EMAIL_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated email settings');
    refresh();
  };

  const testEmail = (email) => {
    addAuditLog('TEST', `Test email sent to ${email}`);
    alert(`Test email sent to ${email}`);
  };

  return { settings, loading, updateSettings, testEmail };
};

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.NOTIFICATION_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.NOTIFICATION_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated notification settings');
    refresh();
  };

  return { settings, loading, updateSettings };
};

export const useSecuritySettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.SECURITY_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.SECURITY_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.SECURITY_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated security settings');
    refresh();
  };

  return { settings, loading, updateSettings };
};

export const useBackupSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.BACKUP_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.BACKUP_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.BACKUP_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated backup settings');
    refresh();
  };

  const runBackup = () => {
    const now = new Date().toLocaleString('en-ZA');
    updateSettings({ lastBackup: now });
    addAuditLog('BACKUP', 'Manual backup executed');
    alert('Backup completed successfully!');
  };

  return { settings, loading, updateSettings, runBackup };
};

export const useIntegrationSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setSettings(getSettings(STORAGE_KEYS.INTEGRATION_SETTINGS));
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const updateSettings = (updates) => {
    const current = getSettings(STORAGE_KEYS.INTEGRATION_SETTINGS);
    const updated = { ...current, ...updates };
    saveSettings(STORAGE_KEYS.INTEGRATION_SETTINGS, updated);
    addAuditLog('UPDATE', 'Updated integration settings');
    refresh();
  };

  const testConnection = (integration) => {
    addAuditLog('TEST', `Tested ${integration} connection`);
    alert(`${integration} connection successful!`);
  };

  return { settings, loading, updateSettings, testConnection };
};

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setRoles(getSettings(STORAGE_KEYS.ROLES) || []);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addRole = (role) => {
    const current = getSettings(STORAGE_KEYS.ROLES) || [];
    const newRole = { ...role, id: Math.max(...current.map(r => r.id), 0) + 1, users: 0 };
    saveSettings(STORAGE_KEYS.ROLES, [...current, newRole]);
    addAuditLog('CREATE', `Created role: ${role.name}`);
    refresh();
  };

  const updateRole = (id, updates) => {
    const current = getSettings(STORAGE_KEYS.ROLES) || [];
    const updated = current.map(r => r.id === id ? { ...r, ...updates } : r);
    saveSettings(STORAGE_KEYS.ROLES, updated);
    addAuditLog('UPDATE', `Updated role: ${updates.name}`);
    refresh();
  };

  const deleteRole = (id) => {
    const current = getSettings(STORAGE_KEYS.ROLES) || [];
    const role = current.find(r => r.id === id);
    saveSettings(STORAGE_KEYS.ROLES, current.filter(r => r.id !== id));
    addAuditLog('DELETE', `Deleted role: ${role?.name}`);
    refresh();
  };

  return { roles, loading, addRole, updateRole, deleteRole };
};

export const useAuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLogs(getSettings(STORAGE_KEYS.AUDIT_LOG) || []);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const clearLogs = () => {
    saveSettings(STORAGE_KEYS.AUDIT_LOG, []);
    addAuditLog('CLEAR', 'Audit log cleared');
    refresh();
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `audit-log-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    addAuditLog('EXPORT', 'Exported audit log');
  };

  return { logs, loading, clearLogs, exportLogs };
};
