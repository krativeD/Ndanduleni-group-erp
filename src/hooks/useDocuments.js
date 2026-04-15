import { useState, useEffect } from 'react';
import { documentsData, getFileIcon, formatFileSize } from '../lib/documentsService';

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setFolders([...documentsData.folders]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const addFolder = (folder) => {
    const newFolder = { ...folder, id: Math.max(...documentsData.folders.map(f => f.id), 0) + 1, createdAt: new Date().toISOString().split('T')[0] };
    documentsData.folders = [...documentsData.folders, newFolder];
    refresh();
  };

  const deleteFolder = (id) => {
    documentsData.folders = documentsData.folders.filter(f => f.id !== id);
    refresh();
  };

  return { folders, loading, addFolder, deleteFolder };
};

export const useDocuments = (folderId = null) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    const filtered = folderId ? documentsData.documents.filter(d => d.folder === folderId) : documentsData.documents;
    setDocuments(filtered);
  };

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, [folderId]);

  const uploadDocument = (doc) => {
    const newDoc = { ...doc, id: Math.max(...documentsData.documents.map(d => d.id), 0) + 1, uploadedAt: new Date().toISOString().split('T')[0], version: '1.0', status: 'draft', shared: [] };
    documentsData.documents = [...documentsData.documents, newDoc];
    refresh();
  };

  const updateDocument = (id, updates) => {
    documentsData.documents = documentsData.documents.map(d => d.id === id ? { ...d, ...updates } : d);
    refresh();
  };

  const deleteDocument = (id) => {
    const doc = documentsData.documents.find(d => d.id === id);
    documentsData.documents = documentsData.documents.filter(d => d.id !== id);
    documentsData.trash = [...documentsData.trash, { ...doc, deletedAt: new Date().toISOString().split('T')[0], deletedBy: 'Current User' }];
    refresh();
  };

  const shareDocument = (id, emails) => {
    documentsData.documents = documentsData.documents.map(d => d.id === id ? { ...d, shared: emails } : d);
    refresh();
  };

  return { documents, loading, uploadDocument, updateDocument, deleteDocument, shareDocument, getFileIcon, formatFileSize };
};

export const useTrash = () => {
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setTrash([...documentsData.trash]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const restoreDocument = (id) => {
    const doc = documentsData.trash.find(d => d.id === id);
    if (doc) {
      documentsData.documents = [...documentsData.documents, { ...doc, id: Math.max(...documentsData.documents.map(d => d.id), 0) + 1 }];
      documentsData.trash = documentsData.trash.filter(d => d.id !== id);
      refresh();
    }
  };

  const permanentDelete = (id) => {
    documentsData.trash = documentsData.trash.filter(d => d.id !== id);
    refresh();
  };

  return { trash, loading, restoreDocument, permanentDelete };
};

export const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTemplates(documentsData.templates);
    setLoading(false);
  }, []);

  return { templates, loading };
};

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => setWorkflows([...documentsData.workflows]);

  useEffect(() => {
    setLoading(true);
    refresh();
    setLoading(false);
  }, []);

  const updateWorkflowStatus = (id, status) => {
    documentsData.workflows = documentsData.workflows.map(w => w.id === id ? { ...w, status } : w);
    refresh();
  };

  return { workflows, loading, updateWorkflowStatus };
};

export const useVersionHistory = (documentId) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const filtered = documentsData.versionHistory.filter(v => v.documentId === documentId);
    setVersions(filtered);
    setLoading(false);
  }, [documentId]);

  return { versions, loading };
};
