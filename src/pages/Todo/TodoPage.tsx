import { useMatch, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTodos } from '../../queries/Todo';
import { Todo } from '../../model/todo';
import { useQueryStrings } from '../../util/queryStringUtils';
import TodoForm from '../../compontent/TodoForm';
import SearchForm from '../../compontent/SearchForm';
import { PriorityButtons } from '../../compontent/PriorityButtons';
import { DropDown } from '../../compontent/DropDown';
import { SortOptions } from '../../model/option';
import FilterChips from '../../compontent/FilterChips';

const TodoPage = () => {
  const { todosQuery, addTodoMutation } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const match = useMatch('/todos/:id');
  const id = match?.params?.id;
  const navigate = useNavigate();
  const todos = useMemo(() => {
    return todosQuery.data || [];
  }, [todosQuery.data]);

  const { getParams, setParams } = useQueryStrings();
  const { priorityFilter, keyword } = getParams();
  const applyedFilters = { keyword, priorityFilter };
  const handlePriorityChange = (newPriority: string) => {
    setParams({ priorityFilter: newPriority });
  };
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const searchKeyword = inputRef.current?.value;
    setParams({ keyword: searchKeyword });
  };
  const handleAddTodo = (data: { title: string; content: string; priority: string; }) => {
    addTodoMutation.mutate(data);
    setIsAdding(false);
    navigate('/');
  };
  const handleSortChange = (value: { sort: string; order: string; }) => {
    setParams({ sort: value.sort, order: value.order });
  };

  useEffect(() => {
    if (id) {
      const todo = (todos as Todo[]).find((todo) => todo.id === id);
      setSelectedTodo(todo || null);
    }
  }, [id, todos]);
  const handleRemoveFilter = (key: string) => {
    setParams({ [key]: '' });
  };
  return (
    <div className="flex h-screen">
      {/* Todo List Section */}
      <div className="flex flex-col">
        {/* Search Form */}
        <SearchForm onSubmit={handleSearch} ref={inputRef} />
        {/* Filters */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          {/* Priority Buttons */}
          <PriorityButtons onSelect={handlePriorityChange} selectedPriority={priorityFilter} />
          {/* Sort Dropdown */}
          <DropDown onSelect={handleSortChange} options={SortOptions} />
        </div>
        <FilterChips filters={applyedFilters} onRemove={handleRemoveFilter} />
        {/* Add Todo */}
        <div className="p-4">
          {isAdding ? (
            <TodoForm onSubmit={handleAddTodo} onCancel={() => setIsAdding(false)} />
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => setIsAdding(true)}>
              추가
            </button>
          )}
        </div>
        {/* Todo List */}
        <div className="flex-1 overflow-y-auto">
          <TodoList
            todos={todos}
            onSelectTodo={(todo) => {
              setSelectedTodo(todo);
              navigate(`/todos/${todo.id}?${new URLSearchParams(getParams()).toString()}`);
            }}
          />
        </div>


      </div>

      {/* Todo Detail Section */}
      {selectedTodo && (
        <div className="flex-1 p-4">
          <TodoDetail selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
        </div>
      )}
    </div>
  );
};

export default TodoPage;