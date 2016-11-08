var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require('./mime/mime'),
    gzip = require('./compression');

var server, routes, middlewares = [];


module.exports = () => {
  return new Server();
}


/**
 * Server App
 */
class Server {
  constructor(){
    routes = { GET: {}, POST: {}};
    this.req = null;
    this.res = null;
  }

  getServer(){
    return this.server;
  }

  /**
   * Add middlewares
   */
  use(cb){
    middlewares.push(cb)
  }

  /**
   * Save route type GET
   */
  get(url, cb){
    routes.GET[url] = cb;
  }

  /**
   * Save route type POST
   */
  post(url, cb){
    routes.POST[url] = cb;
  }

  /**
   * Create http server
   */
  createServer(){
    this.server = http.createServer(function(req, res) {
      let page = url.parse(req.url).pathname;

      this.req = req;
      this.res = res;

      /**
       * Check middleware
       * If true, all middleware accept request, so check routes
       */
      if(checkMiddleware(this.req, this.res)){
        checkRoutes(this.req, this.res, page);
      }
    });
  }

  /**
   * Listen on port
   */
  listen(port, cb){
    this.server.listen(port, cb || function(){});
  }
}

/**
 * Function check middleware
 */
function checkMiddleware(req, res){
  let state = true;
  for(let middleware of middlewares){

    // check if middleware accept request
    // If false, stop response
    state = middleware(req, res);
    if(!state){
      break;
    }
  }
  return state;
}


/**
 * Check route coresponds at url's request
 * @param  {object} req  Request
 * @param  {object} res  Response
 * @param  {string} page url request
 */
function checkRoutes(req, res, page){

  // check type / method of request exist (GET, POST, ...)
  if(routes[req.method]){

    // if route exist literaly
    if(routes[req.method][page]){
      render(routes[req.method][page], req, res);
    }
    else{
      let thisString = new RegExp(page, 'i');
      let find;

      // search if roue exist on regexp
      for(let route of Object.keys(routes[req.method])){
        if(route.match(/\*/g)){
          let reg =  new RegExp(route, 'i');
          if(reg.test(page)){
            find = routes[req.method][route];
          }
        }
      }

      // If route has been find, send route, if not, return 404 page
      if(find){
        render(find, req, res);
      }
      else{
        render404(res);
      }
    }
  }
  else{
    render404(res);
  }
}

/**
 * Render 404 page
 * @param  {object} res Response
 */
function render404(res){
  res.writeHead(404, {"Content-Type": "text/plain"});
  // res.write("NOT FOUND");
  res.end("NOT FOUND");
}

/**
 * Render accept page
 * @param  {object} res Response
 */
function render(route, req, res){
  res.sendJSON = sendJSON(res);
  res.sendFile = sendFile(res);
  // res.sendJsFile = sendJsFile(res);
  // res.sendCssFile = sendCssFile(res);
  route.call(undefined, req, res)
}

/**
 * render json api
 * @param  {object} res Response
 */
function sendJSON(res){
  return function(data){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(data));
  }
}

/**
 * Template es6 polyfill
 * @param  {string} template template
 * @param  {object} params  params of template
 * @return {string}         Render with param and template
 */
function template(template, params) {
  let argsClass = [];
  let argsFunction = [];
  for(let param in params){
    argsClass.push(param);
    argsFunction.push(params[param]);
  }
  if(argsFunction.length){
    let tpl = new FunctionCustom(argsClass, "return `" + template + "`;");
    return tpl.compile(argsFunction);
  }
  return template;
}


/**
 * Extend Function for use in template. change ...args to dynamic
 */
class FunctionCustom extends Function{
  constructor(...args){
    this.tpl = super(...args);
  }

  compile(...args){
    return this.tpl.apply(this, ...args);
  }
}

/**
 * Get file, transpile to es6 template and replace var
 * @param  {object} res Response
 */
function sendFile(res){
  return function(pathFile, params, zip){
    let html = fs.readFileSync(pathFile);

    gzip(template(html, params), function(err, data){
      res.writeHead(200, {
        "Content-Type": mime.lookup(pathFile),
        'Content-Encoding': 'gzip'
      });
      res.write(data);
      res.end();
    });
  }
}
