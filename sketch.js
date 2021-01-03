const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint

var box = [];
var visibility = [];

var ball;
var score = 0;
var bgColor = "#CCFF99"

function preload() {
  ballImg = loadImage("ball_hexagon.png")
}

function setup() {

  engine = Engine.create();
  world = engine.world;

  canvas = createCanvas(1000, 500);

  ground = new Ground(width / 2, height - 10, width, 20);
  stand1 = new Ground(500, 400, 170, 10);
  stand2 = new Ground(700, 250, 170, 10);
  stand3 = new Ground(900, 325, 170, 10);

  var x = 500;
  var newX
  var newY = 400 - 140;
  var k = 1
  for (var i = 0; i < 5; i++) {
    newX = x - i * 15;
    for (var j = 0; j <= i; j++) {
      box[k] = new Box(newX, newY, 30, 30); k++;


      newX += 30;
    }
    newY += 30;
  }

  x = 700;
  newY = 250 - 140;
  k = 16
  for (var i = 0; i < 5; i++) {
    newX = x - i * 15;
    for (var j = 0; j <= i; j++) {
      box[k] = new Box(newX, newY, 30, 30); k++;


      newX += 30;
    }
    newY += 30;
  }
  x = 900;
  newY = 325 - 140;
  k = 31
  for (var i = 0; i < 5; i++) {
    newX = x - i * 15;
    for (var j = 0; j <= i; j++) {
      box[k] = new Box(newX, newY, 30, 30); k++;

      newX += 30;
    }
    newY += 30;
  }
  var options = {
    isStatic: false,
    restitution: 0.4,
    friction: 0,
    density: 10
  }
  ball = Bodies.polygon(200, 300, 6, 15);
  World.add(world, ball);

  sling = new slingshot(this.ball, { x: 200, y: 300 }) //why this.ball??

  Engine.run(engine);

}
function draw() {
  getBackgroundColor();
  background(bgColor);


  textSize(20);
  if (bgColor == "black"){
    stroke("#CCFF99");
    fill("#CCFF99")
  }
  else
    stroke("black");
  text("SCORE : " + score, 20, 40);

  for (k = 1; k <= 45; k++) {
    box[k].display(k * 2);
  }
  ground.display();
  stand1.display();
  stand2.display();
  stand3.display();

  sling.display();
  imageMode(CENTER);
  image(ballImg, ball.position.x, ball.position.y, 30, 30);

}
function mouseDragged() {

  Matter.Body.setPosition(this.ball, { x: mouseX, y: mouseY });

}
function mouseReleased() {
  sling.fly();
}
function keyPressed() {
  if (keyCode === 32) {
    Matter.Body.setPosition(this.ball, { x: 200, y: 300 });
    sling.attach(this.ball);
  }
}
async function getBackgroundColor() {
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(response)
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 06 && hour <= 19) {
    bgColor = "#CCFF99";
  }
  else {
    bgColor = "black";
  }
}