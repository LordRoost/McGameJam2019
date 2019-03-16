
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
    timeBetweenSnakeProjectiles: 2,
    snakeProjectileBaseSpeed: 200,
    snakeProjectileVariation: 200,
    snakeProjectileHitRadius: 50
};

var currentScreen = null;
var menuScreen = null;
var mainCharacter = null;
var gravity = gameSettings.gravity;
var jumpHoldGravity = gameSettings.jumpHoldGravity;

var gameScreen = null;
var menuScreen = null;

love.load = function()
{
    mainCharacter = new MainCharacter();
    menuScreen = new MenuScreen();
    gameScreen = new NightTime();
    currentScreen = gameScreen;
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