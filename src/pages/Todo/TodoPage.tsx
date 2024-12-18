import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTodos } from '../../queries/Todo';
import { Priority, Todo } from '../../model/todo';
import { useQueryStrings } from '../../util/queryStringUtils';
import TodoForm from './TodoForm';

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
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" ref={inputRef} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search todo..." />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
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