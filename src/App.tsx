import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
