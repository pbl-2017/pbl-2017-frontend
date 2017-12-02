export class P5App {
    constructor(apiWrapper) {
        var s = app(apiWrapper);
        var myp5 = new p5(s);
    }
}

function app(apiWrapper){
    return function(p){
        p.setup = function () {
            p.createCanvas(600, 400);
        }

        p.draw = function () {
            p.ellipse(p.mouseX, p.mouseY, 20, 20);
        }
    }
}


