import {
  fetchLogin,
  fetchLogout,
  fetchSendMessage,
  fetchMessageList,
  fetchSession,
} from './services';

import {
  waitOnLogin,
  setError,
  login,
  logout,
  addMessage,
  setMessages,
  setOnlineUsers,
} from './state';

import {
    checkForSession,
} from './chat-web'

import render from './render';

export function addAbilityToLogin({ state,  appEl }) {
  appEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('login-form')) {
      return;
    }

    const username = appEl.querySelector('.login-username').value;
    waitOnLogin();
    render({ state, appEl });
    fetchLogin( username )
    .then( username => {
      checkForSession();
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });

  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('controls__logout')) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
  });
}

export function addAbilityToSendMessage({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('add-form')) {
      return;
    }

    const username = e.target.username;
    const newMessage = appEl.querySelector('.send-message').value;
    fetchSendMessage(newMessage)
    .then( message => {
      checkForSession();
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
  });
}
