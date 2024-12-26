import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { login } from '../../api/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);
  const handleLoginSubmit = (email: string, password: string) => {
    login(email, password);
  };

  return <AuthForm onSubmit={handleLoginSubmit} title="Login" buttonText="Login" />;
};

export default Login;
