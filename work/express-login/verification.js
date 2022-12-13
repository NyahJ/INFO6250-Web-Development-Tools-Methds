module.exports = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;

    //login will fail for an empty username or the username "dog" or any username
    //that is not made up of letters or numbers only
    if (!username || username.length < 1 || username.toLowerCase() === "dog") {
        const error = "Username is invalid.";
        return [false, error];
    } else if (!regex.test(username)) {
        const error = "Username should contain ONLY letters or numbers.";
        return [false, error];
    } else {
        return [true, ""];
    }
};