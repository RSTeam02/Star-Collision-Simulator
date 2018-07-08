import { ShapeStatus } from "./shapeStatus.js";

export class Rectangle extends ShapeStatus {

    constructor(name = "", bullet = false) {
        super("rectangle", name, bullet);
        this.bullet = bullet;
        this.w = 0;
        this.h = 0;
    }

    draft() {
        let path = new Path2D();
        path.rect(this.x, this.y, this.w, this.h);
        return path;        
    }

}