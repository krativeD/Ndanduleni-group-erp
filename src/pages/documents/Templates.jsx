import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useTemplates } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Templates = () => {
  const { templates, loading, addTemplate, updateTemplate, deleteTemplate, useTemplate } = useTemplates();
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'docx', category: 'General' });

  const handleAdd = () => {
    setEditingTemplate(null);
    setFormData({ name: '', type: 'docx', category: 'General' });
    setShowForm(true);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({ name: template.name, type: template.type, category: template.category });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this template?')) {
      deleteTemplate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTemplate) {
      updateTemplate(editingTemplate.id, formData);
    } else {
      addTemplate(formData);
    }
    setShowForm(false);
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.templatesCard}>
      <div className={styles.header}>
        <h3>Templates</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Add Template</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingTemplate ? 'Edit Template' : 'New Template'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Template Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <select className={styles.select} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="docx">Word Document</option>
                <option value="xlsx">Excel Spreadsheet</option>
                <option value="pptx">PowerPoint</option>
                <option value="pdf">PDF</option>
              </select>
              <select className={styles.select} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="HR">HR</option><option value="Sales">Sales</option><option value="Finance">Finance</option><option value="Procurement">Procurement</option><option value="General">General</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingTemplate ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.templateGrid}>
        {templates.map(t => (
          <div key={t.id} className={styles.templateItem}>
            <span className={styles.templateIcon}>📋</span>
            <span className={styles.templateName}>{t.name}</span>
            <span className={styles.templateMeta}>{t.category} • {t.type.toUpperCase()} • Used {t.usageCount} times</span>
            <div className={styles.templateActions}>
              <Button size="small" variant="success" onClick={() => useTemplate(t.id)}>Use</Button>
              <button className={styles.actionBtn} onClick={() => handleEdit(t)}>✏️</button>
              <button className={styles.actionBtn} onClick={() => handleDelete(t.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Templates;
