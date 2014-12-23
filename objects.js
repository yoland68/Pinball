// For Unit testing purpose

function Ball(xy, speed, radius) {
  this.originalxy = xy.slice(0);
  this.originalspeed = speed.slice(0);
  // this.lastCord = xy.slice(0);
  this.cord = xy;
  this.speed = speed;
  this.r = radius;

  this.move = function() {
    this.gravity();
    this.lastCord = this.cord.slice(0);
    this.cord[0] = this.speed[0]+this.cord[0];
    this.cord[1] = this.speed[1]+this.cord[1];
  }

  this.gravity = function() { //This is both gravity and fiction
    this.speed[0] = this.speed[0]*.999;
    this.speed[1] = this.speed[1]-0.001;
  }

  this.reset = function() {
    this.cord[0] = this.originalxy[0];
    this.cord[1] = this.originalxy[1];
    this.speed[0] = this.originalspeed[0];
    this.speed[1] = this.originalspeed[1];

  }
}



//help functions
function slopeIntercept(pointA, pointB) {
  var m = (pointB[1]-pointA[1])/(pointB[0]-pointA[0]);
  var b = pointA[1]-m*pointA[0];
  return [m, b];
}

function withinRange(point, limitA, limitB, printit){
  var minX = Math.min(limitA[0], limitB[0]),
      maxX = Math.max(limitA[0], limitB[0]),
      minY = Math.min(limitA[1], limitB[1]),
      maxY = Math.max(limitA[1], limitB[1]);
  if (printit){
    console.log("minX: " + minX + " maxX: " + maxX + " minY: " + minY + " maxY: " + maxY);
    console.log(point);
  }
  if (point[0] >= minX && point[0] <= maxX && point[1] >= minY && point[1] <= maxY)
    return true;
  return false;
}

function lineDotDist(point, m, i){
  var a = m,
      b = -1,
      c = i;
  var x = (b*(b*point[0]-a*point[1])-a*c)/(a*a+b*b),
      y = (a*(-b*point[0]+a*point[1])-b*c)/(a*a+b*b);
      // console.log("\tOffset calculation: ");
      // console.log("\t"+i);
      // console.log("\tx = ", x);
      // console.log("\ty = ", y);
  return [x-point[0], y-point[1]];
}

function DotDotDist(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA[0]-pointB[0], 2)+Math.pow(pointA[1]-pointB[1], 2));
}

//Objects
function Line(pointA, pointB, fiction, bouncingPower, isWall) {
  this.a = pointA;
  this.b = pointB;
  this.fiction = fiction;
  this.bp = bouncingPower;
  this.iw = isWall;

  this.collision = function(ballInstance){
    var random = Math.random()*fiction+1;
    // var random = 1;
    // console.log(random);
    var result1 = slopeIntercept(ballInstance.lastCord, ballInstance.cord),
        m1 = result1[0],
        b1 = result1[1];
    var result2 = slopeIntercept(this.a, this.b),
        m2 = result2[0],
        b2 = result2[1];
    var x = (b2-b1)/(m1-m2),
        y = x*m1+b1;
        y_test = x*m2+b2; //this value is for testing purposes

    if ( withinRange([x,y], ballInstance.cord, ballInstance.lastCord) && withinRange([x,y], this.a, this.b) ){

      if (this.iw){
        // console.log("speed before: " + ballInstance.speed);
        ballInstance.speed[0] = -1*ballInstance.speed[0]*this.bp*random
        // console.log("speed after: " + ballInstance.speed+"\n=======");
        ballInstance.cord[0] = x;
        ballInstance.cord[1] = y;
        ballInstance.move();
        return true
      }
      var perp_m = -1/m2,
          perp_b = y-perp_m*x;
      var offset = lineDotDist(ballInstance.lastCord, perp_m, perp_b);
      var proportion = DotDotDist(ballInstance.lastCord, [x,y])/DotDotDist(ballInstance.lastCord, ballInstance.cord);
      var nextPoint = [ballInstance.lastCord[0]+offset[0]*2, ballInstance.lastCord[1]+offset[1]*2];
      ballInstance.speed[0] = ((nextPoint[0]-x)/proportion)*this.bp*random;
      ballInstance.speed[1] = ((nextPoint[1]-y)/proportion)*this.bp*random;
      ballInstance.cord[0] = nextPoint[0];
      ballInstance.cord[1] = nextPoint[1];

      return true
    }
    return false;
    }
}

function Sphere(xy, radius, fiction, bouncingPower){
  this.xy = xy;
  this.r = radius;

  this.collision = function(ballInstance){
    //STUB
  }
}

function Flipper(root, length, angle, angleIncrement, maxAngle, bouncingPower) {
  this.root = root;

  // this.angle = -Math.PI/6;
  // this.angleIncrement = 0.1;
  // this.maxAngle = Math.PI/6;
  this.startAngle = angle;
  this.angle = angle;
  this.angleIncrement = angleIncrement;
  this.maxAngle = maxAngle;
  this.rotating = false;
  this.length = length;
  this.tip = [Math.sin(angle)*length+root[0], Math.cos(angle)*length+root[1]];
  this.drawingTip = [Math.sin(angle)*(length-0.04)+root[0], Math.cos(angle)*(length-0.04)-0.02+root[1]]
  this.bp = bouncingPower;

  this.rotate = function() {
    if (this.rotating){
      // console.log("Hello");
      if ((this.angle < this.maxAngle && this.angleIncrement > 0) || (this.angle > this.maxAngle && this.angleIncrement < 0)){
        this.angle = this.angle+this.angleIncrement;
        this.rotateTip();
      } else {
        this.rotating = false;
        this.angle = this.startAngle;
        this.rotateTip();
      }     
    }
  }

  this.collision = function(ballInstance){
    var random = Math.random()*0.1+1;
    // var random = 1;
    // console.log(random);
    var result1 = slopeIntercept(ballInstance.lastCord, ballInstance.cord),
        m1 = result1[0],
        b1 = result1[1];
    var result2 = slopeIntercept(this.root, this.tip),
        m2 = result2[0],
        b2 = result2[1];
    var x = (b2-b1)/(m1-m2),
        y = x*m1+b1;
        y_test = x*m2+b2; //this value is for testing purposes

    if ( withinRange([x,y], ballInstance.cord, ballInstance.lastCord) && withinRange([x,y], this.root, this.tip) ){
      // console.log("Hitting");
      var perp_m = -1/m2,
          perp_b = y-perp_m*x;
      var offset = lineDotDist(ballInstance.lastCord, perp_m, perp_b);
      var proportion = DotDotDist(ballInstance.lastCord, [x,y])/DotDotDist(ballInstance.lastCord, ballInstance.cord);
      var nextPoint = [ballInstance.lastCord[0]+offset[0]*2, ballInstance.lastCord[1]+offset[1]*2];
      ballInstance.speed[0] = ((nextPoint[0]-x)/proportion)*this.bp*random;
      ballInstance.speed[1] = ((nextPoint[1]-y)/proportion)*this.bp*random;
      ballInstance.cord[0] = nextPoint[0];
      ballInstance.cord[1] = nextPoint[1];

      return true
    }
    return false;
  }

  this.rotateTip = function() {
    this.tip[0] = Math.sin(this.angle)*this.length+this.root[0];
    this.tip[1] = Math.cos(this.angle)*this.length+this.root[1];
    this.drawingTip[0] = Math.sin(this.angle)*(this.length-0.04)+this.root[0];
    this.drawingTip[1] = Math.cos(this.angle)*(this.length-0.04)+this.root[1];
  }
}

// Unit testing

// var flipper1 = new Flipper([0, 0], 1, -Math.PI/6, Math.PI/60, Math.PI/6);
// var flipper2 = new Flipper([0, 0], 1, Math.PI*7/6, -Math.PI/60, Math.PI*5/6);
// flipper1.rotating = true;

// for (var i = 0; i < 40; i ++){
//   flipper1.rotate();
//   // flipper2.rotate();
//   // console.log("flipper1: " + flipper1.tip);
//   // console.log("flipper2: " + flipper2.tip);

// }




// var line1 = new Line([-.1, 0], [0.1, 0.1], 0, 1.2);
// // var line2 = new Line([-0.9, -1.45], [-1,1.45], 0, 1);
// var ball = new Ball([0,2], [0.0001,0], .02);
// for (var i = 0; i < 1000; i ++){
//   ball.move();
//   line1.collision(ball);
  // line2.collision(ball);
// }

// var line = new Line([-1, 0], [1, 0.001], 0, 1);
// var ball = new Ball([0, .5], [0.0001, 0], 0.2);
// for (var i = 0; i < 1000; i++){
//   ball.move();
//   line.collision(ball);
// }

// console.log(DotDotDist([0,0], [1,1]));


