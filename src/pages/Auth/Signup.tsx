import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from './AuthForm';
import { API_ROUTES } from '../../config/apiConfig';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSignup = async (email: string, password: string) => {
        try {
            const response = await axios.post(API_ROUTES.USER_CREATE, { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/auth/login');
        } catch (error) {
            toast.error(error.response?.data?.details || 'Signup failed');
            console.error('Signup failed:', error);
        }
    };

    return <AuthForm onSubmit={handleSignup} title="Signup" buttonText="Signup" />;
};

export default Signup;
