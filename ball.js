class Ball
{
    constructor(x, y, vX, vY)
    {
        this.x = x;
        this.y = y;
        this.velocityX = vX;
        this.velocityY = vY;
    }

    update(dt)
    {
        this.x += this.velocityX*dt;
        if(this.x + 100 > love.graphics.getWidth())
        {
            this.x = love.graphics.getWidth()-100;
            this.velocityX *= -1;
        }
        else if(this.x < 0)
        {
            this.x = 0;
            this.velocityX *= -1;
        }

        this.y += this.velocityY*dt;
        if(this.y + 100 > love.graphics.getHeight())
        {
            this.y = love.graphics.getHeight() - 100;
            this.velocityY *= -1;
        }
        else if(this.y < 0)
        {
            this.y = 0;
            this.velocityY *= -1;
        }
    }

    draw()
    {
        love.graphics.draw(gameScreen.ballTexture,this.x,this.y);
    }
}