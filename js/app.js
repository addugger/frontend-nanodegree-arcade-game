function randomValFromInterval(min, max)
{
    return Math.random()*(max-min+1)+min;
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getEnemySpeed()
{
	return randomValFromInterval(1, 3) * 75;
}

function getEnemyRow()
{
	return grid["stoneRow" + randomIntFromInterval(1, 3)];
}

function getEnemyWait()
{
	return randomValFromInterval(.2, 2);
}

// Contains general information about the
// grid defined by the background art
var grid = {
	// An enemy or player sprite with this y value will
	// be in the water row
	waterRow1: -20,
	
	// An enemy or player sprite with this y value will
	// be in the first (top) stone row
	stoneRow1: -20 + (83),
	
	// An enemy or player sprite with this y value will
	// be in the second (middle) stone row
	stoneRow2: -20 + (83 * 2),
	
	// An enemy or player sprite with this y value will
	// be in the third (bottom) stone row
	stoneRow3: -20 + (83 * 3),
	
	// An enemy or player sprite with this y value will
	// be in the first (top) grass row
	grassRow1: -20 + (83 * 4),
	
	// An enemy or player sprite with this y value will
	// be in the second (bottom) grass row
	grassRow1: -20 + (83 * 5),
	
	// Horizontal distance used to indicate a sprite is off
	// the screen on the left side
	offScreenLeft: -101,
	
	// Vertical distance used to indicate a sprite is off
	// the screen on the right side
	offScreenRight: 101 * 5,
	
	//column numbers are 0 indexed from left to right
	
	// An enemy or player sprite with this x value will
	// be in the first column
	row0: 101 * 0,
	
	// An enemy or player sprite with this x value will
	// be in the first column
	row1: 101 * 1,
	
	// An enemy or player sprite with this x value will
	// be in the first column
	row2: 101 * 2,
	
	// An enemy or player sprite with this x value will
	// be in the first column
	row3: 101 * 3,
	
	// An enemy or player sprite with this x value will
	// be in the first column
	row4: 101 * 4
};

// Enemies our player must avoid
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
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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
		if (this.x >= grid.offScreenRight)
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset enemy object to beginning and get new speed, row,
// and sets waitTime to 0, so it starts across the page
// right away
Enemy.prototype.reset = function() {
	this.x = grid.offScreenLeft;
	this.y = getEnemyRow();
	this.speed = getEnemySpeed();
	this.waitTime = 0;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 7; i++)
{
	allEnemies.push(
		new Enemy(
			grid.offScreenLeft,
			getEnemyRow(),
			getEnemySpeed(),
			getEnemyWait()
		)
	);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //player.handleInput(allowedKeys[e.keyCode]);
});
