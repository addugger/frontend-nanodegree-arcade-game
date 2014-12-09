/** 
 * Returns a random float between min and max (inclusive).
 * @param {number} min Lower bound that can be returned.
 * @param {number} max Upper bound that can be returned.
 * @returns {Number} Random float between min and max.
 */
function randomValFromInterval(min, max)
{
    return Math.random()*(max-min+1) +min;
}

/** 
 * Returns a random integer between min and max (inclusive).
 * @param {number} min Lower bound that can be returned.
 * @param {number} max Upper bound that can be returned.
 * @returns {Number} Random int between min and max.
 */
function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Returns a random enemy "speed" value.
 * @returns {Number} Random enemy speed.
 */
function getEnemySpeed()
{
	return randomValFromInterval(1, 3) * 75;
}

/**
 * Returns a random stone row y value.
 * @returns {number} Y value on canvas corresponding to one of the
 *     stone rows on the grid.
 */
function getEnemyRow()
{
	return GRID["stoneRow" + randomIntFromInterval(1, 3)];
}

/**
 * Returns a random amount of delay time. Used to determine how long
 * an enemy must wait before beginning it's movement across the screen.
 * @return {Number} Random enemy delay time.
 */
function getEnemyWait()
{
	return randomValFromInterval(.2, 2);
}

/**
 * Contains general information about the grid defined by the background
 * art in pixels.
 * @const
 */
var GRID = {
	// width of grid cell in pixels
	cellWidth: 101,
	
	// height of grid cell in pixels
	cellHeight: 83,
	
	// a sprite with this y value will
 	// be in the water row
 	waterRow1: -10,
 	
 	// a sprite with this y value will
 	// be in the first (top) stone row
 	stoneRow1: -20 + (83),
 	
 	// a sprite with this y value will
 	// be in the second (middle) stone row
 	stoneRow2: -20 + (83 * 2),
 	
 	// a sprite with this y value will
 	// be in the third (bottom) stone row
 	stoneRow3: -20 + (83 * 3),
 	
 	// a sprite with this y value will
 	// be in the first (top) grass row
 	grassRow1: -20 + (83 * 4),
 	
 	// a sprite with this y value will
 	// be in the second (bottom) grass row
 	grassRow2: -20 + (83 * 5),
 	
 	// Horizontal distance used to indicate
 	// a sprite is off the screen on the left side
 	offScreenLeft: -101,
 	
 	// Vertical distance used to indicate
 	// a sprite is off the screen on the right side
 	offScreenRight: 101 * 5,
 	
 	// Columns are 0 indexed from left to right
 	
 	// Horizontal location of sprite is the first
 	// row on the left
 	col0: 0,

	// Horizontal location of sprite is the second
	// row from the left
	col1: 0 + 101,
	
	// Horizontal location of sprite is the third
	// row from the left
	col2: 0 + (101 * 2),
	
	//Horizontal location of sprite is the fourth
	// row from the left
	col3: 0 + (101 * 3),
	
	// Horizontal location of sprite is the far
	// right row
	col4: 0 + (101 * 4)
};

/** 
 * Enemies our player must avoid
 */
var Enemy = function(x, row, speed, waitTime) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // The horizontal location of the enemy on the
    // canvas in pixels.
    this.x = x;
    
    // The vertical location of the enemy on the
    // canvas in pixels.
    this.y = row;
    
    // The "speed" at which the enemy will move
    // across the screen
    this.speed = speed;
    
    // For when an enemy is off-screen.   Determines how
    // long to wait before moving the enemy across the screen
    this.waitTime = waitTime;
};

/**
 * Update the enemy's position.
 * @param {number} dt A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
	//if wait time is > 0, update wait time
	if (this.waitTime > 0)
	{
		this.waitTime = this.waitTime - dt;
	}
	//else, change enemy location
	else
	{
		//check if enemy is off screen on the right
		if (this.x >= GRID.offScreenRight)
		{
			this.reset();
		}
		//else, move the enemy across the screen
		else
		{
			this.x = this.x + (this.speed * dt);
		}
	}
}

/**
 * Draw the enemy on the canvas.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Initializes a new enemy object off the screen to the left, on a
 * random row, with a random speed and a random wait time.
 */
Enemy.prototype.init = function() {
	return new Enemy(
			GRID.offScreenLeft,
			getEnemyRow(),
			getEnemySpeed(),
			getEnemyWait()
		)
}

/**
 * Reset enemy object to left of the screen with a new speed and row, and sets
 * waitTime to 0, so it starts across the page immediately.
 */
Enemy.prototype.reset = function() {
	this.x = GRID.offScreenLeft;
	this.y = getEnemyRow();
	this.speed = getEnemySpeed();
	this.waitTime = 0;
}

/**
 * Object representing our "frog" (player character)
 */
var Player = function(x, row) {
	// The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    
    // The horizontal location of the player on the
    // canvas in pixels.
    this.x = x;
    
    // The vertical location of the player on the
    // canvas in pixels.
    this.y = row;
}

/**
 * Draw the player on the canvas.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Check if the player has died and update the player accordingly.
 */
Player.prototype.checkDeath = function(dt) {
	var playerX = this.x;
	var playerY = this.y;
	// First, check if player is in the water
	if (playerY <= GRID.waterRow1)
	{
		player = this.init();
	}
	else
	{
		// Loop through all the enemies and check
		// if any are in the same space as the player
		for (var i in allEnemies)
		{
			var enemy = allEnemies[i];
			// First check if the enemy is in the same row
			// as the player
			if (enemy.y == playerY)
			{
				// Then check if the enemy has collided with the
				// player
				if (enemy.x >= playerX - 50 && enemy.x <= playerX + 50)
				{
					player = this.init();
				}
			}
		}
	}
}

/**
 * Handles user input to move the player around the screen.
 */
Player.prototype.handleInput = function(key) {
	// If key is down and player is not already at
	// the bottom of the scren
	if (key == "down" && this.y < GRID.grassRow2)
	{
		this.y = this.y + GRID.cellHeight;
	}
	// If key is up and player is not already at the
	// top of the screen
	else if (key == "up" && this.y > GRID.waterRow1)
	{
		this.y = this.y - GRID.cellHeight;
	}
	// If key is right and player is not already at
	// the right side of the screen
	else if (key == "right" && this.x < GRID.col4)
	{
		this.x = this.x + GRID.cellWidth;
	}
	// If key is left and player is not already at
	// the left side of the screen
	else if (key == "left" && this.x > GRID.col0)
	{
		this.x = this.x - GRID.cellWidth;
	}	
}

/**
 * Initializes a player character starting in the bottom center of
 * the grid.
 */
Player.prototype.init = function() {
	return new Player(
		GRID.col2,
		GRID.grassRow2
	);
}

/**
 * An array that holds all of the enemies.
 */
var allEnemies = [];
for (var i = 0; i < 7; i++)
{
	allEnemies.push(Enemy.prototype.init());
}

/**
 * The Player object that is controlled by the user.
 */
var player = Player.prototype.init();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
