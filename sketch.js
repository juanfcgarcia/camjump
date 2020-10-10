let ball;
let plataformas = [];

function setup(){
    createCanvas(400,600);
    ball =  new Ball();
    plataformas.push(new Plataforma());
}

function draw(){
    keyPresionado();
    background(0); 

    for(let i= plataformas.length-1; i >= 0; i--){
        plataformas[i].show();
        plataformas[i].update();

        if(plataformas[i].hits(ball)){
            
        }


        if (plataformas[i].offscreen()){
            plataformas.splice(i,1);
        }
        
    }

    ball.update();
    ball.show();

    if(frameCount % 130==0){
        plataformas.push(new Plataforma());
    }

    
}

function keyPresionado(){

    if(keyIsDown(LEFT_ARROW) ){  
       ball.MoveLeft();
    }
    if(keyIsDown(RIGHT_ARROW)){ 
       ball.MoveRight();
    }
    if(key == 'j' || key == 'J'){ 
        ball.Jump();
     }
    
 }   