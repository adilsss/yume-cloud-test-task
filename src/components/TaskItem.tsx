import { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Checkbox,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { TaskForm } from "./TaskForm";
import { SubtasksList } from "./SubtasksList";
import { DeleteIcon } from "@chakra-ui/icons";
import { TaskFormData } from "../types/taskForm";
import { Task } from "../types/taskItem";

export interface Props {
  task: Task;
  onDelete: () => void;
  onToggle: () => void;
  onEdit: (updatedTask: Task) => void;
}

export const TaskItem = ({ task, onDelete, onToggle, onEdit }: Props) => {
  const { colorMode } = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = (data: TaskFormData) => {
    const updatedTask = {
      ...task,
      title: data.title,
      description: data.description || "",
      subtasks: data.subtasks,
    };
    onEdit(updatedTask);
    setIsEditing(false);
  };

  const handleSubtaskStatus = (index: number) => {
    const updatedSubtasks = task.subtasks.map((subtask, i) =>
      i === index ? { ...subtask, completed: !subtask.completed } : subtask
    );
    handleEdit({ ...task, subtasks: updatedSubtasks });
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      width="100%"
      background={colorMode === "dark" ? "gray.900" : "gray.100"}
    >
      {isEditing ? (
        <TaskForm
          onSubmit={handleEdit}
          defaultValues={{
            title: task.title,
            description: task.description || "",
            subtasks: task.subtasks,
          }}
          isEditing={true}
        />
      ) : (
        <VStack w="100%" alignItems="flex-start">
          <HStack w="100%" justifyContent="space-between">
            <Text
              fontSize={20}
              fontWeight="bold"
              textDecor={task.completed ? "line-through" : ""}
            >
              {task.title}
            </Text>
            <Checkbox
              isChecked={task.completed}
              onChange={onToggle}
              colorScheme="blue"
            >
              {task.completed ? "Completed" : "Not Completed"}
            </Checkbox>
          </HStack>
          <Text maxW="70%">{task.description}</Text>
          <VStack
            spacing={2}
            align="start"
            pt={task.subtasks.length > 0 ? 4 : 0}
            w="50%"
          >
            {task.subtasks.length > 0 && (
              <SubtasksList
                task={task}
                handleEdit={handleEdit}
                handleSubtaskStatus={handleSubtaskStatus}
              />
            )}
          </VStack>
          <HStack spacing={2} mt={4}>
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <IconButton
              aria-label="Delete"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={onDelete}
            />
          </HStack>
        </VStack>
      )}
    </Box>
  );
};
