/* Examples:

new Animation([
        {
            type: "grid",
            imgPath: "sprites/coin_sheet.png",
            rows: 3,
            columns: 3,
            startX: 0,
            startY: 0,
            frameWidth: 41,
            frameHeight: 42,
            numFrames: 8,
            timePerFrame: 0.015
        }
    ]);

*/

class Animation
{
    constructor(frames)
    {
        this.texturesUsed = {};
        this.frames = []; //{texture, srcX, srcY, srcWidth, srcHeight, time}
        this.frameTime = 0;
        this.frameIndex = 0;
        this.currentFrame = null;

        this.parseFrames(frames);

        this.currentFrame = this.frames[0];
        var texture = this.currentFrame["texture"];
        texture.srcX = this.currentFrame["srcX"];
        texture.srcY = this.currentFrame["srcY"];
        texture.srcWidth = this.currentFrame["srcWidth"];
        texture.srcHeight = this.currentFrame["srcHeight"];
    }

    getHeight()
    {
        return this.currentFrame["srcHeight"];
    }

    getWidth()
    {
        return this.currentFrame["srcWidth"];
    }

    parseFrames(frames)
    {
        var i=0;
        var animationDescription = null;
        for(i=0;i<frames.length;i++)
        {
            animationDescription = frames[i];
            if(animationDescription["type"] == "grid")
            {
                this.parseGridAnimation(animationDescription);
            }
        }
    }

    parseGridAnimation(animationDescription)
    {
        //TODO
        var i = 0;
        var j = 0;
        let x = animationDescription["startX"];
        let y = animationDescription["startY"];
        var framesAdded = 0;

        for(i=0;i<animationDescription["rows"];i++)
        {
            x = animationDescription["startX"];

            for(j=0;j<animationDescription["columns"];j++)
            {
                if(!(animationDescription["imgPath"] in this.texturesUsed))
                {
                    this.texturesUsed[animationDescription["imgPath"]] = new Texture(love.graphics, animationDescription["imgPath"]);
                }

                this.frames.push({
                    texture: this.texturesUsed[animationDescription["imgPath"]],
                    srcX: x,
                    srcY: y,
                    srcWidth: animationDescription["frameWidth"],
                    srcHeight: animationDescription["frameHeight"],
                    time: animationDescription["timePerFrame"]
                });

                x+=animationDescription["frameWidth"];
                framesAdded++;

                if(framesAdded >= animationDescription["numFrames"])
                {
                    i = animationDescription["rows"]+1;
                    break;
                }
            }

            y+=animationDescription["frameHeight"];
        }
    }

    update(deltaTime)
    {
        this.frameTime += deltaTime;
        if(this.frameTime >= this.currentFrame["time"])
        {
            this.frameTime -= this.currentFrame["time"];
            this.frameIndex++;
            if(this.frameIndex >= this.frames.length)
            {
                this.frameIndex = 0;
            }
            this.currentFrame = this.frames[this.frameIndex];

            var texture = this.currentFrame["texture"];
            texture.srcX = this.currentFrame["srcX"];
            texture.srcY = this.currentFrame["srcY"];
            texture.srcWidth = this.currentFrame["srcWidth"];
            texture.srcHeight = this.currentFrame["srcHeight"];
        }
    }

    draw(graphics, x, y, r, sx, sy, ox, oy)
    {
        this.currentFrame["texture"].draw(graphics,x,y,r,sx,sy,ox,oy);
    }
}