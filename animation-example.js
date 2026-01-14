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

<<<<<<< HEAD
const arqueira = Assets.image('personagens/arqueira/0.png', {

    totalFrames: 7,
    frameWidth: 20,
    frameHeight: 24, 
    fps: 12,
    loop:true

})

=======
>>>>>>> c4f175c6c2b41c19f11b8aeb988afa6c3592a978
const background = Assets.image("background.png");

while (true) {
    Screen.clear();
    background.draw(0, 0);

<<<<<<< HEAD
    //animationHorizontalSprite(globin);
    animationHorizontalSprite(arqueira);
    arqueira.draw(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    //globin.draw(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
=======
    animationHorizontalSprite(globin);
    globin.draw(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
>>>>>>> c4f175c6c2b41c19f11b8aeb988afa6c3592a978

    Screen.flip();
}
