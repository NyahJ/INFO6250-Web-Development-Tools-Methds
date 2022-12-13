import { useEffect, useState } from "react";
import { fetchGetSingleRecord } from "../../services/recordservices";

const ViewLog = ({ id }) => {
  const [record, setRecord] = useState({});
  const [error, setError] = useState("");

  const getSingleRecord = async () => {
    try {
      const fetchedRecord = await fetchGetSingleRecord(id);
      setRecord(fetchedRecord);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getSingleRecord();
  }, []);

  return (
    <div>
      {Object.entries(record).map(([key, value]) => {
        return (
          <div key={key}>
            <h3>{value.recordName}</h3>
            <p>{value.goal}</p>
            <p>{value.unit}</p>
            <p>{value.duration}</p>
            <p>{value.startDate}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewLog;
