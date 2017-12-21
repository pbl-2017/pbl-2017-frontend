'use strict';
import {NodeTemplate} from "./templates.js";
import {input_component, output_component, button_component, io_input_component, io_output_component, option_input_component, option_output_component} from "./gen_component.js";


/*
export class ConstNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, input_field){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Const";
		this.desc = "val : ";
		this.top_margin = 50;
		this.bottom_margin = 10;
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.input_field_posx = this.x+15;
		this.input_field_posy = this.y+this.h-20;

		this.input_field = input_field;

		this.addComponent(output_component(this.p5js, this, this.w, this.components.length*this.component_margin+this.top_margin, 0, false, "output"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		else this.p5js.noFill();
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(this.att_stroke_size);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(this.att_stroke_size);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.textAlign(this.p5js.LEFT);
		this.p5js.text(this.desc+String(this.val), this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}

	setVal(val){
		var tmp = parseInt(val)
		if(!isNaN(tmp)) this.val = tmp;
	}

	setField(){
		this.input_field.value(this.val);
		this.input_field_posx = this.x+15;
		this.input_field_posy = this.y+this.h-20;
		this.input_field.position(this.input_field_posx, this.input_field_posy);
		this.input_field.show();
	}

	updateComponentPos(){
		for(var i=0, len = this.components.length; i < len; i++) this.components[i].setPos(this.x, this.y);
		
		// outer stroke
		this.margin_x = this.x-this.margin;
		this.margin_y = this.y-this.margin;
		this.margin_w = this.w+this.margin*2;
		this.margin_h = this.h+this.margin*2;

		this.input_field_posx = this.x+15;
		this.input_field_posy = this.y+this.h-20;
		this.input_field.position(this.input_field_posx, this.input_field_posy);
	}

	hideField(){
		this.input_field.hide();
	}

	hasField(){
		return true;
	}

	writeOutput(){
		return this.val;
	}
}

export class ButtonNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Button";
		this.desc = "";

		this.addComponent(output_component(this.p5js, this, this.w, 20, 0, true, "output"));
		this.addComponent(button_component(this.p5js, this, 10, 50, 0, false, "button"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}

	run(){
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length;id++){
				for(var i=0; i < this.output_nodes[id].length;i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			}
		}
	}
}

export class AddNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, calc_queue);
		this.name = "Add";
		this.desc = "value1 + value2";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.top_margin += this.desc_topmargin;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "output"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	// read from input node
	readInput(){
		this.buff = 0;
		var tmp=0;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[0][0].writeOutput());
				if(!isNaN(tmp)) this.buff = tmp;
			}
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[1][0].writeOutput());
				if(!isNaN(tmp)) this.buff += tmp;
			}
		}
	}

	// this is called from other nodes
	writeOutput(){
		return this.buff;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length; id++){
				for(var i=0; i < this.output_nodes[id].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			} 
		}
	}
}
export class SubNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Sub";
		this.desc = "value1 - value2";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.top_margin += this.desc_topmargin;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "output"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	// read from input node
	readInput(){
		this.buff = 0;
		var tmp=0;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[0][0].writeOutput());
				if(!isNaN(tmp)) this.buff = tmp;
			}
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[1][0].writeOutput());
				if(!isNaN(tmp)) this.buff -= tmp;
			}
		}
	}

	// this is called from other nodes
	writeOutput(){
		return this.buff;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length; id++){
				for(var i=0; i < this.output_nodes[id].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			} 
		}
	}
}
export class MulNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Mul";
		this.desc = "value1 * value2";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.top_margin += this.desc_topmargin;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "output"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	// read from input node
	readInput(){
		this.buff = 0;
		var tmp=0;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[0][0].writeOutput());
				if(!isNaN(tmp)) this.buff = tmp;
			}
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[1][0].writeOutput());
				if(!isNaN(tmp)) this.buff *= tmp;
			}
		}
	}

	// this is called from other nodes
	writeOutput(){
		return this.buff;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length; id++){
				for(var i=0; i < this.output_nodes[id].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			} 
		}
	}
}
export class DivNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Div";
		this.desc = "value1 / value2";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.top_margin += this.desc_topmargin;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "output"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	// read from input node
	readInput(){
		this.buff = 0;
		var tmp=0;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[0][0].writeOutput());
				if(!isNaN(tmp)) this.buff = tmp;
			}
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[1][0].writeOutput());
				// should I think of division 0?
				if(!isNaN(tmp)) this.buff /= tmp;
			}
		}
	}

	// this is called from other nodes
	writeOutput(){
		return this.buff;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length; id++){
				for(var i=0; i < this.output_nodes[id].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			} 
		}
	}
}
export class ModNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Mod";
		this.desc = "value1 % value2";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.top_margin += this.desc_topmargin;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "output"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	// read from input node
	readInput(){
		this.buff = 0;
		var tmp=0;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[0][0].writeOutput());
				if(!isNaN(tmp)) this.buff = tmp;
			}
			if(this.input_nodes[0].length > 0 ){
				tmp = parseInt(this.input_nodes[1][0].writeOutput());
				if(!isNaN(tmp)) this.buff = this.buff%tmp;
			}
		}
	}

	// this is called from other nodes
	writeOutput(){
		return this.buff;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length; id++){
				for(var i=0; i < this.output_nodes[id].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			} 
		}
	}
}

export class PrintCSNode extends NodeTemplate{
	constructor(p,pos_x, pos_y, color, select_color, on_color, calc_queue){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Print";
		this.desc = "print to \nconsole.";
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;

		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, ""));

		this.buff = "";
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}
	readInput(){
		if(this.input_nodes != []) this.buff = this.input_nodes[0][0].writeOutput();
	}

	run(){
		this.readInput();
		// print in console
		console.log(this.buff);
	}
}

export class ConditionalNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, select_box){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue);
		this.name = "Condition";
		this.val = "=";
		this.top_margin = 55;
		this.bottom_margin = 15;
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.select_box_posx = this.x+15;
		this.select_box_posy = this.y+this.h-20;

		this.select_box = select_box;

		this.buff = 0;

		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "true"));
		this.addComponent(output_component(this.p5js, this, this.h, this.components.length*this.component_margin+this.top_margin, 0, true, "false"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value1"));
		this.addComponent(input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "value2"));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.textSize(this.desc_font_size);
		this.p5js.text("value1 "+this.val+" value2", this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}
	
	setField(){
		//this.select_box.option(this.select_options);
		//this._setOptionToSelect();
		this.select_box.value(this.val);
		this.select_box_posx = this.x+15;
		this.select_box_posy = this.y+this.h-20;
		this.select_box.position(this.select_box_posx, this.select_box_posy);
		this.select_box.show();
	}

	updateComponentPos(){
		for(var i=0, len = this.components.length; i < len; i++) this.components[i].setPos(this.x, this.y);
		
		// outer stroke
		this.margin_x = this.x-this.margin;
		this.margin_y = this.y-this.margin;
		this.margin_w = this.w+this.margin*2;
		this.margin_h = this.h+this.margin*2;

		this.select_box_posx = this.x+15;
		this.select_box_posy = this.y+this.h-20;
		this.select_box.position(this.select_box_posx, this.select_box_posy);
	}

	// read from input node
	readInput(){
		this.buff = false;
		var val1, val2;
		if(this.input_nodes.length == 2){
			if(this.input_nodes[0].length == 0 ) return;
			val1 = parseInt(this.input_nodes[0][0].writeOutput());
			if(isNaN(val1)) return;
			
			if(this.input_nodes[1].length == 0 ) return;
			val2 = parseInt(this.input_nodes[1][0].writeOutput());
			if(isNaN(val2)) return;

			if(this.val == "=") this.buff = (val1 == val2);
			else if(this.val == "≠") this.buff = (val1 != val2);
			else if(this.val == ">") this.buff = (val1 > val2);
			else if(this.val == "≧") this.buff = (val1 >= val2);
			else if(this.val == "<") this.buff = (val1 < val2);
			else if(this.val == "≦") this.buff = (val1 <= val2);
		}
	}
	writeOutput(){
		return this.buff;
	}

	hideField(){
		this.select_box.hide();
	}

	hasField(){
		return true;
	}

	run(){
		this.readInput();
		if(this.output_nodes != []){
			if(this.buff){
				for(var i=0; i < this.output_nodes[0].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[0][i]);
				}
			}else{
				for(var i=0; i < this.output_nodes[1].length; i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[1][i]);
				} 
			}
		}
	}
}
*/

var adjust_x = -50;
var adjust_y = -50;

export class MenuNode extends NodeTemplate{
	constructor(p,relative_pos_x, relative_pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, relative_pos_x, relative_pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "";
		this.desc = "";
		this.relative_pos_x = relative_pos_x;
		this.relative_pos_y = relative_pos_y;
		this.setPos(p.windowWidth/2+relative_pos_x+adjust_x, p.windowHeight/2+relative_pos_y+adjust_y);
		this.w = 100;
		this.h = 100;
		this.desc_topmargin = 0;
		this.desc_leftmargin = 10;
		this.ext_arg = null;

		this.node_id = node_id;

		this.buff = "";
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}
	updatePos(){
		this.setPos(this.p5js.windowWidth/2+this.relative_pos_x+adjust_x, this.p5js.windowHeight/2+this.relative_pos_y+adjust_y);
	}

	setDrawManager(que){
		this.draw_manager = que;
	}
	setCallFunction(func){
		this.call_func = func;
	}
	setExtraArgument(arg){
		this.ext_arg = arg;
	}

	genDevice(){
		;
	}

	run(){
		if(this.call_func != null){
			if(this.ext_arg != null) this.draw_manager.pushDrawQueue(this.call_func(this.p5js, this.p5js.windowWidth/2, this.p5js.windowHeight/2, this.ext_arg));
			else this.draw_manager.pushDrawQueue(this.call_func(this.p5js, this.p5js.windowWidth/2, this.p5js.windowHeight/2));
		}
		// print in console
		//console.log("menu pressed");
	}
}

export class command_MenuNode extends NodeTemplate{
	constructor(p,relative_pos_x, relative_pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, relative_pos_x, relative_pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "";
		this.desc = "";
		this.relative_pos_x = relative_pos_x;
		this.relative_pos_y = relative_pos_y;
		this.setPos(p.windowWidth/2+relative_pos_x+adjust_x, p.windowHeight/2+relative_pos_y+adjust_y);
		this.w = 100;
		this.h = 100;
		this.desc_topmargin = 0;
		this.desc_leftmargin = 10;
		this.ext_arg = null;

		this.node_id = node_id;

		this.buff = "";
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}
	updatePos(){
		this.setPos(this.p5js.windowWidth/2+this.relative_pos_x+adjust_x, this.p5js.windowHeight/2+this.relative_pos_y+adjust_y);
	}

	setDrawManager(que){
		this.draw_manager = que;
	}
	setCallFunction(func){
		this.call_func = func;
	}
	setExtraArgument(arg){
		this.ext_arg = arg;
	}

	genDevice(){
		;
	}

	setFunctioin(f){
		this.func = f;
	}

	run(){
		this.func()
	}
}

export class GetList extends NodeTemplate{
	constructor(p,pos_x, pos_y, color, select_color, on_color, calc_queue, apiWrapper, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "get list";
		this.desc = "print to \nconsole.";
		this.top_margin = 55;
		this.bottom_margin = 15;
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.api_wrapper = apiWrapper;
		this.device_id = null;

		this.addComponent(io_input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, ""));

		this.buff = "";
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.desc, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}
	readInput(){
		if(this.input_nodes != []) this.buff = this.input_nodes[0][0].writeOutput();
	}

	run(){
		console.log(this.api_wrapper.get.devices.toList());
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name":"GetList", "node_id":this.node_id, "node_pos":[this.x, this.y], "device_id":null, "input_node":input,"output_node":output};
	}
}

export class MusicPlayerNode extends NodeTemplate{
	constructor(p,pos_x, pos_y, color, select_color, on_color, calc_queue, apiWrapper, device_id, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "Music Player";
		this.desc = "id : ";

		this.w = 150;
		this.top_margin = 80;
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.api_wrapper = apiWrapper;
		this.comp_margin_y = 0
		this.comp_margin_x = this.w/(2.0+1)

		this.random_min = 1;
		this.random_max = 10;

		this.device_id = device_id;
		this.node_id = node_id;

		console.log(this.node_id);
		//this.device = this.api_wrapper.get.devices.toList(this.device_id);
		var comp_id = 0;
		//this.addComponent(io_input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "I/O", comp_id++));
		//this.addComponent(option_input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "shuffle", comp_id++));
		this.addComponent(io_input_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.comp_margin_y, 1, false, "I/O", comp_id++));
		this.addComponent(option_input_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.comp_margin_y, 1, false, "shuffle", comp_id++));

		this.buff = "";

		this.readUpdate = this.readUpdate.bind(this);
		this.device = this.api_wrapper.get.devices.find(this.device_id);
		this.api_wrapper.get.devices.setEvent(this.readUpdate);

		if(this.device != null){
			this.power_state = this.device.isON? "On":"Off";
			//this.music_num = this.device.musicNumber;
		}
		else{
			this.power_state = "Unknown";
			this.music_num = "Unknown";
		}
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		this.p5js.text(this.name, this.x+this.name_margin_left, this.y+this.name_margin_top);
		this.p5js.text(this.desc+String(this.device_id)+"\npower : "+this.power_state+"\ntrack : "+this.music_num, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}

	setRunOption(){
		this.run_option = true;
	}

	readUpdate(device_list){
        const filterLs = device_list.filter((element,index,array) => {
            return element.id === this.device_id;
        });
        if(filterLs.length > 0){
        	this.device = filterLs[0];
        	this.power_state = this.device.isPlay? "On":"Off";
        	this.music_num = this.device.musicNumber;
        }
    }

	run(){
		if(this.run_option){
			this.runOption();
			return;
		}else if(this.device != null){
			this.device.isPlay = !this.device.isPlay;
			this.power_state = this.device.isPlay? "On":"Off";
			this.api_wrapper.set.updateDevice(this.device);
		}
	}
	
	runOption(){
		this.run_option = false;
		if(this.device != null){
			this.device.musicNumber = Math.floor( Math.random() * (this.random_max + 1 - this.random_min) ) + this.random_min;
			this.music_num = this.device.musicNumber;
			console.log(this.device.musicNumber);
			this.api_wrapper.set.updateDevice(this.device);
		}
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name" : "MusicPlayerNode", "node_id": this.node_id, "node_pos": [this.x, this.y], "device_id":this.device_id, "input_node":input,"output_node":output};
	}
}

export class SocketNode extends NodeTemplate{
	constructor(p,pos_x, pos_y, color, select_color, on_color, calc_queue, apiWrapper, device_id, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);

		this.w = 150;

		this.readUpdate = this.readUpdate.bind(this);

		this.name = "Socket";
		this.desc = "id : ";

		this.top_margin = 80;
		this.desc_topmargin = 20;
		this.desc_leftmargin = 10;
		this.comp_margin_y = 0
		this.comp_margin_x = this.w/(1.0+1)

		this.api_wrapper = apiWrapper;

		this.device_id = device_id;
		//console.log(this.api_wrapper)
		this.device = this.api_wrapper.get.devices.find(this.device_id);
		this.api_wrapper.get.devices.setEvent(this.readUpdate);

		var comp_id = 0;
		//this.addComponent(io_input_component(this.p5js, this, 0, this.components.length*this.component_margin+this.top_margin, 1, false, "I/O", comp_id++));
		this.addComponent(io_input_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.comp_margin_y, 1, false, "I/O", comp_id++));

		if(this.device != null) this.power_state = this.device.isON? "On":"Off";
		else this.power_state = "Unknown";
	}

	readUpdate(device_list){
        const filterLs = device_list.filter((element,index,array) => {
            return element.id === this.device_id;
        });
        if(filterLs.length > 0){
        	this.device = filterLs[0];
        	this.power_state = this.device.isON? "On":"Off";
        }
    }

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);
		
		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		//this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.name, this.x+this.name_margin_left, this.y+this.name_margin_top);
		this.p5js.text(this.desc+String(this.device_id)+"\npower : "+this.power_state, this.x+this.desc_leftmargin, this.y+this.name_margin+this.desc_topmargin);

		this.p5js.pop();
	}

	setRunOption(){
		//this.run_option = true;
	}

	run(){
		if(this.device != null){
			this.device.isON = !this.device.isON;
			this.power_state = this.device.isON? "On":"Off";
			this.api_wrapper.set.updateDevice(this.device);
		}
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name" : "SocketNode", "node_id": this.node_id, "node_pos": [this.x, this.y], "device_id":this.device_id, "input_node":input,"output_node":output};
	}
}

export class IOButtonNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "Button";
		this.desc = "";
		this.comp_margin_y = -5
		this.comp_margin_x = this.w/(1.0+1)

		var comp_id = 0;
		//this.addComponent(io_output_component(this.p5js, this, this.w, 20, 0, true, "I/O", comp_id++));
		this.addComponent(io_output_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.h+this.comp_margin_y, 0, true, "I/O", comp_id++));
		this.addComponent(button_component(this.p5js, this, 10, 10, 0, false, "switch", comp_id++));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}

	run(){
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length;id++){
				for(var i=0; i < this.output_nodes[id].length;i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			}
		}
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name" : "IOButtonNode", "node_id": this.node_id, "node_pos": [this.x, this.y], "device_id":null, "input_node":input,"output_node":output};
	}
}

export class OptionButtonNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "Option1";
		this.desc = "";
		this.comp_margin_y = 0
		this.comp_margin_x = this.w/(1.0+1)

		var comp_id = 0;
		//this.addComponent(option_output_component(this.p5js, this, this.w, 20, 0, true, "Option", comp_id++));
		this.addComponent(option_output_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.h+this.comp_margin_y, 0, true, "Option", comp_id++));
		this.addComponent(button_component(this.p5js, this, 10, 10, 0, false, "switch", comp_id++));
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();

		this.p5js.pop();
	}

	run(){
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length;id++){
				for(var i=0; i < this.output_nodes[id].length;i++){
					// i should add in forwarding queue.
					this.output_nodes[id][i].setRunOption();
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			}
		}
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name" : "OptionButtonNode", "node_id": this.node_id, "node_pos": [this.x, this.y], "device_id":null, "input_node":input,"output_node":output};
	}
}

export class AccelerationNode extends NodeTemplate{
	constructor(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id=null){
		super(p, pos_x, pos_y, color, select_color, on_color, calc_queue, node_id);
		this.name = "Accele.";
		this.desc = "";
		this.comp_margin_y = -5
		this.comp_margin_x = this.w/(1.0+1)

		var comp_id = 0;
		this.run = this.run.bind(this);
		this.setup_listener = this.setup_listener.bind(this);
		//this.addComponent(io_output_component(this.p5js, this, this.w, 20, 0, true, "I/O", comp_id++));
		this.addComponent(io_output_component(this.p5js, this, (this.components.length+1)*this.comp_margin_x, this.h+this.comp_margin_y, 0, true, "I/O", comp_id++));
		/*
		(setup_listener(){
			window.addEventListener("devicemotion", function(e){
				//加速度
				var acc = e.acceleration;
				var x = obj2NumberFix(acc.x, 5);
				var y = obj2NumberFix(acc.y, 5);
				var z = obj2NumberFix(acc.z, 5);
				//傾き(重力加速度)
				var acc_g = e.accelerationIncludingGravity;
				var gx = obj2NumberFix(acc_g.x, 5);
				var gy = obj2NumberFix(acc_g.y, 5);
				var gz = obj2NumberFix(acc_g.z, 5);
				//回転値
				var rota_r = e.rotationRate;
				var a = obj2NumberFix(rota_r.alpha, 5); //z方向
				var b = obj2NumberFix(rota_r.beta, 5); //x方向
				var g = obj2NumberFix(rota_r.gamma, 5); // y方向
				//表示

			});
		})()
		*/
	}

	setup_listener(){
		window.addEventListener("devicemotion", function(e){
			//加速度
			var acc = e.acceleration;
			var x = obj2NumberFix(acc.x, 5);
			var y = obj2NumberFix(acc.y, 5);
			var z = obj2NumberFix(acc.z, 5);
			//傾き(重力加速度)
			var acc_g = e.accelerationIncludingGravity;
			var gx = obj2NumberFix(acc_g.x, 5);
			var gy = obj2NumberFix(acc_g.y, 5);
			var gz = obj2NumberFix(acc_g.z, 5);
			//回転値
			var rota_r = e.rotationRate;
			var a = obj2NumberFix(rota_r.alpha, 5); //z方向
			var b = obj2NumberFix(rota_r.beta, 5); //x方向
			var g = obj2NumberFix(rota_r.gamma, 5); // y方向
			
			function obj2NumberFix(obj, fix_deg){
				return Number(obj).toFixed(fix_deg);
			}

			if(x*x+y*y+z*z > 10){
				this.run()
			}
		});
	}

	draw(){
		this.p5js.push();

		if(this.fill_flag) this.p5js.fill(this.color.r, this.color.g, this.color.b);
		this.p5js.rect(this.x, this.y, this.w, this.h, this.radius);

		this.p5js.noFill();
		if(this.select_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.select_color.r, this.select_color.g, this.select_color.b);
		}else if(this.on_flag){
			this.p5js.strokeWeight(2);
			this.p5js.stroke(this.on_color.r, this.on_color.g, this.on_color.b);
		}else{
			this.p5js.strokeWeight(1);
			this.p5js.stroke(this.color.r, this.color.g, this.color.b, 200);
		}
		// outer bound
		this.p5js.rect(this.margin_x, this.margin_y, this.margin_w, this.margin_h, this.radius);

		this.p5js.pop()
		this.p5js.push()

		for(var i=0, len = this.components.length; i < len; i++) this.components[i].draw();
		this.p5js.textSize(this.head_font_size);
		this.p5js.fill(0, 0, 0);
		//this.p5js.text(this.name, this.x+this.name_margin, this.y+this.name_margin);
		this.p5js.text(this.name, this.x+this.name_margin_left, this.y+this.name_margin_top);

		this.p5js.pop();
	}

	run(){
		if(this.output_nodes != []){
			for(var id=0; id < this.output_nodes.length;id++){
				for(var i=0; i < this.output_nodes[id].length;i++){
					// i should add in forwarding queue.
					this.calc_queue.addQueue(this.output_nodes[id][i]);
				}
			}
		}
	}

	getInfo(){
		var input = [];
		var output = [];

		for(var i=0; i < this.input_nodes.length; i++){
			for(var j=0; j < this.input_nodes[i].length; j++){
				input.push(this.input_nodes[i][j].getNodeID());
			}
		}

		for(var i=0; i < this.output_nodes.length; i++){
			for(var j=0; j < this.output_nodes[i].length; j++){
				output.push(this.output_nodes[i][j].getNodeID());
			}
		}

		return {"node_name" : "AccelerationNode", "node_id": this.node_id, "node_pos": [this.x, this.y], "device_id":null, "input_node":input,"output_node":output};
	}
}