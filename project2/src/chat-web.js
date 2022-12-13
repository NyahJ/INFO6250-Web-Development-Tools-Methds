import { SERVER, CLIENT } from './constants';
import state, {
  login,
  logout,
  waitOnLogin,
  setMessages,
  setError,
  setOnlineUsers,
} from './state';
import {
  fetchLogin,
  fetchLogout,
  fetchSendMessage,
  fetchMessageList,
  fetchSession,
  fetchOnlineUsers,
} from './services';
import render from './render';
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToSendMessage,
} from './listeners';


// Main codes here
const appEl = document.querySelector('#app');
render({ state, appEl });
addAbilityToLogin({ state,  appEl });
addAbilityToLogout({ state, appEl });
addAbilityToSendMessage({ state, appEl });

checkForSession();
pollCheckForSession();

export function checkForSession() {
  fetchSession()
  .then( session => {
    login(session.username);
    render({ state, appEl });
    return fetchMessageList();
  })
  .catch( err => {
    if( err?.error === SERVER.AUTH_MISSING ) {
      return Promise.reject({ error: CLIENT.NO_SESSION })
    }
    return Promise.reject(err);
  })
  .then( messages => {
    setMessages(messages);
    render({ state, appEl });
    return fetchOnlineUsers();
  })
  .catch( err => {
    if( err?.error === SERVER.AUTH_MISSING ) {
      return Promise.reject({ error: CLIENT.NO_SESSION })
    }
    return Promise.reject(err);
  })
  .then( onlineUsers => {
    setOnlineUsers(onlineUsers);
    render({ state, appEl });
  })
  .catch( err => {
    if( err?.error == CLIENT.NO_SESSION ) {
      logout();
      render({ state, appEl });
      return;
    }

      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}

function pollCheckForSession() {
    checkForSession();
    setInterval( pollCheckForSession, 5000 );
}