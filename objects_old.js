//For Unit testing purpose

// function Ball(xy, speed, radius) {
//   this.originalxy = xy.slice(0);
//   this.originalspeed = speed.slice(0);
//   this.lastCord = xy.slice(0);
//   this.cord = xy;
//   this.speed = speed;
//   this.r = radius;

//   this.lineCollision = function(){
//     //STUB
//   }

//   this.sphereCollision = function(){
//     //STUB
//   }

//   this.flipperCollision = function(){
    
//   }

//   this.move = function() {
//     this.gravity();
//     this.lastCord = this.cord.slice(0);
//     this.cord[0] = this.speed[0]+this.cord[0];
//     this.cord[1] = this.speed[1]+this.cord[1];
//   }

//   this.gravity = function() { //This is both gravity and fiction
//     this.speed[0] = this.speed[0]*.999;
//     this.speed[1] = this.speed[1]-0.001;
//   }

//   this.reset = function() {
//     this.cord[0] = this.originalxy[0];
//     this.cord[1] = this.originalxy[1];
//     this.speed[0] = this.originalspeed[0];
//     this.speed[1] = this.originalspeed[1];

//   }
// }



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

function calcDist(point, m, i){
  var a = m,
      b = -1,
      c = i;
  var x = (b*(b*point[0]-a*point[1])-a*c)/(a*a+b*b),
      y = (a*(-b*point[0]+a*point[1])-b*c)/(a*a+b*b);
  return [y-point[1], x-point[0]];
}

//Objects
function Line(pointA, pointB, fiction, bouncingPower) {
  this.a = pointA;
  this.b = pointB;
  this.fiction = fiction;
  this.bp = bouncingPower;

  this.collision = function(ballInstance){
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
      console.log("location: " + ballInstance.cord);
      console.log("speed before: " + ballInstance.speed);
      // m2 = m2 == 0 ? 1000000 : m2;
      var perp_m = -1/m2,
          perp_b = y-perp_m*x;
      var offset = calcDist(ballInstance.lastCord, perp_m, perp_b);
      console.log("\noffset: "+offset+"\n")

      var nextPoint = [ballInstance.lastCord[0]+offset[0]*2, ballInstance.lastCord[1]+offset[1]*2];
      ballInstance.speed[0] = (nextPoint[0]-ballInstance.cord[0])*this.bp;
      ballInstance.speed[1] = (nextPoint[1]-ballInstance.cord[1]);
      console.log("nextPoint = "+nextPoint);
      console.log("speed after: " + ballInstance.speed+"\n==========\n");
      // console.log(ballInstance.speed[1])
      ballInstance.move()
      return true
    }
    return false;
    }
}

function Sphere(xy, radius, bp){
  this.xy = xy;
  this.r = radius;

  this.collision = function(ballInstance){
    //STUB
  }
}

function Flipper(root, tip) {
  this.root = tip;
  this.tip = tip;
  this.speed = 0;

  this.rotate = function() {
    //Stub
  }

  this.collision = function(ballInstance){
    //STUB
  }
}

// Unit testing

// var line = new Line([-1,0], [1,0], 0, 0);
// var ball = new Ball([0,.5], [0.0001,0], .02);
// for (var i = 0; i < 100; i ++){
//   ball.move();
//   line.collision(ball);
// }


