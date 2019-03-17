class FinalBoss
{
    constructor()
    {
        this.update = function(dt){};
        this.draw = function(){};

        this.music = love.audio.newAudio("music/glitch music.mp3");
        
        this.bossPic = love.graphics.newImage("pictures/finalBoss.png");
        this.finalStagePic = love.graphics.newImage("pictures/finalStagePic.png");
        this.posX = 335;
        this.posY = 720;
        this.upSpeed = 100;
    }

    start()
    {
        this.update = this.updateFunction;
        this.draw = this.drawFunction;
        this.music.play();
    }

    updateFunction(dt)
    {
        if(this.posY > 0)
        {
            this.posY -= this.upSpeed*dt;
        }
    }

    drawFunction()
    {
        love.graphics.draw(this.bossPic,this.posX,this.posY);
        love.graphics.draw(this.finalStagePic,0,0);
    }
}