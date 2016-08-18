var ConfigAdmin = require(process.cwd() + '/config/web/admin');

module.exports = function(req){
  console.log(3);
  // if(req.body.name == ConfigAdmin.user && req.body.password == ConfigAdmin.password){
  //   var sess = req.session;
  //   sess.views = true;
  //   console.log(3);
  //   req.io.respond( {
  //     "response":true
  //   });
  // }
  // else{
  //   req.io.respond( {
  //     "response":false,
  //     "errors": {
  //       "message": "Is not good user name or password"
  //     }
  //   });
  // }
};