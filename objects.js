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

//Objects
function Line(pointA, pointB, fiction, bp) {
  this.a = pointA;
  this.b = pointB;
  this.fiction = fiction;
  this.bouncePower = bp;

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

    // console.log(ballInstance.lastCord + "\t" + ballInstance.cord);
    // if (ballInstance.lastCord[1] > 0 && ballInstance.cord[1] < 0) {
    //   console.log("cross");
    //   console.log(withinRange([x,y], ballInstance.cord, ballInstance.lastCord, true));
    // }

    if ( withinRange([x,y], ballInstance.cord, ballInstance.lastCord) && withinRange([x,y], this.a, this.b) ){
      // console.log(ballInstance.cord + "\t" + ballInstance.lastCord);
      // console.log(x,y);
      return true;
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
