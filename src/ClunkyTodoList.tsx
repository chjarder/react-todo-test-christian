import { useCallback, useEffect, useRef, useState } from "react";
import TaskFilters from "./features/filters/TaskFilters";
import { ITaskItem } from "./features/interfaces";
import TaskList from "./features/taskList/TaskList";

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

  // useCallback not really needed here,
  // but it would be useful if we put all the other elements (h1, h2, input, button) into a
  // separate component and memoize it
  const handleAddTask = useCallback(() => {
    if (!newTaskRef.current) return;

    const text = newTaskRef.current.value;
    if (!text.trim()) return;

    const newTask: ITaskItem = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    newTaskRef.current.value = "";
  }, [setTasks]);

  // leverage the setTasks previous state so we don't have to set tasks as a dependency
  const handleToggleComplete = useCallback(
    (id: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      );
    },
    [setTasks]
  );

  // leverage the setTasks previous state so we don't have to set tasks as a dependency
  const handleDeleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

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
