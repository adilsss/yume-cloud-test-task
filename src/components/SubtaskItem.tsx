import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, Checkbox, IconButton, Text, VStack } from "@chakra-ui/react";
import { Subtask } from "../types/subtasks";
import { Task } from "../types/taskItem";

export interface Props {
  subtask: Subtask;
  index: number;
  task: Task;
  handleSubtaskStatus: (index: number) => void;
  handleEdit: (updatedTask: Task) => void;
}

export const SubtaskItem = ({
  subtask,
  index,
  handleSubtaskStatus,
  handleEdit,
  task,
}: Props) => {
  return (
    <HStack py={2} w="100%" spacing={2} justify="space-between">
      <VStack w="100%" alignItems="flex-start">
        <HStack w="100%" justifyContent="space-between">
          <Checkbox
            isChecked={subtask.completed}
            onChange={() => handleSubtaskStatus(index)}
          >
            {subtask.title}
          </Checkbox>
          <IconButton
            aria-label="Delete subtask"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={() =>
              handleEdit({
                ...task,
                subtasks: task.subtasks.filter((_, i) => i !== index),
              })
            }
          />
        </HStack>
        <HStack>
          <VStack w="100%" alignItems="start">
            <Text w="100%" wordBreak="break-word" whiteSpace="pre-wrap">
              {subtask.description}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};
