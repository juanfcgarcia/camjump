class Ball2 {
  constructor(m, x, y) {
    this.mass = m;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.jumpsLimit = 0;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
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
    if (this.position.x > 10) {
      this.bounceLEFT();
    }
  }

  bounceUP() {
    this.velocity.y *= -0.2;
    this.position.y = height - this.mass * 0.01;
  }

  bounceLEFT() {
    this.velocity.x *= -0.2;
  }

  bounceRIGHT() {
    this.velocity.x *= 0.2;
  }

  checkPlatformEdges(platform) {
    if (
      this.position.y > platform.y &&
      this.position.y < platform.y + platform.h
    ) {
      this.bounceUP();
    }
  }

  deaccelerate(D) {
    if (D === 0) {
      this.velocity.x = 0;
    }
  }

  moveLeft(distancePS, frameRate) {
    if (this.position.x > 10 && distancePS > 0) {
      let f = p5.Vector.div(
        createVector(-(distancePS / frameRate), -0.1),
        this.mass
      );
      this.velocity.add(f);
    }
  }

  moveRight(distancePS, frameRate) {
    if (this.position.x < width - 6 && distancePS > 0) {
      let f = p5.Vector.div(
        createVector(distancePS / frameRate, -0.1),
        this.mass
      );
      this.velocity.add(f);
    }
  }

  jump() {
    if (this.jumpsLimit === 0) {
      this.applyForce(createVector(0, -3));
      this.jumpsLimit = 1;
    }
    if (this.jumpsLimit === 1) {
      this.applyForce(createVector(0, -0.5));
      this.jumpsLimit = 2;
    }
    if (this.jumpsLimit === 2) {
      this.jumpsLimit = 0;
    }
  }
}
