const verify = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (!username || username.length < 1
        || username.toString().toLowerCase() === "dog"
        || !regex.test(username))
        {
            return false;
        } else {
            return true;
        }
}

export default verify;