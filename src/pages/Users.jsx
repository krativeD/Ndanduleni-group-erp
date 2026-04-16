import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { supabase } from '../lib/supabaseClient';
import styles from './Users.module.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    role: 'staff',
    password: ''
  });
  const [saving, setSaving] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('staff');
  const [inviting, setInviting] = useState(false);

  // Mock users for demo (since Supabase may not be fully configured)
  const mockUsers = [
    { id: '1', email: 'ceo@ndanduleni.co.za', full_name: 'Khumbu Admin', role: 'ceo', created_at: '2026-01-15', status: 'active' },
    { id: '2', email: 'john.m@ndanduleni.co.za', full_name: 'John Mbeki', role: 'admin', created_at: '2026-01-20', status: 'active' },
    { id: '3', email: 'sarah.n@ndanduleni.co.za', full_name: 'Sarah Ndlovu', role: 'staff', created_at: '2026-02-01', status: 'active' },
    { id: '4', email: 'mike.k@ndanduleni.co.za', full_name: 'Mike Khumalo', role: 'staff', created_at: '2026-02-10', status: 'active' },
    { id: '5', email: 'emily.z@ndanduleni.co.za', full_name: 'Emily Zulu', role: 'admin', created_at: '2026-02-15', status: 'active' },
    { id: '6', email: 'grace.d@ndanduleni.co.za', full_name: 'Grace Dlamini', role: 'staff', created_at: '2026-03-01', status: 'inactive' }
  ];

  // Initialize with mock data or localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('ndanduleni_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(mockUsers);
      localStorage.setItem('ndanduleni_users', JSON.stringify(mockUsers));
    }
    setLoading(false);
  }, []);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('ndanduleni_users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ email: '', full_name: '', role: 'staff', password: '' });
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      full_name: user.full_name || '',
      role: user.role,
      password: ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== id);
      saveUsers(updatedUsers);
    }
  };

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    );
    saveUsers(updatedUsers);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    if (editingUser) {
      const updatedUsers = users.map(u => 
        u.id === editingUser.id ? { ...u, ...formData, password: formData.password || u.password } : u
      );
      saveUsers(updatedUsers);
    } else {
      const newUser = {
        ...formData,
        id: Date.now().toString(),
        created_at: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      saveUsers([...users, newUser]);
    }

    setSaving(false);
    setShowForm(false);
    setEditingUser(null);
  };

  const handleInvite = () => {
    setInviteEmail('');
    setInviteRole('staff');
    setShowInviteModal(true);
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    
    // Simulate sending invite
    setTimeout(() => {
      alert(`Invitation sent to ${inviteEmail} with role ${inviteRole}`);
      setInviting(false);
      setShowInviteModal(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? styles.statusActive : styles.statusInactive;
  };

  const getRoleBadge = (role) => {
    const badges = {
      'ceo': styles.roleCEO,
      'admin': styles.roleAdmin,
      'staff': styles.roleStaff
    };
    return badges[role] || styles.roleStaff;
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.usersPage}>
        <div className={styles.pageHeader}>
          <h1>User Management</h1>
          <div className={styles.headerActions}>
            <Button variant="default" onClick={handleInvite}>📧 Invite User</Button>
            <Button variant="primary" onClick={handleAdd}>+ Add User</Button>
          </div>
        </div>

        {/* User Form Modal */}
        {showForm && (
          <div className={styles.modalOverlay}>
            <Card className={styles.formCard}>
              <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <form onSubmit={handleSubmit}>
                <Input label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={!!editingUser} />
                {!editingUser && (
                  <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required={!editingUser} />
                )}
                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} className={styles.select}>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="ceo">CEO</option>
                  </select>
                </div>
                <div className={styles.formActions}>
                  <Button type="button" variant="default" onClick={() => { setShowForm(false); setEditingUser(null); }}>Cancel</Button>
                  <Button type="submit" variant="primary" loading={saving}>{editingUser ? 'Update' : 'Create'} User</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className={styles.modalOverlay}>
            <Card className={styles.formCard}>
              <h3>📧 Invite User</h3>
              <p className={styles.inviteText}>Send an invitation email to grant access to the ERP system.</p>
              <form onSubmit={handleSendInvite}>
                <Input label="Email Address" type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@ndanduleni.co.za" required />
                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className={styles.select}>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                    <option value="ceo">CEO</option>
                  </select>
                </div>
                <div className={styles.formActions}>
                  <Button type="button" variant="default" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" loading={inviting}>Send Invitation</Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className={styles.filtersCard}>
          <div className={styles.filters}>
            <Input type="search" placeholder="Search users by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            <select className={styles.filterSelect} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="ceo">CEO</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </Card>

        {/* Users Table */}
        <Card className={styles.usersCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>{user.full_name?.charAt(0) || user.email?.charAt(0)}</div>
                        <span className={styles.userName}>{user.full_name || '—'}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td><span className={`${styles.roleBadge} ${getRoleBadge(user.role)}`}>{user.role}</span></td>
                    <td>{user.created_at}</td>
                    <td>
                      <button 
                        className={`${styles.statusBadge} ${getStatusBadge(user.status)}`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} onClick={() => handleEdit(user)} title="Edit">✏️</button>
                        <button className={styles.actionBtn} onClick={() => handleDelete(user.id)} title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFooter}>
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
