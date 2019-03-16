class CustomMath
{
    constructor()
    {
        this.pi = Math.PI;
    }

    sqrt(val)
    {
        return Math.sqrt(val);
    }

    random(min,max)
    {
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    ceil(val)
    {
        return Math.ceil(val);
    }

    atan2(y,x)
    {
        return Math.atan2(y,x);
    }

    cos(value)
    {
        return Math.cos(value);
    }

    sin(value)
    {
        return Math.sin(value);
    }
}