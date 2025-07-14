import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 0,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        userEmail: data.user_email,
        title: data.title,
        progress: data.progress,
        date: data.date,
      });
      console.log("The post response is as below:", response);
      if (response.status === 200) {
        setShowModal(false);
        console.log("Task Submitted successful");
        getData();
      }
    } catch (error) {
      console.error("Error during post request:", error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/todos/${task.id}`,
        {
          userEmail: data.user_email,
          title: data.title,
          progress: data.progress,
          date: data.date,
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error("Error editing the data:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log("change in modal");
    const { name, value } = e.target; //progress bar and input field are target elements, draging the progress bar or typin in the input field will return two var namely "name","value"

    setData((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(data);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Lets's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            maxLength={100}
            placeholder="Type your task here"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            required
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
