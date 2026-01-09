import Card from "./src/card.js";
import Tower from "./src/tower.js";
import Gamepad from "./src/shared/gamepad.js";
import { CARD_TYPE, TOWER_TYPE } from "./src/shared/constants.js";
import Assets from "./src/shared/assets.js";

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);

const background = Assets.image("background.png");

const cards = [
  new Card("Fire", 4, CARD_TYPE.SPELL, Assets.image("/Cartas/fire.png")),
  new Card("Esqueleto", 1, CARD_TYPE.TROOP, Assets.image("/Cartas/esqueleto.png"))
]
const playerDeck = Assets.image("deck.png");

const playerTowers = [
  new Tower({
    x: 226,
    y: 230,
    life: 1792,
    type: TOWER_TYPE.PRINCE,
    img: "/Torres/blue_princess.png"
  }),

  new Tower({
    x: 370,
    y: 230,
    life: 1792,
    type: TOWER_TYPE.PRINCE,
    img: "/Torres/blue_princess.png"
  }),

  new Tower({
    x: 290,
    y: 260,
    life: 3000,
    type: TOWER_TYPE.KING,
    img: "/Torres/Blue_king.png"

  })
]

const enemyTowers = [

  new Tower({

    x: 220,
    y: 70,
    life: 1792,
    type: TOWER_TYPE.PRINCE,
    img: "/Torres/red_princess.png"

  }),

    new Tower({
      x: 369, 
      y: 70,
      life: 1792,
      type: TOWER_TYPE.PRINCE,
      img: "/Torres/red_princess.png"

  }),

    new Tower({
      x: 291.5,
      y: 20,
      life: 3000,
      type: TOWER_TYPE.KING,
      img: "/Torres/Red_king.png"

  })
]

while (true) {
  Gamepad.update();
  Screen.clear();

  background.draw(0, 0);

  playerTowers.forEach(torre => {
    torre.draw();
  });
  enemyTowers.forEach(torre => {
    torre.draw();
  })
  playerDeck.draw(198, 350);

  Screen.flip();
}