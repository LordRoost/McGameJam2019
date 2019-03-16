
var sound = null;
var music = null;

love.load = function()
{
    sound = love.audio.newSource("music/blip.wav");
    music = love.audio.newSource("music/nature.ogg");
    music.play();
}

love.mousepressed = function (x,y,b,isTouch)
{
    sound.play();
}

love.keypressed = function(key, code, isrepeat)
{
    music.stop();
}