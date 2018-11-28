'use strict';

const responseHandler = require('./handlers/responseHandler');
const greetingsHandler = require('./handlers/newUsersHandler');
const jsonResponse = require('./handlers/jsonResponse');
const eventsHanderFactory = require('./handlers/calendar');

const helpResponse = require('../config/help.json');

const logo = 
' ██████╗ ██████╗  ██████╗████████╗    ██████╗  ██████╗ ████████╗\n' +
'██╔════╝ ██╔══██╗██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗╚══██╔══╝\n' +
'██║  ███╗██║  ██║██║  ███╗  ██║       ██████╔╝██║   ██║   ██║   \n' +
'██║   ██║██║  ██║██║   ██║  ██║       ██╔══██╗██║   ██║   ██║   \n' +
'╚██████╔╝██████╔╝╚██████╔╝  ██║       ██████╔╝╚██████╔╝   ██║   \n' +
' ╚═════╝ ╚═════╝  ╚═════╝   ╚═╝       ╚═════╝  ╚═════╝    ╚═╝';

function splitter(message) {
  return message.toLowerCase().split(' ');
}

function discordBot(client, configuration) {
  const eventHandler = eventsHanderFactory(configuration);
  client.on('ready', () => {
    console.log(logo);
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
      const splittedMessage = splitter(msg.content.replace(configuration.prefix, ''));
      const command = splittedMessage[0];

      switch (command) {
        case 'help':
          jsonResponse(helpResponse, msg);
          break;
        case 'article':
          msg.reply("Aun no estoy listo para mostrarte articulos, porfavor prueba en la siguiente version :D");
          break;
        case 'calendar':
          eventHandler(msg, splittedMessage);
          break;
        default:
          responseHandler(msg);
          break;
      }
    }
  });
}

module.exports = discordBot;
