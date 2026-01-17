import Assets from './src/shared/assets.js';
import { animationSprite, setAnimation } from './src/shared/animation.js';
import { PLAYER_ONE_PORT, SCREEN_HEIGHT, SCREEN_WIDTH } from './src/shared/constants.js';
import Gamepad from './src/shared/gamepad.js';
let direction = 1;

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);

const wizard = Assets.image('/characters/wizard/blue/blue_wizard_move.png', {
    framesPerRow: 8,
    frameWidth: 20,
    frameHeight: 21,
    fps: 8,
    loop: true,
    animations: {
        one: { start: 0, end: 7 },
        two: { start: 8, end: 15 },
        three: { start: 16, end: 23 },
        four: { start: 24, end: 31 },
        five: { start: 32, end: 39 },
        six: { start: 40, end: 47 },
        seven: { start: 48, end: 55 },
        eight: { start: 56, end: 63 },
        nine: { start: 64, end: 71 },
    }
});

const background = Assets.image("background.png");

const animationNames = Object.keys(wizard.animations);
let currentAnimationIndex = 0;
let xWasPressed = false;

setAnimation(wizard, animationNames[currentAnimationIndex]);

while (true) {
    Screen.clear();
    Gamepad.update();

    const xIsPressed = Gamepad.player(PLAYER_ONE_PORT).pressed(Pads.CROSS);

    if (xIsPressed && !xWasPressed) {
        currentAnimationIndex = (currentAnimationIndex + 1) % animationNames.length;
        const nextAnimation = animationNames[currentAnimationIndex];
        setAnimation(wizard, nextAnimation);
        direction *= 1;
    }
    xWasPressed = xIsPressed;

    background.draw(0, 0);

    animationSprite(wizard);
    wizard.scaleX = direction;
    wizard.draw(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

    Screen.flip();
}