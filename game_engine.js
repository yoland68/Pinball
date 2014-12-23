//functions
function viewport(p) {
  return [ w/2 * p[0] + w/2, h/2 - p[1] * w/2 ];
}

function viewtranslate(num) {
  return w*num;
}

function moveTo(p) {
  var q = m.transform(p);
  var xy = viewport(q);   
  g.moveTo(xy[0], xy[1]);
}

function lineTo(p) {
  var q = m.transform(p);
  var xy = viewport(q);   
  g.lineTo(xy[0], xy[1]);
}

function drawSphere(ballInstance){
  var q = m.transform([ballInstance.cord[0], ballInstance.cord[1], 0]);
  var xy = viewport(q);
  g.fillStyle = "#000";
  g.beginPath();
  g.arc(xy[0], xy[1], viewtranslate(ballInstance.r), 0, 2*Math.PI, true);
  g.closePath();
  g.fill();
}

function drawLine(lineInstance){
  moveTo([lineInstance.a[0], lineInstance.a[1], 0]);
  lineTo([lineInstance.b[0], lineInstance.b[1], 0]);
}

function gameCheck(ballInstance) {
  var q = m.transform([ballInstance.cord[0], ballInstance.cord[1], 0]);
  var xy = viewport(q);
  if (Math.abs(xy[0])+viewtranslate(ballInstance.r)>w || Math.abs(xy[1])+viewtranslate(ballInstance.r)>h ){
    //If the ball is out of of the frame
    ballInstance.reset();
  }
}

//Global variables
var ball = new Ball([0,.5], [0.0001,0], .02);
var line1 = new Line([-.1, 0], [0.1, 0], 0, 0);

//Animations
myCanvas.animate = function(_g) {
  g = _g;
  w = g.canvas.width;
  h = g.canvas.height;

  // MAKE A GREEN BACKGROUND.
  g.fillStyle = 'rgb(250, 200, 100)';
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(w, 0);
  g.lineTo(w, h);
  g.lineTo(0, h);
  g.lineTo(0, 0);
  g.fill(); 
  
  m.identity();
  ball.move();
  console.log(line1.collision(ball));
  gameCheck(ball);
  drawSphere(ball);
  drawLine(line1);

  
  g.strokeStyle = 'rgb(0,0,0)';
  g.lineWidth = 10;
  g.stroke()
}