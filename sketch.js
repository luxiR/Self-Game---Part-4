var girlImg, girl
var bgImg, bg
var athenaImg, athena, athenaGroup
var coinImg, coin, coinGroup
var score = 0
var artemis, artemisImg, artemisGroup
var daggerImg, dagger, daggerGroup
var reset, resetImg
var heart1, heart2, heart3, livesImg, lifeCount = 4
var game_over, game_overImg
var playState = 1
var endState = 0
var gameState = playState
var game_over_sound
var dagger_sound
var background_music
var mute_button,mute_buttonImg, audio_buttonImg, audio_button

function preload(){
girlImg = loadImage ("Images/girl_running.png")
bgImg = loadImage ("Images/greek_mythology_background.jpg")
athenaImg = loadImage ("Images/athena.png")
artemisImg = loadImage ("Images/artemis.png")
daggerImg = loadImage ("Images/dagger.png")
resetImg = loadImage ("Images/reset.png")
game_overImg = loadImage ("Images/game_over.png")
livesImg = loadImage ("Images/heart.png")
coinImg = loadImage ("Images/drachma.png")
game_over_sound = loadSound ("Images/game_over_sound.wav")
dagger_sound = loadSound ("Images/dagger_sound.wav")
coin_sound = loadSound ("Images/coin_sound.wav")
background_music = loadSound ("Images/background_music.wav")
audio_buttonImg = loadImage ("Images/audio_button.png")
mute_buttonImg = loadImage ("Images/mute-button.png")
}

function setup() {

  createCanvas(1000,800)

  background_music.play ()
  background_music.setVolume (0.05)

  bg = createSprite (500,400,50,50)
  bg.addImage (bgImg)
  bg.scale = 1
  bg.velocityX = -2

  girl = createSprite (200,200,100,100)
  girl.addImage (girlImg)
  girl.scale = 0.4

  athenaGroup = new Group ()

  artemisGroup = new Group ()

  coinGroup = new Group ()

  daggerGroup = new Group ()

  heart1 = createSprite (720, 75, 50, 50)
  heart1.addImage ("heart1", livesImg)
  heart1.scale = 0.1

  heart2 = createSprite (760,75,50,50)
  heart2.addImage ("heart2", livesImg)
  heart2.scale = 0.1

  heart3 = createSprite (800,75,50,50)
  heart3.addImage ("heart3", livesImg)
  heart3.scale = 0.1

  reset = createSprite (500,650,50,50)
  reset.addImage (resetImg)
  reset.scale = 0.5

  game_over = createSprite (500,475,50,50)
  game_over.addImage (game_overImg)
  game_over.scale = 0.9

  mute_button = createSprite (900,75,60,60)
  mute_button.scale = 0.1
  mute_button.addImage("mute_button",mute_buttonImg)
  mute_button.addImage ("audio_button", audio_buttonImg)
}

function draw() {
  //set background color
  background("white");

  if (mousePressedOver(mute_button)) {
    mute ()
  }

  if (gameState === playState) {

    girl.visible = true
    
    if (keyDown ("SPACE")) {
      Dagger ()
      dagger_sound.play ()
    }
  
    if (daggerGroup.isTouching (athenaGroup)) {
      athenaGroup.destroyEach ()
      daggerGroup.destroyEach ()
      score += 15
    }
  
    if (daggerGroup.isTouching (artemisGroup)) {
      artemisGroup.destroyEach ()
      daggerGroup.destroyEach ()
      score += 15
    }
  
    if (coinGroup.isTouching (girl)) {
      coinGroup.destroyEach ()
      coinGroup.setVelocityXEach(0)
      score += 10
      coin_sound.play ()
    }

    if (girl.isTouching (athenaGroup)) {
      lifeCount = lifeCount - 1
      console.log (lifeCount)
      athenaGroup.destroyEach ()
      score = score - 10
  
      if (lifeCount === 3) {
        heart3.visible = false
      }
  
      if (lifeCount === 2) {
        heart2.visible = false
      }
  
      if (lifeCount === 1) {
        heart1.visible = false
       // gameState = endState
      }
    }

    if (girl.isTouching (artemisGroup)) {
    
      lifeCount = lifeCount - 1
      //console.log (lifeCount)
      artemisGroup.destroyEach ()
  
      score = score - 10
      
      if (lifeCount === 3) {
        heart3.visible = false
      }
  
      if (lifeCount === 2) {
        heart2.visible = false
      }
  
      if (lifeCount === 1) {
        heart1.visible = false
        gameState = endState
        game_over_sound.setVolume (0.25)
        game_over_sound.play ()
        //game_over_sound.loop = false
      }
    }
    console.log (gameState)

    if (bg.x < 500) {
      bg.x = 600
    }
 
    if (keyDown (UP_ARROW)){
      girl.y = girl.y - 5
    }

    if (keyDown (DOWN_ARROW)){
      girl.y = girl.y + 5
    }

    game_over.visible = false
    reset.visible = false
  }
  
  Athena ()
  Artemis ()
  Coin ()

  drawSprites ()

  textSize (30)
  fill ("black")
  text ("Score: " + score,100,100)

  if (gameState === endState) {
    athenaGroup.destroyEach ()
    artemisGroup.destroyEach ()
    daggerGroup.destroyEach ()

    girl.visible = false

    background_music.stop ()

    bg.velocityX = 0

    coinGroup.setVelocityXEach(0)
    coinGroup.destroyEach ()
    
    game_over.visible = true
    reset.visible = true

    if (mousePressedOver (reset)) {
      //console.log ("reset")
      Reset ()
    }
  }
}

function Athena () {
  
  if (frameCount % 150 == 0) {
    athena = createSprite (800,Math.round (random (100,700)),75,75)
    athena.addImage (athenaImg)
    athena.scale = 0.5
    athena.velocityX = -5
    athenaGroup.add (athena)
    athena.setCollider ("rectangle", 30, 0, 70, 300)
    //athena.debug = true
  }
}

function Artemis () {
  
  if (frameCount % 230 == 0) {
    artemis = createSprite (800,Math.round (random (100,700)),75,75)
    artemis.addImage (artemisImg)
    artemis.scale = 0.5
    artemis.velocityX = -6
    artemisGroup.add (artemis)
    artemis.setCollider ("rectangle", 30, 0, 70, 300)
    //artemis.debug = true

  }
}

function Dagger () {

  dagger = createSprite (girl.x + 50,girl.y,50,50)
  dagger.addImage (daggerImg)
  dagger.scale = 0.3
  dagger.velocityX = 4
  daggerGroup.add (dagger)
}

function Reset () {
  game_over.visible = false
  reset.visible = false
  girl.visible = true
  score = 0
  gameState = playState
  bg.velocityX = -2
  heart1.visible = true
  heart2.visible = true
  heart3.visible = true
  coin.visible = true
  lifeCount = 4
}

function Coin(){
  if (frameCount % 175 === 0) {
    coin = createSprite (900, Math.round(random(100,700)), 100, 100)
    coinGroup.add (coin)
    coin.addImage (coinImg)
    coin.scale = 0.2
    coin.velocityX = -5
    coin.setCollider ("rectangle", 30, 0, 70, 300)
    //coin.debug = true

  }
}

function mute () {
  if (background_music.isPlaying ()) {
    background_music.stop ()
    mute_button.changeImage ("mute_button")
  }
  else {
    background_music.play ()
    mute_button.changeImage ("audio_button")
    //audio_button.visible = true
    //mute_button.visible = false
  }
}




