const sounds = [
    new Audio('./sounds/discord.mp3'),
    new Audio('./sounds/github.mp3'),
    new Audio('./sounds/youtube.mp3'),
    new Audio('./sounds/whatsapp.mp3'),
    new Audio('./sounds/instagram.mp3')
];
for (const sound of sounds) {
    sound.load();
    sound.volume = 1.0;
    sound.muted = false;
}
export function playSound(tileIndex) {
    if (tileIndex >= 0 && tileIndex < sounds.length) {
        const clone = sounds[tileIndex].cloneNode(); // create a fresh instance
        clone.play().catch(err => console.error("Sound error:", err));
    }
}
