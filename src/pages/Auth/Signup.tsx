import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
                        'Content-Type': 'application/json',  // JSON 형식으로 요청
                    }
                }
            );
            // 성공적으로 요청이 처리된 후 할 작업
            console.log('Signup successful:', response.data);
            navigate('/auth/login');
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data); // 서버에서 보낸 에러 메시지
                console.error('Status code:', error.response.status); // HTTP 상태 코드
            } else {
                console.error('Signup failed:', error.message); // 서버 연결 문제 등
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
