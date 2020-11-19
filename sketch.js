let ball;
let ball2;
let plataformas = [];

let colores;
let trackingData;

let desbloquear = 0;

let separacion_y = 580;

function setup() {
  createCanvas(400, 600);
  video = createCapture(VIDEO);
  video.size(400, 600);

  video.style("opacity", 1);
  video.id("entradaVideo");
  tracking.ColorTracker.registerColor("blue", function (r, g, b) {
    var thresholdGreen = 50,
      thresholdBlue = 70,
      dx = r - 0,
      dy = g - 255,
      dz = b - 255;

    if (g - r >= thresholdGreen && b - r >= thresholdBlue) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 6400;
  });
  tracking.ColorTracker.registerColor("red", function (r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 0,
      dz = b - 255;

    if (r - g >= threshold && b - g >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 19600;
  });
  tracking.ColorTracker.registerColor("green", function (r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 255,
      dz = b - 0;

    if (r - b >= threshold && g - b >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 10000;
  });
  colores = new tracking.ColorTracker(["red", "green", "blue"]);
  tracking.track("#entradaVideo", colores);

  colores.on("track", function (event) {
    trackingData = event.data;
  });

  ball = new Ball();
  ball2 = new Ball2(0.5, 40, 0);
  plataformas.push(new Plataforma());
}

function draw() {
  keyPresionado();
  background(12, 36, 97);
  image(video, 0, 0, width, height);
  document.getElementById("poblacionActual").innerHTML = ball.puntos;
  var gravity = createVector(0, 0.3 * ball2.mass);

  if (trackingData) {
    for (var i = 0; i < trackingData.length; i++) {
      // console.log( trackingData[i] );
      if (desbloquear == 0) {
        CamPlatarforma();

        Prevent();
      }
      desbloquear++;
      //rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
    }
  }

  for (let i = plataformas.length - 1; i >= 0; i--) {
    plataformas[i].show();

    if (plataformas[i].hits(ball)) {
    }

    if (plataformas[i].offscreen()) {
      plataformas.splice(i, 1);
    }
  }

  ball.update();
  ball.show();

  ball2.applyForce(gravity);
  ball2.update();
  ball2.display();
  ball2.checkEdges();
}

function keyPresionado() {
  if (keyIsDown(LEFT_ARROW)) {
    ball.MoveLeft();
    ball2.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ball.MoveRight();
    ball2.moveRight();
  }
  if (keyIsDown(UP_ARROW)) {
    ball2.jump();
  }
  if (key == "j" || key == "J") {
    ball.Jump();
  }
}

function CamPlatarforma() {
  plataformas.push(new Plataforma());
  separacion_y -= 90;
  plataformas[plataformas.length - 1].crear(separacion_y);
}

function Prevent() {
  //Una vez se crea una plataforma solo se podrá crear otra despues de 3s
  setTimeout(function () {
    desbloquear = 0;
  }, 3000);
}
