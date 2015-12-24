(function(window) {
SoundBtn = function() {
	this.initialize();
}
SoundBtn._SpriteSheet = new createjs.SpriteSheet({images: ["assets/Images/TitleScreen/SoundBtn.png"], frames: [[0,0,128,128,0,0,0],[0,128,85,118,0,0,0]]});
var SoundBtn_p = SoundBtn.prototype = new createjs.Sprite();
SoundBtn_p.Sprite_initialize = SoundBtn_p.initialize;
SoundBtn_p.initialize = function() {
	this.Sprite_initialize(SoundBtn._SpriteSheet);
	this.paused = false;
}
window.SoundBtn = SoundBtn;
}(window));

