import { useState, useEffect } from "react";
import { getRecordsGoalStatus } from "../../utils/recordStatusChecker";

const Calendar = ({ month, year, record, recordType, recordLogs }) => {
    const [activeYear, setActiveYear] = useState(year);
    const [activeMonth, setActiveMonth] = useState(month);
    const [recordLogsForTheDay, setRecordLogsForTheDay] = useState({});
    const [goalStatus, setGoalStatus] = useState({
        CompletedDays: [],
        FailedDays: [],
        PartialCompletedDays: [],
    });

    const getMonthName = (month) => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "";
        }
    };

    const getFullMonth = (month) => {
        if (month < 10) {
            return `0${month}`;
        } else {
            return month;
        }
    };

    const getRecordLogsPerDay = () => {
        const recordLogsPerDay = {};
        for (let i = 0; i < recordLogs.length; i++) {
            const dateObj = new Date(recordLogs[i].date);
            const date =
                dateObj.getFullYear() +
                "-" +
                getFullMonth(dateObj.getMonth() + 1) +
                "-" +
                (dateObj.getDate() < 10
                    ? `0${dateObj.getDate()}`
                    : dateObj.getDate());
            if (recordLogsPerDay[date]) {
                recordLogsPerDay[date].push(recordLogs[i]);
            } else {
                recordLogsPerDay[date] = [recordLogs[i]];
            }
        }
        return recordLogsPerDay;
    };

    const printDailyLogInFriendlyWay = (recordLog) => {
        let beautifiedLog = "";
        if (!recordLog) {
            return beautifiedLog;
        }
        switch (recordType) {
            case "CreateGeneralRecord":
            case "LimitEditionRecord":
                for (let i = 0; i < recordLog.length; i++) {
                    beautifiedLog +=
                        recordLog[i].number +
                        " " +
                        recordLog[i].unit +
                        " on " +
                        recordLog[i].date.split("T")[0];
                }
                break;
            case "CreateStockRecord":
                for (let i = 0; i < recordLog.length; i++) {
                    beautifiedLog +=
                        (recordLog[i].isSuccess === "true"
                            ? "Successful"
                            : "Not Successful") +
                        " on " +
                        recordLog[i].date.split("T")[0];
                }
                break;
            default:
                beautifiedLog = "";
        }
        return beautifiedLog;
    };

    const addEmptyDaysUntilFirstDayOfTheMonth = () => {
        const firstDayOfTheMonth = new Date(activeYear, activeMonth, 1);
        const daysToSkip = firstDayOfTheMonth.getDay();

        let emptyDays = [];
        for (let index = 0; index < daysToSkip; index++) {
            emptyDays.push(<li key={index}></li>);
        }

        return emptyDays;
    };

    const addDaysOfMonth = () => {
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
        let days = [];
        for (let index = 1; index <= daysInMonth; index++) {
            const date = new Date(activeYear, activeMonth, index - 1)
                .toISOString()
                .split("T")[0];

            if (goalStatus.CompletedDays.includes(date)) {
                if (recordLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="succeeded">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        recordLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="succeeded">{index}</span>
                                <div className="dropdown-content">
                                    No Record Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else if (goalStatus.FailedDays.includes(date)) {
                if (recordLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="failed">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        recordLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="failed">{index}</span>
                                <div className="dropdown-content">
                                    No Record Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else if (goalStatus.PartialCompletedDays.includes(date)) {
                if (recordLogsForTheDay[date]) {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="partial">{index}</span>
                                <div className="dropdown-content">
                                    {printDailyLogInFriendlyWay(
                                        recordLogsForTheDay[date]
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                } else {
                    days.push(
                        <li key={index}>
                            <div className="dropdown">
                                <span className="partial">{index}</span>
                                <div className="dropdown-content">
                                    No Record Logs available for this date
                                </div>
                            </div>
                        </li>
                    );
                }
            } else {
                days.push(
                    <li key={index}>
                        <div className="dropdown">
                            {index}
                            <div className="dropdown-content">
                                No Record Logs available for this date
                            </div>
                        </div>
                    </li>
                );
            }
        }

        return days;
    };

    const gotoNextMonth = () => {
        if (activeMonth === 11) {
            setActiveMonth(0);
            setActiveYear(activeYear + 1);
        } else {
            setActiveMonth(activeMonth + 1);
        }
    };

    const gotoPreviousMonth = () => {
        if (activeMonth === 0) {
            setActiveMonth(11);
            setActiveYear(activeYear - 1);
        } else {
            setActiveMonth(activeMonth - 1);
        }
    };

    useEffect(() => {
        setGoalStatus(getRecordsGoalStatus(record, recordType, recordLogs));
        setRecordLogsForTheDay(getRecordLogsPerDay());
    }, [activeMonth, activeYear, record, recordType, recordLogs]);

    return (
        <div className="calender-container">
            <div className="month">
                <ul>
                    <li className="prev">
                        <button onClick={gotoPreviousMonth}>&#10094;</button>
                    </li>
                    <li className="next">
                        <button onClick={gotoNextMonth}>&#10095;</button>
                    </li>
                    <li>
                        {getMonthName(activeMonth)}{" "}
                        <span className="year">{activeYear}</span>
                    </li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>

            <ul className="days">
                {addEmptyDaysUntilFirstDayOfTheMonth()}
                {addDaysOfMonth()}
            </ul>
        </div>
    );
};

export default Calendar;
