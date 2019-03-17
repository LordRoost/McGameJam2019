class HandLevel
{
    constructor()
    {
        this.update = function(dt){};
        this.draw = function(){};

        this.handAnimation = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/handCrawl.png",
                rows: 3,
                columns: 3,
                startX: 0,
                startY: 0,
                frameWidth: 150,
                frameHeight: 50,
                numFrames: 9,
                timePerFrame: 0.05
            }
        ]);

        this.singleHand1PosY = 236;
        this.singleHand2PosY = 369;

        this.handSpeed = gameSettings.handSpeed;
        
        this.handOnPlatform1 = new SingleHand(455,-50);
        this.handOnPlatform2 = new SingleHand(742,-50);

        this.scribble = love.audio.newAudio("sounds/scribble.wav");

        this.handFloorLevel = gameSettings.floorLevel+50;
        this.hands = [];
        var i=0;
        for(i=0;i<gameSettings.numberOfHands;i++)
        {
            this.hands.push(new SingleHand(-150-i*gameSettings.handDistance,this.handFloorLevel));
        }
    }

    start()
    {
        this.update = this.updateFunction;
        this.draw = this.drawFunction;
    }

    stop()
    {
        this.update = function(dt){};
        this.draw = function(){};
        gameScreen.currentlyPlayingVid = gameScreen.eraseVid;
        gameScreen.eraseVid.play();
        gameScreen.snake.bossMusic.stop();
        this.scribble.play();
    }

    reset()
    {
        this.update = function(dt){};
        this.draw = function(){};
        this.hands = [];
        var i=0;
        for(i=0;i<gameSettings.numberOfHands;i++)
        {
            this.hands.push(new SingleHand(-150-i*gameSettings.handDistance,this.handFloorLevel));
        }
    }

    updateFunction(dt)
    {
        this.handAnimation.update(dt);

        this.handOnPlatform1.posY += 300*dt;
        this.handOnPlatform2.posY += 300*dt;

        if(this.handOnPlatform1.posY > this.singleHand1PosY)
        {
            this.handOnPlatform1.posY = this.singleHand1PosY;
        }
        if(this.handOnPlatform2.posY > this.singleHand2PosY)
        {
            this.handOnPlatform2.posY = this.singleHand2PosY;
        }

        var i=0;
        var h = null;
        for(i=0;i<this.hands.length;i++)
        {
            h = this.hands[i];
            if(this.handAnimation.frameIndex < 6)
            {
                h.posX += this.handSpeed*dt;
            }

            var xChar = mainCharacter.getCollisionX();
            var yChar = mainCharacter.getCollisionY();
            var widthChar = mainCharacter.getCollisionWidth();
            var heightChar = mainCharacter.getCollisionHeight();
            
            if((h.posY+50 >= (yChar )) && (h.posY <= (yChar + heightChar)) && (h.posX+135 >= xChar) && (h.posX <= (xChar + widthChar)))
            {
                //died
                currentScreen = gameOverScreen;
                menuScreen.ambiance.play();
                gameScreen.snake.bossMusic.stop();
                return;
            }
            
        }

        if(yChar+heightChar >= this.handOnPlatform1.posY &&  yChar <= this.handOnPlatform1.posY+50 && xChar+widthChar>=this.handOnPlatform1.posX && xChar <= this.handOnPlatform1.posX + 150)
        {
            currentScreen = gameOverScreen;
            return;
        }

        if(yChar+heightChar >= this.handOnPlatform2.posY &&  yChar <= this.handOnPlatform2.posY+50 && xChar+widthChar>=this.handOnPlatform2.posX && xChar <= this.handOnPlatform2.posX + 150)
        {
            currentScreen = gameOverScreen;
            return;
        }

        // if((this.handOnPlatform1.posY+50 >= (yChar)) && (this.handOnPlatform1.posY <= (yChar + heightChar)) && (this.handOnPlatform1.posX+150 >= xChar) && (this.handOnPlatform1.posX <= (xChar + widthChar)))
        // {
        //     currentScreen = gameOverScreen;
        //     return;
        // }

        // if((this.handOnPlatform2.posY+50 >= (yChar)) && (this.handOnPlatform2.posY <= (yChar + heightChar)) && (this.handOnPlatform2.posX+150 >= xChar) && (this.handOnPlatform2.posX <= (xChar + widthChar)))
        // {
        //     currentScreen = gameOverScreen;
        //     return;
        // }

        if(this.hands[this.hands.length-1].posX > 1280)
        {
            this.stop();
        }

    }

    drawFunction()
    {
        love.graphics.draw(this.handAnimation,this.handOnPlatform1.posX,this.handOnPlatform1.posY);
        love.graphics.draw(this.handAnimation,this.handOnPlatform2.posX,this.handOnPlatform2.posY);

        var i=0;
        var h = null;
        for(i=0;i<this.hands.length;i++)
        {
            h = this.hands[i];
            love.graphics.draw(this.handAnimation,h.posX,h.posY);
        }
    }


}