var playerX = 250;
var playerY = 250;

var gameState = 0;
// 0 = main menu, 1 = actual game thing, 2 = game over screen
// defining sprites
var player1;
var player2;
var weapon1;
var weapon2;
var wall1;
var wall2;
var wall3;
var wall4;
var wall5;
var wall6;
// the way the players were last moving
var direction1 = "RIGHT";
var direction2 = "LEFT";
// player that wins
var winner;



function preload() {
	// loading images into variables
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
	// create player1's weapon
	weapon1 = createSprite(player1.position.x-30, player1.position.y, 20, 20);
	weapon1.addImage(gunImg);
	weapon1.scale = 0.04;

	// creating player2
	player2 = createSprite(playerX, playerY, 50, 50);
	player2.addImage(laughImg);
	player2.scale = 0.065;
	player2.velocity.y = 0;
	player2.velocity.x = 0;
	// creating player2's weapon
	weapon2 = createSprite(player2.position.x-30, player2.position.y, 20, 20);
	weapon2.addImage(gunImg);
	weapon2.scale = 0.04;

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

	// creating group for bullets
	bullets = new Group();
}


function draw() {
	//main menu
	if (gameState == 0) {
		player1.health = 100;
		player1.lives = 5;
		player2.health = 100;
		player2.lives = 5;

		background(40);
		menu();
	}
	//level with players
	else if (gameState == 1) {
		// background
		image(bg,width/2,height/2);
		// player controls function
		playerMovement();	
		// collision
		players.collide(walls);
		bullets.overlap(walls, wallsHit);
		bullets.overlap(players, playersHit);
		// respawning players
		if (player1.lives>0) {
			if (player1.health<=0) {
				// decrement player's lives
				player1.lives -= 1;
				// reset player's position
				player1.position.x = playerX+75;
				player1.position.y = playerY;
				// reset player's health
				player1.health = 100;
			}
		}
		else {
			// player 2 wins
			winner = 2;
			gameState = 2;
		}
		if (player2.lives>0) {
			if (player2.health<=0) {
				// decrement player's lives
				player2.lives -= 1;
				// reset player's position
				player2.position.x = playerX;
				player2.position.y = playerY;
				// reset player's health
				player2.health = 100;
			}
		}
		else {
			// player 1 wins
			winner = 1;
			gameState = 2;
		}
		// hud function
		hud();
		// weapons function
		weapons();
		// draws sprites on canvas (players, walls, bullets and weapons)
		drawSprites();
	}
	//game over screen
	else if (gameState == 2) {
		background(80);
		gameOver();
	}
}

function playerMovement() {
	// player1 move left
	if (keyIsDown(37)&&player1.position.x>25) {
		player1.position.x -= 8;
		direction1 = "LEFT";
	}
	// player1 move right
	if (keyIsDown(39)&&player1.position.x<width-25) {
		player1.position.x += 8;
		direction1 = "RIGHT"
	}
	// player1 move up
	if (keyIsDown(38)&&player1.position.y>25) {
		player1.position.y -= 8;
		direction1 = "UP"
	}
	// player1 move down
	if (keyIsDown(40)&&player1.position.y<height-25) {
		player1.position.y += 8;
		direction1 = "DOWN"
	}
	// player 1 shoot
	if (keyWentDown(191)) {
		if (direction1 == "RIGHT") {
			var bullet = createSprite(player1.position.x+40, player1.position.y-7,5,3);
			bullet.setSpeed(10,0);
		}
		if (direction1 == "LEFT") {
			var bullet = createSprite(player1.position.x-40,player1.position.y-7,5,3);
			bullet.setSpeed(10,180);
		}
		if (direction1 == "UP") {
			var bullet = createSprite(player1.position.x+7,player1.position.y-40,3,5);
			bullet.setSpeed(10,270);
		}
		if (direction1 == "DOWN") {
			var bullet = createSprite(player1.position.x-7,player1.position.y+40,3,5);
			bullet.setSpeed(10,90);
		}
		// make shooting sound
		bullet.life = 180;
		bullet.shapeColor = "lightGreen";
		bullets.add(bullet);
	}

	// player2 move left
	if (keyIsDown(65)&&player2.position.x>25) {
		player2.position.x -= 8;
		direction2 = "LEFT";
	}
	// player2 move right
	if (keyIsDown(68)&&player2.position.x<width-25) {
		player2.position.x += 8;
		direction2 = "RIGHT";
	}
	// player2 move up
	if (keyIsDown(87)&&player2.position.y>25) {
		player2.position.y -= 8;
		direction2 = "UP";
	}
	// player2 move down
	if (keyIsDown(83)&&player2.position.y<height-25) {
		player2.position.y += 8;
		direction2 = "DOWN";
	}
	// player 2 shoot
	if (keyWentDown(81)) {
		if (direction2 == "RIGHT") {
			var bullet = createSprite(player2.position.x+40, player2.position.y-7,5,3);
			bullet.setSpeed(10,0);
		}
		if (direction2 == "LEFT") {
			var bullet = createSprite(player2.position.x-40,player2.position.y-7,5,3);
			bullet.setSpeed(10,180);
		}
		if (direction2 == "UP") {
			var bullet = createSprite(player2.position.x+7,player2.position.y-40,3,5);
			bullet.setSpeed(10,270);
		}
		if (direction2 == "DOWN") {
			var bullet = createSprite(player2.position.x-7,player2.position.y+40,3,5);
			bullet.setSpeed(10,90);
		}
		// make shooting sound
		bullet.life = 180;
		bullet.shapeColor = "lightGreen";
		bullets.add(bullet);
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

function hud() {
	fill(40);
	textSize(16);
	text("Player 1 health: "+player1.health,20,20);
	text("Lives left: "+player1.lives,20,40);

	text("Player 2 health: "+player2.health,440,20);
	text("Lives left: "+player2.lives,440,40);
}

function menu() {
	// white text displaying the name of the game and how to start
	fill(255);
	textSize(58);
	textAlign(CENTER);
	text("Emoji Game",width/2,(height/2)-50);

	textSize(36);
	text("Press SPACE to start",width/2,height/2);
}

function gameOver() {
	fill(255);
	textSize(58);
	textAlign(CENTER);
	text("Player "+winner+" wins!",width/2,(height/2)-50)
	textSize(36);
	text(10-(player1.lives+player2.lives)+" lives were lost", width/2,height/2);
	text("Press SPACE to continue",width/2,(height/2)+36)

	//text showing winner, time elapsed and total lives lost
}

function weapons() {
	// setting player1's weapon position and direction
	if (direction1 == "LEFT") {
		weapon1.position.x = player1.position.x-30;
		weapon1.position.y = player1.position.y;
		weapon1.mirrorX(1);
		weapon1.rotation = 0;
	}
	else if (direction1 == "RIGHT") {
		weapon1.position.x = player1.position.x+30;
		weapon1.position.y = player1.position.y;
		weapon1.mirrorX(-1);
		weapon1.rotation = 0;
	}
	else if (direction1 == "UP") {
		weapon1.position.x = player1.position.x;
		weapon1.position.y = player1.position.y-30;
		weapon1.mirrorX(1);
		weapon1.rotation = 90;
	}
	else if (direction1 == "DOWN") {
		weapon1.position.x = player1.position.x;
		weapon1.position.y = player1.position.y+30;
		weapon1.mirrorX(1);
		weapon1.rotation = 270;
	}

	// setting player2's weapon position and direction
	if (direction2 == "LEFT") {
		weapon2.position.x = player2.position.x-30;
		weapon2.position.y = player2.position.y;
		weapon2.mirrorX(1);
		weapon2.rotation = 0;
	}
	else if (direction2 == "RIGHT") {
		weapon2.position.x = player2.position.x+30;
		weapon2.position.y = player2.position.y;
		weapon2.mirrorX(-1);
		weapon2.rotation = 0;
	}
	else if (direction2 == "UP") {
		weapon2.position.x = player2.position.x;
		weapon2.position.y = player2.position.y-30;
		weapon2.mirrorX(1);
		weapon2.rotation = 90;
	}
	else if (direction2 == "DOWN") {
		weapon2.position.x = player2.position.x;
		weapon2.position.y = player2.position.y+30;
		weapon2.mirrorX(1);
		weapon2.rotation = 270;
	}
}

function wallsHit(bullet, wall) {
	bullet.remove();
	//play sound of bullet hitting wall
}

function playersHit(bullet, player) {
	bullet.remove();
	player.health -= 20;
	//play sound of bullet hitting player
	//damage player
}
