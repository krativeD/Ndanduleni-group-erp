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
    const printContent = printRef.current;
    const originalTitle = document.title;
    const originalContents = document.body.innerHTML;

    // Get only the quotation content
    const quoteHTML = printContent.innerHTML;

    // Create a clean print document
    document.body.innerHTML = `
      <div class="print-container" style="max-width: 210mm; margin: 0 auto; padding: 20mm; background: white;">
        ${quoteHTML}
      </div>
    `;
    document.title = `Quotation-${quotation.quoteNumber}`;

    // Add print styles
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page { size: A4; margin: 0; }
        body { margin: 0; padding: 0; background: white; }
        .print-container { padding: 15mm !important; }
        .no-print { display: none !important; }
      }
      * { box-sizing: border-box; }
    `;
    document.head.appendChild(style);

    // Print and restore
    window.print();

    // Restore original content
    document.body.innerHTML = originalContents;
    document.title = originalTitle;

    // Re-attach React event listeners
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    handlePrint();
  };

  return (
    <div className={styles.invoiceView}>
      <div className={`${styles.actions} no-print`}>
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
