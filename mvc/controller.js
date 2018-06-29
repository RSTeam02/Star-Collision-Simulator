import { View } from "./view.js";
import { Rectangle } from "./rectangle.js";
import { Polygram } from "./polygram.js";

/**
 * @author sakaijun
 * 
 * Star-Collision Sim
 * 
 * generate canvas area
 * generate shape objects, inherit position coords
 * control a shape (keys) in all directions, move shapes (requestAnimationFrame) 
 * 
 * 
 */

export class Controller {

    constructor() {

        this.view = new View();
        this.view.display();
        this.shape = new Polygram($("#vert").val(), "Polygram");

        this.modelCol = {
            red: $("#red").val(Math.random() * 256),
            green: $("#green").val(Math.random() * 256),
            blue: $("#blue").val(Math.random() * 256)
        }
        $("#redInfo").html(`${$("#red").val()}`);
        $("#greenInfo").html(`${$("#green").val()}`);
        $("#blueInfo").html(`${$("#blue").val()}`);
        $("#radiusInfo").html(`${$("#radius").val()}`);
        this.showHideHl();
        this.canvasW_Set = $("#simCanvas").attr("width");
        this.canvasH_Set = $("#simCanvas").attr("height");
        this.canvasW_Model = $("#visuCanvas").attr("width");
        this.canvasH_Model = $("#visuCanvas").attr("height");
        this.keyListener();
        this.previewShape();
        this.isRunning = true;
        this.isRunningModel = false;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.bulletNo = 0;
        this.bulletFreq = 0;
        this.bullet = new Rectangle("Bullet", true);
        this.nextBullet = true;

    }
    /**
     * 
     * switch between contents 
     */
    showHideHl(event = undefined) {
        let classCont = document.getElementsByClassName("cont");
        let classLink = document.getElementsByClassName("link");
        let currId = (event === undefined) ? "visu" : event.currentTarget.id;

        for (let i = 0; i < classLink.length; i++) {
            if (currId === classLink[i].id) {
                $(classCont[i]).show();
            } else {
                $(classLink[i])
                    .css("font-weight", "normal")
                    .html($(classLink[i]).text());
                $(classCont[i]).hide();
            }
        }
    }

    /**
     * generate random Polygons, Polygrams with random parameters
     */
    rndShape() {
        let minX = 40;
        let minY = 30;
        let maxX = this.canvasW_Set - 50;
        let maxY = this.canvasH_Set - 50;
        let minW = 30;
        let minH = 30;
        let maxW = 60;
        let maxH = 60;
        let minR = 15;
        let maxR = 30;
        //random number of Polygon/gram sides
        let numberOfS = Math.floor((Math.random() * 13) + 4);

        let shape = new Polygram(numberOfS, "Polygram");
        let w, h;
        let direction = [-1, 1];
        let shapeCol = {
            red: Math.floor(Math.random() * 256),
            green: Math.floor(Math.random() * 256),
            blue: Math.floor(Math.random() * 256)
        }
        let x = Math.floor(Math.random() * (maxX - minX) + minX);
        let y = Math.floor(Math.random() * (maxY - minY) + minY);
        w = h = Math.floor(Math.random() * (maxW - minW) + minW);
        let r = Math.floor(Math.random() * (maxR - minR) + minR);

        shape.col = shapeCol;
        shape.x = x;
        shape.y = y;
        shape.dx = direction[Math.floor(Math.random() * 2)];
        shape.dy = direction[Math.floor(Math.random() * 2)];
        shape.r = r;

        return shape;
    }

    /**
     * used keycodes (arrow keys, ctrl)
     */
    keyListener() {
        $('.link').hover((event) => {
            $(event.currentTarget).html(`<b>${$(event.currentTarget).text()}</b>`);
        }, (event) => {
            $(event.currentTarget).html($(event.currentTarget).text());
        }).click((event) => {
            this.showHideHl(event);
            $(event.currentTarget)
                .css("font-weight", "bold")
                .html($(event.currentTarget).text());
        });
        $("#simCont").on("keydown keyup", (e) => {
            e.preventDefault();

            var pushed = (e.type === "keydown") ? true : false;
            if (e.keyCode == 37) {
                this.left = pushed;
            }
            if (e.keyCode == 39) {
                this.right = pushed;
            }
            if (e.keyCode == 38) {
                this.up = pushed;
            }
            if (e.keyCode == 40) {
                this.down = pushed;
            }
            if (e.keyCode == 17) {
                this.shot = pushed;
                if (e.type === "keyup") { this.bulletFreq = 0; };

            }
            e.target.focus({ preventScroll: false });
        });
        /**
         * select number of shapes and generate
         */
        $("#generate").on("click", () => {
            //select number of shapes
            let currentVal = parseInt($("#numb").val());
            let maxObj = parseInt($("#numb").attr("max"));
            let minObj = parseInt($("#numb").attr("min"));
            let numOfObj = 0;
            //this.removeShape();
            if (currentVal > maxObj) {
                numOfObj = maxObj;
            } else {
                numOfObj = (currentVal < 1) ? minObj : currentVal;
            }
            this.shapeSet = new Array(numOfObj);

            this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);
            //generate random shapes
            $("#numb").val(this.shapeSet.length)
            for (let i = 0; i < numOfObj; i++) {
                this.shapeSet[i] = this.rndShape();
                this.shapeSet[i].stroke = $('#strokeSet').prop('checked');
                this.shapeSet[i].fill = $('#fillSet').prop('checked');
                this.shapeSet[i].draw(this.view.ctxSet);
            }

            let shapeCol = {
                red: Math.floor(Math.random() * 256),
                green: Math.floor(Math.random() * 256),
                blue: Math.floor(Math.random() * 256)
            }

        });

        $("#rotate, #radius, #vert, .colClass").on("click input", () => {
            this.previewShape();
        });

        $(".fsSim").on("click", () => {
            this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);
            for (let i = 0; i < this.shapeSet.length; i++) {
                this.shapeSet[i].stroke = $('#strokeSet').prop('checked');
                this.shapeSet[i].fill = $('#fillSet').prop('checked');
                this.shapeSet[i].draw(this.view.ctxSet);
            }
        });

        $(".fsVisu").on("click", () => {
            this.view.ctxModel.clearRect(0, 0, this.canvasW_Model, this.canvasH_Model);
            this.shape.stroke = $('#strokeModel').prop('checked');
            this.shape.fill = $('#fillModel').prop('checked');
            this.shape.draw(this.view.ctxModel);

        });



        /**
         * start/pause random movements with collision detection, select speed with slider
         */
        $("#startPause").on("click", () => {
            if (this.shapeSet !== undefined) {
                this.isRunning = (this.isRunning) ? false : true;
                this.updateFrameSet();
            }
        });
        $("#rotate").on("input", () => {
            if (this.shape !== undefined) {               
                if (!this.isRunningModel) {
                    this.updateFrameModel();
                    this.isRunningModel = true;
                }
            }
        });

        $("#speed").on("input", () => {
            for (let i in this.shapeSet) {
                this.shapeSet[i].dx = (this.shapeSet[i].dx < 0) ? -parseInt($("#speed").val()) : parseInt($("#speed").val());
                this.shapeSet[i].dy = (this.shapeSet[i].dy < 0) ? -parseInt($("#speed").val()) : parseInt($("#speed").val());
            }
        });

    }
    previewShape() {
        this.view.ctxModel.clearRect(0, 0, this.canvasW_Model, this.canvasH_Model);
        this.shape.s = $("#vert").val();
        this.shape.stroke = $('#strokeModel').prop('checked');
        this.shape.fill = $('#fillModel').prop('checked');
        let w, h;
        let direction = [-1, 1];
        let x = this.canvasW_Model / 2;
        let y = this.canvasH_Model / 2;
        this.modelCol = {
            red: $("#red").val(),
            green: $("#green").val(),
            blue: $("#blue").val()
        }
        $("#redInfo").html(`${$("#red").val()}`);
        $("#greenInfo").html(`${$("#green").val()}`);
        $("#blueInfo").html(`${$("#blue").val()}`);
        $("#radiusInfo").html(`${$("#radius").val()}`);
        $("#rotateInfo").html(`${$("#rotate").val()}`);
        this.shape.col = this.modelCol;
        this.shape.x = x;
        this.shape.y = y;
        this.shape.r = $("#radius").val();
        this.shape.draw(this.view.ctxModel);
    }
    /**
     * draw every frame (model)
     */
    updateFrameModel() {

        this.view.ctxModel.clearRect(0, 0, this.canvasW_Model, this.canvasH_Model);
        this.modelCol = {
            red: $("#red").val(),
            green: $("#green").val(),
            blue: $("#blue").val()
        }
        this.shape.col = this.modelCol;
        this.shape.stroke = $('#strokeModel').prop('checked');
        this.shape.fill = $('#fillModel').prop('checked');
        this.shape.draw(this.view.ctxModel);
        if ($("#rotate").val() == 0) {
            this.isRunningModel = false;
            window.cancelAnimationFrame(() => { this.updateFrameModel(); });
        } else {
            if (this.shape.s > 2) {
                this.shape.angle += Math.PI * ($("#rotate").val()) / 360;
            }
            window.requestAnimationFrame(this.updateFrameModel.bind(this))
        }
    }

    /**
     * draw every frame, check collision of every shape
     */
    updateFrameSet() {
        this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);

        for (let i = 0; i < this.shapeSet.length; i++) {
            this.userControl(this.shapeSet[0]);
            this.shapeSet[i].stroke = $('#strokeSet').prop('checked');
            this.shapeSet[i].fill = $('#fillSet').prop('checked');
            if (!this.shapeSet[i].hit) {
                this.shapeSet[i].draw(this.view.ctxSet);
                if (this.bullet.x < this.canvasW_Set) {
                    if (i !== 0) {
                        if (!this.bullet.hit) {
                            this.bulletCollShape(this.bullet, this.shapeSet[i]);
                            this.bullet.draw(this.view.ctxSet);
                        }
                    }
                } else {
                    this.nextBullet = true;
                }
                for (let j = 0; j < this.shapeSet.length; j++) {
                    if (i !== j) {
                        if (!this.shapeSet[j].hit) {
                            this.shapeCollShape(this.shapeSet[i], this.shapeSet[j]);
                        }
                    }
                }
                if (this.shapeSet[i].explosion) {
                    this.shapeSet[i].dy = this.shapeSet[i].dx = 0;
                }
                if (i !== 0) {
                    this.bounceShape(this.shapeSet[i]);
                    this.shapeSet[i].moveShape();
                }
            }
            if (this.shapeSet[i].s > 2) {
                this.shapeSet[i].angle += this.shapeSet[i].rotate * Math.PI / 36;
            }
        }
        if (this.bullet.x < this.canvasW_Set) {
            this.bullet.moveShape();
        }
        (!this.isRunning)
            ? window.requestAnimationFrame(this.updateFrameSet.bind(this))
            : window.cancelAnimationFrame(() => { this.updateFrameSet(); });

    }

    shapeCollShape(shape1, shape2) {
        if (shape1.shapeCollision(shape2)) {
            shape1.rotateDir();
            shape2.rotateDir();
            $("#info").html(`${shape1.name} collided with ${shape2.name}`)
            setTimeout(() => {
                $("#info").html("");
            }, 2000);
        }
    }

    bulletCollShape(bullet, shape) {
        if (bullet.shapeCollision(shape)) {
            this.nextBullet = true;
            $("#info").html(`${bullet.name} collided with ${shape.name}`)
            shape.explosion = true;
            setTimeout(() => {
                $("#info").html("");
                shape.hit = true;
            }, 1000);
            bullet.hit = true;
        } else {
            this.nextBullet = false;
        }
    }

    removeShape() {
        if (this.shapeSet !== undefined) {
            if (this.shapeSet[i].hit) {
                for (let i in this.shapeSet) {
                    this.shapeSet = this.shapeSet.filter(item => item !== this.shapeSet[i]);
                }
            }
        }
    }
    /**
     * assign controls to a random shape object 
     */
    userControl(shape) {
        if (this.left) {
            if (shape.x - shape.r > 0) {
                shape.x -= 1;
            }
        }
        if (this.right) {
            if (shape.x + shape.r < this.canvasW_Set) {
                shape.x += 1;
            }
        }
        if (this.up) {
            if (shape.y - shape.r > 0) {
                shape.y -= 1;
            }
        }
        if (this.down) {
            if (shape.y + shape.r < this.canvasH_Set) {
                shape.y += 1;
            }
        }
        if (this.shot) {
            if (this.bulletFreq % 20 === 0) {
                var bullet = new Rectangle("Bullet", true);
                bullet.col = "magenta";
                bullet.w = 20;
                bullet.h = 5;
                bullet.x = shape.x;
                bullet.y = shape.y;
                if (this.nextBullet) {
                    this.bullet = bullet;
                }
            }

            if (!$('#autofire').prop('checked')) {
                this.bulletFreq = 1;
            }
            this.bulletFreq++;
        }
    }
    /**
     * 
     * @param {*} shape
     * bounce shape inside canvas
     *  
     */
    bounceShape(shape) {
        var cdiffX = 0;
        if (typeof shape.r !== "undefined") {
            cdiffX = shape.w = shape.h = shape.r;
        }
        if (shape.x + shape.dx > this.canvasW_Set - shape.w || -cdiffX + shape.x + shape.dx < 0) {
            shape.dx = -shape.dx;
            shape.rotateDir();
        }
        if (shape.y + shape.dy > this.canvasH_Set - shape.h || -cdiffX + shape.y + shape.dy < 0) {
            shape.dy = -shape.dy;
            shape.rotateDir();
        }
    }
}