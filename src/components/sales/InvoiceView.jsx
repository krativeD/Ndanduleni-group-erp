import React, { useRef, useState } from 'react';
import InvoiceTemplate from './InvoiceTemplate';
import Button from '../common/Button';
import styles from './InvoiceView.module.css';

const InvoiceView = ({ invoice, onClose, onPrintSuccess }) => {
  const printRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);
  const [lastPrinted, setLastPrinted] = useState(invoice.lastPrinted || null);

  const companyInfo = {
    name: 'Ndanduleni Group',
    address: '2220 Manthata Street, Ivory Park',
    phone: '070 419 9457',
    email: 'accounts@ndandulenigroup.co.za',
    vatNumber: '4870123456',
    bankName: 'Capitec Business Account',
    accountType: 'Transact',
    accountNumber: '1054498946',
    branchCode: '450105'
  };

  const updateLastPrinted = () => {
    const now = new Date().toISOString();
    setLastPrinted(now);
    
    if (onPrintSuccess) {
      onPrintSuccess(invoice.id, { lastPrinted: now });
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Create a hidden iframe for printing - THIS PREVENTS PAGE RELOAD
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.style.visibility = 'hidden';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
    const printContent = printRef.current.cloneNode(true);
    
    const invoiceHTML = printContent.innerHTML;

    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice-${invoice.invoiceNumber}</title>
          <style>
            @media print {
              @page { size: A4 portrait; margin: 0; }
              body { margin: 0; padding: 0; background: white; }
              .print-container { padding: 10mm !important; max-width: 210mm; margin: 0 auto; }
            }
            * { box-sizing: border-box; }
            body { font-family: Arial, Helvetica, sans-serif; }
            .print-container { padding: 10mm; max-width: 210mm; margin: 0 auto; background: white; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${invoiceHTML}
          </div>
        </body>
      </html>
    `);
    frameDoc.close();

    printFrame.onload = function() {
      setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        
        setTimeout(() => {
          document.body.removeChild(printFrame);
          setIsPrinting(false);
          updateLastPrinted();
          alert(`✅ Invoice ${invoice.invoiceNumber} printed successfully!`);
        }, 100);
      }, 500);
    };

    if (frameDoc.readyState === 'complete') {
      printFrame.onload();
    }
  };

  const handleDownloadPDF = async () => {
    setIsPrinting(true);
    
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
      const element = printRef.current;
      const cloneElement = element.cloneNode(true);
      cloneElement.style.width = '210mm';
      cloneElement.style.minHeight = '297mm';
      cloneElement.style.padding = '10mm';
      cloneElement.style.margin = '0';
      cloneElement.style.backgroundColor = 'white';
      cloneElement.style.boxSizing = 'border-box';
      
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = '210mm';
      wrapper.style.backgroundColor = 'white';
      wrapper.appendChild(cloneElement);
      document.body.appendChild(wrapper);

      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(cloneElement, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true,
        windowWidth: 794,
        windowHeight: 1123
      });

      document.body.removeChild(wrapper);
      document.body.removeChild(loadingDiv);

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
      updateLastPrinted();
      alert(`✅ Invoice ${invoice.invoiceNumber} PDF downloaded successfully!`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('PDF generation failed. Please use Print and select "Save as PDF".');
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className={styles.invoiceView}>
      <div className={`${styles.actions} no-print`}>
        <Button variant="primary" onClick={handlePrint} disabled={isPrinting}>
          🖨️ {isPrinting ? 'Printing...' : 'Print Invoice'}
        </Button>
        <Button variant="success" onClick={handleDownloadPDF} disabled={isPrinting}>
          📄 {isPrinting ? 'Generating...' : 'Download PDF'}
        </Button>
        <Button variant="default" onClick={onClose}>
          ✕ Close
        </Button>
      </div>

      {lastPrinted && (
        <div className={`${styles.printHistory} no-print`}>
          <span>🕐 Last printed: {new Date(lastPrinted).toLocaleString('en-ZA')}</span>
        </div>
      )}
      
      <div ref={printRef}>
        <InvoiceTemplate invoice={invoice} companyInfo={companyInfo} />
      </div>
    </div>
  );
};

export default InvoiceView;
