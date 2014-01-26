enchant();
var AStar = Class.create({
    open: new Array(),
    close: new Array(),
    start: null,
    goal: null,
    currentNode: null,
    returningNodes: new Array(),
    aStarAlgorithm: function (s, g, allNodes) {
        // store in an array search through and work on the lowest weight

        this.open.push(s);
        this.currentNode = this.open[0];
        this.returningNodes = [];
        this.goal = g;
        this.start = s;

        this.currentNode.setF(this.distanceCal(this.start.positionX, this.start.positionY, this.goal.positionX, this.goal.positionY));
        goalReached = false;
        while (this.open.length > 0 && goalReached == false) {
            if ((this.currentNode.getPositionY()) - 1 >= 0
            && allNodes[this.currentNode.getPositionX()][(this.currentNode.getPositionY()) - 1].getMarked() == false) {
                temp = allNodes[(this.currentNode.getPositionX())][(this.currentNode.getPositionY()) - 1];
                this.goalreach = this.CheckGoal(temp);
                if (this.goalreach == true) {
                    var woooop;
                }
                this.addNode(temp);
            }

            if ((this.currentNode.getPositionY()) + 1 <= allNodes.length - 1
            && allNodes[this.currentNode.getPositionX()][(this.currentNode.getPositionY()) + 1].getMarked() == false) {
                temp = allNodes[(this.currentNode.getPositionX())][(this.currentNode.getPositionY()) + 1];
                this.goalreach = this.CheckGoal(temp);
                if (this.goalreach == true) {
                    var woooop;
                }
                this.addNode(temp);
            }
            if ((this.currentNode.getPositionX()) - 1 >= 0
            && allNodes[this.currentNode.getPositionX() - 1][(this.currentNode.getPositionY())].getMarked() == false) {
                temp = allNodes[(this.currentNode.getPositionX()) - 1][(this.currentNode.getPositionY())];
                this.goalreach = this.CheckGoal(temp);
                if (this.goalreach == true) {
                    var woooop;
                }
                this.addNode(temp);
            }
            if ((this.currentNode.getPositionX()) + 1 <= allNodes.length - 1
            && allNodes[this.currentNode.getPositionX() + 1][(this.currentNode.getPositionY())].getMarked() == false) {
                temp = allNodes[(this.currentNode.getPositionX()) + 1][(this.currentNode.getPositionY())];
                this.goalreach = this.CheckGoal(temp);
                if (this.goalreach == true) {
                    var woooop;
                }
                this.addNode(temp);
            }
            this.close.push(this.currentNode);
            this.remake(this.currentNode);
            this.getSmallest();

        }
        while (this.goal != this.start) {
            this.returningNodes.unshift(this.goal);
            this.goal = this.goal.getPrevious();
        }
        return this.returningNodes;

    },

    CheckGoal: function (temp) {
        if (this.goal == temp) {
            return true;
        }
        else {
            return false;
        }
    },

    remake: function (nodeRemove) {
        array = this.open;
        this.open = [];
        for (var i = 0; i < array.length; i++) {
            if (nodeRemove != array[i]) {
                this.open.push(array[i]);
            }
        }
    },

    getSmallest: function () {
        this.currentNode = this.open[0];
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i].getF() < this.currentNode.getF()) {
                this.currentNode = this.open[i];
            }
        }

    },

    addNode: function (node) {
        node.setG(this.distanceCal(node.getPositionX() * 32, node.getPositionY() * 32, this.start.getPositionX() * 32, this.start.getPositionY() * 32));
        node.setH(this.distanceCal(node.getPositionX() * 32, node.getPositionY() * 32, this.goal.getPositionX() * 32, this.goal.getPositionY() * 32));
        node.setF();
        node.setMarked(true);
        node.setPrevious(this.currentNode);
        this.open.push(node);
    },

    distanceCal: function (startPosX, startPosY, finishPosX, finishPosY) {
        x = (startPosX - finishPosX) * (startPosX - finishPosX);
        y = (startPosY - finishPosY) * (startPosY - finishPosY);

        answer = Math.sqrt(x + y);

        return answer;
    }
});
