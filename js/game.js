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
		sky.loadData([
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1,461,462, -1,461,462, -1, -1,461,462, -1, -1,461,462, -1, -1,461,462, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1,481,482,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1,481,482,461,462,461,462,461,462, -1, -1, -1, -1, -1, -1, -1, -1,461,462,461,462,461,462, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1,481,482,481,482,481,482, -1, -1, -1, -1, -1, -1, -1, -1,481,482,481,482,481,482, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
		]);
		
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

/*
	Classes use http://prototypejs.org/learn/class-inheritance
	GameWorld Stores Current Game, Map and Game Entities
	Useful for GameObjects which are required to know
	the map and world that they exist in
*/
var GameWorld = Class.create({
	map: "undefined", //holds map
	game: "undefined", // holds world
	player: "undefined", // holds player
	civilians: "undefined", //NPC's we do not kill
	enemies: "undefined", //NPC's Bad guys
	initialize: function(game, map){
		//console.log("GameWorld initialize()");
		this.game = game;
		this.map = map;
	},
	getMap: function(){
		return this.map;
	},
	getGame: function(){
		return this.game;
	},
	setPlayer: function(value){
		this.player = value;
	},
	getPlayer: function(value){
		return this.player;
	},
	toString: function(){
		var result = "GameWorld:";
		result += this.game;
		result += this.map;
		return result;
	}
});

/*
	GameSprit Class stores a GameObjects image
*/
var GameSprite = Class.create({
	w: 0,
	h: 0,
	image: "undefined",
	initialize: function(width, height, image){
		this.w = width;
		this.h = height;
		this.image = image;
	},
	getWidth: function(){
		return this.w;
	},
	getHeight: function(){
		return this.h;
	},
	getImage: function(){
		return this.image;
	}
});

/*
	GameObject Class, GameObjects such as Player and NPCs will extend the GameObject
	class
*/
var GameObject = Class.create(Sprite, {
	x_i: 0, //x direction movement increment
	y_i: 0, //y direction movement increment
	world: "undefined",
	initialize: function(e){
		//console.log("GameObject initialize()");
		this.game = Game.instance;
		Sprite.call(this, e.getWidth(), e.getHeight());
		this.image = e.getImage();
	},
	input: function(value){
		//console.log("GameObject input()");
	},
	update: function(value){
		//console.log("GameObject update()");
	},
	setWorld: function(value){
		this.world = value; //sets the Game World
	},
	getWorld: function(){
		return this.world; //gets the Game World
	},
	setX: function(value){
		this.x = value;
	},
	getX: function(){
		return this.x;
	},
	setY: function(value){
		this.y = value;
	},
	getY: function(){
		return this.y;
	},
	setXIncrement: function(value){
		this.x_i = value;
	},
	getXIncrement: function(){
		return this.x_i;
	},
	setYIncrement: function(value){
		this.y_i = value;
	},
	getYIncrement: function(){
		return this.y_i;
	},
	walkIncrement: function(){
		this.walk++; //increments walk
	},
	walkDecrement: function(){
		this.walk--; //decrements walk
	},
	setWalk: function(value){
		this.walk = value; //returns the current Sprite walk (step normally 0 to n frame)
	},
	getWalk: function(){
		return this.walk; //returns the current Sprite walk (step normally 0 to n frame)
	},
	setFrame: function(value){
		this.frame = value; //sets the current Sprite frame
	},
	getFrame: function(){
		return this.frame; //returns the current Sprite frame
	},
	toString: function(){
		var result = "GameObject Details:";
		result += "x:" + this.getX() + " ";
		result += "y:" + this.getY() + " ";
		return result;
	}
});

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
