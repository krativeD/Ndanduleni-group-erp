import React from 'react';
import Card from '../common/Card';
import styles from './BudgetTracker.module.css';

const BudgetTracker = ({ budgets }) => {
  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const revenue = budgets.filter(b => b.category === 'Revenue');
  const expenses = budgets.filter(b => b.category === 'Expense');

  const totalRevenueBudget = revenue.reduce((sum, b) => sum + b.budgeted, 0);
  const totalRevenueActual = revenue.reduce((sum, b) => sum + b.actual, 0);
  const totalExpenseBudget = expenses.reduce((sum, b) => sum + b.budgeted, 0);
  const totalExpenseActual = expenses.reduce((sum, b) => sum + b.actual, 0);

  return (
    <Card className={styles.budgetCard}>
      <div className={styles.header}>
        <h3>Budget Tracker - April 2026</h3>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Revenue Budget</span>
          <span className={styles.statValue}>{formatCurrency(totalRevenueBudget)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Revenue Actual</span>
          <span className={styles.statValue} style={{ color: '#10b981' }}>{formatCurrency(totalRevenueActual)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Expense Budget</span>
          <span className={styles.statValue}>{formatCurrency(totalExpenseBudget)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Expense Actual</span>
          <span className={styles.statValue} style={{ color: totalExpenseActual <= totalExpenseBudget ? '#10b981' : '#ef4444' }}>
            {formatCurrency(totalExpenseActual)}
          </span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budgeted</th>
              <th>Actual</th>
              <th>Variance</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(budget => {
              const percentage = (budget.actual / budget.budgeted) * 100;
              const isOverBudget = budget.category === 'Expense' && budget.actual > budget.budgeted;
              return (
                <tr key={budget.id}>
                  <td>
                    <span className={styles.categoryName}>{budget.subcategory}</span>
                    <span className={styles.categoryType}>{budget.category}</span>
                  </td>
                  <td>{formatCurrency(budget.budgeted)}</td>
                  <td>{formatCurrency(budget.actual)}</td>
                  <td className={budget.variance >= 0 ? styles.positive : styles.negative}>
                    {formatCurrency(Math.abs(budget.variance))}
                    {budget.variance >= 0 ? ' under' : ' over'}
                  </td>
                  <td>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ 
                          width: `${Math.min(percentage, 100)}%`,
                          background: isOverBudget ? '#ef4444' : '#10b981'
                        }}
                      />
                    </div>
                    <span className={styles.percentage}>{percentage.toFixed(0)}%</span>
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
