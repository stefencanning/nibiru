﻿enchant();
var nodes = null;
var AStar = Class.create({
    open: new Array(),
    close: new Array(),
    start: null,
    goal: null,
    currentNode: null,
    returningNodes: new Array(),

    world: null,
    aStarAlgorithm: function (s, g) {
        // store in an array search through and work on the lowest weight
        if (nodes == null) {
            nodes = new Array();
            for (var i = 0; i < map.height / 32; i++) {
                nodes.push(new Array());
            }

            for (var i = 0; i < map.height / 32; i++) {
                for (var k = 0; k < map.width / 32; k++) {
                    nodes[i][k] = new NodeClass(i, k);
                }
            }
        }
        else {

            for (var i = 0; i < map.height / 32; i++) {
                for (var k = 0; k < map.width / 32; k++) {
                    nodes[i][k].setPrevious(0);
                    nodes[i][k].setMarked(false);
                }
            }
        }
        this.open.push(nodes[s[0]][s[1]]);
        this.currentNode = this.open[0];
        this.returningNodes = [];
        this.goal = nodes[g[0]][g[1]];
        this.start = nodes[s[0]][s[1]];
        this.currentNode.setH(this.distanceCal(this.start.positionX, this.start.positionY, this.goal.positionX, this.goal.positionY));
        this.currentNode.setF();
        goalReached = false;
        while (this.open.length > 0 && goalReached == false) {

            if ((this.currentNode.getPositionY()) - 1 >= 0
            && nodes[this.currentNode.getPositionX()][(this.currentNode.getPositionY()) - 1].getMarked() == false
            && this.world.getMap().hitTest(this.currentNode.getPositionX() * 32, (this.currentNode.getPositionY() - 1) * 32) == false) {

                this.checkingNode(this.currentNode.getPositionX(), this.currentNode.getPositionY() - 1, nodes);

            }

            if ((this.currentNode.getPositionY()) + 1 <= nodes.length - 1
            && nodes[this.currentNode.getPositionX()][(this.currentNode.getPositionY()) + 1].getMarked() == false
            && this.world.getMap().hitTest(this.currentNode.getPositionX() * 32, (this.currentNode.getPositionY() + 1) * 32) == false) {

                this.checkingNode(this.currentNode.getPositionX(), this.currentNode.getPositionY() + 1, nodes);

            }

            if ((this.currentNode.getPositionX()) - 1 >= 0
            && nodes[this.currentNode.getPositionX() - 1][(this.currentNode.getPositionY())].getMarked() == false
            && this.world.getMap().hitTest((this.currentNode.getPositionX() - 1) * 32, this.currentNode.getPositionY() * 32) == false) {

                this.checkingNode(this.currentNode.getPositionX() - 1, this.currentNode.getPositionY(), nodes);

            }

            if ((this.currentNode.getPositionX()) + 1 <= nodes.length - 1
            && nodes[this.currentNode.getPositionX() + 1][(this.currentNode.getPositionY())].getMarked() == false
            && this.world.getMap().hitTest((this.currentNode.getPositionX() + 1) * 32, this.currentNode.getPositionY() * 32) == false) {

                this.checkingNode(this.currentNode.getPositionX() + 1, this.currentNode.getPositionY(), nodes);

            }

            this.close.push(this.currentNode);
            this.remake(this.currentNode);
            this.getSmallest();

        }
        while (this.goal != this.start) {
            this.returningNodes.unshift(this.goal);
            if (this.goal != this.start) {
                this.goal = this.goal.getPrevious();
            }
        }
        return this.returningNodes;


    },
    checkingNode: function (x, y, allNodes) {

        temp = allNodes[x][y];
        this.goalreach = this.CheckGoal(temp);
        this.addNode(temp);

    },

    setWorld: function (value) {
        this.world = value;
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
