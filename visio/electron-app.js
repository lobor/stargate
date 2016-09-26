var jsdom = require("jsdom");

var fs = require("fs");
var clm = fs.readFileSync("./node_modules/clmtrackr/clmtrackr.js", "utf-8");
var model = fs.readFileSync("./node_modules/clmtrackr/models/model_pca_20_svm.js", "utf-8");
// var script = fs.readFileSync("./toto.js", "utf-8");

var virtualConsole = jsdom.createVirtualConsole();

// virtualConsole.on("jsdomError", function (error) {
//   console.error(error.stack, error.detail);
// });

virtualConsole.on("log", function (message) {
	console.log("console.log called ->", message);
});



module.exports = function(imgBase64, callback){
  var html = "<!DOCTYPE html><html><head></head><body><canvas id='image' width='625' height='500'></canvas></body></html>";
  // var file = "./../node_modules/clmtrackr/examples/clm_image.html";
  var document = jsdom.env(html, {
  	virtualConsole: virtualConsole,
  	src: [clm, model],
  	features: {
  		FetchExternalResources: ['script', 'link', 'img'],
  	},
  	// src: [jquery],
  	done: function (err, window) {

  		var canvas = window.document.getElementById('image');
  		var cc = canvas.getContext('2d');
  		var ctracker = new window.clm.tracker({
  			stopOnConvergence: true,
  			weightPoints: [30, 28, 23, 28, 35, 39, 33, 62, 7, 33, 19, 22, 19, 15, 60, 57, 57, 53],
  			scoreThreshold: 0.1
  		});
  		ctracker.init(window.pModel);
  		var img = new window.Image();
  		img.onload = function () {
  			if (img.height > 500 || img.width > 700) {
  				var rel = img.height / img.width;
  				var neww = 700;
  				var newh = neww * rel;
  				if (newh > 500) {
  					newh = 500;
  					neww = newh / rel;
  				}
  				canvas.setAttribute('width', neww);
  				canvas.setAttribute('height', newh);
  				cc.drawImage(img, 0, 0, neww, newh);
  			} else {
  				canvas.setAttribute('width', img.width);
  				canvas.setAttribute('height', img.height);
  				cc.drawImage(img, 0, 0, img.width, img.height);
  			}
  			console.log('load image');
  			ctracker.start(canvas);
  		};

  		img.onerror = function (e) {
  			console.log('img not loaded');
  		};

  		img.src = 'data:image/jpeg;base64,' + imgBase64;

  		window.document.addEventListener('clmtrackrIteration', function (event) {
        
        if (ctracker.getCurrentPosition()) {
					ctracker.draw(canvas);
				}

        var data = canvas.toDataURL('image/png');
        var base64Data = data.replace(/^data:image\/png;base64,/, "");
        // callback(null, data);
        fs.writeFile(process.cwd() + '/visio/result.png', base64Data, 'base64', function(err) {
          // console.log(err);
        });
  			console.log('clmtrackrIteration', !!ctracker.getCurrentPosition());
  		});

  		window.document.addEventListener("clmtrackrNotFound", function (event) {
  			console.log('clmtrackrNotFound', !!ctracker.getCurrentPosition());
  		}, false);

  		window.document.addEventListener("clmtrackrConverged", function (event) {
  			console.log('clmtrackrConverged');
  		}, false);
  	}
  });
}

// var toto = document.createElement('script');
// toto.innerHTML = 'console.log("titi")';
// document.body.appendChild(toto);
//
//
// var window = document.defaultView
//
// window.addEventListener("error", function (event) {
//   console.error("script error!!", event.error);
// });
//
// console.log(window.clm);
// window.onerror = function(){
//   console.log('error');
// }
// jsdom.env({
//   html: "<!DOCTYPE html><html><head></head><body>hello<script type='text/javascript'>console.log('toto');</script></body></html>",
//   // file: "./../node_modules/clmtrackr/examples/clm_image.html",
//   virtualConsole: virtualConsole,
//   done: function(err, window){
//     window.onModulesLoaded = function () {
//       console.log("ready to roll!");
//     };
//     // console.log(window);
//     // console.log(window);
//   }
// });

// function(err, window){
//   console.log(err);
//   console.log(3);
// window.onModulesLoaded = function () {
//   console.log("ready to roll!");
// };

// window.addEventListener("error", function (event) {
//   console.error("script error!!", event.error);
// });
// }
//

// console.log(window);
