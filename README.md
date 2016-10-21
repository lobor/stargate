# stargate (node 6.9.1)
Application for security camera on Raspberry Pi, Linux


## Config
1. Lunch on terminal ```npm install --production``` (```npm install``` for dev) and ```npm start```
2. Go to http://localhost:7070


## Script
```npm run build:js``` => build js file compressed

```npm run watch:js``` => watch modification on js file and re-build

## Create your plugin
I have create a sample plugin [here](https://github.com/lobor/stargate-plugin-sample) for develop your plugin. For add on store of stargate, you should pull request on branch [update](https://github.com/lobor/stargate/tree/update) of stargate

## Plugins available
- [Face recognition](https://github.com/lobor/stargate-face) (in development) 
- [Motion](https://github.com/lobor/stargate-motion)

## RoadMap
- [x] Create system plugin with auto installation 
- [x] Plugin for Motion
- [ ] Plugin for Gstreamer
- [ ] Plugin for Face recognition
- [ ] Plugin for speech recognition


## Screenshot
![Login](https://raw.githubusercontent.com/lobor/stargate/screenshot/login.png  "Login")
![Home](https://raw.githubusercontent.com/lobor/stargate/screenshot/home.png  "Home")
![Menu](https://raw.githubusercontent.com/lobor/stargate/screenshot/menu.png  "Menu")
![Video](https://raw.githubusercontent.com/lobor/stargate/screenshot/video.png  "Video")
![Config](https://raw.githubusercontent.com/lobor/stargate/screenshot/config.png  "Config")
