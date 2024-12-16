import React from 'react';
import { validateEmail, validatePassword } from '../../util/authHelper';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  title: string;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, title, buttonText }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isButtonEnabled = validateEmail(email) && validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={!isButtonEnabled}>{buttonText}</button>
    </form>
  );
};

export default AuthForm;
