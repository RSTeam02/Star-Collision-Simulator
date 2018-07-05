import { ShapeStatus } from "./shapeStatus.js";

export class Rectangle extends ShapeStatus {

    constructor(name = "", bullet = false) {
        super("rectangle", name, bullet);
        this.bullet = bullet;
    }

    draw(ctx) {
        ctx.fillStyle = (this.bullet) ? this.col : `rgb(${this.col.red}, ${this.col.green}, ${this.col.blue})`;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

}