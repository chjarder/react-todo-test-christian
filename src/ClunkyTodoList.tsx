import React, { useEffect, useMemo, useState } from "react";
import { ITaskItem } from "./features/interfaces";
import TaskList from "./features/taskList/TaskList";
import TaskFilters from "./features/filters/TaskFilters";

// Start

const has2orMoreWords = (text: string) => {
  // for some reason, this regex does not work here: /([a-zA-Z]+\s?\b){2,}/g
  // split words instead
  const words = text.split(" ");
  return words.length >= 2;
};

const initialTasks: ITaskItem[] = [
  { id: crypto.randomUUID(), text: "Learn React", completed: false },
  { id: crypto.randomUUID(), text: "Write code", completed: true },
  { id: crypto.randomUUID(), text: "Eat lunch", completed: false },
];

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState<ITaskItem[]>(initialTasks);
    const [filter, setFilter] = useState("all");
  const [show2orMore, setShow2orMore] = useState(false);
  const [tasksToRender, setTasksToRender] = useState<ITaskItem[]>([]);

  const newTaskRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    if (show2orMore) {
      filteredTasks = filteredTasks.filter((task) =>
        has2orMoreWords(task.text)
      );
    }

    setTasksToRender(filteredTasks);
  }, [tasks, filter, show2orMore]);

  const handleAddTask = () => {
    if (!newTaskRef.current) return;

    const text = newTaskRef.current.value;
    if (!text.trim()) return;

      const tempTasks = [...tasks];
      tempTasks.push({
        id: crypto.randomUUID(),
        text: text,
        completed: false,
      });
      setTasks(tempTasks);
      newTaskRef.current.value = "";
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const tempTasks = tasks.filter((task) => task.id !== id);
    setTasks(tempTasks);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "10vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>To-Do List</h1>
        <h2>Items: {tasks.length}</h2>
        <input type="text" ref={newTaskRef} placeholder="Add new task" />
        <button onClick={handleAddTask}>Add</button>
        <TaskFilters
          // passing anonymous function will trigger re-render.
          // pass the function as is instead
          btn2orMoreActive={show2orMore}
          setShow2orMore={setShow2orMore}
          setFilter={setFilter}
        />
        <TaskList
          tasksToRender={tasksToRender}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
        />
        <button onClick={() => setTasks([])}>Delete All Tasks</button>
      </div>
    </div>
  );
}
