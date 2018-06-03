// Declare the Hearts's container of the Player
const allHearts = document.querySelector('.allHearts');

// Declare heart each on its own
const heart = document.getElementsByClassName('heart');
heartElement = "<li class='heart'><img src='images/Heart.png' alt='heart'></li>";

// Declare the Modal message and the Reset button
const msg = document.querySelector('.modal-msg');
const button = document.querySelector('button');

// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 400) + 50;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Speed of all Enemies and make them continuously move
    this.x = this.x + this.speed * dt;

    if (this.x > 505) {
      this.x = -100;
    }

    // Enemy and Player collisions

    if (Math.abs(this.x - player.x) < 75 && Math.abs(this.y - player.y) < 6) {

      if (allHearts.firstElementChild) {
        allHearts.removeChild(allHearts.firstElementChild);
      }

      player.x = 202;
      player.y = 385;
    }

      gameOver();

  } // Update

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  } // Render


} // End of Enemy class

// Creating bugs Enemies Char.
let bug1 = new Enemy(50, 60);

let bug2 = new Enemy(200, 140);

let bug3 = new Enemy(100, 220);

let allEnemies = [];
allEnemies.push(bug1, bug2, bug3); // Put all Enemies Object into array

/* *************************************************************** */
/* *************************************************************** */


// The Player
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

  } //constructor

  update() {
    //Prevent player from exceed the right end of screen
    if (this.x <= 0) {
      this.x = 0;
    }

    //Prevent player from exceed the left end of screen
    if (this.x >= 505) {
      this.x = 404;
    }

    //Prevent player from exceed the top end of screen
    if (this.y <= -25) {
      this.y = 385;
    }

    //Prevent player from exceed the bottom end of screen
    if (this.y >= 402) {
      this.y = Math.floor(385);
    }

  } // Update()


  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  } // render()


  // Make player's Movements
  handleInput(direction) {

    switch (direction) {
      case 'left':
        this.x = this.x - 101;
        break;

      case 'up':
        this.y = this.y - 82;
        break;

      case 'right':
        this.x = this.x + 101;
        break;

      case 'down':
        this.y = this.y + 82;
        break;

      default:

    } // End switch statement


    // If statements for Hearts of lives
    if (this.y <= -25) {

      if (heart.length === 2) {
        allHearts.innerHTML += heartElement;
      }

      if (heart.length === 1) {
        allHearts.innerHTML += heartElement;
      }
    }

  } // handleInput()

} //End of Player Class

let player = new Player(202, 385); // Creating the player Char.

// function to display Game Over message and play again
function gameOver() {
  if (heart.length === 0) {
    for (var i = 0; i < allEnemies.length; i++) {
      allEnemies[i].speed = 0;
    }
    msg.style.display = 'block';
    document.removeEventListener('keyup', keyUpHandle);
  }

} // gameOver()

// Reset the game to play again
button.addEventListener('click', function resetGame() {
  msg.style.display = 'none';
  allHearts.innerHTML = heartElement + heartElement + heartElement;
  window.location.reload();
});



// Draw the enemy on the screen, required method for game

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

  document.addEventListener('keyup', function keyUpHandle(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
