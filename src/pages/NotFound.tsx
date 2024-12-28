import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">404 Not Found</h2>
      <p className="mt-4 text-gray-600">페이지를 찾을 수 없습니다</p>
      <Link
        to="/"
        className="mt-4 text-blue-500 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;