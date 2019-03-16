class Texture
{
    constructor(graphics, imgUrl)
    {
        this.img = null;

        this.loaded = false;
        this.srcX = 0;
        this.srcY = 0;
        this.srcWidth = 0;
        this.srcHeight = 0;

        graphics.loadImg(imgUrl, function(img)
        {
            this.img = img;
            this.loaded = true;

            if(this.srcWidth == 0)
            {
                this.srcWidth = this.img.width;
                this.srcHeight = this.img.height;
            }
        }.bind(this));
    }

    draw(graphics, x, y, r, sx, sy, ox, oy)
    {
        if(this.loaded)
        {
            var restoreContext = false;

            if(sx < 0)
            {
                graphics.context2D.save();
                restoreContext = true;

                graphics.context2D.translate(graphics.getWidth(), 0);
                graphics.context2D.scale(-1.0, 1.0);
                sx = -sx;

                x = graphics.getWidth()-x-this.srcWidth+ox;
            }

            if(r == 0)
            {
                graphics.context2D.drawImage(this.img,this.srcX,this.srcY,this.srcWidth,this.srcHeight,x-ox*sx, y-oy*sy, this.srcWidth*sx,this.srcHeight*sy);
            }
            else
            {
                if(!restoreContext)
                {
                    graphics.context2D.save();
                    restoreContext = true;
                }

                graphics.context2D.translate(x,y);
                graphics.context2D.rotate(r);
                graphics.context2D.drawImage(this.img,this.srcX,this.srcY,this.srcWidth,this.srcHeight,-ox*sx, -oy*sy, this.srcWidth*sx,this.srcHeight*sy);

            }

            if(restoreContext)
            {
                graphics.context2D.restore();
            }
        }
    }

    update(dt)
    {
        //do nothing
    }

    getWidth()
    {
        if(this.loaded)
        {
            return this.img.width;
        }
        else
        {
            return 0;
        }
    }

    getHeight()
    {
        if(this.loaded)
        {
            return this.img.height;
        }
        else
        {
            return 0;
        }
    }
}