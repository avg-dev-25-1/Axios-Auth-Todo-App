import { useReducer, createContext } from "react";

const initialState = {
  tasks: [],
  showModal: false,
  modalMode: "create",
  currentItem: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "OPEN_MODAL":
      return {
        ...state,
        showModal: true,
        modalMode: action.payload.mode,
        currentItem: action.payload.task || null,
      };

    case "CLOSE_MODAL": //explained in "refreshTasks.md"
      return { ...state, showModal: false };

    case "RESET_REFRESH":
      return { ...state, refreshTasks: false };

    case "TRIGGER_REFRESH":
      return { ...state, refreshTasks: true };

    default:
      return state;
  }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
