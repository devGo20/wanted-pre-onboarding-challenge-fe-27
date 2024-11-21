import { useState } from 'react';
import { toast } from 'react-toastify';
import { Todo } from './TodoPage';
import { checkValidation } from '../../util/todoHelper';

interface TodoListProps {
  todos: Todo[];
  onSelectTodo: (id: string) => void;
  onDeleteTodo: (id: string) => Promise<void>;
  onAddTodo: (title: string, content: string) => Promise<void>;
  onUpdateTodo: (id: string, title: string, content: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onSelectTodo, onDeleteTodo, onAddTodo, onUpdateTodo }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<string>('');
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<string>('');

  const handleDelete = async (id: string) => {
    try {
      await onDeleteTodo(id);
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddTodo = async () => {
    if (checkValidation(updateTitle, updateContent)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    try {
      await onAddTodo(updateTitle, updateContent);
      resetUpdateState();
      setIsAdding(false);
      toast.success('Todo가 추가되었습니다!');
    } catch (error) {
      console.error('Todo 추가 실패:', error);
      toast.error('Todo를 추가할 수 없습니다.!');
    }
  };

  const handleEditClick = (todo: Todo) => {
    setUpdatingId(todo.id);
    setUpdateTitle(todo.title);
    setUpdateContent(todo.content);
    setIsAdding(false);
  };

  const handleUpdateSaveClick = async () => {
    if (checkValidation(updateTitle, updateContent)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    try {
      await onUpdateTodo(updatingId, updateTitle, updateContent);
      resetUpdateState();
      toast.success('Todo updated successfully!');
    } catch (error) {
      toast.error('Failed to update Todo.');
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    resetUpdateState();
  };

  const resetUpdateState = () => {
    setUpdatingId('');
    setUpdateTitle('');
    setUpdateContent('');
  };

  return (
    <div>
      <h2>Todo List</h2>
      {isAdding ? (
        <div>
          <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <input
            type="content"
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
          />
          <button onClick={handleAddTodo}>저장</button>
          <button onClick={() => setIsAdding(false)}>취소</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>추가</button>
      )}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {updatingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <textarea
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
                <button onClick={handleUpdateSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div onClick={() => onSelectTodo(todo.id)}>
                <h3>{todo.title}</h3>
                <p>{todo.content}</p>
                <button onClick={() => handleEditClick(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
