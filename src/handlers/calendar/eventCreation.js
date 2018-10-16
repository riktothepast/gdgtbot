'use strict';

function createEvents(calendar, calendarId) {
  function insert(start, end, location, summary, description) {
    const params = {
      start,
      end,
      location,
      summary,
      description,
    };

    return calendar.Events.insert(calendarId, params);
  }

  return insert;
}

module.exports = createEvents;
