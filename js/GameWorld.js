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
	enemies: [], //NPC's Bad guys
	gas: [],
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
	getEnemies: function(){
		return this.enemies;
	},
	setPlayer: function(value){
		this.player = value;
	},
	getPlayer: function(value){
		return this.player;
	},
	setCloud: function(value,valueId){
		for(cloudI = 0; cloudI < this.gas.length; cloudI++)
		{
			if(this.gas[cloudI]!=null)
				if(this.gas[cloudI].id == valueId)
					this.gas[cloudI] = value;
		}
	},
	getCloud: function(value){
		for(cloudI = 0; cloudI < this.gas.length; cloudI++)
		{
			if(this.gas[cloudI] != null)
				if(this.gas[cloudI].id == value)
					return this.gas[cloudI];
		}
	},
	getClouds: function(){
		return this.gas;
	},
	addEnemy: function(value){
		place = false;
		for(i = 0; i < this.enemies.length; i++)
		{
			if(this.enemies[i] == null)
			{
				this.enemies[i] = value;
				place = true;
				break;
			}
		}
		if(!place)
		{
		this.enemies[this.enemies.length] = value;
		}
	},
	addCloud: function(x,y,p){
		place = true;
		
		for(cloudCheckI = 0; cloudCheckI < this.gas.length; cloudCheckI++)
		{
			if(this.gas[cloudCheckI]!=null)
			{
				if(this.gas[cloudCheckI].getX() == x && this.gas[cloudCheckI].getY() == y)
				{
					place = false;
				}
			}
		}
		
		if(place)
		{
		var image = new Surface(32, 32); //entire surface for object
		image.draw(this.game.assets[NPC_TYPE.FART.image], 0, 0, 32, 32, 0, 0, 32, 32); //image to draw		
		sprite = new GameSprite(tileSize, tileSize, image); //GameSprite Object
		var gas = new GasCloud(sprite, NPC_TYPE.FART); //Create NPC and pass it GameSprite Object
		gas.setX(x);
		gas.setY(y);
		gas.setWorld(this);
		gas.potency = p;
		gas.maxPotency = p;
		
		this.addGas(gas);
		stage.addChild(gas);
		}
	},	
	addGas: function(value){
		place = false;
		for(gasFindI = 0; gasFindI < this.gas.length; gasFindI++)
		{
			if(this.gas[gasFindI] == null)
			{
				value.id = gasFindI;
				this.gas[gasFindI] = value;
				place = true;
				break;
			}
		}
		if(!place)
		{
		value.id = this.gas.length;
		this.gas[this.gas.length] = value;
		}
		console.log(this.gas.length);
	},
	cleanClouds: function(){
		for(CloudCleanI = 0;CloudCleanI < this.gas.length; CloudCleanI++)
		{
			if(this.gas[CloudCleanI]!=null)
				if(this.gas[CloudCleanI].dead)
					this.killCloud(this.gas[CloudCleanI].id);
		}
	},
	killCloud: function(KillID){
		for( NavigateI = 0; NavigateI < this.gas.length; NavigateI++)
		{
			if(this.gas[NavigateI] != null)
			{
				if(this.gas[NavigateI].id == KillID)
				{
					for(NavigateJ = 0; NavigateJ < this.game.rootScene.childNodes.length; NavigateJ++)
					{
						if(this.game.rootScene.childNodes[NavigateJ] != null)
						{
							try
							{
								this.game.rootScene.childNodes[NavigateJ].removeChild(this.getClouds()[NavigateI]);
							}
							catch(e)
							{
								console.log("Phew, saved you there");
							}
						}
					}
					this.gas[NavigateI] = null;
				}
			}
		}
	},
	killEnemy: function(KillX,KillY){
		for( NavigateI = 0; NavigateI < this.enemies.length; NavigateI++)
		{
			if(this.enemies[NavigateI] != null)
			{
				if(this.enemies[NavigateI].getX() == KillX && this.enemies[NavigateI].getY() == KillY)
				{
					for(NavigateJ = 0; NavigateJ < this.game.rootScene.childNodes.length; NavigateJ++)
					{
						if(this.game.rootScene.childNodes[NavigateJ] != null)
						{
							try
							{
								this.game.rootScene.childNodes[NavigateJ].removeChild(this.getEnemies()[NavigateI]);
							}
							catch(e)
							{
								console.log("Phew, saved you there");
							}
						}
					}
					this.enemies[NavigateI] = null;
				}
			}
		}
	},
	toString: function(){
		var result = "GameWorld:";
		result += this.game;
		result += this.map;
		return result;
	}
});