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
1. Add game start and win/loss sounds.
2. Add game speed toggle.
*/

/* Variables to hold the color pool, computer's color pattern, user color pattern, start button flag, strict button flag, and level number */
var colorPool = ["green", "red", "blue", "yellow"];
var cpuPattern = [];
var userPattern = [];
var start = false;
var strict = false;
var level = 0;

/* Start button checks to see if the game isn't already running then starts the game, animates the button with startButtonGlow(), turns on the colored buttons with enableButtons(), and starts adding colors to the CPU pattern with addColorToCpuPattern() */
function startGame() {
  if (start === false) {
    start = true;
    document.getElementById("start").disabled = true;
    startButtonGlow();
    enableButtons();
    addColorToCpuPattern();
  }
}

/* Pushes a random color to the end of the cpuPattern array with createRandomColor() and increments the level counter, then starts animating buttons with animateAllButtons() */
function addColorToCpuPattern() {
  cpuPattern.push(createRandomColor());
  level++;
  document.getElementById("level").innerHTML = level;
  animateAllButtons();
}

/* Generates a random number between 0-3 and reates an array of colors corresponding to the random numbers, plays the corresponding sound, then returns a random color */
function createRandomColor() {
  var randomNumber = Math.floor(Math.random() * 4);
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
    }, 500 + (500 * i));
  }
}

/* Animates the current button to white for 1 second, then back to its original color */
function animateOneButton(color) {
  playSound(colorPool.indexOf(color)+1);
  document.getElementById(color).style.backgroundColor = "white";
  document.getElementById(color).style.boxShadow = "0 0 15px white";
  setTimeout(function() {
    document.getElementById(color).style.backgroundColor = color;
    document.getElementById(color).style.boxShadow = "none";
  }, 500);
}

/* Takes user input and pushes the color to the end of the userPattern array then runs patternMatchTest() function to test vs the cpu */
function userColorInput(color) {
  userPattern.push(color);
  animateOneButton(color);
  patternMatchTest();
}

/* Checks if the user input (pattern) matches the cpu output (pattern), if true the level number is incremented (game is won at level 20), and a new color is added to the cpu pattern, if false the game is reset */
function patternMatchTest() {
  for (var i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== cpuPattern[i]) {
      if (checkStrictMode()) {
        lostGame();
        return;
      }
      else {
        userPattern = [];
        animateAllButtons();
      }
    }
  }
  /* If the user's pattern is the same length as the cpu pattern, check if level 20 is completed (ends in a win), otherwise clear the user pattern and add another color to the cpu pattern */
  if (userPattern.length === cpuPattern.length) {
    if (level === 20) {
      wonGame();
      return;
    }
    userPattern = [];
    addColorToCpuPattern();
  }
}

/* If strict mode is on and the wrong button is pressed, returns true and the game ends in a loss. If strict mode is off and the wrong button is pressed, returns false and the cpu pattern is repeated */
function checkStrictMode() {
  if (strict === true) {
    return true;
  }
  else {
    return false;
  }
} 

/* Plays sounds on colored button presses */
function playSound(number) {
  var sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${number}.mp3`);
  sound.play();
}

/* Resets the game by clearing both pattern arrays, setting start to false, resetting the level counter to 0, and resetting the button defaults */
function resetGame() {
  cpuPattern = [];
  userPattern = [];
  start = false;
  strict = false;
  level = 0;
  buttonDefaults();
}

/* Start button glow settings */
function startButtonGlow() {
    document.getElementById("start").style.backgroundColor = "red";
    document.getElementById("start").style.boxShadow = "0 0 30px red";
    document.getElementById("level").innerHTML = level;
}

/* Strict button glow settings */
function strictButtonGlow() {
    document.getElementById("strict").style.backgroundColor = "white";
    document.getElementById("strict").style.boxShadow = "0 0 30px white";
}

/* Disables the colored buttons */
function disableButtons() {
  colorPool.forEach(function(color) {
    document.getElementById(color).style.backgroundColor = color;
    document.getElementById(color).style.boxShadow = "none";
    document.getElementById(color).disabled = true;
  });
}

/* Enables the colored buttons */
function enableButtons() {
  colorPool.forEach(function(color) {
    document.getElementById(color).disabled = false;
  });
  document.getElementById("strict").disabled = true;
}

/* Button default settings */
function buttonDefaults() {
  disableButtons();
  document.getElementById("start").disabled = false;
  document.getElementById("start").style.backgroundColor = "#440000";
  document.getElementById("start").style.boxShadow = "none";
  document.getElementById("strict").disabled = false;
  document.getElementById("strict").style.backgroundColor = "white";
  document.getElementById("strict").style.boxShadow = "none";
  document.getElementById("level").innerHTML = level;
}

/* Toggles the strict button on and off */
function toggleStrict() {
  if (strict === false) {
    strict = true;
    strictButtonGlow();
  } else {
    strict = false;
    document.getElementById("strict").style.boxShadow = "none";
  }
}

/* Won the game, disables all buttons until reset button is pushed */
function wonGame() {
  document.getElementById("level").innerHTML = "WIN!";
  colorPool.forEach(function(color) {
    animateOneButton(color);
    document.getElementById(color).disabled = true;
  });
}

/* Lost the game, disables all buttons until reset button is pushed */
function lostGame() {
  document.getElementById("level").innerHTML = "LOSE!";
  colorPool.forEach(function(color) {
    document.getElementById(color).disabled = true;
  });
}
