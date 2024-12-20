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
    <div>
      <SearchForm onSubmit={handleSearch} ref={inputRef} />
      <div className='flex'>
        <PriorityButtons onSelect={handlePriorityChange} selectedPriority={priorityFilter} />
        <DropDown onSelect={handleSortChange} options={SortOptions} />
      </div>
      <FilterChips filters={applyedFilters} onRemove={handleRemoveFilter} />
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