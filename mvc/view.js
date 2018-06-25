export class View{    
    
    display(){
        var canvas = $("<canvas></canvas>");
        canvas.appendTo("#display");
        canvas.attr("id", "test");      
        canvas.attr("width", 1024);
        canvas.attr("height", 768);
        this.ctx = canvas[0].getContext("2d");
    }

    info(info){
        $("#info").html(info);
    }
}