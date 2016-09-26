# stargate
Application for security camera on Raspberry Pi, Mac OSX

[Screenshot](https://github.com/lobor/stargate/tree/screenshot)


## Config
1. Install Motion => [link](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) 
2. Install OpenCV => ```sudo apt-get install libopencv-dev python-opencv```
2. Install [node-canvas](https://github.com/Automattic/node-canvas)
3. Rename the config files located in /config and modify if necessary
  - admin.js.dist => admin.js
  - environnement.js.dist => environnement.js
4. Lunch on terminal ```npm install --production``` (```npm install``` for dev) and ```npm start```
5. Go to http://localhost:8080
6. For recognition, go to config menu "FACE RECOGNITION" and add selfie of you with a name of collection, save it and this work

## Script
```npm run build:js``` => build js file compressed

```npm run watch:js``` => watch modification on js file and re-build

## RoadMap
- [x] Add face recognition with [openBR](http://openbiometrics.org/) on detect menu
- [ ] change face recognition because openBR is very slow
