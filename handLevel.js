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

        this.handSpeed = gameSettings.handSpeed;
        
        this.handOnPlatform1 = new SingleHand(455,236);
        this.handOnPlatform2 = new SingleHand(742,369);

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
    }

    reset()
    {
        this.update = function(dt){};
        this.draw = function(){};
        this.hands = [];
        var i=0;
        for(i=0;i<gameSettings.numberOfHands;i++)
        {
            this.hands.push(new SingleHand(-150+i*gameSettings.handDistance,this.handFloorLevel));
        }
    }

    updateFunction(dt)
    {
        this.handAnimation.update(dt);

        var i=0;
        var h = null;
        for(i=0;i<this.hands.length;i++)
        {
            h = this.hands[i];
            if(this.handAnimation.frameIndex < 6)
            {
                h.posX += this.handSpeed*dt;
            }
        }

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