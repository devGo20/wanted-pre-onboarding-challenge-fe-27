import React from "react";
import { Todo } from "./TodoPage";

interface TodoDetailProps {
  selectedTodo: Todo;
}
const TodoDetail: React.FC<TodoDetailProps> = ({ selectedTodo }) => {
  if (!selectedTodo) return <p>Loading...</p>;
  console.log('detail');
  return (
    <div>
      Detail
      <h3>{selectedTodo.title}</h3>
      <p>{selectedTodo.content}</p>
    </div>
  );
};

export default TodoDetail;
