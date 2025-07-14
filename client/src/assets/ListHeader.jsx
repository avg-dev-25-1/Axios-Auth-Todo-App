import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listname, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [removeCookie] = useCookies(null);

  const signOut = () => {
    console.log("Signed Out Successfully");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="list-header">
      <h1>{listname}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          add new
        </button>
        <button className="signout" onClick={signOut}>
          sign out
        </button>
        {showModal && (
          <Modal
            mode={"create"}
            getData={getData}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default ListHeader;
