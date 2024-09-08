import { Subtask } from "./subtasks";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  subtasks: Subtask[];
}

export enum TaskStatus {
  All = "all",
  Completed = "completed",
  NotCompleted = "notCompleted",
}
