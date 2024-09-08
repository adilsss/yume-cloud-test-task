import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
import { SubtaskItem } from "./SubtaskItem";
import { TaskFormData } from "../types/taskForm";
import { Task } from "../types/taskItem";

export interface Props {
  task: Task;
  handleSubtaskStatus: (index: number) => void;
  handleEdit: (data: TaskFormData) => void;
}

export const SubtasksList = ({
  task,
  handleSubtaskStatus,
  handleEdit,
}: Props) => {
  return (
    <Accordion
      borderTopColor="transparent"
      borderBottomColor="transparent"
      allowMultiple
      w="100%"
    >
      <AccordionItem>
        <Heading>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Subtasks ({task.subtasks.length})
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel pb={4}>
          {task.subtasks.map((subtask, index) => (
            <SubtaskItem
              key={index}
              subtask={subtask}
              index={index}
              handleSubtaskStatus={handleSubtaskStatus}
              handleEdit={handleEdit}
              task={task}
            />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
