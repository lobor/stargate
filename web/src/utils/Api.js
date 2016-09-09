var io = window.io.connect();

module.exports = {
  run: function(name, data, cb){
    io.emit(name, data, cb);
  },
  on: function(name, cb){
    io.on(name, cb);
  },
  off: function(name){
    io.off(name);
  }
};
