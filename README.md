# stargate
Application for security camera on Raspberry Pi, Linux

[Screenshot](https://github.com/lobor/stargate/tree/screenshot)


## Config
1. Install Motion => [link](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) 
2. Install OpenCV => ```sudo apt-get install libopencv-dev python-opencv```
3. Rename the config files located in /config and modify if necessary
  - admin.js.dist => admin.js
  - environnement.js.dist => environnement.js
4. Lunch on terminal ```npm install --production``` (```npm install``` for dev) and ```npm start```
5. Go to http://localhost:8080


## Script
```npm run build:js``` => build js file compressed

```npm run watch:js``` => watch modification on js file and re-build

## Plugins available
- Face recognition (in development)

## RoadMap
- [] Create system plugin with auto installation 
- [] Plugin for Face recognition
- [] Plugin for speech recognition
