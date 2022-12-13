import { useState, useEffect } from "react";
import {
    fetchGetSingleRecord,
    fetchPostCreateGeneralRecordLog,
    fetchPostLimitEditionRecordLog,
    fetchPostCreateStockRecordLog,
} from "../../services/recordservices";

function AddRecordLogAccordian({ recordId, recordType, setIsLoggedIn }) {
    const [isEntryOpen, setIsEntryOpen] = useState({});
    const [error, setError] = useState("");
    const [record, setRecord] = useState({
        startDate: new Date().toISOString(),
    });
    const [recordLogNumber, setRecordLogNumber] = useState(1);
    const [recordLogDate, setRecordLogDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [recordLogIsSuccess, setRecordLogIsSuccess] = useState("Yes");
    const [recordUnit, setRecordUnit] = useState("times");
    const handleRadioGroupChange = (e) => {
        const target = e.target;
        if (target.checked) {
            setRecordLogIsSuccess(target.value);
        }
    };

    function toggleEntry(recordId) {
        setIsEntryOpen({
            ...isEntryOpen,
            [recordId]: !isEntryOpen[recordId],
        });
    }
    const isOpen = isEntryOpen[recordId];

    const getRecordDetails = async () => {
        try {
            const fetchedRecord = await fetchGetSingleRecord(recordId);
            setRecord(fetchedRecord);
            if (
                recordType === "CreateGeneralRecord" ||
                recordType === "LimitEditionRecord"
            ) {
                setRecordUnit(fetchedRecord.unit);
            }
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
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            switch (recordType) {
                case "CreateGeneralRecord":
                    await fetchPostCreateGeneralRecordLog(
                        recordId,
                        recordLogNumber,
                        recordUnit,
                        new Date(recordLogDate)
                    );
                    break;

                case "LimitEditionRecord":
                    await fetchPostLimitEditionRecordLog(
                        recordId,
                        recordLogNumber,
                        recordUnit,
                        new Date(recordLogDate)
                    );
                    break;

                case "CreateStockRecord":
                    await fetchPostCreateStockRecordLog(
                        recordId,
                        recordLogIsSuccess === "Yes" ? true : false,
                        new Date(recordLogDate)
                    );
                    break;

                default:
                    console.log("Invalid recordType");
                    break;
            }
            setError("");
        } catch (err) {
            setError(err.message);
            if (
                error.message === "You have not logged in, please login" ||
                error.message ===
                    "Your login session has expired, please login again"
            ) {
                setIsLoggedIn(false);
            }
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
                    Add Reminders To Record
                </button>
                <div className="accordion__body">
                    <form>
                        {(recordType === "CreateGeneralRecord" ||
                            recordType === "LimitEditionRecord") && (
                            <div className="record-data-log-div">
                                <div className="record-data-log-sub-div">
                                    <input
                                        className="record-log-unit-input"
                                        type="number"
                                        min="0"
                                        value={recordLogNumber}
                                        placeholder={recordUnit}
                                        onChange={(e) =>
                                            setRecordLogNumber(e.target.value)
                                        }
                                    ></input>
                                    <span className="record-log-unit-input-text">
                                        {recordUnit}
                                    </span>
                                </div>
                                <div>
                                    <input
                                        className="record-log-date-input"
                                        type="date"
                                        min={record.startDate.slice(0, 10)}
                                        max={new Date()
                                            .toISOString()
                                            .slice(0, 10)}
                                        value={recordLogDate}
                                        onChange={(e) =>
                                            setRecordLogDate(e.target.value)
                                        }
                                    ></input>
                                </div>
                            </div>
                        )}

                        {recordType === "CreateStockRecord" && (
                            <div className="record-data-log-div">
                                <div className="radio-btn-div">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Yes"
                                            checked={
                                                recordLogIsSuccess === "Yes"
                                            }
                                            onChange={handleRadioGroupChange}
                                        />
                                        <span>In Stock</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="No"
                                            checked={recordLogIsSuccess === "No"}
                                            onChange={handleRadioGroupChange}
                                        />
                                        <span>Out of Stock</span>
                                    </label>
                                </div>
                                <input
                                    className="record-log-date-input"
                                    type="date"
                                    min={record.startDate.slice(0, 10)}
                                    max={new Date().toISOString().slice(0, 10)}
                                    value={recordLogDate}
                                    onChange={(e) =>
                                        setRecordLogDate(e.target.value)
                                    }
                                ></input>
                            </div>
                        )}

                        <button
                            className="save-log"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            SAVE REMINDER
                        </button>
                    </form>
                </div>
            </div>
            {error && <span className="error-field">{error}</span>}
        </div>
    );
}

export default AddRecordLogAccordian;
