import { Todo } from '../../model/todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo }) => {
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
            <h3>{todo.title}</h3>
            {/* <p>{todo.content}</p> */}
          </li>
        ))}
      </ul>
    </div >
  );
};

export default TodoList;
