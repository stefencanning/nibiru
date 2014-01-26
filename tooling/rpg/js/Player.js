enchant();

/*
	Player Class is a GameObject. Each time a Player Object passed through its 
	update(..) function the GameWorld needs to be updated
*/

var Player = Class.create(GameObject, {
	moving: false, //default moving is false
	direction: 0, //default direction is facing camera
	achievements: "undefined", // holds achievements
	player: "undefined", //world instance of Player JavaScript is 'Pass by Value' like
	initialize: function(value){
		//console.log("Player initialize()");
		GameObject.call(this, value);
		this.addEventListener(Event.ENTER_FRAME, this.update);
		this.addEventListener(Event.TOUCH_END, this.input);
	},
	//Override for GameObject function input()
	input: function(value){
		console.log("Calling Player Class input()");
	},
	
	//Override for GameObject function input()
	update: function(value){
		//console.log("Calling Player Class update()");
		
		this.player = this.getWorld().getPlayer(); //get GameWorld Player
		
		this.player.setFrame(this.player.getDirection() * 3 + this.player.getWalk());
		
		if(this.player.getMoving()){
			this.player.moveBy(this.player.getXIncrement(), this.player.getYIncrement());
			if (!(this.player.getWorld().getGame() % 3)) {
				this.player.walkIncrement();
				this.player.setWalk(this.player.getWalk() % 3);
            }
            if ((this.player.getXIncrement() && (this.player.getX()-8) % 16 == 0) || (this.player.getYIncrement() && this.player.getY() % 16 == 0)) {
				this.player.setMoving(false);
				this.player.setWalk(1);
            }
		}

		else {
			this.player.setXIncrement(0);
			this.player.setYIncrement(0);
			
			if (this.player.getWorld().getGame().input.left){
				//console.log("Input LEFT");
				this.player.setDirection(1);
                this.player.setXIncrement(-4);
			}
			else if (this.player.getWorld().getGame().input.right){
				//console.log("Input RIGHT");
				this.player.setDirection(2);
				this.player.setXIncrement(4);
			}
			else if (this.player.getWorld().getGame().input.up){
				//console.log("Input UP");
				this.player.setDirection(3);
				this.player.setYIncrement(-4);
            }
			else if (this.player.getWorld().getGame().input.down){
				//console.log("Input DOWN");
				this.player.setDirection(0);
				this.player.setYIncrement(4);
            }
			
			if (this.player.getXIncrement() || this.player.getYIncrement()){
				var x = this.player.getX() + (this.player.getXIncrement() ? this.player.getXIncrement() / Math.abs(this.player.getXIncrement()) * 16 : 0) + 16;
				var y = this.player.getY() + (this.player.getYIncrement() ? this.player.getYIncrement() / Math.abs(this.player.getYIncrement()) * 16 : 0) + 16;
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.player.setMoving(true);
					arguments.callee.call(this.player);
                }
            }
        }
		
		this.getWorld().setPlayer(this.player); //Update GameWorld Player
	},
	setMoving: function(value){
		this.player.moving = value;
	},
	getMoving: function(){
		return this.player.moving;
	},
	setDirection: function(value){
		this.player.direction = value;
	},
	getDirection: function(){
		return this.player.direction;
	}
});