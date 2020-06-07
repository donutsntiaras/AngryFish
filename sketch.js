const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, fish1,fish3;
var backgroundImg,platform;
var shark, slingshot;

var gameState = "onSling";

var score = 0;

var swimage;

function preload() {
    getTime();
   
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
   
       

    box1 = new Shell(700,320,70,70);
    box2 = new Shell(920,320,70,70);
    fish1 = new Fish(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Shell(700,240,70,70);
    box4 = new Shell(920,240,70,70);
    fish3 = new Fish(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Shell(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    shark = new Shark(200,50);
    
    slingshot = new SlingShot(shark.body,{x:150, y:130});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
   
    fill("red");
    textSize(20);
    text("score:" + score, 400, 50);
    Engine.update(engine);
   
    box1.display();
    box2.display();
    ground.display();
    fish1.display();
    log1.display();

    box3.display();
    box4.display();
    fish3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    shark.display();
   
    
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(shark.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(shark.body);
        gameState = "onSling";
    }
}

async function getTime(){
    var clock = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var store = await clock.json();
    console.log(store);
    var datetime = store.datetime;
    var r = datetime.slice(11,13);

    if(r > 06 && r < 19){
      bg = "sprites/b2.jpg";
      
    }
    else{
        bg = "sprites/b.jpg";
    }

    console.log(bg);
    backgroundImg = loadImage(bg);
}