class MenuScreen
{
    constructor()
    {
        this.vidPath = "video/mainIntro.mp4"
        this.backgroundVid = love.graphics.newVideo(this.vidPath,true,false,false);
    }

    update(dt)
    {
        mainCharacter.update(dt);
        if(mainCharacter.posY > 520)
        {
            mainCharacter.posY = 520;
            mainCharacter.hitGround();
        }

    }

    draw()
    {
        love.graphics.draw(this.backgroundVid,0,0);
        mainCharacter.draw();
        love.graphics.setColor(255,255,255);
        love.graphics.print("In West Philadelphia, born and raised, out on the playground is how I spent most of my days...", 100,100);
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
        else if(key == "w")
        {
           mainCharacter.direction = 0;
        }
    }
}