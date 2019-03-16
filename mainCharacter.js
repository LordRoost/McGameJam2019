class MainCharacter
{
    constructor()
    {
        this.animations = {};
        this.animations.running = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/mainCharacterRun.png",
                rows: 2,
                columns: 2,
                startX: 0,
                startY: 0,
                frameWidth: 100,
                frameHeight: 100,
                numFrames: 4,
                timePerFrame: 0.09
            }
        ]);
        this.animations.running.setCollisionBox(25,3,59,95);


        this.animations.standing = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/mainCharacterRun.png",
                rows: 2,
                columns: 2,
                startX: 0,
                startY: 0,
                frameWidth: 100,
                frameHeight: 100,
                numFrames: 4,
                timePerFrame: 0.3
            }
        ]);
        this.animations.standing.setCollisionBox(41,12,149,179);


        this.currentAnimation = this.animations.running;

        this.animationState = "running";
        this.direction = 1;
        this.runSpeed = gameSettings.playerRunSpeed;
        this.posX = 0;
        this.posY = 0;
        this.velocityY = 0;
        this.canJump = false;
        this.canSlowDownGravity = false;
        this.scale = gameSettings.playerScale;
    }

    update(dt)
    {
        if(this.animationState == "running")
        {
            this.posX += this.direction*dt*this.runSpeed;
        }
        this.currentAnimation.update(dt);

        if(love.keyboard.isDown("space"))
        {
            if(this.canSlowDownGravity)
            {
                this.velocityY += jumpHoldGravity*dt;
            }
            else
            {
                this.velocityY += gravity*dt;
            }
        }
        else
        {
            if(!this.canJump)
            {
                this.canSlowDownGravity = false;
            }

            this.velocityY += gravity*dt;
        }

        this.posY += this.velocityY;
    }

    draw()
    {
        love.graphics.draw(this.currentAnimation,this.posX,this.posY,0,this.direction*this.scale,this.scale);
    }

    hitGround()
    {
        this.velocityY = 0;
        this.canJump = true;
        this.canSlowDownGravity = true;
    }

    jump()
    {
        if(this.canJump)
        {
            this.canJump = false;
            this.velocityY = gameSettings.playerJumpVelocity;
        }
    }

    getCollisionX()
    {
        return this.currentAnimation.getCollisionX(this.posX,this.scale);
    }

    getCollisionY()
    {
        return this.currentAnimation.getCollisionY(this.posY,this.scale);
    }

    getCollisionWidth()
    {
        return this.currentAnimation.getCollisionWidth(this.scale);
    }

    getCollisionHeight()
    {
        return this.currentAnimation.getCollisionHeight(this.scale);
    }

    getWidth()
    {
        return this.currentAnimation.getWidth()*this.scale;
    }

    getHeight()
    {
        return this.currentAnimation.getHeight()*this.scale;
    }
}