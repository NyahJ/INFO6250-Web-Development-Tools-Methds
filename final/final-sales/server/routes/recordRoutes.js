module.exports = (userData, recordData, sessions) => {
    const express = require("express");
    const recordRouter = express.Router();
    const { v4: uuidv4 } = require("uuid");
    const authenticateUser = require("../middlewares/authenticateUser")(
        userData,
        sessions
    );

    const {
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
    } = recordData;

    const { checkIfUserHasRecord, getUserRecordType, getUserRecords } = userData;

    const { RecordType } = require("../models/record");

    recordRouter.post("/", authenticateUser, (req, res) => {
        // validate request
        if (!req.body.recordName) {
            return res.status(400).json({ message: "recordName is required" });
        }

        if (!req.body.recordType) {
            return res.status(400).json({ message: "recordType is required" });
        }

        if (
            req.body.recordType === "CreateGeneralRecord" ||
            req.body.recordType === "LimitEditionRecord"
        ) {
            if (!req.body.goal) {
                return res.status(400).json({ message: "goal is required" });
            }

            if (!req.body.unit) {
                return res.status(400).json({ message: "unit is required" });
            }

            if (!req.body.duration) {
                return res
                    .status(400)
                    .json({ message: "duration is required" });
            }
        }

        if (!req.body.startDate) {
            return res.status(400).json({ message: "startDate is required" });
        }

        // create record
        const { recordName, goal, unit, duration, startDate } = req.body;
        const userEmail = req.user.email;

        let recordId;

        switch (req.body.recordType) {
            case "CreateGeneralRecord":
                recordId = newCreateGeneralRecord(
                    userEmail,
                    recordName,
                    goal,
                    unit,
                    duration,
                    startDate
                );
                break;

            case "LimitEditionRecord":
                recordId = newLimitEditionRecord(
                    userEmail,
                    recordName,
                    goal,
                    unit,
                    duration,
                    startDate
                );
                break;

            case "CreateStockRecord":
                recordId = newCreateStockRecord(userEmail, recordName, startDate);
                break;

            default:
                return res.status(400).json({ message: "invalid recordType" });
        }

        // return record id with 201
        return res.status(201).json({ recordId: recordId });
    });

    recordRouter.delete("/:recordId", authenticateUser, (req, res) => {
        const recordId = req.params.recordId;
        const userEmail = req.user.email;
        deleteRecord(userEmail, recordId);
        res.sendStatus(204);
    });

    recordRouter.get("/:recordId", authenticateUser, (req, res) => {
        const recordId = req.params.recordId;
        const userEmail = req.user.email;
        if (!checkIfUserHasRecord(userEmail, recordId)) {
            return res.status(404).json({ message: "record not found" });
        }

        const recordType = getUserRecordType(userEmail, recordId);
        const record = getRecord(recordId, recordType);
        res.status(200).json(record);
    });

    recordRouter.get("/:recordId/log", authenticateUser, (req, res) => {
        const recordId = req.params.recordId;
        const userEmail = req.user.email;

        if (!checkIfUserHasRecord(userEmail, recordId)) {
            return res.status(404).json({ message: "Record not found" });
        }

        if (!checkIfRecordLogExists(recordId)) {
            return res
                .status(404)
                .json({ message: "Record log does not exist for this record" });
        }

        const recordType = getUserRecordType(userEmail, recordId);

        const recordLog = getRecordLog(recordId, recordType);
        res.status(200).json(recordLog);
    });

    recordRouter.post("/:recordId/log", authenticateUser, (req, res) => {
        const recordId = req.params.recordId;
        const userEmail = req.user.email;

        const recordType = getUserRecordType(userEmail, recordId);

        if (
            recordType === RecordType.CreateGeneralRecord ||
            recordType === RecordType.LimitEditionRecord
        ) {
            if (!req.body.number) {
                return res.status(400).json({ message: "number is required" });
            }

            if (!req.body.unit) {
                return res.status(400).json({ message: "unit is required" });
            }
        } else if (recordType === RecordType.CreateStockRecord) {
            if (req.body.isSuccess == null) {
                return res
                    .status(400)
                    .json({ message: "isSuccess is required" });
            }
        }

        if (!req.body.date) {
            return res.status(400).json({ message: "date is required" });
        }

        if (!checkIfUserHasRecord(userEmail, recordId)) {
            return res.status(404).json({ message: "Record not found" });
        }

        switch (recordType) {
            case RecordType.CreateGeneralRecord:
                addGeneralRecordLog(
                    recordId,
                    req.body.number,
                    req.body.unit,
                    req.body.date
                );
                break;
            case RecordType.LimitEditionRecord:
                addLimitEditionRecordLog(
                    recordId,
                    req.body.number,
                    req.body.unit,
                    req.body.date
                );
                break;
            case RecordType.CreateStockRecord:
                addCreateStockRecordLog(recordId, req.body.isSuccess, req.body.date);
                break;
            default:
                return res.status(400).json({ message: "invalid recordType" });
        }

        res.sendStatus(201);
    });

    recordRouter.get("/", authenticateUser, (req, res) => {
        const userEmail = req.user.email;
        const records = getUserRecords(userEmail);
        res.status(200).json(records);
    });

    // Delete all records
    recordRouter.delete("/", authenticateUser, (req, res) => {
        const userEmail = req.user.email;
        deleteAllRecords(userEmail);
        res.sendStatus(204);
    });

    return recordRouter;
};
