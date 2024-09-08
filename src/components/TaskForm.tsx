import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Input, Button, VStack, HStack, Textarea } from "@chakra-ui/react";
import { TaskFormData } from "../types/taskForm";
import { SubtaskItemForm } from "./SubTaskItemForm";

interface Props {
  onSubmit: (data: TaskFormData) => void;
  defaultValues?: TaskFormData;
  isEditing?: boolean;
}

export const TaskForm = ({
  onSubmit,
  defaultValues,
  isEditing = false,
}: Props) => {
  const methods = useForm<TaskFormData>({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      subtasks: [],
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "subtasks",
  });

  const onSubmitForm = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <VStack w="100%">
        <form
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <VStack spacing={4} w="100%" maxW="700px">
            <Input
              placeholder="Task Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <span>{errors.title.message}</span>}

            <Textarea
              placeholder="Task Description (optional)"
              {...register("description", {
                minLength: {
                  value: 10,
                  message: "Description should be at minimum 10 characters",
                },
              })}
            />
            {errors.description && <span>{errors.description.message}</span>}

            <VStack w="100%" spacing={2} align="start">
              {fields.map((field, index) => (
                <SubtaskItemForm
                  key={field.id}
                  index={index}
                  remove={remove}
                  errors={errors}
                />
              ))}
            </VStack>

            <HStack w="100%" alignItems="flex-start">
              <Button
                type="button"
                onClick={() =>
                  append({ title: "", description: "", completed: false })
                }
                colorScheme="blue"
              >
                Add Subtask
              </Button>

              <Button type="submit" colorScheme="green">
                {isEditing ? "Save Changes" : "Create Task"}
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </FormProvider>
  );
};
