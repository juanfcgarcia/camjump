class Plataforma {
    spacing = 40;
    right= random(width/2); //top
    left=     width - (this.right + this.spacing); //bottom
    
    y = height;
    h = 20;
    speed=1;

    highlight = false;
   
    hits = function(ball){
        if(ball.x < this.right || ball.x > width - this.left){
            if(ball.y> this.y && ball.y < this.y + this.h){
                this.highlight=true;
                ball.caida=false;
                ball.UP();
                return true;
            }        
        }

        this.highlight=false;
        ball.caida=true;
        return false;
    }


    show = function(){
        fill(255);
        if(this.highlight){
            fill(0,255,0);
        }
        rect(0, this.y, this.right, this.h);
        rect(width-this.left, this.y, this.left , this.h);
    }

    update = function(){
        this.y -= this.speed;

    }

    offscreen = function(){
        if(this.y < -this.h){
            return true;
        }else{
            return false;
        }

    }

}