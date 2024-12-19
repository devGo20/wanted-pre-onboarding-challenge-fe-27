import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTodos } from '../../queries/Todo';
import { Priority, Todo } from '../../model/todo';
import { useQueryStrings } from '../../util/queryStringUtils';
import TodoForm from '../../compontent/TodoForm';
import SearchForm from '../../compontent/SearchForm';

const TodoPage = () => {
  const { todosQuery } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const match = useMatch('/todos/:id');
  const id = match?.params?.id;
  const navigate = useNavigate();
  const todos = useMemo(() => {
    return todosQuery.data || [];
  }, [todosQuery.data]);

  const { getParams, setParams } = useQueryStrings();
  const { priorityFilter } = getParams();
  const handlePriorityChange = (newPriority: string) => {
    setParams({ priorityFilter: newPriority });
  };
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const searchKeyword = inputRef.current?.value;
    setParams({ keyword: searchKeyword });
  };
  useEffect(() => {
    if (id) {
      const todo = (todos as Todo[]).find((todo) => todo.id === id);
      setSelectedTodo(todo || null);
    }
  }, [id, todos]);

  return (
    <div>
      <SearchForm onSubmit={handleSearch} ref={inputRef} />
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.values(Priority).map((item) => (
          <button
            key={item}
            onClick={() => handlePriorityChange(item)}
            style={{
              border: 'none',
              borderBottom: priorityFilter === item ? '2px solid black' : '2px solid transparent',
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <TodoForm />
      <TodoList
        todos={todos}
        onSelectTodo={(todo) => {
          setSelectedTodo(todo);
          navigate(`/todos/${todo.id}?${new URLSearchParams(getParams()).toString()}`);;
        }}
      />
      {selectedTodo && (
        <TodoDetail
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;