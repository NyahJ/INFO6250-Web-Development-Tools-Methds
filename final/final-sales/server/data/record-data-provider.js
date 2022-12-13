const { v4: uuidv4 } = require("uuid");

const {
  readFromJson,
  writeToJson,
  checkIfFileExists,
  readFromCsv,
  appendToCsv,
  deleteFile,
} = require("./file-system-provider");

const {
  RecordType,
  CreateGeneralRecord,
  LimitEditionRecord,
  CreateStockRecord,
  CreateGeneralRecordLog,
  LimitEditionRecordLog,
  CreateStockRecordLog,
} = require("../models/record");

const User = require("../models/user");

const newCreateGeneralRecord = (
  userEmail,
  recordName,
  goal,
  unit,
  duration,
  startDate
) => {
  const createGeneralRecord = new CreateGeneralRecord(
    recordName,
    goal,
    unit,
    duration,
    startDate,
    userEmail
  );
  const createGeneralRecordJson = CreateGeneralRecord.toJson(createGeneralRecord);

  const recordId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.records[recordId] = {
    recordId: recordId,
    recordType: RecordType.CreateGeneralRecord,
    recordName: recordName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const createGeneralRecordFilePath = "./server/data/records/" + recordId + ".json";
  writeToJson(createGeneralRecordFilePath, createGeneralRecordJson);
  return recordId;
};

const newLimitEditionRecord = (
  userEmail,
  recordName,
  goal,
  unit,
  duration,
  startDate
) => {
  const limitBadRecord = new LimitEditionRecord(
    recordName,
    goal,
    unit,
    duration,
    startDate,
    userEmail
  );
  const limitBadRecordJson = LimitEditionRecord.toJson(limitBadRecord);

  const recordId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.records[recordId] = {
    recordId: recordId,
    recordType: RecordType.LimitEditionRecord,
    recordName: recordName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const limitBadRecordFilePath = "./server/data/records/" + recordId + ".json";
  writeToJson(limitBadRecordFilePath, limitBadRecordJson);
  return recordId;
};

const newCreateStockRecord = (userEmail, recordName, startDate) => {
  const quitBadRecord = new CreateStockRecord(recordName, startDate, userEmail);
  const quitBadRecordJson = CreateStockRecord.toJson(quitBadRecord);

  const recordId = uuidv4();
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  user.records[recordId] = {
    recordId: recordId,
    recordType: RecordType.CreateStockRecord,
    recordName: recordName,
  };
  writeToJson(userFilePath, User.toJson(user));

  const quitBadRecordFilePath = "./server/data/records/" + recordId + ".json";
  writeToJson(quitBadRecordFilePath, quitBadRecordJson);
  return recordId;
};

const deleteRecord = (userEmail, recordId) => {
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  delete user.records[recordId];
  writeToJson(userFilePath, User.toJson(user));

  const recordFilePath = "./server/data/records/" + recordId + ".json";
  if (checkIfFileExists(recordFilePath)) {
    deleteFile(recordFilePath);
  }

  const recordLogFilePath = "./server/data/recordlogs/" + recordId + ".csv";
  if (checkIfFileExists(recordLogFilePath)) {
    deleteFile(recordLogFilePath);
  }
};

const getRecord = (recordId, recordType, recordName) => {
  const recordFilePath = "./server/data/records/" + recordId + ".json";
  const recordJson = readFromJson(recordFilePath);

  switch (recordType) {
    case RecordType.CreateGeneralRecord:
      return CreateGeneralRecord.fromJson(recordJson);

    case RecordType.LimitEditionRecord:
      return LimitEditionRecord.fromJson(recordJson);

    case RecordType.CreateStockRecord:
      return CreateStockRecord.fromJson(recordJson);

    default:
      return null;
  }
};

const checkIfRecordLogExists = (recordId) => {
  const recordLogFilePath = "./server/data/recordlogs/" + recordId + ".csv";
  return checkIfFileExists(recordLogFilePath);
};

const getRecordLog = (recordId, recordType) => {
  const recordLogFilePath = "./server/data/recordlogs/" + recordId + ".csv";
  const recordLogCSV = readFromCsv(recordLogFilePath);
  const recordLog = [];
  switch (recordType) {
    case RecordType.CreateGeneralRecord:
      recordLogCSV.forEach((recordLogCSV) => {
        if (recordLogCSV.trim().length !== 0) {
          recordLog.push(CreateGeneralRecordLog.fromCsv(recordLogCSV));
        }
      });
      return recordLog;

    case RecordType.LimitEditionRecord:
      recordLogCSV.forEach((recordLogCSV) => {
        if (recordLogCSV.trim().length !== 0) {
          recordLog.push(LimitEditionRecordLog.fromCsv(recordLogCSV));
        }
      });
      return recordLog;

    case RecordType.CreateStockRecord:
      recordLogCSV.forEach((recordLogCSV) => {
        if (recordLogCSV.trim().length !== 0) {
          recordLog.push(CreateStockRecordLog.fromCsv(recordLogCSV));
        }
      });
      return recordLog;

    default:
      return null;
  }
};

const addRecordLog = (recordId, recordLog) => {
  const recordLogFilePath = "./server/data/recordlogs/" + recordId + ".csv";
  appendToCsv(recordLogFilePath, recordLog + "\r\n");
};

const addGeneralRecordLog = (recordId, number, unit, date) => {
  const recordLog = new CreateGeneralRecordLog(number, unit, date);
  const recordLogCSV = CreateGeneralRecordLog.toCsv(recordLog);
  addRecordLog(recordId, recordLogCSV);
};

const addLimitEditionRecordLog = (recordId, number, unit, date) => {
  const recordLog = new LimitEditionRecordLog(number, unit, date);
  const recordLogCSV = LimitEditionRecordLog.toCsv(recordLog);
  addRecordLog(recordId, recordLogCSV);
};

const addCreateStockRecordLog = (recordId, isSuccess, date) => {
  const recordLog = new CreateStockRecordLog(isSuccess, date);
  const recordLogCSV = CreateStockRecordLog.toCsv(recordLog);
  addRecordLog(recordId, recordLogCSV);
};

const deleteAllRecords = (userEmail) => {
  const userFilePath = "./server/data/users/" + userEmail + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  const recordIds = Object.keys(user.records);
  recordIds.forEach((recordId) => {
    deleteRecord(userEmail, recordId);
  });

  user.records = {};
  writeToJson(userFilePath, User.toJson(user));
};

module.exports = {
  newCreateGeneralRecord,
  newLimitEditionRecord,
  newCreateStockRecord,
  deleteRecord,
  getRecord,
  getRecordLog,
  addGeneralRecordLog,
  addLimitEditionRecordLog,
  addCreateStockRecordLog,
  deleteAllRecords,
  checkIfRecordLogExists,
};
