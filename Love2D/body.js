class Body
{
    constructor(x,y,bodyType)
    {
        this.posX = x;
        this.posY = y;
        this.bodyType = bodyType;
        this.fixtures = [];
    }
}