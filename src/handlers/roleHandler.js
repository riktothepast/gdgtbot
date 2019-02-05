'use strict';

const helpResponse = require('../../config/roles.json');
const configuration = require('../../config/defaults.json');

function list(msg) {
  let roles = '';
  msg.guild.roles.forEach(role => {
    if (!configuration.forbiddenRoles.find(rol => rol === role.name)) {
      roles += `${role.name}\n`;
    }
  });

  msg.reply(`Los roles disponibles son:\n${roles}`);
}

function help(msg) {
  msg.reply({
    embed: helpResponse,
  });
}

function add(msg, role) {
  if (configuration.forbiddenRoles.find(rol => rol.toLowerCase() === role.toLowerCase())) {
    msg.reply('Has invocado un comando prohibido, no puedo agregar ese rol.');
    return;
  }
  const gRole = msg.guild.roles.find(guildRole => guildRole.name.toLowerCase() === role);

  msg.member.addRole(gRole)
    .then(() => {
      msg.reply(`has sido agregado al rol: ${gRole.name}`);
    })
    .catch((error) => {
      console.log(error);
      msg.reply(error);
    });
}

function remove(msg, role) {
  const gRole = msg.guild.roles.find(guildRole => guildRole.name.toLowerCase() === role);
  msg.member.removeRole(gRole)
    .then(() => {
      msg.reply(`El rol ${gRole.name}, ha sido removido.`);
    })
    .catch((error) => {
      console.log(error);
      msg.reply(error);
    });
}

function handler(msg, parameters) {
  switch (parameters[1].toLowerCase()) {
    case 'help':
      help(msg);
      break;
    case 'list':
      list(msg);
      break;
    case 'add':
      add(msg, parameters[2]);
      break;
    case 'remove':
      remove(msg, parameters[2]);
      break;
    default:
      break;
  }
}

module.exports = handler;
