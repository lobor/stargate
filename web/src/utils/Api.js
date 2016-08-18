// var g = window.io.connect();
// console.log(socket);
// console.log(window.io);
var socket = window.io.connect();
// socket.emit('my other event', {});
module.exports = {
  run: function(name){
    
    socket.emit('my other event');
  }
};