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

function drawSphere(ballInstance, color){
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

function drawFlipper(flipper){
  moveTo([flipper.root[0], flipper.root[1], 0]);
  // lineTo([flipper.tip[0], flipper.tip[1], 0]);
  lineTo([flipper.drawingTip[0], flipper.drawingTip[1], 0]);
}

function gameCheck(ballInstance) {
  var q = m.transform([ballInstance.cord[0], ballInstance.cord[1], 0]);
  var xy = viewport(q);
  if (isNaN(ballInstance.cord[0]))
    ballInstance.reset();
  if (Math.abs(xy[0])+viewtranslate(ballInstance.r)>w || Math.abs(xy[1])+viewtranslate(ballInstance.r)>h ){
    //If the ball is out of of the frame
    ballInstance.reset();
  }
}

//Global variables
var ball = new Ball([.1,1.1], [0.0001,0], .02);
var lines = [
  new Line([-.99+0.1, -1.18], [-1+.1,1.18], 0.1, .3, true),
  new Line([1-.1,1.18], [.99-.1,-1.18], 0.1, 0.3, true),
  new Line([-1+.1,1.18], [1-.1,1.189], 0.01, 0.01),
  new Line([0, -.1], [-0.2, 0.0], .1, 1.01),
  new Line([-0.3, -.5], [-0.2, 0.0], .1, 1.01),
  new Line([-0.32, -1], [-.7, -0.91], .1, 1.01),
  new Line([.32, -1], [.7, -.91], .1, 1.01),
  new Line([.3, 0.8], [0.5, 0.4], .1, 1.01),
  new Line([0.3, -0.3], [0.55, -.2], .1, 1.01),
  new Line([-.72, 0.7], [-.65, 0.5], .1, 1.01),
  new Line([-.65, 0.5], [-.60, 0.65], .1, 1.01),
  new Line([-.60, 0.65], [-.55, .45], .1, 1.01),
  new Line([-.55, .45], [-.5, 0.50], .1, 1.01),
  new Line([-.5, 0.50], [-.45, .3], .1, 1.01),
  new Line([-.45, .3], [-.2, .5], .1, 1.01),
  new Line([-.67, 0], [-.48, .1], .1, 1.01),
  new Line([-.62, 0.15], [-.48, -0.2])

  // new Line([-0.3, -.4], [-0.2, 0.1], .1, 1.01),
  // new Line([-.5, -.3], [-0.1, -0.1], 0, 1.2)
];
// var flipper1 = new Flipper([-.35, -1], 0.3, Math.PI*2/3, -Math.PI/30, Math.PI/3, 1.2);
var flipper1 = new Flipper([-.32, -1], 0.3, Math.PI*2/3, -Math.PI/90, -Infinity, 1.01);
flipper1.rotating = true;
var flipper2 = new Flipper([.32, -1], 0.3, Math.PI*4/3, Math.PI/90, Infinity, 1.01);
flipper2.rotating = true

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
  // m.rotateZ(time);
  // m.rotateY(time);
  ball.move();
  flipper1.rotate();
  flipper2.rotate();
  for (var i = 0; i < lines.length; i++) {
    lines[i].collision(ball);
  }
  flipper1.collision(ball);
  flipper2.collision(ball);
  gameCheck(ball);
  drawSphere(ball);
  for (var i = 0; i < lines.length; i++) {
    drawLine(lines[i]);
  }
  drawFlipper(flipper1);
  drawFlipper(flipper2);

  
  g.strokeStyle = 'rgb(0,0,0)';
  g.lineWidth = 10;
  g.stroke()

}