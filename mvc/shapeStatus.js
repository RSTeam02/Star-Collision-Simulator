/**
 * @author sakaijun
 * inherited class for every shape object
 * acquire every collision of every object => change direction  
 * change rotation direction if collided
 */

export class ShapeStatus {

    constructor(shapeInfo) {
        this.objId = 0;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.col = { red: 0, green: 0, blue: 0 }
        this.name = name;
        this.hit = true;
        this.explosion = false;
        this.explosionEffect = false;
        this.shapeInfo = shapeInfo;
        this.showAttr = true;
        this.showAllAttr = false;
        this.drag = false;
        this.dragSpeed = 0;
        this.maxDragSpeed = 0;
        this.hover = false;
        this.bullet = false;
        this.rotate = 1;
        this.stroke = false;
        this.fill = false;
        this.distance = 0;

    }

    visualNoise() {
        let noiseArr = ["^", "°", "*", "#", ".", "+", "!", "KABOOM!"];
        let rnd = Math.floor(Math.random() * noiseArr.length);
        return noiseArr[rnd];
    }

    moveShape() {
        this.x += this.dx;
        this.y += this.dy;
    }

    /**
     * simulation of alternating rotation speed dependent on angle
     */
    rotateDir() {
        if (this.s > 2) {
            this.rotate = -this.angle * this.r;
        }
    }

    shapeCollision(shape) {
        this.collided = false;

        //a polygon or polygram with s > 2 is an approx. circle
        if (shape.s > 2 || shape.shapeInfo == "circle" && this.shapeInfo == "rectangle") {
            if (this.x < shape.r + shape.x &&
                this.x + this.w > shape.x - shape.r &&
                this.y < shape.y + shape.r &&
                this.h + this.y > shape.y - shape.r) {
                this.collided = true;
                if (!this.bullet) {
                    this.bounceObj(shape);
                }

            }

        } else if (this.s > 2 || this.shapeInfo == "circle" && shape.shapeInfo == "rectangle") {
            if (shape.x < this.r + this.x &&
                shape.x + shape.w > this.x - this.r &&
                shape.y < this.y + this.r &&
                shape.h + shape.y > this.y - this.r) {
                this.collided = true;
                if (!this.bullet) {
                    this.bounceObj(shape);
                }

            }
        } else if (shape.shapeInfo == "circle" || shape.s > 2 &&
            this.shapeInfo == "circle" || this.s > 2) {
            var distance = Math.sqrt(Math.pow((this.x - shape.x), 2) + Math.pow((this.y - shape.y), 2))
            if (distance < shape.r + this.r) {
                this.collided = true;

                if (!this.bullet) {
                    this.bounceObj(shape);
                }

            }
        } else if (this.shapeInfo == "circle" || this.s > 2 &&
            shape.shapeInfo == "circle" || shape.s > 2) {
            var distance = Math.sqrt(Math.pow((this.x - shape.x), 2) + Math.pow((this.y - shape.y), 2))
            if (distance < this.r + shape.r) {
                this.collided = true;
                if (!this.bullet) {
                    this.bounceObj(shape);
                }

            }
            //rectangle && rectangle
        } else {
            if (this.x < shape.x + shape.w &&
                this.x + this.w > shape.x &&
                this.y < shape.y + shape.h &&
                this.h + this.y > shape.y) {
                this.collided = true;
                if (!this.bullet) {
                    this.bounceObj(shape);
                }

            }
        }
        return this.collided;
    }

    /**
     * bouncing physics simulation between shapes with alternating angles
     * tutorial reference: 
     * https://stackoverflow.com/questions/30497287/elastic-2d-ball-collision-using-angles
     */

    bounceObj(shape) {
        var minDistance = this.r + shape.r;
        var relDistX = shape.x - this.x;
        var relDistY = shape.y - this.y;
        this.angle = Math.atan2(relDistY, relDistX);
        shape.dx -= Math.cos(this.angle);
        shape.dy -= Math.sin(this.angle);
        this.dx += Math.cos(this.angle);
        this.dy += Math.sin(this.angle);
    }

}