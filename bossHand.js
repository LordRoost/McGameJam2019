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
        }
    }
}