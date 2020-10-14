class Plataforma {
    constructor() {
      Xo = random(0, 300);
      Xf = random(40, 300);
  
      spacing = 55;
      right = random(width / 2); //top
      left = width - (this.right + this.spacing); //bottom
      color = false;
  
      y = 580;
      h = 20;
      velocidadP = 1;
      separación_y = 580;
      speed = 1;
  
      highlight = false;
    }
  
    hit(bola) {
      if (bola.x < this.Xf + this.Xo && bola.x > this.Xo) {
        if (bola.y > this.y && bola.y < this.y + this.h) {
          this.resaltarColor = true;
          bola.caida = false;
          bola.UP();
          return true;
        }
      }
  
      this.resaltarColor = false;
      bola.caida = true;
      bola.puntos += 30;
      return false;
    }
  
    show() {
      if (this.color == false) {
        fill(6, 82, 221);
      } else {
        fill(0, 255, 0);
      }
      if (this.resaltarColor) {
        fill(0, 0, 255);
      }
  
      rect(this.Xo, this.y, this.Xf, this.h);
    }
  
    update() {
      this.y -= this.speed;
    }
  
    offscreen() {
      if (this.y < -this.h) {
        return true;
      } else {
        return false;
      }
    }
  
    crear(separacion_y) {
      this.y = separacion_y;
      this.color = true;
    }
  }
  
  export default Plataforma;
  