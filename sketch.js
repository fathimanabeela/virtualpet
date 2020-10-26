var dog, happyDog, foodS, foodstock, database, Dogsprite

function preload(){

  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  Dogsprite = createSprite(300,300);
  Dogsprite.addImage(dog);
  Dogsprite.scale = 0.5

  database = firebase.database()
  foodstock = database.ref("food");
  foodstock.on("value", readStock);
}


function draw() {  
  background(46,139,87)

  if (keyWentDown(UP_ARROW)){
    foodS = foodS-1
    writeStock(foodS);
    Dogsprite.addImage(happyDog);
  }

  drawSprites();
  textSize(20);
  fill("white")
  text("press upArrow to feed rex milk!", 50, 50);
  if (foodS !== undefined){
    text("remaining food:"+foodS, 50, 100)
  }
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })

}


