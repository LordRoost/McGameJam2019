class Platform
{
    constructor(x, y, width)
    {
        this.posX = x;
        this.posY = y;
        this.width = width;

        this.detectCollision = false;
    }

    update(character)
    {
        if(character.getCollisionY() + character.getCollisionHeight() < this.posY)
        {
            this.detectCollision = true;
        }
        else
        {
            if(this.detectCollision)
            {
                if(character.getCollisionX()+character.getCollisionWidth() > this.posX && character.getCollisionX() < this.posX+this.width)
                {
                    character.hitGround();
                    character.posY = this.posY - character.getCollisionHeight() - character.currentAnimation.collision.y;
                }
                else
                {
                    this.detectCollision = false;
                }
            }
        }
    }
}