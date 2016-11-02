var ConfigAdmin = require(process.cwd() + '/config/web/admin');

module.exports = function(data, fc){
  if(data.name == ConfigAdmin.user && data.password == ConfigAdmin.password){
    var sess = this.socket.request.session;
    sess.views = true;
    sess.save();

    if('[object Array]' !== Object.prototype.toString.call(this.data.LastLogin)){
      this.data.LastLogin = [];
    }

    if(5 === this.data.LastLogin.length){
      this.data.LastLogin.shift();
    }

    this.data.LastLogin.push(new Date());

    this.loadRoutesSocket();

    fc({
      "response":true
    });
  }
  else{
    fc({
      "response":false,
      "errors": {
        "message": "Is not good user name or password"
      }
    });
  }
}
