const RecordType = Object.freeze({
    CreateGeneralRecord: 0,
    LimitEditionRecord: 1,
    CreateStockRecord: 2,
});

//const ProductType = Object.freeze({
//    AddNewProduct: 0,
//    LimitEditionRecord: 1,
//    DeleteProduct: 2,
//});

const getRecordTypeName = (recordType) => {
    switch (recordType) {
        case RecordType.CreateGeneralRecord:
            return "CreateGeneralRecord";
        case RecordType.LimitEditionRecord:
            return "LimitEditionRecord";
        case RecordType.CreateStockRecord:
            return "CreateStockRecord";
        default:
            return null;
    }
};

class CreateGeneralRecord {
    constructor(name, goal, unit, duration, startDate, userEmail) {
        this.name = name;
        this.goal = goal;
        this.unit = unit;
        this.duration = duration;
        this.startDate = startDate;
        this.userEmail = userEmail;
    }

    static fromJson(json) {
        const jsonObj = JSON.parse(json);
        return new CreateGeneralRecord(
            jsonObj.name,
            jsonObj.goal,
            jsonObj.unit,
            jsonObj.duration,
            jsonObj.startDate,
            jsonObj.userEmail
        );
    }

    static toJson(createGeneralRecord) {
        return JSON.stringify(createGeneralRecord);
    }
}

class LimitEditionRecord {
    constructor(name, goal, unit, duration, startDate, userEmail) {
        this.name = name;
        this.goal = goal;
        this.unit = unit;
        this.duration = duration;
        this.startDate = startDate;
        this.userEmail = userEmail;
    }

    static fromJson(json) {
        const jsonObj = JSON.parse(json);
        return new LimitEditionRecord(
            jsonObj.name,
            jsonObj.goal,
            jsonObj.unit,
            jsonObj.duration,
            jsonObj.startDate,
            jsonObj.userEmail
        );
    }

    static toJson(limitBadRecord) {
        return JSON.stringify(limitBadRecord);
    }
}

class CreateStockRecord {
    constructor(name, startDate, userEmail) {
        this.name = name;
        this.startDate = startDate;
        this.userEmail = userEmail;
    }

    static fromJson(json) {
        const jsonObj = JSON.parse(json);
        return new CreateStockRecord(
            jsonObj.name,
            jsonObj.startDate,
            jsonObj.userEmail
        );
    }

    static toJson(quitBadRecord) {
        return JSON.stringify(quitBadRecord);
    }
}

class CreateGeneralRecordLog {
    constructor(number, unit, date) {
        this.number = number;
        this.unit = unit;
        this.date = date;
    }

    static fromCsv(csv) {
        const csvObj = csv.split(",");
        return new CreateGeneralRecordLog(
            parseInt(csvObj[0]),
            csvObj[1],
            csvObj[2]
        );
    }

    static toCsv(createGeneralRecordLog) {
        return (
            createGeneralRecordLog.number +
            "," +
            createGeneralRecordLog.unit +
            "," +
            createGeneralRecordLog.date
        );
    }
}

class LimitEditionRecordLog {
    constructor(number, unit, date) {
        this.number = number;
        this.unit = unit;
        this.date = date;
    }

    static fromCsv(csv) {
        const csvObj = csv.split(",");
        return new LimitEditionRecordLog(parseInt(csvObj[0]), csvObj[1], csvObj[2]);
    }

    static toCsv(limitBadRecordLog) {
        return (
            limitBadRecordLog.number +
            "," +
            limitBadRecordLog.unit +
            "," +
            limitBadRecordLog.date
        );
    }
}

class CreateStockRecordLog {
    constructor(isSuccess, date) {
        this.isSuccess = isSuccess;
        this.date = date;
    }

    static fromCsv(csv) {
        const csvObj = csv.split(",");
        return new CreateStockRecordLog(csvObj[0], csvObj[1]);
    }

    static toCsv(quitBadRecordLog) {
        return quitBadRecordLog.isSuccess + "," + quitBadRecordLog.date;
    }
}

module.exports = {
    RecordType,
    CreateGeneralRecord,
    LimitEditionRecord,
    CreateStockRecord,
    CreateGeneralRecordLog,
    LimitEditionRecordLog,
    CreateStockRecordLog,
    getRecordTypeName,
};
