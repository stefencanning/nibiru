enchant();

var GasCloud = Class.create(GameObject, {
	moving: false, //default moving is false
	direction: 0, //default direction is facing camera
	achievements: "undefined", // holds achievements
	GasCloud: "undefined", //world instance of GasCloud JavaScript is 'Pass by Value' like
	time: 0,
	id:0,
	potency: 0,
	maxPotency: 0,
	initialize: function(value){
		//console.log("GasCloud initialize()");
		GameObject.call(this, value);
		this.addEventListener(Event.ENTER_FRAME, this.update);
		this.addEventListener(Event.TOUCH_END, this.input);
	},
	//Override for GameObject function input()
	input: function(value){
		console.log("Calling GasCloud Class input()");
	},
	
	//Override for GameObject function input()
	update: function(value){
		//console.log("Calling GasCloud Class update()");
		
		this.GasCloud = this.getWorld().getCloud(this.id); //get GameWorld GasCloud
		this.dead = false;
		this.GasCloud.setFrame(this.GasCloud.getWalk());
		this.GasCloud.attack([[0,0]],1);
			this.GasCloud.time += 1;
			
		if (this.GasCloud.time == 15){
			if(this.GasCloud.potency > 0)
			{
				this.GasCloud.potency-=1;
				var x = this.GasCloud.getX() + 32;
				var y = this.GasCloud.getY();
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.GasCloud.getWorld().addCloud(x,y,this.GasCloud.potency);
                }
				
				x = this.GasCloud.getX();
				y = this.GasCloud.getY() + 32;
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.GasCloud.getWorld().addCloud(x,y,this.GasCloud.potency);
                }
				
				x = this.GasCloud.getX() - 32;
				y = this.GasCloud.getY();
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.GasCloud.getWorld().addCloud(x,y,this.GasCloud.potency);
                }
				
				x = this.GasCloud.getX();
				y = this.GasCloud.getY() - 32;
				
				//Check that player is not moving to a position outside Game map
				if (0 <= x && x < this.getWorld().getMap().width && 0 <= y && y < this.getWorld().getMap().height && !this.getWorld().getMap().hitTest(x, y)) {
					this.GasCloud.getWorld().addCloud(x,y,this.GasCloud.potency);
                }
            }
			else if(this.GasCloud.maxPotency > 0)
			{
				this.GasCloud.maxPotency-=1;
			}
			else
			{
				this.dead = true;
			}
			this.GasCloud.time = 0;
        }
		
		this.getWorld().setCloud(this.GasCloud,this.id); //Update GameWorld Player
	},
	attack: function(values, damage){
		for(attackI = 0; attackI < values.length; attackI++)
		{
			this.GasCloud.getWorld().killEnemy(this.GasCloud.getX() + (values[attackI][0]*32),this.GasCloud.getY() + (values[attackI][1]*32), damage);
		}
	},
	setPotency: function(value){
		this.potency = value;
	},
});