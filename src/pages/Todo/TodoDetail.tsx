import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_ROUTES } from '../../config/apiConfig';
import { Todo } from './TodoList';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.TODO}/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setTodo(response.data.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };
    fetchTodo();
  }, [id]);


  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      Detail
      <h3>{todo.title}</h3>
      <p>{todo.content}</p>
    </div>
  );
};

export default TodoDetail;
