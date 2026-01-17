import Card from "./src/card.js";
import Tower from "./src/tower.js";
import Gamepad from "./src/shared/gamepad.js";
import { CARD_TYPE, PLAYER_ONE_PORT, SCREEN_HEIGHT, SCREEN_WIDTH, TOWER_TYPE } from "./src/shared/constants.js";
import Assets from "./src/shared/assets.js";
import { animationSprite, setAnimation } from './src/shared/animation.js';
const font = new Font("assets/font/TitanOne-Regular.ttf")

Screen.setParam(Screen.DEPTH_TEST_ENABLE, false);

const background = Assets.image("background.png");
const timeToFill = 0.00580;
/*
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
setAnimation(wizard, "one");
*/
const deck = [
  new Card("Fire", 4, CARD_TYPE.SPELL, Assets.image("/Cartas/fire.png")),
  new Card("Skeleton", 1, CARD_TYPE.TROOP, Assets.image("/Cartas/esqueleto.png")),
  new Card("Archers", 3, CARD_TYPE.TROOP, Assets.image("/Cartas/arqueiras.png")),
  new Card("Giant", 5, CARD_TYPE.TROOP, Assets.image("/Cartas/gigante.png")), 
  new Card("PEKKA", 4, CARD_TYPE.TROOP, Assets.image("/Cartas/pekka.png")),
  new Card("Goblin", 2, CARD_TYPE.TROOP, Assets.image("/Cartas/goblin.png"))
]

let hand = deck.slice(0, 4);
let handPositions;
let barElixir = 0;
let maxElixir = 10;
let selectedCardIndex = 0;
//let units = [];
//let cursorX = SCREEN_WIDTH / 2;
//let cursorY = SCREEN_HEIGHT * 0.75;
//let holdingTheLetter = false;
//const speedCursor = 3.5;


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
  Screen.clear();
  Gamepad.update();

  elixir();
  
  background.draw(0, 0);
  playerTowers.forEach(torre => torre.draw());
  enemyTowers.forEach(torre => torre.draw());


  
  playerDeck.draw(198, 350);

  //cursor(Gamepad);
  controlOfTheLetter(Gamepad);
  positionOfTheCards();

  Screen.flip();  
}

function elixir(){

  if(barElixir < maxElixir){

    barElixir += timeToFill;
    
    if(barElixir > maxElixir){

      barElixir = maxElixir;

    }
  }
}

function controlOfTheLetter(Gamepad){
  
  if(Gamepad.player(PLAYER_ONE_PORT).justPressed(Pads.LEFT)){
    
    selectedCardIndex = (selectedCardIndex - 1 + hand.length) % hand.length;

  }

  if (Gamepad.player(PLAYER_ONE_PORT).justPressed(Pads.RIGHT)){

    selectedCardIndex = (selectedCardIndex + 1) % hand.length;
    
  }
  
}

function positionOfTheCards(){
  handPositions = [
    { x: 213, y: 357 },   
    { x: 266, y: 357 },
    { x: 322, y: 357 },
    { x: 377, y: 357 }    
  ];
  
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    const pos = handPositions[i] || { x: 70 + i * 110, y: 385 };
  
    if (card && card.img) {
      card.img.draw(pos.x, pos.y);
    }
  
    font.print(10, 10, card.cost + "", Color.new(255, 220, 0, 255));

    if(i === selectedCardIndex){

      Draw.rect(pos.x - 10, pos.y - 10, 50, 63, Color.new(255, 255, 255, 255))
    }

  }
    font.print(10, 10, `Elixir: ${Math.floor(barElixir)} / ${maxElixir}`);
}
/*
function cursor(Gamepad){

  cursorX += Gamepad.player(PLAYER_ONE_PORT).lx * speedCursor;
  cursorY += Gamepad.player(PLAYER_ONE_PORT).ly * speedCursor;

  cursorX += Math.max(40, Math.min(SCREEN_WIDTH - 40, cursorX));
  cursorY += Math.max(SCREEN_HEIGHT * 0.4, Math.min(SCREEN_HEIGHT - 60, cursorY));

  const xPressed = Gamepad.player(PLAYER_ONE_PORT).pressed(Pads.CROSS);
  const xJustReleased = !xPressed && holdingTheLetter;

  if(xPressed){

    holdingTheLetter = true;

  }

  if (xJustReleased){

    holdingTheLetter = false;

    const newUnit = {
      
      x: cursorX,
      y: cursorY,
      sprite: wizard,
      scaleX: 1,
      speed: 1.2

    };

    units.push(newUnit);

  }

  for(let i = units.length - 1; i >= 0; i--){

    const unit = units[i];

    unit.y -= unit.speed;

    animationSprite(unit.sprite);
    unit.sprite.scaleX = unit.scaleX;
    unit.sprite.draw(unit.x, unit.y);

    if (unit.y < -50) {
      units.splice(i, 1);
    }
  }

}
*/