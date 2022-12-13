const getDateOfFirstDayOfTheWeek = (d) => {
    const dateObj = new Date(d);
    const dayCount = dateObj.getDay();
    const dateOfFirstDay = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate() - dayCount
    );
    return dateOfFirstDay;
};

const getDateOfLastDayOfTheWeek = (d) => {
    const dateObj = new Date(d);
    const dayCount = 6 - dateObj.getDay();
    const dateOfLastDay = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate() + dayCount
    );
    return dateOfLastDay;
};

const getDatesArrayFromRange = (startDate, endDate) => {
    const datesArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        datesArray.push(currentDate);
        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
        );
    }
    return datesArray;
};

export function getRecordsGoalStatus(record, recordType, recordLogs) {
    const recordsGoalStatus = {
        CompletedDays: [],
        FailedDays: [],
        PartialCompletedDays: [],
    };

    if (
        record == null ||
        Object.keys(record).length === 0 ||
        recordType == null ||
        recordLogs == null ||
        recordLogs.length === 0
    ) {
        return recordsGoalStatus;
    }

    if (recordType === "CreateGeneralRecord") {
        if (record.duration === "daily") {
            let recordLogsByDate = new Map();
            recordLogs.forEach((recordLog) => {
                const dateInObj = new Date(recordLog.date);
                if (recordLogsByDate.has(dateInObj)) {
                    recordLogsByDate.set(
                        dateInObj,
                        recordLogsByDate.get(dateInObj) + recordLog.number
                    );
                } else {
                    recordLogsByDate.set(dateInObj, recordLog.number);
                }
            });

            recordLogsByDate.forEach((value, key) => {
                const dateToAdd = new Date(
                    key.getFullYear(),
                    key.getMonth(),
                    key.getDate()
                )
                    .toISOString()
                    .split("T")[0];
                if (value >= record.goal) {
                    recordsGoalStatus.CompletedDays.push(dateToAdd);
                } else if (value > 0) {
                    recordsGoalStatus.PartialCompletedDays.push(dateToAdd);
                } else if (value === 0) {
                    recordsGoalStatus.FailedDays.push(dateToAdd);
                }
            });
        } else if (record.duration === "weekly") {
            let recordLogsByWeek = new Map();
            recordLogs.forEach((recordLog) => {
                const dateOfFirstDayOfTheWeek = getDateOfFirstDayOfTheWeek(
                    recordLog.date
                );
                if (recordLogsByWeek.has(dateOfFirstDayOfTheWeek)) {
                    recordLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        recordLogsByWeek.get(dateOfFirstDayOfTheWeek) +
                            recordLog.number
                    );
                } else {
                    recordLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        recordLog.number
                    );
                }
            });

            recordLogsByWeek.forEach((value, key) => {
                const dateOfLastDayOfTheWeek = getDateOfLastDayOfTheWeek(key);
                const datesArray = getDatesArrayFromRange(
                    key,
                    dateOfLastDayOfTheWeek
                );
                if (value >= record.goal) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        recordsGoalStatus.CompletedDays.push(dateToAdd);
                    }
                } else if (value > 0) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        recordsGoalStatus.PartialCompletedDays.push(dateToAdd);
                    }
                } else if (value === 0) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        recordsGoalStatus.FailedDays.push(dateToAdd);
                    }
                }
            });
        } else {
            console.log(
                `Error: Invalid record duration ${JSON.stringify(
                    record
                )} ${JSON.stringify(recordType)} ${JSON.stringify(recordLogs)}`
            );
        }
    } else if (recordType === "LimitEditionRecord") {
        if (record.duration === "daily") {
            let recordLogsByDate = new Map();
            recordLogs.forEach((recordLog) => {
                const dateInObj = new Date(recordLog.date);
                if (recordLogsByDate.has(dateInObj)) {
                    recordLogsByDate.set(
                        dateInObj,
                        recordLogsByDate.get(dateInObj) + recordLog.number
                    );
                } else {
                    recordLogsByDate.set(dateInObj, recordLog.number);
                }
            });

            recordLogsByDate.forEach((value, key) => {
                const dateToAdd = new Date(
                    key.getFullYear(),
                    key.getMonth(),
                    key.getDate()
                )
                    .toISOString()
                    .split("T")[0];
                if (value <= record.goal) {
                    recordsGoalStatus.CompletedDays.push(dateToAdd);
                } else if (value > record.goal) {
                    recordsGoalStatus.FailedDays.push(dateToAdd);
                }
            });
        } else if (record.duration === "weekly") {
            let recordLogsByWeek = new Map();
            recordLogs.forEach((recordLog) => {
                const dateOfFirstDayOfTheWeek = getDateOfFirstDayOfTheWeek(
                    recordLog.date
                );
                if (recordLogsByWeek.has(dateOfFirstDayOfTheWeek)) {
                    recordLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        recordLogsByWeek.get(dateOfFirstDayOfTheWeek) +
                            recordLog.number
                    );
                } else {
                    recordLogsByWeek.set(
                        dateOfFirstDayOfTheWeek,
                        recordLog.number
                    );
                }
            });

            recordLogsByWeek.forEach((value, key) => {
                const dateOfLastDayOfTheWeek = getDateOfLastDayOfTheWeek(key);
                const datesArray = getDatesArrayFromRange(
                    key,
                    dateOfLastDayOfTheWeek
                );
                if (value <= record.goal) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        recordsGoalStatus.CompletedDays.push(dateToAdd);
                    }
                } else if (value > record.goal) {
                    for (let i = 0; i < datesArray.length; i++) {
                        const dateArrayItem = datesArray[i];
                        const dateToAdd = new Date(
                            dateArrayItem.getFullYear(),
                            dateArrayItem.getMonth(),
                            dateArrayItem.getDate()
                        )
                            .toISOString()
                            .split("T")[0];
                        recordsGoalStatus.FailedDays.push(dateToAdd);
                    }
                }
            });
        } else {
            console.log("Error: Invalid record duration");
        }
    } else if (recordType === "CreateStockRecord") {
        recordLogs.forEach((recordLog) => {
            const dateInObj = new Date(recordLog.date);
            const dateToAdd = new Date(
                dateInObj.getFullYear(),
                dateInObj.getMonth(),
                dateInObj.getDate()
            )
                .toISOString()
                .split("T")[0];
            if (recordLog.isSuccess === "false") {
                recordsGoalStatus.FailedDays.push(dateToAdd);
            } else {
                recordsGoalStatus.CompletedDays.push(dateToAdd);
            }
        });
    } else {
        console.log("Error: recordType not found");
    }

    return recordsGoalStatus;
}

const getTotalDays = (startDate) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date();
    const totalDays = Math.ceil(
        (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)
    );
    return totalDays;
};

const calculatePieAngle = (total, condition) => {
    const angle = (condition / total) * 360;
    return angle;
};

export function getRecordStatusPieChartData(record, recordType, recordLogs) {
    const goalStatusDetails = getRecordsGoalStatus(record, recordType, recordLogs);

    let totalDays = getTotalDays(record.startDate);
    if (isNaN(totalDays)) {
        totalDays = 0;
    }

    let loggingSkippedDays =
        totalDays -
        (goalStatusDetails.CompletedDays.length +
            goalStatusDetails.FailedDays.length +
            goalStatusDetails.PartialCompletedDays.length);

    const goalStatusNumbers = {
        CompletedDays: goalStatusDetails.CompletedDays.length,
        FailedDays: goalStatusDetails.FailedDays.length,
        PartialCompletedDays: goalStatusDetails.PartialCompletedDays.length,
        TotalDays: totalDays,
        LoggingSkippedDays: loggingSkippedDays,
    };

    const goalStatusAngles = {
        CompletedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.CompletedDays
        ),
        FailedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.FailedDays
        ),
        PartialCompletedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.PartialCompletedDays
        ),
        LoggingSkippedDaysAngle: calculatePieAngle(
            goalStatusNumbers.TotalDays,
            goalStatusNumbers.LoggingSkippedDays
        ),
    };

    const degree1 = 0;
    const degree2 = degree1 + goalStatusAngles.CompletedDaysAngle;
    const degree3 = degree2 + goalStatusAngles.FailedDaysAngle;
    const degree4 = degree3 + goalStatusAngles.PartialCompletedDaysAngle;
    const degree5 = 360;

    const pieChartData = {
        degree1: degree1,
        degree2: degree2,
        degree3: degree3,
        degree4: degree4,
        degree5: degree5,
    };

    return pieChartData;
}
