import React from 'react';
import AuthCard from '../components/auth/AuthCard';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthCard title="Create Account">
      <RegisterForm />
    </AuthCard>
  );
};

export default Register;
