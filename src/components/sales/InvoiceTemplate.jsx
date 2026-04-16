{/* Banking Details */}
<div className={styles.bankingDetails}>
  <h3>Banking Details</h3>
  <div className={styles.bankingGrid}>
    <div className={styles.bankingRow}>
      <span>Bank:</span>
      <span>{companyInfo.bankName}</span>
    </div>
    <div className={styles.bankingRow}>
      <span>Account Type:</span>
      <span>{companyInfo.accountType}</span>
    </div>
    <div className={styles.bankingRow}>
      <span>Account Number:</span>
      <span>{companyInfo.accountNumber}</span>
    </div>
    <div className={styles.bankingRow}>
      <span>Branch Code:</span>
      <span>{companyInfo.branchCode}</span>
    </div>
    <div className={styles.bankingRow}>
      <span>Reference:</span>
      <span>{invoice.customer}</span>
    </div>
  </div>
</div>
