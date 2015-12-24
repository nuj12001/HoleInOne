var MainGame = function(){
    this.init();
};

MainGame.prototype = {
  _myCanvas: null,
  _$canvas: null,
  _canvasWidth: null,
  _canvasHeight: null,
  _stage: null,
    
    //CONSTRUCTOR
    init: function(){
        //Setup Stage
        this.div = document.getElementById("t1html5game");
        this._canvas = document.getElementById('canvas');
        this._$canvas = $(this._canvas);
        
        this.canvasWidth = 480;
        this.canvasHeight = 845;
        this._canvas.width = this.canvasWidth;
        this._canvas.height = this.canvasHeight;
        
        this.centerCanvas();
        
        this._stage = new createjs.Stage(this._canvas);
        this._stage.enableMouseOver();
        createjs.Touch.enable(this._stage);
        createjs.Ticker.setFPS(30);
        
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        
        this.fpsLabel = new createjs.Text("-- fps","bold 25px Arial","#FFFFFF");
        this.fpsLabel.x = 10;
        this.fpsLabel.y = 10;
        
        this.DeviceText = new createjs.Text("","bold 25px Arial","#FFFFFF");
        this.DeviceText.x = 400;
        this.DeviceText.y = 10;
        
        if(this.mobile === true){
            GameConfig.Device = GameConfig.Mobile;
            this.DeviceText.text = "Mobile";
        }
        else{
            GameConfig.Device = GameConfig.Desktop;
            this.DeviceText.text = "Desktop";
        }
        
        window.addEventListener('resize',this.HandleResize.bind(this),true);
        window.addEventListener('orientationchange', this.HandleResize.bind(this), false);
        this.HandleResize();
        
        this.mobile = mobileAndTabletcheck();
        console.log("mobile:" + this.mobile);
        
        //Start Load Game
        this._loaded = false;
        this.loader = new Preloader(this);
        this.loader.startLoad();
    },
    
    loadFinished : function() {

        console.log("MainGame -> loadFinished!");
        this.ShowRotate = false;
        this._loaded = true;
        this.HandleResize();
        //Start Game!
        this.gameController = new GameController(this);
        loadSignal = true;
        this.fullScreen = false;
    },
    
    tick : function() {
        this.fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        this._stage.update();
    },
    
    HandleResize : function(){

        var _targetAreaWidthDp = ScreenWidth();
        var _targetAreaHeightDp = ScreenHeight();
        var scaleToFitX = _targetAreaWidthDp / this.canvasWidth;
        var scaleToFitY = _targetAreaHeightDp / this.canvasHeight;
        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
        this._scaleCanvas(optimalRatio);
        
        if(this._loaded === true)
        {
            //console.log("Size:" + _targetAreaWidthDp + "-" + _targetAreaHeightDp);
            if(_targetAreaWidthDp  > _targetAreaHeightDp)
            {
                //this.DeviceText.text += "0";
                //console.log("Show Rotate Device!");
                if(this.ShowRotate === false)
                {
                    console.log("Show Rotate Device!");
                    rotateScreen(this.div);
                    this._canvas.visible = false;
                    this.ShowRotate = true;
                }
            }else
            {
                //this.DeviceText.text += "1";
                if(this.ShowRotate === true)
                {
                    //this.DeviceText.text += "2";
                    this.ShowRotate = false;
                    if( $("body").find("#RotateScreen") !== null)
                    {
                        //this.DeviceText.text += "3";
                        console.log("Remove Rotate Device!");
                       $("body").find("#RotateScreen").remove();
                    }
                }
            }
        }
    },
    
    _scaleCanvas : function(scaleFactor){

        if (!this._$canvas){
                return;
        }
        if(this.lastScaleFactor){
            if (this.lastScaleFactor === scaleFactor) return;
        }
        this.lastScaleFactor = scaleFactor;

        this._$canvas.stop();
        this._$canvas.animate({
            width: Math.ceil(this.canvasWidth * scaleFactor),
            height: Math.ceil(this.canvasHeight * scaleFactor)

          }, 
          100
        );

    },
    
    centerCanvas: function(){
        if(!this._$canvas)
            return;
        this._$canvas.css("display","block");
        this._$canvas.css("margin-left","auto");
        this._$canvas.css("margin-right","auto");
        this._$canvas.css("margin-top","auto");
        this._$canvas.css("margin-bottom","auto");
    }
};

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

window.ScreenWidth = function(){

        var win = typeof window !== 'undefined' && window;
        var doc = typeof document !== 'undefined' && document;
        var docElem = doc && doc.documentElement;
        var a = docElem['clientWidth'], b = win['innerWidth'];
        return a < b ? b : a;
    };

window.ScreenHeight = function(){

        var win = typeof window !== 'undefined' && window;
        var doc = typeof document !== 'undefined' && document;
        var docElem = doc && doc.documentElement;
        var a = docElem['clientHeight'], b = win['innerHeight'];
        return a < b ? b : a;
    };