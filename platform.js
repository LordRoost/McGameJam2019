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
        if(character.posY + character.getHeight() < this.posY)
        {
            this.detectCollision = true;
        }
        else
        {
            if(this.detectCollision)
            {
                if(character.posX+character.getWidth() > this.posX && character.posX < this.posX+this.width)
                {
                    character.hitGround();
                    character.posY = this.posY - character.getHeight();
                }
                else
                {
                    this.detectCollision = false;
                }
            }
        }
    }
}