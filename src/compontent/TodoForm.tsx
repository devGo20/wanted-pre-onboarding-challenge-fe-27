import { useState } from "react";
import { checkValidation } from "../util/todoHelper";
import { PriorityButtons } from "./PriorityButtons";

interface TodoFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialPriority?: string;
  onSubmit: (data: { title: string; content: string; priority: string; }) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialTitle = '',
  initialContent = '',
  initialPriority = 'normal',
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [priority, setPriority] = useState(initialPriority);

  const handleSubmit = () => {
    if (checkValidation(title, content)) {
      alert('할 일을 입력해주세요!');
      return;
    }
    onSubmit({ title, content, priority });
  };

  return (
    <div>
      <PriorityButtons
        onSelect={setPriority}
        selectedPriority={priority}
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <div>
        <button onClick={handleSubmit}>저장</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default TodoForm;