'use strict';

const Discord = require('discord.js');
const config = require('./config/defaults.json');
const responses = require('./config/responses.json');
const client = new Discord.Client();
const handler = require('./src');

client.login(config.token);

const configuration = {
  responses,
  prefix: config.prefix
};

handler(client, configuration);
