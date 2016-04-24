var gpio = require('rpi-gpio');
var settings = {};
module.exports = {
    start: function(options){
       var stdin = process.stdin;
       isStart = true;
       settings = options;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', function(key){
            if (key == '\u001B\u005B\u0041') {
                process.stdout.write('up'); 
            }
            if (key == '\u001B\u005B\u0043') {
                process.stdout.write('right'); 
            }
            if (key == '\u001B\u005B\u0042') {
                process.stdout.write('down'); 
            }
            if (key == '\u001B\u005B\u0044') {
                process.stdout.write('left'); 
            }

            if (key == 'q') {
                if(settings.events && settings.events.quit){
                    settings.events.quit();
                }
                
            }
        });
    //    setPin(settings.pins);
    },
    stop: function(){
        isStart = false;
    },
    isStart: function(){
        return isStart;
    }
}



function setPin(pins){
    for(var i in pins){
        var pin = pins[i];
        gpio.setup(pin.pin, pin.optionPin, pin.callback);
    }
}
