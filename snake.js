class Snake
{
    constructor()
    {
        this.update = function(dt){};
        this.draw = function(){};
        this.snakeAnimation = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/snake.png",
                rows: 3,
                columns: 3,
                startX: 0,
                startY: 0,
                frameWidth: 400,
                frameHeight: 400,
                numFrames: 9,
                timePerFrame: 0.1
            }
        ]);
        this.posX = -400;
        this.posY = 320;
        this.speed = 100;
        this.projectiles = new Projectiles(this);
        this.timeBeforeNextBall = gameSettings.timeBetweenSnakeProjectiles;
        this.snakeHitRadius = gameSettings.snakeRadius;
        this.bossMusic = love.audio.newSource("sounds/bossMusic.mp3");

    }

    start()
    {
        this.update = this.updateFunction;
        this.draw = this.drawFunction;
        this.bossMusic.play();
    }

    stop()
    {
        this.update = function(dt){};
        this.draw = function(){};
        gameScreen.currentBoss = gameScreen.handLevel;
        gameScreen.handLevel.start();
    }

    reset()
    {
        this.update = function(dt){};
        this.draw = function(){};
        this.posX = -400;
        this.posY = 320;
        this.projectiles.reset();
    }

    updateFunction(dt)
    {
        this.snakeAnimation.update(dt);
        if(this.snakeAnimation.frameIndex < 6)
        {
            this.posX += this.speed*dt;
        }

        this.projectiles.update(dt);
        
        if(this.posX > 1280)
        {
            this.stop();
            return;
            //gameScreen.currentlyPlayingVid = gameScreen.eraseVid;
            //gameScreen.currentlyPlayingVid.play();
        }

        var playerCenterX = mainCharacter.posX+50;
        var playerCenterY = mainCharacter.posY+50;

        if(Math.sqrt((playerCenterX-(this.posX+200))**2+(playerCenterY-(this.posY+200))**2) < this.snakeHitRadius)
        {
            //alert("you died!");
            currentScreen = gameOverScreen;
            menuScreen.ambiance.play();
            this.bossMusic.stop();
            return;
        }

    }

    drawFunction()
    {
        love.graphics.draw(this.snakeAnimation,this.posX,this.posY);
        this.projectiles.draw();
    }
}