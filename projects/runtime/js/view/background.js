var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        var lunarLander;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
 
            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game

            var backgroundFill = draw.rect(canvasWidth, groundY,'black');
            background.addChild(backgroundFill);

            
            // TODO: 3 - Add a earth and starfield
            
             for (var i = 1; i < 101; i++) {
                var star = draw.bitmap('img/Star Picture.png');
                star.x = canvasWidth*Math.random();
                star.y = groundY*Math.random() - 175;
                star.scaleY = 0.2;
                star.scaleX = 0.2;
                background.addChild(star);
            }

            var earth = draw.bitmap('img/Earth.png');
            earth.x = 1000;
            earth.y = 50;
            earth.scaleX = 0.7;
            earth.scaleY = 0.7;
            background.addChild(earth);

            var lunarSurface = draw.bitmap('img/ground.png')
            lunarSurface.x = -80; 
            lunarSurface.y = groundY - 825; 
            lunarSurface.scaleX = 2; 
            lunarSurface.scaleY = 2; 
            background.addChild(lunarSurface);


            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
           /* for(var i=0;i<6;++i) {
                var buildingHeight = 250*Math.random() + 50;
                var building = draw.rect(50, buildingHeight, 'white');
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            */
            // TODO 4: Part 1 - Add a lunarLander
            
            lunarLander = draw.bitmap('img/Lunar-Lander.png');
            lunarLander.x = canvasWidth - 1;
            lunarLander.y = groundY - 200;
            background.addChild(lunarLander);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the lunarLander!
            

            lunarLander.x = lunarLander.x - 3;

            if(lunarLander.x < -100) {
                lunarLander.x = canvasWidth;
            }

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x - 5;
                if(building.x < -50) {
                    building.x = canvas.width;
                }
                
            }
            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
