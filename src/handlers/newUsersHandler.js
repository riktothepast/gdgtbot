'use strict';

const greetings = require('../../config/greeting.json');

function newUser(user) {
  let message = '';
  const greets = greetings.greets;
  let greet = greets[Math.floor(Math.random() * greets.length)];
  greet = greet.replace('@username', user.username);

  const info = greets.community.channelInfo;

  let channels = '';
  greets.community.channels.forEach(element => {
    channels += `${element.name}\n`;
  });

  message += `${greet}\n`;
  message += `${info}\n\n`;
  message += `${channels}\n`;

  message += `${greets.community.help}`;

  return message;
}

module.exports = newUser;
