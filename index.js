var playerX = 250;
var playerY = 250;

var gameState = 1;
// 0 = main menu, 1 = actual game thing, 2 = game over screen
// the sprites
var players;
var player1;
var player2;
var walls;
var wall1;
var wall2;
var wall3;
var wall4;
var wall5;
var wall6;
// the way the players were last moving
var direction1;
var direction2;



function preload() {
	thinkImg = loadImage("assets/think.png");
	laughImg = loadImage("assets/cry_laugh.png");
	gunImg = loadImage("assets/gun.png");
	bg = loadImage("assets/space_background.png")
}


function setup() { 
	createCanvas(600, 500);
	imageMode(CENTER);

	// creating player1
	player1 = createSprite(playerX+75, playerY, 50, 50);
	player1.addImage(thinkImg);
	player1.scale = 0.067;
	player1.velocity.y = 0;
	player1.velocity.x = 0;


	// creating player2
	player2 = createSprite(playerX, playerY, 50, 50);
	player2.addImage(laughImg);
	player2.scale = 0.066;
	player2.velocity.y = 0;
	player2.velocity.x = 0;

	// creating a group and adding the players to it
	players = new Group();
	players.add(player1);
	players.add(player2);


	// creating the level
	walls = new Group();
	push();
	imageMode(CORNER);	
	wall1 = createSprite(150,120,20,100)
	wall2 = createSprite(0,160,280,20)
	wall3 = createSprite(450,150,20,150)
	wall4 = createSprite(500,350,200,20)
	wall5 = createSprite(150,350,20,100)



	walls.add(wall1);
	walls.add(wall2);
	walls.add(wall3);
	walls.add(wall4);
	walls.add(wall5);
	for (var i = 0; i < walls.length; i++) {
		walls[i].shapeColor = "blue";
	}
	pop();
}


function draw() {
	//main menu
	if (gameState == 0) {
		background(40);
		menu();
	}
	//level with players
	else if (gameState == 1) {
		// background(80);
		image(bg,width/2,height/2);
		playerMovement();	
		collision();	
		drawSprites();
	}
	//game over screen
	else if (gameState == 2) {
		gameOver();
	}
}

function playerMovement() {
	// player1 move left
	if (keyIsDown(37)&&player1.position.x>25&&!player1.overlap(walls)) {
		player1.position.x -= 8;
		direction1 = "LEFT";
	}
	// player1 move right
	if (keyIsDown(39)&&player1.position.x<width-25&&!player1.overlap(walls)) {
		player1.position.x += 8;
		direction1 = "RIGHT"
	}
	// player1 move up
	if (keyIsDown(38)&&player1.position.y>25&&!player1.overlap(walls)) {
		player1.position.y -= 8;
		direction1 = "UP"
	}
	// player1 move down
	if (keyIsDown(40)&&player1.position.y<height-25&&!player1.overlap(walls)) {
		player1.position.y += 8;
		direction1 = "DOWN"
	}

	// player2 move left
	if (keyIsDown(65)&&player2.position.x>25&&!player2.overlap(walls)) {
		player2.position.x -= 8;
		direction2 = "LEFT";
	}
	// player2 move right
	if (keyIsDown(68)&&player2.position.x<width-25&&!player2.overlap(walls)) {
		player2.position.x += 8;
		direction2 = "RIGHT";
	}
	// player2 move up
	if (keyIsDown(87)&&player2.position.y>25&&!player2.overlap(walls)) {
		player2.position.y -= 8;
		direction2 = "UP";
	}
	// player2 move down
	if (keyIsDown(83)&&player2.position.y<height-25&&!player2.overlap(walls)) {
		player2.position.y += 8;
		direction2 = "DOWN";
	}
}


function keyPressed() {
	// pressing space on main menu
	if (keyCode === 32 && gameState == 0) {
		// enters main game
		gameState = 1;
	}
	// pressing space on game over screen
	if (keyCode === 32 && gameState == 2) {
		// enters main menu
		gameState = 0;
	}
}


function menu() {
	// white text displaying the name of the game and how to start
	fill(255);
	textSize(58);
	textAlign(CENTER);
	text("Emoji Game",width/2,(height/2)-50)

	textSize(36);
	text("Press SPACE to start",width/2,height/2)
}

function gameOver() {
	//text showing winner, time elapsed and total lives lost
}

function collision() {
	if (player1.overlap(walls)) {
		// decrease health slightly
		player1.position.x = playerX+75;
		player1.position.y = playerY;
	}

	if (player2.overlap(walls)) {
		// decrease health slightly
		player2.position.x = playerX;
		player2.position.y = playerY;
	}
}