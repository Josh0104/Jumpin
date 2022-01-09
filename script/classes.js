class Enemy {
  constructor() {
    this.x = 800;
    this.y = 330;
    this.width = 20;
    this.height = 20;
  }

  move() {
    this.x -= 7;
  }

  show() {
    let c = gameCanvas.canvas;
    let ctx = c.getContext("2d");
    ctx.fillStyle="green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
