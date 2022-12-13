// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

(function() {

  const MESSAGES = {
    networkError: "Failed to connect to the network, please try again!",
    default: "Something went wrong, please try again!",
    "auth-insufficient": "Dog is not allowed in username",
    "required-username": "Invalid username: empty or not alphanumeric",
  };

  checkSession();

  function checkSession() {
      fetchSession()
      .then((user) => {
        targetUser = user.username;
        fetchWord()
          .then((word) => {
            const storedWord = word.storedWord;
              if (storedWord === '') {
                targetWord = "Ops, no word is stored";
              } else {
                targetWord = storedWord;
              }
            renderMain();
          })
          .catch((error) => {
            renderStatus(error);
          });
      })
      .catch(() => renderLogin());
  }

  function fetchSession() {
    return fetch('/api/session', {
      method: "GET",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchWord() {
    return fetch("/api/word")
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login-button");
    const usernameEl = document.querySelector(".login-username");
    buttonEl.addEventListener("click", (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
        .then(checkSession)
        .catch((error) => renderStatus(error));
    });
  }


  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      targetWord = undefined;
      fetchLogout()
        .then(() => {
          renderLogin();
        })
        .catch();
    });
  }

  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return;
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function addAbilityToUpdateWord() {
    const contentEl = document.querySelector(".update-content");
    const updateEl = document.querySelector(".update-button");
    updateEl.addEventListener("click", (e) => {
      const word = contentEl.value;
      fetchUpdateWord(word)
        .then(checkSession)
        .catch((error) => renderStatus(error));
    });
  }

  function updateWordInMain() {
    const wordEl = document.querySelector(".update-button");
    wordEl.innerHTML = targetWord;
  }

  function fetchUpdateWord(word) {
    return fetch("/api/word", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ word }),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }


  //functions for rendering
  function renderLogin() {
    const loginEl = document.querySelector(".container");
    loginEl.innerHTML = `
      <div class="title">
        <h1>Login</h1>
        <form>
            <input class="login-username" type="text" placeholder="username">
            <button class="login-button">Login</button>
            <div class="status"></div>
        </form>

      </div>
    `;

    addAbilityToLogin();
  }

  function renderStatus(message) {
    const statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

  function renderMain() {
    const mainEl = document.querySelector(".container");
    mainEl.innerHTML = `
      <div class="title">
        <h1>Welcome ${targetUser}</h1>
        <span class="current-word">Word Stored: </span>
        <div class="word">
          <span class="target-word">${targetWord}</span>
        </div>
        <form class="word">
            <label>Update your word: </label>
            <input class="update-content" type="text" placeholder="Your new word" required>
            <button class="update-button">Update</button>
          </div>
          <button class="logout">Logout</button>
        </form>
      </div>

    `;
    addAbilityToUpdateWord();
    addAbilityToLogout();
  }


})();


