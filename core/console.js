/**
 *  adds colors alongside console.log server
 */

function consoleError(...args){
  console.log('\x1b[31m', '[ERROR]', '\x1b[0m',  ...args);
}

function consoleWarning(...args){
  console.log('\x1b[33m', '[WARNING]', '\x1b[0m',  ...args);
}

function consoleSuccess(...args){
  console.log('\x1b[32m', '[SUCCESS]', '\x1b[0m', ...args);
}

module.exports.error = consoleError;
module.exports.warning = consoleWarning;
module.exports.success = consoleSuccess;
