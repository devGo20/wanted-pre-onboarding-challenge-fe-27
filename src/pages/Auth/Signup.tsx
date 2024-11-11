import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail, validatePassword } from '../../util/Auth';

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/create',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            localStorage.setItem("token", response.data.token);
            navigate('/auth/login');
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else {
                console.error('Signup failed:', error.message);
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        checkFormValidity(newEmail, password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkFormValidity(email, newPassword);
    };

    const checkFormValidity = (email: string, password: string) => {
        const isFormValid = validateEmail(email) && validatePassword(password);
        setIsButtonEnabled(isFormValid);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder="Password" required />
            <button type="submit" disabled={!isButtonEnabled}>Signup</button>
        </form>
    );
};

export default Signup;
