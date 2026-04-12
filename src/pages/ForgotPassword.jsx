import React from 'react';
import AuthCard from '../components/auth/AuthCard';
import ForgotPasswordForm from '../components/auth/ForgotPassword';

const ForgotPassword = () => {
  return (
    <AuthCard title="Reset Password">
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPassword;
