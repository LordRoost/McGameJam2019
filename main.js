
var gameSettings = {

    // gravity: 70,
    // jumpHoldGravity: 20,
    // playerRunSpeed: 500,
    // playerJumpVelocity: -20,
    // playerScale: 1

    gravity: 200,
    jumpHoldGravity: 75,
    playerRunSpeed: 550,
    playerJumpVelocity: -30,
    playerScale: 1.0,
    floorLevel: 570,
    timeBetweenSnakeProjectiles: 15,
    snakeProjectileBaseSpeed: 200,
    snakeProjectileVariation: 200,
    snakeProjectileHitRadius: 50,
    snakeRadius: 200,
    handSpeed: 200,
    handDistance:200,
    numberOfHands:10,
    bossNumberOfHands: 1,
    bossHandSpawnRate: 1,
    bossHandMinHeight: 0,
    bossHandMaxHeight: 700,
    bossHandSpeed: 200,
    bossSpeed: 500,
    bloodStreamTime: 1,
    bloodPauseTime: 1,
    bloodPhaseTime: 5
};

var currentScreen = null;
var menuScreen = null;
var gameOverScreen = null;
var victoryScreen = null;
var mainCharacter = null;
var gravity = gameSettings.gravity;
var jumpHoldGravity = gameSettings.jumpHoldGravity;

var gameScreen = null;
var menuScreen = null;

love.load = function()
{
    mainCharacter = new MainCharacter();
    menuScreen = new MenuScreen();
    gameOverScreen = new GameOverScreen();
    victoryScreen = new VictoryScreen();
    gameScreen = new NightTime();
    currentScreen = menuScreen;
}

love.update = function(dt)
{
    currentScreen.update(dt);
}

love.draw = function()
{
    currentScreen.draw();
}

love.keypressed = function(key, scancode, isrepeat)
{
    currentScreen.keypressed(key, scancode, isrepeat)
};

love.mousepressed = function (x,y,b,isTouch)
{
    currentScreen.mousepressed(x,y,b,isTouch);
}