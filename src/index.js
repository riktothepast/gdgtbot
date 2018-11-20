'use strict';

const responseHandler = require('./handlers/responseHandler');
const greetingsHandler = require('./handlers/newUsersHandler');
const jsonResponse = require('./handlers/jsonResponse');
const eventsHanderFactory = require('./handlers/calendar');

const helpResponse = require('../config/help.json');

function discordBot(client, configuration) {
  const eventHandler = eventsHanderFactory(configuration);
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('guildMemberAdd', user => {
    const channel = user.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) {
      return;
    }

    channel.send(greetingsHandler(user));
  });

  client.on('message', msg => {
    if (msg.content.startsWith(configuration.prefix)) {
      const command = msg.content.split(configuration.prefix)[1].toLowerCase();
      switch (command) {
        case 'help':
          jsonResponse(helpResponse, msg);
          break;
        case 'event':
          eventHandler(msg);
          break;
        default:
          responseHandler(msg);
          break;
      }
    }
  });
}

module.exports = discordBot;
