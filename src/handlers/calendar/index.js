'use strict';

const CalendarAPI = require('node-google-calendar');
const eventListFactory = require('./eventList');
const eventCreateFactory = require('./eventCreation');

function configure(config) {
  const calendar = new CalendarAPI(config);
  const eventList = eventListFactory(calendar, config.googleCalendar.calendarId);
  const eventCreation = eventCreateFactory(calendar, config.googleCalendar.calendarId);

  function handler(msg) {
    eventList()
      .then((events) => {
        msg.reply(events);
      })
      .catch((error) => {
        msg.reply(error);
      });
  }

  return handler;
}

module.exports = configure;
