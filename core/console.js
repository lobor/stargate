/**
 *  adds colors alongside console.log server
 */

function consoleError(...args){
  let arg = '';
  if('development' === process.env.NODE_ENV){
    arg = args;
  }
  cs('\x1b[31m', '[ERROR]', '\x1b[0m', arg);
}

function consoleWarning(...args){
  let arg = '';
  if('development' === process.env.NODE_ENV){
    arg = args;
  }
  cs('\x1b[33m', '[WARNING]', '\x1b[0m', arg);
}

function consoleSuccess(...args){
  let arg = '';
  if('development' === process.env.NODE_ENV){
    arg = args;
  }

  cs('\x1b[32m', '[SUCCESS]', '\x1b[0m',arg);
}

function consoleInfo(...args){
  let arg = '';
  if('development' === process.env.NODE_ENV){
    arg = args;
  }

  cs('\x1b[34m', '[INFO]', '\x1b[0m', arg);
}

function cs(...args){
  if('test' !== process.env.NODE_ENV){
    console.log(...args);
  }
}

module.exports.error = consoleError;
module.exports.warning = consoleWarning;
module.exports.success = consoleSuccess;
module.exports.info = consoleInfo;
