import { useContext } from "react";
import TaskContext from "./TaskContext";

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskContext must be provided within the TaskProvider");
  }
  return context;
};

export default useTaskContext;
