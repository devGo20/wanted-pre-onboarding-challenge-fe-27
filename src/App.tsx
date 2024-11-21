import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoPage from './pages/Todo/TodoPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/todos/*" element={<TodoPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false} />
    </>
  );
}

export default App;
