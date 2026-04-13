import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import ContactList from '../../components/crm/ContactList';
import ContactForm from '../../components/crm/ContactForm';
import Button from '../../components/common/Button';
import { useContacts } from '../../hooks/useCRM';
import Loader from '../../components/common/Loader';
import styles from './CRMStyles.module.css';

const Contacts = () => {
  const { contacts, loading, error, addContact, updateContact, deleteContact } = useContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const handleAdd = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleSubmit = async (data) => {
    if (editingContact) {
      updateContact(editingContact.id, data);
    } else {
      addContact(data);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Contacts</h1>
          {!showForm && (
            <Button variant="primary" onClick={handleAdd}>+ Add Contact</Button>
          )}
        </div>

        {showForm ? (
          <ContactForm 
            contact={editingContact}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingContact(null);
            }}
          />
        ) : (
          <ContactList 
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        )}
      </div>
    </Layout>
  );
};

export default Contacts;
