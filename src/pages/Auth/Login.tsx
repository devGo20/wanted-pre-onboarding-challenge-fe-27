import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from './AuthForm';
import { API_ROUTES } from '../../config/apiConfig';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post(API_ROUTES.USER_LOGIN, { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            // TODO: 에러핸들링
            console.error('Login failed:', error);
        }
    };

    return <AuthForm onSubmit={handleLogin} title="Login" buttonText="Login" />;
};

export default Login;
