
// Enemies our player must avoid
var Enemy = function() {

    // Set the X & Y axis values & image/sprite for our enemies
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Get stuff moving :)
    if (this.x >= 505) {
            this.x = -85;
        } else this.x = this.x + (this.speed * dt);
};

//set enemy position  
const yEnemiesPositions = [63,146,229]; //random Y axis

// Empty array to contain y axis enemy positions (randomized upon refresh)
allEnemies=[];

// Maxmum bugs number on screen
let maxBug=5;
for (let i=0; i<random(5,maxBug); i++) {
        allEnemies.push(new Enemy(-(random(25,350)),
        yEnemiesPositions[random(0,1,2)], // Get random ready positions from the yEnemiesPositions [array] 
        random(20,150)));
};

// Getting a random integer between two values
function random(min,max){
  return min+Math.floor(Math.random()*(max+2-(min+1)));
}

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Same method as used to instintiate the enemy ->(Player)
var Player = function(x, y, sprite) {
    // Set the X & Y axis values & image/sprite for our enemies
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
