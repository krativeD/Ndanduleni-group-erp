import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.contact_person?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || contact.type === filterType;
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      active: styles.statusActive,
      inactive: styles.statusInactive,
      prospect: styles.statusProspect,
      new: styles.statusNew,
      negotiation: styles.statusNegotiation
    };
    return badges[status] || styles.statusActive;
  };

  const getTypeBadge = (type) => {
    const badges = {
      client: styles.typeClient,
      lead: styles.typeLead,
      partner: styles.typePartner
    };
    return badges[type] || styles.typeLead;
  };

  return (
    <Card className={styles.contactCard}>
      <div className={styles.header}>
        <h3>Contacts</h3>
        <Button variant="primary" size="small" onClick={onAdd}>+ Add Contact</Button>
      </div>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          className={styles.filterSelect}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="client">Clients</option>
          <option value="lead">Leads</option>
          <option value="partner">Partners</option>
        </select>
        <select 
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="prospect">Prospect</option>
          <option value="new">New</option>
        </select>
      </div>

      <div className={styles.contactGrid}>
        {filteredContacts.map(contact => (
          <div key={contact.id} className={styles.contactItem}>
            <div className={styles.contactHeader}>
              <div className={styles.contactInfo}>
                <div className={styles.avatar}>
                  {contact.name.charAt(0)}
                </div>
                <div className={styles.contactDetails}>
                  <span className={styles.contactName}>{contact.name}</span>
                  <span className={styles.contactPerson}>{contact.contact_person}</span>
                </div>
              </div>
              <div className={styles.badges}>
                <span className={`${styles.typeBadge} ${getTypeBadge(contact.type)}`}>
                  {contact.type}
                </span>
                <span className={`${styles.statusBadge} ${getStatusBadge(contact.status)}`}>
                  {contact.status}
                </span>
              </div>
            </div>
            
            <div className={styles.contactBody}>
              <div className={styles.contactField}>
                <span>📧</span>
                <span>{contact.email}</span>
              </div>
              <div className={styles.contactField}>
                <span>📞</span>
                <span>{contact.phone}</span>
              </div>
              <div className={styles.contactField}>
                <span>📍</span>
                <span>{contact.address}</span>
              </div>
            </div>

            <div className={styles.contactFooter}>
              <span className={styles.lastContact}>
                Last contact: {contact.last_contact}
              </span>
              <div className={styles.actions}>
                <button 
                  className={styles.actionBtn}
                  onClick={() => onEdit(contact)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  className={styles.actionBtn}
                  onClick={() => onDelete(contact.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ContactList;
