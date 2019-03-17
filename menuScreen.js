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
        if(this.backgroundVid.getCurrentTime() > 0)
        {
            mainCharacter.update(dt);
            if(mainCharacter.posY > 520)
            {
                mainCharacter.posY = 520;
                mainCharacter.hitGround();
            }

        }

    }

    draw()
    {
        if(this.backgroundVid.getCurrentTime() > 0)
        {
            love.graphics.draw(this.backgroundVid,0,0);
            mainCharacter.draw();
            love.graphics.context2D.strokeStyle = "#000000"; 
            love.graphics.context2D.fillStyle = "#ffffff"; 
            love.graphics.context2D.font = "30px Arial";
            love.graphics.context2D.fillText("One day, Allison received a chain mail from the music teacher of a friend of her cousin's ", 10, 50);
            love.graphics.context2D.fillText("daughter which told people to spread the word about LoLo: an avatar of Satan that is secretly", 10, 80);
            love.graphics.context2D.fillText("included in a cursed video game who drives all those who don't beat the game mad unless", 10, 110);
            love.graphics.context2D.fillText("they shared it with 3 people. Allison scoffed and defiantly went to download the game.", 10, 140);
            love.graphics.context2D.fillText("Little did she know, that her cousin's daughter's friend did NOT have a music teacher...THEN", 10, 200);
            love.graphics.context2D.fillText("WHO WAS MAIL??? Also she totally got cursed and this is her struggle.", 10, 230);

            love.graphics.context2D.fillText("Click to continue", 540, 650);
        }
    }


    keypressed(key, scancode, isrepeat)
    {
        if(key == "right" || key == "d")
        {
            mainCharacter.direction = 1;
            //this.grassSound.play();
        }
        else if(key == "left" || key == "a")
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
            currentScreen = gameScreen;
            gameScreen.start();
        }

    }
}