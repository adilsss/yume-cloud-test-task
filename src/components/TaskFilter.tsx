import { Select } from "@chakra-ui/react";
import { TaskStatus } from "../types/taskItem";

interface Props {
  filter: TaskStatus;
  onFilterChange: (filter: TaskStatus) => void;
}

export const TaskFilter = ({ filter, onFilterChange }: Props) => {
  return (
    <Select
      value={filter}
      onChange={(e) => onFilterChange(e.target.value as TaskStatus)}
      width="200px"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not Completed</option>
    </Select>
  );
};
