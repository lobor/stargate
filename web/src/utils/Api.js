var io = window.io.connect();

module.exports = {
  run: function(name, data, cb){
    io.emit(name, data, function(response){
      if(response.error === 403){
        App.refs.navigation.setState({redirect: true})
        App.refs.navigation.context.auth(false)
      }
      else{
        cb(response);
      }
    });
  },
  on: function(name, cb){
    io.on(name, cb);
  },
  off: function(name){
    io.off(name);
  }
};
