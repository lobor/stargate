/**
 * Toolbox of front for add, remove navigation and routes on General app of react
 */

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

function deleteNavigation(navigation){
  var navApp = app.state.navigation;
  navApp = navApp.filter((nav)=>{
    return -1 === navigation.indexOf(nav)
  })
  app.setState({navigation: navApp});
}


module.exports = {
  setNavigation: setNavigation,
  setRoutes: setRoutes,
  deleteNavigation: deleteNavigation
}
