const	KEY_UP_ARROW	= 38;
const	KEY_LEFT_ARROW	= 37;
const	KEY_RIGHT_ARROW	= 39;
const	KEY_SPACEBAR	= 32;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  player.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR);
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
  else if (keyCode === player.controlKeyRight) {
    player.keyHeld_East	= isPressed;
  }
  else if (keyCode === player.controlKeyLeft) {
    player.keyHeld_West	= isPressed;
  }
  else if (keyCode === player.controlKeyShoot) {
    player.fire();
  }
}