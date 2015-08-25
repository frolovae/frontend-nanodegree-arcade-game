var CELLX = 101;
var CELLY = 83;

// Enemies our player must avoid 
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;                                                     // Setting the Enemy initial location
    this.y = y;               
    this.initialX = x;
    this.initialY = y;
    this.speed = speed;                                                     // Settng the Enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;                                  // Updates the Enemy location (you need to implement)
    if (this.x > 505) {this.x = -101;}

    var a = this.x + 50;
    var b = this.y + 130;
    var c = player.x + 50;
    var d = player.y + 130;
    var e = (a - c) * (a - c) + (b - d)*(b - d);
    var hypotenuse = Math.sqrt(e);
    if (hypotenuse < 47) {player.reset();}                                    // Handles collision with the Player (you need to implement)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';                                // use the code from the Enemy function as an example on how to do that
    this.x = x;
    this.y = y;                                                         // Setting the Player initial location
    this.initialX = x;
    this.initialY = y;
};

Player.prototype.update = function() {                                  // can be similar to the one for the Enemy
    if (this.y < 10) {this.reset();}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);          // use the code from the render method for the Enemy
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 1*CELLX;
            break;
        case 'right':
            this.x = this.x + 1*CELLX;
            break;
        case 'up':
            this.y = this.y - 1*CELLY;
            break;
        case 'down':
            this.y = this.y + 1*CELLY;
            break;
    }
    if (this.x < 0) {this.x = 0;}
    if (this.x > 400) {this.x = 400;}
    if (this.y < 0) {this.y = 0;}
    if (this.y > 400) {this.y = 400;}
};

Player.prototype.reset = function() {
    var allEnemiesLentgh = allEnemies.length;
    var i = i;
    for (i = 0; i < allEnemiesLentgh; i++) {
        allEnemies[i].x = allEnemies[i].initialX;
        allEnemies[i].y = allEnemies[i].initialY;
        allEnemies[i].speed = Math.random() * 150 + 100;            // Setting the Enemy speed
    }

    this.x = this.initialX;
    this.y = this.initialY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200, 400);
var allEnemies = [];
allEnemies[0] = new Enemy(-120, 60, 150);
allEnemies[1] = new Enemy(-100, 143, 250);
allEnemies[2] = new Enemy(-110, 226, 200);
allEnemies[3] = new Enemy(-320, 60, 150);
allEnemies[4] = new Enemy(-300, 143, 250);
allEnemies[5] = new Enemy(-310, 226, 200);

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
