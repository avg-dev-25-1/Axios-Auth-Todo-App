import { useState } from "react";
import Modal from "./Modal";

const ListHeader = ({ listname, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("Signed Out Successfully");
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
