class LoveAudio
{
    constructor()
    {

    }

    newAudio(audioFile, loop, volume)
    {
        return new MyAudio(audioFile, loop, volume);
    }

    newSource(audioFile, loop, volume)
    {
        return this.newAudio(audioFile, loop, volume);
    }
}