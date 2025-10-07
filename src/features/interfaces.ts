export interface ITaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export type Filter = "all" | "active" | "completed";
