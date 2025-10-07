import { ITaskItem } from "../interfaces";

export default function TaskList(props: {
  tasksToRender: ITaskItem[];
  handleToggleComplete: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}) {
  return (
    <ul>
      {props.tasksToRender.map((task) => (
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
      ))}
    </ul>
  );
}
