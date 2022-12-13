import { useState } from "react";
import { fetchCreateNewGeneralRecord } from "../../services/recordservices";
import ErrorModal from "../modals/ErrorModal";

const CreateGeneralRecord = ({ setIsLoggedIn }) => {
  const [recordName, setRecordName] = useState("");
  const [goal, setGoal] = useState("");
  const [unit, setUnit] = useState("times");
  const [duration, setDuration] = useState("daily");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchCreateNewGeneralRecord(
        recordName,
        goal,
        unit,
        duration,
        new Date(startDate)
      );
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
              placeholder="Example : Perfume"
              onChange={(e) => setRecordName(e.target.value)}
            ></input>
          </div>
          <div className="record-data-2">
            <label htmlFor="goal">Standard volume:</label>
            <input
              id="goal"
              type="number"
              value={goal}
              min="1"
              placeholder="1"
              onChange={(e) => setGoal(e.target.value)}
            ></input>
            <select
              name="unit"
              id="units"
              defaultValue={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="boxes">Boxes</option>
              <option value="kg">Kilograms</option>
              <option value="g">Grams</option>
              <option value="tons">Tons</option>
              <option value="liter">Liter</option>
            </select>
            <select
              name="unit"
              id="units"
              defaultValue={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value={duration}>Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label htmlFor="start">Record Start Date:</label>
            <input
              type="date"
              id="start-date"
              name="start-date"
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

export default CreateGeneralRecord;
