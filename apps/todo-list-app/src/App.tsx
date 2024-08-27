import { useRef, useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: 1, title: "Learn useState", completed: true },
    { id: 2, title: "Learn useRef", completed: true },
    { id: 3, title: "Learn Next.js", completed: false },
  ]);

  const handleAdd = () => {
    const title = inputRef?.current?.value;
    if (!title) return;
    setTodoList((prev) => [
      ...prev,
      { id: prev.length + 1, title, completed: false },
    ]);
    // clear input
    inputRef.current.value = "";
    // return focus to input
    inputRef.current.focus();
  };

  const handleToggle = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>Todo - List</h1>

      <div>
        <label className="label" htmlFor="todoInput">
          Add Todo
        </label>
        <input
          id="todoInput"
          ref={inputRef}
          type="text"
          placeholder="Enter your todo here"
          autoFocus
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="card">
        {todoList.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default App;
