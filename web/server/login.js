module.exports = function(data, fc){
  let Users = this.db.use('Users');
  let user = Users.findOne({ username: data.name, password: data.password  });
  if(user){
    var sess = this.socket.request.session;
    sess.user = user;
    sess.save();
    let lastLogin = this.db.use('lastLogin');

    lastLogin.push({
      date: new Date(),
      id_user: user.id
    });

    lastLogin.save();

    this.loadRoutesSocket();

    fc({
      "success": true,
      "data": {user: user.username, id_role: user.role}
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
