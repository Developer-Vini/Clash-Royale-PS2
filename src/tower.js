import Assets from "./shared/assets.js";

export default class Tower {

    constructor({x, y, life, type, img}){
        this.x = x,
        this.y = y,
        this.life = life,
        this.type = type,

        this.img = Assets.image(img) 
    }

    draw(){
        this.img.draw(this.x, this.y);
    }

}