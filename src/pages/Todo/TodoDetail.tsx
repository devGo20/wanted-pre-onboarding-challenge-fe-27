import React, { useState } from "react";
import { Todo } from "../../model/todo";
import { useTodos } from "../../queries/Todo";
import { useNavigate } from "react-router-dom";
import TodoForm from "../../compontent/TodoForm";

interface TodoDetailProps {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
}
const TodoDetail: React.FC<TodoDetailProps> = ({ selectedTodo, setSelectedTodo }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { updateTodoMutation, deleteTodoMutation } = useTodos();

  const onDeleteTodo = async (id: string) => {
    await deleteTodoMutation.mutateAsync(id);
    setSelectedTodo(null);
    navigate('/');
  };

  const handleEditClick = () => {
    setIsUpdating(true);
  };

  const handleUpdateTodo = (data: { title: string; content: string; priority: string; }) => {
    updateTodoMutation.mutate({
      id: selectedTodo.id,
      ...data
    });
    setIsUpdating(false);
  };

  const handleDelete = () => {
    onDeleteTodo(selectedTodo.id);
  };

  if (!selectedTodo) return <p>Loading...</p>;

  return (
    <div>
      {isUpdating ? (
        <TodoForm
          initialTitle={selectedTodo.title}
          initialContent={selectedTodo.content}
          initialPriority={selectedTodo.priority}
          onSubmit={handleUpdateTodo}
          onCancel={() => setIsUpdating(false)}
        />
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
