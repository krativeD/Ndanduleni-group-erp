import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Description = () => {
  const [services, setServices] = useState([
    { id: 1, name: '1 Room House Cleaning', description: 'Complete cleaning of 1 bedroom house including bathroom and kitchen', price: 350.00, category: 'Residential' },
    { id: 2, name: '2 Room House Cleaning', description: 'Complete cleaning of 2 bedroom house including bathrooms and kitchen', price: 550.00, category: 'Residential' },
    { id: 3, name: '3 Room House Cleaning', description: 'Complete cleaning of 3 bedroom house including bathrooms and kitchen', price: 750.00, category: 'Residential' },
    { id: 4, name: '4 Room House Cleaning', description: 'Complete cleaning of 4 bedroom house including bathrooms and kitchen', price: 950.00, category: 'Residential' },
    { id: 5, name: 'Office Cleaning (Small)', description: 'Cleaning of small office up to 100sqm', price: 450.00, category: 'Commercial' },
    { id: 6, name: 'Office Cleaning (Medium)', description: 'Cleaning of medium office 100-300sqm', price: 850.00, category: 'Commercial' },
    { id: 7, name: 'Office Cleaning (Large)', description: 'Cleaning of large office 300-500sqm', price: 1500.00, category: 'Commercial' },
    { id: 8, name: 'Deep Cleaning Service', description: 'Intensive deep cleaning for homes and offices', price: 1200.00, category: 'Special' },
    { id: 9, name: 'Window Cleaning (per window)', description: 'Professional window cleaning inside and out', price: 50.00, category: 'Add-on' },
    { id: 10, name: 'Carpet Shampoo (per room)', description: 'Deep carpet cleaning and shampoo', price: 200.00, category: 'Add-on' },
    { id: 11, name: 'Upholstery Cleaning (per seat)', description: 'Professional upholstery cleaning', price: 75.00, category: 'Add-on' },
    { id: 12, name: 'Post-Construction Cleaning', description: 'Complete cleaning after construction/renovation', price: 2500.00, category: 'Special' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Residential' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading] = useState(false);

  const categories = ['Residential', 'Commercial', 'Special', 'Add-on'];

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const handleAdd = () => {
    setEditingService(null);
    setFormData({ name: '', description: '', price: '', category: 'Residential' });
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({ 
      name: service.name, 
      description: service.description, 
      price: service.price.toString(), 
      category: service.category 
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...s, ...formData, price: parseFloat(formData.price) }
          : s
      ));
    } else {
      const newService = {
        ...formData,
        id: Math.max(...services.map(s => s.id), 0) + 1,
        price: parseFloat(formData.price)
      };
      setServices([...services, newService]);
    }
    
    setShowForm(false);
    setEditingService(null);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.header}>
        <h3>Service Descriptions & Pricing</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Add Service</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingService ? 'Edit Service' : 'Add New Service'}</h4>
            <form onSubmit={handleSubmit}>
              <Input 
                label="Service Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g., 1 Room House Cleaning"
                required 
              />
              <Input 
                label="Description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Complete cleaning of 1 bedroom house..."
                required 
              />
              <Input 
                label="Price (R)" 
                type="number" 
                step="0.01"
                min="0"
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                required 
              />
              <select 
                className={styles.select} 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingService ? 'Update' : 'Add'} Service</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input 
          type="search" 
          placeholder="Search services..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput} 
        />
        <select 
          className={styles.filterSelect} 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className={styles.serviceGrid}>
        {filteredServices.map(service => (
          <Card key={service.id} className={styles.serviceCard}>
            <div className={styles.serviceHeader}>
              <h4>{service.name}</h4>
              <span className={styles.servicePrice}>{formatCurrency(service.price)}</span>
            </div>
            <p className={styles.serviceDescription}>{service.description}</p>
            <span className={styles.serviceCategory}>{service.category}</span>
            <div className={styles.serviceActions}>
              <button className={styles.actionBtn} onClick={() => handleEdit(service)}>✏️</button>
              <button className={styles.actionBtn} onClick={() => handleDelete(service.id)}>🗑️</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Description;
