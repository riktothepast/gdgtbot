'use strict';
const phrases = require('../../phraseManager')();
const moment = require('moment');

function generateParams(words) {
  const params = {
    maxResults: 5,
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  };

  words.forEach(element => {
    if (!isNaN(element)) {
      params.maxResults = element;
    }
  });

  return params;
}

function listEvents(eventsList, calendarId) {
  function searchEvents(keywords) {
    return eventsList(calendarId, generateParams(keywords))
      .then((res) => {
        const fields = [];
        const responseJson = {
          title: 'Encontre los siguientes eventos: ',
          fields,
        };
        res.data.items.forEach(element => {
          const date = moment(element.start.dateTime).format('MMMM Do YYYY, h:mm:ss a');
          fields.push(
            {
              name: element.summary,
              value: `${element.location}\n${date}\n[Link](${element.htmlLink})`,
            }
          );
        });
        return {
          embed: responseJson,
        };
      })
      .catch((error) => (
        `${phrases.errors[Math.floor(Math.random() * phrases.errors.length)].message} ${error.toString()}`
      ));
  }

  return searchEvents;
}

module.exports = listEvents;
