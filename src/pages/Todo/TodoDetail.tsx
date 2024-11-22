import React, { useState } from "react";
import { Todo } from "./TodoPage";
import { toast } from "react-toastify";
import { checkValidation } from "../../util/todoHelper";

interface TodoDetailProps {
  selectedTodo: Todo;
  onDeleteTodo: (id: string) => Promise<void>;
  onUpdateTodo: (id: string, title: string, content: string) => Promise<void>;
}
const TodoDetail: React.FC<TodoDetailProps> = ({ selectedTodo, onDeleteTodo, onUpdateTodo }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<string>('');
  const handleUpdateSaveClick = async () => {
    if (checkValidation(updateTitle, updateContent)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    try {
      await onUpdateTodo(selectedTodo.id, updateTitle, updateContent);
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
    setUpdateTitle('');
    setUpdateContent('');
    setIsUpdating(false);
  };

  if (!selectedTodo) return <p>Loading...</p>;
  console.log('detail');
  const handleEditClick = () => {
    setUpdateTitle(selectedTodo.title);
    setUpdateContent(selectedTodo.content);
    setIsUpdating(true);
  };
  const handleDelete = async () => {
    try {
      await onDeleteTodo(selectedTodo.id);
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      {isUpdating ? (
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
        <div>
          <h3>{selectedTodo.title}</h3>
          <p>{selectedTodo.content}</p>
          <button onClick={() => handleEditClick()}>Edit</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}

    </div>
  );
};

export default TodoDetail;
