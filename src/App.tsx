import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './pages/Todo/TodoList';
import TodoDetail from './pages/Todo/TodoDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false} />
    </>
  );
}

export default App;
