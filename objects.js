function Line(pointA, pointB, fiction, bp) {
  this.a = pointA;
  this.b = pointB;
  this.fiction = fiction;
  this.bouncePower = bp;

  this.collision = function(ballInstance){
    //STUB
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