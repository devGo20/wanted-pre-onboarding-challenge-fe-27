import { getTodos, addTodo, updateTodo, deleteTodo, updateTodoComplete } from '../api/todo';
import { toast } from 'react-toastify';
import { InvalidateQueryFilters, useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../App';
import { Todo } from '../model/todo';
import { ApiError } from '../model/api';
import { useQueryStrings } from '../util/queryStringUtils';

export const useTodos = () => {
  const { getParams } = useQueryStrings();
  const params = getParams();

  const todosQuery = useQuery<Todo[]>({
    queryKey: ['todos', params],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token') || '';
        return await getTodos(token, params);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.details) {
          toast.error(apiError.response.data.details);
        } else {
          toast.error('오류가 발생했습니다. 다시 시도하세요.');
        }
        throw error;
      }
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async ({ title, content, priority }: { title: string; content: string; priority: string; }) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await addTodo(title, content, priority, token);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.details) {
          toast.error(apiError.response.data.details);
        } else {
          toast.error('오류가 발생했습니다. 다시 시도하세요.');
        }
        throw error;
      }
    },
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] | undefined) => [...(oldTodos || []), newTodo]);
      toast.success('Todo added successfully!');
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, title, content, priority }: { id: string; title: string; content: string; priority: string; }) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await updateTodo(id, title, content, priority, token);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.details) {
          toast.error(apiError.response.data.details);
        } else {
          toast.error('오류가 발생했습니다. 다시 시도하세요.');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', params]
      } as InvalidateQueryFilters);
      toast.success('Todo updated successfully!');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await deleteTodo(id, token);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.details) {
          toast.error(apiError.response.data.details);
        } else {
          toast.error('오류가 발생했습니다. 다시 시도하세요.');
        }
        throw error;
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(['todos', params], (oldTodos: Todo[] | undefined) =>
        oldTodos?.filter((todo) => todo.id !== id) || [],
      );
      toast.success('Todo deleted successfully!');
    },
  });

  const updateCompleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const token = localStorage.getItem('token') || '';
        return await updateTodoComplete(id, token);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        if (apiError.response?.data?.details) {
          toast.error(apiError.response.data.details);
        } else {
          toast.error('오류가 발생했습니다. 다시 시도하세요.');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos', params]);
      toast.success('Todo updated successfully!');
    },
  });

  return {
    todosQuery,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    updateCompleteTodoMutation
  };
};
