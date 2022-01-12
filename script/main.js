var player;
var enemies = [];
var jumpBool = true;
var collapse;
var playerHit;
var boolGame = false;
var canvasUpdate;
var gameScreen = 0;
var boolHit = true;

function startGame() {
  // console.log("This");
  gameCanvas.start();
  gameScreen = 1;
  player = new Player(30, 310, "blue", 30, 30);
  enemies = [];

  // enemy = new component(800, 330, "green", 20, 20);
  // enemy1 = new component(800,130,"yellow",20,20);
  createEnemy(0);
  // setTimeout(() => {
  //   createEnemy(1);
  // }, 1000);

  //   console.log(collapse);
}

function createEnemy(number) {
  boolHit = true;
  if (number === 0) {
    enemies[number] = new Enemy(Math.floor(Math.random() * 12) + 8, "red");
  } else {
    enemies[number] = new Enemy(5, "green");
  }
  //Math.floor(Math.random() * 10) + 7}
}

var gameCanvas = {
  canvas: document.getElementById("canvas"),
  start: function () {
    // this.canvas.width = 800;
    // this.canvas.height = 350;
    this.context = this.canvas.getContext("2d");
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // this.interval = setInterval(updateGameCanvas, 15);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function updateGameCanvas() {
  console.log(gameScreen + " " + boolHit);
  if (gameScreen === 0) {
    player = new Player(30, 310, "blue", 30, 30);
    levelDesign();
    player.update();
  } else if (gameScreen === 1) {
    if (getDist() && boolHit) {
      console.log(getDist());
      console.log("Hit");
      gameScreen = 2;
      boolGame = false;
      boolHit = false;
      player = null;
      enemies = null;
      return;
    }
    gameCanvas.clear();
    levelDesign();
    player.newPos();
    player.update();

    for (let eachEnemy of enemies) {
      if (eachEnemy.x <= -5) {
        // console.log(enemies);
        enemies.shift();
        // console.log(enemies);
        createEnemy(0);
        createEnemy(0);
      } else {
        eachEnemy.show();
        eachEnemy.move();
      }
    }
  } else if (gameScreen === 2) {
    let canvas = gameCanvas.canvas;
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "2vw Arial";
    ctx.textAlign = "center";
    ctx.fillText("You Died", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("Try again", canvas.width / 2, canvas.height / 2 + 20);
  }

  // setInterval(updateEnemy(enemy), 4000);
}

window.addEventListener(
  "keypress",
  function (event) {
    if (event.code === "Space" && jumpBool) {
      // console.log("This is running");
      if (boolGame) {
        player.speedY -= 5;
        jumpBool = false;
      } else {
        startGame();
        boolGame = true;
      }
    }
  },
  true
);

function click_function() {
  if (boolGame) {
    player.speedY -= 3;
    jumpBool = false;
  } else {
    startGame();
    boolGame = true;

    console.log("Starting the game");
  }
}

function getDist() {
  for (let eachEnemy of enemies) {
    var distX =
      player.x + player.width / 2 - (eachEnemy.x + eachEnemy.width / 2);
    var distY =
      player.y + player.height / 2 - (eachEnemy.y + eachEnemy.height / 2);
    var distXY = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

    if (distXY < player.width / 2 + eachEnemy.width / 2) {
      // console.log("You got hit");
      playerHit = true;
    } else {
      playerHit = false;
      //console.log((distXY) + " "+  (player.width / 2 + enemy[0].width / 2));
    }
  }
  return playerHit;

  // while(true){
  // console.log(dist);
  // }
}

function levelDesign() {
  let c = gameCanvas.canvas;
  let ctx = c.getContext("2d");

  ctx.fillStyle = "rgb(173,216,230)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "gray";
  ctx.fillRect(0, c.height - 10, c.width, 10);
}

canvasUpdate = setInterval(updateGameCanvas, 15);
