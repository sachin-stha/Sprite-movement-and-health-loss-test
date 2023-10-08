import Player from "./components/player.js";

const c = document.querySelector("#myCanvas");
const ctx = c.getContext("2d");

c.width = 1000;
c.height = 500;

let player = new Player(
  30,
  120,
  { x: c.width / 2, y: c.height - 120 },
  "red",
  c
); // player object

let keyVal = 0;
let playerMovement = {
  right: false,
  left: false,
  jump: false,
};
let ptime = 0;
function gameLoop(ctime) {
  requestAnimationFrame(gameLoop);
  if (ctime - ptime < 1) return;
  ptime = ctime;

  ctx.clearRect(0, 0, c.width, c.height);

  console.log(playerMovement);

  playerMovementFunc();

  player.draw(ctx);
}
requestAnimationFrame(gameLoop);

function playerMovementFunc() {
  playerMovement.jump && player.position.y + player.height >= c.height // only for jump movement, independent of x axis movements
    ? (player.velocity.y = -15)
    : "";

  // left and right movement are interconnect with each other
  if (playerMovement.left && keyVal == 37) {
    player.velocity.x = -15;
  } else if (playerMovement.right && keyVal == 39) {
    player.velocity.x = 15;
  }

  // player velocity turns 0 only if both x-axis movement is false
  if (!(playerMovement.left || playerMovement.right)) {
    player.velocity.x = 0;
  }
}

function playerWallCollision() {
  if (player.position.x < 0 && keyVal == 37) {
    player.velocity.x = 0;
    player.position.x = 0; // sets position to 0
  } else if (player.position.x + player.width > c.width && keyVal == 39) {
    player.velocity.x = 0;
    player.position.x = c.width - player.width; // sets position to c.width - player.width
  }
}

document.addEventListener("keydown", function (e) {
  switch (e.which) {
    case 32:
      playerMovement.jump = true;
      break;

    case 37:
      playerMovement.left = true;
      keyVal = e.which;
      break;

    case 39:
      playerMovement.right = true;
      keyVal = e.which;
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.which) {
    case 32:
      playerMovement.jump = false;
      break;

    case 37:
      playerMovement.left = false;
      break;

    case 39:
      playerMovement.right = false;
      break;
  }
});
