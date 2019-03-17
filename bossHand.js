class BossHand
{
    constructor()
    {
        this.posX = 0;
        this.posY = 0;
        this.texture = null;
        this.velocityX = 0;
        this.velocityY = 0;

        var rnd = Math.floor(Math.random()*4);
        if(rnd == 0)//bottom
        {
            this.texture = love.graphics.newImage("pictures/bossHand_bottom.png");
            this.posX = Math.floor(Math.random()*1204);
            this.velocityY = -gameSettings.bossHandSpeed;
            this.posY = 720;
        }
        else if(rnd == 1)//top
        {
            this.texture = love.graphics.newImage("pictures/bossHand_top.png");
            this.posX = Math.floor(Math.random()*1204);
            this.velocityY = gameSettings.bossHandSpeed;
            this.posY = -150;
        }
        else if(rnd == 2)//left
        {
            this.texture = love.graphics.newImage("pictures/bossHand_left.png");
            this.posY = Math.floor(Math.random()*(gameSettings.bossHandMaxHeight-gameSettings.bossHandMinHeight))+gameSettings.bossHandMinHeight;
            this.velocityX = gameSettings.bossHandSpeed;
            this.posX = -150;
        }
        else if(rnd == 3)//right
        {
            this.texture = love.graphics.newImage("pictures/bossHand_right.png");
            this.posY = Math.floor(Math.random()*(gameSettings.bossHandMaxHeight-gameSettings.bossHandMinHeight))+gameSettings.bossHandMinHeight;
            this.velocityX = -gameSettings.bossHandSpeed;
            this.posX = 1280;
        }
    }

    update(dt)
    {
        this.posX += dt*this.velocityX;
        this.posY += dt*this.velocityY;
    }

    draw()
    {
        love.graphics.draw(this.texture,this.posX,this.posY);
    }


}