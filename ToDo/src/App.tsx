import { useEffect, useState } from "react";
import { Trash2, CheckCircle, Circle, Plus } from "lucide-react";
import "./App.css";

type Tasks = {
  text: string;
  completed: boolean;
  id: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Tasks[]>(() => {
     const savedTasks = localStorage.getItem("tasks");
     return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
     const updatedTasks = [
      ...tasks,
      {
        id: Date.now().toString(),
        completed: false,
        text: input,
      },
    ];
    setTasks(updatedTasks);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          📝 To-Do List
        </h2>
        <div className="flex gap-3 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white p-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} /> Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-3 shadow-md"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="focus:outline-none"
                >
                  {task.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>
                <span
                  className={`text-lg ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
