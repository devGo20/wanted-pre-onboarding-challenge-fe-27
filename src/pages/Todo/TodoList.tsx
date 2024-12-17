import { Todo } from '../../model/todo';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div onClick={() => onSelectTodo(todo)}>
              <h3>{todo.title}</h3>
              <p>{todo.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div >
  );
};

export default TodoList;
