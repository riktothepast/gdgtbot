'use strict';

function discordBot(client, configuration) {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', msg => {
    if (msg.content.split(' ')[0] === configuration.prefix) {
      configuration.responses.forEach(response => {
        const message = msg.content.toString().toLowerCase();
        if (message.includes(`${response.message.toLowerCase()}`)) {
          msg.reply(response.response);
        }
      });
    }
  });
}

module.exports = discordBot;
