let i = 1.85 // upper mouth radian
let x = 0.2 // lower mouth radian
let speed = 0.01 // speed of tweezers opening & closing

let tweezers = [];
let Spider;

let speechBubble = false;

function setup() {
  createCanvas(400, 400);

  Spider = new spider();

  tweezers = new Jitter();

  // tweezers[0] = new Jitter();
  // tweezers.push(new Jitter());
}

function draw() {
  translate(width / 2, height / 2);
  background(0);

  tweezers.display();

  Spider.render();
  Spider.update();

  checkCollision()
}

function checkCollision() {
  //p5 has a function called dist
//   if (dist(tweezers[0].x, tweezers[0].y, leg1.x, leg1.y) <= (tweezers[0].r + leg1.r) / 2) {
// this.leg1 = false;
//   }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    Spider.turn(0.7);
  } else if (keyCode == LEFT_ARROW) {
    Spider.turn(-0.7);
  } else if (keyCode == 32) {
    //display speech bubble and make tweezers disappear
    console.log("space");
    speechBubble = true;
    setTimeout(function() {
      speechBubble = false;
    }, 1000)
  }
}

class Jitter {
  constructor() { //instead of x and y being random, have them be at random points of a circle surrounding a canvas
    this.angleInit = Math.random() * Math.PI * 2;
    this.x = Math.cos(this.angleInit) * width / 1.5;
    this.y = Math.sin(this.angleInit) * height / 2;
    // this.x = random(width);
    // this.y = random(height);
    this.diameter = random(100, 100);
    this.speed = 1;
  }

  display() {
    if (i >= 2 || i <= 1.8) {
      speed = speed * (-1)
    }

    push();
    if (0 > this.x) {
      this.x = this.x + 2;
    } else {
      this.x = this.x - 2;
    }
    if (0 > this.y) {
      this.y = this.y + 0.2;
    } else {
      this.y = this.y - 0.2;
    }
    noFill();
    stroke(255);
    arc(this.x, this.y, this.diameter, this.diameter,
      (i += speed) * PI, (x -= speed) * PI, PIE);
    pop();
  }
}

function spider() {
  this.pos = createVector(CENTER, CENTER);
  this.angle = PI;
  this.vel = createVector(0, 0);
  this.update = function() {
    this.pos.add(this.vel);
  }
  this.leg1 = true;
  this.leg2 = true;
  this.leg3 = true;
  this.leg4 = true;
  this.leg5 = true;
  this.leg6 = true;
  this.leg7 = true;
  this.leg8 = true;

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noFill();
    stroke(255);
    ellipse(5, 5, 50, 50);
    ellipse(5, 50, 30, 30);

    triangle(5, 5, -5, 5, 0, -5);

    if (speechBubble == true) {
      ellipse(100, 100, 100, 100); //change this to speech bubble, reposition
      textSize(20);
      text('Stop It!!', 65, 105);
    }
    if (this.leg1) {
      line(75, 13, 50, 8);
    }
    if (this.leg2) {
      line(60, 50, 40, 35);
    }
    if (this.leg3) {
      line(-65, 0, -40, 0);
    }
    if (this.leg4) {
      line(-55, 40, -32, 30);
    }
    if (this.leg5) {
      line(70, -30, 45, -18);
    }
    if (this.leg6) {
      line(40, -53, 25, -33);
    }
    if (this.leg7) {
      line(-10, -58, -5, -35);
    }
    if (this.leg8) {
      line(-55, -40, -32, -25);
    }
    pop();
  }

  this.turn = function(Angle) {
    this.angle += Angle;
  }
}
