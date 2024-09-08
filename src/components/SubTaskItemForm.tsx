import {
  HStack,
  VStack,
  Input,
  Textarea,
  Checkbox,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import { TaskFormData } from "../types/taskForm";

interface Props {
  index: number;
  remove: (index: number) => void;
  errors: FieldErrors<TaskFormData>;
}

export const SubtaskItemForm = ({ index, remove, errors }: Props) => {
  const { control } = useFormContext();

  return (
    <HStack w="100%" py={4} spacing={4}>
      <VStack w="100%">
        <Controller
          name={`subtasks.${index}.title`}
          control={control}
          render={({ field }) => (
            <Input placeholder="Subtask Title" {...field} />
          )}
          rules={{ required: "Subtask title is required" }}
        />
        {errors?.subtasks?.[index]?.title && (
          <Text>{errors.subtasks[index]?.title?.message}</Text>
        )}

        <Controller
          name={`subtasks.${index}.description`}
          control={control}
          render={({ field }) => (
            <Textarea placeholder="Subtask Description" {...field} />
          )}
        />
        {errors?.subtasks?.[index]?.description && (
          <Text>{errors.subtasks[index]?.description?.message}</Text>
        )}
      </VStack>

      <Controller
        name={`subtasks.${index}.completed`}
        control={control}
        render={({ field }) => (
          <Checkbox isChecked={field.value} onChange={field.onChange}>
            Completed
          </Checkbox>
        )}
      />

      <IconButton
        aria-label="Delete"
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={() => remove(index)}
      />
    </HStack>
  );
};
