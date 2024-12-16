import React, { useState } from "react";
import { checkValidation } from "../../util/todoHelper";
import { Todo } from "../../model/todo";

interface TodoDetailProps {
  selectedTodo: Todo;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, title: string, content: string) => void;
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
    onUpdateTodo(selectedTodo.id, updateTitle, updateContent);
    resetUpdateState();
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
  const handleEditClick = () => {
    setUpdateTitle(selectedTodo.title);
    setUpdateContent(selectedTodo.content);
    setIsUpdating(true);
  };
  const handleDelete = () => {
    onDeleteTodo(selectedTodo.id);
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
