import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoPage from './pages/Todo/TodoPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/todos/*" element={<TodoPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
