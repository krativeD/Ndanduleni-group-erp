import { useState, useEffect, useCallback } from 'react';
import { getDocumentsData, saveDocumentsData, getFileIcon, formatFileSize } from '../lib/documentsService';

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const data = getDocumentsData('folders');
    setFolders(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addFolder = (folder) => {
    const currentFolders = getDocumentsData('folders');
    const newFolder = { 
      ...folder, 
      id: Math.max(...currentFolders.map(f => f.id), 0) + 1, 
      createdAt: new Date().toISOString().split('T')[0] 
    };
    const updated = [...currentFolders, newFolder];
    saveDocumentsData('folders', updated);
    refresh();
  };

  const updateFolder = (id, updates) => {
    const currentFolders = getDocumentsData('folders');
    const updated = currentFolders.map(f => f.id === id ? { ...f, ...updates } : f);
    saveDocumentsData('folders', updated);
    refresh();
  };

  const deleteFolder = (id) => {
    const currentFolders = getDocumentsData('folders');
    const updated = currentFolders.filter(f => f.id !== id);
    saveDocumentsData('folders', updated);
    refresh();
  };

  return { folders, loading, addFolder, updateFolder, deleteFolder };
};

export const useDocuments = (folderId = null) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const allDocs = getDocumentsData('documents');
    const filtered = folderId ? allDocs.filter(d => d.folder === folderId) : allDocs;
    setDocuments(filtered);
  }, [folderId]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const uploadDocument = (doc) => {
    const currentDocs = getDocumentsData('documents');
    const newDoc = { 
      ...doc, 
      id: Math.max(...currentDocs.map(d => d.id), 0) + 1, 
      uploadedAt: new Date().toISOString().split('T')[0], 
      version: '1.0', 
      status: doc.status || 'draft', 
      shared: doc.shared || [] 
    };
    const updated = [...currentDocs, newDoc];
    saveDocumentsData('documents', updated);
    refresh();
    return newDoc;
  };

  const updateDocument = (id, updates) => {
    const currentDocs = getDocumentsData('documents');
    const updated = currentDocs.map(d => d.id === id ? { ...d, ...updates } : d);
    saveDocumentsData('documents', updated);
    refresh();
  };

  const deleteDocument = (id) => {
    const currentDocs = getDocumentsData('documents');
    const currentTrash = getDocumentsData('trash');
    const doc = currentDocs.find(d => d.id === id);
    
    if (doc) {
      const updatedDocs = currentDocs.filter(d => d.id !== id);
      saveDocumentsData('documents', updatedDocs);
      
      const trashItem = { 
        ...doc, 
        deletedAt: new Date().toISOString().split('T')[0], 
        deletedBy: 'Current User' 
      };
      saveDocumentsData('trash', [...currentTrash, trashItem]);
      refresh();
    }
  };

  const shareDocument = (id, emails) => {
    const currentDocs = getDocumentsData('documents');
    const updated = currentDocs.map(d => d.id === id ? { ...d, shared: emails } : d);
    saveDocumentsData('documents', updated);
    refresh();
  };

  const addVersion = (documentId, versionData) => {
    const currentHistory = getDocumentsData('versionHistory');
    const newVersion = {
      ...versionData,
      id: Math.max(...currentHistory.map(v => v.id), 0) + 1,
      documentId,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    saveDocumentsData('versionHistory', [...currentHistory, newVersion]);
  };

  return { 
    documents, 
    loading, 
    uploadDocument, 
    updateDocument, 
    deleteDocument, 
    shareDocument, 
    addVersion,
    getFileIcon, 
    formatFileSize 
  };
};

export const useSharedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const allDocs = getDocumentsData('documents');
    const shared = allDocs.filter(d => d.shared && d.shared.length > 0);
    setDocuments(shared);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  return { documents, loading, refresh, getFileIcon, formatFileSize };
};

export const useTrash = () => {
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const data = getDocumentsData('trash');
    setTrash(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const restoreDocument = (id) => {
    const currentTrash = getDocumentsData('trash');
    const currentDocs = getDocumentsData('documents');
    const doc = currentTrash.find(d => d.id === id);
    
    if (doc) {
      const { deletedAt, deletedBy, ...restoredDoc } = doc;
      restoredDoc.id = Math.max(...currentDocs.map(d => d.id), 0) + 1;
      
      saveDocumentsData('documents', [...currentDocs, restoredDoc]);
      saveDocumentsData('trash', currentTrash.filter(d => d.id !== id));
      refresh();
    }
  };

  const permanentDelete = (id) => {
    const currentTrash = getDocumentsData('trash');
    saveDocumentsData('trash', currentTrash.filter(d => d.id !== id));
    refresh();
  };

  const emptyTrash = () => {
    saveDocumentsData('trash', []);
    refresh();
  };

  return { trash, loading, restoreDocument, permanentDelete, emptyTrash, refresh };
};

export const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const data = getDocumentsData('templates');
    setTemplates(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addTemplate = (template) => {
    const currentTemplates = getDocumentsData('templates');
    const newTemplate = {
      ...template,
      id: Math.max(...currentTemplates.map(t => t.id), 0) + 1,
      usageCount: 0,
      lastUsed: null
    };
    saveDocumentsData('templates', [...currentTemplates, newTemplate]);
    refresh();
  };

  const updateTemplate = (id, updates) => {
    const currentTemplates = getDocumentsData('templates');
    const updated = currentTemplates.map(t => t.id === id ? { ...t, ...updates } : t);
    saveDocumentsData('templates', updated);
    refresh();
  };

  const deleteTemplate = (id) => {
    const currentTemplates = getDocumentsData('templates');
    saveDocumentsData('templates', currentTemplates.filter(t => t.id !== id));
    refresh();
  };

  const useTemplate = (id) => {
    const currentTemplates = getDocumentsData('templates');
    const updated = currentTemplates.map(t => 
      t.id === id ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] } : t
    );
    saveDocumentsData('templates', updated);
    refresh();
  };

  return { templates, loading, addTemplate, updateTemplate, deleteTemplate, useTemplate, refresh };
};

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const data = getDocumentsData('workflows');
    setWorkflows(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const addWorkflow = (workflow) => {
    const currentWorkflows = getDocumentsData('workflows');
    const newWorkflow = {
      ...workflow,
      id: Math.max(...currentWorkflows.map(w => w.id), 0) + 1,
      status: 'in-progress'
    };
    saveDocumentsData('workflows', [...currentWorkflows, newWorkflow]);
    refresh();
  };

  const updateWorkflow = (id, updates) => {
    const currentWorkflows = getDocumentsData('workflows');
    const updated = currentWorkflows.map(w => w.id === id ? { ...w, ...updates } : w);
    saveDocumentsData('workflows', updated);
    refresh();
  };

  const deleteWorkflow = (id) => {
    const currentWorkflows = getDocumentsData('workflows');
    saveDocumentsData('workflows', currentWorkflows.filter(w => w.id !== id));
    refresh();
  };

  const updateWorkflowStatus = (id, status) => {
    const currentWorkflows = getDocumentsData('workflows');
    const updated = currentWorkflows.map(w => w.id === id ? { ...w, status } : w);
    saveDocumentsData('workflows', updated);
    refresh();
  };

  return { workflows, loading, addWorkflow, updateWorkflow, deleteWorkflow, updateWorkflowStatus, refresh };
};

export const useVersionHistory = (documentId) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const allHistory = getDocumentsData('versionHistory');
    const filtered = allHistory.filter(v => v.documentId === documentId);
    setVersions(filtered.sort((a, b) => b.id - a.id));
  }, [documentId]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  return { versions, loading, refresh };
};

export const useArchive = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const allDocs = getDocumentsData('documents');
    const archived = allDocs.filter(d => d.status === 'archived');
    setDocuments(archived);
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [refresh]);

  const archiveDocument = (id) => {
    const currentDocs = getDocumentsData('documents');
    const updated = currentDocs.map(d => d.id === id ? { ...d, status: 'archived' } : d);
    saveDocumentsData('documents', updated);
    refresh();
  };

  const unarchiveDocument = (id) => {
    const currentDocs = getDocumentsData('documents');
    const updated = currentDocs.map(d => d.id === id ? { ...d, status: 'published' } : d);
    saveDocumentsData('documents', updated);
    refresh();
  };

  return { documents, loading, archiveDocument, unarchiveDocument, refresh, getFileIcon, formatFileSize };
};
