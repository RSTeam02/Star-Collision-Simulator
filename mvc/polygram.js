import { ShapeStatus } from "./shapeStatus.js";

/**
 * @author sakaijun
 * class for generating n-sided Polygram
 * 
 */
export class Polygram extends ShapeStatus {

    constructor() {
        super("polygram");
        this.s = 0;        
        this.r = 0;
        this.angle = 0;
        this.rotate = 1;
        
    }

    draft() {
        let starPath = new Path2D(); 
        starPath.moveTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));
        let delta = Math.PI / this.s;
        for (let k = 0; k < this.s; k++) {
            //if every polygram has 6, 10, 14, 18... vertices
            if ((this.s - 6) % 4 === 0) {
                //angle shift by Math.PI / k
                if (this.s / 2 === k) {
                    this.angle += Math.PI / k;
                    starPath.moveTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));
                }
            }
            for (let i = 1; i < this.s; i++) {
                //if number of vertices is even, begin shifting angle at i>1
                if (i > 1 && this.s % 2 == 0 || this.s % 2 !== 0) {
                    this.angle += delta;
                }
            }
            starPath.lineTo(this.x + this.r * Math.sin(this.angle), this.y - this.r * Math.cos(this.angle));
        }
        return starPath;
    }

}