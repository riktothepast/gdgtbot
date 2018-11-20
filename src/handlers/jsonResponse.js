'use strict';

function handler(response, msg) {
  msg.reply({
    embed: response,
  });
}

module.exports = handler;
