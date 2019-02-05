'use strict';

const gCalendar = require('gCalendar');
const eventList = require('./eventList');
let calendarList;
let listEvents;

function configure(config) {
  gCalendar(config.googleCalendar.privateKey, config.googleCalendar.scopes).then(cEvents => {
    calendarList = cEvents.list;
    listEvents = eventList(calendarList, config.googleCalendar.primary);
  });

  function handler(msg, keywords) {
    listEvents(keywords)
      .then(message => msg.reply(message))
      .catch(message => msg.reply(message));
  }

  return handler;
}

module.exports = configure;
