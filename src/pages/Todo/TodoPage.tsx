import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect } from 'react';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../../api/todo';
import { toast } from 'react-toastify';
export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const match = useMatch('/todos/:id');
  const id = match?.params?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos(localStorage.getItem('token') || '');
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        toast.error(error?.response?.data?.message || 'Failed to load todos.');
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (id) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        setSelectedTodo(todo);
      }
    }
  }, [id, todos]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    navigate(`/todos/${todo.id}`);
  };

  const handleAddTodo = async (title: string, content: string) => {
    const newTodo = await addTodo(title, content, localStorage.getItem('token') || '');
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = async (id: string, title: string, content: string) => {
    const updatedTodo = await updateTodo(id, title, content, localStorage.getItem('token') || '');
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id, localStorage.getItem('token') || '');
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ display: 'flex' }}>
      <TodoList todos={todos}
        onSelectTodo={handleSelectTodo}
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo} />
      {selectedTodo && <TodoDetail selectedTodo={selectedTodo} />}
    </div>
  );
};

export default TodoPage;
