import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useAuditLog } from '../../hooks/useSettings';
import styles from './AuditLog.module.css';

const AuditLog = () => {
  const { logs, loading, clearLogs, exportLogs } = useAuditLog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const actions = [...new Set(logs.map(l => l.action))];

  const getActionColor = (action) => {
    const colors = { 'LOGIN': styles.actionSuccess, 'LOGOUT': styles.actionInfo, 'CREATE': styles.actionCreate, 'UPDATE': styles.actionUpdate, 'DELETE': styles.actionDelete, 'BACKUP': styles.actionBackup };
    return colors[action] || styles.actionDefault;
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.auditCard}>
      <div className={styles.header}>
        <h3>Audit Log</h3>
        <div className={styles.headerActions}>
          <Button variant="default" size="small" onClick={exportLogs}>📤 Export</Button>
          <Button variant="danger" size="small" onClick={clearLogs}>🗑️ Clear</Button>
        </div>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterAction} onChange={(e) => setFilterAction(e.target.value)}>
          <option value="all">All Actions</option>
          {actions.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>Timestamp</th><th>User</th><th>Action</th><th>Details</th><th>IP Address</th></tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td>{log.timestamp}</td><td>{log.user}</td>
                <td><span className={`${styles.actionBadge} ${getActionColor(log.action)}`}>{log.action}</span></td>
                <td>{log.details}</td><td>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>Showing {filteredLogs.length} of {logs.length} entries</div>
    </Card>
  );
};

export default AuditLog;
