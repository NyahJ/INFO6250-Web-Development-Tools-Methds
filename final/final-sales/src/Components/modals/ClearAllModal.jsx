import "./modalStyle.css";
import { fetchDeleteAllRecords } from "../../services/recordservices";

const ClearModal = ({ setOpenModal }) => {
  const handleClearRecords = async () => {
    try {
      await fetchDeleteAllRecords();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p>All your sales record data will be deleted</p>
          <p>Are You Sure You Want to Continue?</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handleClearRecords}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
