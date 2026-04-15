import React from 'react';
import FinancialReports from '../../components/finance/FinancialReports';
import { useFinancialReports } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Reports = () => {
  const { reports, loading } = useFinancialReports();

  if (loading) return <Loader />;
  return <FinancialReports reports={reports} />;
};

export default Reports;
