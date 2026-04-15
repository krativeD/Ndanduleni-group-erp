import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useWorkflows, useDocuments } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Workflows = () => {
  const { workflows, loading, addWorkflow, updateWorkflow, deleteWorkflow, updateWorkflowStatus } = useWorkflows();
  const { documents } = useDocuments();
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [formData, setFormData] = useState({ name: '', documentId: '', assignedTo: '', dueDate: '', steps: '' });

  const getStatusBadge = (status) => {
    const badges = { 'in-progress': styles.statusProgress, 'completed': styles.statusCompleted, 'pending': styles.statusPending };
    return badges[status] || styles.statusProgress;
  };

  const handleAdd = () => {
    setEditingWorkflow(null);
    setFormData({ name: '', documentId: '', assignedTo: '', dueDate: '', steps: '' });
    setShowForm(true);
  };

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setFormData({
      name: workflow.name,
      documentId: workflow.documentId,
      assignedTo: workflow.assignedTo,
      dueDate: workflow.dueDate,
      steps: workflow.steps?.join(', ') || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this workflow?')) {
      deleteWorkflow(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDoc = documents.find(d => d.id === parseInt(formData.documentId));
    const workflowData = {
      ...formData,
      documentId: parseInt(formData.documentId),
      document: selectedDoc?.name || 'Unknown',
      steps: formData.steps.split(',').map(s => s.trim()).filter(s => s),
      currentStep: formData.steps.split(',')[0]?.trim() || 'Start'
    };
    
    if (editingWorkflow) {
      updateWorkflow(editingWorkflow.id, workflowData);
    } else {
      addWorkflow(workflowData);
    }
    setShowForm(false);
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.workflowsCard}>
      <div className={styles.header}>
        <h3>Document Workflows</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ New Workflow</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingWorkflow ? 'Edit Workflow' : 'New Workflow'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Workflow Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <select className={styles.select} value={formData.documentId} onChange={(e) => setFormData({...formData, documentId: e.target.value})} required>
                <option value="">Select Document</option>
                {documents.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <Input label="Assigned To" value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})} required />
              <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} required />
              <Input label="Steps (comma separated)" value={formData.steps} onChange={(e) => setFormData({...formData, steps: e.target.value})} placeholder="Draft, Review, Approve, Complete" required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingWorkflow ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.workflowList}>
        {workflows.map(w => (
          <div key={w.id} className={styles.workflowItem}>
            <div className={styles.workflowInfo}>
              <span className={styles.workflowName}>{w.name}</span>
              <span className={styles.workflowDoc}>📄 {w.document}</span>
            </div>
            <div className={styles.workflowProgress}>
              <span>Step: {w.currentStep}</span>
              <span>Assigned: {w.assignedTo}</span>
              <span>Due: {w.dueDate}</span>
            </div>
            <span className={`${styles.statusBadge} ${getStatusBadge(w.status)}`}>{w.status}</span>
            <div className={styles.workflowActions}>
              {w.status === 'in-progress' && (
                <Button size="small" variant="success" onClick={() => updateWorkflowStatus(w.id, 'completed')}>Complete</Button>
              )}
              <button className={styles.actionBtn} onClick={() => handleEdit(w)}>✏️</button>
              <button className={styles.actionBtn} onClick={() => handleDelete(w.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Workflows;
