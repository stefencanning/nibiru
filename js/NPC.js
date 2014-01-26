enchant();

//NPC Class is a GameObject
var NPC = Class.create(GameObject, {
    moving: false,
    direction: 0,
    type: "undefined", //Type of NPC
    npc: "undefined", //World instance of npc
    targetPositionX: 0,
    targetPositionY: 0,
    targetPosition: [],
    cantGoRight: false,
	health: 24,
    count: 1,
    initialize: function (value, type) {
        console.log("NPC initialize()");
        this.type = type;
        GameObject.call(this, value);
        this.addEventListener(Event.ENTER_FRAME, this.update);


    },
    //Override for GameObject function input()
    update: function (value) {
        //console.log("Calling NPC Class update()");
        //console.log(this.toString());
        //console.log(this.type);
        if (this.moving == true) {
            this.npc = this.getWorld().getEnemy(this.id);
            if (this.npc != null) {
                //var npc = this.getWorld().getEnemy(this.id);//Get the NPC located in the Game World based on ID
                //14,15
                if (this.npc.getY() >= this.targetPositionY - 2 && this.npc.getX() >= this.targetPositionX - 2 &&
        this.npc.getY() <= this.targetPositionY + 2 && this.npc.getX() <= this.targetPositionX + 2
        && this.count < this.targetPosition.length) {

                    this.targetPositionX = this.targetPosition[this.count].getPositionX() * 32;
                    this.targetPositionY = this.targetPosition[this.count].getPositionY() * 32;
                    this.count++;

                }
                if (this.targetPositionY > this.npc.getY()/*&& this.getWorld().getMap().hitTest(this.npc.getX(),this.npc.getY() + 32) == false*/) {
                    this.npc.setY(this.npc.getY() + 4);
                    this.npc.setFrame(0);
                }
                else if (this.targetPositionY < this.npc.getY()/* && this.getWorld().getMap().hitTest(this.npc.getX() ,this.npc.getY()- 32) == false*/) {
                    this.npc.setY(this.npc.getY() - 4);
                    this.npc.setFrame(9);
                }
                else if (this.targetPositionX > this.npc.getX() /*&& this.getWorld().getMap().hitTest(this.npc.getX() + 32,this.npc.getY()) == false*/) {
                    this.npc.setX(this.npc.getX() + 4);
                    this.npc.setFrame(6);
                }
                else if (this.targetPositionX < this.npc.getX() /*&& this.getWorld().getMap().hitTest(this.npc.getX() - 32,this.npc.getY()) == false*/) {
                    this.npc.setX(this.npc.getX() - 4);
                    this.npc.setFrame(3);
                }
            }
        }
        if (this.type == NPC_TYPE.ENEMY) {
            //console.log("Enemy NPC....TARGETING");
        }
        else if (this.type == NPC_TYPE.CIVILIAN) {
            //console.log("Civilian NPC....BUSY WORKING");
        }
        else {
            //console.log("NPC undefined");
        }
    },
    setTargetPosition: function (value) {
        this.targetPosition = value;
        this.targetPositionX = this.targetPosition[0].getPositionX() * 32;
        this.targetPositionY = this.targetPosition[0].getPositionY() * 32;
    },
    getTargetPosition: function () {
        return this.targetPosition;
    },
    setMoving: function (value) {
        this.moving = value;
    },
    getMoving: function () {
        return this.moving;
    },
    setDirection: function (value) {
        this.direction = value;
    },
    getDirection: function () {
        return this.direction;
    },
    getType: function () {
        return this.type;
    },
    setId: function (value) {
        this.id = value;
    }
});