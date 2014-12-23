//help functions
function slopeIntercept(pointA, pointB) {
  var m = (pointB[1]-pointA[1])/(pointB[0]-pointA[0]);
  var b = pointA[1]-m*pointA[0];
  return [m, b];
}

function withinRange(point, limitA, limitB){
  var minX = Math.min(limitA[0], limitB[0]),
      maxX = Math.max(limitA[0], limitB[0]),
      minY = Math.min(limitA[1], limitB[1]),
      maxY = Math.max(limitA[1], limitB[1]);
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
        //result1 contains the slope and intercept value for ball curve
        m1 = result1[0],
        b1 = result1[1];


    var result2 = slopeIntercept(this.a, this.b),
        //result1 contains the slope and intercept value for surface curve
        m2 = result2[0],
        b2 = result2[1];

    //x and y are the intercept point for both curves
    var x = (b2-b1)/(m1-m2),
        y = x*m1+b1;
        y_test = x*m2+b2; //this value is for testing purposes

    if ( withinRange([x,y], ballInstance.cord, ballInstance.lastCord) 
      && withinRange([x,y], this.a, this.b) ){
      //if the intercepting point is in the range of both curve, then if collided
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
