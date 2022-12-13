import { useState, useEffect } from "react";
import {
    fetchGetSingleRecord,
    fetchGetLogsOfARecord,
} from "../../services/recordservices";
import { getRecordStatusPieChartData } from "../../utils/recordStatusChecker";
import Calendar from "./Calendar";
import Piechart from "./Piechart";

const ViewRecordDetailsAccordian = ({ recordId, recordType, setIsLoggedIn }) => {
    const [isEntryOpen, setIsEntryOpen] = useState({});
    const [record, setRecord] = useState({
        startDate: new Date().toISOString(),
    });
    const [recordLogs, setRecordLogs] = useState([]);
    const [pieChartData, setPieChartData] = useState({
        degree1: 0,
        degree2: 90,
        degree3: 180,
        degree4: 270,
        degree5: 360,
    });
    const [error, setError] = useState("");

    function toggleEntry(recordId) {
        setIsEntryOpen({
            ...isEntryOpen,
            [recordId]: !isEntryOpen[recordId],
        });
    }
    const isOpen = isEntryOpen[recordId];

    const getRecordDetails = async () => {
        let fetchedRecord;
        let fetchedRecordLogs;
        try {
            fetchedRecord = await fetchGetSingleRecord(recordId);
            setRecord(fetchedRecord);
            setError("");
        } catch (error) {
            setError(error.message);
            if (
                error.message === "You have not logged in, please login" ||
                error.message ===
                    "Your login session has expired, please login again"
            ) {
                setIsLoggedIn(false);
            }
        }

        try {
            fetchedRecordLogs = await fetchGetLogsOfARecord(recordId);
            setRecordLogs(fetchedRecordLogs);
            setError("");
        } catch (error) {
            setError(error.message);
            if (
                error.message === "You have not logged in, please login" ||
                error.message ===
                    "Your login session has expired, please login again"
            ) {
                setIsLoggedIn(false);
            }
        }

        setPieChartData(
            getRecordStatusPieChartData(
                fetchedRecord,
                recordType,
                fetchedRecordLogs
            )
        );
    };

    const getFriendlyNameForRecordType = () => {
        switch (recordType) {
            case "CreateGeneralRecord":
                return "General Record";
            case "LimitEditionRecord":
                return "Limit Edition Record";
            case "CreateStockRecord":
                return "Stock Record";
            default:
                return "";
        }
    };

    const showRecordGoal = () => {
        switch (recordType) {
            case "CreateGeneralRecord":
                return `Product Sales Standard: Minimum ${record.goal} ${record.unit} ${record.duration}`;
            case "LimitEditionRecord":
                return `Product Sales Limit: Maximum ${record.goal} ${record.unit} ${record.duration}`;

            case "CreateStockRecord":
            default:
                return "";
        }
    };

    useEffect(() => {
        getRecordDetails();
    }, []);

    return (
        <div className="accordion">
            <div
                key={recordId}
                className={`accordion__entry ${
                    isOpen ? "accordion__entry--open" : ""
                }`}
            >
                <button
                    className="accordion__title"
                    onClick={() => toggleEntry(recordId)}
                >
                    View Record Details
                </button>
                <div className="accordion__body">
                    <div className="record-detail-accord-div">
                        <div>RecordType: {getFriendlyNameForRecordType()} </div>
                        <div>
                            Record Start Date: {record.startDate.split("T")[0]}
                        </div>
                        {showRecordGoal()}
                    </div>
                    <div className="inline-block-div">
                        <Calendar
                            month={new Date().getMonth()}
                            year={new Date().getFullYear()}
                            record={record}
                            recordType={recordType}
                            recordLogs={recordLogs}
                        />
                        <Piechart data={pieChartData} />
                    </div>
                </div>
            </div>
            {error && <span className="error-field">{error}</span>}
        </div>
    );
};

export default ViewRecordDetailsAccordian;
