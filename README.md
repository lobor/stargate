# stargate
Application for security camera on Raspberry Pi

## Config
1. Install Motion on raspberry pi => [link](http://www.lavrsen.dk/foswiki/bin/view/Motion/WebHome) 
2. Rename the config files located in /config  
  - admin.js.dist => admin.js
  - environnement.js.dist => environnement.js
3. Lunch ```npm install --production``` and ```npm start```
4. Go to http://localhost:8080

## RoadMap
1. Add motor for control webcam
2. Add face recognition with [openBR](http://openbiometrics.org/) on detect menu
3. Stream audio with video
