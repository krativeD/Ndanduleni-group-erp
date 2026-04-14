import React, { useRef } from 'react';
import QuotationTemplate from './QuotationTemplate';
import Button from '../common/Button';
import styles from './InvoiceView.module.css';

const QuotationView = ({ quotation, onClose }) => {
  const printRef = useRef();

  const companyInfo = {
    name: 'Ndanduleni Group',
    address: '123 Main Street, Sandton, Johannesburg, 2196',
    phone: '+27 11 234 5678',
    email: 'info@ndanduleni.co.za',
    vatNumber: '4870123456'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className={styles.invoiceView}>
      <div className={styles.actions + ' noPrint'}>
        <Button variant="primary" onClick={handlePrint}>
          🖨️ Print Quotation
        </Button>
        <Button variant="success" onClick={handleDownloadPDF}>
          📄 Download PDF
        </Button>
        <Button variant="default" onClick={onClose}>
          ✕ Close
        </Button>
      </div>
      
      <div ref={printRef}>
        <QuotationTemplate quotation={quotation} companyInfo={companyInfo} />
      </div>
    </div>
  );
};

export default QuotationView;
