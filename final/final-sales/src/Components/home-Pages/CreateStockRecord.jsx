import { useState } from "react";
import { fetchQuitNewBadRecord } from "../../services/recordservices";
import ErrorModal from "../modals/ErrorModal";

const CreateStockRecord = ({ setIsLoggedIn }) => {
  const [recordName, setRecordName] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchQuitNewBadRecord(recordName, new Date(startDate));
      setError("");
      setMessage("Record Created Successfully");
    } catch (error) {
      setError(error.message);
      setMessage("");
      if (
        error.message === "You have not logged in, please login" ||
        error.message === "Your login session has expired, please login again"
      ) {
        setIsLoggedIn(false);
        return (window.location.href = "/");
      }
    }
  };

  return (
    <div className="record-container">
      <div className="form-div">
        <form>
          <div className="record-data-1">
            <label htmlFor="record-name">Product Name:</label>
            <input
              type="text"
              value={recordName}
              placeholder="Example : Wine"
              onChange={(e) => setRecordName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="start">Record Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              format="yyyy-mm-dd"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <button className="save-btn" type="submit" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
      {error && (
        <ErrorModal
          value={errorModalOpen}
          error={error}
          setError={setError}
          setErrorModalOpen={setErrorModalOpen}
        />
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateStockRecord;
