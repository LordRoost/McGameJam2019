class Keyboard
{
    constructor()
    {
        this.keys = {};

        this.keyMap = {
            32: "space",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            65: "a",
            68: "d",
            83: "s",
            87: "w"
        };
    }

    isDown(key)
    {
        if(key in this.keys)
        {
            return this.keys[key];
        }
        else
        {
            return false;
        }
    }

    keyDown(keyCode)
    {
        this.keys[this.keyMap[keyCode]] = true;
    }

    keyUp(keyCode)
    {
        this.keys[this.keyMap[keyCode]] = false;
    }
}