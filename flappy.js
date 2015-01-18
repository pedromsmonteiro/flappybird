// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', stateActions);
var welcome;
var score = 0;
var label_score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/Pie.png");
    game.load.audio("score", "assets/TIE-Fire.wav");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#CC0000");
    welcome = game.add.text(675,450,"warm apple pie", {font: "40px Helvetica", fill: "#FFCC00"});
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    label_score = game.add.text(10,460, score);
    player = game.add.sprite(500,250,"playerImg");
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
}

function clickHandler(event){
    //game.add.sprite(event.x, event.y, "playerImg");
    player.x = event.x;
    player.y = event.y;
    changeScore();
}

function spaceHandler(){
    player.kill();
    game.sound.play("score");
    score = 0;
    label_score.setText(score.toString());
}

function changeScore(){
    score = score+Math.PI;
    label_score.setText(score.toString());
}

function moveRight(){
    player.x = player.x+20;
}

function moveLeft(){
    player.x = player.x-20;
}

function moveUp(){
    player.y = player.y-20;
}

function moveDown(){
    player.y = player.y+20;
}