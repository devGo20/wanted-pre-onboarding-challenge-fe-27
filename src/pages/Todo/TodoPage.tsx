import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect, useMemo } from 'react';
import { useTodos } from '../../queries/Todo';
export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
const TodoPage = () => {
  const { todosQuery, addTodoMutation, updateTodoMutation, deleteTodoMutation } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const match = useMatch('/todos/:id');
  const id = match?.params?.id;
  const navigate = useNavigate();
  console.log('?');
  const todos = useMemo(() => {
    return todosQuery.data || [];
  }, [todosQuery.data]);

  useEffect(() => {
    if (id) {
      const todo = (todos as Todo[]).find((todo) => todo.id === id);
      setSelectedTodo(todo || null);
    }
  }, [id, todos]);

  const handleAddTodo = (title: string, content: string) => {
    addTodoMutation.mutate({ title, content });
  };

  const handleUpdateTodo = (id: string, title: string, content: string) => {
    updateTodoMutation.mutate({ id, title, content });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
    setSelectedTodo(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <TodoList
        todos={todos}
        onSelectTodo={(todo) => {
          setSelectedTodo(todo);
          navigate(`/todos/${todo.id}`);
        }}
        onAddTodo={handleAddTodo}
      />
      {selectedTodo && (
        <TodoDetail
          selectedTodo={selectedTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;