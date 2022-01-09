var player;
var enemy = [];
var jumpBool = true;
var collapse;
var playerHit;
var boolGame = false;

function startGame() {
  console.log("This");
  gameCanvas.start();
  intervalStart(true)
  player = new component(30, 320, "blue", 30, 30);
  // enemy = new component(800, 330, "green", 20, 20);
  // enemy1 = new component(800,130,"yellow",20,20);
  createEnemy(0);

  //   console.log(collapse);
}

function intervalStart(bool) {

  if(bool) {
    var canvasUpdate = setInterval(updateGameCanvas, 15);
  } else {
    clearInterval(canvasUpdate);
  }

}

function createEnemy(number) {
  console.log("Create enemy");
  enemy[number] = new Enemy();
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

function component(x, y, color, width, height) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.5;
  this.gravitySpeed = 0;
  this.update = function () {
    ctx = gameCanvas.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitBottom();
    this.hitTop();
  };

  this.hitTop = function () {
    var rockTop = gameCanvas.canvas.height - this.height * 3;
    if (this.y < rockTop) {
      this.speedY += 4;
    }
  };

  this.hitBottom = function () {
    var rockBottom = gameCanvas.canvas.height - this.height;
    if (this.y > rockBottom) {
      this.y = rockBottom;
      this.speedY = 0;
      jumpBool = true;
    }
  };
}

function updateGameCanvas() {
  if (getDist()) {intervalStart(false), boolGame = false; console.log("Stop the game"); return;
  }
  gameCanvas.clear();

  player.newPos();
  player.update();

  if (enemy[0].x <= 0) {
    enemy.shift();
    createEnemy(0);
  } else {
    enemy[0].show();
    enemy[0].move();
  }

  // setInterval(updateEnemy(enemy), 4000);
}

window.addEventListener(
  "keypress",
  function (event) {
    if (event.code === "Space" && jumpBool) {
      console.log("This is running");
      if (boolGame) {
        player.speedY -= 3;
        jumpBool = false;
      } else {
        startGame();
        boolGame = true;
      }
    }
    if (event.code === "KeyM") {
      location.reload();
    }
  },
  true
);

function getDist() {
  var distX = player.x + player.width / 2 - (enemy[0].x + enemy[0].width / 2);
  var distY = player.y + player.height / 2 - (enemy[0].y + enemy[0].height / 2);
  var distXY = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

  if (distXY < player.width / 2 + enemy[0].width / 2) {
    console.log("You got hit");
    playerHit = true;
  } else {
    //console.log((distXY) + " "+  (player.width / 2 + enemy[0].width / 2));
  }

  return playerHit;

  // while(true){
  // console.log(dist);
  // }
}
