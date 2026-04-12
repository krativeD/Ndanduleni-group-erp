import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Input from '../common/Input';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setMessage('Password reset link sent to your email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.success}>{message}</div>}
      
      <p className={styles.description}>
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      
      <Button type="submit" variant="primary" block loading={loading}>
        Send Reset Link
      </Button>
      
      <div className={styles.footer}>
        <Link to="/login">Back to Sign In</Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
