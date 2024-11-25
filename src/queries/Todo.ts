import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todo';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Todo } from '../pages/Todo/TodoPage';
import { queryClient } from '../App';

export const useTodos = () => {
  const todosQuery = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token') || '';
        return await getTodos(token);
      } catch (error) {
        console.error('Error fetching todos:', error);
        toast.error(error.response.data.details);
      }
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string; }) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await addTodo(title, content, token);
      } catch (error) {
        console.error('Error add todos:', error);
        toast.error(error.response.data.details);
        throw error;
      }
    },
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) => [...(oldTodos || []), newTodo]);
      toast.success('Todo added successfully!');
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, title, content }: { id: string; title: string; content: string; }) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await updateTodo(id, title, content, token);
      } catch (error) {
        console.error('Error add todos:', error);
        toast.error(error?.response?.data?.details || 'Failed to update todo.');
        throw error;
      }
    },
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
        oldTodos?.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)) || [],
      );
      toast.success('Todo updated successfully!');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await deleteTodo(id, token);
      } catch (error) {
        console.error('Error add todos:', error);
        toast.error(error?.response?.data?.details || 'Failed to update todo.');
        throw error;
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
        oldTodos?.filter((todo) => todo.id !== id) || [],
      );
      toast.success('Todo deleted successfully!');
    },
  });

  return {
    todosQuery,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
