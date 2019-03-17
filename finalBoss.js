class FinalBoss
{
    constructor()
    {
        this.update = function(dt){};
        this.draw = function(){};

        this.music = love.audio.newAudio("music/glitch music.mp3");
        
        this.bossPic = love.graphics.newImage("pictures/finalBoss.png");
        this.finalStagePic = love.graphics.newImage("pictures/finalStagePic.png");
        this.bloodPic = love.graphics.newImage("pictures/blood.png");
        this.posX = 335;
        this.posY = 720;
        this.upSpeed = 100;
        this.levelStarted = false;
        this.phase = 1;

        this.hands = [];
        this.timeBetweenHands = gameSettings.bossHandSpawnRate;
        this.numHandsSpawned = 0;

        this.bossVelocity = 0;
        this.bloodStreamTime = gameSettings.bloodStreamTime;
        this.bloodPauseTime = gameSettings.bloodPauseTime;
        this.bloodRunning = false;
        this.phase2Time = gameSettings.bloodPhaseTime;
        this.velocityChanged = false;
    }

    start()
    {
        this.update = this.updateFunction;
        this.draw = this.drawFunction;
        this.music.play();
    }

    reset()
    {
        this.update = function(dt){};
        this.draw = function(){};
        this.music.stop();
        this.posX = 335;
        this.posY = 720;
        this.levelStarted = false;
        this.hands = [];
        this.timeBetweenHands = gameSettings.bossHandSpawnRate;
        this.numHandsSpawned = 0;
        this.phase = 1;
        this.bossVelocity = 0;
        this.bloodStreamTime = gameSettings.bloodStreamTime;
        this.bloodPauseTime = gameSettings.bloodPauseTime;
        this.bloodRunning = false;
        this.phase2Time = gameSettings.bloodPhaseTime;
        this.velocityChanged = false;
    }

    updateFunction(dt)
    {
        if(this.posY > 0 && this.phase == 1)
        {
            this.posY -= this.upSpeed*dt;
            if(this.posY < 0)
            {
                this.levelStarted = true;
                this.posY = 0;
            }
        }

        if(this.levelStarted)
        {
            if(this.phase == 1)
            {
                this.timeBetweenHands -= dt;
                if(this.timeBetweenHands < 0)
                {
                    this.timeBetweenHands += gameSettings.bossHandSpawnRate;
                    this.hands.push(new BossHand());
                    this.numHandsSpawned++;
                    if(this.numHandsSpawned >= gameSettings.bossNumberOfHands)
                    {
                        this.phase = 2;
                        this.bossVelocity = gameSettings.bossSpeed;
                    }
                }
            }
            else
            {
                this.posX += this.bossVelocity*dt;
                if(this.posX > 975)
                {
                    this.posX = 975;
                    this.bossVelocity *= -1;
                }
                else if(this.posX < -310)
                {
                    this.posX = -310;
                    this.bossVelocity *= -1;
                }

                this.phase2Time -= dt;
                if(this.phase2Time < 0)
                {
                    this.bloodRunning  = false;
                    if(!this.velocityChanged)
                    {
                        this.velocityChanged = true;
                        this.bossVelocity = 5000;
                    }
                    
                    this.posY += this.upSpeed*dt;
                    if(this.posY > 700)
                    {
                        alert("you win");
                    }
                    return;
                }

                if(this.bloodRunning)
                {
                    this.bloodStreamTime -= dt;
                    if(this.bloodStreamTime<0)
                    {
                        this.bloodStreamTime = gameSettings.bloodStreamTime;
                        this.bloodRunning = false;
                    }
                }
                else
                {
                    this.bloodPauseTime -= dt;
                    if(this.bloodPauseTime < 0)
                    {
                        this.bloodPauseTime = gameSettings.bloodPauseTime;
                        this.bloodRunning = true;
                    }
                }

                if(this.bloodRunning)
                {
                    if(mainCharacter.posX >= this.posX+240 && mainCharacter.posX <= this.posX+295)
                    {
                        alert("you died");
                    }
                }
            }
        }

        var i=0;
        var h= null;
        for(i=0;i<this.hands.length;i++)
        {
            h = this.hands[i];
            h.update(dt);
            if(h.posX > 1280 || h.posX < -150 || h.posY > 720 || h.posY < -150)
            {
                this.hands.splice(i,1);
                i--;
            }
        }

    }

    drawFunction()
    {
        love.graphics.draw(this.bossPic,this.posX,this.posY);
        love.graphics.draw(this.finalStagePic,0,0);

        var i=0;
        for(i=0;i<this.hands.length;i++)
        {
            this.hands[i].draw();
        }

        if(this.bloodRunning)
        {
            //love.graphics.draw(this.bloodPic,this.posX+300,this.posY+200);
            //love.graphics.draw(this.bloodPic,this.posX+162,this.posY+414);
            love.graphics.draw(this.bloodPic,this.posX+231,this.posY+307);
        }
    }
}