function init(){
    var canvas = document.getElementById("tutorialCanvas");
    var stage = new createjs.Stage(canvas);
    
    var background = new createjs.Bitmap("assets/Images/InGame/inGameBG.png");
    stage.addChild(background);
    
    var trees = new createjs.Bitmap("assets/Images/InGame/green.png");
    stage.addChild(trees);
    
    var ground = new createjs.Bitmap("assets/Images/InGame/rings/blueRing");
    stage.addChild(ground);
    ground.y = 164;
    
    stage.update();
}