'use strict';

function listEvents(calendar, calendarId) {
  function searchEvents(start, end) {
    const params = {
      timeMin: start,
      timeMax: end,
      singleEvents: true,
      orderBy: 'startTime',
    };

    return calendar.Events.list(calendarId, params);
  }

  return searchEvents;
}

module.exports = listEvents;
