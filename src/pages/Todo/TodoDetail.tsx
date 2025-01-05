import React, { useState } from "react";
import { Todo } from "../../model/todo";
import { useTodos } from "../../queries/Todo";
import { useNavigate } from "react-router-dom";
import TodoForm from "../../compontent/TodoForm";
import { formatDateTime } from "../../util/todoHelper";

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
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <p
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${selectedTodo.priority === 'urgent'
              ? 'border-red-500 text-red-500'
              : selectedTodo.priority === 'normal'
                ? 'border-blue-500 text-blue-500'
                : 'border-green-500 text-green-500'
              }`}
          >
            {selectedTodo.priority}
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedTodo.title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {selectedTodo.content}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {formatDateTime(selectedTodo.createdAt)}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleEditClick()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete()}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900"
            >
              삭제
            </button>
          </div>
        </div>

      )}

    </div>
  );
};

export default TodoDetail;
