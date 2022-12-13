import { MESSAGES } from './constants';

const state = {
  messageList: {},
  onlineUsers: {},
  isLoggedIn: false,
  isLoginPending: true,
  isMessagePending: false,
  username: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messageList = {};
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.error = '';
}

export function setMessages(messageList) {
  state.messageList = messageList;
  state.isMessagePending = false;
  state.error = '';
}

export function setOnlineUsers(onlineUsers) {
  state.onlineUsers = onlineUsers;
  state.isMessagePending = false;
  state.error = '';
}

export function addMessage({ id, newMessage }) {
  state.messageList[id] = newMessage;
  state.error = '';
}

export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;