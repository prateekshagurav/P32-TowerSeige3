class Box {
  constructor(x, y, width, height) {
    var options = {
      restitution: 0.8,
      friction: 1
    }
    this.x = x;
    this.y = y;
    this.body = Bodies.rectangle(x, y, width, height, options);
    World.add(world, this.body);
    this.width = width;
    this.height = height;
    this.tint = 255;
  }

  display(shade) {
    var pos = this.body.position;
    rectMode(CENTER);
    if (this.body.speed < 8 && this.tint==255) {
      push();
      translate(pos.x, pos.y)
      rotate(this.body.angle)
      stroke(color(204, 255, 153));
      fill(color(255, 30, shade));
      rect(0, 0, this.width, this.height);
      pop();
    }
    else if (this.tint > 0) {
      this.tint = this.tint - 5;
      score = score+2;
      push();
      translate(pos.x, pos.y)
      rotate(this.body.angle)
      stroke(color(204, 255, 153, this.tint));
      fill(color(255, 30, k * 2, this.tint));
      rect(0,0, this.width, this.height);
      pop();

    }
    else if(this.tint == 0){
      World.remove(world, this.body);
      this.tint -=1;
     score = score-2; //for everybox,score 100
    }
  }
};
