enchant();
var tileSize = 32;
var NPC_TYPE = { 
	CIVILIAN : { value: 0, name : 'civilian', image: './assets/characters/civilian.png' }, 
	ENEMY : { value: 1, name : 'enemy', image: './assets/characters/enemy.png' },
	FART : { value: 2, name : 'fart', image: './assets/characters/fart.png' }
};

var stage = new Group();
var player;
var stomach;
var game;
var map;
var music;
var fart_sound;
var burp_sound;
//Called when Game Loads
window.onload = function() {
    game = new Game(600, 320); //Size of game area
    game.fps = 15;
    game.preload('./assets/maps/map.png', 
				'./assets/characters/protagonist_normal.png', 
				'./assets/characters/protagonist_morphed.png', 
				'./assets/characters/enemy.png',
				'./assets/characters/civilian.png',
				'./assets/characters/fart.png',
				'./assets/characters/stomach_empty.png',
				'./assets/characters/stomach_gas.png',
				'./assets/sounds/burp.ogg',
				'./assets/sounds/fart.ogg',
				'./assets/sounds/background.ogg'); //pre-load images
	
    game.onload = function() {
		console.log("Game onload function Called");
	
		music = game.assets['./assets/sounds/background.ogg'];
		music.play();
		
		fart_sound = game.assets['./assets/sounds/fart.ogg'];
		burp_sound = game.assets['./assets/sounds/burp.ogg'];
		
        map = new Map(32, 32); //map and size of tiles
        map.image = game.assets['./assets/maps/map.png']; //map
                map.loadData(background_map,foreground_map);
                map.collisionData = collision_map

        var front = new Map(32, 32);
        front.image = game.assets['./assets/maps/map.png'];
                front.loadData(front_map);
         
		
		var sky = new Map(32, 32);
        sky.image = game.assets['./assets/maps/map.png'];
                sky.loadData(sky_map);
                //GameWorld reference to World (Game Map)
                //used by GameObject(s)
    
		//GameWorld reference to World (Game Map)
		//used by GameObject(s)
		var world = new GameWorld(game, map);
		
		
		//Create Player
		var image = new Surface(96, 128); //entire surface for object
        image.draw(game.assets['./assets/characters/protagonist_normal.png'], 0, 0, 96, 128, 0, 0, 96, 128); //image to draw		
		var sprite = new GameSprite(tileSize, tileSize, image); //GameSprite Object
		player = new Player(sprite); //Create Player and pass it GameSprite Object
		player.setX(96);
		player.setY(96);
		player.setMoving(false); //player is not moving
		player.setWorld(world); //set the players world
		world.setPlayer(player);//Add player to the Game World
		
		//Group of Sprites
        stage.addChild(map);
        stage.addChild(player);
        stage.addChild(front);
		stage.addChild(sky);
        game.rootScene.addChild(stage);
		
		for(EnemyPlaceI = 0; EnemyPlaceI < 4; EnemyPlaceI++)
		for(EnemyPlaceJ = 0; EnemyPlaceJ < 4; EnemyPlaceJ++)
			world.addEnemy(192+(EnemyPlaceI*32),192+(EnemyPlaceJ*32));

		stomach = new Surface(96,96);
		stomach.draw(game.assets['./assets/characters/stomach_empty.png'],0,0,96,96,0,0,96,96);
		game.rootScene.addChild(stomach);
		stomach = new Surface(96,96);
		stomach.draw(game.assets['./assets/characters/stomach_gas.png'],0,0,96,96,0,0,96,96);
		game.rootScene.addChild(stomach);
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
			
			if(music.currentTime >= music.duration){
				music.play(); //Everything initialises when this gets called too????
			}
			
			if(player.isFarting()){
				console.log("Farting!!!!!!!");
				fart_sound.play();
				player.setFart(false);
			}
			else if(player.isBurping()){
				console.log("Burping!!!!!!!");
				burp_sound.play();
				player.setBurp(false);
			}
        });
    };
    game.start();
};



















