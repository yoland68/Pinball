function Ball(xy, speed, radius) {
  this.originalxy = xy.slice(0);
  this.originalspeed = speed.slice(0);
  // this.originalspeed
  // this.originalxy = xy.slice(0);
  // console.log(xy);
  this.cord = xy;
  this.speed = speed;
  this.r = radius;

  this.sphereCollision = function(){
    //STUB
  }

  this.sphereCollision = function(){
    //STUB
  }

  this.move = function() {
    this.gravity();
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

