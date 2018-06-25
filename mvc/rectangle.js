import { ShapeStatus } from "./shapeStatus.js";

export class Rectangle extends ShapeStatus {

    constructor(name = "", bullet = false) {
        super("rectangle", name, bullet);
        this.bullet = bullet;
        this.vnoise = super.visualNoise();

    }

    draw(ctx) {
        let vnoise;
        if (this.explosion) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(this.vnoise, this.x, this.y);
        } else {
            ctx.fillStyle = (this.bullet) ? this.col : `rgb(${this.col.red}, ${this.col.green}, ${this.col.blue})`;            
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
        
    }


}