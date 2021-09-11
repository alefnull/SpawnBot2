const dfmt = require('./dfmt');
const { green, blue, yellow, red } = require('chalk');

// a custom logger module for the bot
// using chalk for color output
// log a message to the console
function log(message, level = 'info') {
  // check if the level is valid
  if (['info', 'warn', 'error', 0, 1, 2].indexOf(level) === -1) {
    level = '';
  }
  // set the color based on the level
  const datestamp = blue(`[${dfmt(new Date(), 'MM/dd/yyyy hh:mm:ss aa')}]`);
  switch (level) {
    case 0:
    case 'info':
      message = datestamp + green('[INFO] ') + message;
      break;
    case 1:
    case 'warn':
      message = datestamp + yellow('[WARN] ') + message;
      break;
    case 2:
    case 'error':
      message = datestamp + red('[ERROR] ') + message;
      break;
    default:
      message = datestamp + ' ' + message;
  }

  // log the message
  console.log(message);
}

function log_info(message) {
  log(message, 0);
}

function log_warn(message) {
  log(message, 1);
}

function log_error(message) {
  log(message, 2);
}

module.exports = { log, log_info, log_warn, log_error };
