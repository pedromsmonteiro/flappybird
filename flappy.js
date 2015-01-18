// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(600, 500, Phaser.AUTO, 'game', stateActions);
var welcome;
var score = 0;
var label_score;
var player;
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/pie2.png");
    game.load.audio("score", "assets/TIE-Fire.wav");
    game.load.image("pipe","assets/line.png");
    game.load.image("pipedown", "assets/rsz_fork_down.png");
    game.load.image("pipeup", "assets/rsz_fork_up.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#FFFFF8");
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    player = game.add.sprite(120,250,"playerImg");
    game.physics.arcade.enable(player);
    pipes = game.add.group();
    welcome = game.add.text(300,20,"warm apple pie", {font: "40px Helvetica", fill: "#FFCC00"});
    label_score = game.add.text(10,460, "0");
    generate_pipe();
    player.body.gravity.y=500;
    pipe_interval = 2;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);
}


function changeScore(){
    score = score+Math.PI;
    if (score > 1) {
        label_score.setText(score.toString());
    }
}

function clickHandler(){
    player_jump();
}

function spaceHandler(){
    player_jump();
}

function moveRight(){
    player.x = player.x+10;
}

function moveLeft(){
    player.x = player.x-10;
}

function moveUp(){
    player.y = player.y-10;
}

function moveDown(){
    player.y = player.y+10;
}

function generate_pipe() {
    changeScore();
        var gap_start = game.rnd.integerInRange(2, 6);
        for (var count = 0; count < 10; count++) {
            if (count == gap_start-1) {
                add_endpipedown_block(1000, count * 50);
            }
            else {
                if (count == gap_start + 2) {
                    add_endpipeup_block(1000, count * 50);
                }
                else {
                    if (count != gap_start && count != gap_start + 1) {
                        add_pipe_block(1000, count * 50);
                    }
                }
            }
        }
    //changeScore();
}

function add_pipe_block(x,y){
    var pipe = pipes.create(x,y,"pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

}

function add_endpipedown_block(x,y){
    var pipe = pipes.create(x,y,"pipedown");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function add_endpipeup_block(x,y){
    var pipe = pipes.create(x,y,"pipeup");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function player_jump(){
    player.body.velocity.y = -200;
    game.sound.play("score");
}

function game_over(){
    game.add.text(300,200,"eat pie", {font: "60px Helvetica", fill: "#FFCC00"});
    location.reload();
}