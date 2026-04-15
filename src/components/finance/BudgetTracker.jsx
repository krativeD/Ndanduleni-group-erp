import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './BudgetTracker.module.css';

const BudgetTracker = ({ budgets, onAddBudget, onEditBudget, onDeleteBudget }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Expense', subcategory: '', budgeted: '', period: 'April 2026'
  });

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const revenue = budgets.filter(b => b.category === 'Revenue');
  const expenses = budgets.filter(b => b.category === 'Expense');

  const totalRevenueBudget = revenue.reduce((sum, b) => sum + b.budgeted, 0);
  const totalRevenueActual = revenue.reduce((sum, b) => sum + b.actual, 0);
  const totalExpenseBudget = expenses.reduce((sum, b) => sum + b.budgeted, 0);
  const totalExpenseActual = expenses.reduce((sum, b) => sum + b.actual, 0);

  const handleAdd = () => {
    setEditingBudget(null);
    setFormData({ category: 'Expense', subcategory: '', budgeted: '', period: 'April 2026' });
    setShowForm(true);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      subcategory: budget.subcategory,
      budgeted: budget.budgeted.toString(),
      period: budget.period
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      onDeleteBudget(id);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetData = { ...formData, budgeted: parseFloat(formData.budgeted) };
    if (editingBudget) {
      onEditBudget(editingBudget.id, budgetData);
    } else {
      onAddBudget(budgetData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.budgetCard}>
      <div className={styles.header}>
        <h3>Budget Tracker - April 2026</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Add Budget</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingBudget ? 'Edit Budget' : 'New Budget'}</h4>
            <form onSubmit={handleSubmit}>
              <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                <option value="Revenue">Revenue</option>
                <option value="Expense">Expense</option>
              </select>
              <Input label="Subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} required />
              <Input label="Budgeted Amount (R)" name="budgeted" type="number" step="0.01" value={formData.budgeted} onChange={handleChange} required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingBudget ? 'Update' : 'Add'} Budget</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.summaryStats}>
        <div className={styles.statItem}><span className={styles.statLabel}>Revenue Budget</span><span className={styles.statValue}>{formatCurrency(totalRevenueBudget)}</span></div>
        <div className={styles.statItem}><span className={styles.statLabel}>Revenue Actual</span><span className={styles.statValue} style={{ color: '#10b981' }}>{formatCurrency(totalRevenueActual)}</span></div>
        <div className={styles.statItem}><span className={styles.statLabel}>Expense Budget</span><span className={styles.statValue}>{formatCurrency(totalExpenseBudget)}</span></div>
        <div className={styles.statItem}><span className={styles.statLabel}>Expense Actual</span><span className={styles.statValue} style={{ color: totalExpenseActual <= totalExpenseBudget ? '#10b981' : '#ef4444' }}>{formatCurrency(totalExpenseActual)}</span></div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>Category</th><th>Budgeted</th><th>Actual</th><th>Variance</th><th>Progress</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {budgets.map(budget => {
              const percentage = budget.budgeted > 0 ? (budget.actual / budget.budgeted) * 100 : 0;
              const isOverBudget = budget.category === 'Expense' && budget.actual > budget.budgeted;
              return (
                <tr key={budget.id}>
                  <td><span className={styles.categoryName}>{budget.subcategory}</span><span className={styles.categoryType}>{budget.category}</span></td>
                  <td>{formatCurrency(budget.budgeted)}</td><td>{formatCurrency(budget.actual)}</td>
                  <td className={budget.variance >= 0 ? styles.positive : styles.negative}>{formatCurrency(Math.abs(budget.variance))}{budget.variance >= 0 ? ' under' : ' over'}</td>
                  <td>
                    <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${Math.min(percentage, 100)}%`, background: isOverBudget ? '#ef4444' : '#10b981' }} /></div>
                    <span className={styles.percentage}>{percentage.toFixed(0)}%</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} onClick={() => handleEdit(budget)}>✏️</button>
                      <button className={styles.actionBtn} onClick={() => handleDelete(budget.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BudgetTracker;
