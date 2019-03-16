class GameOverScreen
{
    constructor()
    {
        this.vidPath = "video/mainIntro.mp4"
        this.backgroundVid = love.graphics.newVideo(this.vidPath,true,false,false);
        //TODO reset gamescreen
    }

    update(dt)
    {

    }

    draw()
    {
        if(this.backgroundVid.getCurrentTime() > 0)
        {
            love.graphics.draw(this.backgroundVid,0,0);
            love.graphics.context2D.strokeStyle = "#000000"; 
            love.graphics.context2D.fillStyle = "#ffffff"; 
            love.graphics.context2D.font = "30px Arial";
            love.graphics.context2D.fillText("Allison failed to defeat LoLo's aura of madness. She is now cursed to keep trying in order to", 10, 50);
            love.graphics.context2D.fillText("save her SOUL. But what you didn't know was that YOU IS ALLISON!!1 Send 3 players to this ", 10, 80);
            love.graphics.context2D.fillText("game and you will be saved.", 10, 110);
            // love.graphics.context2D.fillText("they shared it with 3 people. Allison scoffed and defiantly went to download the game.", 10, 140);
            // love.graphics.context2D.fillText("Little did she know, that her cousin's daughter's friend did NOT have a music teacher...THEN", 10, 200);
            // love.graphics.context2D.fillText("WHO WAS MAIL??? Also she totally got cursed and this is her struggle.", 10, 230);

            love.graphics.context2D.fillText("Your curse continues...", 530, 650);
        }
    }


    keypressed(key, scancode, isrepeat)
    {
        if(key == "q")
        {
            currentScreen = victoryScreen;
        }
    }

    mousepressed(x,y,b,isTouch)
    {
        if(b == 1)
        {
            currentScreen = gameScreen;
        }

    }
}