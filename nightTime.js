class NightTime
{
    constructor()
    {
        this.platform = new Platform(100,300,300);
    }

    update(dt)
    {
        mainCharacter.update(dt);
        if(mainCharacter.posY > 520)
        {
            mainCharacter.posY = 520;
            mainCharacter.hitGround();
        }

        this.platform.update(mainCharacter);
    }

    draw()
    {
        love.graphics.rectangle("fill",this.platform.posX,this.platform.posY,this.platform.width,50);
        mainCharacter.draw();
    }

    keypressed(key, scancode, isrepeat)
    {
        if(key == "right")
        {
            mainCharacter.direction = 1;
        }
        else if(key == "left")
        {
            mainCharacter.direction = -1;
        }
        else if(key == "space")
        {
            mainCharacter.jump();
        }
    }
}