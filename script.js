/* Build a Simon Game

User Story: I am presented with a random series of button presses.

User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

User Story: I can see how many steps are in the current series of button presses.

User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.

User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

Hint: Here are mp3s you can use for each button: https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.
*/

/* Things to add:

1. Disable user click during button animation.

*/

/* Wish List:

1. Add game start and game over sounds.
2. 
...
*/

/* Variables to hold the color pool, computer's color pattern, user color pattern, start button flag, strict button flag, level number */
var colorPool = ["green", "red", "blue", "yellow"];
var cpuPattern = [];
var userPattern = [];
var start = false;
var strict = false;
var level = 0;

/* Start button checks to see if the game isn't already running then starts the game and starts creating random colors */
function startGame() {
  if (start === false) {
    start = true;
    startButtonGlow();
    enableButtons();
    addColorToCpuPattern();
  }
}

/* Pushes a random color to the end of the cpuPattern array and increments the level counter, then starts animating buttons */
function addColorToCpuPattern() {
  cpuPattern.push(createRandomColor());
  level++;
  document.getElementById("level").innerHTML = level;
  animateAllButtons();
}

/* Generates a random number between 0-3 and reates an array of colors corresponding to the random numbers, plays the corresponding
   sound, then returns a random color */
function createRandomColor() {
  var randomNumber = Math.floor(Math.random() * 4);
  playSound(randomNumber + 1);
  return colorPool[randomNumber];
}

/* Animates all buttons by looping through the cpuPattern array and animating one button at a time */
function animateAllButtons() {
  /* No idea why let i = 0 works here, but var i = 0 doesn't do anything */
  for (let i = 0; i < cpuPattern.length; i++) {
    setTimeout(function() {
      setTimeout(function() {
        animateOneButton(cpuPattern[i]);
      }, 500 * i);
    }, 500 * i);
  }
}

/* Animates the current button to white for 1 second, then back to its original color */
function animateOneButton(color) {
  document.getElementById(color).style.backgroundColor = "white";
  setTimeout(function() {
    document.getElementById(color).style.backgroundColor = color;
  }, 500);
}

/* Takes user input and pushes the color to the end of the userPattern array then runs matchTest() function to test vs the cpu */
function userColorInput(color) {
    userPattern.push(color);
  if (userPattern.length === cpuPattern.length) {
      patternMatchTest();
  }
}

/* Checks if the user input (pattern) matches the cpu output (pattern), if true the level number is incremented, and a new color is added
   to the cpu pattern, if false the game is reset */
function patternMatchTest() {
  for (var i = 0; i < cpuPattern.length; i++) {
    if (userPattern[i] !== cpuPattern[i]) {
      resetGame();
      return;
    } 
  }
  userPattern = [];
  addColorToCpuPattern();
}

/* Plays sounds on colored button presses */
function playSound(number) {
  var sound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound" + number + ".mp3"
  );
  sound.play();
}

/* Resets the game by clearing both pattern arrays, resetting the level counter to 0, setting start to false and resetting the start button color */
function resetGame() {
  cpuPattern = [];
  userPattern = [];
  start = false;
  level = 0;
  buttonDefaults();
}

/* Start button glow settings */
function startButtonGlow() {
    document.getElementById("start").style.backgroundColor = "red";
    document.getElementById("start").style.boxShadow = "0 0 30px red";
    document.getElementById("level").innerHTML = level;
}

/* Makes the colored buttons clickable */
function enableButtons() {
  colorPool.forEach(function(color) {
    document.getElementById(color).disabled = false;
  });
}

/* Button default settings */
function buttonDefaults() {
  document.getElementById("level").innerHTML = level;
  document.getElementById("start").style.backgroundColor = "#440000";
  document.getElementById("start").style.boxShadow = "none";
  colorPool.forEach(function(color) {
    document.getElementById(color).style.backgroundColor = color;
    document.getElementById(color).disabled = true;
  });
}

/* Toggles strict game mode on and off 
function toggleStrict() {
  if (strict === false) {
    strict = true;
    document.getElementById("strict").style.backgroundColor = "grey";
  } else {
    strict = false;
    document.getElementById("strict").style.backgroundColor = "white";
  }
}

 Tests if the game is in strict mode, if true the game ends in a loss, else clear the user input and replay the previous cpu pattern to try again
function testStrict() {
  if (strict === true) {
    lostGame();
  } else {
    userPattern = [];
    animateAllButtons();
  }
}

// Won the game
function wonGame() {
  alert("You won!");
  resetGame();
}

// Lost the game
function lostGame() {
  alert("Game over!");
  resetGame();
}
*/
