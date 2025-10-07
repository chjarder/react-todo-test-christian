import { memo } from "react";
import { ITaskItem } from "../interfaces";

export default memo(function TaskItem(props: {
  task: ITaskItem;
  handleToggleComplete: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}) {
  const task = props.task;

  return (
    <li key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => props.handleToggleComplete(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => props.handleDeleteTask(task.id)}>[x]</button>
    </li>
  );
});
