'use strict';

const CalendarAPI = require('node-google-calendar');
const eventListFactory = require('./eventList');
const eventCreateFactory = require('./eventCreation');
const phrases = require('../../phraseManager')();

function configure(config) {
  const calendar = new CalendarAPI(config.googleCalendar);
  const eventList = eventListFactory(calendar, config.googleCalendar.calendarId);
  const eventCreation = eventCreateFactory(calendar, config.googleCalendar.calendarId);

  function handler(msg) {
    eventList()
      .then((events) => {
        console.log(events);
        msg.reply(events);
      })
      .catch((error) => {
        console.log(error);
        msg.reply(
          `${phrases.errors[Math.floor(Math.random() * phrases.errors.length)].message} ${error.toString()}`
          );
      });
  }

  return handler;
}

module.exports = configure;
