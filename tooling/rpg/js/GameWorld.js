enchant();

/*
	Classes use http://prototypejs.org/learn/class-inheritance
	GameWorld Stores Current Game, Map and Game Entities
	Useful for GameObjects which are required to know
	the map and world that they exist in
*/
var GameWorld = Class.create({
	map: "undefined", //holds map
	game: "undefined", // holds world
	player: "undefined", // holds player
	civilians: "undefined", //NPC's we do not kill
	enemies: "undefined", //NPC's Bad guys
	initialize: function(game, map){
		//console.log("GameWorld initialize()");
		this.game = game;
		this.map = map;
	},
	getMap: function(){
		return this.map;
	},
	getGame: function(){
		return this.game;
	},
	setPlayer: function(value){
		this.player = value;
	},
	getPlayer: function(value){
		return this.player;
	},
	toString: function(){
		var result = "GameWorld:";
		result += this.game;
		result += this.map;
		return result;
	}
});

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