import React, { useEffect, useMemo, useState } from "react";
import { ITaskItem } from "./features/interfaces";

// Start

const has2orMoreWords = (text: string) => {
  // for some reason, this regex does not work here: /([a-zA-Z]+\s?\b){2,}/g
  // split words instead
  const words = text.split(" ");
  return words.length >= 2;
};

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState<ITaskItem[]>([
    { id: crypto.randomUUID(), text: "Learn React", completed: false },
    { id: crypto.randomUUID(), text: "Write code", completed: true },
    { id: crypto.randomUUID(), text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [show2orMore, setShow2orMore] = useState(false);
  const [tasksToRender, setTasksToRender] = useState<ITaskItem[]>([]);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({
        id: crypto.randomUUID(),
        text: newTask,
        completed: false,
      });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = {
          id: task.id,
          text: task.text,
          completed: task.completed,
        };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const tempTasks = tasks.filter((task) => task.id !== id);
    setTasks(tempTasks);
  };

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

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
        <h2>Items: {totalCount}</h2>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button
            onClick={() => setShow2orMore(!show2orMore)}
            //  change btn bgColor to show that the filter is currently active
            style={{ background: show2orMore ? "blue" : "" }}
          >
            2 or more words
          </button>
        </div>
        <ul>
          {tasksToRender.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => handleDeleteTask(task.id)}>[x]</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setTasks([])}>Delete All Tasks</button>
      </div>
    </div>
  );
}
