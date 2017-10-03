export const AudioStorage = {};

export const createTheme = (name, src) => {

    const audio: HTMLAudioElement = new Audio(src);
    audio.volume = .2;
    audio.loop = true;

    AudioStorage[name] = audio;
};