const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const verifyUserName = require("./verification");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use(cookieParser());

//To store the session ids associated with the usernames
const sessions = {};
//To store the words based on the usernames
const words = {};

//Enable user to add new words
app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  let html;
  if (sid && sessions[sid]) {
    const username = sessions[sid].username;
    const word = words[username] ? words[username].word : "";
    const htmlForm = `<link rel="stylesheet" href="/styles.css" />
    <form method="POST" action="/">
    <label>Add Your Word : </label>
     <input type="text" name="word" placeholder="Enter a word">
    <button type="submit">Confirm</button>
  </form>
  <form method="POST" action="/logout" class="logout-form">
    <button type="submit">Logout</button>
  </form>`;
    let html;
    if (!word) {
      html = `<h2>Welcome ${username}!</h2>` + htmlForm;
    } else {
      sessions[sid].word = word;
      html =
        `<h2>Welcome ${username}!</h2>` +
        `<h2>Your stored word is <span>${word}<span> </h2>.` +
        htmlForm;
    }
    res.send(html);
  } else {
    html = `<link rel="stylesheet" href="/styles.css" />
    <h2>Please Login</h2>
    <form method="POST" action="/login">
    <label>Username : </label><input type="text" name="username">
      <button type="submit">Login</button>
    </form>`;
  }
  res.send(html);
});

// Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const sid = uuidv4();
  const [isValid, errorMessage] = verifyUserName(username);
  if (!isValid) {
    const invalidUserNameHtml = `<link rel="stylesheet" href="/styles.css" />
    <h2>Opps! ${errorMessage}</h2>
    <h3>Please Try Again.</h3>
    <form method="GET" action="/">
    <button type="submit">Login</button>
    </form>`;
    res.status(401).send(invalidUserNameHtml);
    return;
  }
  sessions[sid] = { username };
  res.cookie("sid", sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res.redirect("/");
});

// Add word to the words object under the username
app.post("/", (req, res) => {
  const sid = req.cookies.sid;
  const word = req.body.word;
  words[sessions[sid].username] = { word };
  res.redirect("/");
});

// Logout
app.post("/logout", (req, res) => {
  const sid = req.cookies.sid;
  delete sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});