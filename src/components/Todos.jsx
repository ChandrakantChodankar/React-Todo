import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const todoList = "todoList";
const emptyTodo = { id: "", content: "", checked: false };

export const Todos = () => {
  const [inputValue, setInputValue] = useState(emptyTodo);
  const [isDisabled, setDisabled] = useState(false);

  const [todo, setTodo] = useState(() => {
    const rawTodo = localStorage.getItem(todoList);
    if (!rawTodo) return [];
    try {
      return JSON.parse(rawTodo);
    } catch {
      return [];
    }
  });

  const handleChange = (value) => {
    setInputValue({ id: uuidv4(), content: value, checked: false });
    setDisabled(value.trim().length <= 3);
  };

  const handleAdd = () => {
    const { id, content, checked } = inputValue;
    if (!content) return;

    // prevent adding duplicate todos
    const ifTodoMatch = todo.find(
      (curTodo) => curTodo.content.toLowerCase() === content.toLowerCase()
    );
    if (ifTodoMatch) {
      setInputValue({ id: "", content: "", checked: false });
      return;
    }

    setTodo((prev) => [...prev, { id, content, checked }]);
    setInputValue({ id: "", content: "", checked: false });
  };

  // checkbox handler
  const handleCheck = (id) => {
    setTodo((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // edit handler
  const handleEdit = (id) => {
    const taskEdit = todo.find((task) => task.id === id);
    setInputValue(taskEdit);
    const updatedTask = todo.filter((task) => task.id !== id);
    setTodo(updatedTask);
  };

  // delete handler
  const handleDelete = (id) => {
    const updatedTask = todo.filter((task) => task.id !== id);
    setTodo(updatedTask);
  };

  // clear all handler
  const handleClearAll = () => {
    if (
      todo.length > 0 &&
      window.confirm("Are you sure you want to clear all todos?")
    )
      setTodo([]);
  };

  // add todo to local storage
  useEffect(() => {
    localStorage.setItem(todoList, JSON.stringify(todo));
  }, [todo]);

  // handle enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isDisabled) {
      handleAdd();
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#0a1828,#1e3a5f,#2c5364)] text-white flex flex-col">
      <div className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-4">
        <h1 className="text-center text-6xl p-3">Todo List</h1>

        <div className="flex w-full max-w-xl">
          <input
            type="text"
            autoComplete="off"
            placeholder="Add your todos"
            onKeyDown={handleKeyDown}
            onChange={(e) => handleChange(e.target.value)}
            value={inputValue.content}
            className="w-full max-w-md px-3 py-3 text-base border border-gray-300 rounded-2xl bg-gray-100 text-black
             focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="submit"
            onClick={handleAdd}
            className="bg-white text-black px-6 py-3 rounded-2xl ml-2 text-lg font-medium hover:bg-sky-500 hover:font-semibold disabled:opacity-50"
            disabled={isDisabled || !inputValue.content.trim()}
          >
            Add
          </button>
        </div>
        {todo.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No Todos yet. Add some tasks to get started!
          </p>
        )}
        <ul className="flex flex-col gap-4 pt-5 pb-5">
          {todo.map((curTask) => {
            const { id, content, checked } = curTask;
            return (
              <li
                key={id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center px-6 py-4 bg-[#3d4f5c] rounded-3xl w-full max-w-xl gap-5 text-lg md:text-2xl hover:scale-105 transition-all duration-500"
              >
                <span className={`p-2 ${checked ? "line-through" : ""}`}>
                  {content}
                </span>

                <button
                  className="rounded-full bg-[#FFB84D] p-3 md:p-4 hover:bg-[#ec9819]"
                  onClick={() => handleEdit(id)}
                >
                  <FaRegEdit className="text-lg md:text-xl" />
                </button>
                <button
                  className="rounded-full bg-green-700 p-3 md:p-4 hover:bg-green-600"
                  aria-label={
                    checked ? "Mark as incomplete" : "Mark as complete"
                  }
                  onClick={() => handleCheck(id)}
                >
                  <FaCheck className="text-lg md:text-xl" />
                </button>
                <button
                  className="rounded-full bg-red-700 p-3 md:p-4 hover:bg-red-600"
                  onClick={() => handleDelete(id)}
                >
                  <MdDelete className="text-lg md:text-xl" />
                </button>
              </li>
            );
          })}
        </ul>

        {todo.length !== 0 && (
          <button
            className="w-full bg-red-600 p-3 rounded-2xl m-1 text-lg hover:font-bold hover:cursor-pointer hover:bg-red-800 flex justify-center"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>
    </section>
  );
};

