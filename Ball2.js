class Ball2 {
  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    fill(230);
    ellipse(this.position.x, this.position.y, this.mass * 70, this.mass * 70);
  }

  checkEdges() {
    if (this.position.y > height - this.mass * 0.01) {
      this.bounceUP();
    }
  }

  bounceUP() {
    this.velocity.y *= -0.2;
    this.position.y = height - this.mass * 0.01;
  }

  checkPlatformEdges(platform) {
    if (
      this.position.y > platform.y &&
      this.position.y < platform.y + platform.h
    ) {
      this.bounceUP();
    }
  }

  moveLeft() {
    if (this.position.x > 10) {
      this.position.x -= 6;
    }
  }

  moveRight() {
    if (this.position.x < width - 6) {
      this.position.x += 6;
    }
  }

  jump() {
    this.applyForce(createVector(0, -1.15));
  }
}
