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
    }

    start()
    {
        this.update = this.updateFunction;
        this.draw = this.drawFunction;
    }

    stop()
    {
        this.update = function(dt){};
        this.draw = function(){};
    }

    updateFunction(dt)
    {
        this.snakeAnimation.update(dt);
        if(this.snakeAnimation.frameIndex < 6)
        {
            this.posX += this.speed*dt;
        }
        
        if(this.posX > 1280)
        {
            this.stop();
            gameScreen.currentlyPlayingVid = gameScreen.eraseVid;
            gameScreen.currentlyPlayingVid.play();
        }
    }

    drawFunction()
    {
        love.graphics.draw(this.snakeAnimation,this.posX,this.posY);
    }
}