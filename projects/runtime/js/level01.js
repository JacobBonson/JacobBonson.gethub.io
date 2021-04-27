var level01 = function (window) { 
    
    window.opspark = window.opspark || {};
    
    var draw = window.opspark.draw; 
    var createjs = window.createjs; 
    
    window.opspark.runLevelInGame = function(game) { 
        // some useful constants 
        var groundY = game.groundY; 
    
        // this data will allow us to define all of the 
        // behavior of our game 
        var levelData = { 
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3, 
            "gameItems": [

                ] 
            };

            var xGen;
            var yGen;
            var rand;
            var randType;

        for(var i = 0; i < 30; i++) {

            xGen = 400 + (i * 200);
            rand = Math.random() * 6;

            if(rand > 3) {

                randType = 'crater';
                yGen = 0;
            }
            
            else if(rand > 1) {

                randType = 'enemy';
                yGen = - 550;
            }
            else {

                randType = 'reward'
                yGen = - 100;
            }

            levelData.gameItems[i] = { "type": randType, "x": xGen, "y": groundY + yGen};
        }

        var obj; 
        var objX; 
        var objY; 
        var objType;

        for (var i = 0; i < levelData.gameItems.length; i++) { 
        
            obj = levelData.gameItems[i]; 
            objX = obj.x; 
            objY = obj.y; 
            objType = obj.type;

            if (objType === 'crater') {
                createCrater(objX, objY);
            } 
            else if (objType === 'enemy') {
                createEnemy(objX, objY);
            }  
            else {
                createReward(objX, objY);
            } 
        } 
        
        window.levelData = levelData; 
        // set this to true or false depending on if you want to see hitzones 
        game.setDebugMode(true); 
        
        // TODO 6 and on go here 
        // BEGIN EDITING YOUR CODE HERE

        function createCrater(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x; 
            sawBladeHitZone.y = y; 
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/obstacle.png'); 
            sawBladeHitZone.addChild(obstacleImage); 
            obstacleImage.x = -120; 
            obstacleImage.y = -25; 
            sawBladeHitZone.scaleX = .5;
            sawBladeHitZone.scaleY = .5;
            obstacleImage.scaleX = .8; 
            obstacleImage.sclaleY = .3; 
        }



        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/Alien.png'); 
            redSquare.x = -25; 
            redSquare.y = -80;
            redSquare.scaleX = .5;
            redSquare.scaleY = .5;
            enemy.addChild(redSquare); 
            enemy.x = x; 
            enemy.y = groundY - y; 
            game.addGameItem(enemy); 

            enemy.velocityX = -2; 
            
            enemy.onPlayerCollision = function() { 
                game.changeIntegrity(-20); 
            }; 
            enemy.onProjectileCollision = function() {
                game.increaseScore(200);
                enemy.fadeOut(); 
            } 
        }

              
        function createReward(x, y) {
            var reward = game.createGameItem('reward', 20);
            var circle = draw.bitmap('img/UFO.png')
            circle.x = -60; 
            circle.y = -35; 
            circle.scaleX = .5;
            circle.scaleY = .5;
            reward.addChild(circle); 
            reward.x = x; 
            reward.y = y; 
            game.addGameItem(reward); 
            
            reward.velocityX = -2;

            reward.onPlayerCollision = function() { 
                game.increaseScore(500); 
                reward.fadeOut(); 
            }; 

        } 

    
        
        // DO NOT EDIT CODE BELOW HERE 
    }
}; 

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
     // here, export any references you need for tests // 
     module.exports = level01;
} 