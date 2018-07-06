export class View {

    constructor() {

        $("#visuCanvas").attr("width", 480);
        $("#visuCanvas").attr("height", 480);
        this.ctxModel = $("#visuCanvas")[0].getContext("2d");

        $("#simCanvas").attr("width", 1024);
        $("#simCanvas").attr("height", 768);
        this.ctxSet = $("#simCanvas")[0].getContext("2d");
    }

    displayShapeSet(model) {
        let path = model.draft();
        this.ctxSet.font = "12px Monospace";
        this.ctxSet.fillStyle = "black";
        this.ctxSet.textAlign = "left";
        if (model.hover && model.showAttr || model.showAllAttr) {
            let text = (model.name !== "Triangle" && model.name !== "Square") ? `${model.s}-pointed star (${model.name})` : `${model.name}`
            this.ctxSet.fillText(text, model.x + model.r, model.y);
            this.ctxSet.fillText(`position(x/y): ${model.x}/${model.y}`, model.x + model.r, model.y + 12);
        }
        if (model.explosion) {
            if (model.explosionEffect) {
                this.ctxSet.font = "30px Comic Sans MS";
                this.ctxSet.fillStyle = "black";
                this.ctxSet.textAlign = "center";
                this.ctxSet.fillText(model.visualNoise(), model.x + Math.floor(Math.random() * 100) - 50, model.y + Math.floor(Math.random() * 100) - 50);
            }
        } else {
            this.ctxSet.fillStyle = `rgb(${model.col.red}, ${model.col.green}, ${model.col.blue})`;
            if (model.fill) {
                this.ctxSet.fill(path);
            }
        }
        if (model.stroke) {
            this.ctxSet.stroke(path);
        }
    }

    displayShape(model) {
        let path = model.draft();
        this.ctxModel.fillStyle = `rgb(${model.col.red}, ${model.col.green}, ${model.col.blue})`;
        if (model.fill) {
            this.ctxModel.fill(path);
        }
        if (model.stroke) {
            this.ctxModel.stroke(path);
        }
    }

}