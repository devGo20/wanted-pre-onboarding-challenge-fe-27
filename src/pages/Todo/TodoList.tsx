import { useState } from 'react';
import { Todo } from './TodoPage';
import { checkValidation } from '../../util/todoHelper';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  onAddTodo: (title: string, content: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo, onAddTodo }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleAddTodo = () => {
    if (checkValidation(title, content)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onAddTodo(title, content);
    resetAddData();
  };

  const resetAddData = () => {
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  return (
    <div>
      <h2>Todo List</h2>
      {isAdding ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleAddTodo}>저장</button>
          <button onClick={() => resetAddData()}>취소</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>추가</button>
      )}
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
