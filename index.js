var playerX = 250;
var playerY = 250;
var groundY = 460;
var jumping1 = false;
var jumping2 = false;
// bool of players' jumping states
var player1;
var player2;
var ground;
var gameState = 0;
// 0 = main menu, 1 = actual game thing, 2 = game over screen
var players;
var allowMovement = true;
var gap;

function preload() {
	thinkImg = loadImage("assets/think.png");
	laughImg = loadImage("assets/cry_laugh.png");
	gunImg = loadImage("assets/gun.png");
	bg = loadImage("assets/space_background.png")

}


function setup() {
	createCanvas(600, 500);
	ground = createSprite(width / 2, groundY + 5, width, 10);
	imageMode(CENTER);

	player1 = createSprite(playerX, playerY, 50, 50);
	player1.addImage(thinkImg);
	player1.scale = 0.067;
	player1.velocity.y = 0;
	player1.velocity.x = 0;


	player2 = createSprite(playerX + 75, playerY, 50, 50);
	player2.addImage(laughImg);
	player2.scale = 0.066;
	player2.velocity.y = 0;
	player2.velocity.x = 0;

	players = new Group();
	players.add(player1);
	players.add(player2);


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
		drawSprites();
		gravity();
	}
	//game over screen
	else if (gameState == 2) {
		gameOver();
	}
}

function playerMovement() {
	if (keyIsDown(37) && player1.position.x - 25 > 0 && allowMovement) {
		if (jumping1) {
			player1.position.x -= 12;
		}
		else {
			player1.position.x -= 8;
		}
	}
	if (keyIsDown(39) && player1.position.x + 25 < width && allowMovement) {
		if (jumping1) {
			player1.position.x += 12;
		}
		else {
			player1.position.x += 8;
		}
	}

	if (keyIsDown(65) && player2.position.x - 25 > 0 && allowMovement) {
		if (jumping2) {
			player2.position.x -= 12;
		}
		else {
			player2.position.x -= 8;
		}
	}
	if (keyIsDown(68) && player2.position.x + 25 < width && allowMovement) {
		if (jumping2) {
			player2.position.x += 12;
		}
		else {
			player2.position.x += 8;
		}
	}
}


function keyPressed() {
	if (keyCode === 38 && !jumping1) {
		player1.velocity.y = -14;
		jumping1 = true;
	}

	if (keyCode === 87 && !jumping2) {
		player2.velocity.y = -14;
		jumping2 = true;
	}

	if (keyCode === 32 && gameState == 0) {
		gameState = 1;
	}
}


function gravity() {
	if (!player1.overlap(ground)) {
		player1.velocity.y += 1;
	}
	else {
		player1.velocity.y = 0;
		player1.position.y = groundY - 25;
		jumping1 = false;
	}

	if (!player2.overlap(ground)) {
		player2.velocity.y += 1;
	}
	else {
		player2.velocity.y = 0;
		player2.position.y = groundY - 25;
		jumping2 = false;
	}
}

function menu() {
	
	//Maybe I should develop this part
}

function gameOver() {
	//I should probably also develop this too
}

