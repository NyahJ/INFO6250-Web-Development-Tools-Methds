export const fetchCreateNewGeneralRecord = async (
  recordName,
  goal,
  unit,
  duration,
  startDate
) => {
  try {
    const recordType = "CreateGeneralRecord";
    const response = await fetch("/v1/user/records", {
      method: "POST",
      body: JSON.stringify({
        recordName,
        recordType,
        goal,
        unit,
        duration,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "recordName is required":
        throw new Error("RecordName is required");

      case "goal is required":
        throw new Error("Goal is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "duration is required":
        throw new Error("Duration is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong, please try again");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchLimitNewBadRecord = async (
  recordName,
  goal,
  unit,
  duration,
  startDate
) => {
  try {
    const recordType = "LimitEditionRecord";
    const response = await fetch("/v1/user/records", {
      method: "POST",
      body: JSON.stringify({
        recordName,
        recordType,
        goal,
        unit,
        duration,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "recordName is required":
        throw new Error("RecordName is required");

      case "goal is required":
        throw new Error("Goal is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "duration is required":
        throw new Error("Duration is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchQuitNewBadRecord = async (recordName, startDate) => {
  try {
    const recordType = "CreateStockRecord";
    const response = await fetch("/v1/user/records", {
      method: "POST",
      body: JSON.stringify({
        recordName,
        recordType,
        startDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 201) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");
      case "recordName is required":
        throw new Error("RecordName is required");

      case "startDate is required":
        throw new Error("StartDate is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetAllRecords = async () => {
  try {
    const response = await fetch("/v1/user/records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();

    if (response.status === 200) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchDeleteSingleRecord = async (recordId) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 204) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetSingleRecord = async (recordId) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }

    console.log(responseJson);
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Record not found":
        throw new Error("Record not found");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostCreateGeneralRecordLog = async (
  recordId,
  number,
  unit,
  date
) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}/log`, {
      method: "POST",
      body: JSON.stringify({
        number,
        unit,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Record not found":
        throw new Error("Selected record not found");

      case "number is required":
        throw new Error("Number is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostLimitEditionRecordLog = async (
  recordId,
  number,
  unit,
  date
) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}/log`, {
      method: "POST",
      body: JSON.stringify({
        number,
        unit,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Record not found":
        throw new Error("Selected record not found");

      case "number is required":
        throw new Error("Number is required");

      case "unit is required":
        throw new Error("Unit is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchPostCreateStockRecordLog = async (recordId, isSuccess, date) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}/log`, {
      method: "POST",
      body: JSON.stringify({
        isSuccess,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 201) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");

      case "Unauthorized":
        throw new Error("You have not logged in, please login");

      case "Record not found":
        throw new Error("Selected record not found");

      case "isSuccess is required is required":
        throw new Error("isSuccess is required");

      case "date is required":
        throw new Error("Date is required");

      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchGetLogsOfARecord = async (recordId) => {
  try {
    const response = await fetch(`/v1/user/records/${recordId}/log`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    }

    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");
      case "Unauthorized":
        throw new Error("You have not logged in, please login");
      case "Record not found":
        throw new Error("Selected record not found");
      case "Record log does not exist for this record":
        console.log("Record log does not exist for this record");
        return [];
      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchDeleteAllRecords = async () => {
  try {
    const response = await fetch("/v1/user/records", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 500) {
      throw new Error("Internal server error");
    }

    if (response.status === 204) {
      return;
    }

    const responseJson = await response.json();
    switch (responseJson.message) {
      case "SessionExpired":
        throw new Error("Your login session has expired, please login again");
      case "Unauthorized":
        throw new Error("You have not logged in, please login");
      default:
        throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
