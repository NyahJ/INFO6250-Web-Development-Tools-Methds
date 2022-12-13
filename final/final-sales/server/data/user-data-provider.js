const {
  readFromJson,
  writeToJson,
  checkIfFileExists,
  deleteFile,
} = require("./file-system-provider");
const User = require("../models/user");

const { getRecordTypeName } = require("../models/record");

const createNewUser = (email, password, firstName, lastName) => {
  const user = new User(
    email,
    password,
    firstName,
    lastName,
    new Date(),
    new Date(),
    {}
  );
  const userFilePath = "./server/data/users/" + email + ".json";
  writeToJson(userFilePath, User.toJson(user));
};

const getUser = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  if (checkIfFileExists(userFilePath)) {
    const userJson = readFromJson(userFilePath);
    return User.fromJson(userJson);
  } else {
    return null;
  }
};

const deleteUser = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  if (checkIfFileExists(userFilePath)) {
    deleteFile(userFilePath);
  }
};

const updateUser = (user) => {
  user.updatedAt = new Date();
  const userFilePath = "./server/data/users/" + user.email + ".json";
  writeToJson(userFilePath, User.toJson(user));
};

const checkIfUserExists = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  return checkIfFileExists(userFilePath);
};

const checkIfUserHasRecord = (email, recordId) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  return user.records[recordId] !== undefined;
};

const getUserRecordType = (email, recordId) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  return user.records[recordId].recordType;
};

const getUserRecords = (email) => {
  const userFilePath = "./server/data/users/" + email + ".json";
  const user = User.fromJson(readFromJson(userFilePath));
  let userRecords = {};
  for (const recordId in user.records) {
    const recordTypeName = getRecordTypeName(user.records[recordId].recordType);
    const recordName = user.records[recordId].recordName;
    userRecords[recordId] = {
      recordId: recordId,
      recordType: recordTypeName,
      recordName: recordName,
    };
  }

  return userRecords;
};

module.exports = {
  createNewUser,
  checkIfUserExists,
  getUser,
  deleteUser,
  updateUser,
  checkIfUserHasRecord,
  getUserRecordType,
  getUserRecords,
};
