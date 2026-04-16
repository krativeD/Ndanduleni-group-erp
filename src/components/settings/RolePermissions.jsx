import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';
import { useRoles } from '../../hooks/useSettings';
import styles from './RolePermissions.module.css';

const RolePermissions = () => {
  const { roles, loading, addRole, updateRole, deleteRole } = useRoles();
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: [] });

  const availablePermissions = ['all', 'users', 'hr', 'crm', 'services', 'inventory', 'manufacturing', 'sales', 'finance', 'procurement', 'reports', 'documents', 'settings', 'attendance', 'tasks'];

  const handleAdd = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setShowForm(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({ name: role.name, description: role.description, permissions: role.permissions });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this role?')) deleteRole(id);
  };

  const handlePermissionToggle = (perm) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm) ? prev.permissions.filter(p => p !== perm) : [...prev.permissions, perm]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      updateRole(editingRole.id, formData);
    } else {
      addRole(formData);
    }
    setShowForm(false);
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.rolesCard}>
      <div className={styles.header}>
        <h3>Roles & Permissions</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Add Role</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingRole ? 'Edit Role' : 'New Role'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Role Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <Input label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              <div className={styles.permissionsSection}>
                <label>Permissions</label>
                <div className={styles.permissionsGrid}>
                  {availablePermissions.map(perm => (
                    <label key={perm} className={styles.permissionItem}>
                      <input type="checkbox" checked={formData.permissions.includes(perm)} onChange={() => handlePermissionToggle(perm)} />
                      <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingRole ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.rolesList}>
        {roles.map(role => (
          <div key={role.id} className={styles.roleItem}>
            <div className={styles.roleInfo}>
              <span className={styles.roleName}>{role.name}</span>
              <span className={styles.roleDesc}>{role.description}</span>
              <span className={styles.roleUsers}>{role.users} users</span>
            </div>
            <div className={styles.rolePermissions}>
              {role.permissions.includes('all') ? <span className={styles.allPerm}>All Permissions</span> : role.permissions.slice(0, 5).map(p => <span key={p} className={styles.permTag}>{p}</span>)}
              {role.permissions.length > 5 && <span className={styles.permTag}>+{role.permissions.length - 5}</span>}
            </div>
            <div className={styles.roleActions}>
              <button className={styles.actionBtn} onClick={() => handleEdit(role)}>✏️</button>
              {role.name !== 'CEO' && <button className={styles.actionBtn} onClick={() => handleDelete(role.id)}>🗑️</button>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RolePermissions;
