'use strict';

const responseHandler = require('./handlers/responseHandler')
const greetingsHandler = require('./handlers/newUsersHandler')


function discordBot(client, configuration) {
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
      const command = msg.content.split(' ')[1].toLowerCase();
      switch(command) {
        case 'help':

          break;
        case 'calendar': 
          break;
        
        default:
          responseHandler(msg);
          break;
      }
    }
  });
}

module.exports = discordBot;
