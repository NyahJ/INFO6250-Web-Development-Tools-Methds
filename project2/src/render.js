function render({ state, appEl }) {
  const html = `
   <main class="">
     ${ generateStatusHtml( state ) }
     ${ generateLoginHtml( state ) }
     ${ generateContentHtml( state ) }
   </main>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml( state ) {
  return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml( state ) {
  if(state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `
  }
  if(state.isLoggedIn) {
    return ``;
  }

  return `
      <div class="login">
        <form class="login-form" action="#/login">
          <label>
            <h3 class="word">Username:</h3>
            <input class="login-username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml( state ) {
  if(!state.isLoggedIn) {
    return ``;
  }
  if(state.isLoginPending) {
    return `
      <div class="content">
        ${generateControlsHtml( state )}
        <div class="todos__waiting">Loading Messages...</div>
      </div>
    `;
  }
  return `
      <div class="content">
        ${generateControlsHtml( state )}
        <h4> Online Users </h4>
        ${generateOnlineUsersHtml( state )}
        <HR align=center width=600 color=#987cb9 SIZE=2>
        <h4> Messages </h4>
        <ul class="message">${generateMessageHtml( state )}</ul>
        ${generateSendMessageHtml( state )}
      </div>
  `;
}

function generateControlsHtml( state ) {
  return `
        <div class="controls">
          <button class="controls__logout">Logout</button>
        </div>
  `;
}

function generateMessageHtml( state ) {
  const messageHtml = Object.values(state.messageList).map( message => {
    return `
      <li class="message">
        <span>${message.username}:</span>
          ${message.message}
      </li>
      `;
  }).join('') || `<p class="message">No message, add one!</p>`;
  return messageHtml;
}

function generateOnlineUsersHtml( state ) {
  const onlineUsersHtml = Object.values(state.onlineUsers).map( onlineUser => {
    return `
      <li class="message">
        <span>${onlineUser.username}</span>
      </li>
      `;
  }).join('') || `<p class="message">Nobody</p>`;
  return onlineUsersHtml;
}

function generateSendMessageHtml( state ) {
  return `
        <form class="add-form" action="#/add">
          <input username="${state.username}" class="send-message" placeholder="Type here">
          <button type="submit" class="send-button">Send</button>
        </form>
  `;
}

export default render;