class MyAudio
{
    constructor(audioFile, loop, volume)
    {
        this.audio = new Audio(audioFile);

        if(!loop)
        {
            loop = false;
        }

        if(!volume)
        {
            volume = 1;
        }

        this.audio.loop = loop;
        this.audio.volume = volume;
        this.currentVolume = volume;
    }

    play()
    {
        this.audio.play();
    }

    stop()
    {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    restart()
    {
        this.audio.currentTime = 0;
    }

    setVolume(volume)
    {
        this.audio.volume = volume;
        this.currentVolume = volume;
    }

    mute()
    {
        this.audio.volume = 0;
    }

    unmute()
    {
        this.audio.volume = this.currentVolume;
    }
}