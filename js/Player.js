enchant();

/*
	Player Class is a GameObject. Each time a Player Object passed through its 
	update(..) function the GameWorld needs to be updated
*/
var Player = Class.create(GameObject, {
	moving: false, //default moving is false
	direction: 0, //default direction is facing camera
	achievements: "undefined", // holds achievements
	health: 48,
	gas:0,
	point:0,
	player: "undefined", //world instance of Player JavaScript is 'Pass by Value' like
	farting: "undefined",
	burping: "undefined",
	initialize: function(value){
		console.log("Player initialize()");
		GameObject.call(this, value);
		this.addEventListener(Event.ENTER_FRAME, this.update);
		this.addEventListener(Event.TOUCH_END, this.input);
		this.space = false;
		this.X = false;
		this.C = false;
		this.B = false;
		this.F = false;
		this.farting = false;
		this.burping = false;
	},
	fart: function(){
		console.log('Stand back!!');
		this.farting = true;
	},
	setFart: function(value){
		this.farting = value;
	},
	isFarting: function(){
		if(this.farting)
			return true;
		else
			return false;
	},
	burp: function(){
		console.log('Onions!!');
		this.burping = true;
	},
	setBurp: function(value){
		this.burping = value;
	},
	isBurping: function(){
		if(this.burping)
			return true;
		else
			return false;
	},
	//Override for GameObject function input()
	input: function(value){
		console.log("Calling Player Class input()");
	},
	
	//Override for GameObject function input()
	update: function(value){
		//console.log("Calling Player Class update()");
		
		this.player = this.getWorld().getPlayer(); //get GameWorld Player
		
		//burp_sound.play();
		this.player.setFrame(this.player.getDirection() * 3 + this.player.getWalk());
		if(this.player.gas < 95)
			this.player.gas +=1;
		if(this.player.getMoving()){
			this.player.moveBy(this.player.getXIncrement(), this.player.getYIncrement());
			if (!(this.player.getWorld().getGame() % 3)) {
				this.player.walkIncrement();
				this.player.setWalk(this.player.getWalk() % 3);
            }
            if ((this.player.getXIncrement() && (this.player.getX()) % 32 == 0) || (this.player.getYIncrement() && this.player.getY() % 32 == 0)) {
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
			else if (this.player.getWorld().getGame().input.space){//axe
				if(!this.player.space)
				{
					this.player.attack([[-1,1],[0,1],[1,1]], 8);
				}
				this.player.space = true;
				this.player.X = false;
				this.player.C = false;
				this.player.B = false;
				this.player.F = false;
			}
			else if (this.player.getWorld().getGame().input.X||this.player.getWorld().getGame().input.x){//slam
				if(!this.player.X)
				{
					this.player.attack([[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]], 5);
				}
				this.player.space = false;
				this.player.X = true;
				this.player.C = false;
				this.player.B = false;
				this.player.F = false;
			}
			else if (this.player.getWorld().getGame().input.C||this.player.getWorld().getGame().input.c){//stomp
				if(!this.player.C)
				{
					this.player.attack([[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]], 5);
				}
				this.player.space = false;
				this.player.X = false;
				this.player.C = true;
				this.player.B = false;
				this.player.F = false;
			}
			else if ((this.player.getWorld().getGame().input.B||this.player.getWorld().getGame().input.b) && this.player.gas >= 30){//burp
				
				if(!this.player.B)
				{
					this.player.burp();
					this.player.gas -= 30;
					this.player.attack([[0,1],[-1,2],[0,2],[1,2]], 24);
				}
				this.player.space = false;
				this.player.X = false;
				this.player.C = false;
				this.player.B = true;
				this.player.F = false;
			}
			else if ((this.player.getWorld().getGame().input.F||this.player.getWorld().getGame().input.f) && this.player.gas >= 90){//fart
				
				if(!this.player.F)
				{
					this.player.fart();
					this.player.gas -= 90;
					this.player.getWorld().addCloud(this.player.getX(),this.player.getY(), 4);
				}
				this.player.space = false;
				this.player.X = false;
				this.player.C = false;
				this.player.B = false;
				this.player.F = true;
			}
			else
			{
				this.player.space = false;
				this.player.X = false;
				this.player.C = false;
				this.player.B = false;
				this.player.F = false;
			}
			
			if (this.player.getXIncrement() || this.player.getYIncrement()){
				var x = this.player.getX() + (this.player.getXIncrement() ? this.player.getXIncrement() / Math.abs(this.player.getXIncrement()) * 32 : 0) + 16;
				var y = this.player.getY() + (this.player.getYIncrement() ? this.player.getYIncrement() / Math.abs(this.player.getYIncrement()) * 32 : 0) + 16;
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.player.setMoving(true);
					arguments.callee.call(this.player);
                }
            }
        }
		stomach.clear();
		stomach.draw(game.assets['./assets/characters/stomach_gas.png'],0,96-(this.player.gas+1),96,(this.player.gas+1),0,96-(this.player.gas+1),96,(this.player.gas+1));
		this.getWorld().cleanClouds();
		this.getWorld().setPlayer(this.player); //Update GameWorld Player
	},
	attack: function(values, damage){
		for(attackI = 0; attackI < values.length; attackI++)
		{
			if(this.player.getDirection() == 0)
				this.player.getWorld().killEnemy(this.player.getX() + (values[attackI][0]*32),this.player.getY()+ (values[attackI][1]*32), damage);
			if(this.player.getDirection() == 1)
				this.player.getWorld().killEnemy(this.player.getX() - (values[attackI][1]*32),this.player.getY()+ (values[attackI][0]*32), damage);
			if(this.player.getDirection() == 2)
				this.player.getWorld().killEnemy(this.player.getX() + (values[attackI][1]*32),this.player.getY()- (values[attackI][0]*32), damage);
			if(this.player.getDirection() == 3)
				this.player.getWorld().killEnemy(this.player.getX() + (values[attackI][0]*32),this.player.getY()- (values[attackI][1]*32), damage);
		}
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