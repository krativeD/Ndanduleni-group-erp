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

    const invoiceHTML = printContent.innerHTML;

    document.body.innerHTML = `
      <div class="print-container" style="max-width: 210mm; margin: 0 auto; padding: 10mm; background: white;">
        ${invoiceHTML}
      </div>
    `;
    document.title = `Invoice-${invoice.invoiceNumber}`;

    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page { size: A4; margin: 0; }
        body { margin: 0; padding: 0; background: white; }
        .print-container { padding: 10mm !important; max-width: 210mm; }
        .no-print { display: none !important; }
      }
      * { box-sizing: border-box; }
    `;
    document.head.appendChild(style);

    window.print();

    document.body.innerHTML = originalContents;
    document.title = originalTitle;
    window.location.reload();
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #6366f1;
      color: white;
      padding: 20px 40px;
      border-radius: 12px;
      z-index: 99999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-size: 16px;
      font-weight: 500;
    `;
    loadingDiv.textContent = '📄 Generating PDF...';
    document.body.appendChild(loadingDiv);

    try {
      // Dynamically import libraries (works with Netlify)
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      if (imgHeight > pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('PDF generation failed. Please use Print and select "Save as PDF".');
    } finally {
      document.body.removeChild(loadingDiv);
    }
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
