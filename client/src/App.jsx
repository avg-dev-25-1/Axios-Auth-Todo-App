import { useEffect, useState } from "react";
import ListHeader from "./assets/ListHeader";
import axios from "axios";
import ListItem from "./assets/ListItem";

const App = () => {
  const userEmail = "abc@test.com";
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
    getData();
  }, []);
  console.log(tasks);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      <ListHeader listname={"To do list 📝"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
