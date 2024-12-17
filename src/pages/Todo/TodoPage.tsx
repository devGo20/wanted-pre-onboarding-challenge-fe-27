import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect, useMemo } from 'react';
import { useTodos } from '../../queries/Todo';
import { Priority, Todo } from '../../model/todo';
import { useQueryStrings } from '../../util/queryStringUtils';

const TodoPage = () => {
  const { todosQuery, addTodoMutation, updateTodoMutation, deleteTodoMutation } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const match = useMatch('/todos/:id');
  const id = match?.params?.id;
  const navigate = useNavigate();
  const todos = useMemo(() => {
    return todosQuery.data || [];
  }, [todosQuery.data]);

  const { getParams, setParams } = useQueryStrings();
  const { priority } = getParams();
  const handlePriorityChange = (newPriority: string) => {
    setParams({ priority: newPriority });
  };
  useEffect(() => {
    if (id) {
      const todo = (todos as Todo[]).find((todo) => todo.id === id);
      setSelectedTodo(todo || null);
    }
  }, [id, todos]);

  const handleAddTodo = (title: string, content: string, priority: string) => {
    addTodoMutation.mutate({ title, content, priority });
  };

  const handleUpdateTodo = (id: string, title: string, content: string) => {
    updateTodoMutation.mutate({ id, title, content });
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
      setSelectedTodo(null);  // 삭제가 성공한 후에 선택된 todo를 해제
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.values(Priority).map((item) => (
          <button
            key={item}
            onClick={() => handlePriorityChange(item)}
            style={{
              border: 'none',
              borderBottom: priority === item ? '2px solid black' : '2px solid transparent',
            }}
          >
            {item}
          </button>
        ))}
      </div>
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