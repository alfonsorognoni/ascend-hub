import { FC } from "react";
import "./Todo.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  todo: Todo;
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Todo: FC<TodoProps> = ({ todo, handleToggle, handleDelete }) => {
  return (
    <div className="todo" key={todo.id}>
      <p className={`${todo.completed ? "completed" : ""}`}>{todo.title}</p>
      <button onClick={() => handleToggle(todo.id)}>
        {todo.completed ? "Completed" : "Incomplete"}
      </button>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default Todo;
