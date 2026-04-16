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
    const printContent = printRef.current;
    const originalTitle = document.title;
    const originalContents = document.body.innerHTML;

    // Get only the invoice content
    const invoiceHTML = printContent.innerHTML;

    // Create a clean print document
    document.body.innerHTML = `
      <div class="print-container" style="max-width: 210mm; margin: 0 auto; padding: 20mm; background: white;">
        ${invoiceHTML}
      </div>
    `;
    document.title = `Invoice-${invoice.invoiceNumber}`;

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

    // Re-attach React event listeners (page will refresh)
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    // Use the same clean print approach for PDF
    handlePrint();
  };

  return (
    <div className={styles.invoiceView}>
      <div className={`${styles.actions} no-print`}>
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
