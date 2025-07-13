import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import axios from "axios";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/todos/${task.id}`
      );
      if (response.status === 200) {
        console.log("Task deleted successfully");
        getData();
      }
    } catch (error) {
      console.error("Error deleting the task:", error);
    }
  };
  // window.location.reload();  (Reloading the whole page is not reccomended instead use get data in try block as shown in line 17 )
  return (
    <div className="list-item">
      <div className="info-container">
        <TickIcon />
        <p>{task.title}</p>
        <ProgressBar />
      </div>

      <div className="list-button">
        <div className="edit" onClick={() => setShowModal(true)}>
          edit
        </div>
        <div className="delete" onClick={deleteTask}>
          delete
        </div>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </div>
  );
};

export default ListItem;
