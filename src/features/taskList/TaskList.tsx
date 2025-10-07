import { ITaskItem } from "../interfaces";
import TaskItem from "./TaskItem";

export default function TaskList(props: {
  tasksToRender: ITaskItem[];
  handleToggleComplete: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}) {
  return (
    <ul>
      {props.tasksToRender.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleDeleteTask={props.handleDeleteTask}
          handleToggleComplete={props.handleToggleComplete}
        />
      ))}
    </ul>
  );
}
