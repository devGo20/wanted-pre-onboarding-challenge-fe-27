import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoPage from './pages/Todo/TodoPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PrivateRouter from './compontent/PrivateRouter';
import NotFound from './pages/NotFound';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Navigate to="/todos" replace />} />
            <Route path="/todos/*" element={<TodoPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-center" hideProgressBar={false} />
      </QueryClientProvider>
    </>
  );
}


export default App;
