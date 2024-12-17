import React, { useState } from "react";
import { checkValidation } from "../../util/todoHelper";
import { Todo } from "../../model/todo";
import { useTodos } from "../../queries/Todo";
import { useNavigate } from "react-router-dom";

interface TodoDetailProps {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
}
const TodoDetail: React.FC<TodoDetailProps> = ({ selectedTodo, setSelectedTodo }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<string>('');
  const navigate = useNavigate();
  const { updateTodoMutation, deleteTodoMutation } = useTodos();

  const onUpdateTodo = (id: string, title: string, content: string) => {
    updateTodoMutation.mutate({ id, title, content });
  };

  const onDeleteTodo = async (id: string) => {
    await deleteTodoMutation.mutateAsync(id);
    setSelectedTodo(null);
    navigate('/');
  };

  const handleCancelClick = () => {
    resetUpdateState();
  };

  const resetUpdateState = () => {
    setUpdateTitle('');
    setUpdateContent('');
    setIsUpdating(false);
  };

  const handleEditClick = () => {
    setUpdateTitle(selectedTodo.title);
    setUpdateContent(selectedTodo.content);
    setIsUpdating(true);
  };

  const handleUpdateSaveClick = async () => {
    if (checkValidation(updateTitle, updateContent)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onUpdateTodo(selectedTodo.id, updateTitle, updateContent);
    resetUpdateState();
  };

  const handleDelete = () => {
    onDeleteTodo(selectedTodo.id);
  };

  if (!selectedTodo) return <p>Loading...</p>;

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
