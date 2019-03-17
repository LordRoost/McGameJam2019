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
        this.animations.running.setCollisionBox(17,2,66,95);


        this.animations.standing = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/mainCharacterStand.png",
                rows: 1,
                columns: 2,
                startX: 0,
                startY: 0,
                frameWidth: 100,
                frameHeight: 100,
                numFrames: 2,
                timePerFrame: 0.5
            }
        ]);
        this.animations.standing.setCollisionBox(27,6,47,94);

        this.animations.jumping = love.graphics.newAnimation([
            {
                type: "grid",
                imgPath: "sprites/mainCharacterJump.png",
                rows: 1,
                columns: 2,
                startX: 0,
                startY: 0,
                frameWidth: 100,
                frameHeight: 100,
                numFrames: 2,
                timePerFrame: 0.1
            }
        ]);
        this.animations.jumping.setCollisionBox(17,2,66,95);


        this.currentAnimation = this.animations.standing;

        this.animationState = "standing";
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
        if(love.keyboard.isDown("right") || love.keyboard.isDown("d"))
        {
            if(this.animationState != "running")
            {
                this.animationState = "running";
                this.currentAnimation = this.animations.running;
                this.animations.running.resetAnimation();
            }
            this.direction = 1;
            this.posX += this.direction*dt*this.runSpeed;

        }
        else if(love.keyboard.isDown("left") || love.keyboard.isDown("a"))
        {
            if(this.animationState != "running")
            {
                this.animationState = "running";
                this.currentAnimation = this.animations.running;
                this.animations.running.resetAnimation();
            }
            this.direction = -1;
            this.posX += this.direction*dt*this.runSpeed;
        }
        else
        {
            if(this.animationState != "standing")
            {
                this.animationState = "standing";
                this.currentAnimation = this.animations.standing;
                this.animations.standing.resetAnimation();
            }
        }

        if(this.velocityY != 0)
        {
            this.currentAnimation = this.animations.jumping;
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

        if((this.posX+100) >= 1280)
        {
            this.posX = 1180;
        }
        else if(this.posX <= -12)
        {
            this.posX = -12;
        }

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

        if(this.animationState == "standing")
        {
            this.currentAnimation = this.animations.standing;
            //this.animations.standing.resetAnimation();
        }
        else if(this.animationState == "running")
        {
            this.currentAnimation = this.animations.running;
        }
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