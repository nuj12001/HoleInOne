var AssetsManager = function(){};

AssetsManager.queue = null;

AssetsManager.GetImagebyID = function(imageName){
    
    if(this.queue !== null)
    {
        var bmp = this.queue.getResult(imageName);
        return bmp;
        
    }else
    {
        console.log("Cannot Get Image File:" + imageName);
    }
};

AssetsManager.GetSpritebyID = function(id){
    
    if(this.spriteSheet !== null)
    {
        var instance = new createjs.Sprite(this.spriteSheet, id);
        instance.stop();
        return instance;
    }
};