class Ball {
    constructor() {
      x = width / 2;
      y = 50;
  
      gravedad = 0.1;
      velocidad = 0;
      caida = false;
    }
  
    show() {
      fill(255);
      ellipse(this.x, this.y, 18, 18);
    }
  
    MoveLeft() {
      if (this.x > 10) {
        this.x -= 6;
      }
    }
  
    MoveRight() {
      if (this.x < width - 6) {
        this.x += 6;
      }
    }
  
    Jump() {
      this.y -= 6;
    }
  
    DROP() {
      this.gravedad = 0.0;
      this.velocidad += this.gravedad;
      this.y += this.velocidad;
    }
  
    UP() {
      this.velocidad = -1.0;
      this.y += this.velocidad;
    }
  
    update() {
      if (this.caida == true) {
        this.gravedad = 0.1;
        this.velocidad += this.gravedad;
        this.y += this.velocidad;
      }
  
      if (this.y > height) {
        //El limite de abajo
        this.y = height;
        this.velocidad = 0;
        console.log(this.y);
      }
  
      if (this.y <= 0) {
        //El limite de arriba
        this.y = 0;
        this.velocidad = 0;
      }
    }
  }
  
  export default Ball;
  