import { TaskItem } from "./TaskItem";
import { Task } from "../types/taskItem";
import {
  Droppable,
  Draggable,
  DropResult,
  DragDropContext,
} from "react-beautiful-dnd";
import { Badge, VStack } from "@chakra-ui/react";

interface FilteredTaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onDragEnd: (result: DropResult) => void;
}

const FilteredTaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggle,
  onDragEnd,
}: FilteredTaskListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <VStack {...provided.droppableProps} ref={provided.innerRef} w="100%">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <VStack
                    w="100%"
                    spacing={4}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onEdit={onEdit}
                      onDelete={() => onDelete(task.id)}
                      onToggle={() => onToggle(task.id)}
                    />
                  </VStack>
                )}
              </Draggable>
            ))}
            {tasks.length < 1 && (
              <Badge
                ml="1"
                fontSize="18px"
                p={2}
                borderRadius={8}
                colorScheme="blue"
              >
                No tasks
              </Badge>
            )}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FilteredTaskList;
