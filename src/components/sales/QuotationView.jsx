import React, { useRef, useState } from 'react';
import QuotationTemplate from './QuotationTemplate';
import Button from '../common/Button';
import styles from './InvoiceView.module.css';

const QuotationView = ({ quotation, onClose, onPrintSuccess }) => {
  const printRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);
  const [lastPrinted, setLastPrinted] = useState(quotation.lastPrinted || null);

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
    
    console.log('🖨️ Updating lastPrinted timestamp:', now);
    
    // Store print history in localStorage (non-destructive)
    const printHistory = JSON.parse(localStorage.getItem('ndanduleni_print_history') || '[]');
    printHistory.push({
      quotationId: quotation.id,
      quoteNumber: quotation.quoteNumber,
      printedAt: now,
      printedBy: 'Current User'
    });
    localStorage.setItem('ndanduleni_print_history', JSON.stringify(printHistory));
    
    // Update lastPrinted timestamp in quotation (does NOT change status or delete)
    if (onPrintSuccess) {
      console.log('📞 Calling onPrintSuccess with quotation ID:', quotation.id);
      onPrintSuccess(quotation.id, { lastPrinted: now });
    }
  };

  const handlePrint = () => {
    console.log('🖨️ Printing quotation:', quotation.quoteNumber, 'ID:', quotation.id);
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
    
    // Get the quotation HTML
    const quoteHTML = printContent.innerHTML;

    // Write to iframe
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Quotation-${quotation.quoteNumber}</title>
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
            ${quoteHTML}
          </div>
        </body>
      </html>
    `);
    frameDoc.close();

    // Wait for content to load then print
    printFrame.onload = function() {
      setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        
        // Remove iframe after print dialog closes
        setTimeout(() => {
          document.body.removeChild(printFrame);
          setIsPrinting(false);
          
          // Update print history (non-destructive)
          updateLastPrinted();
          
          // Show success message
          alert(`✅ Quotation ${quotation.quoteNumber} printed successfully!`);
          console.log('✅ Print completed - quotation NOT deleted');
        }, 100);
      }, 500);
    };

    // Trigger onload manually if already loaded
    if (frameDoc.readyState === 'complete') {
      printFrame.onload();
    }
  };

  const handleDownloadPDF = async () => {
    console.log('📄 Downloading PDF for quotation:', quotation.quoteNumber);
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

      pdf.save(`Quotation-${quotation.quoteNumber}.pdf`);
      
      // Update print history (non-destructive)
      updateLastPrinted();
      
      alert(`✅ Quotation ${quotation.quoteNumber} PDF downloaded successfully!`);
      console.log('✅ PDF download completed - quotation NOT deleted');
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
          🖨️ {isPrinting ? 'Printing...' : 'Print Quotation'}
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
        <QuotationTemplate quotation={quotation} companyInfo={companyInfo} />
      </div>
    </div>
  );
};

export default QuotationView;
