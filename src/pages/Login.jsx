import React from 'react';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <AuthCard title="Welcome Back">
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
