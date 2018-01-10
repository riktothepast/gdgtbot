'use strict';

const twit = require('twit');
const appConfig = require('../config/config.json');

function configureTwitter(config) {
  return new twit(config);
}

const Twitter = configureTwitter(appConfig.twitter);
