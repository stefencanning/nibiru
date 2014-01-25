enchant();

//NPC Class is a GameObject
var NPC = Class.create(GameObject, {
	moving: false,
	direction: 0,
	type: "undefined", //Type of NPC
	npc: "undefined", //World instance of npc
	initialize: function(value, type){
		console.log("NPC initialize()");
		this.type = type;
		GameObject.call(this, value);
		this.addEventListener(Event.ENTER_FRAME, this.update);
	},
	//Override for GameObject function input()
	update: function(value){
		//console.log("Calling NPC Class update()");
		//console.log(this.toString());
		//console.log(this.type);
		
		//var npc = this.getWorld().getEnemy(this.id);//Get the NPC located in the Game World based on ID
		
		if(this.type == NPC_TYPE.ENEMY){
			//console.log("Enemy NPC....TARGETING");
		}
		else if(this.type == NPC_TYPE.CIVILIAN){
			//console.log("Civilian NPC....BUSY WORKING");
		}
		else{
			//console.log("NPC undefined");
		}
	},
	setMoving: function(value){
		this.moving = value;
	},
	getMoving: function(){
		return this.moving;
	},
	setDirection: function(value){
		this.direction = value;
	},
	getDirection: function(){
		return this.direction;
	},
	getType: function(){
		return this.type;
	}
});