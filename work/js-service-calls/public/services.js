/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
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

(function () {
  var MESSAGES = {
    networkError: "Failed to connect to the network, please try again!",
    "default": "Something went wrong, please try again!",
    "auth-insufficient": "Dog is not allowed in username",
    "required-username": "Invalid username: empty or not alphanumeric"
  };
  checkSession();
  function checkSession() {
    fetchSession().then(function (user) {
      targetUser = user.username;
      fetchWord().then(function (word) {
        var storedWord = word.storedWord;
        if (storedWord === '') {
          targetWord = "Ops, no word is stored";
        } else {
          targetWord = storedWord;
        }
        renderMain();
      })["catch"](function (error) {
        renderStatus(error);
      });
    })["catch"](function () {
      return renderLogin();
    });
  }
  function fetchSession() {
    return fetch('/api/session', {
      method: "GET"
    })["catch"](function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }
  function fetchWord() {
    return fetch("/api/word")["catch"](function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }
  function addAbilityToLogin() {
    var buttonEl = document.querySelector(".login-button");
    var usernameEl = document.querySelector(".login-username");
    buttonEl.addEventListener("click", function (e) {
      var username = usernameEl.value;
      fetchLogin(username).then(checkSession)["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }
  function addAbilityToLogout() {
    var buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", function (e) {
      targetWord = undefined;
      fetchLogout().then(function () {
        renderLogin();
      })["catch"]();
    });
  }
  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE"
    })["catch"](function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }
  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({
        username: username
      })
    })["catch"](function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return;
      }
      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }
  function addAbilityToUpdateWord() {
    var contentEl = document.querySelector(".update-content");
    var updateEl = document.querySelector(".update-button");
    updateEl.addEventListener("click", function (e) {
      var word = contentEl.value;
      fetchUpdateWord(word).then(checkSession)["catch"](function (error) {
        return renderStatus(error);
      });
    });
  }
  function updateWordInMain() {
    var wordEl = document.querySelector(".update-button");
    wordEl.innerHTML = targetWord;
  }
  function fetchUpdateWord(word) {
    return fetch("/api/word", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({
        word: word
      })
    })["catch"](function () {
      return Promise.reject({
        error: "networkError"
      });
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return response.json()["catch"](function (error) {
        return Promise.reject({
          error: error
        });
      }).then(function (err) {
        return Promise.reject(err);
      });
    });
  }

  //functions for rendering
  function renderLogin() {
    var loginEl = document.querySelector(".container");
    loginEl.innerHTML = "\n      <div class=\"title\">\n        <h1>Login</h1>\n        <form>\n            <input class=\"login-username\" type=\"text\" placeholder=\"username\">\n            <button class=\"login-button\">Login</button>\n            <div class=\"status\"></div>\n        </form>\n\n      </div>\n    ";
    addAbilityToLogin();
  }
  function renderStatus(message) {
    var statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    var key = message !== null && message !== void 0 && message.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES["default"];
  }
  function renderMain() {
    var mainEl = document.querySelector(".container");
    mainEl.innerHTML = "\n      <div class=\"title\">\n        <h1>Welcome ".concat(targetUser, "</h1>\n        <span class=\"current-word\">Word Stored: </span>\n        <div class=\"word\">\n          <span class=\"target-word\">").concat(targetWord, "</span>\n        </div>\n        <form class=\"word\">\n            <label>Update your word: </label>\n            <input class=\"update-content\" type=\"text\" placeholder=\"Your new word\" required>\n            <button class=\"update-button\">Update</button>\n          </div>\n          <button class=\"logout\">Logout</button>\n        </form>\n      </div>\n\n    ");
    addAbilityToUpdateWord();
    addAbilityToLogout();
  }
})();
/******/ })()
;
//# sourceMappingURL=services.js.map