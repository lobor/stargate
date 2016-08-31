# stargate
Application for security camera on Raspberry Pi, Mac OSX

[Screenshot](https://github.com/lobor/stargate/tree/screenshot)


## Config
1. Install Motion => [link](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) 
2. Rename the config files located in /config and modify if necessary
  - admin.js.dist => admin.js
  - environnement.js.dist => environnement.js
3. Lunch on terminal ```npm install --production``` (```npm install``` for dev) and ```npm start```
4. Go to http://localhost:8080

## Script
```npm run build:js``` => build js file compressed
```npm run watch:js``` => watch modification on js file and re-build

## RoadMap
1. Add motor for control webcam
2. Add face recognition with [openBR](http://openbiometrics.org/) on detect menu
3. Stream audio with video
