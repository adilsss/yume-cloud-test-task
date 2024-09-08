import { Subtask } from "./subtasks";

export interface TaskFormData {
  title: string;
  description?: string;
  subtasks: Subtask[];
}
