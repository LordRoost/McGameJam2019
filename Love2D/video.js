class Video
{
    constructor(videoSrc, autoplay, loop, transparent)
    {
        this.loaded = false;
        this.ended = false;
        this.autoplay = autoplay;
        this.loop = loop;
        this.transparent = transparent;
        this.bufferCanvas = null;
        this.bufferContext2D = null;
        this.isFlipped = false;

        if(!transparent)
        {
            this.transparent = false;
        }

        this.video = document.createElement("video");
        this.video.addEventListener('loadeddata', function() {

            this.video.loop = this.loop;

            if(this.transparent)
            {
                this.bufferCanvas = document.createElement("canvas");
                this.bufferCanvas.width = this.video.videoWidth;
                this.bufferCanvas.height = this.video.videoHeight;
                this.bufferContext2D = this.bufferCanvas.getContext('2d');
            }

            if(this.autoplay)
            {
                this.video.play();
            }
            this.loaded = true;
        }.bind(this));

        this.video.crossOrigin="anonymous";
        this.video.src = videoSrc;

        this.onVideoEnd = function(){};

        this.video.addEventListener('ended', function(){
            this.ended = true;
            this.onVideoEnd();
        }.bind(this));
    }

    play()
    {
        if(this.loaded)
        {
            this.video.play();
            return true;
        }
        else
        {
            return false;
        }
    }

    stop()
    {
        this.video.pause();
        this.video.currentTime = 0;
        this.video.load();
    }

    draw(graphics, x, y, r, sx, sy)
    {
        var restoreContext = false;

        if(this.loaded)
        {
            if(r != 0 || sx < 0 || sy < 0)
            {
                graphics.context2D.save();
                restoreContext = true;

                if(sx < 0)
                {
                    graphics.context2D.translate(graphics.getWidth(), 0);
                    graphics.context2D.scale(-1.0, 1.0);
                    sx = -sx;
                    if(this.transparent)
                    {
                        x = graphics.getWidth()-x-this.video.videoWidth/2.0;
                    }
                    else
                    {
                        x = graphics.getWidth()-x-this.video.videoWidth;
                    }
                }
            }

            if(this.transparent)
            {
                this.bufferContext2D.drawImage(this.video,0,0);

                var image = this.bufferContext2D.getImageData(0, 0, this.bufferCanvas.width/2, this.bufferCanvas.height);
                var imagedata = image.data;
                var originalImage = graphics.context2D.getImageData(x,y, this.bufferCanvas.width/2, this.bufferCanvas.height);
                var originalData = originalImage.data;
                var transparencyData = this.bufferContext2D.getImageData(this.bufferCanvas.width/2, 0, this.bufferCanvas.width/2, this.bufferCanvas.height);

                var i = 0;
                var w1 = 0;
                var w2 = 0;
                for(i=3; i<imagedata.length; i+=4)
                {
                    if(transparencyData.data[i-1] == 0)
                    {
                        imagedata[i-3] = originalData[i-3];
                        imagedata[i-2] = originalData[i-2];
                        imagedata[i-1] = originalData[i-1];
                    }
                    else
                    {
                        w1 = transparencyData.data[i-1]/255.0;
                        w2 = 1.0-w1;
                        imagedata[i-3] = Math.floor(imagedata[i-3]*w1 + originalData[i-3]*w2);
                        imagedata[i-2] = Math.floor(imagedata[i-2]*w1 + originalData[i-2]*w2);
                        imagedata[i-1] = Math.floor(imagedata[i-1]*w1 + originalData[i-1]*w2);
                    }
                }

                if(restoreContext)
                {
                    var canvas = document.createElement("canvas");
                    canvas.width = this.video.videoWidth/2;
                    canvas.height = this.video.videoHeight;
                    canvas.getContext('2d').putImageData(image,0,0);
                    graphics.context2D.drawImage(canvas,x,y);
                }
                else
                {
                    graphics.context2D.putImageData(image, x, y);
                }
            }
            else
            {
                graphics.context2D.drawImage(this.video, x, y);
            }

            if(restoreContext)
            {
                graphics.context2D.restore();
            }
        }
    }

    getCurrentTime()
    {
        return this.video.currentTime;
    }
}