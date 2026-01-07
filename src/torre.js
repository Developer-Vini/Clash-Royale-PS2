import Assets from "./shared/assets.js";

export class Torre {

    constructor({x, y, vida, tipo, img}){

        this.x = x,
        this.y = y,
        this.vida = vida,
        this.tipo = tipo,


        this.img = Assets.image(img) 

    }

    draw(){
        
        this.img.draw(this.x, this.y);
    }

}