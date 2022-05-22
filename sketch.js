class Button {
    // let buttonX;
    // let buttonY;
    // let buttonWidth;
    // let buttonHeight;
    // String text;
    // let textSize;
    // boolean hoverShading;

    constructor(x, y, w, h, t, ts, hs){
        this.buttonX = x;
        this.buttonY = y;
        this.buttonWidth = w;
        this.buttonHeight = h;
        this.text = t;
        this.textSize = ts;
        this.hoverShading = hs;
    }

    display(){
        stroke(255);
        strokeWeight(2);
        if (this.mouseOver()) {
            fill(29, 155, 196);
        }
        else{
            fill(33, 175, 222);
        }
        rectMode(CENTER);
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        fill(255);
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        text(this.text, this.buttonX, this.buttonY);
    }

    mouseOver()  {
        return mouseX >= this.buttonX-this.buttonWidth/2 && mouseX <= this.buttonX+this.buttonWidth/2 && mouseY >= this.buttonY-this.buttonHeight/2 && mouseY <= this.buttonY+this.buttonHeight/2;
    }
}

let screen = 0;
/*
Screens:
0 - Start
1 - Meditate
2 - Done
*/
let totalMinutes = 2;

let minusTime;
let plusTime;
let start;

let back = new Button(0,0,0,0,"",0,false);
let restart = new Button(0,0,0,0,"",0,false);

let ellipseSize = 100;
let change = 1;

let startTime = 0;
let timeWaiting = 0;

function setup(){
  createCanvas(800,600);
  frameRate(25);
}

function draw(){
  if(screen == 0){
    drawStartScreen();
  }
  if(screen == 1){
    drawMeditateScreen();
  }
  if(screen == 2){
    drawDoneScreen();
  }
}

function drawStartScreen(){
  background(33, 175, 222);
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text("Phokus", width/2, height/2-100);
  textSize(40);
  text("Meditate", width/2, height/2-40);
  minusTime = new Button(width/2-100, height/2+50, 70, 70, "-", 60, true);
  plusTime = new Button(width/2+100, height/2+50, 70, 70, "+", 60, true);
  minusTime.display();
  plusTime.display();
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text(totalMinutes, width/2, height/2+50);
  textSize(20);
  text("min(s)", width/2, height/2+80);
  start = new Button(width/2, height/2+150, 300, 100, "Start", 60, true);
  start.display();
}

function drawMeditateScreen(){
  background(33, 175, 222);
  ellipseMode(CENTER);
  fill(255);
  noStroke();
  ellipse(width/2, height/2, ellipseSize, ellipseSize);
  ellipseSize += change;
  if(ellipseSize === 175){
    change = -1;
    // sleep(1000);

  }
  if(ellipseSize === 100){
    change = 1;
    // sleep(1000);
  }
  fill(255);
  textSize(40);
  if(change === -1){
    text("Now slowly exhale...", width/2, height/2+200);
  }
  if(change === 1){
    text("Now take a deep breath in...", width/2, height/2+200);
  }
  let secondsElapsed = (millis()-startTime+timeWaiting)/1000;
  let secondsRemaining = totalMinutes*60 - secondsElapsed;
  // console.log(int(secondsElapsed/60));
  // console.log(totalMinutes);
  if(int(secondsElapsed/60) == totalMinutes){
    screen = 2;
  }
  textAlign(RIGHT);
  minutes = floor(secondsRemaining/60);
  let seconds = secondsRemaining%60;
  let timeRemaining = str(minutes) + ":";
  if(seconds < 10){
    timeRemaining += "0";
  }
  timeRemaining += str(int(seconds));
  text(timeRemaining, width-10, 35);
  back = new Button(70, 30, 120, 40, "<- Back", 30, true);
  back.display();
}

function drawDoneScreen(){
  background(33, 175, 222);
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("Done!", width/2, height/2);
  restart = new Button(width/2, height/2+175, 275, 80, "Restart", 50, true);
  restart.display();
  imageMode(CENTER);
}

function mousePressed(){
  if(screen == 0){
    if(minusTime.mouseOver()){
        if(totalMinutes > 1){
          totalMinutes--;
        }
      }
    if(plusTime.mouseOver()){
      if(totalMinutes < 5){
        totalMinutes++;
      }
    }
    if(start.mouseOver()){
      screen = 1;
      startTime = millis();
    }
  }
  if(screen == 1){
    if(back.mouseOver()){
      reset();
      screen = 0;
    }
  }
  if(screen == 2){
    if(restart.mouseOver()){
      reset();
      screen = 0;
    }
  }
}

function reset(){
  totalMinutes = 2;
  ellipseSize = 100;
  change = 1;
  startTime = 0;
  timeWaiting = 0;
}

