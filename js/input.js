const	KEY_UP_ARROW	= 38;
const	KEY_LEFT_ARROW	= 37;
const	KEY_RIGHT_ARROW	= 39;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  player.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_LEFT_ARROW);
}

function keyPressed(e) {
  setKeyHoldState(e.keyCode, player, true);

  e.preventDefault();
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, player, false);
}

function setKeyHoldState(keyCode, player,	isPressed) {
  if (keyCode === player.controlKeyThrust) {
    player.keyHeld_Thrust	= isPressed;
  }
  else if (keyCode === player.controlKeyEast) {
    player.keyHeld_East	= isPressed;
  }
  else if (keyCode === player.controlKeyWest) {
    player.keyHeld_West	= isPressed;
  }
}