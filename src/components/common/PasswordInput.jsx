import React, { useState } from 'react';
import Input from './Input';
import styles from './PasswordInput.module.css';

const PasswordInput = ({ label, placeholder = '••••••••', value, onChange, required, autoComplete, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.passwordWrapper}>
      <Input
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        {...props}
      />
      <button
        type="button"
        className={styles.toggleButton}
        onClick={togglePassword}
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
  );
};

export default PasswordInput;
