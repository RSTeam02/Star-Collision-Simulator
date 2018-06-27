export class View{    
    
    display(){
        var canvas0 = $("#visuCanvas");   
        canvas0.attr("width", 480);
        canvas0.attr("height", 480);
        this.ctxModel = canvas0[0].getContext("2d");

        var canvas1 = $("#simCanvas");            
        canvas1.attr("width", 1024);
        canvas1.attr("height", 768);
        this.ctxSet = canvas1[0].getContext("2d");
    }

    info(info){
        $("#info").html(info);
    }
}