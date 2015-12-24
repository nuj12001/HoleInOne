var InGameView = function(delegate){
    this._delegate = delegate;
    this._canvas = delegate._canvas;
    this._$canvas = delegate._$canvas;
    this._stage = delegate._stage;
    
    this.init();
};

InGameView.prototype = {
  
    inGameSheet: null,
    inGameSprites : null,
    i : null,
    m_nZoneAnimationDelay : null,
    innerRingInstance : null,
    allRings : null,
    royalBlueRing : null,
    greenRing : null,
    orangeRing : null,
    blueRing : null,
    yellowRing : null,
    pinkRing : null,
    redRing: null,
    purpleRing : null,
    ringArray : null,
    curRing: null,
    
    init: function(){
    
        this.i = 0;
        this.m_nZoneAnimationDelay = 0;
        this.ringArray = [];
        
        this.inGameSprites = [];
        $.getJSON("assets/Images/InGame/InGame.json", this.createSprite.bind(this));
        
    },
    
    createSprite: function(data){
        
        console.log(data);
        this.inGameSheet = new createjs.SpriteSheet(data);
            for(var sprite in data.animations){
                this.inGameSprites[this.i] = new createjs.Sprite(this.inGameSheet, sprite);
                this.i++;
            }
       this.placeAssets(); 
       
    },
    
    placeAssets: function(){
        
        //BG
        var bg = this.inGameSprites[0];
        this._stage.addChild(bg);
        bg.x = 0;
        bg.y = 0;
        
        //Green
        var green = this.inGameSprites[1];
        this._stage.addChild(green);
        green.x = 0;
        green.y = 150;
        
        //AllRings
        this.allRings = this.inGameSprites[2];
        this._stage.addChild(this.allRings);
        this.allRings.x = 0;
        this.allRings.y = 150;
        this.ringArray.push(this.allRings);
        
        
        //GreenRing
        this.greenRing = this.inGameSprites[4];
        this._stage.addChild(this.greenRing);
        this.greenRing.x = 0;
        this.greenRing.y = 150;
        this.ringArray.push(this.greenRing);
        
        //RoyalBlueRing
        this.royalBlueRing = this.inGameSprites[3];
        this._stage.addChild(this.royalBlueRing);
        this.royalBlueRing.x = 0;
        this.royalBlueRing.y = 150;
        this.ringArray.push(this.royalBlueRing);
        
        //purpleRing
        this.purpleRing = this.inGameSprites[10];
        this._stage.addChild(this.purpleRing);
        this.purpleRing.x = 0;
        this.purpleRing.y = 150;
        this.ringArray.push(this.purpleRing);
        
         //pinkRing
        this.pinkRing = this.inGameSprites[8];
        this._stage.addChild(this.pinkRing);
        this.pinkRing.x = 0;
        this.pinkRing.y = 150;
        this.ringArray.push(this.pinkRing);
        
        //orangeRing
        this.orangeRing = this.inGameSprites[5];
        this._stage.addChild(this.orangeRing);
        this.orangeRing.x = 0;
        this.orangeRing.y = 150;
        this.ringArray.push(this.orangeRing);
        
        //yellowRing
        this.yellowRing = this.inGameSprites[7];
        this._stage.addChild(this.yellowRing);
        this.yellowRing.x = 0;
        this.yellowRing.y = 150;
        this.ringArray.push(this.yellowRing);
        
        //blueRing
        this.blueRing = this.inGameSprites[6];
        this._stage.addChild(this.blueRing);
        this.blueRing.x = 0;
        this.blueRing.y = 150;
        this.ringArray.push(this.blueRing);
        
        //redRing
        this.redRing = this.inGameSprites[9];
        this._stage.addChild(this.redRing);
        this.redRing.x = 0;
        this.redRing.y = 150;
        this.ringArray.push(this.redRing);
        
        for(var i = 0; i < this.ringArray.length; i++){
            this.ringArray[i].visible = false;
        }
        this._stage.addChild(this.innerRingInstance);
        this.innerRingInstance = this.ringArray[0];
        this.innerRingInstance.visible = false;
        this.innerRingInstance.x = 0;
        this.innerRingInstance.y = 150;
        this._stage.addEventListener("tick",this.playZoneAnimation.bind(this));
        
    },
    
    playZoneAnimation: function(event){
        if(this.m_nZoneAnimationDelay == 160){
            this.m_nZoneAnimationDelay = 0;
            this.innerRingInstance = this.ringArray[8];
            this.curRing = 8;
        }
        else if(this.m_nZoneAnimationDelay == 20){
            this.innerRingInstance = this.ringArray[1];
            this.curRing = 1;
        }
         else if(this.m_nZoneAnimationDelay == 40){
            this.innerRingInstance = this.ringArray[2];
             this.curRing = 2;
        }
         else if(this.m_nZoneAnimationDelay == 60){
            this.innerRingInstance = this.ringArray[3];
             this.curRing = 3;
        }
         else if(this.m_nZoneAnimationDelay == 80){
            this.innerRingInstance = this.ringArray[4];
             this.curRing = 4;
        }
         else if(this.m_nZoneAnimationDelay == 100){
            this.innerRingInstance = this.ringArray[5];
             this.curRing = 5;
        }
        else if(this.m_nZoneAnimationDelay == 120){
            this.innerRingInstance = this.ringArray[6];
            this.curRing = 6;
        }
        else if(this.m_nZoneAnimationDelay == 140){
            this.innerRingInstance = this.ringArray[7];
            this.curRing = 7;
        }
        for(var i = 0; i < this.ringArray.length; i++){
            if(this.curRing != i){
                this.ringArray[i].visible = false;
            }
            else{
                this.ringArray[i].visible = true;
            }
        }
        this.m_nZoneAnimationDelay++;
};