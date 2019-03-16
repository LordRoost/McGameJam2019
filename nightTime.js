class NightTime
{
    constructor()
    {
        this.floorLevel = gameSettings.floorLevel;
        this.platform = new Platform(100,350,300);
        this.bgVid = love.graphics.newVideo("video/bgCycle.mp4",true,false,false);
        this.eraseVid = love.graphics.newVideo("video/bgErase.mp4");
        this.tvNoise = love.graphics.newVideo("video/tvNoise.mp4",true,true,false);
        this.finalStagePic = love.graphics.newImage("pictures/finalStagePic.png");
        this.drawfinalStagePic = false;
        this.bgVid.play();
        this.currentlyPlayingVid = this.bgVid;

        this.eraseVid.onVideoEnd = function()
        {
            this.drawfinalStagePic = true;
            this.currentlyPlayingVid = this.tvNoise;
            this.currentlyPlayingVid.play();
        }.bind(this);

        this.bgVid.onVideoEnd = function()
        {
            this.currentlyPlayingVid = this.eraseVid;
            this.currentlyPlayingVid.play();
        }.bind(this);
    }

    update(dt)
    {
        mainCharacter.update(dt);
        if(mainCharacter.posY > this.floorLevel)
        {
            mainCharacter.posY = this.floorLevel;
            mainCharacter.hitGround();
        }

        this.platform.update(mainCharacter);
    }

    draw()
    {
        love.graphics.draw(this.currentlyPlayingVid,0,0);
        love.graphics.rectangle("fill",this.platform.posX,this.platform.posY,this.platform.width,50);
        if(this.drawfinalStagePic)
        {
            love.graphics.draw(this.finalStagePic,0,0);
        }
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
        else if(key == "up")
        {
            mainCharacter.jump();
        }
        else if(key == "down")
        {
            this.platform.detectCollision = false;
        }
    }
}