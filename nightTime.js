class NightTime
{
    constructor()
    {
        this.finalBoss = new FinalBoss();
        this.floorLevel = gameSettings.floorLevel;
        //this.platform = new Platform(100,350,300);
        this.platformHigh = new Platform(455,286,135);
        this.platformLow = new Platform(742,419,135);
        this.bgVid = love.graphics.newVideo("video/bgCycle.mp4",false,false,false);
        this.eraseVid = love.graphics.newVideo("video/bgErase.mp4");
        this.tvNoise = love.graphics.newVideo("video/tvNoise.mp4",false,true,false);
        //this.finalStagePic = love.graphics.newImage("pictures/finalStagePic.png");
        //this.drawfinalStagePic = false;
        this.ballTexture = love.graphics.newImage("pictures/ball.png");
        
        this.currentlyPlayingVid = this.bgVid;
        this.snake = new Snake();
        this.currentBoss = this.snake;

        this.eraseVid.onVideoEnd = function()
        {
            this.finalBoss.start();
            this.platformHigh.update = function(dt){};
            this.platformLow.update = function(dt){};
            this.currentBoss = this.finalBoss;
            this.currentlyPlayingVid = this.tvNoise;
            this.currentlyPlayingVid.play();
        }.bind(this);

        this.bgVid.onVideoEnd = function()
        {
            this.snake.start();
            //this.currentlyPlayingVid = this.eraseVid;
            //this.currentlyPlayingVid.play();
        }.bind(this);
    }

    start()
    {
        this.bgVid.play();
    }

    update(dt)
    {
        mainCharacter.update(dt);
        if(mainCharacter.posY > this.floorLevel)
        {
            mainCharacter.posY = this.floorLevel;
            mainCharacter.hitGround();
        }

        //this.platform.update(mainCharacter);
        this.platformHigh.update(mainCharacter);
        this.platformLow.update(mainCharacter);

        this.currentBoss.update(dt);
    }

    draw()
    {
        love.graphics.draw(this.currentlyPlayingVid,0,0);
        //love.graphics.rectangle("fill",this.platform.posX,this.platform.posY,this.platform.width,50);
        //love.graphics.rectangle("fill",this.platformHigh.posX,this.platformHigh.posY,this.platformHigh.width,40);
        //love.graphics.rectangle("fill",this.platformLow.posX,this.platformLow.posY,this.platformLow.width,40);

        this.currentBoss.draw();
        mainCharacter.draw();
    }

    // mousepressed(x,y,b,isTouch)
    // {
    //     if(b == 1)
    //     {
    //         alert("x: " + x + " y: " + y);
    //     }

    // }

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
            //this.platform.detectCollision = false;
            this.platformHigh.detectCollision = false;
            this.platformLow.detectCollision = false;

        }
    }
}