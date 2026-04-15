// Document Management Service with persistent storage simulation

const STORAGE_KEYS = {
  FOLDERS: 'ndanduleni_documents_folders',
  DOCUMENTS: 'ndanduleni_documents',
  VERSION_HISTORY: 'ndanduleni_version_history',
  WORKFLOWS: 'ndanduleni_workflows',
  TEMPLATES: 'ndanduleni_templates',
  TRASH: 'ndanduleni_trash'
};

// Initialize with mock data if empty
const initializeData = () => {
  // Folders
  if (!localStorage.getItem(STORAGE_KEYS.FOLDERS)) {
    const defaultFolders = [
      { id: 1, name: 'HR Documents', parent: null, createdBy: 'System', createdAt: '2026-01-15', color: '#6366f1' },
      { id: 2, name: 'Contracts', parent: null, createdBy: 'System', createdAt: '2026-01-15', color: '#10b981' },
      { id: 3, name: 'Invoices', parent: null, createdBy: 'System', createdAt: '2026-01-15', color: '#f59e0b' },
      { id: 4, name: 'Employee Contracts', parent: 1, createdBy: 'HR Manager', createdAt: '2026-02-10', color: '#6366f1' },
      { id: 5, name: 'Policies', parent: 1, createdBy: 'HR Manager', createdAt: '2026-02-10', color: '#6366f1' },
      { id: 6, name: 'Supplier Contracts', parent: 2, createdBy: 'Procurement', createdAt: '2026-02-15', color: '#10b981' },
      { id: 7, name: 'Client Contracts', parent: 2, createdBy: 'Sales', createdAt: '2026-02-15', color: '#10b981' },
      { id: 8, name: '2026 Invoices', parent: 3, createdBy: 'Finance', createdAt: '2026-03-01', color: '#f59e0b' }
    ];
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(defaultFolders));
  }

  // Documents with base64 content simulation
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    const defaultDocuments = [
      { 
        id: 1, 
        name: 'Employee Handbook 2026.pdf', 
        folder: 5, 
        type: 'pdf', 
        size: 2450000, 
        uploadedBy: 'HR Manager', 
        uploadedAt: '2026-03-10', 
        version: '2.1', 
        status: 'published',
        tags: ['hr', 'policy', 'handbook'],
        shared: ['ceo@ndanduleni.co.za', 'admin@ndanduleni.co.za'],
        content: 'PDF_CONTENT_PLACEHOLDER'
      },
      { 
        id: 2, 
        name: 'John Mbeki - Employment Contract.docx', 
        folder: 4, 
        type: 'docx', 
        size: 850000, 
        uploadedBy: 'HR Manager', 
        uploadedAt: '2026-03-15', 
        version: '1.0', 
        status: 'published',
        tags: ['contract', 'employee', 'john mbeki'],
        shared: ['ceo@ndanduleni.co.za'],
        content: 'DOCX_CONTENT_PLACEHOLDER'
      },
      { 
        id: 3, 
        name: 'Sandton City - Service Agreement.pdf', 
        folder: 7, 
        type: 'pdf', 
        size: 1250000, 
        uploadedBy: 'Sales Manager', 
        uploadedAt: '2026-04-01', 
        version: '1.2', 
        status: 'published',
        tags: ['contract', 'client', 'sandton'],
        shared: ['ceo@ndanduleni.co.za', 'legal@ndanduleni.co.za'],
        content: 'PDF_CONTENT_PLACEHOLDER'
      },
      { 
        id: 4, 
        name: 'April 2026 Payroll Report.xlsx', 
        folder: 1, 
        type: 'xlsx', 
        size: 450000, 
        uploadedBy: 'Finance Manager', 
        uploadedAt: '2026-04-14', 
        version: '1.0', 
        status: 'draft',
        tags: ['payroll', 'finance', 'april'],
        shared: [],
        content: 'XLSX_CONTENT_PLACEHOLDER'
      },
      { 
        id: 5, 
        name: 'Q2 Procurement Plan.pptx', 
        folder: null, 
        type: 'pptx', 
        size: 3200000, 
        uploadedBy: 'Procurement Manager', 
        uploadedAt: '2026-04-10', 
        version: '1.0', 
        status: 'review',
        tags: ['procurement', 'planning', 'q2'],
        shared: ['ceo@ndanduleni.co.za', 'finance@ndanduleni.co.za'],
        content: 'PPTX_CONTENT_PLACEHOLDER'
      },
      { 
        id: 6, 
        name: 'Cleaning Procedures Manual.pdf', 
        folder: 5, 
        type: 'pdf', 
        size: 5600000, 
        uploadedBy: 'Operations Manager', 
        uploadedAt: '2026-02-20', 
        version: '3.0', 
        status: 'published',
        tags: ['procedures', 'cleaning', 'manual'],
        shared: ['all-staff@ndanduleni.co.za'],
        content: 'PDF_CONTENT_PLACEHOLDER'
      },
      { 
        id: 7, 
        name: 'INV-2026-001.pdf', 
        folder: 8, 
        type: 'pdf', 
        size: 180000, 
        uploadedBy: 'Finance', 
        uploadedAt: '2026-04-05', 
        version: '1.0', 
        status: 'published',
        tags: ['invoice', '2026'],
        shared: [],
        content: 'PDF_CONTENT_PLACEHOLDER'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(defaultDocuments));
  }

  // Version History
  if (!localStorage.getItem(STORAGE_KEYS.VERSION_HISTORY)) {
    const defaultHistory = [
      { id: 1, documentId: 1, version: '2.0', uploadedBy: 'HR Manager', uploadedAt: '2026-02-15', size: 2300000, notes: 'Updated policies section' },
      { id: 2, documentId: 1, version: '1.0', uploadedBy: 'HR Manager', uploadedAt: '2026-01-10', size: 2100000, notes: 'Initial version' },
      { id: 3, documentId: 3, version: '1.1', uploadedBy: 'Sales Manager', uploadedAt: '2026-03-20', size: 1200000, notes: 'Updated payment terms' },
      { id: 4, documentId: 3, version: '1.0', uploadedBy: 'Sales Manager', uploadedAt: '2026-03-01', size: 1180000, notes: 'Initial draft' }
    ];
    localStorage.setItem(STORAGE_KEYS.VERSION_HISTORY, JSON.stringify(defaultHistory));
  }

  // Workflows
  if (!localStorage.getItem(STORAGE_KEYS.WORKFLOWS)) {
    const defaultWorkflows = [
      { id: 1, name: 'Contract Approval', documentId: 3, document: 'Sandton City - Service Agreement.pdf', currentStep: 'Legal Review', assignedTo: 'Legal Team', dueDate: '2026-04-20', status: 'in-progress', steps: ['Draft', 'Manager Review', 'Legal Review', 'CEO Approval', 'Signed'] },
      { id: 2, name: 'Policy Update', documentId: 1, document: 'Employee Handbook 2026.pdf', currentStep: 'HR Review', assignedTo: 'HR Manager', dueDate: '2026-04-18', status: 'in-progress', steps: ['Draft Changes', 'HR Review', 'Legal Review', 'Publish'] },
      { id: 3, name: 'Invoice Approval', documentId: 7, document: 'INV-2026-001.pdf', currentStep: 'Completed', assignedTo: 'Finance', dueDate: '2026-04-05', status: 'completed', steps: ['Generate', 'Review', 'Send'] }
    ];
    localStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(defaultWorkflows));
  }

  // Templates
  if (!localStorage.getItem(STORAGE_KEYS.TEMPLATES)) {
    const defaultTemplates = [
      { id: 1, name: 'Employment Contract Template', type: 'docx', category: 'HR', lastUsed: '2026-03-15', usageCount: 12, content: 'TEMPLATE_CONTENT' },
      { id: 2, name: 'Service Agreement Template', type: 'docx', category: 'Sales', lastUsed: '2026-04-01', usageCount: 8, content: 'TEMPLATE_CONTENT' },
      { id: 3, name: 'Invoice Template', type: 'xlsx', category: 'Finance', lastUsed: '2026-04-14', usageCount: 45, content: 'TEMPLATE_CONTENT' },
      { id: 4, name: 'Purchase Order Template', type: 'docx', category: 'Procurement', lastUsed: '2026-04-10', usageCount: 23, content: 'TEMPLATE_CONTENT' }
    ];
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(defaultTemplates));
  }

  // Trash
  if (!localStorage.getItem(STORAGE_KEYS.TRASH)) {
    const defaultTrash = [
      { id: 1, name: 'Old Policy 2025.pdf', folder: null, deletedAt: '2026-03-01', deletedBy: 'HR Manager', size: 1500000, type: 'pdf' },
      { id: 2, name: 'Draft Contract.docx', folder: null, deletedAt: '2026-03-15', deletedBy: 'Sales Manager', size: 450000, type: 'docx' }
    ];
    localStorage.setItem(STORAGE_KEYS.TRASH, JSON.stringify(defaultTrash));
  }
};

// Initialize on module load
initializeData();

// Helper functions
export const getDocumentsData = (section) => {
  const key = section === 'folders' ? STORAGE_KEYS.FOLDERS :
              section === 'documents' ? STORAGE_KEYS.DOCUMENTS :
              section === 'versionHistory' ? STORAGE_KEYS.VERSION_HISTORY :
              section === 'workflows' ? STORAGE_KEYS.WORKFLOWS :
              section === 'templates' ? STORAGE_KEYS.TEMPLATES :
              section === 'trash' ? STORAGE_KEYS.TRASH : null;
  
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveDocumentsData = (section, data) => {
  const key = section === 'folders' ? STORAGE_KEYS.FOLDERS :
              section === 'documents' ? STORAGE_KEYS.DOCUMENTS :
              section === 'versionHistory' ? STORAGE_KEYS.VERSION_HISTORY :
              section === 'workflows' ? STORAGE_KEYS.WORKFLOWS :
              section === 'templates' ? STORAGE_KEYS.TEMPLATES :
              section === 'trash' ? STORAGE_KEYS.TRASH : null;
  
  if (key) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getFileIcon = (type) => {
  const icons = {
    pdf: '📄', docx: '📝', xlsx: '📊', pptx: '📽️',
    jpg: '🖼️', png: '🖼️', txt: '📃', default: '📁'
  };
  return icons[type] || icons.default;
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// Generate PDF preview content
export const generatePDFPreview = (document) => {
  return {
    title: document.name,
    content: `This is a preview of ${document.name}. In production, this would display the actual PDF content.`,
    type: document.type,
    size: formatFileSize(document.size),
    uploadedBy: document.uploadedBy,
    uploadedAt: document.uploadedAt,
    version: document.version
  };
};
