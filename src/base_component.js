'use strict';
import {ComponentTemplate} from "./templates.js";

/*
	Input component class.
	I should rename it to IO or soething...
*/
export class Input extends ComponentTemplate{
	constructor(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, comp_id=null){
		super(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, false);

		this.io_type = 1;
		this.arc_radius = this.radius*2;
		this.text_xmargin = 10;
		this.text_ymargin = 20;//4;
		this.comp_id = comp_id;
	}
	draw(){
		this.p5js.push();

		if(this.select_flag) this.p5js.fill(this.select_color.r, this.select_color.g, this.select_color.b);
		else if(this.on_flag) this.p5js.fill(this.on_color.r, this.on_color.g, this.on_color.b);
		else if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.arc(this.x, this.y, this.arc_radius, this.arc_radius, this.p5js.PI, 0, this.p5js.CHORD);
		this.p5js.textSize(this.text_size);
		this.p5js.textAlign(this.p5js.CENTER);
		this.p5js.fill(0, 0, 0);
		//this.p5js.text(this.name, this.x+this.text_xmargin, this.y+this.text_ymargin);
		this.p5js.text(this.name, this.x, this.y+this.text_ymargin);

		this.p5js.pop();
	}

	getX_d(){
		//return this.x-this.radius;
		return this.x;
	}

	getY_d(){
		//return this.y;
		return this.y-this.radius;
	}
}

export class Output extends ComponentTemplate{
	constructor(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, flag_forward, comp_id=null){
		super(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, flag_forward);

		this.io_type = 0;
		this.arc_radius = this.radius*2;
		this.text_xmargin = -50;
		this.text_ymargin = -5;
		this.comp_id = comp_id;
	}
	draw(){
		this.p5js.push();

		if(this.select_flag) this.p5js.fill(this.select_color.r, this.select_color.g, this.select_color.b);
		else if(this.on_flag) this.p5js.fill(this.on_color.r, this.on_color.g, this.on_color.b);
		else if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.arc(this.x, this.y, this.arc_radius, this.arc_radius, 0, -this.p5js.PI, this.p5js.CHORD);

		this.p5js.textSize(this.text_size);
		this.p5js.textAlign(this.p5js.CENTER);
		this.p5js.fill(0, 0, 0);
		//this.p5js.text(this.name, this.x+this.text_xmargin, this.y+this.text_ymargin);
		this.p5js.text(this.name, this.x, this.y+this.text_ymargin);

		this.p5js.pop();
	}
	getX_d(){
		//return this.x+this.radius;
		return this.x;
	}
	getY_d(){
		//return this.y;
		return this.y+this.radius;
	}
}

/*
	Action node class.
	using like clicking on 
*/
export class Button extends ComponentTemplate{
	constructor(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, comp_id=null){
		super(p, parent, relative_pos_x, relative_pos_y, color, select_color, on_color, false);

		this.io_type = 0;
		this.w = 80;
		this.h = 40;
		this.text_xmargin = 10;
		this.text_ymargin = 20;
		this.comp_id = comp_id;
	}
	draw(){
		this.p5js.push();

		if(this.select_flag) this.p5js.fill(this.select_color.r, this.select_color.g, this.select_color.b);
		else if(this.on_flag) this.p5js.fill(this.on_color.r, this.on_color.g, this.on_color.b);
		else if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h);

		this.p5js.textSize(this.text_size);
		this.p5js.fill(255, 255, 255);
		this.p5js.text(this.name, this.x+this.text_xmargin, this.y+this.text_ymargin);

		this.p5js.pop();
	}

	isMouseOn( mx, my){
		if(mx >= this.x && mx <= this.x+this.w && my >= this.y && my <= this.y+this.h) return true;
		return false;
	}
	
	hasForwarding(){
		return true;
	}
	
	run(){
		this.parent.run();
	}
}