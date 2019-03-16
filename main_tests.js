//if(love.keyboard.isDown("s")

var video = null;
var posX = 0;
var direction = 1;

var player = {};

var coinAnimation = null;
var rotation = 0;

var prevRotation = 0;

var bgMusic = null;
var sound = null;

love.load = function()
{
    player.stand = love.graphics.newImage('sprites/player_stand.png');
    video = love.graphics.newVideo("rendered/mrBeanBoth.mp4",true,true,true);

    coinAnimation = new Animation([
        {
            type: "grid",
            imgPath: "sprites/coin_sheet.png",
            rows: 3,
            columns: 3,
            startX: 0,
            startY: 0,
            frameWidth: 41,
            frameHeight: 42,
            numFrames: 8,
            timePerFrame: 0.05
        }
    ]);

    /*
    var testObj = {};
    testObj.var1 = "value1";
    testObj.var2 = "value2";
    testObj.var3 = {"var4": "value4", "var5": "value5"};
    love.filesystem.write("testFile.txt", JSON.stringify(testObj);
    */

    
    bgMusic = love.audio.newAudio("music/Avenger.mp3",true,0.1);
    bgMusic.play();
    sound = love.audio.newAudio("music/Hunt.mp3",true,0.3);
    sound.mute();
    sound.play();
    
}

love.update = function(dt)
{
    posX += dt*280*direction;
    coinAnimation.update(dt);
    prevRotation = rotation;
    rotation += dt;
}

love.draw = function()
{
    love.graphics.setColor(255,255,255);
    love.graphics.rectangle("fill", 0,0,1280,720);
    love.graphics.draw(video,posX,100,0,direction,1);
    love.graphics.draw(player.stand,posX,400,rotation,direction,1,player.stand.getWidth()/2,player.stand.getHeight()/2);

    love.graphics.draw(coinAnimation,30,30,rotation*2,nil,nil,coinAnimation.getWidth()/2,coinAnimation.getHeight()/2);
}

love.keypressed = function(key, scancode, isrepeat)
{
    if(key == "right")
    {
        direction = 1;
        sound.mute();
    }
    else if(key == "left")
    {
        direction = -1;
        sound.unmute();
    }
}

love.mousepressed = function (x,y,b,isTouch)
{
}


/*
canvas = document.createElement('canvas');
canvasContext = canvas.getContext('2d');

canvasContext.translate(width, 0);
canvasContext.scale(-1, 1);
this.canvasContext.drawImage(image, 0, 0);
*/