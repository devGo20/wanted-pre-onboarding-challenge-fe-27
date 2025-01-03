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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={!isButtonEnabled}
        className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${isButtonEnabled
          ? 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900'
          : 'bg-gray-300 cursor-not-allowed dark:bg-gray-600'
          }`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
