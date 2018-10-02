'use strict';

const greetings = require('../../config/greeting.json');

function newUser(user) {
  const greets = greetings.greets;
  let message = greets[Math.floor(Math.random()*greets.length)];
  message = message.replace('@username', user.username);

  const info = greets.community.channelInfo;

  const channels = greets.channels;
  
  return msg;
}

module.exports = newUser;
