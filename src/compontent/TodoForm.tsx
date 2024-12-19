import React, { useState } from "react";
import { checkValidation } from "../util/todoHelper";
import { useTodos } from "../queries/Todo";
import { useNavigate } from "react-router-dom";
import { PriorityButtons } from "./PriorityButtons";

const TodoForm: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [priority, setPriority] = useState<string>('normal');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { addTodoMutation } = useTodos();
  const navigate = useNavigate();

  const handleSelectPriority = (selectedPriority: string) => {
    setPriority(selectedPriority);
  };

  const handleSubmitTodo = () => {
    if (checkValidation(title, content)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onAddTodo(title, content, priority);
    resetAddData();
  };
  const onAddTodo = (title: string, content: string, priority: string) => {
    addTodoMutation.mutate({ title, content, priority });
    navigate('/');
  };
  const resetAddData = () => {
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  return isAdding ? (
    <div>
      <PriorityButtons onSelect={handleSelectPriority} selectedPriority={priority} />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <div>
        <button onClick={handleSubmitTodo}>저장</button>
        <button onClick={() => resetAddData()}>취소</button>
      </div>
    </div>
  ) : (
    <button onClick={() => setIsAdding(true)}>추가</button>
  );
};

export default TodoForm;
