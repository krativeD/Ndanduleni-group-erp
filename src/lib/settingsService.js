// Settings Service with localStorage persistence

const STORAGE_KEYS = {
  COMPANY_PROFILE: 'ndanduleni_company_profile',
  GENERAL_SETTINGS: 'ndanduleni_general_settings',
  EMAIL_SETTINGS: 'ndanduleni_email_settings',
  NOTIFICATION_SETTINGS: 'ndanduleni_notification_settings',
  SECURITY_SETTINGS: 'ndanduleni_security_settings',
  BACKUP_SETTINGS: 'ndanduleni_backup_settings',
  INTEGRATION_SETTINGS: 'ndanduleni_integration_settings',
  ROLES: 'ndanduleni_roles',
  AUDIT_LOG: 'ndanduleni_audit_log'
};

// Initialize default data
const initializeSettings = () => {
  // Company Profile
  if (!localStorage.getItem(STORAGE_KEYS.COMPANY_PROFILE)) {
    const defaultProfile = {
      name: 'Ndanduleni Group',
      legalName: 'Ndanduleni Cleaning Services (Pty) Ltd',
      registrationNumber: '2020/123456/07',
      vatNumber: '4870123456',
      address: '123 Main Street, Sandton, Johannesburg, 2196',
      phone: '+27 11 234 5678',
      email: 'info@ndanduleni.co.za',
      website: 'www.ndanduleni.co.za',
      logo: '/logo.png',
      foundedYear: '2020',
      industry: 'Cleaning Services',
      employeeCount: '48',
      timezone: 'Africa/Johannesburg',
      currency: 'ZAR',
      dateFormat: 'YYYY-MM-DD'
    };
    localStorage.setItem(STORAGE_KEYS.COMPANY_PROFILE, JSON.stringify(defaultProfile));
  }

  // General Settings
  if (!localStorage.getItem(STORAGE_KEYS.GENERAL_SETTINGS)) {
    const defaultGeneral = {
      language: 'English',
      timezone: 'Africa/Johannesburg',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      weekStartsOn: 'Monday',
      fiscalYearStart: 'January',
      defaultCurrency: 'ZAR',
      taxRate: 15,
      sessionTimeout: 30,
      itemsPerPage: 25
    };
    localStorage.setItem(STORAGE_KEYS.GENERAL_SETTINGS, JSON.stringify(defaultGeneral));
  }

  // Email Settings
  if (!localStorage.getItem(STORAGE_KEYS.EMAIL_SETTINGS)) {
    const defaultEmail = {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: 'noreply@ndanduleni.co.za',
      fromEmail: 'noreply@ndanduleni.co.za',
      fromName: 'Ndanduleni ERP',
      emailSignature: 'Best regards,\nNdanduleni Group Team',
      enabled: true
    };
    localStorage.setItem(STORAGE_KEYS.EMAIL_SETTINGS, JSON.stringify(defaultEmail));
  }

  // Notification Settings
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS)) {
    const defaultNotifications = {
      emailNotifications: true,
      inAppNotifications: true,
      notifyOnNewUser: true,
      notifyOnOrder: true,
      notifyOnInvoice: true,
      notifyOnPayment: true,
      notifyOnLowStock: true,
      notifyOnLeaveRequest: true,
      dailyDigest: false,
      weeklyReport: true
    };
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(defaultNotifications));
  }

  // Security Settings
  if (!localStorage.getItem(STORAGE_KEYS.SECURITY_SETTINGS)) {
    const defaultSecurity = {
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumber: true,
      passwordRequireSpecial: true,
      passwordExpiryDays: 90,
      mfaEnabled: false,
      mfaRequiredForAdmins: true,
      loginAttempts: 5,
      lockoutDuration: 15,
      sessionTimeout: 30,
      ipWhitelist: '',
      auditLogEnabled: true
    };
    localStorage.setItem(STORAGE_KEYS.SECURITY_SETTINGS, JSON.stringify(defaultSecurity));
  }

  // Backup Settings
  if (!localStorage.getItem(STORAGE_KEYS.BACKUP_SETTINGS)) {
    const defaultBackup = {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      backupRetention: 30,
      backupLocation: 'cloud',
      includeAttachments: true,
      lastBackup: '2026-04-15 02:00',
      nextBackup: '2026-04-16 02:00'
    };
    localStorage.setItem(STORAGE_KEYS.BACKUP_SETTINGS, JSON.stringify(defaultBackup));
  }

  // Integration Settings
  if (!localStorage.getItem(STORAGE_KEYS.INTEGRATION_SETTINGS)) {
    const defaultIntegrations = {
      paymentGateway: 'stripe',
      stripePublishableKey: 'pk_test_',
      emailProvider: 'smtp',
      smsProvider: 'twilio',
      accountingSoftware: 'none',
      crmIntegration: 'none',
      slackWebhook: '',
      apiEnabled: true
    };
    localStorage.setItem(STORAGE_KEYS.INTEGRATION_SETTINGS, JSON.stringify(defaultIntegrations));
  }

  // Roles
  if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
    const defaultRoles = [
      { id: 1, name: 'CEO', permissions: ['all'], description: 'Full system access', users: 1 },
      { id: 2, name: 'Admin', permissions: ['users', 'hr', 'crm', 'services', 'inventory', 'sales', 'finance', 'procurement', 'reports', 'documents'], description: 'Administrative access', users: 3 },
      { id: 3, name: 'Manager', permissions: ['hr', 'services', 'inventory', 'reports'], description: 'Department management', users: 5 },
      { id: 4, name: 'Staff', permissions: ['attendance', 'tasks', 'services'], description: 'Basic access', users: 39 }
    ];
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(defaultRoles));
  }

  // Audit Log
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOG)) {
    const defaultLogs = [
      { id: 1, timestamp: '2026-04-15 08:30', user: 'John Mbeki', action: 'LOGIN', details: 'Successful login', ip: '192.168.1.1' },
      { id: 2, timestamp: '2026-04-15 09:15', user: 'Sarah Ndlovu', action: 'CREATE', details: 'Created new employee record', ip: '192.168.1.45' },
      { id: 3, timestamp: '2026-04-15 10:30', user: 'Emily Zulu', action: 'UPDATE', details: 'Updated invoice #INV-2026-001', ip: '192.168.1.32' },
      { id: 4, timestamp: '2026-04-15 11:45', user: 'System', action: 'BACKUP', details: 'Automated backup completed', ip: 'localhost' },
      { id: 5, timestamp: '2026-04-15 14:20', user: 'Mike Khumalo', action: 'DELETE', details: 'Deleted old document', ip: '192.168.1.78' },
      { id: 6, timestamp: '2026-04-15 16:00', user: 'John Mbeki', action: 'LOGOUT', details: 'User logged out', ip: '192.168.1.1' }
    ];
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(defaultLogs));
  }
};

initializeSettings();

// Helper functions
export const getSettings = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveSettings = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

export const addAuditLog = (action, details, user = 'Current User') => {
  const logs = getSettings(STORAGE_KEYS.AUDIT_LOG) || [];
  const newLog = {
    id: Math.max(...logs.map(l => l.id), 0) + 1,
    timestamp: new Date().toLocaleString('en-ZA'),
    user,
    action,
    details,
    ip: '127.0.0.1'
  };
  logs.unshift(newLog);
  if (logs.length > 100) logs.pop();
  saveSettings(STORAGE_KEYS.AUDIT_LOG, logs);
  return newLog;
};

export const getStorageKeys = () => STORAGE_KEYS;
