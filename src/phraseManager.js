'use strict';

const { phrases, errors } = require('../config/responses.json');

function singleton() {
  let instace;

  function createInstance() {
    return {
      errors,
      phrases,
    };
  }

  if (!instace) {
    instace = createInstance();
  }

  return instace;
}

module.exports = singleton;
