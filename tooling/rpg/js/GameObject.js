enchant();

/*
	GameObject Class, GameObjects such as Player and NPCs will extend the GameObject
	class
*/
var GameObject = Class.create(Sprite, {
	x_i: 0, //x direction movement increment
	y_i: 0, //y direction movement increment
	world: "undefined",
	initialize: function(e){
		console.log("GameObject initialize()");
		this.game = Game.instance;
		Sprite.call(this, e.getWidth(), e.getHeight());
		this.image = e.getImage();
	},
	input: function(value){
		console.log("GameObject input()");
	},
	update: function(value){
		console.log("GameObject update()");
	},
	setWorld: function(value){
		this.world = value; //sets the Game World
	},
	getWorld: function(){
		return this.world; //gets the Game World
	},
	setX: function(value){
		this.x = value;
	},
	getX: function(){
		return this.x;
	},
	setY: function(value){
		this.y = value;
	},
	getY: function(){
		return this.y;
	},
	setXIncrement: function(value){
		this.x_i = value;
	},
	getXIncrement: function(){
		return this.x_i;
	},
	setYIncrement: function(value){
		this.y_i = value;
	},
	getYIncrement: function(){
		return this.y_i;
	},
	walkIncrement: function(){
		this.walk++; //increments walk
	},
	walkDecrement: function(){
		this.walk--; //decrements walk
	},
	setWalk: function(value){
		this.walk = value; //returns the current Sprite walk (step normally 0 to n frame)
	},
	getWalk: function(){
		return this.walk; //returns the current Sprite walk (step normally 0 to n frame)
	},
	setFrame: function(value){
		this.frame = value; //sets the current Sprite frame
	},
	getFrame: function(){
		return this.frame; //returns the current Sprite frame
	},
	toString: function(){
		var result = "GameObject Details:";
		result += "x:" + this.getX() + " ";
		result += "y:" + this.getY() + " ";
		return result;
	}
});