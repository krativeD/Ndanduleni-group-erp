import React, { useRef } from 'react';
import QuotationTemplate from './QuotationTemplate';
import Button from '../common/Button';
import styles from './InvoiceView.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    const quoteHTML = printContent.innerHTML;

    document.body.innerHTML = `
      <div class="print-container" style="max-width: 210mm; margin: 0 auto; padding: 10mm; background: white;">
        ${quoteHTML}
      </div>
    `;
    document.title = `Quotation-${quotation.quoteNumber}`;

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
    
    const loadingToast = document.createElement('div');
    loadingToast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#6366f1;color:white;padding:16px 32px;border-radius:12px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.2);';
    loadingToast.textContent = '📄 Generating PDF...';
    document.body.appendChild(loadingToast);

    try {
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
        const scaleFactor = pdfHeight / imgHeight;
        const scaledWidth = pdfWidth;
        const scaledHeight = pdfHeight;
        pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save(`Quotation-${quotation.quoteNumber}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Could not generate PDF. Please try Print instead.');
    } finally {
      document.body.removeChild(loadingToast);
    }
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
