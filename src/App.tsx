import { useState, useEffect } from "react";
import { TaskForm } from "./components/TaskForm";
import { HStack, VStack } from "@chakra-ui/react";
import { DropResult } from "react-beautiful-dnd";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./utils/localStorage";
import { Header } from "./components/Header";
import { TaskFormData } from "./types/taskForm";
import { Task, TaskStatus } from "./types/taskItem";
import FilteredTaskList from "./components/FilteredTasksList";
import { TaskFilter } from "./components/TaskFilter";

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus>(TaskStatus.All);

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    setTasks(loadedTasks);
  }, []);

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      completed: false,
      subtasks: data.subtasks.map((subtask) => ({
        ...subtask,
        completed: false,
      })),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const editTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskStatus = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTask);

    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "notCompleted") return !task.completed;
    return true;
  });

  return (
    <VStack w="100%" spacing={6}>
      <Header />
      <VStack padding={10} w="100%" justifyContent="center">
        <TaskForm onSubmit={addTask} />
      </VStack>
      <HStack
        w="100%"
        maxW={"800px"}
        pt={4}
        px={10}
        justifyContent="flex-start"
      >
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </HStack>
      <VStack w="100%" maxW={"800px"} px={10}>
        <FilteredTaskList
          tasks={filteredTasks}
          onEdit={editTask}
          onDelete={deleteTask}
          onToggle={toggleTaskStatus}
          onDragEnd={onDragEnd}
        />
      </VStack>
    </VStack>
  );
};
