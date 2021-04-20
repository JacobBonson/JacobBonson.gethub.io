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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "enemy", "x": 400, "y": groundY },
            ]
        };


        var obj;
        var objX;
        var objY;
        var objType;

        for (var i = 0; i < levelData.gameItems.length; i++) {
 
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;

            if (objType === 'sawblade') {

                createSawBlade(objX, objY);
            }
            else if (objType === 'enemy') {

                createEnemy(objX, objY);
            }
            else{

                createReward(objX, objY);
            }
       }

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y) {
           var hitZoneSize = 25;
           var damageFromObstacle = 10;
           var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
           sawBladeHitZone.x = x;
           sawBladeHitZone.y = y;
           game.addGameItem(sawBladeHitZone);
           var obstacleImage = draw.bitmap('img/sawblade.png');
           sawBladeHitZone.addChild(obstacleImage); 
           obstacleImage.x = -25;
           obstacleImage.y = -25;
       }


        function createEnemy(x, y) {
 
           var enemy = game.createGameItem('enemy',25);
           var redSquare = draw.rect(50,50,'red');
           redSquare.x = -25;
           redSquare.y = -25;
 
           enemy.addChild(redSquare);
          
           enemy.x = x;
           enemy.y = groundY - y;
          
           game.addGameItem(enemy);
 
           enemy.velocityX = -1;

           enemy.onPlayerCollision = function() {
 
               game.changeIntegrity(-10);
           };
 
           enemy.onProjectileCollision = function() {
 
               game.increaseScore(100);
               enemy.fadeOut();
           }
       }


 
       function createReward(x, y) {
 
           var reward = game.createGameItem('reward', 10);
           var rewardPic = draw.circle(10, 'blue');
 
           reward.addChild(prayer);
          

           reward.x = x;
           reward.y = groundY- y;
 
           game.addGameItem(reward);
 
           reward.velocityX = -1;
 
           reward.onPlayerCollision = function() {
 
               game.increaseScore(100);
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
