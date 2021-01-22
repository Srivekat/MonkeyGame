var PLAY = 1
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obstacleGroup
var ground , groundImage
var score
var gameOver, restart
 

  

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(550,200);
  
  monkey = createSprite(10,15,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.125;
  
  ground = createSprite(225,199.5, 550, 1);
  //ground.velocityX = -4;
  //ground.x = ground.width /2;
  //console.log(ground.x);
      
foodGroup = new Group();
 obstacleGroup = new Group();
  score = 0;
  var survialTime = 0
}


function draw() {
 background(255);
 
  if (gameState===PLAY){
  
 if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    
  
    //monkey.collide(ground);
    spawnFood();
    spawnObstacle();
  
  
    }
    

   
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    if(monkey.isTouching(FoodGroup))
    { FoodGroup.destroyEach(); score = score + 1; }
    
    //change the trex animation
    monkey.changeAnimation("collided",monkey_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    
 
      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
   
    

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  spawnFood();
  spawnObstacle();
  stroke("white");
  textSize(20);
  fill("white");
  text("score "+ score,500,50);
  if(obstacleGroup.isTouching(monkey))
  { ground.velocityX = 0; 
   monkey.velocityY = 0; 
   obstacleGroup.setVelocityXEach(0);
    
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time: "+ survivalTime, 100,50)
  

  drawSprites()
}
function spawnFood(){
   //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana=createSprite(100,200,10,20);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -5;
    banana.lifetime=100;
}

}

function spawnObstacle(){
   //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(200,200,10,20);
//obstacle.y = Math.round(random(80,120));
 obstacle.addImage(obstacleImage);
   obstacle.scale = 0.3;
   obstacle.velocityX = -3;
   obstacle.lifetime=100;
}
}

