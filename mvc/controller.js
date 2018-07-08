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
        this.shapeSet = [];
        this.shape = new Polygram($("#vert").val(), "Polygram");
        this.startX = 0;
        this.startY = 0;
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

        let polygramInfo = ["Hen", "Do", "Tri", "Tetra", "Penta", "Hexa", "Hepta", "Octa", "Nona", "Deca"];
        //random number of Polygram vertices  3 - 16
        let numberOfS = Math.floor((Math.random() * 14) + 3);
        let shape = new Polygram(numberOfS, "");
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


        if (numberOfS == 3) {
            shape.name = "Triangle";
        }
        if (numberOfS == 4) {
            shape.name = "Square";
        }
        if (numberOfS > 4 && numberOfS <= 10) {
            shape.name = `${polygramInfo[numberOfS - 1]}gram`;
        }
        if (numberOfS > 10) {
            shape.name = `${polygramInfo[numberOfS % 10 - 1]}decagram`;
        }
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
        $("#colllog").click(function () {
            (this.checked)
                ? $("#info").show()
                : $("#info").hide();
        });

        /**
         * tutorial reference: https://stackoverflow.com/questions/24926028/drag-and-drop-multiple-objects-in-html5-canvas
         */
        $("#simCanvas").on("mousedown mouseup mousemove", (e) => {
            e.preventDefault();
            e.stopPropagation();
            var offsetTop = document.getElementById("simCanvas").offsetTop;
            var offsetLeft = document.getElementById("simCanvas").offsetLeft;
            var mx = e.pageX - offsetLeft;
            var my = e.pageY - offsetTop;
            if (this.shapeSet.length !== 0) {
                if (e.type === "mousedown") {
                    for (let i = 0; i < this.shapeSet.length; i++) {
                        if (this.cursorPointObj(mx, my, this.shapeSet[i])) {
                            this.shapeSet[i].drag = true;
                        }
                    }
                }
                if (e.type === "mouseup") {
                    for (let i = 0; i < this.shapeSet.length; i++) {
                        this.shapeSet[i].drag = false;
                    }
                }
                if (e.type === "mousemove") {
                    this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);
                    var dx = mx - this.startX;
                    var dy = my - this.startY;
                    for (let i = 0; i < this.shapeSet.length; i++) {
                        if (this.shapeSet[i].drag) {
                            this.shapeSet[i].x += dx;
                            this.shapeSet[i].y += dy;
                        }
                        this.view.displayShapeSet(this.shapeSet[i]);
                    }
                    for (let i = 0; i < this.shapeSet.length; i++) {
                        this.shapeSet[i].hover = (this.cursorPointObj(mx, my, this.shapeSet[i])) ? true : false;
                    }
                }
            }
            this.startX = mx;
            this.startY = my;
        });

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
         * select number and generate polygrams with random parameters
         */
        $("#generate, .fsSim").on("click", (e) => {
            if (e.currentTarget.className !== "fsSim") {
                //select number of shapes
                $("#info").html("");

                this.shapeSet = [];
                let currentVal = parseInt($("#numb").val());
                let maxObj = parseInt($("#numb").attr("max"));
                let minObj = parseInt($("#numb").attr("min"));
                let numOfObj = 0;
                if (currentVal > maxObj) {
                    numOfObj = maxObj;
                } else {
                    numOfObj = (currentVal < 1) ? minObj : currentVal;
                }
                //generate random shapes
                $("#numb").val(numOfObj)
                for (let i = 0; i < numOfObj; i++) {
                    this.shapeSet[i] = this.rndShape();
                }
            }
            this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);
            for (let i = 0; i < this.shapeSet.length; i++) {
                this.shapeSet[i].dx = (this.shapeSet[i].dx < 0) ? -parseInt($("#speed").val()) : parseInt($("#speed").val());
                this.shapeSet[i].dy = (this.shapeSet[i].dy < 0) ? -parseInt($("#speed").val()) : parseInt($("#speed").val());
                this.shapeSet[i].stroke = $('#strokeSet').prop('checked');
                this.shapeSet[i].showAttr = $('#showAttr').prop('checked');
                this.shapeSet[i].showAllAttr = $('#showAllAttr').prop('checked');
                this.shapeSet[i].fill = $('#fillSet').prop('checked');
                this.shapeSet[i].explosionEffect = $('#explosion').prop('checked');
                $('#fillModel').prop('checked')
                this.view.displayShapeSet(this.shapeSet[i]);
            }
        });

        $("#rotate, #radius, #vert, .colClass,.fsVisu").on("click input", (e) => {
            if (e.currentTarget.id == "vert") {
                this.shape.angle = 0;
            }
            this.previewShape();
        });

        /**
         * start/pause random movements with collision detection, select speed with slider
         */
        $("#startPause").on("click", () => {
            if (this.shapeSet.length !== 0) {
                this.isRunning = (this.isRunning) ? false : true;
                this.updateFrameSet();
            }
        });

        $("#rotate").on("input", () => {
            if (!this.isRunningModel) {
                this.updateFrameModel();
                this.isRunningModel = true;
            }
        });


    }

    cursorPointObj(mx, my, shape) {
        return (mx < shape.x + shape.r &&
            mx > shape.x - shape.r &&
            my < shape.y + shape.r &&
            my > shape.y - shape.r) ? true : false;
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
        this.view.displayShape(this.shape);
    }
    /**
     * draft every frame (model)
     */
    updateFrameModel() {
        this.view.ctxModel.clearRect(0, 0, this.canvasW_Model, this.canvasH_Model);
        this.shape.col = this.modelCol;
        this.view.displayShape(this.shape);
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
     * draft every frame, check collision of every shape
     */
    updateFrameSet() {
        this.view.ctxSet.clearRect(0, 0, this.canvasW_Set, this.canvasH_Set);
        for (let i = 0; i < this.shapeSet.length; i++) {
            this.userControl(this.shapeSet[0]);
            this.view.displayShapeSet(this.shapeSet[i]);
            if (this.bullet.x < this.canvasW_Set) {
                if (i !== 0) {
                    if (!this.bullet.hit) {
                        this.bulletCollShape(this.bullet, this.shapeSet[i]);
                        this.view.displayShapeSet(this.bullet);
                    }
                }
            } else {
                this.nextBullet = true;
            }
            for (let j = 0; j < this.shapeSet.length; j++) {
                if (i !== j) {
                    this.shapeCollShape(this.shapeSet[i], this.shapeSet[j]);
                }
            }
            if (this.shapeSet[i].explosion) {
                this.shapeSet[i].dy = this.shapeSet[i].dx = 0;
            }
            if (i !== 0) {
                this.bounceShape(this.shapeSet[i]);
                if (!this.shapeSet[i].drag) {
                    this.shapeSet[i].moveShape();
                }
            }
            if (this.shapeSet[i].s > 2) {
                this.shapeSet[i].angle += this.shapeSet[i].rotate * Math.PI / 36;
            }
        }
        $('div pre:gt(9)').remove();
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
            $("#info").prepend(`<pre>${shape1.name} collided with ${shape2.name}</pre>`);
        }
    }

    /**
     * 
     * @param {*} bullet 
     * @param {*} shape 
     * if bullet hits an object set explosion true and remove it from array with 1 sec delay
     */
    bulletCollShape(bullet, shape) {
        if (bullet.shapeCollision(shape) && !shape.explosion) {
            this.nextBullet = true;
            $("#info").prepend(`<pre>${shape.name} was pulverized by a ${bullet.name}</pre>`);
            shape.explosion = true;
            setTimeout(() => {
                var index = this.shapeSet.indexOf(shape);
                if (index >= 0) {
                    this.shapeSet.splice(index, 1);
                }
            }, 1500);
            bullet.hit = true;
        } else {
            this.nextBullet = false;
        }
    }

    /**
     * assign controls to a random shape object with index0 
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
                if (this.nextBullet) {
                    this.newBullet(shape);
                }
            }
            if (!$('#autofire').prop('checked')) {
                this.bulletFreq = 1;
            }
            this.bulletFreq++;
        }
    }

    newBullet(shape) {
        this.bullet = new Rectangle("Bullet", true);
        this.bullet.col = {
            red: 255,
            green: 0,
            blue: 255
        };
        this.bullet.w = 20;
        this.bullet.h = 5;
        this.bullet.x = shape.x;
        this.bullet.y = shape.y;
        this.bullet.stroke = $('#strokeSet').prop('checked');
        this.bullet.fill = $('#fillSet').prop('checked');
    }
    /**
     * 
     * @param {*} shape
     * bounce shape inside canvas
     *  
     */
    bounceShape(shape) {
        var cdiffX = 0;
        cdiffX = shape.w = shape.h = shape.r;

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