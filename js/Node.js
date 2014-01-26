enchant();
var Node = Class.create({

    f: Infinity,
    g: 0,
    h: 0,
    positionX: 0,
    positionY: 0,
    nextNode: null,
    marked: false,
    correctPath: false,
    NextX: 0,
    NextY: 0,
    initialize: function (posX, posY) {
        this.positionX = posX;
        this.positionY = posY;
    },
    //Override for GameObject function input()
    update: function (value) {
        //console.log("Calling NPC Class update()");
        //console.log(this.toString());
        //console.log(this.type);

        //var npc = this.getWorld().getEnemy(this.id);//Get the NPC located in the Game World based on ID

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
    setPosition: function (valueX, valueY) {
        this.positionX = valueX;
        this.positionY = valueY;
    },
    getPositionX: function () {
        return this.positionX;
    },
    getPositionY: function () {
        return this.positionY;
    },
    setPrevious: function (value) {
        this.previous = value;
    },
    getPrevious: function () {
        return this.previous;
    },
    setNextNode: function (value) {
        this.nextNode = value;
    },
    getNextNode: function () {
        return this.nextNode;
    },
    setMarked: function (value) {
        this.marked = value;
    },
    getMarked: function () {
        return this.marked;
    },
    setF: function () {
        if (this.f > this.g + this.h) {
            this.f = this.g + this.h;
        }
    },
    getF: function () {
        return this.f;
    },
    setG: function (value) {
        this.g = value;
    },
    getG: function () {
        return this.G;
    },
    setH: function (value) {
        this.H = value;
    },
    getH: function () {
        return this.h;
    }
});
