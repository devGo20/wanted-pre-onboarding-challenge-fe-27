import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todo';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../pages/Todo/TodoPage';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: async () => {
      const token = localStorage.getItem('token') || '';
      return getTodos(token);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to fetch todos.');
    },
  });


  const addTodoMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string; }) => {
      const token = localStorage.getItem('token') || '';
      return addTodo(title, content, token);
    },
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) => [...(oldTodos || []), newTodo]);
      toast.success('Todo added successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add todo.');
    },
  });


  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, title, content }: { id: string; title: string; content: string; }) => {
      const token = localStorage.getItem('token') || '';
      return updateTodo(id, title, content, token);
    },
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
        oldTodos?.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)) || [],
      );
      toast.success('Todo updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update todo.');
    },
  });


  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token') || '';
      return deleteTodo(id, token);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) =>
        oldTodos?.filter((todo) => todo.id !== id) || [],
      );
      toast.success('Todo deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete todo.');
    },
  });

  return {
    todosQuery,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  };
};
