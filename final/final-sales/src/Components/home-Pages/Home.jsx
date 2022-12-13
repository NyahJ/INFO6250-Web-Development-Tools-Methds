import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchGetAllRecords,
  fetchDeleteSingleRecord,
} from "../../services/recordservices";
import ViewRecordDetailsAccordian from "./ViewRecordDetailsAccordian";
import AddRecordReminderAccordian from "./AddRecordLogAccordian";

const Home = ({ setIsLoggedIn }) => {
  const [allRecords, setAllRecords] = useState({});
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const getAllRecords = async () => {
    try {
      const fetchedRecordIds = await fetchGetAllRecords();
      setAllRecords(fetchedRecordIds);
      setError("");
    } catch (error) {
      setError(error.message);
      if (
        error.message === "You have not logged in, please login" ||
        error.message === "Your login session has expired, please login again"
      ) {
        setIsLoggedIn(false);
      }
    }
  };

  const handleDeleteSingleRecord = async (key) => {
    try {
      await fetchDeleteSingleRecord(key);
      setUpdated(!updated);
      setError("");
    } catch (error) {
      setError(error.message);
      if (
        error.message === "You have not logged in, please login" ||
        error.message === "Your login session has expired, please login again"
      ) {
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAllRecords();
      setIsPageLoading(false);
    }, 1000);
  }, [updated]);

  if (isPageLoading) {
    return <p className="loading-div">Loading..!</p>;
  } else if (Object.keys(allRecords).length === 0) {
    return (
      <div className="about-container">
        <p>Welcome to SalesUp!!</p>
        <p>
          No any record yet, click on <Link to="/add-record">ADD</Link>!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="all-record-container">
        <ul className="all-record-list">
          {Object.entries(allRecords).map(([key, value]) => {
            return (
              <li key={key}>
                <div className="record-container-div">
                  <p className="record-name-title">
                    <b>{value.recordName} </b>
                  </p>
                  <div className="accordion-holder-div">
                    <ViewRecordDetailsAccordian
                      recordId={value.recordId}
                      recordType={value.recordType}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                    <AddRecordReminderAccordian
                      recordId={value.recordId}
                      recordType={value.recordType}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </div>
                  <button
                    className="delete-record-btn"
                    onClick={() => handleDeleteSingleRecord(key)}
                  >
                    DELETE RECORD
                  </button>
                </div>
              </li>
            );
          })}
          {error && <p className="error-message">{error}</p>}
        </ul>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
