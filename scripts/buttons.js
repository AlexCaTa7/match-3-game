import { SunIcon, MoonIcon } from "./iconsSvg.js";

export function initialiseSound(sound) {
    sound.volume = sound_volume
    sound.muted = !isSoundActive();
    return sound;
} const PhoneNav = document.getElementById('phoneNavigation');
let SoundButtonCase = 'active';
let sound_volume = 1.0;
let sound_active = true;
const SoundButton = document.createElement('div');
SoundButton.id = 'SoundButton';
const sound_on = document.createElement('img');
sound_on.classList.add('sound_on_icon');
sound_on.classList.add('sound_icon');
sound_on.src = '../Sounds_Icons/sound_on.png';
const sound_off = document.createElement('img');
sound_off.classList.add('sound_off_icon');
sound_off.classList.add('sound_icon');
sound_off.src = '../Sounds_Icons/sound_off.png';
SoundButton.appendChild(sound_on);
PhoneNav.appendChild(SoundButton);
SoundButton.addEventListener('click', () => {
    const isActive = SoundButtonCase === 'active';

    SoundButton.innerHTML = '';
    SoundButton.appendChild(isActive ? sound_off : sound_on);

    SoundButtonCase = isActive ? 'inactive' : 'active';
    setActiveSoundState(!isActive);
});
function setActiveSoundState(state) {
    sound_active = state;
}

function isSoundActive() {
    return sound_active;
}
let head = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
function ChangeUI(arg) {
    if (head.contains(link)) {
        head.removeChild(link);
    } else {
        link.rel = 'stylesheet';
        link.type = 'text/css';
        if (arg === 0) {
            link.href = '../styles/light_mode.css';
        }
        if (arg === 1) {
            link.href = '../styles/dark_mode.css';
        }
        head.appendChild(link);
    } return true;
}
let ChangeUIButton = document.createElement('button');
ChangeUIButton.appendChild(SunIcon());
let LightOn = true;
ChangeUIButton.style.width = 50 + 'px';
ChangeUIButton.style.height = 50 + 'px';
ChangeUIButton.style.padding = 0;
ChangeUIButton.style.borderRadius = 50 + '%';
ChangeUIButton.addEventListener('click', ev => {
    ChangeUIButton.innerHTML = '';
    if (LightOn) {
        ChangeUI(1);
        LightOn = false;
        ChangeUIButton.appendChild(MoonIcon());
    } else {
        ChangeUI(0);
        LightOn = true;
        ChangeUIButton.appendChild(SunIcon());
    }
})
PhoneNav.appendChild(ChangeUIButton);