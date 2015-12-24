var GameController = function(delegate){

    this._canvas = delegate._canvas;
    this._$canvas = delegate._$canvas;
    this._stage = delegate._stage;
    this._fpsLabel = delegate.fpsLabel;
    this.DeviceText = delegate.DeviceText;
    this.init();
};

GameController.prototype = {
    
    _intro1Scene : null,
    _inGameScene : null,
    _resultScene : null,
    _helpScene : null,
    _balance : null,
    titleScreenSheet: null,
    titleScreenSprites : null,
    i : null,
    helpDown : null,
    
    init: function(){
        this.helpDown = false;
        this.i = 0;
        this.titleScreenSprites = [];
        $.getJSON("assets/Images/TitleScreen/TitleScreen.json", this.createSprite.bind(this));
    },
    
    createSprite: function(data){
        
        console.log(data);
        this.titleScreenSheet = new createjs.SpriteSheet(data);
            for(var sprite in data.animations){
                this.titleScreenSprites[this.i] = new createjs.Sprite(this.titleScreenSheet, sprite);
                this.i++;
            }
       this.placeAssets(); 
       
    },
    
    placeAssets: function(){
        
       this.playBtn = this.titleScreenSprites[2];
       this.playBtn.x = 124;
       this.playBtn.y = 598.5;
       this._stage.addChild(this.playBtn);
       this.playBtn.addEventListener("mousedown", this.playBtnDown.bind(this));
        
       this.helpBtn = this.titleScreenSprites[7];
       this.helpBtn.x = 124;
       this.helpBtn.y = 718.5;
       this._stage.addChild(this.helpBtn);
        
       this.soundBtn = this.titleScreenSprites[9];
       this.soundBtn.x = 24;
       this.soundBtn.y = 718.5;
       this._stage.addChild(this.soundBtn);     
    },
    
    playBtnDown: function(){
        this._stage.removeAllChildren();
        this._inGameScene = new InGameView(this);
    }
    
};
