const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Screen.getMode();

const PLAYER_ONE_PORT = 0;

const CARD_TYPE = {
    SPELL: "spell",
    TROOP: "troop",
    BUILDING: "building"
};

const TOWER_TYPE = {
    PRINCE: "prince",
    KING: "king"
};

export {
    PLAYER_ONE_PORT,
    CARD_TYPE,
    TOWER_TYPE,
    SCREEN_WIDTH,
    SCREEN_HEIGHT
}