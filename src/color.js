'use strict';

export class Color{
	constructor(r,g,b){
		this.r = r;
		this.g = g;
		this.b = b;
	}
	setColor(r,g,b){
		this.r = r;
		this.g = g;
		this.b = b;
	}

	getColor(){
		return this.r, this.g, this.b
	}
}