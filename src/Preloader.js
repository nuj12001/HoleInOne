var Preloader = function(delegate){

    this._delegate = delegate;
        this._stage = delegate._stage;
        this.manifest = [];
        
        this.init();
};

Preloader.prototype = {
  
    init: function(){
        
        //Setup Stage
        var loadingBG = new createjs.Bitmap("assets/Images/LoadingScreen/titleScreenBG.png");
        loadingBG.x = 0;
        loadingBG.y = 0;
        this._stage.addChild(loadingBG);
        var logo = new createjs.Bitmap("assets/Images/LoadingScreen/HoleInOne_logo.png");
        logo.x = 30;
        logo.y = 70;
        this._stage.addChild(logo);
        
            this.progressBar = new createjs.Bitmap("assets/Images/LoadingScreen/ProgressBar.png");
            this.progressBar.x = 110;
            this.progressBar.y = 430;
            this._stage.addChild(this.progressBar);

            this.loadingBarFilled = new createjs.Bitmap("assets/Images/LoadingScreen/LoadingBarFilled.png");
            this.loadingBarFilled.x = 124;
            this.loadingBarFilled.y = 438.5;
            this._stage.addChild(this.loadingBarFilled);
            
            this.rect = new createjs.Rectangle(0,0,1,60);
            
            this.loadingBarFilled.sourceRect = this.rect;

            this.loaderPercent = new createjs.Text("Loading...  0%", "bold 25px Arial", "#000000");
            this.loaderPercent.x = 140;
            this.loaderPercent.y = 450;
            this._stage.addChild(this.loaderPercent);
    },
    
    startLoad : function() {
            var xmlGameData = loadXMLDoc("config/HoleInOne_game.xml");
            var imgData = xmlGameData.getElementsByTagName("image");
            for(var i = 0; i < imgData.length; i++)
            {
                var imgsrc = imgData[i].getAttribute('src');
                var imgid = imgData[i].getAttribute('id');
                this.manifest.push({src:imgsrc,id:imgid});
            }

            this.loadedNum = 0;
            this.totalNum = this.manifest.length;
            this.loadQueue = new createjs.LoadQueue(true);
            this.loadImageFile();
        },
    
    loadImageFile : function(){
            
            
            this.loadQueue.on('fileload', this.handleImageFileLoaded.bind(this));
            this.loadQueue.on('complete', this.handleImageFileLoadComplete.bind(this));
            this.loadQueue.loadManifest(this.manifest);

            this.loadQueue.installPlugin(createjs.Sound);
        },
    
    handleImageFileLoaded : function(event){
            
            this.loadedNum++;
            var percent = Math.floor(this.loadedNum / this.totalNum * 100);
            this.loaderPercent.text = "Loading...  " + percent + "%";
            this.rect.width = Math.floor(this.loadedNum / this.totalNum * 240);
            this.loadingBarFilled.sourceRect = this.rect;
        },
    
    handleImageFileLoadComplete : function(event){
            
            AssetsManager.queue = this.loadQueue;
            this.progressBar.visible = false;
            this.loadingBarFilled.visible = false;
            this.loaderPercent.visible = false;
            this._delegate.loadFinished();
        }
};

var loadXMLDoc = function(dname){
    if (window.XMLHttpRequest)
      {
      xhttp=new XMLHttpRequest();
      }
    else
      {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
};