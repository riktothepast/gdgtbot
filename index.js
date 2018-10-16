'use strict';

const Discord = require('discord.js');
const config = require('./config/defaults.json');
const key = require('./config/key.json');
const responses = require('./config/responses.json');
const client = new Discord.Client();
const handler = require('./src');

client.login(config.token);

const googleCalendar = Object.assign({}, config.googleCalendar);
googleCalendar.key = key;

const configuration = {
  googleCalendar,
  responses,
  prefix: config.prefix,
};

handler(client, configuration);
