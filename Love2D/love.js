class Love
{
    constructor(canvas)
    {
        this.graphics = new Graphics(canvas);
        this.mouse = new Mouse();
        this.keyboard = new Keyboard();
        this.filesystem = new FileSystem();
        this.audio = new LoveAudio();

        this.canvasBounds = canvas.getBoundingClientRect();
        //this.pixelDensity = window.devicePixelRatio || 1;
        this.pixelDensity = 1;

        this.currentTime = 0;
        this.previousTime = Date.now();
        this.deltaTime = 0;
    }

    updateDeltaTime()
    {
        this.currentTime = Date.now();
        this.deltaTime = (this.currentTime-this.previousTime)/1000;
        this.previousTime = this.currentTime;
    }

    load()
    {
        //do nothing
    }

    update(deltaTime)
    {
        //do nothing
    }

    draw()
    {
        //do nothing
    }

    mousepressed(x,y,button,isTouch)
    {
        //do nothing
    }

    keypressed(key, scancode, isrepeat)
    {
        //do nothing
    }
}