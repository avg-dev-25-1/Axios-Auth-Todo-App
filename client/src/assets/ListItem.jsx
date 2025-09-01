import { useEffect, useState } from "react";
import useTaskContext from "./context/useTaskContext";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const ListItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [progress, setProgress] = useState(task.progress);
  // console.log(task.title);
  // console.log(progress);

  useEffect(() => {
    setProgress(task.progress);
  }, [task.progress]);

  const handleCheckBox = async (e) => {
    const newProgress = e.target.checked ? 100 : 0;
    setProgress(newProgress);

    try {
      await axios.put(`http://localhost:5000/todos/${task.id}`, {
        ...task,
        progress: newProgress,
      });
    } catch (error) {
      console.error("Failed to update the task:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/todos/${task.id}`
      );
      if (response.status === 200) {
        console.log(`Task with ${task.id} deleted successfully`);
        dispatch({ type: "TRIGGER_REFRESH" });
      }
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={progress === 100}
          onChange={handleCheckBox}
          aria-label="Toggle task completion"
        />
        <p className={`task-title ${progress === 100 ? "completed" : ""}`}>
          {task.title}
        </p>
        <ProgressBar progress={progress} />
      </div>

      <div className="list-button">
        <button
          className="edit"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: { mode: "edit", task } })
          }
        >
          edit
        </button>
        <button className="delete" onClick={(e) => handleDelete(e)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
