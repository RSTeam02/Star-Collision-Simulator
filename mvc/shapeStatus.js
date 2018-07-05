/**
 * @author sakaijun
 * inherited class for every shape object
 * acquire every collision of every object => change direction  
 * change rotation direction if collided
 */

export class ShapeStatus {

    constructor(shapeInfo, name, bullet) {
        this.x = 0;
        this.y = 0;
        this.dx = 1;
        this.dy = 1;
        this.name = name;
        this.hit = false;
        this.explosion = false;
        this.explosionEffect = false;
        this.shapeInfo = shapeInfo;
        this.showAttr = true;
        this.drag = false;
        this.hover = false;
        this.bullet = bullet;
        this.rotate = 1;
        this.stroke = false;
        this.fill = false;
    }

    visualNoise() {
        let noiseArr = ["^", "°", "*", "#", ".", "+", "!", "KABOOM!"];
        let rnd = Math.floor(Math.random() * noiseArr.length);
        return noiseArr[rnd];
    }

    moveShape() {
        if (!this.bullet) {
            this.x += this.dx;
            this.y += this.dy;
        } else {
            this.x += this.dx * 100;
        }
    }

    rotateDir() {
        if (this.s > 2) {
            this.rotate = -this.rotate;
        }
    }

    shapeCollision(shape) {
        var collided = false;
        //a polygon or polygram with s > 2 is an approx. circle
        if (shape.s > 2 || shape.shapeInfo == "circle" && this.shapeInfo == "rectangle") {
            if (this.x < shape.r + shape.x &&
                this.x + this.w > shape.x - shape.r &&
                this.y < shape.y + shape.r &&
                this.h + this.y > shape.y - shape.r) {
                if (!this.bullet) {
                    shape.dx = -shape.dx;
                    shape.dy = -shape.dy;
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                }
                collided = true;
            }

        } else if (this.s > 2 || this.shapeInfo == "circle" && shape.shapeInfo == "rectangle") {
            if (shape.x < this.r + this.x &&
                shape.x + shape.w > this.x - this.r &&
                shape.y < this.y + this.r &&
                shape.h + shape.y > this.y - this.r) {
                if (!this.bullet) {
                    shape.dx = -shape.dx;
                    shape.dy = -shape.dy;
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                }
                collided = true;
            }
        } else if (shape.shapeInfo == "circle" || shape.s > 2 &&
            this.shapeInfo == "circle" || this.s > 2) {
            var distance = Math.sqrt(Math.pow((this.x - shape.x), 2) + Math.pow((this.y - shape.y), 2))
            if (distance < shape.r + this.r) {
                if (!this.bullet) {
                    shape.dx = -shape.dx;
                    shape.dy = -shape.dy;
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                }
                collided = true;
            }
        } else if (this.shapeInfo == "circle" || this.s > 2 &&
            shape.shapeInfo == "circle" || shape.s > 2) {
            var distance = Math.sqrt(Math.pow((this.x - shape.x), 2) + Math.pow((this.y - shape.y), 2))
            if (distance < this.r + shape.r) {
                if (!this.bullet) {
                    shape.dx = -shape.dx;
                    shape.dy = -shape.dy;
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                }
                collided = true;
            }
            //rectangle && rectangle
        } else {
            if (this.x < shape.x + shape.w &&
                this.x + this.w > shape.x &&
                this.y < shape.y + shape.h &&
                this.h + this.y > shape.y) {
                if (!this.bullet) {
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    shape.dx = -shape.dx;
                    shape.dy = -shape.dy;
                }
                collided = true;
            }
        }

        return collided;

    }

}