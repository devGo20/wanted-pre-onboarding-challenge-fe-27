import React from 'react';
import AuthForm from './AuthForm';
import { signup } from '../../api/auth';

const Signup: React.FC = () => {
  const handleSignup = async (email: string, password: string) => {
    signup(email, password);
  };

  return <AuthForm onSubmit={handleSignup} title="Signup" buttonText="Signup" />;
};

export default Signup;
