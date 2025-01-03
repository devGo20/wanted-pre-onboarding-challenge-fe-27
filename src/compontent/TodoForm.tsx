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
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 h-40 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Content"
        ></textarea>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
          >
            저장
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:text-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;