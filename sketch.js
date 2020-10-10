let ball;
let plataformas = [];

function setup(){
    createCanvas(400,600);
    video = createCapture(VIDEO);
    video.size(400, 600);

    video.style('opacity',1)
    video.id("entradaVideo"); 
    tracking.ColorTracker.registerColor('blue', function(r, g, b) {
    var thresholdGreen = 50,
      thresholdBlue = 70,
      dx = r - 0,
      dy = g - 255,
      dz = b - 255;

      if ((g - r) >= thresholdGreen && (b - r) >= thresholdBlue) {
        
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 6400;
    });
    tracking.ColorTracker.registerColor('red', function(r, g, b) {
      var threshold = 50,
        dx = r - 255,
        dy = g - 0,
        dz = b - 255;
  
      if ((r - g) >= threshold && (b - g) >= threshold) {
       
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 19600;
    });
  tracking.ColorTracker.registerColor('green', function(r, g, b) {
      var threshold = 50,
        dx = r - 255,
        dy = g - 255,
        dz = b - 0;
  
      if ((r - b) >= threshold && (g - b) >= threshold) {
       
        return true;
      }
      return dx * dx + dy * dy + dz * dz < 10000;
  });
  colores = new tracking.ColorTracker(['red', 'green', 'blue']);
   
  
    tracking.track('#entradaVideo', colores);
  
  
    colores.on('track', function(event) { 
        trackingData = event.data 
    });


    ball =  new Ball();
    plataformas.push(new Plataforma());
    
}

function draw(){
    keyPresionado();
    background(12, 36, 97);
    image(video, 0,0, width, height);

    for(let i= plataformas.length-1; i >= 0; i--){
        plataformas[i].show();
      

        if(plataformas[i].hits(ball)){
            
        }


        if (plataformas[i].offscreen()){
            plataformas.splice(i,1);
        }
        
    }

    ball.update();
    ball.show();

    
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