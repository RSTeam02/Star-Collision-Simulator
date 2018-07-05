import { ShapeStatus } from "./shapeStatus.js";

/**
 * @author sakaijun
 * class for generating n-sided Polygram
 * 
 */
export class Polygram extends ShapeStatus {

    constructor(s, name = "", bullet = false) {
        super("polygram", name, bullet);
        this.s = s;
        this.bullet = bullet;
        this.angle = 0;
        this.rotate = 1;
    }

    draw(ctx) {
        let vnoise;
        ctx.beginPath();
        ctx.moveTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));
        let delta = Math.PI / this.s;
        for (let k = 0; k < this.s; k++) {
            //if every polygram has 6, 10, 14, 18... vertices
            if ((this.s - 6) % 4 === 0) {
                //angle shift by Math.PI / k
                if (this.s / 2 === k) {
                    this.angle += Math.PI / k;
                    ctx.moveTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));
                }
            }
            for (let i = 1; i < this.s; i++) {
                //if number of vertices is even, begin shifting angle at i>1
                if (i > 1 && this.s % 2 == 0 || this.s % 2 !== 0) {
                    this.angle += delta;
                }
            }
            ctx.lineTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));

        }
        if (!this.explosion) {
            if (this.fill) {
                ctx.fillStyle = `rgb(${this.col.red}, ${this.col.green}, ${this.col.blue})`;
                ctx.fill();
            }
            let text = (this.name !== "Triangle" && this.name !== "Square") ? `${this.s}-pointed star (${this.name})` : `${this.name}`
            if (this.showAttr) {
                ctx.font = "12px Monospace";
                ctx.fillStyle = "black";
                ctx.textAlign = "left";
                if (this.hover) {
                    ctx.fillText(text, this.x + this.r, this.y);
                    ctx.fillText(`position(x/y): ${this.x}/${this.y}`, this.x + this.r, this.y + 12);
                } else {
                    ctx.fillText("", this.x + this.r, this.y);
                    ctx.fillText("", this.x + this.r, this.y + 12);
                }
            }
        } else {
            if (this.explosionEffect) {
                ctx.font = "30px Comic Sans MS";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText(super.visualNoise(), this.x + Math.floor(Math.random() * 100) - 50, this.y + Math.floor(Math.random() * 100) - 50);
            }

        }
        if (this.stroke) {
            ctx.stroke();
        }
    }

}