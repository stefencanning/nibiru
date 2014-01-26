enchant();

var NPC_TYPE = { 
	CIVILIAN : { value: 0, name : 'civilian', image: './assets/characters/civilian.png' }, 
	ENEMY : { value: 1, name : 'enemy', image: './assets/characters/enemy.png' },
};

//Called when Game Loads
window.onload = function() {
    var game = new Game(600, 320); //Size of game area
    game.fps = 15;
    game.preload('./assets/maps/map.png', 
				'./assets/characters/protagonist_normal.png', 
				'./assets/characters/protagonist_morphed.png', 
				'./assets/characters/enemy.png',
				'./assets/characters/civilian.png'); //pre-load images
	
    game.onload = function() {
        var map = new Map(16, 16); //map and size of tiles
        map.image = game.assets['./assets/maps/map.png']; //map
		map.loadData(background_map, foreground_map);
		map.collisionData = collision_map;

        var front = new Map(16, 16);
        front.image = game.assets['./assets/maps/map.png'];
		front.loadData(front_map);
		
		var sky = new Map(16, 16);
        sky.image = game.assets['./assets/maps/map.png'];
		sky.loadData(sky_map);
		
		//GameWorld reference to World (Game Map)
		//used by GameObject(s)
		var world = new GameWorld(game, map);

		//Create Player
		var image = new Surface(96, 128); //entire surface for object
        image.draw(game.assets['./assets/characters/protagonist_normal.png'], 0, 0, 96, 128, 0, 0, 96, 128); //image to draw		
		var sprite = new GameSprite(32, 32, image); //GameSprite Object
		var player = new Player(sprite); //Create Player and pass it GameSprite Object
		player.setX(100);
		player.setY(100);
		player.setMoving(false); //player is not moving
		player.setWorld(world); //set the players world
		
		world.setPlayer(player);//Add player to the Game World
		
		//Create NPC
		image = new Surface(96, 128); //entire surface for object
        image.draw(game.assets[NPC_TYPE.ENEMY.image], 0, 0, 96, 128, 0, 0, 96, 128); //image to draw		
		sprite = new GameSprite(32, 32, image); //GameSprite Object
		var npc = new NPC(sprite, NPC_TYPE.ENEMY); //Create NPC and pass it GameSprite Object
		npc.setX(200);
		npc.setY(200);
		npc.setMoving(false); //NPC is not moving
		npc.setWorld(world); //set the NPC's world

		
		//Group of Sprites
        var stage = new Group();
        stage.addChild(map);
        stage.addChild(player);
		stage.addChild(npc);
        stage.addChild(front);
		stage.addChild(sky);
        game.rootScene.addChild(stage);

		//GamePad input
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        game.rootScene.addChild(pad);

		//Scroll Game Screen
        game.rootScene.addEventListener(Event.ENTER_FRAME, function(e) {
            var x = Math.min((game.width  - 16) / 2 - player.getX(), 0); //find min (floor is Zero)
            var y = Math.min((game.height - 16) / 2 - player.getY(), 0); //find min (floor is Zero)
            x = Math.max(game.width,  x + map.width)  - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = x;
            stage.y = y;
        });
    };
    game.start();
};