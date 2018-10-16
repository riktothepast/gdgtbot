'use strict';

const responses = require('../../config/responses.json').phrases;

function handler(msg) {
  responses.forEach(response => {
    const message = msg.content.toString().toLowerCase();
    if (message.includes(`${response.message.toLowerCase()}`)) {
      msg.reply(response.response);
    }
  });
}

module.exports = handler;
