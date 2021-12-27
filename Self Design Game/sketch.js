var title, titleImg
var start, startImg;
var rocket, rocket1Img, rocket2Img;
var moon, moonImg;
var asteroidGroup, asteroids, asteroidImg, asteroidImg2;
var gameState = 0;
var heartFull, heartOver, heartMid1, heartMid2;
var heart;
var life=3
var over, overImage;
var coin, coinImage
var score = 0;
var coinGroup;
var mars, marsImg;
function preload(){
  bg= loadAnimation("Assets/Bg.png");
  titleImg = loadImage("Assets/Title.png");
  startImg = loadImage("Assets/Start.png");
  rocket1Img = loadAnimation("Assets/Rocket1.png", "Assets/Rocket2.png");
  asteroidImg = loadImage("Assets/Asteroid.png");
  asteroidImg2 = loadImage("Assets/Asteroid2.png");
  moon = loadAnimation("Assets/Moon.png");
  heartFull = loadAnimation("Assets/Heart_Full.png");
  heartOver = loadAnimation("Assets/Heart_Over.png");
  heartMid1 = loadAnimation("Assets/Heart_Lesser.png");
  heartMid2 = loadAnimation("Assets/Heart_VeryLess.png")
  overImage = loadAnimation("Assets/Game_Over.png")
  coinImage = loadImage("Assets/ISS_Coin.png")
  MarsImg = loadImage("Assets/Mars.png")
}

function setup() {
  createCanvas(1536, 672);
  bg1 = createSprite(displayWidth, displayHeight)
  bg1.addAnimation("ba", bg)
  
  bg1.scale = 0.6;

  title = createSprite(768,350)
  title.addImage(titleImg)
  title.scale = 0.15;

  start = createSprite(745,504)
  start.addImage(startImg)
  start.scale = 0.125;

  mars = createSprite(768,286)
  mars.addImage(MarsImg)
  mars.scale = 0.17;

  rocket = createSprite(768,336)
  rocket.addAnimation("Animated Rocket", rocket1Img)
  rocket.scale = 0.7
  rocket.debug = false
  rocket.setCollider("rectangle",-25,-10,200,310);
  
  heart = createSprite(150,100)
  heart.addAnimation("heartFull", heartFull);
  heart.addAnimation("heartOver", heartOver);
  heart.addAnimation("heartMid1", heartMid1);
  heart.addAnimation("heartMid2", heartMid2);
  heart.scale = 0.1;
  

  asteroidsGroup = new Group();
  coinGroup = new Group()
  
}

function draw() {
  background("white");
  if(gameState == 0){
    title.visible = true;
    start.visible = true;
    heart.visible = false;
    mars.visible = false;
    if(mousePressedOver(start)){
      gameState = 1;
    }
  } 
  if(gameState == 1){
    title.visible = false;
    start.visible = false;
    heart.visible = true;
    mars.visible = false;
    
    rocket.position.y = 504;
    if(keyDown("LEFT_ARROW")){
      rocket.x = rocket.x-5;
    }
    if(keyDown("RIGHT_ARROW")){
      rocket.x = rocket.x+5;
    }
    spawnObstacles()
    spawnCoins()
    for(var i = 0;i<asteroidsGroup.length;i++) {
if(asteroidsGroup[i].x> displayWidth-200)
{
  asteroidsGroup[i].x = random(800,1500)
  asteroidsGroup[i].y = random(100,300)
  asteroidsGroup[i].velocityY = 5
  asteroidsGroup[i].velocityX = random(-7, 7)

  

}
    }

if(life === 2)
{
  heart.changeAnimation("heartMid1")
}
if(life === 1)
{
  heart.changeAnimation("heartMid2")
}
if(life === 0)
{
  heart.changeAnimation("heartOver")
  gameState = 2
}
if(life>0)
{
  for (var i = 0;i<asteroidsGroup.length;i++)
  {
    if(asteroidsGroup[i].isTouching(rocket))
    {
      asteroidsGroup[i].destroy()
      life = life-1;
    }
  }
}
for(var i = 0;i<coinGroup.length;i++)
{
  if(coinGroup[i].isTouching(rocket))
  {
    coinGroup[i].destroy()

    score = score+10;
  }
}

    if(score > 50)
    {
      gameState = 3
    }
  }
  if(gameState == 2)
  {
    mars.visible = false;
    heart.visible = false;
    score.visible = false;
    over = createSprite(768, 750)
  over.addAnimation("over", overImage)
  over.scale = 0.2
    over.depth = 100
    asteroidsGroup.destroyEach()
    rocket.visible = false
  }
  if(gameState === 3)
  {
    coinGroup.destroyEach()
    asteroidsGroup.destroyEach()
    mars.visible = true;
    rocket.visible = true;
    rocket.x = 788;
    rocket.y = 336;    
  }
 
  drawSprites();
  fill("yellow")
  textSize(25)
  text("Score: "+score, 1300,50)
}

function spawnObstacles(){
  if(frameCount%100===0){
    asteroids = createSprite(10, random(100,280))
    asteroids.debug = true
  var rand = Math.round(random(1,2))
  if(rand === 2)
  {
asteroids.addImage(asteroidImg2)
  }
  if(rand === 1)
  {
asteroids.addImage(asteroidImg)
  }
  asteroids.scale = 0.1
  asteroids.velocityX = 10
  asteroids.lifetime = 220
  asteroids.setCollider("rectangle",0,0,100,100)
  heart.depth = asteroids.depth+1
  asteroidsGroup.add(asteroids)
  }
}
function spawnCoins()
{
  if(frameCount%50 === 0)
  {
    coin = createSprite(700, 500)
    coin.x = Math.round(random(100,900))
    coin.y = Math.round(random(500,520))
    coin.addImage("coin", coinImage)
    coin.lifetime = 100
    coin.scale = 0.02
    coinGroup.add(coin)
  }
}