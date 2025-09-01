import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useTaskContext from "./context/useTaskContext";

const ListHeader = ({ listName }) => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { state, dispatch } = useTaskContext();

  const signOut = () => {
    console.log(`user signed out successfully`);
    removeCookie("Email");
    removeCookie("AuthToken");
    navigate("/");
  };
  return (
    <div className="list-header">
      <h2>{listName}</h2>
      <div className="button-container">
        <button
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: { mode: "create" } })
          }
        >
          Add new
        </button>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
};

export default ListHeader;
