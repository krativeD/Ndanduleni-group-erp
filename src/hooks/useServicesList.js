import { useState, useEffect } from 'react';

// Default services list (same as in Description page)
const defaultServices = [
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
];

export const useServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get services from localStorage (set by Description page)
    const storedServices = localStorage.getItem('ndanduleni_services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(defaultServices);
      localStorage.setItem('ndanduleni_services', JSON.stringify(defaultServices));
    }
    setLoading(false);
  }, []);

  const getServiceById = (id) => {
    return services.find(s => s.id === id) || null;
  };

  const getServicesByCategory = (category) => {
    return services.filter(s => s.category === category);
  };

  const getCategories = () => {
    return [...new Set(services.map(s => s.category))];
  };

  return { services, loading, getServiceById, getServicesByCategory, getCategories };
};
