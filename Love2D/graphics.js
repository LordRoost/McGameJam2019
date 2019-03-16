class Graphics
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context2D = canvas.getContext("2d");
        
        this.font = new Font("Arial", 12);

        this.context2D.strokeStyle = "#000000";
        this.context2D.fillStyle = "#000000";

        this.images = {};
    }

    clear()
    {
        this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    loadImg(url, functionToCall)
    {
        if(url in this.images)
        {
            functionToCall(this.images[url]);
        }
        else
        {
            var img = new Image;
            img.onload = function()
            {
                this.images[url] = img;
                functionToCall(img);
            }.bind(this);
            img.src = url;
        }
    }

    newAnimation(frames)
    {
        return new Animation(frames);
    }

    newImage(url)
    {
        return new Texture(this,url);
    }

    newVideo(videoSrc, autoplay, loop, transparent)
    {
        if(!transparent)
        {
            transparent = false;
        }

        if(!loop)
        {
            loop = false;
        }

        if(!autoplay)
        {
            autoplay = false;
        }

        return new Video(videoSrc, autoplay, loop, transparent);
    }

    draw(drawable, x, y, r, sx, sy, ox, oy)
    {
        if(!r)
        {
            r = 0;
        }

        if(!sx)
        {
            sx = 1;
        }

        if(!sy)
        {
            sy = 1;
        }

        if(!ox)
        {
            ox = 0;
        }

        if(!oy)
        {
            oy = 0;
        }

        drawable.draw(this, x, y, r, sx, sy, ox, oy);
    }

    print(text, x, y)
    {
        var posX = x;
        var posY = y;

        if(!x)
        {
            posX = 0;
        }

        if(!y)
        {
            posY = 0;
        }

        this.font.draw(this.context2D,text.toString(),posX,posY);
    }

    printf(text, x, y, limit, align)
    {
        var words = text.split(" ");
        var lineWidth = 0;
        var wordWidth = 0;
        var currentWord = "";
        var currentLine = "";
        var firstWord = 0;
        var i = 0;

        if(!limit)
        {
            limit = this.canvas.width;
        }

        if(!align)
        {
            align = "left";
        }

        this.font.applyFont(this.context2D);
        this.context2D.fillStyle = "#000000";

        for(i=0;i<words.length;i++)
        {
            if(firstWord)
            {
                firstWord = false;
                currentWord = words[i];
            }
            else
            {
                currentWord = " "+words[i];
            }

            wordWidth = this.context2D.measureText(currentWord).width;
            lineWidth += wordWidth;

            if(lineWidth > limit)
            {
                if(align == "left")
                {
                    this.font.drawSimple(this.context2D,currentLine,x,y);
                }
                else if(align == "center")
                {
                    this.font.drawSimple(this.context2D,currentLine,x+(limit-lineWidth+wordWidth)/2,y);
                }
                else
                {
                    this.font.drawSimple(this.context2D,currentLine,x+(limit-lineWidth+wordWidth),y);
                }

                firstWord = true;
                i--;
                y += this.font.size;
            }
            else
            {
                currentLine += currentWord;
            }
        }

        if(align == "left")
        {
            this.font.drawSimple(this.context2D,currentLine,x,y);
        }
        else if(align == "center")
        {
            this.font.drawSimple(this.context2D,currentLine,x+(limit-lineWidth)/2,y);
        }
        else
        {
            this.font.drawSimple(this.context2D,currentLine,x+(limit-lineWidth),y);
        }
    }

    setFont(font)
    {
        this.font = font;
    }

    newFont(size)
    {
        return new Font("Arial", size);
    }

    /*
     * mode: either "fill" or "line"
     */
    rectangle(mode, x, y, width, height)
    {
        if(mode == "fill")
        {
            this.context2D.fillRect(x,y,width,height);
        }
        else if(mode == "line")
        {
            this.context2D.lineWidth = "1";
            this.context2D.beginPath();
            this.context2D.rect(x,y,width,height);
            this.context2D.stroke();
        }
    }

    circle(mode,x,y,radius)
    {
        if(mode == "fill")
        {
            this.context2D.beginPath();
            this.context2D.arc(x, y, radius, 0, 2 * Math.PI);
            this.context2D.fill();
        }
        else
        {
            this.context2D.lineWidth = 1;
            this.context2D.beginPath();
            this.context2D.arc(x, y, radius, 0, 2 * Math.PI);
            this.context2D.stroke();
        }
    }

    getWidth()
    {
        return this.canvas.width;
    }

    getHeight()
    {
        return this.canvas.height;
    }

    setColor(r,g,b)
    {
        var color = "rgb("+r.toString()+","+g.toString()+","+b.toString()+")";
        this.context2D.strokeStyle = color;
        this.context2D.fillStyle = color;
    }
}