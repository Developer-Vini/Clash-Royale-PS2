import Assets from './src/shared/assets.js';
import { animationHorizontalSprite } from './src/animation.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './src/shared/constants.js';

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);

const globin = Assets.image('personagens/goblin/globin_walk.png', {
    totalFrames: 8,
    frameWidth: 20,
    frameHeight: 24,
    fps: 12,
    loop: true,
});

const background = Assets.image("background.png");

while (true) {
    Screen.clear();
    background.draw(0, 0);

    animationHorizontalSprite(globin);
    globin.draw(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

    Screen.flip();
}
