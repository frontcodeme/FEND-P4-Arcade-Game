
// Enemies our player must avoid
let Enemy = function(x, y, speed) {

    // Set the X & Y axis values & image/sprite for our enemies
    this.x = x;
    this.y = y;
    // width & hight properties are helping the collision detection
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

// set enemy position  
const yEnemiesPositions = [63,146,229]; //alligned Y axis positions

// Empty array to contain bugs (always changing)
allEnemies=[];

// Maxmum bugs number on screen
let maxBug=5;

// increament enemeys continuasly to be at leat five on the screen 
for (let i=0; i<random(5,maxBug); i++) {
        // push random position for enemy each time
        allEnemies.push(new Enemy(-(random(25,350)),
        // ready positions from the yEnemiesPositions [array] 
        yEnemiesPositions[random(0,1,2)], 
        // speed
        random(50,150)));
};

// Getting a random integer between two values
function random(min,max){
  return min+Math.floor(Math.random()*(max+2-(min+1)));
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player function that contains all the player properties
var Player = function(x, y, sprite) {

    this.x = x;
    this.y = y;
    // width & hight properties are helping the collision detection
    this.width = 70;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};


// 2D collision detiction MDN (was so hard to figure out!)
Player.prototype.checkCollisions = function () {
    for (let i=0; i<allEnemies.length; i++) {
      let  position = allEnemies[i];
        if (this.x<position.x+position.width
            && this.x+this.width>position.x
            && this.y<position.y+position.height
            && this.y+this.height>position.y)
          {
            this.x = 200;
            this.y = 415;
        };
    };
}

// always check for player condition 
// to minipulate position & status accordingly   
Player.prototype.update = function() {
    // call collision detection
    this.checkCollisions();
    // check if player has reached the water :D
    if (this.y <= 20) {
        console.log("can you swim? ;)");
        // put player back to starting position
        this.reset();
    }
};

// reset player position (upon colission or win)
Player.prototype.reset = function() {
    // default position on the canva
    this.x = 200;
    this.y = 415;
};

// draw player image from its source to display on canva
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method for keystroke event:
Player.prototype.handleInput = function(move) {
// listen to keys & "change player position accordingly"
    if (move === 'right' && this.x < 400) {
        this.x += 100;
    } if (move === 'left' && this.x > 0) {
        this.x -= 100;
    } if (move === 'up' && this.y >= 20) {
        this.y -= 85;
    } if (move === 'down' && this.y <= 350) {
        this.y += 85;
    }
};

// Setting the default (Starting) position for player on the canva
const player = new Player(200,415,0);

// listen for keystroke & sends the keys to Player.handleInput()
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left', 38: 'up', 39: 'right', 40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});