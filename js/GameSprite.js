enchant();

/*
	GameSprit Class stores a GameObjects image
*/
var GameSprite = Class.create({
	w: 0,
	h: 0,
	image: "undefined",
	initialize: function(width, height, image){
		this.w = width;
		this.h = height;
		this.image = image;
	},
	getWidth: function(){
		return this.w;
	},
	getHeight: function(){
		return this.h;
	},
	getImage: function(){
		return this.image;
	}
});