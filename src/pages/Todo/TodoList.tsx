import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../../config/apiConfig';
import { toast } from 'react-toastify';
interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateContent, setUpdateContent] = useState<string>('');


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_ROUTES.TODO_LIST, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setTodos(response.data.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_ROUTES.TODO_LIST}/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handleAddTodo = async () => {
    if (!updateTitle.trim() || !updateContent.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post(
        API_ROUTES.TODO_CREATE,
        {
          title: updateTitle,
          content: updateContent,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setTodos([...todos, response.data.data]);
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

  const handleSaveClick = async () => {
    if (updatingId) {
      try {
        const response = await axios.put(`${API_ROUTES.TODO_UPDATE}/${updatingId}`, {
          title: updateTitle,
          content: updateContent,
        }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setTodos(todos.map(todo =>
          todo.id === updatingId
            ? { ...todo, ...response.data.data }
            : todo
        ));
        resetUpdateState();
        toast.success('Todo updated successfully!');
      } catch (error) {
        toast.error('Failed to update Todo.');
        console.error(error);
      }
    }
  };

  const handleCancelClick = () => {
    resetUpdateState();
  };

  const resetUpdateState = () => {
    setUpdatingId(null);
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
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            ) : (
              <div>
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
