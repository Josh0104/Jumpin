class Enemy {
  constructor(speedX, color) {
    this.x = 800;
    this.y = 330;
    this.width = 20;
    this.height = 20;
    this.speedX = speedX;
    this.color = color;
  }

  move() {
    this.x -= this.speedX;
  }

  show() {
    let c = gameCanvas.canvas;
    let ctx = c.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function Player(x, y, color, width, height) {
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