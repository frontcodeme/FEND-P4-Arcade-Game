
// Enemies our player must avoid
let Enemy = function(x, y, speed) {

    // Set the X & Y axis values & image/sprite for our enemies
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 50;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position on screen (per frame)
// Parameter: dt, a DeltaTime between ticks (standarizer!)
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y, sprite) {

    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};


//2D collision detiction MDN
Player.prototype.checkCollisions = function () {
    for (let i=0; i<allEnemies.length; i++) {
      let  enemyChecked = allEnemies[i];
        if (this.x<enemyChecked.x+enemyChecked.width
            && this.x+this.width>enemyChecked.x
            && this.y<enemyChecked.y+enemyChecked.height
            && this.y+this.height>enemyChecked.y)
          {
            this.x = 200;
            this.y = 415;
        };
    };
}

// update()
Player.prototype.update = function() {
    //call collision detection
    this.checkCollisions();
};


//TODO:  render()

Player.prototype.reset = function() {

    this.x = 200;
    this.y = 415;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// a handleInput() method on keystroke event
Player.prototype.handleInput = function(move) {

    if (move === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (move === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (move === 'up' && this.y >= 20) {
        this.y -= 85;
    }
    if (move === 'down' && this.y <= 350) {
        this.y += 85;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Setting the default position for player
const player = new Player(200,410,0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//TODO: DEBUG needs to reset player position upon reaching rever!