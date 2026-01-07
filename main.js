import { Carta } from "./src/carta.js";
import { Torre } from "./src/torre.js";
import Gamepad from "./src/shared/gamepad.js";
import { TIPO_CARTA, TIPO_TORRE } from "./src/shared/constants.js";
import Assets from "./src/shared/assets.js";

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);

const fundo = Assets.image("background.png");

const cartas = [
  new Carta("Fire", 4, TIPO_CARTA.FEITICO, Assets.image("/Cartas/fire.png")),
  new Carta("Esqueleto", 1, TIPO_CARTA.TROPA, Assets.image("/Cartas/esqueleto.png"))
]
const deckDoJogador = Assets.image("deck.png");

const TorresPlayer = [
  new Torre({
    x: 226,
    y: 230,
    vida: 1792,
    tipo: TIPO_TORRE.PRINCIPE,
    img: "/Torres/blue_princess.png"
  }),

  new Torre({
    x: 370,
    y: 230,
    vida: 1792,
    tipo: TIPO_TORRE.PRINCIPE,
    img: "/Torres/blue_princess.png"
  }),

  new Torre({
    x: 290,
    y: 260,
    vida: 3000,
    tipo: TIPO_TORRE.REI,
    img: "/Torres/Blue_king.png"

  })
]
const TorresInimiga = [

  new Torre({

    x: 220,
    y: 70,
    vida: 1792,
    tipo: TIPO_TORRE.PRINCIPE,
    img: "/Torres/red_princess.png"

  }),

    new Torre({
      x: 369, 
      y: 70,
      vida: 1792,
      tipo: TIPO_TORRE.PRINCIPE,
      img: "/Torres/red_princess.png"

  }),

    new Torre({
      x: 291.5,
      y: 20,
      vida: 3000,
      tipo: TIPO_TORRE.REI,
      img: "/Torres/Red_king.png"

  })


]

while (true) {
  Gamepad.update();

  Screen.clear();
  fundo.draw(0, 0);

  TorresPlayer.forEach(torre => {
    torre.draw();
  });
  TorresInimiga.forEach(torre => {
    torre.draw();
  })
  deckDoJogador.draw(198, 350);
  Screen.flip();
}