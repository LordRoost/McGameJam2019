class MenuScreen
{
    constructor()
    {
        this.vidPath = "video/mainIntro.mp4"
        this.backgroundVid = love.graphics.newVideo(this.vidPath,true,false,false);

        mainCharacter.posX = 590;
        mainCharacter.posY = 340;
        //TODO reset gamescreen
        //this.grassSound = love.audio.newSource("sounds/grassWalk.mp3");

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
        //love.graphics.setColor(255,255,255);
        love.graphics.context2D.strokeStyle = "#000000"; 
        love.graphics.context2D.fillStyle = "#ffffff"; 
        //love.graphics.print("In West Philadelphia, born and raised, out on the playground is how I spent most of my days...", 100,100);
        love.graphics.context2D.font = "30px Arial";
        love.graphics.context2D.fillText("In West Philadelphia, born and raised, out on the playground is how I spent most of my days...", 10, 50);
    }

    keypressed(key, scancode, isrepeat)
    {
        if(key == "right")
        {
            mainCharacter.direction = 1;
            //this.grassSound.play();
        }
        else if(key == "left")
        {
            mainCharacter.direction = -1;
            //this.grassSound.play();
        }
        else if(key == "space")
        {
            mainCharacter.jump();
        }
    }

    mousepressed(x,y,b,isTouch)
    {
        if(b == 1)
        {
            mainCharacter.jump();
        }

    }
}