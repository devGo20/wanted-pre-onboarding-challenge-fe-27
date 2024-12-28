import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  // 토큰 존재 여부 확인
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRouter;
