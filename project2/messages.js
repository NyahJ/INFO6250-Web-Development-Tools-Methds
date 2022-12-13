const uuid = require('uuid').v4;

  const id1 = uuid();
  const id2 = uuid();

  const messageList = {
    [id1]: {
      id: id1,
      username: 'Jack',
      message: 'Hi guys, do you have plans for the incoming holiday?',
    },
    [id2]: {
      id: id2,
      username: 'Hailey',
      message: 'I do not have any plans, how about you?',
    },
  };

  function contains(id) {
    return !!messageList[id];
  };

  function getMessages() {
    return messageList;
  };

  function addMessage(message, username) {
    const id = uuid();
    messageList[id] = {
      id,
      username,
      message,
    };
    return id;
  };

  function getMessage(id) {
    return messageList[id];
  };

module.exports = {
  getMessages,
  addMessage,
  getMessage,
  contains,
};
