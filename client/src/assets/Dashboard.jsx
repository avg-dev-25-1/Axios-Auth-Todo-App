import axios from "axios";
import { useCookies } from "react-cookie";
import useTaskContext from "./context/useTaskContext";
import { useCallback, useEffect } from "react";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
import Modal from "./Modal";

const Dashboard = () => {
  const [cookie] = useCookies();
  const authToken = cookie.AuthToken;
  const userEmail = cookie.Email;
  const { state, dispatch } = useTaskContext();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/${userEmail}`
      );
      // console.log("Fetched todos from the backend:", response.data); --> check whether the response holds "data" key then use it as response.data to send that to front end react to update webpage
      dispatch({ type: "SET_TASKS", payload: response.data.rows || [] });
    } catch (error) {
      console.error("Error fetching the todos:", error);
    }
  }, [userEmail, dispatch]);

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken, getData]);

  useEffect(() => {
    if (state.refreshTasks) {
      getData(), dispatch({ type: "RESET_REFRESH" });
    }
  }, [state.refreshTasks, getData, dispatch]);

  const sortedTasks = [...state.tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date) //pSQL database column "date" is what referred in a.date/b.date
  );
  return (
    <div className="app">
      <ListHeader listName="Todo List 📝" />
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}

      {state.showModal && (
        <Modal mode={state.modalMode} task={state.currentItem} />
      )}

      <p className="copyright">
        @creative coding by <i>SPB</i>
      </p>
    </div>
  );
};

export default Dashboard;
