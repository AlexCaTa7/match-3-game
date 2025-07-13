import { initialiseSound } from "./buttons.js";
const sounds = [
    new Audio('./sounds/discord.mp3'),
    new Audio('./sounds/github.mp3'),
    new Audio('./sounds/youtube.mp3'),
    new Audio('./sounds/whatsapp.mp3'),
    new Audio('./sounds/instagram.mp3')
];
for (let sound of sounds) {
    sound.load();
}
export function playSound(tileIndex) {
    if (tileIndex >= 0 && tileIndex < sounds.length) {
        const clone = initialiseSound(sounds[tileIndex].cloneNode());
        clone.play().catch((e) => {
            console.warn('Sound play failed:', e)
        });
    }
}
