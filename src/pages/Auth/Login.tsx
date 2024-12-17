import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from './AuthForm';
import { API_ROUTES } from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { ApiError } from '../../model/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(API_ROUTES.USER_LOGIN, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.details || 'Login failed');
      console.error('Login failed:', error);
    }
  };

  return <AuthForm onSubmit={handleLogin} title="Login" buttonText="Login" />;
};

export default Login;
