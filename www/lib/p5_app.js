export class P5App {
    constructor(apiWrapper,monaca) {
        var s = app(apiWrapper,monaca);
        var myp5 = new p5(s);
    }
}

function app(apiWrapper,monaca){
    return function(p){
        p.setup = function () {
            var canvas = p.createCanvas(600, 400);
            canvas.parent("p5monaca");
        }

        p.draw = function () {
            p.ellipse(p.mouseX, p.mouseY, 20, 20);
        }
    }
}


