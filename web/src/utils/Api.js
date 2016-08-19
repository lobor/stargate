// var g = window.io.connect();
// console.log(socket);
// console.log(window.io);
var io = window.io.connect();
io.on('login', function(...args){
  console.log(this);
  console.log(...args);
});
// socket.emit('login');
// socket.emit('my other event', {});
module.exports = {
  run: function(name, data, cb){
    io.emit(name, data, cb);
  },
  on: function(name, cb){
    io.on(name, cb);
  }
};
