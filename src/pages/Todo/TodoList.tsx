import { Todo } from '../../model/todo';
import { useTodos } from '../../queries/Todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo }) => {
  const { updateCompleteTodoMutation } = useTodos();
  const handleCheckboxClick = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateCompleteTodoMutation.mutateAsync(id);
  };
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="flex flex-col gap-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => onSelectTodo(todo)}
            className="flex items-center h-12 px-8 border border-gray rounded-lg cursor-pointer"
          >
            <input
              onClick={(event) => handleCheckboxClick(todo.id, event)}
              checked={todo.complete}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <h3 className={`text-lg ${todo.complete ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
          </li>
        ))}
      </ul>
    </div >
  );
};

export default TodoList;
