import { useState } from 'react';
import { Todo } from './TodoPage';
import { checkValidation } from '../../util/todoHelper';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  onAddTodo: (title: string, content: string, priority: string) => void;
}
export const Priority = {
  Urgent: 'urgent',
  Normal: 'normal',
  Low: 'low',
} as const;

export type Priority = typeof Priority[keyof typeof Priority];
const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo, onAddTodo }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [priority, setPriority] = useState<Priority>('normal');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSelectPriority = (selectedPriority: Priority) => {
    setPriority(selectedPriority);
  };

  const handleAddTodo = () => {
    if (checkValidation(title, content)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onAddTodo(title, content, priority);
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
          <div style={{ display: 'flex', gap: '20px' }}>
            {Object.values(Priority).map((item) => (
              <button
                key={item}
                onClick={() => handleSelectPriority(item)}
                style={{
                  border: 'none',
                  borderBottom: priority === item ? '2px solid black' : '2px solid transparent',
                }}
              >
                {item}
              </button>
            ))}
          </div>
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
