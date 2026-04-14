import React, { useRef } from 'react';
import InvoiceTemplate from './InvoiceTemplate';
import Button from '../common/Button';
import styles from './InvoiceView.module.css';

const InvoiceView = ({ invoice, onClose }) => {
  const printRef = useRef();

  const companyInfo = {
    name: 'Ndanduleni Group',
    address: '123 Main Street, Sandton, Johannesburg, 2196',
    phone: '+27 11 234 5678',
    email: 'accounts@ndanduleni.co.za',
    vatNumber: '4870123456',
    bankName: 'First National Bank (FNB)',
    accountNumber: '6278 1234 5678',
    branchCode: '250655'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Use browser print to PDF functionality
    window.print();
  };

  return (
    <div className={styles.invoiceView}>
      <div className={styles.actions + ' noPrint'}>
        <Button variant="primary" onClick={handlePrint}>
          🖨️ Print Invoice
        </Button>
        <Button variant="success" onClick={handleDownloadPDF}>
          📄 Download PDF
        </Button>
        <Button variant="default" onClick={onClose}>
          ✕ Close
        </Button>
      </div>
      
      <div ref={printRef}>
        <InvoiceTemplate invoice={invoice} companyInfo={companyInfo} />
      </div>
    </div>
  );
};

export default InvoiceView;
