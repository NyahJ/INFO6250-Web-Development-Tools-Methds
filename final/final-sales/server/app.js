module.exports = (userData, recordData, sessions, userToSessionsMap) => {
  const express = require("express");
  const logger = require("morgan");
  // const cors = require("cors");
  const userRoutes = require("./routes/userroutes")(
    userData,
    sessions,
    userToSessionsMap
  );
  const recordRoutes = require("./routes/recordRoutes")(
    userData,
    recordData,
    sessions
  );

  const app = express();
  const cookieParser = require("cookie-parser");
  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     methods: ["GET", "POST", "PUT", "DELETE"],
  //     credentials: true,
  //   })
  // );

  app.use(logger("dev"));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(__dirname + "/../build"));

  app.use("/v1/user", userRoutes);
  app.use("/v1/user/records", recordRoutes);
  return app;
};
