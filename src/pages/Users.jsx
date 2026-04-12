import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Loader from '../components/common/Loader';
import styles from './Users.module.css';

const Users = () => {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      fetchUsers();
    } catch (error) {
      alert('Error updating role: ' + error.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (profile?.role !== 'ceo') {
    return (
      <Layout>
        <Card>
          <h2>Access Denied</h2>
          <p>Only CEO can access user management.</p>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.usersPage}>
        <div className={styles.header}>
          <h1>User Management</h1>
          <Button variant="primary">+ Invite User</Button>
        </div>
        
        <Card className={styles.searchCard}>
          <Input
            type="search"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Card>
        
        <Card>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.userList}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.full_name || '—'}</td>
                      <td>{user.email}</td>
                      <td>
                        <select 
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className={styles.roleSelect}
                        >
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                          <option value="ceo">CEO</option>
                        </select>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <Button variant="default" size="small">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
