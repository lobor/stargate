var app = window.App;

function setNavigation(navigation){
  var navApp = app.state.navigation;
  navApp = navApp.concat(navigation);
  app.setState({navigation: navApp});
}

function setRoutes(routes){
  var routesApp = app.state.routes;
  routesApp = routesApp.concat(routes);
  app.setState({routes: routesApp});
}


module.exports = {
  setNavigation: setNavigation,
  setRoutes: setRoutes
}
