import { useCookies } from "react-cookie";
import {
  BrowserRouter,
  Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Auth from "./assets/Auth";
import Dashboard from "./assets/Dashboard";

const App = () => {
  const [cookie] = useCookies();
  const authToken = cookie.AuthToken;

  return (
    <Routes>
      <Route path="/" element={authToken ? <Dashboard /> : <Auth />} />
      <Route
        path="/dashboard"
        element={authToken ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
