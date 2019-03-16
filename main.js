
var gameSettings = {

    gravity: 70,
    jumpHoldGravity: 20,
    playerRunSpeed: 500,
    playerJumpVelocity: -20,
    playerScale: 0.8
};

var currentScreen = null;
var mainCharacter = null;
var gravity = gameSettings.gravity;
var jumpHoldGravity = gameSettings.jumpHoldGravity;

love.load = function()
{
    mainCharacter = new MainCharacter();
    currentScreen = new NightTime();
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
    currentScreen.keypressed(key, scancode, isrepeat)};

love.mousepressed = function (x,y,b,isTouch)
{
    
}