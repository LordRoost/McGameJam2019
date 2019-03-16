class Font
{
    constructor(font, size)
    {
        this.font = font;
        this.size = size;
        this.fontString = size.toString()+"px "+font;
    }

    applyFont(context2D)
    {
        context2D.font = this.fontString;
    }

    draw(context2D,text,x,y)
    {
        context2D.fillStyle = "#000000";
        context2D.font = this.fontString;
        context2D.fillText(text,x,y+this.size);
    }

    drawSimple(context2D,text,x,y)
    {
        context2D.fillText(text,x,y+this.size);
    }
}