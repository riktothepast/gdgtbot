'use strict';
const phrases = require('../../phraseManager')();

function listEvents(eventsList, calendarId) {
  function searchEvents(maxResults) {
    const params = {
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    };

    return eventsList(calendarId, params)
      .then((res) => {
        const fields = [];
        const responseJson = {
          title: 'Encontre los siguientes eventos: ',
          fields,
        };
        res.data.items.forEach(element => {
          fields.push(
            {
              name: element.summary,
              value: element.created,
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
