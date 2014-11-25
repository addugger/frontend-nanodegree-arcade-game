function randomValFromInterval(min,max)
{
    return Math.random()*(max-min+1)+min;
}

function getEnemySpeed()
{
	return randomValFromInterval(1, 3) * 75;
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
var Enemy = function(x, row, speed) {
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
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  new Enemy(
		  grid.offScreenLeft,
		  grid.stoneRow3,
		  getEnemySpeed()
  )
];



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
