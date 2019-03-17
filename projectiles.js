class Projectiles
{
    constructor(snake)
    {
        this.balls = [];
        this.snake = snake;
        this.timeBeforeNextBall = gameSettings.timeBetweenSnakeProjectiles;
        this.baseSpeed = gameSettings.snakeProjectileBaseSpeed;
        this.varSpeed = gameSettings.snakeProjectileVariation;
        this.hitRadius = gameSettings.snakeProjectileHitRadius;
    }

    update(dt)
    {
        var playerCenterX = mainCharacter.posX+50;
        var playerCenterY = mainCharacter.posY+50;
        var b = null;
        var i = 0;
        for(i=0;i<this.balls.length;i++)
        {
            b = this.balls[i];
            b.update(dt);
            if(Math.sqrt((playerCenterX-b.x-50)**2+(playerCenterY-b.y-50)**2) < this.hitRadius)
            {
                alert("you died");
            }
        }


        this.timeBeforeNextBall -= dt;
        if(this.timeBeforeNextBall < 0)
        {
            this.timeBeforeNextBall = gameSettings.timeBetweenSnakeProjectiles;
            this.balls.push(new Ball(this.snake.posX+300,this.snake.posY+250,Math.random()*this.varSpeed+this.baseSpeed,Math.random()*this.varSpeed+this.baseSpeed));
        }
    }

    draw()
    {
        var b = null;
        var i = 0;
        for(i=0;i<this.balls.length;i++)
        {
            b = this.balls[i];
            b.draw();
        }
    }
}