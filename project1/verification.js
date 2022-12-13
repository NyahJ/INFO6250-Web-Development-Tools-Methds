const { invalidUserNameHtml } = require("./html-page");

const verifyUsername = (req, res, next) => {
  // regex for letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;
  const { username } = req.body;
  if (!username || username.length < 1 || username.toLowerCase() === "dog") {
    res.send(invalidUserNameHtml("Ops! Your username is invalid"));
  } else if (!regex.test(username)) {
    res.send(
      invalidUserNameHtml( "Ops! Username should contain ONLY letters or numbers." )
    );
  } else {
    next();
  }
};

module.exports = { verifyUsername };