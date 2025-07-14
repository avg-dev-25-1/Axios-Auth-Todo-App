import { useEffect, useState } from "react";
import ListHeader from "./assets/ListHeader";
import axios from "axios";
import ListItem from "./assets/ListItem";
import Auth from "./assets/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/${userEmail}`
      );
      console.log(response.data);
      setTasks(response.data); //this will update the tasks var
    } catch (error) {
      console.error("Error fetching the todos:", error);
    }
  };
  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);
  console.log(tasks);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listname={"To do list 📝"} getData={getData} />
          <p className="user-email">Welcome back{userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© Creative coding by spb</p>
    </div>
  );
};

export default App;
